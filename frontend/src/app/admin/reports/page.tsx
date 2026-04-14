"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
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
        <div className="space-y-2 text-sm text-slate-700">
          <p>Total appointments: {summary.total}</p>
          <p>Confirmed: {summary.confirmed}</p>
          <p>Cancelled: {summary.cancelled}</p>
          <p>Morning: {summary.morning}</p>
          <p>Afternoon: {summary.afternoon}</p>
          <p>Evening: {summary.evening}</p>
          <button
            type="button"
            className="inline-block rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-700"
            onClick={downloadCsv}
          >
            Download CSV
          </button>
        </div>
      )}
    </AdminShell>
  );
}
