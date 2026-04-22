"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminBadge, AdminEmptyState, AdminSkeleton, AdminToolbar } from "@/components/admin/AdminUi";
import {
  AdminApiError,
  AdminAppointment,
  AdminAppointmentsFilters,
  cancelAdminAppointment,
  fetchAdminAppointments,
  rescheduleAdminAppointment,
  updateAdminAppointment,
} from "@/lib/admin-api";

const SLOT_TIMES = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
] as const;

function toYyyyMmDd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ymdOffset(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return toYyyyMmDd(now);
}

export default function AdminAppointmentsPage() {
  const today = ymdOffset(0);
  const tomorrow = ymdOffset(1);
  const nextDay = ymdOffset(2);
  const [items, setItems] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AdminAppointmentsFilters>({
    status: "",
    service_id: "",
    slot_time: "",
    phone: "",
    booking_reference: "",
    date_from: today,
    date_to: today,
    limit: 100,
  });
  const [specificDate, setSpecificDate] = useState(today);

  async function load(nextFilters: AdminAppointmentsFilters = filters) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminAppointments(nextFilters);
      setItems(data.items);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appliedFilters = Object.entries(filters).filter(([, value]) => {
    if (value === "" || value === undefined || value === null) return false;
    return true;
  });

  function setFilter<K extends keyof AdminAppointmentsFilters>(key: K, value: AdminAppointmentsFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    load(filters);
  }

  function handleSpecificDate() {
    if (!specificDate) return;
    const next = { ...filters, date_from: specificDate, date_to: specificDate };
    setFilters(next);
    load(next);
  }

  function handleResetFilters() {
    const reset: AdminAppointmentsFilters = {
      status: "",
      service_id: "",
      slot_time: "",
      phone: "",
      booking_reference: "",
      date_from: today,
      date_to: today,
      limit: 100,
    };
    setSpecificDate(today);
    setFilters(reset);
    load(reset);
  }

  function handleQuickDay(dateValue: string) {
    const next = { ...filters, date_from: dateValue, date_to: dateValue };
    setSpecificDate(dateValue);
    setFilters(next);
    load(next);
  }

  return (
    <AdminShell title="Appointments">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <AdminToolbar className="mb-4">
        <form className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleApplyFilters}>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              From date
            </label>
            <input
              type="date"
              value={filters.date_from ?? ""}
              onChange={(event) => setFilter("date_from", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">To date</label>
            <input
              type="date"
              value={filters.date_to ?? ""}
              onChange={(event) => setFilter("date_to", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
            <select
              value={filters.status ?? ""}
              onChange={(event) => setFilter("status", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Service</label>
            <input
              value={filters.service_id ?? ""}
              onChange={(event) => setFilter("service_id", event.target.value)}
              placeholder="e.g. ayurveda-consultation"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Slot time
            </label>
            <select
              value={filters.slot_time ?? ""}
              onChange={(event) => setFilter("slot_time", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All slots</option>
              {SLOT_TIMES.map((slotTime) => (
                <option key={slotTime} value={slotTime}>
                  {slotTime}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</label>
            <input
              value={filters.phone ?? ""}
              onChange={(event) => setFilter("phone", event.target.value)}
              placeholder="Search by phone"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Booking ref
            </label>
            <input
              value={filters.booking_reference ?? ""}
              onChange={(event) => setFilter("booking_reference", event.target.value)}
              placeholder="Search by booking reference"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Limit</label>
            <input
              type="number"
              min={1}
              max={500}
              value={filters.limit ?? 100}
              onChange={(event) => setFilter("limit", Number(event.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Apply filters
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickDay(today)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                specificDate === today
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickDay(tomorrow)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                specificDate === tomorrow
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handleQuickDay(nextDay)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                specificDate === nextDay
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Next day
            </button>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Specific date quick search
            </label>
            <input
              type="date"
              value={specificDate}
              onChange={(event) => setSpecificDate(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleSpecificDate}
            className="rounded-lg border border-teal-300 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
            Show this date bookings
          </button>
          {appliedFilters.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map(([key, value]) => (
                <AdminBadge key={key} tone="info">
                  {key}: {String(value)}
                </AdminBadge>
              ))}
            </div>
          ) : null}
        </div>
      </AdminToolbar>
      {loading ? (
        <AdminSkeleton rows={4} />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <AppointmentRow key={item.id} item={item} onChanged={load} />
          ))}
          {items.length === 0 && (
            <AdminEmptyState
              title="No appointments found"
              description="Try changing the date or filter values. Use quick search for a single booking day."
            />
          )}
        </div>
      )}
    </AdminShell>
  );
}

function AppointmentRow({
  item,
  onChanged,
}: {
  item: AdminAppointment;
  onChanged: (filters?: AdminAppointmentsFilters) => Promise<void>;
}) {
  const [notes, setNotes] = useState(item.internal_notes ?? "");
  const [rescheduleDate, setRescheduleDate] = useState(item.appointment_date);
  const [rescheduleSlotTime, setRescheduleSlotTime] = useState(item.slot_time);
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
        slot_time: rescheduleSlotTime,
      });
      await onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not reschedule appointment");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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
          <AdminBadge tone={statusTone(item.status)}>
            {item.status}
          </AdminBadge>
        </div>
      </div>
      <p className="mt-1 text-xs text-slate-600">
        {item.service_id} | {item.appointment_date} | {item.slot_time} | {item.phone}
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
          value={rescheduleSlotTime}
          onChange={(e) => setRescheduleSlotTime(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          {SLOT_TIMES.map((slotTime) => (
            <option key={slotTime} value={slotTime}>
              {slotTime}
            </option>
          ))}
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

function statusTone(status: string): "default" | "success" | "warning" | "danger" | "info" {
  if (status === "confirmed") return "success";
  if (status === "cancelled") return "danger";
  return "default";
}
