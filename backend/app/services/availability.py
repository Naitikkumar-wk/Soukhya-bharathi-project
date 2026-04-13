from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.models import DailyBucketCapacity, Service

ORDERED_BUCKETS = ("morning", "afternoon", "evening")


def get_availability(session: Session, service_id: str, appointment_date: date) -> dict:
    service = session.get(Service, service_id)
    if not service or not service.is_active:
        raise ApiError("SERVICE_NOT_FOUND", "Service not found", 404)

    buckets_out: list[dict] = []
    for tb in ORDERED_BUCKETS:
        row = session.scalar(
            select(DailyBucketCapacity).where(
                DailyBucketCapacity.service_id == service_id,
                DailyBucketCapacity.appointment_date == appointment_date,
                DailyBucketCapacity.time_bucket == tb,
            )
        )
        if row is None:
            remaining = settings.default_bucket_max_capacity
            max_cap = settings.default_bucket_max_capacity
        else:
            max_cap = row.max_capacity
            remaining = max(0, max_cap - row.used_capacity)

        buckets_out.append(
            {
                "time_bucket": tb,
                "available": remaining > 0,
                "remaining": remaining,
            }
        )

    return {
        "service_id": service_id,
        "appointment_date": appointment_date.isoformat(),
        "buckets": buckets_out,
    }
