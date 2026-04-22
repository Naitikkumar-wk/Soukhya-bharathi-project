"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IntegratedCareModelSection } from "@/components/IntegratedCareModelSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem, NAV_CARE_LABEL, NAV_WELLNESS_LABEL } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: NAV_CARE_LABEL },
  { href: "/treatments", label: NAV_WELLNESS_LABEL },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];

const trustBadges = [
  "Ayurveda + Modern Medicine",
  "Expert Specialists",
  "Personalized Treatment",
  "In-Patient Services",
];

type CareSubUnit = {
  title: string;
  diseases: string[];
};

type CareHeading = {
  id: string;
  label: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  subUnits: CareSubUnit[];
};

const careHeadings: CareHeading[] = [
  {
    id: "terminal-illness",
    label: "Terminal Illness Care",
    description:
      "Integrated support for advanced, high-risk, and quality-of-life-focused care pathways.",
    imageSrc: "/images/care-tile-cancer.webp",
    imageAlt: "Doctor administering IV treatment to a cancer patient in a hospital room",
    subUnits: [
      {
        title: "Oncology & Surgical Support",
        diseases: [
          "Oncology Super Specialty Care",
          "Ayurveda Oncology",
          "Surgery",
          "Chemotherapy",
          "Radiotherapy",
          "Counseling",
        ],
      },
      {
        title: "Respiratory & Critical Condition Support",
        diseases: [
          "Interstitial Lung Disease",
          "Pneumonia",
          "Bronchitis / Bronchial Asthma",
          "Sinusitis",
          "In-Patient Services for Critical Conditions",
        ],
      },
      {
        title: "Additional Complex Care Pathways",
        diseases: [
          "Autoimmune Disorders",
          "Sleep Disorders",
          "Male Infertility",
          "Home Panchakarma Services",
        ],
      },
    ],
  },
  {
    id: "cardiac-care",
    label: "Cardiac Care",
    description:
      "Preventive and therapeutic cardiology with long-term risk management.",
    imageSrc: "/images/care-tile-cardiac.jpg",
    imageAlt: "Cardiologist reviewing ECG notes with stethoscope",
    subUnits: [
      {
        title: "Cardiology Programs",
        diseases: ["Preventive Cardiology", "Hypertension"],
      },
    ],
  },
  {
    id: "neuro-cognitive-care",
    label: "Neuro-Cognitive Care",
    description:
      "Comprehensive brain, spine, and cognition-focused programs for neurological and neurodevelopmental needs.",
    imageSrc: "/images/care-tile-neuro.jpg",
    imageAlt: "Doctor showing brain MRI scan on tablet to patient",
    subUnits: [
      {
        title: "Neurological Disorders",
        diseases: [
          "Stroke / Paralysis",
          "Spine Alignment",
          "Dementia",
          "Alzheimer's Disease",
          "Parkinson's Disease",
          "Epilepsy & Seizure Disorders",
          "Migraine",
          "Sciatica",
        ],
      },
      {
        title: "Neurodevelopmental Support",
        diseases: ["Autism Spectrum Disorders", "ADHD", "Developmental Delay"],
      },
    ],
  },
  {
    id: "women-child-health",
    label: "Women & Child Health",
    description:
      "Specialized programs for women and pediatric populations across preventive and therapeutic care stages.",
    imageSrc: "/images/care-tile-womens.jpg",
    imageAlt: "Female doctor in consultation for women's health",
    subUnits: [
      {
        title: "Women's Care",
        diseases: [
          "PCOD",
          "Menorrhagia / Dysmenorrhea",
          "Infertility",
          "Menopausal Care",
          "Pre-Pregnancy Planning (Garbha Samskara)",
          "Antenatal / Postnatal Care",
          "Pregnancy Care",
          "PAP Smear Test",
          "Endometriosis",
        ],
      },
      {
        title: "Pediatric Care",
        diseases: ["Pediatric Care"],
      },
    ],
  },
  {
    id: "internal-medicine",
    label: "Internal Medicine",
    description:
      "Cross-functional chronic disease management combining internal medicine, endocrine, digestive, and structural care.",
    imageSrc: "/images/care-tile-digestive.jpg",
    imageAlt: "Gastroenterology specialists in clinical consultation",
    subUnits: [
      {
        title: "Digestive & Gastrointestinal",
        diseases: [
          "Acute / Chronic Gastritis",
          "Dyspepsia",
          "IBS — Irritable Bowel Syndrome",
          "IBD (Crohn's Disease & Ulcerative Colitis)",
          "Malabsorption & Nutritional Deficiency",
          "Fatty Liver",
        ],
      },
      {
        title: "Endocrine & Metabolic",
        diseases: ["Type 1 & Type 2 Diabetes", "Thyroid Dysfunction", "PCOD / PCOS"],
      },
      {
        title: "Musculoskeletal Medicine",
        diseases: [
          "Osteoarthritis",
          "Rheumatoid Arthritis",
          "Frozen Shoulder",
          "Vertebral Disc Herniation",
          "Ligament Injury / Sprains",
        ],
      },
    ],
  },
  {
    id: "dermatology",
    label: "Dermatology",
    description:
      "Clinical dermatology and trichology programs for inflammatory, infectious, and cosmetic concerns.",
    imageSrc: "/images/care-tile-skin-hair.jpg",
    imageAlt: "Medical professional performing laser skin treatment on a patient",
    subUnits: [
      {
        title: "Skin Care",
        diseases: ["Acne", "Psoriasis", "Vitiligo", "Eczema", "Fungal Infections"],
      },
      {
        title: "Hair Care",
        diseases: ["Hair Fall", "Premature Graying of Hair", "Scalp Health & Dandruff"],
      },
    ],
  },
  {
    id: "diagnostic-services",
    label: "Diagnostic Services",
    description:
      "Supporting investigations that complement clinical assessment across specialties, coordinated with your care team.",
    imageSrc: "/images/care-tile-cardiac.jpg",
    imageAlt: "Clinical monitoring and diagnostic support",
    subUnits: [
      {
        title: "Diagnostics",
        diseases: ["ECG", "Blood Investigation"],
      },
    ],
  },
];

function DiseaseChip({ label }: { label: string }) {
  return (
    <span className="font-ui inline-block rounded-full border border-[#a7e9e3] bg-[#f0fffe] px-3 py-1 text-[13px] font-medium text-[#1f7474]">
      {label}
    </span>
  );
}

function CareHeadingSection({
  heading,
  muted,
}: {
  heading: CareHeading;
  muted: boolean;
}) {
  return (
    <section
      id={heading.id}
      className={`scroll-mt-[148px] py-14 lg:scroll-mt-28 ${muted ? "bg-[#f9fafb]" : "bg-white"}`}
    >
      <div className="space-y-7">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[360px,1fr]">
          {heading.imageSrc ? (
            <div className="relative h-[250px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_16px_rgba(16,24,40,0.10)] md:h-[300px]">
              <Image
                src={heading.imageSrc}
                alt={heading.imageAlt ?? `${heading.label} care visual`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
                priority={heading.id === "terminal-illness"}
              />
            </div>
          ) : (
            <div className="flex h-[250px] items-center justify-center rounded-2xl border-2 border-dashed border-[#cbd5e1] bg-white md:h-[300px]">
              <div className="text-center">
                <p className="font-ui text-[14px] font-bold text-[#64748b]">Image placeholder</p>
                <p className="font-ui mt-1 text-[12px] text-[#94a3b8]">Add section image later</p>
              </div>
            </div>
          )}

          <div className="border-l-[3px] border-[#1f948e] pl-5">
            <h2 className="text-[28px] font-bold leading-tight text-[#101828] md:text-[34px]">
              {heading.label}
            </h2>
            <p className="font-ui mt-2 max-w-[860px] text-[15px] leading-[1.75] text-[#4a5565]">
              {heading.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {heading.subUnits.map((unit) => (
            <article
              key={unit.title}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
            >
              <h3 className="text-[20px] font-bold text-[#101828]">{unit.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {unit.diseases.map((disease) => (
                  <DiseaseChip key={disease} label={disease} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div>
          <a
            href="/appointment"
            className="font-ui inline-flex items-center gap-1.5 rounded-full border border-[#1f948e] px-5 py-2.5 text-[13px] font-bold text-[#1f948e] transition hover:bg-[#1f948e] hover:text-white"
          >
            Book Appointment →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CarePage() {
  const [activeId, setActiveId] = useState<string>(careHeadings[0].id);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    if (!section) return;
    const el = document.getElementById(section);
    if (!el) return;
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (careHeadings.some((s) => s.id === section)) setActiveId(section);
    }, 80);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    careHeadings.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id);
        },
        { rootMargin: "-20% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#f0fffe] py-14 text-center md:py-16">
          <div className={wrapperClass}>
            <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f948e] md:text-[13px]">
              Clinical Care
            </p>
            <h1 className="mt-2.5 text-[36px] font-bold leading-[1.1] text-[#101828] md:mt-3 md:text-[48px]">
              Care @ Saukhyabharathi
            </h1>
            <p className="font-ui mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.75] text-[#4a5565] md:mt-4 md:text-[16px] md:leading-[1.8]">
              Integrated Ayurveda and modern medicine organized into 7 focused care headings for clearer
              disease-wise guidance.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:mt-6">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="font-ui rounded-full border border-[#a7e9e3] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1f7474]"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 md:mt-7 md:gap-3">
              <a
                href="/appointment"
                className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-6 py-2.5 text-[13px] font-bold text-white transition hover:brightness-95 md:px-7 md:py-3 md:text-[14px]"
              >
                Book Consultation
              </a>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("terminal-illness")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-ui inline-flex items-center justify-center rounded-full border border-[#1f948e] bg-white px-6 py-2.5 text-[13px] font-bold text-[#1f948e] transition hover:bg-[#f0fffe] md:px-7 md:py-3 md:text-[14px]"
              >
                Explore Care Specialities ↓
              </button>
            </div>
          </div>
        </section>

        <div className="sticky top-[84px] z-20 border-b border-[#e5e7eb] bg-white shadow-sm lg:hidden">
          <div className="overflow-x-auto px-4 py-3">
            <div className="flex w-max gap-2">
              {careHeadings.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`font-ui whitespace-nowrap rounded-full border px-4 py-1.5 text-[12px] font-medium transition ${
                    activeId === s.id
                      ? "border-[#1f948e] bg-[#1f948e] text-white"
                      : "border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[#a7e9e3]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={wrapperClass}>
          <div className="flex gap-12 py-4">
            <aside className="hidden w-52 shrink-0 lg:block">
              <div className="sticky top-[108px] max-h-[calc(100vh-120px)] overflow-y-auto">
                <p className="font-ui mb-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                  Care Specialities
                </p>
                <nav className="flex flex-col">
                  {careHeadings.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`font-ui block border-l-2 py-2 pl-3 pr-2 text-left text-[13px] transition ${
                        activeId === s.id
                          ? "border-[#1f948e] font-bold text-[#1f948e]"
                          : "border-transparent text-[#4a5565] hover:border-[#a7e9e3] hover:text-[#101828]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="divide-y divide-[#e5e7eb]">
                {careHeadings.map((heading, i) => (
                  <CareHeadingSection key={heading.id} heading={heading} muted={i % 2 !== 0} />
                ))}
              </div>

              <IntegratedCareModelSection className="my-12" />

              <section className="pb-16">
                <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] p-10 text-center">
                  <h3 className="text-[28px] font-bold text-[#101828]">Ready to Begin Your Care Journey?</h3>
                  <p className="font-ui mx-auto mt-3 mb-7 max-w-[580px] text-[15px] leading-[1.7] text-[#4a5565]">
                    Choose a specialty and take the first step toward better health with our expert integrated
                    care team.
                  </p>
                  <a
                    href="/appointment"
                    className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-8 py-3 text-[14px] font-bold text-white transition hover:brightness-95"
                  >
                    Book Your Consultation
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
