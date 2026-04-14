"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminApiError, AdminAppointment, fetchAdminAppointment } from "@/lib/admin-api";

export default function AdminAppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<AdminAppointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const appointmentId = params?.id;
    if (!appointmentId) return;
    fetchAdminAppointment(appointmentId)
      .then(setItem)
      .catch((err) => {
        setError(err instanceof AdminApiError ? err.message : "Failed to load appointment");
      });
  }, [params?.id]);

  return (
    <AdminShell title="Appointment Detail">
      <Link href="/admin/appointments" className="mb-4 inline-block text-sm text-teal-700">
        Back to appointments
      </Link>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {!item ? (
        <p className="text-sm text-slate-500">Loading appointment...</p>
      ) : (
        <dl className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <Info label="Booking Ref" value={item.booking_reference} />
          <Info label="Status" value={item.status} />
          <Info label="Service" value={item.service_id} />
          <Info label="Date" value={item.appointment_date} />
          <Info label="Bucket" value={item.time_bucket} />
          <Info label="Patient" value={item.name} />
          <Info label="Phone" value={item.phone} />
          <Info label="Age" value={String(item.age)} />
          <Info label="Gender" value={item.gender} />
          <Info label="Concern" value={item.concern ?? "-"} />
          <Info label="Notes" value={item.internal_notes ?? "-"} />
          <Info label="Created At" value={item.created_at} />
        </dl>
      )}
    </AdminShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-slate-900">{value}</dd>
    </div>
  );
}
