import json
import logging
import smtplib
import uuid
from email.message import EmailMessage

from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models import Appointment
from app.db.session import SessionLocal
from app.db.models import NotificationEvent

log = logging.getLogger(__name__)


def _build_confirmation_email(appointment: Appointment) -> tuple[str, str]:
    subject = f"Appointment Confirmed - {appointment.booking_reference}"
    body = (
        "Your Soukhya Bharathi appointment is confirmed.\n\n"
        f"Booking reference: {appointment.booking_reference}\n"
        f"Service: {appointment.service_id}\n"
        f"Date: {appointment.appointment_date.isoformat()}\n"
        f"Time: {appointment.slot_time}\n\n"
        "Please keep this booking reference for any follow-up changes."
    )
    return subject, body


def _send_via_smtp(to_email: str, subject: str, body: str) -> str:
    if not settings.smtp_host:
        raise ValueError("SMTP host is not configured")

    message = EmailMessage()
    message["From"] = settings.email_from
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)

    if settings.smtp_use_tls:
        with smtplib.SMTP(
            settings.smtp_host,
            settings.smtp_port,
            timeout=settings.smtp_timeout_seconds,
        ) as server:
            server.starttls()
            if settings.smtp_username and settings.smtp_password:
                server.login(settings.smtp_username, settings.smtp_password)
            response = server.send_message(message)
    else:
        with smtplib.SMTP(
            settings.smtp_host,
            settings.smtp_port,
            timeout=settings.smtp_timeout_seconds,
        ) as server:
            if settings.smtp_username and settings.smtp_password:
                server.login(settings.smtp_username, settings.smtp_password)
            response = server.send_message(message)

    # Empty dict means all recipients accepted.
    return "accepted" if not response else "partial"


def process_confirmation_email(notification_id: uuid.UUID) -> None:
    db: Session = SessionLocal()
    try:
        ev = db.get(NotificationEvent, notification_id)
        if ev is None or ev.status != "queued":
            return

        appointment = db.get(Appointment, ev.appointment_id)
        if appointment is None or not appointment.email:
            ev.status = "failed"
            ev.error_code = "EMAIL_NOT_AVAILABLE"
            ev.response_payload = json.dumps({"reason": "appointment email is missing"})
            db.commit()
            return

        subject, body = _build_confirmation_email(appointment)
        provider = (ev.provider or settings.email_provider).strip().lower()

        if provider == "smtp":
            provider_result = _send_via_smtp(appointment.email, subject, body)
            ev.response_payload = json.dumps(
                {"provider": "smtp", "result": provider_result, "to": appointment.email}
            )
        else:
            ev.response_payload = json.dumps(
                {"stub": True, "provider": provider, "to": appointment.email, "subject": subject}
            )

        ev.status = "sent"
        ev.error_code = None
        db.commit()
    except Exception:
        log.exception("email_confirmation_failed notification_id=%s", notification_id)
        db.rollback()
        try:
            ev = db.get(NotificationEvent, notification_id)
            if ev is not None:
                ev.status = "failed"
                ev.error_code = "EMAIL_DELIVERY_FAILED"
                db.commit()
        except Exception:
            db.rollback()
    finally:
        db.close()
