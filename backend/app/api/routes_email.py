from smtplib import SMTPException
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field

from app.services.email_service import send_email
from app.core.limiter import limiter

router = APIRouter(prefix="/email", tags=["Email"])


class ContactFormModel(BaseModel):
    """
    Contact form schema.

    Attributes:
        first_name (str): Sender's first name.
        last_name (str): Sender's last name.
        email (EmailStr): Sender's email address.
        message (str): Message content.
    """
    first_name: str = Field(..., alias="firstName", max_length=100)
    last_name: str = Field(..., alias="lastName", max_length=100)
    email: EmailStr
    message: str = Field(..., max_length=5000)


@router.get(
    "/",
    summary="Check email service status",
    response_description="Email service is online"
)
def get_email_status():
    """
    Returns a simple message indicating the email service is online.

    This endpoint can be used for health checks.
    """
    return {"message": "Email service online !"}


@router.post(
    "/contact",
    summary="Send a contact form message",
    response_description="Email sent successfully"
)
@limiter.limit("3/minute")
def contact(request: Request, form: ContactFormModel):
    """
    Send a message from the contact form via email.

    Args:
        form (ContactFormModel): Validated contact form data.

    Raises:
        HTTPException 502: If SMTP server fails.
        HTTPException 400: If input data is invalid.

    Returns:
        dict: Success message if the email is sent.
    """
    try:
        first = form.first_name.replace("\r", "").replace("\n", "")
        last = form.last_name.replace("\r", "").replace("\n", "")
        subject = f"Portfolio - Message from '{first} {last}'"
        body = f"From : {first} {last} <{form.email}>\n\n{form.message}"
        send_email(subject, form.email, body)
        return {"message": "Email sent successfully!"}
    except SMTPException:
        raise HTTPException(
            status_code=502,
            detail="Mail server error. Please try again later."
        )
