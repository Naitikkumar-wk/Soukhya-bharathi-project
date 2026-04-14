"use client";

import { FormEvent, useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
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
      <form className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-4" onSubmit={onCreate}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="staff@email.com"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "staff")}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white"
        >
          Add User
        </button>
      </form>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <p>
              {item.email} ({item.role})
            </p>
            <button
              type="button"
              onClick={() => toggleUser(item)}
              disabled={saving}
              className={`rounded-md px-3 py-1 font-medium ${
                item.is_active
                  ? "border border-red-300 text-red-600"
                  : "border border-slate-300 text-slate-600"
              }`}
            >
              {item.is_active ? "Disable" : "Enable"}
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
