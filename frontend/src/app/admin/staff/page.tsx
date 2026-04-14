"use client";

import { FormEvent, useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminBadge, AdminEmptyState, AdminToolbar } from "@/components/admin/AdminUi";
import {
  AdminApiError,
  AdminUser,
  createAdminStaff,
  fetchAdminStaff,
  updateAdminStaff,
} from "@/lib/admin-api";

export default function AdminStaffPage() {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "staff">("staff");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setError(null);
    try {
      const data = await fetchAdminStaff();
      setItems(data.items);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not load staff");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createAdminStaff({ email, password, role });
      setEmail("");
      setPassword("");
      setRole("staff");
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not create staff");
    } finally {
      setSaving(false);
    }
  }

  async function toggleUser(user: AdminUser) {
    setSaving(true);
    setError(null);
    try {
      await updateAdminStaff(user.id, !user.is_active);
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not update staff");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Staff Management">
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <AdminToolbar className="mb-4">
        <form className="grid grid-cols-1 gap-2 sm:grid-cols-4" onSubmit={onCreate}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="staff@email.com"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "staff")}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            Add user
          </button>
        </form>
      </AdminToolbar>
      {items.length === 0 ? (
        <AdminEmptyState
          title="No staff users available"
          description="Create the first team member account above. You can assign either staff or admin role."
        />
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
            >
              <div>
                <p className="font-medium text-slate-900">{item.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <AdminBadge tone={item.role === "admin" ? "info" : "default"}>{item.role}</AdminBadge>
                  <AdminBadge tone={item.is_active ? "success" : "warning"}>
                    {item.is_active ? "Active" : "Disabled"}
                  </AdminBadge>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleUser(item)}
                disabled={saving}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  item.is_active
                    ? "border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                    : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.is_active ? "Disable user" : "Enable user"}
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
