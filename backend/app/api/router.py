from fastapi import APIRouter

from app.api.routes import appointments, availability, health, services_catalog

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(services_catalog.router, tags=["services"])
api_router.include_router(availability.router, tags=["availability"])
api_router.include_router(appointments.router, tags=["appointments"])

