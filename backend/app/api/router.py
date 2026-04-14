from fastapi import APIRouter

from app.api.routes import (
    admin_appointments,
    admin_auth,
    admin_capacity,
    admin_reports,
    admin_staff,
    appointments,
    availability,
    health,
    services_catalog,
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(services_catalog.router, tags=["services"])
api_router.include_router(availability.router, tags=["availability"])
api_router.include_router(appointments.router, tags=["appointments"])
api_router.include_router(admin_auth.router, tags=["admin-auth"])
api_router.include_router(admin_appointments.router, tags=["admin-appointments"])
api_router.include_router(admin_capacity.router, tags=["admin-capacity"])
api_router.include_router(admin_reports.router, tags=["admin-reports"])
api_router.include_router(admin_staff.router, tags=["admin-staff"])

