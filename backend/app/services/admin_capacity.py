from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.models import DailyBucketCapacity
from app.services.admin_audit import add_audit_log
from app.services.booking import _ensure_bucket_row


def list_capacity_rows(
    session: Session, *, appointment_date: date | None, service_id: str | None, limit: int
) -> list[dict]:
    query = select(DailyBucketCapacity).order_by(
        DailyBucketCapacity.appointment_date.desc(),
        DailyBucketCapacity.service_id.asc(),
        DailyBucketCapacity.time_bucket.asc(),
    )
    if appointment_date is not None:
        query = query.where(DailyBucketCapacity.appointment_date == appointment_date)
    if service_id:
        query = query.where(DailyBucketCapacity.service_id == service_id)
    rows = session.scalars(query.limit(limit)).all()
    return [
        {
            "service_id": row.service_id,
            "appointment_date": row.appointment_date.isoformat(),
            "time_bucket": row.time_bucket,
            "max_capacity": row.max_capacity,
            "used_capacity": row.used_capacity,
            "remaining": max(0, row.max_capacity - row.used_capacity),
        }
        for row in rows
    ]


def upsert_capacity_row(
    session: Session,
    *,
    actor_user_id,
    service_id: str,
    appointment_date: date,
    time_bucket: str,
    max_capacity: int,
) -> dict:
    if time_bucket not in {"morning", "afternoon", "evening"}:
        raise ApiError("VALIDATION_ERROR", "Invalid time bucket", 422)
    row = _ensure_bucket_row(session, service_id, appointment_date, time_bucket)
    before = {
        "max_capacity": row.max_capacity,
        "used_capacity": row.used_capacity,
    }
    if max_capacity < row.used_capacity:
        raise ApiError(
            "VALIDATION_ERROR",
            "max_capacity cannot be lower than used_capacity",
            422,
        )
    row.max_capacity = max_capacity
    session.add(row)
    add_audit_log(
        session,
        actor_user_id=actor_user_id,
        action="capacity.update",
        resource_type="daily_bucket_capacity",
        resource_id=str(row.id),
        before=before,
        after={"max_capacity": row.max_capacity, "used_capacity": row.used_capacity},
    )
    session.commit()
    session.refresh(row)
    return {
        "service_id": row.service_id,
        "appointment_date": row.appointment_date.isoformat(),
        "time_bucket": row.time_bucket,
        "max_capacity": row.max_capacity,
        "used_capacity": row.used_capacity,
        "remaining": max(0, row.max_capacity - row.used_capacity),
    }


def default_capacity_view(service_id: str, appointment_date: date, time_bucket: str) -> dict:
    return {
        "service_id": service_id,
        "appointment_date": appointment_date.isoformat(),
        "time_bucket": time_bucket,
        "max_capacity": settings.default_bucket_max_capacity,
        "used_capacity": 0,
        "remaining": settings.default_bucket_max_capacity,
    }
