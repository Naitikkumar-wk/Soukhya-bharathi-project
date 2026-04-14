import uuid

import pytest

from app.core.exceptions import ApiError
from app.db.models import AdminUser
from app.services.admin_staff import set_staff_active_state


class FakeSession:
    def __init__(self, user: AdminUser, active_admin_count: int):
        self.user = user
        self.active_admin_count = active_admin_count
        self.committed = False

    def get(self, _model, _user_id):
        return self.user

    def scalar(self, _query):
        return self.active_admin_count

    def add(self, _obj):
        return None

    def commit(self):
        self.committed = True

    def refresh(self, _obj):
        return None


def test_block_disabling_last_active_admin():
    admin_user = AdminUser(
        id=uuid.uuid4(),
        email="admin@example.com",
        password_hash="hash",
        role="admin",
        is_active=True,
    )
    session = FakeSession(admin_user, active_admin_count=1)

    with pytest.raises(ApiError) as exc:
        set_staff_active_state(
            session,
            actor_user_id=uuid.uuid4(),
            user_id=str(admin_user.id),
            is_active=False,
        )

    assert exc.value.status_code == 409
    assert "active admin" in exc.value.message.lower()
    assert session.committed is False


def test_allow_disabling_admin_when_multiple_active_admins():
    admin_user = AdminUser(
        id=uuid.uuid4(),
        email="admin2@example.com",
        password_hash="hash",
        role="admin",
        is_active=True,
    )
    session = FakeSession(admin_user, active_admin_count=2)

    updated = set_staff_active_state(
        session,
        actor_user_id=uuid.uuid4(),
        user_id=str(admin_user.id),
        is_active=False,
    )

    assert updated.is_active is False
    assert session.committed is True
