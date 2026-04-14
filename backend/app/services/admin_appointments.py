from datetime import date
import uuid

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.core.exceptions import ApiError
from app.db.models import Appointment, DailyBucketCapacity
from app.services.admin_audit import add_audit_log
from app.services.booking import _ensure_bucket_row, appointment_to_response

VALID_STATUSES = {"confirmed", "cancelled"}
VALID_BUCKETS = {"morning", "afternoon", "evening"}


def _appointment_to_admin_response(a: Appointment) -> dict:
    base = appointment_to_response(a)
    base["internal_notes"] = a.internal_notes
    base["source"] = a.source
    return base


def list_admin_appointments(
    session: Session,
    *,
    date_from: date | None,
    date_to: date | None,
    status: str | None,
    service_id: str | None,
    phone: str | None,
    booking_reference: str | None,
    limit: int,
) -> list[dict]:
    query: Select[tuple[Appointment]] = select(Appointment).order_by(Appointment.created_at.desc())
    if date_from is not None:
        query = query.where(Appointment.appointment_date >= date_from)
    if date_to is not None:
        query = query.where(Appointment.appointment_date <= date_to)
    if status:
        query = query.where(Appointment.status == status)
    if service_id:
        query = query.where(Appointment.service_id == service_id)
    if phone:
        query = query.where(Appointment.phone.ilike(f"%{phone.strip()}%"))
    if booking_reference:
        query = query.where(Appointment.booking_reference.ilike(f"%{booking_reference.strip()}%"))
    rows = session.scalars(query.limit(limit)).all()
    return [_appointment_to_admin_response(row) for row in rows]


def get_admin_appointment(session: Session, appointment_id: str) -> Appointment:
    appointment: Appointment | None = None
    try:
        appointment = session.get(Appointment, uuid.UUID(appointment_id))
    except ValueError:
        appointment = session.scalar(
            select(Appointment).where(Appointment.booking_reference == appointment_id)
        )
    if appointment is None:
        raise ApiError("NOT_FOUND", "Appointment not found", 404)
    return appointment


def update_admin_appointment(
    session: Session,
    *,
    appointment: Appointment,
    actor_user_id,
    status: str | None,
    internal_notes: str | None,
) -> dict:
    if status and status not in VALID_STATUSES:
        raise ApiError("VALIDATION_ERROR", "Invalid status", 422)
    before = _appointment_to_admin_response(appointment)
    changed = False
    if status and appointment.status != status:
        appointment.status = status
        changed = True
    if internal_notes is not None and appointment.internal_notes != internal_notes:
        appointment.internal_notes = internal_notes
        changed = True
    if changed:
        session.add(appointment)
        add_audit_log(
            session,
            actor_user_id=actor_user_id,
            action="appointment.update",
            resource_type="appointment",
            resource_id=str(appointment.id),
            before=before,
            after=_appointment_to_admin_response(appointment),
        )
        session.commit()
        session.refresh(appointment)
    return _appointment_to_admin_response(appointment)


def cancel_admin_appointment(
    session: Session,
    *,
    appointment: Appointment,
    actor_user_id,
    reason: str | None = None,
) -> dict:
    if appointment.status == "cancelled":
        return _appointment_to_admin_response(appointment)

    bucket = session.scalar(
        select(DailyBucketCapacity)
        .where(
            DailyBucketCapacity.service_id == appointment.service_id,
            DailyBucketCapacity.appointment_date == appointment.appointment_date,
            DailyBucketCapacity.time_bucket == appointment.time_bucket,
        )
        .with_for_update()
    )
    if bucket and bucket.used_capacity > 0:
        bucket.used_capacity -= 1
        session.add(bucket)

    before = _appointment_to_admin_response(appointment)
    appointment.status = "cancelled"
    if reason:
        note = f"Cancelled: {reason}"
        appointment.internal_notes = (
            f"{appointment.internal_notes}\n{note}" if appointment.internal_notes else note
        )
    session.add(appointment)
    add_audit_log(
        session,
        actor_user_id=actor_user_id,
        action="appointment.cancel",
        resource_type="appointment",
        resource_id=str(appointment.id),
        before=before,
        after=_appointment_to_admin_response(appointment),
    )
    session.commit()
    session.refresh(appointment)
    return _appointment_to_admin_response(appointment)


def reschedule_admin_appointment(
    session: Session,
    *,
    appointment: Appointment,
    actor_user_id,
    appointment_date: date,
    time_bucket: str,
) -> dict:
    if time_bucket not in VALID_BUCKETS:
        raise ApiError("VALIDATION_ERROR", "Invalid time bucket", 422)
    if appointment.status == "cancelled":
        raise ApiError("VALIDATION_ERROR", "Cancelled appointment cannot be rescheduled", 409)
    if appointment_date.weekday() == 6:
        raise ApiError("VALIDATION_ERROR", "Sunday bookings are not available", 422)

    old_bucket = _ensure_bucket_row(
        session,
        appointment.service_id,
        appointment.appointment_date,
        appointment.time_bucket,
    )
    new_bucket = _ensure_bucket_row(session, appointment.service_id, appointment_date, time_bucket)
    if new_bucket.used_capacity >= new_bucket.max_capacity:
        raise ApiError("BUCKET_FULL", "Selected bucket is no longer available", 409)

    before = _appointment_to_admin_response(appointment)
    if old_bucket.used_capacity > 0:
        old_bucket.used_capacity -= 1
    new_bucket.used_capacity += 1
    appointment.appointment_date = appointment_date
    appointment.time_bucket = time_bucket
    session.add(old_bucket)
    session.add(new_bucket)
    session.add(appointment)
    add_audit_log(
        session,
        actor_user_id=actor_user_id,
        action="appointment.reschedule",
        resource_type="appointment",
        resource_id=str(appointment.id),
        before=before,
        after=_appointment_to_admin_response(appointment),
    )
    session.commit()
    session.refresh(appointment)
    return _appointment_to_admin_response(appointment)
