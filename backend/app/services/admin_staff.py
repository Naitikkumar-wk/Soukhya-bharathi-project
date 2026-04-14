from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.exceptions import ApiError
from app.db.models import AdminUser
from app.services.admin_audit import add_audit_log
from app.services.security import hash_password


def list_staff_users(session: Session) -> list[AdminUser]:
    return session.scalars(select(AdminUser).order_by(AdminUser.created_at.desc())).all()


def create_staff_user(
    session: Session, *, actor_user_id, email: str, password: str, role: str
) -> AdminUser:
    existing = session.scalar(select(AdminUser).where(AdminUser.email == email.lower()))
    if existing is not None:
        raise ApiError("VALIDATION_ERROR", "Email already exists", 409)
    user = AdminUser(
        email=email.lower(),
        password_hash=hash_password(password),
        role=role,
        is_active=True,
    )
    session.add(user)
    session.flush()
    add_audit_log(
        session,
        actor_user_id=actor_user_id,
        action="staff.create",
        resource_type="admin_user",
        resource_id=str(user.id),
        after={"email": user.email, "role": user.role, "is_active": user.is_active},
    )
    session.commit()
    session.refresh(user)
    return user


def set_staff_active_state(
    session: Session, *, actor_user_id, user_id: str, is_active: bool
) -> AdminUser:
    user = session.get(AdminUser, user_id)
    if user is None:
        raise ApiError("NOT_FOUND", "Staff user not found", 404)
    before = {"is_active": user.is_active}
    user.is_active = is_active
    session.add(user)
    add_audit_log(
        session,
        actor_user_id=actor_user_id,
        action="staff.set_active",
        resource_type="admin_user",
        resource_id=str(user.id),
        before=before,
        after={"is_active": user.is_active},
    )
    session.commit()
    session.refresh(user)
    return user
