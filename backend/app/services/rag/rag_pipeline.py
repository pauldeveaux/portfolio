import logging
from typing import List
from dotenv import load_dotenv

from langsmith import traceable
from pydantic import BaseModel
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.documents import Document
from langgraph.graph import StateGraph, MessagesState, END, START
from langchain_core.messages import HumanMessage, RemoveMessage
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver
from langmem.short_term import SummarizationNode
from langchain_core.messages.utils import count_tokens_approximately

from app.core.config import settings
from app.services.rag.embedding_document_store import EmbeddingDocumentStore
from app.services.rag.rag_prompts import build_prompt_without_context, build_prompt_with_context
from app.services.rag.cms_service import cms

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


# To ensure environment variables are loaded before loading langsmith
load_dotenv()

vector_store = EmbeddingDocumentStore()
memory = InMemorySaver()


class RetrieveState(BaseModel):
    """
    Represents the state for document retrieval.

    Attributes:
        question (str): The user question to retrieve relevant documents for.
        context (List[Document], optional): Documents retrieved for the question.
        answer (str, optional): Generated answer for the question.
    """
    question: str
    context: List[Document] = None
    answer: str = ""



@tool(response_format="content_and_artifact", description="Retrieves personal document information (experience, projects, skills, formation) relevant to the question asked.")
def retrieve(state: RetrieveState):
    """
     Retrieve documents relevant to a user's question from the vector store.

     Args:
         state (RetrieveState): Contains the question and optional context.

     Returns:
         Tuple[str, List[Document]]: Serialized content of retrieved documents
         and the raw document objects.
     """
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
    """
    Implements a Retrieval-Augmented Generation (RAG) pipeline.

    Attributes:
        ai_information (dict): AI assistant metadata fetched from CMS.
        vector_store (EmbeddingDocumentStore): Vector store for document retrieval.
        llm: Initialized language model for response generation.
        summarization_node (SummarizationNode): Node for summarizing conversation context.
        tools (ToolNode): Node containing retrieval tools.
        graph: Compiled LangGraph execution graph.
    """

    def __init__(self):
        self.ai_information = cms.fetch_ai_information()
        self.vector_store = vector_store

        self.model = settings.MISTRAL_MODEL_NAME
        self.llm = init_chat_model(
            self.model,
            model_provider="mistralai",
            api_key=settings.MISTRAL_API_KEY
        )

        self.summarization_node = SummarizationNode(
            token_counter=count_tokens_approximately,
            model=self.llm,
            max_tokens=350,
            output_messages_key="messages"
        )

        self.tools = ToolNode([retrieve])
        self._build_graph()


    def _build_graph(self):
        """
             Build the LangGraph workflow graph for the RAG pipeline.
        """
        graph_builder = StateGraph(MessagesState)

        graph_builder.add_node(self.query_or_respond)
        graph_builder.add_node(self.tools)
        graph_builder.add_node(self.generate)
        graph_builder.add_node(self.cleanup_messages)
        graph_builder.add_node("summarize", self.summarization_node)

        graph_builder.add_edge(START, "summarize")
        graph_builder.add_edge("summarize", "query_or_respond")
        graph_builder.add_conditional_edges(
            "query_or_respond",
            tools_condition,
            {END: END, "tools": "tools"}
        )
        graph_builder.add_edge("tools", "generate")
        graph_builder.add_edge("generate", "cleanup_messages")
        graph_builder.add_edge("cleanup_messages", END)


        self.graph = graph_builder.compile(checkpointer=memory)


    @traceable
    def execute(self, question: str, session_id: str) -> str:
        """
               Execute the RAG pipeline on a user question.

               Args:
                   question (str): The user's input question.
                   session_id (str): Unique session/thread identifier.

               Returns:
                   str: Final AI-generated response content.
        """
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
        """
        Decide whether to respond directly or invoke a retrieval tool.

        Args:
            state (MessagesState): Current conversation messages.

        Returns:
            dict: LLM response messages.
        """
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


    def generate(self, state: MessagesState):
        """
        Generate a response using retrieved documents as context.

        Args:
            state (MessagesState): Current conversation messages including tool outputs.

        Returns:
            dict: LLM response messages.
        """
        logger.debug("🔹 Entering generate()")
        try:
            recent_tool_messages = []

            for message in reversed(state["messages"]):
                if message.type == "tool":
                    recent_tool_messages.append(message)

            tool_messages = recent_tool_messages[::-1]
            docs_content = "\n\n".join(msg.content for msg in tool_messages)

            logger.debug(f"🧩 Docs content passed to LLMProcessor ({len(docs_content)} chars)")

            prompt = build_prompt_with_context(
                state["messages"],
                self.ai_information.get("name"),
                docs_content
            )

            response_messages = self.execute_llm(self.llm, prompt)
            return response_messages
        except Exception as e:
            logger.exception(f"❌ Error in generate: {e}")
            raise


    @staticmethod
    def cleanup_messages(state: MessagesState):
        """
        Remove tool calls and their triggering messages from conversation history.

        Args:
            state (MessagesState): Current conversation messages.

        Returns:
            dict: Instructions to remove tool-related messages.
        """
        logger.debug("🔹 Entering cleanup_messages()")

        messages_to_remove = []
        skip_next = False

        for message in reversed(state["messages"]):
            if message.type == "tool":
                messages_to_remove.append(message)
                skip_next = True
            elif skip_next:
                messages_to_remove.append(message)
                skip_next = False

        return {"messages": [RemoveMessage(id=m.id) for m in messages_to_remove]}


    @staticmethod
    @traceable(run_type="llm")
    def execute_llm(llm, prompt):
        """
        Invoke the LLM with a given prompt.

        Args:
            llm: Language model instance.
            prompt: Prompt to send to the model.

        Returns:
            dict: LLM response messages, including tool calls if any.
        """
        response = llm.invoke(prompt)

        logger.debug(f"LLM responded: {getattr(response, 'content', None)}")
        logger.debug(f"Tool calls (if any): {getattr(response, 'tool_calls', None)}")

        return {"messages": [response]}



