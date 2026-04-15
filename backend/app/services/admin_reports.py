import csv
import io
from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Appointment
from app.services.slots import slot_period


def get_appointment_summary(
    session: Session, *, date_from: date | None = None, date_to: date | None = None
) -> dict:
    query = select(Appointment)
    if date_from is not None:
        query = query.where(Appointment.appointment_date >= date_from)
    if date_to is not None:
        query = query.where(Appointment.appointment_date <= date_to)
    rows = session.scalars(query).all()
    periods = [slot_period(row.slot_time) for row in rows]
    return {
        "total": len(rows),
        "confirmed": sum(1 for row in rows if row.status == "confirmed"),
        "cancelled": sum(1 for row in rows if row.status == "cancelled"),
        "morning": sum(1 for period in periods if period == "morning"),
        "afternoon": sum(1 for period in periods if period == "afternoon"),
        "evening": sum(1 for period in periods if period == "evening"),
    }


def build_appointment_csv(
    session: Session,
    *,
    date_from: date | None = None,
    date_to: date | None = None,
    status: str | None = None,
) -> str:
    query = select(Appointment).order_by(Appointment.created_at.desc())
    if date_from is not None:
        query = query.where(Appointment.appointment_date >= date_from)
    if date_to is not None:
        query = query.where(Appointment.appointment_date <= date_to)
    if status:
        query = query.where(Appointment.status == status)
    rows = session.scalars(query).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        [
            "id",
            "booking_reference",
            "status",
            "service_id",
            "appointment_date",
            "slot_time",
            "name",
            "phone",
            "age",
            "gender",
            "created_at",
        ]
    )
    for row in rows:
        writer.writerow(
            [
                str(row.id),
                row.booking_reference,
                row.status,
                row.service_id,
                row.appointment_date.isoformat(),
                row.slot_time,
                row.name,
                row.phone,
                row.age,
                row.gender,
                row.created_at.isoformat().replace("+00:00", "Z"),
            ]
        )
    return output.getvalue()
