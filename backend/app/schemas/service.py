from pydantic import BaseModel


class ServiceItem(BaseModel):
    id: str
    name: str
    group: str
    is_active: bool


class ServiceListResponse(BaseModel):
    items: list[ServiceItem]
