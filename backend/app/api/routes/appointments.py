from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, Header, Request
from app.core.config import settings
from sqlalchemy.orm import Session

from app.core.exceptions import ApiError
from app.db.session import get_db
from app.schemas.appointment import AppointmentCreate, AppointmentRead
from app.services.booking import appointment_to_response, create_booking, get_appointment_by_lookup
from app.services.captcha import verify_turnstile_token
from app.services.notification_tasks import process_confirmation_email

router = APIRouter()


def _clean_idempotency_key(value: str | None) -> str | None:
    if value is None:
        return None
    stripped = value.strip()
    return stripped or None


@router.post("/appointments", status_code=201, response_model=AppointmentRead)
def post_appointment(
    body: AppointmentCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    idempotency_key_header: Annotated[str | None, Header(alias="Idempotency-Key")] = None,
):
    effective_key = _clean_idempotency_key(idempotency_key_header) or _clean_idempotency_key(
        body.idempotency_key
    )
    payload_for_hash = body.model_dump(mode="json")
    payload_for_hash.pop("idempotency_key", None)
    payload_for_hash.pop("captcha_token", None)

    if settings.captcha_enabled:
        verify_turnstile_token(body.captcha_token, remote_ip=request.client.host if request.client else None)

    try:
        result, notif_id = create_booking(
            db,
            service_id=body.service_id,
            appointment_date=body.appointment_date,
            slot_time=body.slot_time,
            name=body.name,
            email=body.email,
            phone_raw=body.phone,
            age=body.age,
            gender=body.gender,
            booking_for=body.booking_for,
            concern=body.concern,
            consent_accepted=body.consent_accepted,
            source=body.source,
            idempotency_key=effective_key,
            payload_for_hash=payload_for_hash,
        )
        if notif_id is not None:
            db.commit()
            background_tasks.add_task(process_confirmation_email, notif_id)
        return result
    except ApiError:
        db.rollback()
        raise


@router.get("/appointments/{booking_id}", response_model=AppointmentRead)
def get_appointment(booking_id: str, db: Session = Depends(get_db)):
    appt = get_appointment_by_lookup(db, booking_id)
    if appt is None:
        raise ApiError("NOT_FOUND", "Appointment not found", 404)
    return appointment_to_response(appt)
