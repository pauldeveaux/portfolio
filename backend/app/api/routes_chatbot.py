import logging

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.rag.embedding_document_store import EmbeddingDocumentStore
from app.services.rag.rag_pipeline import RAGPipeline

router = APIRouter(prefix="/chatbot", tags=["chat"])

logger = logging.getLogger(__name__)

embedding_db = EmbeddingDocumentStore()
rag = RAGPipeline()


class MessageModel(BaseModel):
    """
    Message schema

    Attributes:
        message (str): message to send to the chatbot
    """
    message: str
    session_id: str = Field(..., alias="sessionId")


@router.get(
    "/",
    summary="Check chatbot service status",
    response_description="Chatbot service is online"
)
def get_chatbot_status():
    """
    Returns a simple message indicating the chatbot service is online.

    This endpoint can be used for health checks.
    """
    return {"message": "Chatbot service online !"}


@router.post(
    "/send-message",
    summary="Ask a question to the chatbot",
    response_description="The generated answer from the chatbot"
)
async def ask_question(payload: MessageModel):
    """
    Send a message to the RAG chatbot and return the answer.

    Args:
        payload (MessageModel): The user's message.

    Returns:
        dict: Original message and generated answer.
    """
    query = payload.message
    session_id = payload.session_id

    response = rag.execute(question=query, session_id=session_id)

    ret = {
        "message": payload.message,
        "answer": response
    }
    return ret