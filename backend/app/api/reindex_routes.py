import logging

from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import HTMLResponse

from app.core.config import settings
from app.services.rag.cms_service import CMSService
from app.services.rag.embedding_document_store import EmbeddingDocumentStore

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/rag", tags=["rag"])
cms = CMSService(cms_api_url=settings.CMS_API_URL, api_key=settings.CMS_API_KEY)
embedding_db = EmbeddingDocumentStore()

# Admin password (store in environment variable for security)
ADMIN_PASSWORD = settings.ADMIN_PASSWORD


@router.get("/reindex", response_class=HTMLResponse)
async def reindex_form():
    """
    Display an HTML form to trigger CMS reindexing.

    Returns:
        HTMLResponse: A simple HTML page with password input and a button.
    """
    html_content = f"""
    <html>
        <head>
            <title>Reindex CMS</title>
        </head>
        <body>
            <h1>Reindex CMS Documents</h1>
            <form action="/rag/reindex" method="post">
                <label for="password">Admin Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Reindex</button>
            </form>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)


@router.post("/reindex")
async def reindex_post(password: str = Form(...)):
    """
    Perform CMS documents reindexing after verifying admin password.

    Args:
        password (str): Admin password submitted via the form.

    Returns:
        dict: Status message and number of indexed document chunks.

    Raises:
        HTTPException: If the password is incorrect (401 Unauthorized).
    """
    # Verify admin password
    if password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Fetch all documents from CMS and index them in the vector store
    documents = cms.fetch_all()
    nb_chunks = embedding_db.add_documents(documents)

    logger.info(f"Reindexed {nb_chunks} document chunks.")
    return {"status": "success", "indexed_documents": nb_chunks}
