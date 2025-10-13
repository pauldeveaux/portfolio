from fastapi import APIRouter

router = APIRouter(prefix="/email", tags=["Email"])

@router.get("/")
def get_email_status():
    return {"message": "Email service online !"}