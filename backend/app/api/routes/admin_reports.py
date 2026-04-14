from datetime import date

from fastapi import APIRouter, Depends, Query
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from app.api.deps.admin_auth import require_roles
from app.db.models import AdminUser
from app.db.session import get_db
from app.schemas.admin_reports import AdminReportSummary
from app.services.admin_reports import build_appointment_csv, get_appointment_summary

router = APIRouter(prefix="/admin/reports")


@router.get("/summary", response_model=AdminReportSummary)
def admin_reports_summary(
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
    _current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    return get_appointment_summary(db, date_from=date_from, date_to=date_to)


@router.get("/appointments.csv", response_class=PlainTextResponse)
def admin_reports_csv(
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
    status: str | None = Query(default=None),
    _current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    return build_appointment_csv(db, date_from=date_from, date_to=date_to, status=status)
