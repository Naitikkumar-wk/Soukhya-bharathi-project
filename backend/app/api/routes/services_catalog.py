from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Service
from app.db.session import get_db

router = APIRouter()


@router.get("/services")
def list_services(db: Session = Depends(get_db)):
    rows = db.scalars(
        select(Service).where(Service.is_active.is_(True)).order_by(Service.group, Service.name)
    ).all()
    return {
        "items": [
            {"id": s.id, "name": s.name, "group": s.group, "is_active": s.is_active} for s in rows
        ]
    }
