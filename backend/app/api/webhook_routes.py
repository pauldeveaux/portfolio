import hmac
import logging

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request

from app.core.config import settings
from app.services.rag.content_type_config import get_config_by_uid
from app.services.rag.cms_service import cms
from app.services.rag.embedding_document_store import EmbeddingDocumentStore

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["webhooks"])
embedding_db = EmbeddingDocumentStore()

if not settings.STRAPI_WEBHOOK_SECRET:
    logger.warning("STRAPI_WEBHOOK_SECRET is empty — webhook endpoint is unauthenticated")


def _verify_secret(request: Request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authorization")

    token = auth_header[7:]
    if not hmac.compare_digest(token, settings.STRAPI_WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="Invalid webhook secret")


def _build_populate_params(populate: list) -> dict:
    if not populate:
        return {}
    if len(populate) == 1:
        return {"populate": populate[0]}
    return {f"populate[{i}]": p for i, p in enumerate(populate)}


def _process_upsert(uid: str, document_id: str):
    config = get_config_by_uid(uid)
    if not config:
        return

    try:
        if config.aggregate:
            params = _build_populate_params(config.populate)
            docs = cms._fetch_table(
                config.route,
                title_keys=config.title_keys,
                content_keys=config.content_keys,
                link_keys=config.link_keys,
                category_name=config.category_name,
                aggregate_documents=True,
                params=params if params else None,
                metadata_extractor=config.metadata_extractor,
            )
            if docs:
                embedding_db.upsert_document(docs[0])
                logger.info(f"Webhook: re-indexed aggregate '{config.category_name}'")
        else:
            params = _build_populate_params(config.populate)
            doc = cms.fetch_document(
                config.route,
                document_id,
                title_keys=config.title_keys,
                content_keys=config.content_keys,
                link_keys=config.link_keys,
                params=params if params else None,
                metadata_extractor=config.metadata_extractor,
                category_name=config.category_name,
            )
            if doc:
                embedding_db.upsert_document(doc)
                logger.info(f"Webhook: upserted document '{document_id}' in '{config.category_name}'")
    except Exception as e:
        logger.exception(f"Webhook: error processing upsert for '{document_id}': {e}")


def _process_delete(uid: str, document_id: str):
    config = get_config_by_uid(uid)
    if not config:
        return

    try:
        if config.aggregate:
            _process_upsert(uid, document_id)
        else:
            embedding_db.delete_by_document_id(document_id)
            logger.info(f"Webhook: deleted document '{document_id}' from '{config.category_name}'")
    except Exception as e:
        logger.exception(f"Webhook: error processing delete for '{document_id}': {e}")


@router.post("/strapi")
async def handle_strapi_webhook(request: Request, background_tasks: BackgroundTasks):
    if settings.STRAPI_WEBHOOK_SECRET:
        _verify_secret(request)

    body = await request.json()

    event = body.get("event", "")
    uid = body.get("uid", "")
    entry = body.get("entry", {})
    document_id = entry.get("documentId", "")

    config = get_config_by_uid(uid)
    if not config:
        logger.debug(f"Webhook: ignoring event '{event}' for unknown uid '{uid}'")
        return {"status": "ignored"}

    if not document_id and not config.aggregate:
        logger.warning(f"Webhook: missing documentId for event '{event}' on '{uid}'")
        return {"status": "ignored"}

    if event in ("entry.create", "entry.update", "entry.publish"):
        background_tasks.add_task(_process_upsert, uid, document_id)
    elif event in ("entry.delete", "entry.unpublish"):
        background_tasks.add_task(_process_delete, uid, document_id)
    else:
        logger.debug(f"Webhook: ignoring unhandled event '{event}'")
        return {"status": "ignored"}

    return {"status": "accepted"}
