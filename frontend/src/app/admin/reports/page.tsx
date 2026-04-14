"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState, AdminStatCard } from "@/components/admin/AdminUi";
import {
  AdminApiError,
  AdminReportSummary,
  fetchAdminReportsCsv,
  fetchAdminReportsSummary,
} from "@/lib/admin-api";

export default function AdminReportsPage() {
  const [summary, setSummary] = useState<AdminReportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminReportsSummary()
      .then(setSummary)
      .catch((err) => {
        setError(err instanceof AdminApiError ? err.message : "Could not load report summary");
      });
  }, []);

  async function downloadCsv() {
    try {
      const csv = await fetchAdminReportsCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "appointments-report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not download report CSV");
    }
  }

  return (
    <AdminShell title="Reports">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {!summary ? (
        <p className="text-sm text-slate-500">Loading reports...</p>
      ) : (
        <div>
          {summary.total === 0 ? (
            <AdminEmptyState
              title="No report data yet"
              description="Reports will populate as appointments are confirmed or cancelled."
              className="mb-4"
            />
          ) : null}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AdminStatCard label="Total appointments" value={summary.total} />
            <AdminStatCard label="Confirmed" value={summary.confirmed} tone="success" />
            <AdminStatCard label="Cancelled" value={summary.cancelled} tone="warning" />
            <AdminStatCard label="Morning" value={summary.morning} />
            <AdminStatCard label="Afternoon" value={summary.afternoon} />
            <AdminStatCard label="Evening" value={summary.evening} />
          </div>
          <button
            type="button"
            className="mt-4 inline-block rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={downloadCsv}
          >
            Download appointments CSV
          </button>
        </div>
      )}
    </AdminShell>
  );
}
