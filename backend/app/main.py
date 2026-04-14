from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.middleware import RequestIdMiddleware
from app.api.router import api_router
from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.session import SessionLocal
from app.services.admin_auth import ensure_bootstrap_admin


app = FastAPI(title="SBH API", version="0.1.0")

app.add_middleware(RequestIdMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_origin_regex=settings.allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ApiError)
async def api_error_handler(request: Request, exc: ApiError):
    rid = getattr(request.state, "request_id", "unknown")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "request_id": rid,
            }
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, _exc: RequestValidationError):
    rid = getattr(request.state, "request_id", "unknown")
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Request validation failed",
                "request_id": rid,
            }
        },
    )


app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
def bootstrap_admin_user():
    db = SessionLocal()
    try:
        ensure_bootstrap_admin(db)
    finally:
        db.close()

