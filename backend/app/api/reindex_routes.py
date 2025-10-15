import logging
import traceback

from fastapi import APIRouter, HTTPException, Query

from app.core.config import settings
from app.services.rag.cms_service import CMSService
from app.services.rag.embedding_document_store import EmbeddingDocumentStore

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/rag", tags=["rag"])
cms = CMSService(cms_api_url=settings.CMS_API_URL, api_key=settings.CMS_API_KEY)
embedding_db = EmbeddingDocumentStore()

# TODO CHANGE GET TO POST
@router.get("/reindex")
async def reindex():
    """
    Fetch all CMS documents, clean, split, and index them in the vector store.

    Returns:
      dict: Status and number of indexed document chunks.
    """
    documents = cms.fetch_all()
    nb_chunks = embedding_db.add_documents(documents)

    return {"status": "success", "indexed_documents": nb_chunks}
