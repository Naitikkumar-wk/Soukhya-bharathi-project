from app.services.slots import SLOT_TIMES, is_valid_slot_time, slot_period


def test_slot_window_and_break():
    assert SLOT_TIMES[0] == "8:00 AM"
    assert SLOT_TIMES[-1] == "7:30 PM"
    assert len(SLOT_TIMES) == 22
    assert "1:00 PM" not in SLOT_TIMES
    assert "1:30 PM" not in SLOT_TIMES


def test_slot_validation_and_period_mapping():
    assert is_valid_slot_time("8:30 AM") is True
    assert is_valid_slot_time("1:00 PM") is False
    assert slot_period("10:00 AM") == "morning"
    assert slot_period("2:30 PM") == "afternoon"
    assert slot_period("6:00 PM") == "evening"
