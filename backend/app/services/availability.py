from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.models import DailyBucketCapacity, Service
from app.services.slots import SLOT_TIMES


def get_availability(session: Session, service_id: str, appointment_date: date) -> dict:
    service = session.get(Service, service_id)
    if not service or not service.is_active:
        raise ApiError("SERVICE_NOT_FOUND", "Service not found", 404)

    slots_out: list[dict] = []
    for slot_time in SLOT_TIMES:
        row = session.scalar(
            select(DailyBucketCapacity).where(
                DailyBucketCapacity.service_id == service_id,
                DailyBucketCapacity.appointment_date == appointment_date,
                DailyBucketCapacity.slot_time == slot_time,
            )
        )
        if row is None:
            remaining = settings.default_bucket_max_capacity
            max_cap = settings.default_bucket_max_capacity
        else:
            max_cap = row.max_capacity
            remaining = max(0, max_cap - row.used_capacity)

        slots_out.append(
            {
                "slot_time": slot_time,
                "available": remaining > 0,
                "remaining": remaining,
            }
        )

    return {
        "service_id": service_id,
        "appointment_date": appointment_date.isoformat(),
        "slots": slots_out,
    }
