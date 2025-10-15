from typing import List

from langchain.schema import BaseRetriever, Document
from langchain_core.callbacks import CallbackManagerForRetrieverRun
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline


class LangChainRetriever(BaseRetriever):

    def __init__(self, embedding_service, k: int = 8):
        self.embedding_service = embedding_service
        self.k = k


def _get_relevant_documents(self, query: str, *, run_manager: CallbackManagerForRetrieverRun) -> List[Document]:
    results = self.embedding_service.similarity_search(query, k=self.k)
    return [Document(page_content=r.page_content, metadata=r.metadata) for r in results]

model_name = "mistralai/Mistral-7B-Instruct-v0.1"
tokenizer = AutoTokenizer.from_pretrained(model_name)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",   # répartit sur GPU/CPU automatiquement
    torch_dtype="auto"   # pour réduire l’utilisation mémoire
)

hf_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    temperature=0.7
)