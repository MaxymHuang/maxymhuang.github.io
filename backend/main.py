import os
import smtplib
from email.message import EmailMessage
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(min_length=10, max_length=5000)


app = FastAPI(title="Contact API", version="1.0.0")

# Allow CORS for local/dev; when proxied via nginx this is not required
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def send_email_via_smtp(payload: ContactRequest) -> None:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    mail_from = os.getenv("SMTP_FROM", smtp_user or "")
    mail_to = os.getenv("SMTP_TO")

    if not (smtp_host and mail_from and mail_to):
        # Missing config; skip sending
        raise RuntimeError("SMTP not configured")

    msg = EmailMessage()
    msg["Subject"] = payload.subject or f"New contact message from {payload.name}"
    msg["From"] = mail_from
    msg["To"] = mail_to
    body = (
        f"Name: {payload.name}\n"
        f"Email: {payload.email}\n"
        f"Subject: {payload.subject}\n\n"
        f"Message:\n{payload.message}\n"
    )
    msg.set_content(body)

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        if smtp_user and smtp_pass:
            server.login(smtp_user, smtp_pass)
        server.send_message(msg)


@app.post("/api/contact")
def create_contact(req: ContactRequest):
    # Try SMTP; if not configured, just acknowledge receipt
    try:
        send_email_via_smtp(req)
        delivered = True
    except Exception:
        delivered = False

    return {"ok": True, "delivered": delivered}


