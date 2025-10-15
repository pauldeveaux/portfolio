import asyncio
import logging
import traceback

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.rag.embedding_service import EmbeddingService

router = APIRouter(prefix="/chatbot", tags=["chat"])

logger = logging.getLogger(__name__)

embedding_db = EmbeddingService()


class MessageModel(BaseModel):
    """
    Message schema

    Attributes:
        message (str): message to send to the chatbot
    """
    message: str

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
    response_description="The answer"
)
async def ask_question(payload: MessageModel):
    try:
        await asyncio.sleep(1)

        return {
            "message": payload.message,
            "answer": "🚧 Je ne suis pas encore disponible pour le moment 🚧"
        }
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )



@router.post(
    "/send-message",
    summary="Ask a question to the chatbot",
    response_description="The answer"
)
async def ask_question(payload: MessageModel):
    try:
        query = payload.message

        response = qa_chain.run(query)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    except Exception as e:
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))