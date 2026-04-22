"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { AdminApiError, type AdminUser, adminMe, clearToken } from "@/lib/admin-api";

type AdminShellProps = {
  title: string;
  children: ReactNode;
};

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/capacity", label: "Capacity" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/staff", label: "Staff" },
];

export function AdminShell({ title, children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    adminMe()
      .then((me) => {
        if (!mounted) return;
        setUser(me);
      })
      .catch((error) => {
        if (!mounted) return;
        if (error instanceof AdminApiError && error.status === 401) {
          clearToken();
          router.replace("/admin/auth");
          return;
        }
        router.replace("/admin/auth");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          Loading admin session...
        </div>
      </div>
    );
  }

  if (!user) return null;

  const activeLabel = links.find((item) => pathname?.startsWith(item.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 md:text-xl">SBH Admin Console</h1>
            <p className="text-xs text-slate-500">Operations dashboard for appointments and care workflows</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
              {user.email} ({user.role})
            </div>
            <button
              type="button"
              onClick={() => {
                clearToken();
                router.replace("/admin/auth");
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] grid-cols-12 gap-5 py-6">
        <aside className="col-span-12 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:col-span-3 md:sticky md:top-6 md:self-start">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Navigation</p>
          <nav className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-1">
            {links
              .filter((item) => (item.href === "/admin/staff" ? user.role === "admin" : true))
              .map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-3 py-2.5 text-center text-sm font-medium transition md:text-left ${
                      active
                        ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-[0_6px_18px_rgba(13,148,136,0.35)]"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>
        </aside>
        <main className="col-span-12 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:col-span-9 md:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{activeLabel}</p>
              <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            </div>
            <p className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
              Role: {user.role === "admin" ? "Administrator" : "Staff"}
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
