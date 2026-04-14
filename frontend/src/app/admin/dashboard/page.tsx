"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState, AdminStatCard } from "@/components/admin/AdminUi";
import { AdminApiError, fetchAdminReportsSummary } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
    morning: 0,
    afternoon: 0,
    evening: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminReportsSummary()
      .then(setSummary)
      .catch((err) => {
        setError(err instanceof AdminApiError ? err.message : "Failed to load summary");
      });
  }, []);

  return (
    <AdminShell title="Dashboard">
      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {summary.total === 0 && !error ? (
        <AdminEmptyState
          title="No appointment activity yet"
          description="Once bookings start coming in, this dashboard will show totals and slot usage for quick operational review."
          className="mb-4"
        />
      ) : null}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard label="Total appointments" value={summary.total} hint="All tracked bookings" />
        <AdminStatCard
          label="Confirmed"
          value={summary.confirmed}
          tone="success"
          hint={`${summary.total > 0 ? Math.round((summary.confirmed / summary.total) * 100) : 0}% of total`}
        />
        <AdminStatCard
          label="Cancelled"
          value={summary.cancelled}
          tone={summary.cancelled > 0 ? "warning" : "default"}
          hint={`${summary.total > 0 ? Math.round((summary.cancelled / summary.total) * 100) : 0}% of total`}
        />
        <AdminStatCard label="Morning slots used" value={summary.morning} hint="Morning booking load" />
        <AdminStatCard label="Afternoon slots used" value={summary.afternoon} hint="Afternoon booking load" />
        <AdminStatCard label="Evening slots used" value={summary.evening} hint="Evening booking load" />
      </div>
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Operational tip</h3>
        <p className="mt-1 text-sm text-slate-600">
          Use the Appointments page quick date filter to inspect specific-day demand, then adjust limits in
          Capacity if a time bucket is consistently overused.
        </p>
      </div>
    </AdminShell>
  );
}
