from typing import List
from pydantic import BaseModel
from langchain_core.documents import Document
from langgraph.graph import START, StateGraph

from app.services.rag.embedding_document_store import EmbeddingDocumentStore
from app.services.rag.llm_processor import LLMProcessor


class State(BaseModel):
    """
    Represents the state of the RAG pipeline.

    Attributes:
        question (str): The user's input question.
        context (List[Document]): Retrieved documents providing context for generation.
        answer (str): The generated answer.
    """
    question: str
    context: List[Document] = None
    answer: str = ""


class RAGPipeline:
    """Implements a simple Retrieval-Augmented Generation (RAG) pipeline."""

    def __init__(self):
        """Initializes the pipeline components and builds the execution graph."""
        self.vector_store = EmbeddingDocumentStore()
        self.llm_processor = LLMProcessor()

        graph_builder = StateGraph(State).add_sequence([self.retrieve, self.generate])
        graph_builder.add_edge(START, "retrieve")
        self.graph = graph_builder.compile()

    def execute(self, question: str):
        """
        Runs the RAG pipeline for a given question.

        Args:
            question (str): The user's query.

        Returns:
            Any: The final pipeline output.
        """
        return self.graph.ainvoke(State(question=question))

    async def retrieve(self, state: State):
        """
        Retrieves the most relevant documents for the given question.

        Args:
            state (State): The current pipeline state.

        Returns:
            dict: A dictionary containing the retrieved documents under 'context'.
        """
        retrieved_docs, scores = await self.vector_store.similarity_search(state.question)
        print(retrieved_docs, scores)
        return {"context": retrieved_docs}

    async def generate(self, state: State):
        """
        Generates an answer using the retrieved context and the question.

        Args:
            state (State): The current pipeline state.

        Returns:
            str: The generated answer.
        """
        docs_content = "\n\n".join(doc.page_content for doc in state.context)
        response = self.llm_processor.execute(state.question, docs_content)
        return response
