import logging
from typing import List, Optional

from pydantic import BaseModel
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from app.core.config import settings
from app.models.document_model import DocumentModel
from app.utils.text_cleaner import clean_text

logger = logging.getLogger(__name__)


class EmbeddingDocumentStoreParams(BaseModel):
    """
    Configuration parameters for the EmbeddingDocumentStore.

    Attributes:
        embedding_model (str): Name of the embedding model to use.
        collection_name (str): Name of the vector store collection.
        chunk_size (int): Maximum size of text chunks.
        chunk_overlap (int): Number of overlapping characters between chunks.
    """
    embedding_model: str = "all-MiniLM-L6-v2"
    collection_name: str = "cms_documents"
    chunk_size: int = 500
    chunk_overlap: int = 50


class EmbeddingDocumentStore:
    """
    Handles storage, splitting, embedding, and retrieval of documents
    using a vector store.
    """
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, params: Optional[EmbeddingDocumentStoreParams] = None):
        """
        Initializes the vector store, embeddings, and text splitter.

        Args:
            params (Optional[EmbeddingDocumentStoreParams]): Custom store parameters.
        """
        if params is None:
            params = EmbeddingDocumentStoreParams()
        self.params = params

        self.embeddings = HuggingFaceEmbeddings(model_name=self.params.embedding_model)

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.params.chunk_size,
            chunk_overlap=self.params.chunk_overlap,
            add_start_index=True
        )

        self.vector_store = None
        self._connect_to_chroma()

    def _connect_to_chroma(self):
        """
        Try to connect to ChromaDB using remote host,
        fallback to local in-memory instance if it fails.
        """
        try:
            logger.info(f"Trying to connect to chromaDB via: {settings.CHROMA_API_URL}")
            self.vector_store = Chroma(
                collection_name=self.params.collection_name,
                embedding_function=self.embeddings,
                host=settings.CHROMA_API_URL
            )
            logger.info("✅ Connected to remote ChromaDB.")
        except ValueError:
            logger.warning("⚠️ Could not connect to ChromaDB. Fallback on memory storage.")
            self.vector_store = Chroma(
                collection_name=self.params.collection_name,
                embedding_function=self.embeddings,
            )

    def clear_collection(self):
        """
        Delete all existing vectors from the Chroma collection and recreate it.
        Keeps the same connection logic (remote with fallback).
        """
        try:
            logger.info(f"🧹 Clearing collection '{self.params.collection_name}'...")
            self.vector_store.delete_collection()
        except Exception as e:
            logger.warning(f"⚠️ Could not delete collection directly: {e}")

        self._connect_to_chroma()
        logger.info(f"✅ Collection '{self.params.collection_name}' cleared and reinitialized.")


    def split_text(self, text):
        """
        Splits a text into smaller chunks using the configured text splitter.

        Args:
            text (str): The text to split.

        Returns:
            List[str]: A list of text chunks.
        """
        chunks = self.text_splitter.split_text(text)
        return chunks

    def add_documents(self, documents: List[DocumentModel]):
        """
        Cleans, splits, and stores a list of documents in the vector store.

        Args:
            documents (List[DocumentModel]): List of documents to store.

        Returns:
            int: Total number of text chunks added.
        """
        all_splits = []
        metadatas = []

        for doc in documents:
            # Clean the text
            text = clean_text(doc.text)

            # Split large texts into chunks
            splits = self.split_text(text)
            all_splits.extend(splits)

            # Add metadata for each chunk
            metadatas.extend([{"id": doc.id, "title": doc.title, "chunk_nb": i, "category": doc.category} for i, _ in
                              enumerate(splits)])

        # Store and index chunks
        _ = self.vector_store.add_texts(texts=all_splits, metadatas=metadatas)
        return len(all_splits)

    async def similarity_search(self, query: str, k: int = 5):
        """
        Performs a similarity search for a query in the vector store.

        Args:
            query (str): The query string.
            k (int): Number of results to return.

        Returns:
            Tuple[List[Document], List[float]]: Retrieved documents and their similarity scores.
        """
        results_with_scores = await self.vector_store.asimilarity_search_with_score(query=query, k=k)
        results = [doc for doc, _ in results_with_scores]
        scores = [score for _, score in results_with_scores]
        return results, scores
