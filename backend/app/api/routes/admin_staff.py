from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps.admin_auth import require_roles
from app.db.models import AdminUser
from app.db.session import get_db
from app.schemas.admin import AdminUserCreate, AdminUserListResponse, AdminUserRead, AdminUserUpdate
from app.services.admin_staff import create_staff_user, list_staff_users, set_staff_active_state

router = APIRouter(prefix="/admin/staff")


def _to_user_read(user: AdminUser) -> AdminUserRead:
    return AdminUserRead(
        id=str(user.id),
        email=user.email,
        role=user.role,
        is_active=user.is_active,
    )


@router.get("", response_model=AdminUserListResponse)
def admin_list_staff(
    _current_user: AdminUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
):
    users = list_staff_users(db)
    return {"items": [_to_user_read(u) for u in users]}


@router.post("", response_model=AdminUserRead)
def admin_create_staff(
    body: AdminUserCreate,
    current_user: AdminUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
):
    user = create_staff_user(
        db,
        actor_user_id=current_user.id,
        email=str(body.email),
        password=body.password,
        role=body.role,
    )
    return _to_user_read(user)


@router.patch("/{user_id}", response_model=AdminUserRead)
def admin_update_staff(
    user_id: str,
    body: AdminUserUpdate,
    current_user: AdminUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
):
    user = set_staff_active_state(
        db,
        actor_user_id=current_user.id,
        user_id=user_id,
        is_active=body.is_active,
    )
    return _to_user_read(user)


@router.delete("/{user_id}", response_model=AdminUserRead)
def admin_disable_staff(
    user_id: str,
    current_user: AdminUser = Depends(require_roles("admin")),
    db: Session = Depends(get_db),
):
    user = set_staff_active_state(
        db,
        actor_user_id=current_user.id,
        user_id=user_id,
        is_active=False,
    )
    return _to_user_read(user)
