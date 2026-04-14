from pydantic import BaseModel, Field


class AdminCapacityBucket(BaseModel):
    service_id: str
    appointment_date: str
    time_bucket: str
    max_capacity: int
    used_capacity: int
    remaining: int


class AdminCapacityListResponse(BaseModel):
    items: list[AdminCapacityBucket]


class AdminCapacityPatch(BaseModel):
    max_capacity: int = Field(..., ge=1, le=500)
