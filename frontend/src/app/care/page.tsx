"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/#treatments", label: "Wellness" },
  { href: "/#research", label: "Research" },
  { href: "/#about", label: "About SBH" },
  { href: "/#stories", label: "Stories" },
  { href: "/appointment", label: "Appointment" },
];

const trustBadges = [
  "Ayurveda + Modern Medicine",
  "Expert Specialists",
  "Personalized Treatment",
  "In-Patient Services",
];

type Specialty = {
  id: string;
  label: string;
  description: string;
  conditions: string[];
  imageSrc: string;
  imageAlt: string;
};

const specialties: Specialty[] = [
  {
    id: "cancer-care",
    label: "Cancer Care & Surgical Oncology",
    description:
      "Comprehensive oncology care combining modern surgical expertise with Ayurvedic support for holistic cancer management.",
    conditions: [
      "Oncology Super Specialty Care",
      "Ayurveda Oncology",
      "Surgery",
      "Chemotherapy",
      "Radiotherapy",
      "Counseling",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1576671081741-c538eafccfff?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Doctor administering IV treatment to a cancer patient in a hospital room",
  },
  {
    id: "neuro-care",
    label: "Neurological Care",
    description:
      "Integrated neurological care for brain, spine, and nervous system conditions using modern and Ayurvedic protocols.",
    conditions: [
      "Stroke / Paralysis",
      "Spine Alignment",
      "Developmental Disorders",
      "Autism Spectrum Disorders",
      "Dementia",
      "Alzheimer's Disease",
      "Parkinson's Disease",
      "Epilepsy & Seizure Disorders",
      "Migraine",
      "Sciatica",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Doctor showing brain MRI scan on tablet to patient",
  },
  {
    id: "cardiac-care",
    label: "Cardiac Care",
    description:
      "Preventive and therapeutic cardiology with lifestyle protocols to support heart health and blood pressure management.",
    conditions: ["Preventive Cardiology", "Hypertension"],
    imageSrc:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cardiologist reviewing ECG notes with stethoscope",
  },
  {
    id: "respiratory-care",
    label: "Respiratory Care",
    description:
      "Expert management of acute and chronic respiratory conditions using modern diagnostics and traditional therapies.",
    conditions: [
      "Interstitial Lung Disease",
      "Pneumonia",
      "Bronchitis / Bronchial Asthma",
      "Sinusitis",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Doctor using stethoscope for chest and lung examination",
  },
  {
    id: "womens-care",
    label: "Women's Care",
    description:
      "Specialized women's health care across all life stages — from menstrual health to pregnancy and menopause.",
    conditions: [
      "PCOD",
      "Menorrhagia / Dysmenorrhea",
      "Infertility",
      "Menopausal Care",
      "Pre-Pregnancy Planning (Garbha Samskara)",
      "Antenatal / Postnatal Care",
      "Pregnancy Care",
      "Endometriosis",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1659353888906-adb3e0041693?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Female doctor in consultation for women's health",
  },
  {
    id: "pediatric-care",
    label: "Pediatric Care",
    description:
      "Child-focused care for developmental, allergic, and ENT conditions with gentle, effective Ayurvedic approaches.",
    conditions: [
      "Autism",
      "ADHD",
      "Developmental Delay",
      "Allergy / Asthma",
      "Skin Disorders",
      "Tonsil & Adenoid Care",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Doctor examining a young boy with his mother present",
  },
  {
    id: "skin-hair-care",
    label: "Skin & Hair Care",
    description:
      "Dermatological and trichological expertise combining modern treatments with Ayurvedic skin and scalp therapies.",
    conditions: [
      "Acne",
      "Psoriasis",
      "Vitiligo",
      "Eczema",
      "Fungal Infections",
      "Hair Fall",
      "Premature Graying of Hair",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1746806942799-b4db209e9a6b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Medical professional performing laser skin treatment on a patient",
  },
  {
    id: "digestive-care",
    label: "Digestive Care",
    description:
      "Comprehensive gastrointestinal care for acute, chronic, and inflammatory digestive conditions.",
    conditions: [
      "Acute / Chronic Gastritis",
      "Dyspepsia",
      "IBS — Irritable Bowel Syndrome",
      "IBD (Crohn's Disease & Ulcerative Colitis)",
      "Malabsorption & Nutritional Deficiency",
      "Fatty Liver",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Gastroenterology specialists in clinical consultation",
  },
  {
    id: "endocrinology-care",
    label: "Endocrinology Care",
    description:
      "Evidence-based management of hormonal and metabolic disorders with integrated Ayurvedic lifestyle support.",
    conditions: ["Type 1 & Type 2 Diabetes", "Thyroid Dysfunction", "PCOD / PCOS"],
    imageSrc:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Nurse checking blood glucose for diabetes management",
  },
  {
    id: "musculoskeletal-care",
    label: "Musculoskeletal Care",
    description:
      "Joint, bone, and soft tissue care combining physiotherapy principles with Ayurvedic pain management.",
    conditions: [
      "Osteoarthritis",
      "Rheumatoid Arthritis",
      "Frozen Shoulder",
      "Vertebral Disc Herniation",
      "Ligament Injury / Sprains",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1706353399656-210cca727a33?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Physiotherapist performing hands-on treatment on a patient",
  },
  {
    id: "other-services",
    label: "Other Services",
    description:
      "Additional specialized services including home care, in-patient critical care, and surgical support.",
    conditions: [
      "Sleep Disorders",
      "Male Infertility",
      "Autoimmune Disorders",
      "Home Panchakarma Services",
      "In-Patient Services for Critical Conditions",
      "Surgical Care",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Home care nurse visiting and assisting an elderly patient",
  },
];

const wellnessTherapies = [
  {
    src: "/images/wellness-panchakarma.webp",
    alt: "Panchakarma treatment",
    title: "Panchakarma",
    text: "Classical detoxification protocol restoring balance through five therapeutic procedures.",
  },
  {
    src: "/images/wellness-acupuncture.webp",
    alt: "Acupuncture treatment",
    title: "Acupuncture",
    text: "Targeted needle therapy for pain relief, stress reduction, and systemic rebalancing.",
  },
  {
    src: "/images/wellness-all.webp",
    alt: "Cupping therapy",
    title: "Cupping Therapy",
    text: "Traditional suction-based therapy for improving circulation and releasing muscle tension.",
  },
];

const integratedSteps = [
  {
    step: "01",
    title: "Assess",
    text: "Holistic consultation combining Ayurvedic Prakriti analysis with modern clinical diagnostics.",
  },
  {
    step: "02",
    title: "Plan",
    text: "Integrated treatment plan merging evidence-based medicine protocols with Ayurvedic therapies.",
  },
  {
    step: "03",
    title: "Recover",
    text: "Ongoing follow-up, lifestyle protocol, and Panchakarma detox support for sustained wellness.",
  },
];

function ConditionChip({ label }: { label: string }) {
  return (
    <span className="font-ui inline-block rounded-full border border-[#a7e9e3] bg-[#f0fffe] px-3 py-1 text-[13px] font-medium text-[#1f7474]">
      {label}
    </span>
  );
}

function SpecialtySection({
  specialty,
  muted,
  index,
}: {
  specialty: Specialty;
  muted: boolean;
  index: number;
}) {
  const imageOnRight = index % 2 !== 0;

  return (
    <section
      id={specialty.id}
      className={`scroll-mt-[148px] py-14 lg:scroll-mt-28 ${muted ? "bg-[#f9fafb]" : "bg-white"}`}
    >
      <div
        className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
          imageOnRight ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <div className="relative h-[320px] overflow-hidden rounded-2xl shadow-[0_4px_16px_rgba(16,24,40,0.10)]">
          <Image
            src={specialty.imageSrc}
            alt={specialty.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div>
          <div className="border-l-[3px] border-[#1f948e] pl-5">
            <h2 className="text-[26px] font-bold leading-tight text-[#101828] md:text-[30px]">
              {specialty.label}
            </h2>
            <p className="font-ui mt-2 text-[14px] leading-[1.7] text-[#4a5565]">
              {specialty.description}
            </p>
          </div>

          <div className="mt-6">
            <p className="font-ui mb-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
              Conditions we treat
            </p>
            <div className="flex flex-wrap gap-2">
              {specialty.conditions.map((c) => (
                <ConditionChip key={c} label={c} />
              ))}
            </div>
          </div>

          <div className="mt-7">
            <a
              href="/appointment"
              className="font-ui inline-flex items-center gap-1.5 rounded-full border border-[#1f948e] px-5 py-2.5 text-[13px] font-bold text-[#1f948e] transition hover:bg-[#1f948e] hover:text-white"
            >
              Book Appointment →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TherapyCard({
  src,
  alt,
  title,
  text,
}: {
  src: string;
  alt: string;
  title: string;
  text: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition hover:shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
      <div className="relative h-[220px] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[22px] font-bold text-[#101828]">{title}</h3>
        <p className="font-ui mt-2 mb-5 text-[14px] leading-[1.6] text-[#4a5565]">{text}</p>
        <a href="/appointment" className="font-ui text-[13px] font-bold text-[#1f948e]">
          Book a Session →
        </a>
      </div>
    </article>
  );
}

export default function CarePage() {
  const [activeId, setActiveId] = useState<string>(specialties[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    specialties.forEach((s) => {
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
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="border-b border-[#e5e7eb] py-16 text-center">
          <div className={wrapperClass}>
            <h1 className="text-[42px] font-bold leading-tight text-[#101828] md:text-[52px]">
              Care @ Saukhyabharathi
            </h1>
            <p className="font-ui mx-auto mt-4 max-w-[680px] text-[16px] leading-[1.7] text-[#4a5565]">
              Integrated Ayurveda and modern medicine under one roof — 11 specialties,
              expert doctors, and personalized care plans for every condition.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {trustBadges.map((b) => (
                <span
                  key={b}
                  className="font-ui rounded-full border border-[#a7e9e3] bg-[#f0fffe] px-4 py-1.5 text-[13px] font-medium text-[#1f7474]"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/appointment"
                className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-7 py-3 text-[14px] font-bold text-white transition hover:brightness-95"
              >
                Book Consultation
              </a>
              <a
                href="#cancer-care"
                className="font-ui inline-flex items-center justify-center rounded-full border border-[#1f948e] px-7 py-3 text-[14px] font-bold text-[#1f948e] transition hover:bg-[#f0fffe]"
              >
                Explore Specialties ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── Mobile sticky pill strip ──────────────────────────── */}
        <div className="sticky top-[84px] z-20 border-b border-[#e5e7eb] bg-white shadow-sm lg:hidden">
          <div className="overflow-x-auto px-4 py-3">
            <div className="flex w-max gap-2">
              {specialties.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`font-ui whitespace-nowrap rounded-full border px-4 py-1.5 text-[12px] font-medium transition ${
                    activeId === s.id
                      ? "border-[#1f948e] bg-[#1f948e] text-white"
                      : "border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[#a7e9e3]"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout spanning entire page below hero ─── */}
        <div className={wrapperClass}>
          <div className="flex gap-12 py-4">

            {/* Sticky Left Nav — desktop, sticks through entire page */}
            <aside className="hidden w-52 shrink-0 lg:block">
              <div className="sticky top-[108px] max-h-[calc(100vh-120px)] overflow-y-auto">
                <p className="font-ui mb-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                  Specialties
                </p>
                <nav className="flex flex-col">
                  {specialties.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`font-ui block border-l-2 py-2 pl-3 pr-2 text-[13px] transition ${
                        activeId === s.id
                          ? "border-[#1f948e] font-bold text-[#1f948e]"
                          : "border-transparent text-[#4a5565] hover:border-[#a7e9e3] hover:text-[#101828]"
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right column — ALL page content */}
            <div className="min-w-0 flex-1">

              {/* Specialty Sections */}
              <div className="divide-y divide-[#e5e7eb]">
                {specialties.map((s, i) => (
                  <SpecialtySection key={s.id} specialty={s} muted={i % 2 !== 0} index={i} />
                ))}
              </div>

              {/* ── Integrated Care Explainer ─────────────────────── */}
              <section className="my-12 rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-8 py-12">
                <div className="mb-10 text-center">
                  <h2 className="text-[28px] font-bold text-[#101828] md:text-[34px]">
                    Ayurveda &amp; Modern Medicine Under One Roof
                  </h2>
                  <p className="font-ui mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.7] text-[#4a5565]">
                    Our integrated care model combines the best of classical Ayurveda with
                    evidence-based modern medicine for whole-person healing.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {integratedSteps.map((item) => (
                    <div
                      key={item.step}
                      className="rounded-2xl border border-[#a7e9e3] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                    >
                      <div className="font-ui mb-3 text-[11px] font-bold uppercase tracking-widest text-[#1f948e]">
                        Step {item.step}
                      </div>
                      <h3 className="text-[22px] font-bold text-[#101828]">{item.title}</h3>
                      <p className="font-ui mt-2 text-[14px] leading-[1.6] text-[#4a5565]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Wellness Therapies ────────────────────────────── */}
              <section id="wellness" className="py-16">
                <div className="mb-11 text-center">
                  <h2 className="text-[28px] font-bold text-[#101828] md:text-[34px]">
                    Ayurveda &amp; Traditional Health Systems for Wellness
                  </h2>
                  <p className="font-ui mx-auto mt-3 max-w-[560px] text-[15px] text-[#4a5565]">
                    Time-tested therapies delivered by trained practitioners for holistic restoration.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {wellnessTherapies.map((t) => (
                    <TherapyCard key={t.title} {...t} />
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <article className="rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition hover:shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
                    <h3 className="text-[22px] font-bold text-[#101828]">Yoga Therapy</h3>
                    <p className="font-ui mt-2 mb-5 text-[14px] leading-[1.6] text-[#4a5565]">
                      Therapeutic yoga sequences tailored to your condition for physical and mental restoration.
                    </p>
                    <a href="/appointment" className="font-ui text-[13px] font-bold text-[#1f948e]">
                      Book a Session →
                    </a>
                  </article>
                  <article className="rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition hover:shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
                    <h3 className="text-[22px] font-bold text-[#101828]">Kalari Marma Therapy</h3>
                    <p className="font-ui mt-2 mb-5 text-[14px] leading-[1.6] text-[#4a5565]">
                      Ancient Kerala martial-art-derived marma point stimulation for deep tissue healing and pain relief.
                    </p>
                    <a href="/appointment" className="font-ui text-[13px] font-bold text-[#1f948e]">
                      Book a Session →
                    </a>
                  </article>
                </div>
              </section>

              {/* ── Final CTA Band ────────────────────────────────── */}
              <section className="pb-16">
                <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] p-10 text-center">
                  <h3 className="text-[28px] font-bold text-[#101828]">
                    Ready to Begin Your Care Journey?
                  </h3>
                  <p className="font-ui mx-auto mt-3 mb-7 max-w-[580px] text-[15px] leading-[1.7] text-[#4a5565]">
                    Choose a specialty and take the first step toward better health with our
                    expert integrated care team.
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
            {/* end right column */}
          </div>
        </div>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
