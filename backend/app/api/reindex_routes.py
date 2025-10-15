import logging
import traceback

from fastapi import APIRouter, HTTPException, Query

from app.core.config import settings
from app.services.rag.cms_service import CMSService
from app.services.rag.embedding_service import EmbeddingService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/rag", tags=["rag"])
cms = CMSService(cms_api_url=settings.CMS_API_URL, api_key=settings.CMS_API_KEY)
embedding_db = EmbeddingService()

# TODO CHANGE GET TO POST
# TODO DOC
@router.get("/reindex")
async def reindex():
    try:
        documents = cms.fetch_all()
        nb_chunks = embedding_db.add_documents(documents)

        return {"status": "success", "indexed_documents": nb_chunks}
    except Exception as e:
        logger.error("Error while indexing : %s", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def search_document_by_similarity(query: str = Query(..., description="Texte à rechercher"),):
    try:
        results = embedding_db.similarity_search(query=query, k=10)
        # On peut renvoyer seulement le texte + métadatas
        response = [{"text": r.page_content, "metadata": r.metadata} for r in results]
        return {"results": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
