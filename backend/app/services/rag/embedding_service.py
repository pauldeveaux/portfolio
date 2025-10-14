from typing import List, Optional

from pydantic import BaseModel
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


from app.models.document_model import DocumentModel
from app.utils.text_cleaner import clean_text


class EmbeddingDBParams(BaseModel):
    embedding_model: str = "all-MiniLM-L6-v2"
    collection_name: str = "cms_documents"
    chunk_size: int = 500
    chunk_overlap: int = 50

class EmbeddingDBService:
    def __init__(self, params: Optional[EmbeddingDBParams] = None):
        if params is None:
            params = EmbeddingDBParams()
        self.params = params

        self.embeddings = HuggingFaceEmbeddings(model_name=self.params.embedding_model)

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.params.chunk_size,
            chunk_overlap=self.params.chunk_overlap
        )

        # TODO use chroma server
        self.collection = Chroma(
            collection_name="example_collection",
            embedding_function=self.embeddings,
            #persist_directory="./chroma_langchain_db", # TODO delete
            # TODO host="..."
        )


    def add_documents(self, documents: List[DocumentModel]):
        texts = []
        metadatas = []

        for doc in documents:
            text = clean_text(doc.text)
            chunks = self.text_splitter.split_text(text)
            texts.extend(chunks)
            metadatas.extend([{"id": doc.id, "title": doc.title, "chunk_nb": i} for i, _ in enumerate(chunks)])

        self.collection.add_texts(texts=texts, metadatas=metadatas)

        return len(texts)


    def similarity_search(self, query: str, k: int = 5):
        results = self.collection.similarity_search(query=query, k=k)
        return results