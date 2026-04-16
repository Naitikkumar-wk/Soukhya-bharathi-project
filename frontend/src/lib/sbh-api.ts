const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const API_V1 = `${API_BASE}/api/v1`;

export type ApiServiceItem = {
  id: string;
  name: string;
  group: "specialty" | "wellness";
  is_active: boolean;
};

export type ServicesResponse = {
  items: ApiServiceItem[];
};

export type AvailabilityBucket = {
  slot_time: string;
  available: boolean;
  remaining: number;
};

export type AvailabilityResponse = {
  service_id: string;
  appointment_date: string;
  slots: AvailabilityBucket[];
};

export type AppointmentCreatePayload = {
  service_id: string;
  appointment_date: string;
  slot_time: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "male" | "female" | "other";
  concern?: string | null;
  consent_accepted: boolean;
  source: string;
  idempotency_key?: string | null;
};

export type AppointmentResponse = {
  id: string;
  booking_reference: string;
  status: string;
  service_id: string;
  appointment_date: string;
  slot_time: string;
  name: string;
  email?: string | null;
  phone: string;
  age: number;
  gender: string;
  concern: string | null;
  created_at: string;
};

export class SbhApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "INTERNAL_ERROR", status = 500) {
    super(message);
    this.name = "SbhApiError";
    this.code = code;
    this.status = status;
  }
}

function buildUrl(path: string) {
  return `${API_V1}${path}`;
}

async function parseError(response: Response): Promise<SbhApiError> {
  try {
    const data = await response.json();
    const code = data?.error?.code ?? "INTERNAL_ERROR";
    const message = data?.error?.message ?? `Request failed (${response.status})`;
    return new SbhApiError(message, code, response.status);
  } catch {
    return new SbhApiError(`Request failed (${response.status})`, "INTERNAL_ERROR", response.status);
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), init);
  if (!response.ok) {
    throw await parseError(response);
  }
  return response.json() as Promise<T>;
}

export function toLocalYyyyMmDd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fetchServices(): Promise<ServicesResponse> {
  return requestJson<ServicesResponse>("/services");
}

export function fetchAvailability(serviceId: string, dateYyyyMmDd: string): Promise<AvailabilityResponse> {
  const query = new URLSearchParams({ service_id: serviceId, date: dateYyyyMmDd });
  return requestJson<AvailabilityResponse>(`/availability?${query.toString()}`);
}

export function createAppointment(
  payload: AppointmentCreatePayload,
  options: { idempotencyKey?: string } = {}
): Promise<AppointmentResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.idempotencyKey) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }
  return requestJson<AppointmentResponse>("/appointments", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}
