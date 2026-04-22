"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminBadge, AdminEmptyState } from "@/components/admin/AdminUi";
import { AdminApiError, AdminCapacityRow, fetchAdminCapacity } from "@/lib/admin-api";

export default function AdminCapacityPage() {
  const [rows, setRows] = useState<AdminCapacityRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminCapacity()
      .then((data) => setRows(data.items))
      .catch((err) => {
        setError(err instanceof AdminApiError ? err.message : "Could not load capacity");
      });
  }, []);

  const fullCount = rows.filter((row) => row.remaining <= 0).length;
  const criticalCount = rows.filter((row) => row.remaining > 0 && row.remaining <= 2).length;
  const availableCount = rows.filter((row) => row.remaining > 2).length;

  return (
    <AdminShell title="Capacity">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {rows.length > 0 ? (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Capacity rows</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{rows.length}</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Full buckets</p>
            <p className="mt-1 text-2xl font-semibold text-rose-800">{fullCount}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Critical buckets</p>
            <p className="mt-1 text-2xl font-semibold text-amber-800">{criticalCount}</p>
          </div>
        </div>
      ) : null}
      {rows.length === 0 ? (
        <AdminEmptyState
          title="No capacity rows found"
          description="Capacity records are created when booking or scheduling operations touch a date and time bucket."
        />
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Bucket</th>
              <th className="px-3 py-3">Max</th>
              <th className="px-3 py-3">Used</th>
              <th className="px-3 py-3">Remaining</th>
              <th className="px-3 py-3">Load</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.service_id}-${row.appointment_date}-${row.slot_time}`}
                className="border-b border-slate-100 text-slate-700 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50/80"
              >
                <td className="px-3 py-2.5 font-medium">{row.service_id}</td>
                <td className="px-3 py-2.5">{row.appointment_date}</td>
                <td className="px-3 py-2.5">{row.slot_time}</td>
                <td className="px-3 py-2.5">{row.max_capacity}</td>
                <td className="px-3 py-2.5">{row.used_capacity}</td>
                <td className="px-3 py-2.5">{row.remaining}</td>
                <td className="px-3 py-2.5">
                  <AdminBadge tone={getCapacityTone(row)}>
                    {row.remaining <= 0 ? "Full" : row.remaining <= 2 ? "Critical" : "Available"}
                  </AdminBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 0 ? (
        <p className="mt-3 text-xs text-slate-500">
          Snapshot: {availableCount} available, {criticalCount} critical, {fullCount} full buckets.
        </p>
      ) : null}
    </AdminShell>
  );
}

function getCapacityTone(row: AdminCapacityRow): "default" | "success" | "warning" | "danger" | "info" {
  if (row.remaining <= 0) return "danger";
  if (row.remaining <= 2) return "warning";
  return "success";
}
