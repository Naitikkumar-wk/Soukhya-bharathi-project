from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps.admin_auth import require_roles
from app.core.exceptions import ApiError
from app.db.models import AdminUser
from app.db.session import get_db
from app.schemas.admin_capacity import (
    AdminCapacityBucket,
    AdminCapacityListResponse,
    AdminCapacityPatch,
)
from app.services.admin_capacity import list_capacity_rows, upsert_capacity_row

router = APIRouter(prefix="/admin/capacity")


@router.get("", response_model=AdminCapacityListResponse)
def admin_list_capacity(
    date: date | None = Query(default=None),
    service_id: str | None = Query(default=None),
    limit: int = Query(default=200, ge=1, le=500),
    _current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    return {
        "items": list_capacity_rows(
            db,
            appointment_date=date,
            service_id=service_id,
            limit=limit,
        )
    }


@router.patch("/{service_id}/{date_str}/{slot_time}", response_model=AdminCapacityBucket)
def admin_update_capacity(
    service_id: str,
    date_str: str,
    slot_time: str,
    body: AdminCapacityPatch,
    current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    try:
        appointment_date = date.fromisoformat(date_str)
    except ValueError as exc:
        raise ApiError("VALIDATION_ERROR", "date must be yyyy-mm-dd", 400) from exc
    return upsert_capacity_row(
        db,
        actor_user_id=current_user.id,
        service_id=service_id,
        appointment_date=appointment_date,
        slot_time=slot_time,
        max_capacity=body.max_capacity,
    )
