from datetime import date
import uuid

from app.api.routes import admin_appointments
from app.db.models import AdminUser


def test_admin_list_appointments_passes_all_filters(monkeypatch):
    captured_kwargs = {}

    def fake_list_admin_appointments(_db, **kwargs):
        captured_kwargs.update(kwargs)
        return []

    monkeypatch.setattr(admin_appointments, "list_admin_appointments", fake_list_admin_appointments)

    response = admin_appointments.admin_list_appointments(
        date_from=date(2026, 4, 1),
        date_to=date(2026, 4, 30),
        status="confirmed",
        service_id="care",
        slot_time="8:00 AM",
        phone="9999",
        booking_reference="SBH123",
        limit=50,
        _current_user=AdminUser(
            id=uuid.uuid4(),
            email="staff@example.com",
            password_hash="hash",
            role="staff",
            is_active=True,
        ),
        db=object(),
    )

    assert response == {"items": []}
    assert captured_kwargs == {
        "date_from": date(2026, 4, 1),
        "date_to": date(2026, 4, 30),
        "status": "confirmed",
        "service_id": "care",
        "slot_time": "8:00 AM",
        "phone": "9999",
        "booking_reference": "SBH123",
        "limit": 50,
    }
