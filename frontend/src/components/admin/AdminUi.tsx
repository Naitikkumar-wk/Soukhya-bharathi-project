import type { ReactNode } from "react";

type ClassNameProps = {
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50/70"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50/70"
        : tone === "danger"
          ? "border-rose-200 bg-rose-50/70"
          : "border-slate-200 bg-white";

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-600">{hint}</p> : null}
    </div>
  );
}

export function AdminBadge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
} & ClassNameProps) {
  const toneClass =
    tone === "success"
      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
      : tone === "warning"
        ? "border-amber-300 bg-amber-50 text-amber-700"
        : tone === "danger"
          ? "border-rose-300 bg-rose-50 text-rose-700"
          : tone === "info"
            ? "border-sky-300 bg-sky-50 text-sky-700"
            : "border-slate-300 bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${toneClass} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function AdminToolbar({ children, className }: { children: ReactNode } & ClassNameProps) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
} & ClassNameProps) {
  return (
    <div
      className={`rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-7 text-center ${className ?? ""}`}
    >
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mx-auto mt-1 max-w-[560px] text-sm text-slate-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function AdminSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-12 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}
