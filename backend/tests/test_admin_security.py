from types import SimpleNamespace

import pytest

from app.api.deps.admin_auth import _extract_bearer_token, require_roles
from app.core.exceptions import ApiError
from app.services.security import create_admin_access_token, decode_admin_access_token


def test_extract_bearer_token_success():
    assert _extract_bearer_token("Bearer token-123") == "token-123"


def test_extract_bearer_token_missing():
    with pytest.raises(ApiError) as exc:
        _extract_bearer_token(None)
    assert exc.value.code == "AUTH_REQUIRED"


def test_round_trip_admin_token():
    token = create_admin_access_token(user_id="abc-123", role="admin")
    payload = decode_admin_access_token(token)
    assert payload["sub"] == "abc-123"
    assert payload["role"] == "admin"


def test_require_roles_forbidden():
    dep = require_roles("admin")
    with pytest.raises(ApiError) as exc:
        dep(current_user=SimpleNamespace(role="staff"))
    assert exc.value.status_code == 403
