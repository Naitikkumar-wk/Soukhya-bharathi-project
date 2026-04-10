"use client";

import { useState } from "react";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-32px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];

// ── Types ──────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  label: string;
  description: string;
  group: "specialty" | "wellness";
};

type TimePreference = "morning" | "afternoon" | "evening";
type Gender = "male" | "female" | "other";

type BookingState = {
  service: Service | null;
  date: Date | null;
  timePreference: TimePreference | null;
  name: string;
  phone: string;
  age: string;
  gender: Gender | "";
  concern: string;
};

// ── Services ───────────────────────────────────────────────────────────────

const specialties: Service[] = [
  {
    id: "cancer-care",
    label: "Cancer Care & Surgical Oncology",
    description: "Oncology, surgery, chemotherapy, radiotherapy, counseling.",
    group: "specialty",
  },
  {
    id: "neuro-care",
    label: "Neurological Care",
    description: "Stroke, Parkinson's, epilepsy, dementia, sciatica, migraine.",
    group: "specialty",
  },
  {
    id: "cardiac-care",
    label: "Cardiac Care",
    description: "Preventive cardiology and hypertension management.",
    group: "specialty",
  },
  {
    id: "respiratory-care",
    label: "Respiratory Care",
    description: "Lung disease, asthma, bronchitis, sinusitis.",
    group: "specialty",
  },
  {
    id: "womens-care",
    label: "Women's Care",
    description: "PCOD, pregnancy, menopause, infertility, postnatal care.",
    group: "specialty",
  },
  {
    id: "pediatric-care",
    label: "Pediatric Care",
    description: "Autism, ADHD, developmental delay, allergies, ENT.",
    group: "specialty",
  },
  {
    id: "skin-hair-care",
    label: "Skin & Hair Care",
    description: "Acne, psoriasis, vitiligo, hair fall, premature graying.",
    group: "specialty",
  },
  {
    id: "digestive-care",
    label: "Digestive Care",
    description: "IBS, IBD, gastritis, fatty liver, malabsorption.",
    group: "specialty",
  },
  {
    id: "endocrinology-care",
    label: "Endocrinology Care",
    description: "Diabetes, thyroid disorders, PCOD/PCOS.",
    group: "specialty",
  },
  {
    id: "musculoskeletal-care",
    label: "Musculoskeletal Care",
    description: "Arthritis, frozen shoulder, disc herniation, sprains.",
    group: "specialty",
  },
  {
    id: "other-services",
    label: "Other Services",
    description: "Sleep disorders, home Panchakarma, surgical care, critical conditions.",
    group: "specialty",
  },
];

const wellnessTherapies: Service[] = [
  {
    id: "panchakarma",
    label: "Panchakarma",
    description: "Classical Ayurvedic detox restoring mind-body balance.",
    group: "wellness",
  },
  {
    id: "acupuncture",
    label: "Acupuncture",
    description: "Needle therapy for pain relief, stress, and rebalancing.",
    group: "wellness",
  },
  {
    id: "cupping",
    label: "Cupping Therapy",
    description: "Suction therapy for circulation and muscle tension relief.",
    group: "wellness",
  },
  {
    id: "yoga",
    label: "Yoga Therapy",
    description: "Therapeutic yoga sequences tailored to your condition.",
    group: "wellness",
  },
  {
    id: "kalari",
    label: "Kalari Marma Therapy",
    description: "Kerala marma point stimulation for deep tissue healing.",
    group: "wellness",
  },
];

// ── Constants ──────────────────────────────────────────────────────────────

const STEPS = [
  { number: 1, label: "Service" },
  { number: 2, label: "Schedule" },
  { number: 3, label: "Details" },
  { number: 4, label: "Confirm" },
] as const;

const TIME_PREFS = [
  {
    id: "morning" as TimePreference,
    label: "Morning",
    range: "8:00 AM – 12:00 PM",
    icon: "sun" as const,
  },
  {
    id: "afternoon" as TimePreference,
    label: "Afternoon",
    range: "12:00 PM – 4:00 PM",
    icon: "cloud-sun" as const,
  },
  {
    id: "evening" as TimePreference,
    label: "Evening",
    range: "4:00 PM – 7:00 PM",
    icon: "moon" as const,
  },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// ── Utility ────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Icons ──────────────────────────────────────────────────────────────────

function CheckIcon({ size = 14, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function SunIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function CloudSunIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M20 10a4 4 0 1 0-7.93.8A5.5 5.5 0 1 0 12 21h8a4 4 0 0 0 0-8z" />
    </svg>
  );
}

function MoonIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ServiceIcon({ id, selected }: { id: string; selected: boolean }) {
  const c = selected ? "white" : "#1f948e";
  const sw = "1.75";
  const svgProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: c,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "cancer-care":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case "neuro-care":
      return (
        <svg {...svgProps}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16Z" />
        </svg>
      );
    case "cardiac-care":
      return (
        <svg {...svgProps}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "respiratory-care":
      return (
        <svg {...svgProps}>
          <path d="M12 2v6" />
          <path d="M4.93 10.93A8 8 0 1 0 19.07 10.93" />
          <path d="M8 16.5c0 1.5 1.5 3 4 3s4-1.5 4-3" />
        </svg>
      );
    case "womens-care":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="8" r="5" />
          <line x1="12" y1="13" x2="12" y2="21" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      );
    case "pediatric-care":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
        </svg>
      );
    case "skin-hair-care":
      return (
        <svg {...svgProps}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case "digestive-care":
      return (
        <svg {...svgProps}>
          <path d="M12 2a4 4 0 0 1 4 4c0 2-1 3.5-3 4.5l-1 .5-1-.5C9 9.5 8 8 8 6a4 4 0 0 1 4-4z" />
          <path d="M10 11C8 12.5 7 15 7 17a5 5 0 0 0 10 0c0-2-1-4.5-3-6" />
        </svg>
      );
    case "endocrinology-care":
      return (
        <svg {...svgProps}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "musculoskeletal-care":
      return (
        <svg {...svgProps}>
          <path d="M6.5 6.5c1 1 2.5 1.5 4 1.5" />
          <path d="M17.5 17.5c-1-1-2.5-1.5-4-1.5" />
          <path d="M6 6c0-2 1.5-4 4-4 1 0 2 .5 2.5 1.5" />
          <path d="M18 18c0 2-1.5 4-4 4-1 0-2-.5-2.5-1.5" />
          <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "other-services":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="1" fill={c} />
          <circle cx="19" cy="12" r="1" fill={c} />
          <circle cx="5" cy="12" r="1" fill={c} />
        </svg>
      );
    case "panchakarma":
      return (
        <svg {...svgProps}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
      );
    case "acupuncture":
      return (
        <svg {...svgProps}>
          <line x1="12" y1="2" x2="12" y2="22" />
          <path d="M8 6l4-4 4 4" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      );
    case "cupping":
      return (
        <svg {...svgProps}>
          <path d="M7 4h10l1.5 3H5.5L7 4z" />
          <path d="M5.5 7h13v7a6.5 6.5 0 0 1-13 0V7z" />
        </svg>
      );
    case "yoga":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="4" r="1.5" />
          <path d="M12 6v5" />
          <path d="M7 10c1.5 0 3.5 1 5 1s3.5-1 5-1" />
          <path d="M9 21l3-5 3 5" />
          <path d="M7 16l2-5M17 16l-2-5" />
        </svg>
      );
    case "kalari":
      return (
        <svg {...svgProps}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
  }
}

// ── Calendar ───────────────────────────────────────────────────────────────

function Calendar({
  selected,
  onSelect,
  compact,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
  compact?: boolean;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDisabled =
    viewDate <= new Date(today.getFullYear(), today.getMonth(), 1);

  const isPast = (day: number) => new Date(year, month, day) < today;
  const isSunday = (day: number) => new Date(year, month, day).getDay() === 0;
  const isSelected = (day: number) =>
    !!selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === day;
  const isToday = (day: number) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      className={`border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)] ${
        compact ? "rounded-xl p-3" : "rounded-2xl p-5"
      }`}
    >
      {/* Month navigation */}
      <div className={`flex items-center justify-between ${compact ? "mb-2" : "mb-4"}`}>
        <button
          type="button"
          disabled={prevMonthDisabled}
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className={`flex items-center justify-center rounded-full transition ${
            compact ? "h-8 w-8 text-[18px]" : "h-9 w-9 text-[20px]"
          } ${
            prevMonthDisabled
              ? "cursor-not-allowed text-[#d1d5db]"
              : "text-[#4a5565] hover:bg-[#f0fffe] hover:text-[#1f948e]"
          }`}
        >
          ‹
        </button>
        <span
          className={`font-bold text-[#101828] ${compact ? "text-[14px]" : "text-[15px]"}`}
        >
          {monthName} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className={`flex items-center justify-center rounded-full text-[#4a5565] transition hover:bg-[#f0fffe] hover:text-[#1f948e] ${
            compact ? "h-8 w-8 text-[18px]" : "h-9 w-9 text-[20px]"
          }`}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className={`font-ui font-bold uppercase tracking-wider ${
              compact ? "py-1 text-[10px]" : "py-1.5 text-[11px]"
            } ${d === "Su" ? "text-[#d1d5db]" : "text-[#9ca3af]"}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={`grid grid-cols-7 ${compact ? "gap-0.5" : "gap-1"}`}>
        {cells.map((day, i) => {
          if (day === null) {
            return (
              <div key={`e-${i}`} className={compact ? "h-8" : undefined} aria-hidden />
            );
          }
          const disabled = isPast(day) || isSunday(day);
          const sel = isSelected(day);
          const tod = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(new Date(year, month, day))}
              className={[
                "font-ui flex w-full items-center justify-center rounded-full font-medium transition",
                compact
                  ? "h-8 text-[12px]"
                  : "aspect-square text-[14px]",
                disabled ? "cursor-not-allowed text-[#d1d5db]" : "cursor-pointer",
                sel ? "bg-[#1f948e] !text-white shadow-[0_2px_8px_rgba(31,148,142,0.30)]" : "",
                !sel && !disabled
                  ? "text-[#101828] hover:bg-[#f0fffe] hover:text-[#1f948e]"
                  : "",
                tod && !sel
                  ? compact
                    ? "font-bold text-[#1f948e] ring-1 ring-[#1f948e]"
                    : "font-bold text-[#1f948e] ring-2 ring-[#1f948e]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────

function ProgressBar({
  step,
  onStepClick,
}: {
  step: number;
  onStepClick: (s: number) => void;
}) {
  return (
    <div className="border-b border-[#e5e7eb] bg-white">
      <div className={`${wrapperClass} py-2`}>
        <div className="flex items-center">
          {STEPS.map((s, i) => {
            const done = s.number < step;
            const current = s.number === step;
            return (
              <div key={s.number} className="flex flex-1 items-center">
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => done && onStepClick(s.number)}
                  className={`flex flex-col items-center gap-0.5 ${done ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold transition ${
                      done
                        ? "border-[#1f948e] bg-[#1f948e] text-white"
                        : current
                          ? "border-[#1f948e] bg-white text-[#1f948e]"
                          : "border-[#d1d5db] bg-white text-[#9ca3af]"
                    }`}
                  >
                    {done ? <CheckIcon size={11} color="white" /> : s.number}
                  </div>
                  <span
                    className={`font-ui hidden text-[9px] font-semibold leading-none sm:block ${
                      done || current ? "text-[#1f948e]" : "text-[#9ca3af]"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>

                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-1 h-[2px] flex-1 transition ${
                      s.number < step ? "bg-[#1f948e]" : "bg-[#e5e7eb]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Compact Service Card ───────────────────────────────────────────────────

function CompactServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left transition ${
        selected
          ? "border-[#1f948e] bg-[#1f948e] text-white shadow-[0_4px_12px_rgba(31,148,142,0.20)]"
          : "border-[#e5e7eb] bg-white text-[#101828] hover:border-[#a7e9e3] hover:shadow-[0_2px_8px_rgba(16,24,40,0.07)]"
      }`}
    >
      <div
        className={`flex-shrink-0 rounded-lg p-1.5 ${selected ? "bg-white/20" : "bg-[#f0fffe]"}`}
      >
        <ServiceIcon id={service.id} selected={selected} />
      </div>
      <span className="flex-1 text-[13px] font-semibold leading-tight">{service.label}</span>
      {selected && (
        <div className="flex-shrink-0">
          <CheckIcon size={15} color="white" />
        </div>
      )}
    </button>
  );
}

// ── Summary Row ────────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-ui flex-shrink-0 text-[12px] font-bold uppercase tracking-widest text-[#4a5565]">
        {label}
      </span>
      <span
        className={`font-ui text-right text-[14px] font-semibold ${accent ? "text-[#1f948e]" : "text-[#101828]"}`}
      >
        {value}
      </span>
    </div>
  );
}

// ── Step Header ────────────────────────────────────────────────────────────

function StepHeader({
  title,
  subtitle,
  compact,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-3 text-center" : "mb-6 text-center"}>
      <h1
        className={`font-bold text-[#101828] ${
          compact ? "text-[22px] md:text-[26px]" : "text-[26px] md:text-[32px]"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`font-ui text-[#4a5565] ${compact ? "mt-1 text-[13px]" : "mt-1.5 text-[14px]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"specialty" | "wellness">("specialty");

  const [booking, setBooking] = useState<BookingState>({
    service: null,
    date: null,
    timePreference: null,
    name: "",
    phone: "",
    age: "",
    gender: "",
    concern: "",
  });

  // ── Validation ────────────────────────────────────────────────────────────

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!booking.name.trim()) errs.name = "Name is required";
    if (!booking.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(booking.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (!booking.age) errs.age = "Age is required";
    else if (Number(booking.age) < 1 || Number(booking.age) > 120)
      errs.age = "Enter a valid age (1–120)";
    if (!booking.gender) errs.gender = "Please select a gender";
    return errs;
  };

  // ── Navigation ────────────────────────────────────────────────────────────

  const handleNext = () => {
    if (step === 3) {
      const errs = validateStep4();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = () => setConfirmed(true);

  const handleTimeSelect = (t: TimePreference) => {
    setBooking((b) => ({ ...b, timePreference: t }));
  };

  const handleReset = () => {
    setConfirmed(false);
    setStep(1);
    setActiveTab("specialty");
    setBooking({
      service: null,
      date: null,
      timePreference: null,
      name: "",
      phone: "",
      age: "",
      gender: "",
      concern: "",
    });
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const timePref = TIME_PREFS.find((t) => t.id === booking.timePreference);

  const nextDisabled =
    (step === 1 && !booking.service) ||
    (step === 2 && (!booking.date || !booking.timePreference));

  const nextLabel = step === 3 ? "Review Booking" : "Continue";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    // Viewport-fit shell: header + progress + scrollable content + sticky bottom nav
    <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb] text-[#4a5565]">

      {/* ── Site Header ──────────────────────────────────────────────────── */}
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      {/* ── Progress Bar ─────────────────────────────────────────────────── */}
      {!confirmed && <ProgressBar step={step} onStepClick={setStep} />}

      {/* ── Scrollable step content ───────────────────────────────────────── */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div
          className={`${wrapperClass} ${
            (step === 1 || step === 2) && !confirmed ? "py-4 md:py-5" : "py-7"
          }`}
        >

          {/* ── Step 1: Choose a Service ─────────────────────────────────── */}
          {step === 1 && (
            <div>
              <StepHeader
                compact
                title="Choose a Service"
                subtitle="Select a specialty or wellness therapy to book."
              />

              {/* Tab switcher */}
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("specialty")}
                  className={`font-ui rounded-full border px-5 py-2 text-[13px] font-bold transition ${
                    activeTab === "specialty"
                      ? "border-[#1f948e] bg-[#1f948e] text-white"
                      : "border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[#1f948e] hover:text-[#1f948e]"
                  }`}
                >
                  Medical Specialties
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wellness")}
                  className={`font-ui rounded-full border px-5 py-2 text-[13px] font-bold transition ${
                    activeTab === "wellness"
                      ? "border-[#1f948e] bg-[#1f948e] text-white"
                      : "border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[#1f948e] hover:text-[#1f948e]"
                  }`}
                >
                  Wellness Therapies
                </button>
              </div>

              {/* Service grid */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {(activeTab === "specialty" ? specialties : wellnessTherapies).map((s) => (
                  <CompactServiceCard
                    key={s.id}
                    service={s}
                    selected={booking.service?.id === s.id}
                    onSelect={() => setBooking((b) => ({ ...b, service: s }))}
                  />
                ))}
              </div>

              {/* Selected service badge */}
              {booking.service && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#a7e9e3] bg-[#f0fffe] px-4 py-3">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1f948e]">
                    <CheckIcon size={11} color="white" />
                  </div>
                  <p className="font-ui text-[13px] text-[#4a5565]">
                    Selected:{" "}
                    <span className="font-bold text-[#1f948e]">{booking.service.label}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Step 2: Date & time (calendar left, slots right on large screens) ─ */}
          {step === 2 && (
            <div>
              <StepHeader
                compact
                title="Date & time"
                subtitle={booking.service?.label}
              />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
                <div>
                  <p className="font-ui mb-2 text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] lg:mb-2">
                    Date
                  </p>
                  <div className="mx-auto max-w-[440px] lg:mx-0 lg:max-w-none">
                    <Calendar
                      compact
                      selected={booking.date}
                      onSelect={(d) => setBooking((b) => ({ ...b, date: d }))}
                    />
                  </div>
                  {booking.date ? (
                    <div className="mt-2 rounded-xl border border-[#a7e9e3] bg-[#f0fffe] px-4 py-2 text-center lg:text-left">
                      <p className="font-ui text-[13px] font-bold text-[#1f948e]">
                        {formatDate(booking.date)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-ui mt-2 text-center text-[12px] text-[#9ca3af] lg:text-left">
                      Sundays and past dates are unavailable.
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-ui mb-2 text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] lg:mb-3">
                    Preferred time
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 lg:grid-cols-3 lg:gap-2">
                    {TIME_PREFS.map((t) => {
                      const sel = booking.timePreference === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleTimeSelect(t.id)}
                          className={`flex flex-col items-center justify-center rounded-2xl transition sm:py-8 lg:rounded-xl lg:py-3.5 lg:px-1.5 ${
                            sel
                              ? "gap-3 border-2 border-[#1f948e] bg-[#1f948e] py-6 text-white shadow-[0_4px_20px_rgba(31,148,142,0.25)] lg:gap-1.5 lg:border-2"
                              : "gap-3 border-2 border-[#e5e7eb] bg-white py-6 text-[#101828] hover:border-[#a7e9e3] hover:shadow-[0_4px_12px_rgba(16,24,40,0.08)] lg:gap-1.5 lg:border lg:border-[#e5e7eb] lg:shadow-none hover:lg:border-[#a7e9e3]"
                          }`}
                        >
                          {t.icon === "sun" && (
                            <SunIcon size={24} color={sel ? "white" : "#1f948e"} />
                          )}
                          {t.icon === "cloud-sun" && (
                            <CloudSunIcon size={24} color={sel ? "white" : "#1f948e"} />
                          )}
                          {t.icon === "moon" && (
                            <MoonIcon size={24} color={sel ? "white" : "#1f948e"} />
                          )}
                          <div className="text-center lg:min-w-0 lg:px-0.5">
                            <div className="text-[17px] font-bold sm:text-[18px] lg:text-[14px] lg:leading-tight">
                              {t.label}
                            </div>
                            <div
                              className={`font-ui mt-0.5 text-[12px] sm:text-[13px] lg:text-[10px] lg:leading-snug ${sel ? "text-white/80" : "text-[#4a5565]"}`}
                            >
                              {t.range}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Your Details ─────────────────────────────────────── */}
          {step === 3 && (
            <div className="mx-auto max-w-[580px]">
              <StepHeader
                title="Your Details"
                subtitle="Tell us about the patient so we can prepare for your visit."
              />

              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.06)] md:p-8">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label className="font-ui mb-1.5 block text-[13px] font-bold text-[#101828]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={booking.name}
                      onChange={(e) => {
                        setBooking((b) => ({ ...b, name: e.target.value }));
                        setErrors((er) => ({ ...er, name: "" }));
                      }}
                      placeholder="Enter full name"
                      className={`font-ui w-full rounded-xl border px-4 py-3.5 text-[15px] text-[#101828] placeholder:text-[#9ca3af] outline-none transition focus:ring-2 focus:ring-[#1f948e]/20 ${
                        errors.name
                          ? "border-red-400 bg-red-50 focus:border-red-400"
                          : "border-[#e5e7eb] bg-white focus:border-[#1f948e]"
                      }`}
                    />
                    {errors.name && (
                      <p className="font-ui mt-1 text-[12px] text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-ui mb-1.5 block text-[13px] font-bold text-[#101828]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={booking.phone}
                      onChange={(e) => {
                        setBooking((b) => ({ ...b, phone: e.target.value }));
                        setErrors((er) => ({ ...er, phone: "" }));
                      }}
                      placeholder="+91 98765 43210"
                      className={`font-ui w-full rounded-xl border px-4 py-3.5 text-[15px] text-[#101828] placeholder:text-[#9ca3af] outline-none transition focus:ring-2 focus:ring-[#1f948e]/20 ${
                        errors.phone
                          ? "border-red-400 bg-red-50 focus:border-red-400"
                          : "border-[#e5e7eb] bg-white focus:border-[#1f948e]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="font-ui mt-1 text-[12px] text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="font-ui mb-1.5 block text-[13px] font-bold text-[#101828]">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={booking.age}
                      onChange={(e) => {
                        setBooking((b) => ({ ...b, age: e.target.value }));
                        setErrors((er) => ({ ...er, age: "" }));
                      }}
                      placeholder="Age in years"
                      min={1}
                      max={120}
                      className={`font-ui w-full rounded-xl border px-4 py-3.5 text-[15px] text-[#101828] placeholder:text-[#9ca3af] outline-none transition focus:ring-2 focus:ring-[#1f948e]/20 ${
                        errors.age
                          ? "border-red-400 bg-red-50 focus:border-red-400"
                          : "border-[#e5e7eb] bg-white focus:border-[#1f948e]"
                      }`}
                    />
                    {errors.age && (
                      <p className="font-ui mt-1 text-[12px] text-red-500">{errors.age}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="font-ui mb-1.5 block text-[13px] font-bold text-[#101828]">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-4 pt-3">
                      {GENDER_OPTIONS.map((g) => (
                        <label key={g.value} className="flex cursor-pointer items-center gap-1.5">
                          <input
                            type="radio"
                            name="gender"
                            value={g.value}
                            checked={booking.gender === g.value}
                            onChange={() => {
                              setBooking((b) => ({ ...b, gender: g.value }));
                              setErrors((er) => ({ ...er, gender: "" }));
                            }}
                            className="h-4 w-4 accent-[#1f948e]"
                          />
                          <span className="font-ui text-[13px] text-[#101828]">{g.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className="font-ui mt-1 text-[12px] text-red-500">{errors.gender}</p>
                    )}
                  </div>

                  {/* Medical Concern */}
                  <div className="md:col-span-2">
                    <label className="font-ui mb-1.5 block text-[13px] font-bold text-[#101828]">
                      Brief Medical Concern{" "}
                      <span className="font-normal text-[#9ca3af]">(optional)</span>
                    </label>
                    <textarea
                      value={booking.concern}
                      onChange={(e) =>
                        setBooking((b) => ({ ...b, concern: e.target.value.slice(0, 300) }))
                      }
                      placeholder="Briefly describe your symptoms or reason for visit…"
                      rows={4}
                      className="font-ui w-full resize-none rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-[15px] text-[#101828] placeholder:text-[#9ca3af] outline-none transition focus:border-[#1f948e] focus:ring-2 focus:ring-[#1f948e]/20"
                    />
                    <p className="font-ui mt-1 text-right text-[11px] text-[#9ca3af]">
                      {booking.concern.length}/300
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Confirm ──────────────────────────────────────────── */}
          {step === 4 && !confirmed && (
            <div className="mx-auto max-w-[600px]">
              <StepHeader
                title="Review & Confirm"
                subtitle="Please review your booking before confirming."
              />

              <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] p-6 md:p-8">
                <h2 className="mb-5 text-[17px] font-bold text-[#101828]">Booking Summary</h2>

                <div className="space-y-4">
                  <SummaryRow label="Service" value={booking.service?.label ?? ""} accent />
                  <div className="border-t border-[#a7e9e3]" />
                  <SummaryRow
                    label="Date"
                    value={booking.date ? formatDate(booking.date) : ""}
                  />
                  <SummaryRow
                    label="Time Slot"
                    value={timePref ? `${timePref.label} (${timePref.range})` : ""}
                  />
                  <div className="border-t border-[#a7e9e3]" />
                  <SummaryRow label="Patient Name" value={booking.name} />
                  <SummaryRow label="Phone" value={booking.phone} />
                  <SummaryRow label="Age" value={`${booking.age} years`} />
                  <SummaryRow
                    label="Gender"
                    value={
                      booking.gender
                        ? booking.gender.charAt(0).toUpperCase() + booking.gender.slice(1)
                        : ""
                    }
                  />
                  {booking.concern && (
                    <>
                      <div className="border-t border-[#a7e9e3]" />
                      <div>
                        <span className="font-ui text-[12px] font-bold uppercase tracking-widest text-[#4a5565]">
                          Medical Concern
                        </span>
                        <p className="font-ui mt-1.5 text-[14px] leading-[1.6] text-[#101828]">
                          {booking.concern}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <p className="font-ui mt-5 text-[12px] leading-[1.6] text-[#4a5565]">
                  Our team will call you at{" "}
                  <span className="font-bold text-[#101828]">{booking.phone}</span> to confirm your
                  appointment within your preferred time slot.
                </p>
              </div>
            </div>
          )}

          {/* ── Success State ─────────────────────────────────────────────── */}
          {confirmed && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1f948e] shadow-[0_8px_24px_rgba(31,148,142,0.30)]">
                <CheckIcon size={40} color="white" />
              </div>

              <h2 className="mb-3 text-[26px] font-bold text-[#101828] md:text-[32px]">
                Appointment Request Received!
              </h2>
              <p className="font-ui mx-auto max-w-[460px] text-[15px] leading-[1.8] text-[#4a5565]">
                Thank you,{" "}
                <span className="font-bold text-[#101828]">{booking.name}</span>. Our team will
                call you at{" "}
                <span className="font-bold text-[#101828]">{booking.phone}</span> to confirm your{" "}
                <span className="font-semibold text-[#1f948e]">{booking.service?.label}</span>{" "}
                appointment.
              </p>

              <div className="mt-7 w-full max-w-[380px] rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-7 py-5 text-left">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-[#4a5565]">
                      Date
                    </span>
                    <p className="font-ui mt-0.5 text-[14px] font-semibold text-[#101828]">
                      {booking.date ? formatDate(booking.date) : ""}
                    </p>
                  </div>
                  <div>
                    <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-[#4a5565]">
                      Time Slot
                    </span>
                    <p className="font-ui mt-0.5 text-[14px] font-semibold text-[#101828]">
                      {timePref ? `${timePref.label} (${timePref.range})` : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/care"
                  className="font-ui inline-flex items-center gap-2 rounded-full border border-[#1f948e] px-6 py-2.5 text-[14px] font-bold text-[#1f948e] transition hover:bg-[#f0fffe]"
                >
                  <ChevronLeftIcon />
                  Back to Care
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-ui inline-flex items-center gap-2 rounded-full bg-[#1f948e] px-6 py-2.5 text-[14px] font-bold text-white transition hover:brightness-95"
                >
                  Book Another
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Sticky Bottom Navigation ──────────────────────────────────────── */}
      {!confirmed && (
        <div className="border-t border-[#e5e7eb] bg-white shadow-[0_-2px_8px_rgba(16,24,40,0.06)]">
          <div className={`${wrapperClass} flex items-center justify-between py-4`}>

            {/* Back button */}
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="font-ui inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-5 py-2.5 text-[14px] font-bold text-[#4a5565] transition hover:border-[#1f948e] hover:text-[#1f948e]"
              >
                <ChevronLeftIcon />
                {step === 4 ? "Edit Details" : "Back"}
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={nextDisabled}
                className={`font-ui inline-flex items-center gap-1.5 rounded-full px-7 py-2.5 text-[14px] font-bold text-white transition ${
                  nextDisabled
                    ? "cursor-not-allowed bg-[#9ca3af]"
                    : "bg-[#1f948e] hover:brightness-95"
                }`}
              >
                {nextLabel}
                <ChevronRightIcon />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="font-ui inline-flex items-center gap-1.5 rounded-full bg-[#1f948e] px-8 py-2.5 text-[14px] font-bold text-white transition hover:brightness-95"
              >
                Confirm Booking
                <ChevronRightIcon />
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
