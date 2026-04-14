from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps.admin_auth import get_current_admin_user
from app.core.config import settings
from app.db.models import AdminUser
from app.db.session import get_db
from app.schemas.admin import AdminLoginRequest, AdminLoginResponse, AdminUserRead
from app.services.admin_auth import authenticate_admin_user
from app.services.security import create_admin_access_token

router = APIRouter(prefix="/admin/auth")


def _to_user_read(user: AdminUser) -> AdminUserRead:
    return AdminUserRead(
        id=str(user.id),
        email=user.email,
        role=user.role,
        is_active=user.is_active,
    )


@router.post("/login", response_model=AdminLoginResponse)
def login_admin(body: AdminLoginRequest, db: Session = Depends(get_db)):
    user = authenticate_admin_user(db, email=body.email, password=body.password)
    token = create_admin_access_token(user_id=str(user.id), role=user.role)
    return AdminLoginResponse(
        access_token=token,
        expires_in_seconds=settings.admin_jwt_ttl_minutes * 60,
        user=_to_user_read(user),
    )


@router.post("/logout")
def logout_admin():
    return {"ok": True}


@router.get("/me", response_model=AdminUserRead)
def current_admin_user(current_user: AdminUser = Depends(get_current_admin_user)):
    return _to_user_read(current_user)
