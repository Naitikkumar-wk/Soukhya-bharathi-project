from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ApiError
from app.db.models import AdminUser
from app.services.security import hash_password, verify_password


def ensure_bootstrap_admin(session: Session) -> None:
    email = settings.admin_bootstrap_email
    password = settings.admin_bootstrap_password
    if not email or not password:
        return
    existing = session.scalar(select(AdminUser).where(AdminUser.email == email.lower()))
    if existing is not None:
        return
    session.add(
        AdminUser(
            email=email.lower(),
            password_hash=hash_password(password),
            role="admin",
            is_active=True,
        )
    )
    session.commit()


def authenticate_admin_user(session: Session, *, email: str, password: str) -> AdminUser:
    user = session.scalar(select(AdminUser).where(AdminUser.email == email.strip().lower()))
    if user is None or not user.is_active:
        raise ApiError("AUTH_INVALID_CREDENTIALS", "Invalid credentials", 401)
    if not verify_password(password, user.password_hash):
        raise ApiError("AUTH_INVALID_CREDENTIALS", "Invalid credentials", 401)
    user.last_login_at = datetime.now(UTC)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
