import hashlib
import json
from typing import Any


def hash_appointment_payload(payload: dict[str, Any]) -> str:
    canonical = {
        "appointment_date": payload["appointment_date"],
        "service_id": payload["service_id"],
        "time_bucket": payload["time_bucket"],
        "name": payload["name"],
        "phone": payload["phone"],
        "age": payload["age"],
        "gender": payload["gender"],
        "concern": payload.get("concern"),
        "consent_accepted": payload["consent_accepted"],
        "source": payload.get("source") or "web",
    }
    body = json.dumps(canonical, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(body.encode()).hexdigest()
