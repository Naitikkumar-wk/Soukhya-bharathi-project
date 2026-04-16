import json
import re
import secrets
import uuid
from datetime import date, datetime, timedelta, timezone
from typing import Any

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.models import (
    Appointment,
    DailyBucketCapacity,
    IdempotencyRecord,
    NotificationEvent,
    Service,
)
from app.services.idempotency import hash_appointment_payload
from app.services.phone import is_plausible_in_mobile, normalize_phone
from app.services.slots import is_valid_slot_time

try:
    from zoneinfo import ZoneInfo
except ImportError:
    ZoneInfo = None  # type: ignore[misc, assignment]

IST = ZoneInfo("Asia/Kolkata") if ZoneInfo else None
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _today_booking_calendar() -> date:
    if IST is not None:
        return datetime.now(IST).date()
    return datetime.now(timezone.utc).date()


def _duplicate_cutoff_utc() -> datetime:
    return datetime.now(timezone.utc) - timedelta(
        hours=settings.duplicate_booking_window_hours
    )


def generate_booking_reference(appointment_date: date) -> str:
    suffix = secrets.token_hex(3).upper()
    return f"SBH-{appointment_date.strftime('%Y%m%d')}-{suffix}"


def _ensure_slot_row(
    session: Session, service_id: str, appointment_date: date, slot_time: str
) -> DailyBucketCapacity:
    row = session.scalar(
        select(DailyBucketCapacity)
        .where(
            DailyBucketCapacity.service_id == service_id,
            DailyBucketCapacity.appointment_date == appointment_date,
            DailyBucketCapacity.slot_time == slot_time,
        )
        .with_for_update()
    )
    if row is not None:
        return row

    candidate = DailyBucketCapacity(
        service_id=service_id,
        appointment_date=appointment_date,
        slot_time=slot_time,
        max_capacity=settings.default_bucket_max_capacity,
        used_capacity=0,
        version=0,
    )
    session.add(candidate)
    try:
        with session.begin_nested():
            session.flush()
    except IntegrityError:
        pass

    row = session.scalar(
        select(DailyBucketCapacity)
        .where(
            DailyBucketCapacity.service_id == service_id,
            DailyBucketCapacity.appointment_date == appointment_date,
            DailyBucketCapacity.slot_time == slot_time,
        )
        .with_for_update()
    )
    if row is None:
        raise ApiError(
            "INTERNAL_ERROR",
            "Could not initialize capacity row",
            500,
        )
    return row


def appointment_to_response(a: Appointment) -> dict[str, Any]:
    return {
        "id": str(a.id),
        "booking_reference": a.booking_reference,
        "status": a.status,
        "service_id": a.service_id,
        "appointment_date": a.appointment_date.isoformat(),
        "slot_time": a.slot_time,
        "name": a.name,
        "email": a.email,
        "phone": a.phone,
        "age": a.age,
        "gender": a.gender,
        "concern": a.concern,
        "created_at": a.created_at.isoformat().replace("+00:00", "Z"),
    }


def create_booking(
    session: Session,
    *,
    service_id: str,
    appointment_date: date,
    slot_time: str,
    name: str,
    email: str,
    phone_raw: str,
    age: int,
    gender: str,
    concern: str | None,
    consent_accepted: bool,
    source: str,
    idempotency_key: str | None,
    payload_for_hash: dict[str, Any],
) -> tuple[dict[str, Any], uuid.UUID | None]:
    if not consent_accepted:
        raise ApiError(
            "VALIDATION_ERROR",
            "consent_accepted is required",
            422,
        )

    if not is_valid_slot_time(slot_time):
        raise ApiError("VALIDATION_ERROR", "Invalid slot_time", 422)

    if gender not in ("male", "female", "other"):
        raise ApiError("VALIDATION_ERROR", "Invalid gender", 422)

    nm = name.strip()
    if not nm or len(nm) > 120:
        raise ApiError("VALIDATION_ERROR", "Invalid name", 422)
    em = email.strip().lower()
    if len(em) > 255 or not EMAIL_RE.match(em):
        raise ApiError("VALIDATION_ERROR", "Invalid email", 422)

    if concern is not None and len(concern) > 300:
        raise ApiError("VALIDATION_ERROR", "concern exceeds max length", 422)

    if age < 1 or age > 120:
        raise ApiError("VALIDATION_ERROR", "age must be between 1 and 120", 422)

    today = _today_booking_calendar()
    if appointment_date < today:
        raise ApiError("VALIDATION_ERROR", "appointment_date must not be in the past", 422)

    if appointment_date.weekday() == 6:
        raise ApiError("VALIDATION_ERROR", "Sunday bookings are not available", 422)

    normalized_phone = normalize_phone(phone_raw)
    if not normalized_phone or not is_plausible_in_mobile(normalized_phone):
        raise ApiError("VALIDATION_ERROR", "Invalid phone number", 422)

    service = session.get(Service, service_id)
    if not service or not service.is_active:
        raise ApiError("SERVICE_NOT_FOUND", "Service not found", 404)

    p_hash = hash_appointment_payload(payload_for_hash)

    if idempotency_key:
        existing_idem = session.scalar(
            select(IdempotencyRecord).where(IdempotencyRecord.key == idempotency_key)
        )
        if existing_idem:
            if existing_idem.payload_hash != p_hash:
                raise ApiError(
                    "IDEMPOTENCY_MISMATCH",
                    "Idempotency key was used with a different payload",
                    409,
                )
            return json.loads(existing_idem.response_json), None

    dup = session.scalar(
        select(Appointment).where(
            Appointment.phone_normalized == normalized_phone,
            Appointment.service_id == service_id,
            Appointment.appointment_date == appointment_date,
            Appointment.slot_time == slot_time,
            Appointment.status == "confirmed",
            Appointment.created_at >= _duplicate_cutoff_utc(),
        )
    )
    if dup:
        raise ApiError(
            "DUPLICATE_BOOKING",
            "A booking already exists for this phone, service, date, and time slot",
            409,
        )

    bucket = _ensure_slot_row(session, service_id, appointment_date, slot_time)
    if bucket.used_capacity >= bucket.max_capacity:
        raise ApiError(
            "BUCKET_FULL",
            "Selected bucket is no longer available",
            409,
        )

    bucket.used_capacity += 1

    appt: Appointment | None = None
    for _ in range(8):
        booking_ref = generate_booking_reference(appointment_date)
        candidate = Appointment(
            booking_reference=booking_ref,
            service_id=service_id,
            appointment_date=appointment_date,
            slot_time=slot_time,
            status="confirmed",
            name=nm,
            email=em,
            phone=normalized_phone,
            phone_normalized=normalized_phone,
            age=age,
            gender=gender,
            concern=concern,
            consent_accepted=True,
            source=source,
            idempotency_key=idempotency_key,
        )
        session.add(candidate)
        try:
            with session.begin_nested():
                session.flush()
        except IntegrityError:
            session.expunge(candidate)
            continue
        appt = candidate
        break
    if appt is None:
        raise ApiError("INTERNAL_ERROR", "Could not allocate booking reference", 500)

    notif = NotificationEvent(
        appointment_id=appt.id,
        provider=settings.email_provider,
        template_id=settings.email_template_id,
        status="queued",
        request_payload=json.dumps(
            {
                "to": em,
                "template": settings.email_template_id,
                "booking_reference": appt.booking_reference,
            }
        ),
    )
    session.add(notif)

    session.flush()
    session.refresh(appt)

    body = appointment_to_response(appt)
    response_json = json.dumps(body)

    if idempotency_key:
        session.add(
            IdempotencyRecord(
                key=idempotency_key,
                payload_hash=p_hash,
                response_json=response_json,
                appointment_id=appt.id,
            )
        )
        session.flush()

    return body, notif.id


def get_appointment_by_lookup(session: Session, booking_id: str) -> Appointment | None:
    try:
        uid = uuid.UUID(booking_id)
        return session.get(Appointment, uid)
    except ValueError:
        return session.scalar(
            select(Appointment).where(Appointment.booking_reference == booking_id)
        )
