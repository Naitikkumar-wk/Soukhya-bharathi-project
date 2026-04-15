"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];


type Therapy = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  benefits: string[];
  process: string[];
  suitableFor: string[];
};

type Faq = {
  question: string;
  answer: string;
};

const therapies: Therapy[] = [
  {
    id: "panchakarma",
    title: "Panchakarma",
    subtitle:
      "A classical cleansing and rejuvenation program designed to remove accumulated toxins and support long-term balance.",
    imageSrc: "/images/wellness-panchakarma.webp",
    imageAlt: "Panchakarma treatment session in progress",
    benefits: [
      "Supports metabolic reset and improved digestive balance",
      "Helps reduce chronic fatigue and heaviness",
      "Promotes joint comfort and mobility",
      "Encourages mental clarity and improved sleep patterns",
    ],
    process: [
      "Initial consultation and dosha assessment",
      "Personalized preparatory therapies and diet protocol",
      "Main cleansing procedures under supervision",
      "Post-care routine for gradual reintegration and maintenance",
    ],
    suitableFor: ["Stress overload", "Digestive irregularity", "Lifestyle-related inflammation"],
  },
  {
    id: "acupuncture",
    title: "Acupuncture",
    subtitle:
      "Targeted stimulation of specific points to support pain modulation, nervous system relaxation, and systemic balance.",
    imageSrc: "/images/wellness-acupuncture.webp",
    imageAlt: "Acupuncture therapy session",
    benefits: [
      "Helps reduce pain intensity in neck, back, and joints",
      "Can support stress regulation and calmness",
      "May improve headache and migraine frequency",
      "Supports sleep quality and daytime energy",
    ],
    process: [
      "Clinical assessment of symptoms and triggers",
      "Selection of treatment points based on concern profile",
      "Guided needling session with monitored response",
      "Follow-up adjustment plan across sessions",
    ],
    suitableFor: ["Musculoskeletal pain", "Stress and sleep concerns", "Recurring headaches"],
  },
  {
    id: "cupping",
    title: "Cupping Therapy",
    subtitle:
      "A traditional vacuum-based soft tissue method used to improve local circulation and release muscular tightness.",
    imageSrc: "/images/wellness-all.webp",
    imageAlt: "Cupping therapy setup and treatment",
    benefits: [
      "Supports muscular relaxation and reduced stiffness",
      "May improve local blood flow and recovery",
      "Helps reduce myofascial tightness after prolonged strain",
      "Useful as part of integrated pain management programs",
    ],
    process: [
      "Assessment of tender and tight regions",
      "Selection of cupping zones and pressure intensity",
      "Therapy session with timed suction cycles",
      "Aftercare guidance for hydration and recovery",
    ],
    suitableFor: ["Postural pain", "Muscle tightness", "Sports recovery support"],
  },
  {
    id: "yoga-therapy",
    title: "Yoga Therapy",
    subtitle:
      "Condition-specific therapeutic movement and breathwork to build stability, flexibility, and mind-body resilience.",
    imageSrc: "/images/wellness-all.webp",
    imageAlt: "Guided yoga therapy practice",
    benefits: [
      "Improves posture, flexibility, and movement confidence",
      "Supports better breath control and stress response",
      "Helps with long-term consistency through structured routines",
      "Promotes emotional balance and attention stability",
    ],
    process: [
      "Functional and breathing pattern assessment",
      "Tailored sequence based on current capacity",
      "Supervised practice with modifications",
      "Home protocol and progress tracking",
    ],
    suitableFor: ["Sedentary lifestyle", "Stress recovery", "Rehabilitation support plans"],
  },
  {
    id: "kalari-marma",
    title: "Kalari Marma Therapy",
    subtitle:
      "A Kerala tradition using focused marma point stimulation and bodywork for pain relief and restoration.",
    imageSrc: "/images/wellness-all.webp",
    imageAlt: "Kalari Marma therapy treatment",
    benefits: [
      "Supports deep tissue release and mobility",
      "Can reduce chronic pain sensitivity",
      "Improves body awareness and movement quality",
      "Useful in integrated musculoskeletal care plans",
    ],
    process: [
      "Clinical and structural assessment",
      "Marma point mapping and treatment planning",
      "Hands-on therapy session with controlled pressure work",
      "Follow-up recommendations and supportive exercises",
    ],
    suitableFor: ["Chronic neck/back pain", "Mobility restrictions", "Recovery phases"],
  },
];

const integratedBenefits = [
  "Single care pathway that combines Ayurveda wisdom with modern clinical understanding",
  "Personalized plans based on condition profile, lifestyle, and recovery goals",
  "Coordinated follow-ups that improve continuity of care",
  "Balanced protocols designed for safety, practicality, and long-term outcomes",
];

const integratedProcess = [
  { step: "01", title: "Assess", text: "Clinical consultation + Ayurvedic profile evaluation to define your baseline." },
  { step: "02", title: "Plan", text: "Integrated therapy roadmap with clear timelines, milestones, and home guidance." },
  { step: "03", title: "Treat", text: "Therapies delivered by trained practitioners with progress checks each session." },
  { step: "04", title: "Follow-up", text: "Regular review, protocol refinement, and relapse-prevention support." },
];

const faqs: Faq[] = [
  {
    question: "How do I choose the right therapy for my condition?",
    answer:
      "You do not need to decide alone. Our team evaluates your symptoms, medical history, and goals first, then recommends the most suitable wellness pathway.",
  },
  {
    question: "Can I combine Ayurveda therapies with ongoing modern treatment?",
    answer:
      "Yes, in many cases therapies can be integrated. We align your wellness plan with your current treatment context for coordinated care.",
  },
  {
    question: "How many sessions are usually required?",
    answer:
      "Session count depends on your condition, severity, and response. Most protocols are reviewed after the first few sessions and adjusted for outcomes.",
  },
  {
    question: "Is Panchakarma suitable for everyone?",
    answer:
      "Not always. Panchakarma is personalized and may be modified based on age, current health status, and readiness after consultation.",
  },
  {
    question: "Do these therapies help with stress and sleep issues?",
    answer:
      "Many clients seek support for stress load and sleep quality. Depending on evaluation, Yoga Therapy, Acupuncture, and selected Ayurvedic therapies may be recommended.",
  },
  {
    question: "Are there side effects after therapy sessions?",
    answer:
      "Mild temporary sensations such as fatigue or soreness may occur in some therapies. Our practitioners provide aftercare instructions to keep recovery comfortable.",
  },
  {
    question: "Can I book directly or do I need a first consultation?",
    answer:
      "You can book directly through the appointment route. The first visit includes consultation and planning before full protocol starts.",
  },
  {
    question: "Do you provide home-care recommendations after sessions?",
    answer:
      "Yes. Diet guidance, movement routines, breathing practices, and follow-up habits are shared to support continuity outside the clinic.",
  },
  {
    question: "How soon can I expect noticeable improvement?",
    answer:
      "Timelines vary by condition and consistency. Some clients notice early symptomatic relief, while deeper recovery generally needs a structured course.",
  },
  {
    question: "Is wellness therapy only for illness, or also for prevention?",
    answer:
      "Both. Our programs support preventive health, stress resilience, and post-illness recovery in addition to condition-focused care.",
  },
];

function SectionTitle({
  title,
  subtitle,
  compact,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-7 text-center" : "mb-10 text-center"}>
      <h2
        className={
          compact
            ? "text-[26px] font-bold leading-[1.12] text-[#101828] md:text-[30px]"
            : "text-[34px] leading-[1.1] font-bold text-[#101828] md:text-[40px]"
        }
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`font-ui mx-auto text-[#4a5565] ${
            compact
              ? "mt-2 max-w-[680px] text-[14px] leading-[1.58]"
              : "mt-3 max-w-[760px] text-[16px] leading-[1.7]"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TherapyCard({ therapy }: { therapy: Therapy }) {
  return (
    <article
      id={therapy.id}
      className="scroll-mt-32 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[240px] w-full lg:h-auto lg:min-h-[320px]">
          <Image
            src={therapy.imageSrc}
            alt={therapy.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-[24px] font-bold leading-tight text-[#101828] md:text-[25px]">{therapy.title}</h3>
          <p className="font-ui mt-1.5 text-[15px] leading-[1.65] text-[#4a5565]">
            {therapy.subtitle}
          </p>

          <div className="mt-3.5">
            <p className="font-ui mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
              Key Benefits
            </p>
            <ul className="font-ui list-disc space-y-1 pl-5 text-[13px] leading-[1.55] text-[#4a5565] md:text-[14px] md:leading-[1.6]">
              {therapy.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3.5">
            <p className="font-ui mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
              Typical Process
            </p>
            <ul className="font-ui list-disc space-y-1 pl-5 text-[13px] leading-[1.55] text-[#4a5565] md:text-[14px] md:leading-[1.6]">
              {therapy.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3.5">
            <p className="font-ui mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
              Suitable For
            </p>
            <div className="flex flex-wrap gap-1.5">
              {therapy.suitableFor.map((item) => (
                <span
                  key={item}
                  className="font-ui rounded-full border border-[#a7e9e3] bg-[#f0fffe] px-2.5 py-0.5 text-[11px] font-medium text-[#1f7474] md:px-3 md:py-1 md:text-[12px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <a
            href="/appointment"
            className="font-ui mt-5 inline-flex items-center justify-center rounded-full bg-[#1f948e] px-6 py-2.5 text-[13px] font-bold text-white transition hover:brightness-95 md:text-[14px]"
          >
            Book This Therapy
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TreatmentsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    if (!section) return;
    const el = document.getElementById(section);
    if (!el) return;
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#f0fffe] py-14 md:py-16">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[900px] text-center">
              <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f948e] md:text-[13px]">
                Wellness Care
              </p>
              <h1 className="mt-2.5 text-[36px] leading-[1.1] font-bold text-[#101828] md:mt-3 md:text-[48px]">
                Ayurveda &amp; Traditional Health Systems for Wellness
              </h1>
              <p className="font-ui mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.75] text-[#4a5565] md:mt-4 md:text-[16px] md:leading-[1.8]">
                Structured wellness programs that combine classical therapies with coordinated
                clinical guidance for preventive care, stress recovery, and long-term health
                resilience.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:mt-7 md:gap-3">
                <a
                  href="/appointment"
                  className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-6 py-2.5 text-[13px] font-bold text-white transition hover:brightness-95 md:px-7 md:py-3 md:text-[14px]"
                >
                  Book Consultation
                </a>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("therapies")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-ui inline-flex items-center justify-center rounded-full border border-[#1f948e] bg-white px-6 py-2.5 text-[13px] font-bold text-[#1f948e] transition hover:bg-[#f0fffe] md:px-7 md:py-3 md:text-[14px]"
                >
                  Explore Therapies
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="therapies" className="py-12 md:py-16">
          <div className={wrapperClass}>
            <SectionTitle
              compact
              title="Therapies and Treatments"
              subtitle="Every therapy includes an assessment-first approach, personalized protocol, and follow-up guidance."
            />

            <div className="space-y-6 md:space-y-7">
              {therapies.map((therapy) => (
                <TherapyCard key={therapy.id} therapy={therapy} />
              ))}
            </div>
          </div>
        </section>

        <section id="integrated-care" className="bg-[#f9fafb] py-12 md:py-16">
          <div className={wrapperClass}>
            <SectionTitle
              compact
              title="Integrated and Cooperative Healthcare"
              subtitle="An aligned care model where wellness therapies and clinical supervision work together for safer and clearer outcomes."
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
              <article className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_8px_rgba(16,24,40,0.06)] md:p-6">
                <h3 className="text-[22px] font-bold text-[#101828] md:text-[23px]">Benefits</h3>
                <ul className="font-ui mt-3 list-disc space-y-1.5 pl-5 text-[13px] leading-[1.6] text-[#4a5565] md:text-[14px] md:leading-[1.65]">
                  {integratedBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_8px_rgba(16,24,40,0.06)] md:p-6">
                <h3 className="text-[22px] font-bold text-[#101828] md:text-[23px]">Process</h3>
                <div className="mt-3 space-y-2">
                  {integratedProcess.map((item) => (
                    <div
                      key={item.step}
                      className="rounded-xl border border-[#e5e7eb] bg-[#fcfcfd] p-3.5 md:p-4"
                    >
                      <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-[#1f948e] md:text-[11px]">
                        Step {item.step}
                      </p>
                      <h4 className="mt-0.5 text-[16px] font-bold text-[#101828] md:text-[17px]">{item.title}</h4>
                      <p className="font-ui mt-0.5 text-[15px] leading-[1.62] text-[#4a5565]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-8 md:mt-9">
              <h3 className="mb-3 text-[26px] font-bold text-[#101828] md:mb-3.5 md:text-[28px]">FAQs</h3>
              <div className="space-y-2.5">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <article
                      key={item.question}
                      className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-[0_1px_4px_rgba(16,24,40,0.06)] md:px-5 md:py-3.5"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="text-[16px] font-semibold leading-snug text-[#101828] md:text-[17px]">
                          {item.question}
                        </span>
                        <span className="text-[22px] leading-none text-[#1f948e] md:text-[24px]">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen ? (
                        <p className="font-ui mt-2.5 pr-6 text-[15px] leading-[1.68] text-[#4a5565] md:mt-3 md:pr-8">
                          {item.answer}
                        </p>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className={wrapperClass}>
            <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-6 py-8 text-center md:px-10 md:py-10">
              <h3 className="text-[28px] font-bold leading-[1.15] text-[#101828] md:text-[32px]">
                Ready to Start Your Wellness Journey?
              </h3>
              <p className="font-ui mx-auto mt-2.5 max-w-[680px] text-[14px] leading-[1.72] text-[#4a5565] md:mt-3 md:text-[15px] md:leading-[1.78]">
                Book your consultation and receive a tailored plan that combines suitable therapies,
                practical lifestyle guidance, and structured follow-up care.
              </p>
              <a
                href="/appointment"
                className="font-ui mt-6 inline-flex items-center justify-center rounded-full bg-[#1f948e] px-7 py-2.5 text-[13px] font-bold text-white transition hover:brightness-95 md:mt-7 md:px-8 md:py-3 md:text-[14px]"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
