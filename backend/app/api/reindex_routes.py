import logging
import traceback

from fastapi import APIRouter, HTTPException

from app.core.config import settings
from app.services.rag.cms_service import CMSService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/rag", tags=["rag"])
cms = CMSService(cms_api_url=settings.CMS_API_URL, api_key=settings.CMS_API_KEY)

@router.get("/reindex")
async def reindex():
    try:
        docs = cms.fetch_all()
        doc = cms.fetch_document("experiences", "bl4l109kmttkyebed5hzmr9w", title_key="title", content_key="text")
        print("doc", doc)
    except Exception as e:
        logger.error("Erreur lors de la réindexation : %s", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
