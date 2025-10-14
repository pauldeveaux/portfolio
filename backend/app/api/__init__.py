from fastapi import APIRouter
from .routes_email import router as email_router
from .routes_chatbot import router as chatbot_router


main_router = APIRouter()

main_router.include_router(email_router)
main_router.include_router(chatbot_router)


__all__ = [
    main_router
]