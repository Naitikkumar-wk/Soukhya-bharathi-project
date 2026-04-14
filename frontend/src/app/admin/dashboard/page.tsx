"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SummaryCard label="Total Appointments" value={summary.total} />
        <SummaryCard label="Confirmed" value={summary.confirmed} />
        <SummaryCard label="Cancelled" value={summary.cancelled} />
        <SummaryCard label="Morning Buckets" value={summary.morning} />
        <SummaryCard label="Afternoon Buckets" value={summary.afternoon} />
        <SummaryCard label="Evening Buckets" value={summary.evening} />
      </div>
    </AdminShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
