import logging
from typing import List

from pydantic import BaseModel
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.documents import Document
from langgraph.graph import StateGraph, MessagesState, END
from langchain_core.messages import HumanMessage, BaseMessage, SystemMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate

from app.services.rag.embedding_document_store import EmbeddingDocumentStore
from app.services.rag.llm_processor import LLMProcessor
from app.services.rag.cms_service import cms

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # 👈 assure-toi d’avoir le niveau debug actif


class State(BaseModel):
    question: str
    context: List[Document] = None
    answer: str = ""


vector_store = EmbeddingDocumentStore()


@tool(response_format="content_and_artifact", description="Récupère les documents liés au portfolio")
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
        self.llm_processor = LLMProcessor()

        self.tools = ToolNode([retrieve])
        self._build_graph()

    # ---------------------------------------------------------
    # 🔹 Build LangGraph
    # ---------------------------------------------------------
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

        self.graph = graph_builder.compile()

    # ---------------------------------------------------------
    # 🔹 Run pipeline
    # ---------------------------------------------------------
    def execute(self, question: str):
        logger.info(f"🟢 Starting RAG pipeline for question: {question!r}")
        initial_state = {"messages": [HumanMessage(content=question)]}

        try:
            result = self.graph.invoke(initial_state)
            logger.debug(f"RESULTS : {result}")

            messages = result.get("messages", [])
            last_ai_message = next((m for m in reversed(messages) if m.type == "ai"), None)

            logger.info("✅ RAG pipeline execution completed successfully.")
            logger.debug(f"Final result: {last_ai_message}")

            return last_ai_message.content
        except Exception as e:
            logger.exception(f"❌ Error while executing RAG pipeline: {e}")
            raise

        # ---------------------------------------------------------
        # 🔹 Step 1 — Ask LLM whether to call a tool or respond
        # ---------------------------------------------------------

    def query_or_respond(self, state: MessagesState):
        logger.debug("🔹 Entering query_or_respond()")
        logger.debug(f"Current messages: {[m.content for m in state['messages']]}")

        try:

            prompt_template = ChatPromptTemplate.from_messages([
                (
                    "system",
                    "Tu es {name}, et tu réponds comme si tu étais toi-même dans une conversation. "
                    "Tes réponses doivent être naturelles, simples et à la première personne. "
                    "Les questions porteront probablement sur un portfolio. "
                    "Si tu ne sais pas répondre à une question, utilise le tool 'retrieve' pour récupérer des informations supplémentaires. "
                    "Pour utiliser le tool, remplis le champ 'question' avec la question posée."
                ),

            ])

            system_message_content = prompt_template.invoke({
                "name": self.ai_information.get("name", "une IA")
            }).to_string()
            system_message = SystemMessage(system_message_content)

            # 2️⃣ Construire le prompt complet avec messages utilisateur
            prompt = [system_message] + state["messages"]

            logger.debug("Launch LLM call")
            llm_with_tools = self.llm_processor.llm.bind_tools([retrieve])
            response = llm_with_tools.invoke(prompt)

            logger.debug(f"LLM responded: {getattr(response, 'content', None)}")
            logger.debug(f"Tool calls (if any): {getattr(response, 'tool_calls', None)}")

            return {"messages": [response]}
        except Exception as e:
            logger.exception(f"❌ Error in query_or_respond: {e}")
            raise

    # ---------------------------------------------------------
    # 🔹 Step 3 — Generate final answer
    # ---------------------------------------------------------
    def generate(self, state: MessagesState):
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

            response = self.llm_processor.execute(state, self.ai_information, docs_content)
            final_message = AIMessage(content=response['answer'])  # ✅ objet compatible

            return {"messages": [final_message]}
        except Exception as e:
            logger.exception(f"❌ Error in generate: {e}")
            raise
