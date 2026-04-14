const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const API_V1 = `${API_BASE}/api/v1`;
const TOKEN_KEY = "sbh_admin_token";

export type AdminRole = "admin" | "staff";

export type AdminUser = {
  id: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
};

export type AdminLoginResponse = {
  access_token: string;
  token_type: string;
  expires_in_seconds: number;
  user: AdminUser;
};

export type AdminBootstrapStatus = {
  has_any_admin: boolean;
  has_active_admin: boolean;
  bootstrap_configured: boolean;
};

export type AdminAppointment = {
  id: string;
  booking_reference: string;
  status: string;
  service_id: string;
  appointment_date: string;
  time_bucket: "morning" | "afternoon" | "evening";
  name: string;
  phone: string;
  age: number;
  gender: string;
  concern: string | null;
  internal_notes: string | null;
  source: string;
  created_at: string;
};

export type AdminAppointmentsFilters = {
  date_from?: string;
  date_to?: string;
  status?: string;
  service_id?: string;
  phone?: string;
  booking_reference?: string;
  limit?: number;
};

export type AdminCapacityRow = {
  service_id: string;
  appointment_date: string;
  time_bucket: "morning" | "afternoon" | "evening";
  max_capacity: number;
  used_capacity: number;
  remaining: number;
};

export type AdminReportSummary = {
  total: number;
  confirmed: number;
  cancelled: number;
  morning: number;
  afternoon: number;
  evening: number;
};

export class AdminApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "INTERNAL_ERROR", status = 500) {
    super(message);
    this.name = "AdminApiError";
    this.code = code;
    this.status = status;
  }
}

function buildUrl(path: string) {
  return `${API_V1}${path}`;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

async function parseError(response: Response): Promise<AdminApiError> {
  try {
    const data = await response.json();
    const code = data?.error?.code ?? "INTERNAL_ERROR";
    const message = data?.error?.message ?? `Request failed (${response.status})`;
    return new AdminApiError(message, code, response.status);
  } catch {
    return new AdminApiError(`Request failed (${response.status})`, "INTERNAL_ERROR", response.status);
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  return response.json() as Promise<T>;
}

async function requestText(path: string, init?: RequestInit): Promise<string> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  return response.text();
}

export async function adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
  return requestJson<AdminLoginResponse>("/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function adminMe(): Promise<AdminUser> {
  return requestJson<AdminUser>("/admin/auth/me");
}

export function fetchAdminBootstrapStatus(): Promise<AdminBootstrapStatus> {
  return requestJson<AdminBootstrapStatus>("/admin/auth/bootstrap-status");
}

export function fetchAdminAppointments(filters?: AdminAppointmentsFilters): Promise<{ items: AdminAppointment[] }> {
  const query = new URLSearchParams();
  if (filters?.date_from) query.set("date_from", filters.date_from);
  if (filters?.date_to) query.set("date_to", filters.date_to);
  if (filters?.status) query.set("status", filters.status);
  if (filters?.service_id) query.set("service_id", filters.service_id);
  if (filters?.phone) query.set("phone", filters.phone);
  if (filters?.booking_reference) query.set("booking_reference", filters.booking_reference);
  if (typeof filters?.limit === "number") query.set("limit", String(filters.limit));
  const suffix = query.toString();
  return requestJson<{ items: AdminAppointment[] }>(
    suffix ? `/admin/appointments?${suffix}` : "/admin/appointments"
  );
}

export function fetchAdminAppointment(appointmentId: string): Promise<AdminAppointment> {
  return requestJson<AdminAppointment>(`/admin/appointments/${appointmentId}`);
}

export function fetchAdminReportsSummary(): Promise<AdminReportSummary> {
  return requestJson<AdminReportSummary>("/admin/reports/summary");
}

export function fetchAdminReportsCsv(): Promise<string> {
  return requestText("/admin/reports/appointments.csv");
}

export function fetchAdminCapacity(): Promise<{ items: AdminCapacityRow[] }> {
  return requestJson<{ items: AdminCapacityRow[] }>("/admin/capacity");
}

export function fetchAdminStaff(): Promise<{ items: AdminUser[] }> {
  return requestJson<{ items: AdminUser[] }>("/admin/staff");
}

export function createAdminStaff(payload: { email: string; password: string; role: AdminRole }) {
  return requestJson<AdminUser>("/admin/staff", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateAdminStaff(userId: string, isActive: boolean) {
  return requestJson<AdminUser>(`/admin/staff/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: isActive }),
  });
}

export function cancelAdminAppointment(appointmentId: string, reason?: string) {
  return requestJson<AdminAppointment>(`/admin/appointments/${appointmentId}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason: reason ?? null }),
  });
}

export function rescheduleAdminAppointment(
  appointmentId: string,
  payload: { appointment_date: string; time_bucket: "morning" | "afternoon" | "evening" }
) {
  return requestJson<AdminAppointment>(`/admin/appointments/${appointmentId}/reschedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateAdminAppointment(
  appointmentId: string,
  payload: { status?: "confirmed" | "cancelled"; internal_notes?: string | null }
) {
  return requestJson<AdminAppointment>(`/admin/appointments/${appointmentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
