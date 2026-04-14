"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminApiError,
  AdminAppointment,
  cancelAdminAppointment,
  fetchAdminAppointments,
  rescheduleAdminAppointment,
  updateAdminAppointment,
} from "@/lib/admin-api";

export default function AdminAppointmentsPage() {
  const [items, setItems] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminAppointments();
      setItems(data.items);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminShell title="Appointments">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading appointments...</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <AppointmentRow key={item.id} item={item} onChanged={load} />
          ))}
          {items.length === 0 && <p className="text-sm text-slate-500">No appointments found.</p>}
        </div>
      )}
    </AdminShell>
  );
}

function AppointmentRow({ item, onChanged }: { item: AdminAppointment; onChanged: () => Promise<void> }) {
  const [notes, setNotes] = useState(item.internal_notes ?? "");
  const [rescheduleDate, setRescheduleDate] = useState(item.appointment_date);
  const [rescheduleBucket, setRescheduleBucket] = useState<"morning" | "afternoon" | "evening">(
    item.time_bucket
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveNotes(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAdminAppointment(item.id, { internal_notes: notes });
      await onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not save notes");
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel() {
    setSaving(true);
    setError(null);
    try {
      await cancelAdminAppointment(item.id, "Cancelled by operations");
      await onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not cancel appointment");
    } finally {
      setSaving(false);
    }
  }

  async function handleReschedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await rescheduleAdminAppointment(item.id, {
        appointment_date: rescheduleDate,
        time_bucket: rescheduleBucket,
      });
      await onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not reschedule appointment");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">
          {item.name} - {item.booking_reference}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/appointments/${item.id}`}
            className="rounded-full border border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-700"
          >
            Open
          </Link>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {item.status}
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-slate-600">
        {item.service_id} | {item.appointment_date} | {item.time_bucket} | {item.phone}
      </p>
      <form className="mt-3 flex gap-2" onSubmit={handleSaveNotes}>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
        >
          Save Notes
        </button>
      </form>
      <form className="mt-2 flex flex-wrap gap-2" onSubmit={handleReschedule}>
        <input
          type="date"
          value={rescheduleDate}
          onChange={(e) => setRescheduleDate(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={rescheduleBucket}
          onChange={(e) => setRescheduleBucket(e.target.value as "morning" | "afternoon" | "evening")}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md border border-teal-600 px-3 py-2 text-sm font-medium text-teal-700"
        >
          Reschedule
        </button>
        <button
          type="button"
          disabled={saving || item.status === "cancelled"}
          onClick={handleCancel}
          className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600"
        >
          Cancel
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
