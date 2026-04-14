"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
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

  return (
    <AdminShell title="Capacity">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="py-2 pr-3">Service</th>
              <th className="py-2 pr-3">Date</th>
              <th className="py-2 pr-3">Bucket</th>
              <th className="py-2 pr-3">Max</th>
              <th className="py-2 pr-3">Used</th>
              <th className="py-2 pr-3">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.service_id}-${row.appointment_date}-${row.time_bucket}`} className="border-b border-slate-100">
                <td className="py-2 pr-3">{row.service_id}</td>
                <td className="py-2 pr-3">{row.appointment_date}</td>
                <td className="py-2 pr-3">{row.time_bucket}</td>
                <td className="py-2 pr-3">{row.max_capacity}</td>
                <td className="py-2 pr-3">{row.used_capacity}</td>
                <td className="py-2 pr-3">{row.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
