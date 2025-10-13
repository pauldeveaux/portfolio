import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_email(subject: str, sender: str, body: str, recipient: str = None):
    """
    Send an email via SMTP.

    :param subject: Email subject
    :param sender: Email of the sender
    :param body: Email content
    :param recipient: Email to send to
    """
    if recipient is None:
        recipient = settings.EMAIL_RECIPIENT

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    msg.set_content(body)

    with smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT) as smtp:
        smtp.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
        smtp.send_message(msg)