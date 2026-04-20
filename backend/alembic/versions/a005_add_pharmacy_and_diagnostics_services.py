"""add pharmacy and diagnostics services

Revision ID: a005_add_pharmacy_diagnostics
Revises: a004_appointment_email
Create Date: 2026-04-20
"""

from alembic import op


revision = "a005_add_pharmacy_diagnostics"
down_revision = "a004_appointment_email"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(
        """
        INSERT INTO services (id, code, name, "group", is_active)
        VALUES
          ('diagnostic-services', 'diagnostic-services', 'Diagnostic Services', 'specialty', true),
          ('saukhya-aushadi', 'saukhya-aushadi', 'Saukhya Aushadi (Pharmacy)', 'wellness', true)
        ON CONFLICT (id) DO NOTHING
        """
    )


def downgrade() -> None:
    op.execute(
        """
        DELETE FROM services
        WHERE id IN ('diagnostic-services', 'saukhya-aushadi')
        """
    )
