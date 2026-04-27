from datetime import date
from typing import Literal

from pydantic import BaseModel, Field


class AppointmentCreate(BaseModel):
    service_id: str = Field(..., max_length=64)
    appointment_date: date
    slot_time: str = Field(..., max_length=16)
    name: str = Field(..., max_length=120)
    email: str = Field(..., min_length=5, max_length=255)
    phone: str = Field(..., max_length=32)
    age: int = Field(..., ge=1, le=120)
    gender: Literal["male", "female", "other"]
    booking_for: Literal["self", "parent", "others"] = "self"
    concern: str | None = Field(None, max_length=300)
    consent_accepted: bool
    source: str = Field(default="web", max_length=32)
    idempotency_key: str | None = Field(None, max_length=255)
    captcha_token: str | None = Field(None, max_length=2048)


class AppointmentRead(BaseModel):
    id: str
    booking_reference: str
    status: str
    service_id: str
    appointment_date: str
    slot_time: str
    name: str
    email: str | None
    phone: str
    age: int
    gender: str
    booking_for: str
    concern: str | None
    created_at: str
