def normalize_phone(raw: str) -> str | None:
    """India-first E.164-style normalization for storage and matching."""
    s = raw.strip()
    digits = "".join(ch for ch in s if ch.isdigit())
    if not digits:
        return None

    if s.startswith("+"):
        return f"+{digits}"

    if len(digits) == 10:
        return f"+91{digits}"

    if digits.startswith("91") and len(digits) == 12:
        return f"+{digits}"

    if len(digits) >= 10:
        return f"+{digits}"

    return None


def is_plausible_in_mobile(normalized: str) -> bool:
    if not normalized.startswith("+91"):
        return False
    rest = normalized[3:]
    return len(rest) == 10 and rest.isdigit()
