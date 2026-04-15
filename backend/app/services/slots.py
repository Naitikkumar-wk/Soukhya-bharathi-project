SLOT_TIMES: tuple[str, ...] = (
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
)

SLOT_TIME_SET = frozenset(SLOT_TIMES)
SLOT_ORDER = {slot_time: idx for idx, slot_time in enumerate(SLOT_TIMES)}

PERIOD_BY_SLOT: dict[str, str] = {
    "8:00 AM": "morning",
    "8:30 AM": "morning",
    "9:00 AM": "morning",
    "9:30 AM": "morning",
    "10:00 AM": "morning",
    "10:30 AM": "morning",
    "11:00 AM": "morning",
    "11:30 AM": "morning",
    "12:00 PM": "afternoon",
    "12:30 PM": "afternoon",
    "2:00 PM": "afternoon",
    "2:30 PM": "afternoon",
    "3:00 PM": "afternoon",
    "3:30 PM": "afternoon",
    "4:00 PM": "evening",
    "4:30 PM": "evening",
    "5:00 PM": "evening",
    "5:30 PM": "evening",
    "6:00 PM": "evening",
    "6:30 PM": "evening",
    "7:00 PM": "evening",
    "7:30 PM": "evening",
}


def is_valid_slot_time(slot_time: str) -> bool:
    return slot_time in SLOT_TIME_SET


def slot_sort_key(slot_time: str) -> int:
    return SLOT_ORDER.get(slot_time, 9999)


def slot_period(slot_time: str) -> str:
    return PERIOD_BY_SLOT.get(slot_time, "evening")
