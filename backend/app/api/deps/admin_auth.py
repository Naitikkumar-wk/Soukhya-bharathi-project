from collections.abc import Callable
from typing import Any

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.exceptions import ApiError
from app.db.models import AdminUser
from app.db.session import get_db
from app.services.security import decode_admin_access_token

bearer_scheme = HTTPBearer(auto_error=False)


def _extract_bearer_token(authorization: str | None) -> str:
    if not authorization:
        raise ApiError("AUTH_REQUIRED", "Authorization header missing", 401)
    parts = authorization.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise ApiError("AUTH_REQUIRED", "Bearer token required", 401)
    token = parts[1].strip()
    if not token:
        raise ApiError("AUTH_REQUIRED", "Bearer token required", 401)
    return token


def get_current_admin_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> AdminUser:
    authorization = f"{credentials.scheme} {credentials.credentials}" if credentials is not None else None
    token = _extract_bearer_token(authorization)
    payload = decode_admin_access_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise ApiError("AUTH_INVALID_TOKEN", "Token subject missing", 401)
    user = db.get(AdminUser, user_id)
    if user is None or not user.is_active:
        raise ApiError("AUTH_INVALID_USER", "User is inactive or not found", 401)
    return user


def require_roles(*roles: str) -> Callable[[AdminUser], Any]:
    allowed = set(roles)

    def _dependency(current_user: AdminUser = Depends(get_current_admin_user)) -> AdminUser:
        if current_user.role not in allowed:
            raise ApiError("FORBIDDEN", "You do not have access to this resource", 403)
        return current_user

    return _dependency
