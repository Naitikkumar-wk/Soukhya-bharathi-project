"""add booking_for to appointments

Revision ID: a006_add_booking_appointments
Revises: a005_add_pharmacy_diagnostics
Create Date: 2026-04-22
"""

from alembic import op
import sqlalchemy as sa


revision = "a006_add_booking_appointments"
down_revision = "a005_add_pharmacy_diagnostics"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "appointments",
        sa.Column("booking_for", sa.String(length=16), nullable=False, server_default="self"),
    )
    op.execute(
        """
        UPDATE appointments
        SET booking_for = 'self'
        WHERE booking_for IS NULL OR booking_for = ''
        """
    )
    op.alter_column("appointments", "booking_for", server_default=None)


def downgrade() -> None:
    op.drop_column("appointments", "booking_for")
