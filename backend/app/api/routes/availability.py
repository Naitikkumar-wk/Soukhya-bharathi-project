from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.exceptions import ApiError
from app.db.session import get_db
from app.services.availability import get_availability

router = APIRouter()


def _parse_date(raw: str):
    try:
        return datetime.strptime(raw, "%Y-%m-%d").date()
    except ValueError:
        raise ApiError("VALIDATION_ERROR", "date must be yyyy-mm-dd", 400)


@router.get("/availability")
def read_availability(
    service_id: str = Query(..., min_length=1, max_length=64),
    date: str = Query(..., alias="date"),
    db: Session = Depends(get_db),
):
    appointment_date = _parse_date(date)
    return get_availability(db, service_id, appointment_date)
