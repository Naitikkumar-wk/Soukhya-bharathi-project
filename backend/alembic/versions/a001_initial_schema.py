"""initial schema and service seed

Revision ID: a001_initial
Revises:
Create Date: 2026-04-13

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "a001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "services",
        sa.Column("id", sa.String(64), primary_key=True),
        sa.Column("code", sa.String(64), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("group", sa.String(32), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
    )
    op.create_index("ix_services_code", "services", ["code"], unique=True)

    op.create_table(
        "daily_bucket_capacities",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("service_id", sa.String(64), sa.ForeignKey("services.id"), nullable=False),
        sa.Column("appointment_date", sa.Date(), nullable=False),
        sa.Column("time_bucket", sa.String(16), nullable=False),
        sa.Column("max_capacity", sa.Integer(), nullable=False),
        sa.Column("used_capacity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("version", sa.Integer(), nullable=False, server_default="0"),
        sa.UniqueConstraint(
            "service_id",
            "appointment_date",
            "time_bucket",
            name="uq_bucket_service_date_slot",
        ),
    )

    op.create_table(
        "appointments",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("booking_reference", sa.String(32), nullable=False),
        sa.Column("service_id", sa.String(64), sa.ForeignKey("services.id"), nullable=False),
        sa.Column("appointment_date", sa.Date(), nullable=False),
        sa.Column("time_bucket", sa.String(16), nullable=False),
        sa.Column("status", sa.String(16), nullable=False, server_default="confirmed"),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("phone", sa.String(32), nullable=False),
        sa.Column("phone_normalized", sa.String(32), nullable=False),
        sa.Column("age", sa.Integer(), nullable=False),
        sa.Column("gender", sa.String(16), nullable=False),
        sa.Column("concern", sa.Text(), nullable=True),
        sa.Column("consent_accepted", sa.Boolean(), nullable=False),
        sa.Column("source", sa.String(32), nullable=False, server_default="web"),
        sa.Column("idempotency_key", sa.String(255), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_appointments_booking_reference", "appointments", ["booking_reference"], unique=True)
    op.create_index("ix_appointments_phone_normalized", "appointments", ["phone_normalized"])
    op.create_index(
        "ix_appointments_duplicate_lookup",
        "appointments",
        ["phone_normalized", "service_id", "appointment_date", "time_bucket"],
    )
    op.create_index("ix_appointments_idempotency_key", "appointments", ["idempotency_key"], unique=True)

    op.create_table(
        "notification_events",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("appointment_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("provider", sa.String(64), nullable=False),
        sa.Column("template_id", sa.String(64), nullable=False),
        sa.Column("status", sa.String(16), nullable=False),
        sa.Column("provider_message_id", sa.String(128), nullable=True),
        sa.Column("request_payload", sa.Text(), nullable=True),
        sa.Column("response_payload", sa.Text(), nullable=True),
        sa.Column("error_code", sa.String(64), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["appointment_id"], ["appointments.id"]),
    )

    op.create_table(
        "idempotency_records",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("key", sa.String(255), nullable=False),
        sa.Column("payload_hash", sa.String(64), nullable=False),
        sa.Column("response_json", sa.Text(), nullable=False),
        sa.Column("appointment_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["appointment_id"], ["appointments.id"]),
    )
    op.create_index("ix_idempotency_records_key", "idempotency_records", ["key"], unique=True)

    services = sa.table(
        "services",
        sa.column("id", sa.String),
        sa.column("code", sa.String),
        sa.column("name", sa.String),
        sa.column("group", sa.String),
        sa.column("is_active", sa.Boolean),
    )
    seed = [
        {
            "id": "cancer-care",
            "code": "cancer-care",
            "name": "Cancer Care & Surgical Oncology",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "neuro-care",
            "code": "neuro-care",
            "name": "Neurological Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "cardiac-care",
            "code": "cardiac-care",
            "name": "Cardiac Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "respiratory-care",
            "code": "respiratory-care",
            "name": "Respiratory Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "womens-care",
            "code": "womens-care",
            "name": "Women's Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "pediatric-care",
            "code": "pediatric-care",
            "name": "Pediatric Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "skin-hair-care",
            "code": "skin-hair-care",
            "name": "Skin & Hair Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "digestive-care",
            "code": "digestive-care",
            "name": "Digestive Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "endocrinology-care",
            "code": "endocrinology-care",
            "name": "Endocrinology Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "musculoskeletal-care",
            "code": "musculoskeletal-care",
            "name": "Musculoskeletal Care",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "other-services",
            "code": "other-services",
            "name": "Other Services",
            "group": "specialty",
            "is_active": True,
        },
        {
            "id": "panchakarma",
            "code": "panchakarma",
            "name": "Panchakarma",
            "group": "wellness",
            "is_active": True,
        },
        {
            "id": "acupuncture",
            "code": "acupuncture",
            "name": "Acupuncture",
            "group": "wellness",
            "is_active": True,
        },
        {
            "id": "cupping",
            "code": "cupping",
            "name": "Cupping Therapy",
            "group": "wellness",
            "is_active": True,
        },
        {
            "id": "yoga",
            "code": "yoga",
            "name": "Yoga Therapy",
            "group": "wellness",
            "is_active": True,
        },
        {
            "id": "kalari",
            "code": "kalari",
            "name": "Kalari Marma Therapy",
            "group": "wellness",
            "is_active": True,
        },
    ]
    op.bulk_insert(services, seed)


def downgrade() -> None:
    op.drop_table("idempotency_records")
    op.drop_table("notification_events")
    op.drop_table("appointments")
    op.drop_table("daily_bucket_capacities")
    op.drop_table("services")
