import json
import logging
import uuid

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.db.models import NotificationEvent

log = logging.getLogger(__name__)


def process_stub_sms(notification_id: uuid.UUID) -> None:
    db: Session = SessionLocal()
    try:
        ev = db.get(NotificationEvent, notification_id)
        if ev is None or ev.status != "queued":
            return
        ev.status = "sent"
        ev.response_payload = json.dumps({"stub": True, "provider": ev.provider})
        db.commit()
    except Exception:
        log.exception("stub_sms_failed notification_id=%s", notification_id)
        db.rollback()
    finally:
        db.close()
