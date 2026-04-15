"""migrate bucket scheduling to slot_time

Revision ID: a003_slot_time_schema
Revises: a002_admin_dashboard
Create Date: 2026-04-15
"""

from alembic import op
import sqlalchemy as sa

revision = "a003_slot_time_schema"
down_revision = "a002_admin_dashboard"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("appointments", sa.Column("slot_time", sa.String(16), nullable=True))
    op.add_column("daily_bucket_capacities", sa.Column("slot_time", sa.String(16), nullable=True))

    op.execute(
        sa.text(
            """
            UPDATE appointments
            SET slot_time = CASE
                WHEN time_bucket = 'morning' THEN '8:00 AM'
                WHEN time_bucket = 'afternoon' THEN '2:00 PM'
                WHEN time_bucket = 'evening' THEN '6:00 PM'
                ELSE '8:00 AM'
            END
            """
        )
    )
    op.execute(
        sa.text(
            """
            UPDATE daily_bucket_capacities
            SET slot_time = CASE
                WHEN time_bucket = 'morning' THEN '8:00 AM'
                WHEN time_bucket = 'afternoon' THEN '2:00 PM'
                WHEN time_bucket = 'evening' THEN '6:00 PM'
                ELSE '8:00 AM'
            END
            """
        )
    )

    op.alter_column("appointments", "slot_time", nullable=False)
    op.alter_column("daily_bucket_capacities", "slot_time", nullable=False)

    op.drop_constraint("uq_bucket_service_date_slot", "daily_bucket_capacities", type_="unique")
    op.create_unique_constraint(
        "uq_capacity_service_date_slot_time",
        "daily_bucket_capacities",
        ["service_id", "appointment_date", "slot_time"],
    )

    op.drop_index("ix_appointments_duplicate_lookup", table_name="appointments")
    op.create_index(
        "ix_appointments_duplicate_lookup",
        "appointments",
        ["phone_normalized", "service_id", "appointment_date", "slot_time"],
    )

    op.drop_column("appointments", "time_bucket")
    op.drop_column("daily_bucket_capacities", "time_bucket")


def downgrade() -> None:
    op.add_column("appointments", sa.Column("time_bucket", sa.String(16), nullable=True))
    op.add_column("daily_bucket_capacities", sa.Column("time_bucket", sa.String(16), nullable=True))

    op.execute(
        sa.text(
            """
            UPDATE appointments
            SET time_bucket = CASE
                WHEN slot_time IN ('8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM')
                    THEN 'morning'
                WHEN slot_time IN ('12:00 PM','12:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM')
                    THEN 'afternoon'
                ELSE 'evening'
            END
            """
        )
    )
    op.execute(
        sa.text(
            """
            UPDATE daily_bucket_capacities
            SET time_bucket = CASE
                WHEN slot_time IN ('8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM')
                    THEN 'morning'
                WHEN slot_time IN ('12:00 PM','12:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM')
                    THEN 'afternoon'
                ELSE 'evening'
            END
            """
        )
    )

    op.alter_column("appointments", "time_bucket", nullable=False)
    op.alter_column("daily_bucket_capacities", "time_bucket", nullable=False)

    op.drop_constraint("uq_capacity_service_date_slot_time", "daily_bucket_capacities", type_="unique")
    op.create_unique_constraint(
        "uq_bucket_service_date_slot",
        "daily_bucket_capacities",
        ["service_id", "appointment_date", "time_bucket"],
    )

    op.drop_index("ix_appointments_duplicate_lookup", table_name="appointments")
    op.create_index(
        "ix_appointments_duplicate_lookup",
        "appointments",
        ["phone_normalized", "service_id", "appointment_date", "time_bucket"],
    )

    op.drop_column("appointments", "slot_time")
    op.drop_column("daily_bucket_capacities", "slot_time")
