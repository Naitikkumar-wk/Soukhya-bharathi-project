import json
import uuid

from sqlalchemy.orm import Session

from app.db.models import AuditLog


def add_audit_log(
    session: Session,
    *,
    actor_user_id: uuid.UUID,
    action: str,
    resource_type: str,
    resource_id: str,
    before: dict | None = None,
    after: dict | None = None,
) -> None:
    session.add(
        AuditLog(
            actor_user_id=actor_user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            before_json=json.dumps(before) if before is not None else None,
            after_json=json.dumps(after) if after is not None else None,
        )
    )
