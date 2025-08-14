# Contact API (FastAPI)

A minimal FastAPI backend to receive contact form submissions.

## Run locally

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

## Environment variables (optional SMTP)

- SMTP_HOST (e.g., smtp.gmail.com)
- SMTP_PORT (default 587)
- SMTP_USER
- SMTP_PASS
- SMTP_FROM (defaults to SMTP_USER)
- SMTP_TO (your receiving email)

If SMTP vars are not provided, the API still returns ok=true but delivered=false.

## Endpoint

- POST /api/contact

Request:
```
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Hello",
  "message": "I would like to get in touch..."
}
```

Response:
```
{ "ok": true, "delivered": true }
```
