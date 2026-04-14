from pydantic import BaseModel


class AdminReportSummary(BaseModel):
    total: int
    confirmed: int
    cancelled: int
    morning: int
    afternoon: int
    evening: int
