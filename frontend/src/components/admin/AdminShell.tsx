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
    return <div className="p-10 text-sm text-slate-500">Loading admin session...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-[min(1120px,calc(100%-32px))] items-center justify-between py-4">
          <h1 className="text-lg font-semibold text-slate-900">SBH Admin</h1>
          <div className="text-sm text-slate-600">
            {user.email} ({user.role})
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-[min(1120px,calc(100%-32px))] grid-cols-12 gap-6 py-6">
        <aside className="col-span-12 rounded-xl border border-slate-200 bg-white p-4 md:col-span-3">
          <nav className="space-y-2">
            {links
              .filter((item) => (item.href === "/admin/staff" ? user.role === "admin" : true))
              .map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                      active
                        ? "bg-teal-600 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>
        </aside>
        <main className="col-span-12 rounded-xl border border-slate-200 bg-white p-5 md:col-span-9">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">{title}</h2>
          {children}
        </main>
      </div>
    </div>
  );
}
