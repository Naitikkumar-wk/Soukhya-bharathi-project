from datetime import date

from pydantic import BaseModel, Field


class AdminAppointmentRead(BaseModel):
    id: str
    booking_reference: str
    status: str
    service_id: str
    appointment_date: str
    slot_time: str
    name: str
    phone: str
    age: int
    gender: str
    concern: str | None
    internal_notes: str | None
    source: str
    created_at: str


class AdminAppointmentListResponse(BaseModel):
    items: list[AdminAppointmentRead]


class AdminAppointmentPatch(BaseModel):
    status: str | None = Field(default=None, pattern="^(confirmed|cancelled)$")
    internal_notes: str | None = Field(default=None, max_length=1000)


class AdminAppointmentCancelBody(BaseModel):
    reason: str | None = Field(default=None, max_length=300)


class AdminAppointmentRescheduleBody(BaseModel):
    appointment_date: date
    slot_time: str = Field(..., max_length=16)
