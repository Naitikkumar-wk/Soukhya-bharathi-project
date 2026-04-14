from datetime import UTC, datetime, timedelta
from typing import Any

import bcrypt
import jwt

from app.core.config import settings
from app.core.exceptions import ApiError

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except Exception:
        return False


def create_admin_access_token(*, user_id: str, role: str) -> str:
    now = datetime.now(UTC)
    payload: dict[str, Any] = {
        "sub": user_id,
        "role": role,
        "type": "access",
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=settings.admin_jwt_ttl_minutes)).timestamp()),
    }
    return jwt.encode(payload, settings.admin_jwt_secret, algorithm=settings.admin_jwt_algorithm)


def decode_admin_access_token(token: str) -> dict[str, Any]:
    try:
        decoded = jwt.decode(
            token,
            settings.admin_jwt_secret,
            algorithms=[settings.admin_jwt_algorithm],
        )
        if decoded.get("type") != "access":
            raise ApiError("AUTH_INVALID_TOKEN", "Invalid token type", 401)
        return decoded
    except jwt.ExpiredSignatureError as exc:
        raise ApiError("AUTH_TOKEN_EXPIRED", "Token expired", 401) from exc
    except jwt.InvalidTokenError as exc:
        raise ApiError("AUTH_INVALID_TOKEN", "Invalid token", 401) from exc
