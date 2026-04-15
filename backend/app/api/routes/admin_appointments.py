from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps.admin_auth import require_roles
from app.db.models import AdminUser
from app.db.session import get_db
from app.schemas.admin_appointments import (
    AdminAppointmentCancelBody,
    AdminAppointmentListResponse,
    AdminAppointmentPatch,
    AdminAppointmentRead,
    AdminAppointmentRescheduleBody,
)
from app.services.admin_appointments import (
    cancel_admin_appointment,
    get_admin_appointment,
    list_admin_appointments,
    reschedule_admin_appointment,
    update_admin_appointment,
)

router = APIRouter(prefix="/admin/appointments")


@router.get("", response_model=AdminAppointmentListResponse)
def admin_list_appointments(
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
    status: str | None = Query(default=None),
    service_id: str | None = Query(default=None),
    slot_time: str | None = Query(default=None),
    phone: str | None = Query(default=None),
    booking_reference: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
    _current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    return {
        "items": list_admin_appointments(
            db,
            date_from=date_from,
            date_to=date_to,
            status=status,
            service_id=service_id,
            slot_time=slot_time,
            phone=phone,
            booking_reference=booking_reference,
            limit=limit,
        )
    }


@router.get("/{appointment_id}", response_model=AdminAppointmentRead)
def admin_get_appointment(
    appointment_id: str,
    _current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    appointment = get_admin_appointment(db, appointment_id)
    return {
        "id": str(appointment.id),
        "booking_reference": appointment.booking_reference,
        "status": appointment.status,
        "service_id": appointment.service_id,
        "appointment_date": appointment.appointment_date.isoformat(),
        "slot_time": appointment.slot_time,
        "name": appointment.name,
        "phone": appointment.phone,
        "age": appointment.age,
        "gender": appointment.gender,
        "concern": appointment.concern,
        "internal_notes": appointment.internal_notes,
        "source": appointment.source,
        "created_at": appointment.created_at.isoformat().replace("+00:00", "Z"),
    }


@router.patch("/{appointment_id}", response_model=AdminAppointmentRead)
def admin_patch_appointment(
    appointment_id: str,
    body: AdminAppointmentPatch,
    current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    appointment = get_admin_appointment(db, appointment_id)
    return update_admin_appointment(
        db,
        appointment=appointment,
        actor_user_id=current_user.id,
        status=body.status,
        internal_notes=body.internal_notes,
    )


@router.post("/{appointment_id}/cancel", response_model=AdminAppointmentRead)
def admin_cancel_appointment(
    appointment_id: str,
    body: AdminAppointmentCancelBody,
    current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    appointment = get_admin_appointment(db, appointment_id)
    return cancel_admin_appointment(
        db,
        appointment=appointment,
        actor_user_id=current_user.id,
        reason=body.reason,
    )


@router.post("/{appointment_id}/reschedule", response_model=AdminAppointmentRead)
def admin_reschedule_appointment(
    appointment_id: str,
    body: AdminAppointmentRescheduleBody,
    current_user: AdminUser = Depends(require_roles("admin", "staff")),
    db: Session = Depends(get_db),
):
    appointment = get_admin_appointment(db, appointment_id)
    return reschedule_admin_appointment(
        db,
        appointment=appointment,
        actor_user_id=current_user.id,
        appointment_date=body.appointment_date,
        slot_time=body.slot_time,
    )
