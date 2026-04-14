"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AdminApiError,
  AdminBootstrapStatus,
  adminLogin,
  fetchAdminBootstrapStatus,
  saveToken,
} from "@/lib/admin-api";

export default function AdminAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootstrapStatus, setBootstrapStatus] = useState<AdminBootstrapStatus | null>(null);

  useEffect(() => {
    fetchAdminBootstrapStatus()
      .then(setBootstrapStatus)
      .catch(() => {
        // Do not block login page if metadata call fails.
      });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await adminLogin(email, password);
      saveToken(response.access_token);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-4">
        {bootstrapStatus && !bootstrapStatus.has_active_admin ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">No active admin account is currently available.</p>
            <p className="mt-1">
              Configure `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` and restart backend, or enable an
              existing admin account from the database.
            </p>
          </div>
        ) : null}
        {bootstrapStatus && !bootstrapStatus.bootstrap_configured ? (
          <div className="rounded-xl border border-sky-300 bg-sky-50 p-4 text-sm text-sky-900">
            Bootstrap env credentials are not configured. Existing admin/staff users can still sign in.
          </div>
        ) : null}
        <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-slate-600">Private access for operations team.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
              />
            </div>
          </div>
          {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
