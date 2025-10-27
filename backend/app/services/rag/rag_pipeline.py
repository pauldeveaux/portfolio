import logging
from typing import List

from pydantic import BaseModel
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.documents import Document
from langgraph.graph import StateGraph, MessagesState, END
from langchain_core.messages import HumanMessage
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver

from app.core.config import settings
from app.services.rag.embedding_document_store import EmbeddingDocumentStore
from app.services.rag.rag_prompts import build_prompt_without_context, build_prompt_with_context
from app.services.rag.cms_service import cms

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # 👈 assure-toi d’avoir le niveau debug actif


class State(BaseModel):
    question: str
    thread_id: str = None
    context: List[Document] = None
    answer: str = ""


vector_store = EmbeddingDocumentStore()
memory = MemorySaver()


@tool(response_format="content_and_artifact", description="Retrieves documents related to the portfolio or its owner")
def retrieve(state: State):
    logger.debug(f"🔹 Entering retrieve() for question: {state.question!r}")

    try:
        retrieved_docs, scores = vector_store.similarity_search(state.question)

        serialized = "\n\n".join(
            f"Source: {doc.metadata}\nContent: {doc.page_content}"
            for doc in retrieved_docs
        )

        return serialized, retrieved_docs
    except Exception as e:
        logger.exception(f"❌ Error in retrieve: {e}")
        raise


class RAGPipeline:
    """Implements a simple Retrieval-Augmented Generation (RAG) pipeline."""

    def __init__(self):
        self.ai_information = cms.fetch_ai_information()
        self.vector_store = vector_store

        self.model = settings.MISTRAL_MODEL_NAME
        self.llm = init_chat_model(
            self.model,
            model_provider="mistralai",
            api_key=settings.MISTRAL_API_KEY
        )

        self.tools = ToolNode([retrieve])
        self._build_graph()


    def _build_graph(self):
        graph_builder = StateGraph(MessagesState)

        graph_builder.add_node(self.query_or_respond)
        graph_builder.add_node(self.tools)
        graph_builder.add_node(self.generate)

        graph_builder.set_entry_point("query_or_respond")
        graph_builder.add_conditional_edges(
            "query_or_respond",
            tools_condition,
            {END: END, "tools": "tools"}
        )
        graph_builder.add_edge("tools", "generate")
        graph_builder.add_edge("generate", END)

        self.graph = graph_builder.compile(checkpointer=memory)


    def execute(self, question: str, session_id: str) -> str:
        logger.info(f"🟢 Starting RAG pipeline for question: {question!r}")
        initial_state = { "messages": [HumanMessage(content=question)]}

        try:
            config = {"configurable": {"thread_id": session_id}}
            result = self.graph.invoke(initial_state, config)
            logger.debug(f"RESULTS : {result}")

            messages = result.get("messages", [])
            last_ai_message = next((m for m in reversed(messages) if m.type == "ai"), None)

            logger.info("✅ RAG pipeline execution completed successfully.")
            logger.debug(f"Final result: {last_ai_message}")

            return last_ai_message.content
        except Exception as e:
            logger.exception(f"❌ Error while executing RAG pipeline: {e}")
            raise


    def query_or_respond(self, state: MessagesState):
        logger.debug("🔹 Entering query_or_respond()")
        logger.debug(f"Current messages: {[m.content for m in state['messages']]}")

        try:
            # Create prompt without RAG context
            prompt = build_prompt_without_context(
                state["messages"],
                self.ai_information.get("name")
            )

            logger.debug("Launch LLM call")
            llm_with_tools = self.llm.bind_tools([retrieve])
            response_messages = self.execute_llm(llm_with_tools, prompt)

            return response_messages
        except Exception as e:
            logger.exception(f"❌ Error in query_or_respond: {e}")
            raise


    def generate(self, state: MessagesState, thread_id: str):
        logger.debug("🔹 Entering generate()")
        try:
            # Récupérer les messages de type "tool"
            recent_tool_messages = []
            for message in reversed(state["messages"]):
                if message.type == "tool":
                    recent_tool_messages.append(message)
                else:
                    break

            tool_messages = recent_tool_messages[::-1]
            docs_content = "\n\n".join(msg.content for msg in tool_messages)
            logger.debug(f"🧩 Docs content passed to LLMProcessor ({len(docs_content)} chars)")


            prompt = build_prompt_with_context(
                state["messages"],
                self.ai_information.get("name"),
                docs_content
            )

            response_messages = self.execute_llm(self.llm, prompt, thread_id)
            return response_messages
        except Exception as e:
            logger.exception(f"❌ Error in generate: {e}")
            raise


    @staticmethod
    def execute_llm(llm, prompt):
        response = llm.invoke(prompt)

        logger.debug(f"LLM responded: {getattr(response, 'content', None)}")
        logger.debug(f"Tool calls (if any): {getattr(response, 'tool_calls', None)}")

        return {"messages": [response]}



