from app.services import admin_auth


class FakeSession:
    def __init__(self, values: list[int]):
        self._values = values

    def scalar(self, _query):
        return self._values.pop(0)


def test_bootstrap_status_with_admins_and_config(monkeypatch):
    monkeypatch.setattr(admin_auth.settings, "admin_bootstrap_email", "owner@example.com")
    monkeypatch.setattr(admin_auth.settings, "admin_bootstrap_password", "StrongPass123!")

    status = admin_auth.get_admin_bootstrap_status(FakeSession([2, 1]))

    assert status == {
        "has_any_admin": True,
        "has_active_admin": True,
        "bootstrap_configured": True,
    }


def test_bootstrap_status_without_admins_or_config(monkeypatch):
    monkeypatch.setattr(admin_auth.settings, "admin_bootstrap_email", None)
    monkeypatch.setattr(admin_auth.settings, "admin_bootstrap_password", None)

    status = admin_auth.get_admin_bootstrap_status(FakeSession([0, 0]))

    assert status == {
        "has_any_admin": False,
        "has_active_admin": False,
        "bootstrap_configured": False,
    }
