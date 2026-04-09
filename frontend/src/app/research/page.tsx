"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/#about", label: "About SBH" },
  { href: "/#stories", label: "Stories" },
  { href: "/appointment", label: "Appointment" },
];

type Committee = {
  id: string;
  title: string;
  summary: string;
  scope: string[];
};

const committees: Committee[] = [
  {
    id: "cec",
    title: "Clinical Ethics Committee",
    summary:
      "Oversees the ethical conduct of clinical activities and research involving participants, ensuring alignment with institutional policy and applicable standards.",
    scope: [
      "Protocol and consent review (placeholder)",
      "Ongoing ethical oversight (placeholder)",
      "Recommendations to leadership (placeholder)",
    ],
  },
  {
    id: "dsmb",
    title: "Data Safety Monitoring Board",
    summary:
      "Provides independent review of safety and efficacy data where applicable, supporting timely identification of risks and protective actions during studies.",
    scope: [
      "Safety signal review (placeholder)",
      "Interim data considerations (placeholder)",
      "Recommendations on study continuation (placeholder)",
    ],
  },
  {
    id: "iec",
    title: "Institutional Ethics Committee",
    summary:
      "Serves as the institutional body for ethics review and approval processes, maintaining documentation and communication with investigators and administration.",
    scope: [
      "Initial and amendment review (placeholder)",
      "Compliance monitoring support (placeholder)",
      "Documentation and reporting (placeholder)",
    ],
  },
];

type Publication = {
  title: string;
  venue: string;
  summary: string;
};

const publications: Publication[] = [
  {
    title: "Integrated oncology supportive care outcomes (placeholder)",
    venue: "Journal / Year — to be updated",
    summary:
      "Placeholder summary describing study focus and contribution; replace with approved publication text when available.",
  },
  {
    title: "Ayurveda protocol documentation in clinical settings (placeholder)",
    venue: "Journal / Year — to be updated",
    summary:
      "Placeholder for peer-reviewed or grey-literature entry; link to full text when permitted.",
  },
  {
    title: "Education program evaluation brief (placeholder)",
    venue: "Internal report / Year — to be updated",
    summary:
      "Placeholder for program-level outcomes or educational research summary.",
  },
];

type EducationProgram = {
  title: string;
  audience: string;
  duration: string;
  summary: string;
};

const educationPrograms: EducationProgram[] = [
  {
    title: "Foundations in integrative research literacy",
    audience: "Clinicians and trainees (placeholder)",
    duration: "Duration TBD",
    summary:
      "Introduces research documentation, ethics awareness, and collaborative publication pathways within the institution.",
  },
  {
    title: "Workshop series — classical therapies in evidence context",
    audience: "Multi-disciplinary teams (placeholder)",
    duration: "Duration TBD",
    summary:
      "Structured sessions on translating traditional practice knowledge into study design and reporting expectations.",
  },
  {
    title: "Seminar — quality systems for herbomineral formulations",
    audience: "Technical and pharmacy staff (placeholder)",
    duration: "Duration TBD",
    summary:
      "Overview of documentation, batch traceability, and safety documentation alignment with institutional SOPs.",
  },
];

type CmeItem = {
  title: string;
  description: string;
  whoFor: string[];
};

const cmeItems: CmeItem[] = [
  {
    title: "Ayurveda Oncology Clinical Internship and Training",
    description:
      "Structured clinical exposure and supervised learning in oncology supportive care contexts, subject to eligibility and capacity (placeholder details).",
    whoFor: ["Residents and fellows (placeholder)", "Licensed clinicians (placeholder)"],
  },
  {
    title: "Thesis and Project Guidance and Assistance",
    description:
      "Mentoring support for academic theses and projects, including alignment with ethics requirements and documentation standards.",
    whoFor: ["Students and researchers (placeholder)", "Institutional affiliates (placeholder)"],
  },
  {
    title:
      "Technical Assistance for Protocol development, Case Documentation and Report Publication",
    description:
      "Guidance on drafting protocols, maintaining case records, and preparing manuscripts or reports suitable for submission (placeholder scope).",
    whoFor: ["Principal investigators (placeholder)", "Study coordinators (placeholder)"],
  },
  {
    title: "Expert Guidance in preparation of Heavy metal and herbomineral based therapeutics",
    description:
      "Consultative input on formulation documentation, preparation workflows, and safety documentation expectations under institutional oversight (placeholder).",
    whoFor: ["Manufacturing / pharmacy teams (placeholder)", "Clinical leads (placeholder)"],
  },
  {
    title:
      "Quality control of heavy metal and herbomineral based drugs with Material Safety Data Sheet",
    description:
      "Describes institutional approaches to analytical QC documentation and MSDS alignment for relevant materials; full document library to be linked when available.",
    whoFor: ["QC personnel (placeholder)", "Regulatory liaisons (placeholder)"],
  },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-[34px] leading-[1.1] font-bold text-[#101828] md:text-[40px]">{title}</h2>
      {subtitle ? (
        <p className="font-ui mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.7] text-[#4a5565]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function ResearchPage() {
  const [openCme, setOpenCme] = useState(-1);

  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader
        navItems={navItems}
        ctaHref="#research-enquiries"
        ctaLabel="Research enquiries"
      />

      <main>
        {/* Hero — stock photo under soft teal wash (Unsplash); swap files in /public/images/ anytime */}
        <section className="relative overflow-hidden border-b border-[#e5e7eb]">
          <div className="pointer-events-none absolute inset-0 min-h-[420px] md:min-h-[480px]">
            <Image
              src="/images/research-hero.jpg"
              alt=""
              fill
              className="object-cover object-[center_40%]"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#f0fffe]/93 via-white/86 to-[#f0fffe]/94"
              aria-hidden
            />
            <div className="absolute inset-0 bg-[#1f948e]/[0.07]" aria-hidden />
          </div>
          <div className={`relative ${wrapperClass} py-16 md:py-20`}>
            <div className="mx-auto max-w-[900px] text-center">
              <p className="font-ui text-[13px] font-bold uppercase tracking-[0.12em] text-[#1f948e]">
                Research &amp; Education
              </p>
              <h1 className="mt-3 text-[40px] leading-[1.1] font-bold text-[#101828] md:text-[52px]">
                Research &amp; Education
              </h1>
              <p className="font-ui mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.8] text-[#4a5565]">
                Ethics oversight, safety monitoring, publications, and continuing education — supporting
                rigorous, transparent, and responsible integrative research.
              </p>

              <nav
                aria-label="On this page"
                className="font-ui mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#4a5565]"
              >
                <a
                  href="#governance"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Ethics
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#highlights"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Highlights
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#cme"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  CME
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#quality"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Quality
                </a>
              </nav>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#research-enquiries"
                  className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-7 py-3 text-[14px] font-bold text-white shadow-md transition hover:brightness-95"
                >
                  Research enquiries
                </a>
                <a
                  href="#governance"
                  className="font-ui inline-flex items-center justify-center rounded-full border border-[#1f948e] bg-white/90 px-7 py-3 text-[14px] font-bold text-[#1f948e] shadow-sm backdrop-blur-sm transition hover:bg-[#f0fffe]"
                >
                  View governance
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section id="governance" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 flex flex-col items-center gap-8 lg:mb-12 lg:flex-row lg:items-center lg:gap-12">
              <div className="relative h-[220px] w-full max-w-[520px] overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(16,24,40,0.12)] sm:h-[260px] lg:h-[300px] lg:w-[min(380px,36%)] lg:max-w-none lg:shrink-0">
                <Image
                  src="/images/research-governance-accent.jpg"
                  alt="Colleagues collaborating over documents in a meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 520px, 380px"
                />
              </div>
              <div className="w-full text-center lg:flex-1 lg:text-left">
                <h2 className="text-[34px] leading-[1.1] font-bold text-[#101828] md:text-[40px]">
                  Governance &amp; Ethics
                </h2>
                <p className="font-ui mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.7] text-[#4a5565] lg:mx-0">
                  Independent and institutional structures that support responsible conduct of research and
                  clinical learning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {committees.map((c) => (
                <article
                  key={c.id}
                  className="flex h-full flex-col rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                >
                  <h3 className="text-[22px] font-bold text-[#101828]">{c.title}</h3>
                  <p className="font-ui mt-3 flex-1 text-[14px] leading-[1.7] text-[#4a5565]">
                    {c.summary}
                  </p>
                  <div className="mt-5">
                    <p className="font-ui mb-2 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                      Scope (placeholder)
                    </p>
                    <ul className="font-ui list-disc space-y-1 pl-5 text-[13px] text-[#4a5565]">
                      {c.scope.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section id="highlights" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <SectionTitle
              title="Research Highlights"
              subtitle="Publications and education programs that reflect our commitment to transparency and continuous learning."
            />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="mb-5 text-[24px] font-bold text-[#101828]">Publications</h3>
                <ul className="space-y-5">
                  {publications.map((p) => (
                    <li
                      key={p.title}
                      className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_4px_rgba(16,24,40,0.06)]"
                    >
                      <p className="text-[17px] font-bold text-[#101828]">{p.title}</p>
                      <p className="font-ui mt-1 text-[12px] font-semibold uppercase tracking-wide text-[#1f948e]">
                        {p.venue}
                      </p>
                      <p className="font-ui mt-2 text-[14px] leading-[1.6] text-[#4a5565]">{p.summary}</p>
                    </li>
                  ))}
                </ul>
                <p className="font-ui mt-5 text-[13px] text-[#9ca3af]">
                  {/* Replace with link to publications index when available */}
                  <span className="cursor-not-allowed">View all publications — coming soon</span>
                </p>
              </div>
              <div>
                <h3 className="mb-5 text-[24px] font-bold text-[#101828]">Education Programs</h3>
                <div className="space-y-5">
                  {educationPrograms.map((prog) => (
                    <article
                      key={prog.title}
                      className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_4px_rgba(16,24,40,0.06)]"
                    >
                      <h4 className="text-[18px] font-bold text-[#101828]">{prog.title}</h4>
                      <p className="font-ui mt-2 text-[12px] text-[#4a5565]">
                        <span className="font-semibold text-[#101828]">{prog.audience}</span>
                        {" · "}
                        {prog.duration}
                      </p>
                      <p className="font-ui mt-2 text-[14px] leading-[1.6] text-[#4a5565]">{prog.summary}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CME */}
        <section id="cme" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <SectionTitle
              title="Continuing Medical Education & Training Programs"
              subtitle="Structured training and technical assistance pathways. Eligibility, schedules, and application steps will be published as they are finalized."
            />
            <div className="space-y-3">
              {cmeItems.map((item, index) => {
                const isOpen = openCme === index;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(16,24,40,0.06)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenCme((prev) => (prev === index ? -1 : index))}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[16px] font-semibold text-[#101828] md:text-[17px]">
                        {item.title}
                      </span>
                      <span className="text-[24px] leading-none text-[#1f948e] shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="mt-4 border-t border-[#f0f1f3] pt-4">
                        <p className="font-ui text-[14px] leading-[1.7] text-[#4a5565]">
                          {item.description}
                        </p>
                        <p className="font-ui mt-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                          Who it is for (placeholder)
                        </p>
                        <ul className="font-ui mt-1 list-disc space-y-1 pl-5 text-[13px] text-[#4a5565]">
                          {item.whoFor.map((w) => (
                            <li key={w}>{w}</li>
                          ))}
                        </ul>
                        <a
                          href="#research-enquiries"
                          className="font-ui mt-4 inline-flex rounded-full border border-[#1f948e] px-5 py-2 text-[13px] font-bold text-[#1f948e] transition hover:bg-[#f0fffe]"
                        >
                          Enquire
                        </a>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quality & MSDS */}
        <section id="quality" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-8 py-10 md:px-12">
              <h2 className="text-[28px] font-bold text-[#101828] md:text-[34px]">
                Quality control &amp; safety documentation
              </h2>
              <p className="font-ui mt-3 max-w-[800px] text-[15px] leading-[1.8] text-[#4a5565]">
                We maintain documentation practices for quality control of heavy metal and herbomineral
                based preparations, including alignment with Material Safety Data Sheet (MSDS) and
                institutional standard operating procedures where applicable. Specific certificates,
                batch records, and downloadable MSDS files will be listed here when approved for
                publication.
              </p>
              <ul className="font-ui mt-6 list-disc space-y-2 pl-5 text-[14px] text-[#4a5565]">
                <li>Analytical QC summaries — document library coming soon</li>
                <li>MSDS repository — links to be added when available</li>
                <li>SOP references — to be coordinated with administration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enquiries placeholder */}
        <section id="research-enquiries" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[640px] rounded-2xl border border-[#e5e7eb] bg-white px-8 py-10 text-center shadow-[0_2px_8px_rgba(16,24,40,0.06)]">
              <h2 className="text-[26px] font-bold text-[#101828]">Research enquiries</h2>
              <p className="font-ui mt-3 text-[15px] leading-[1.8] text-[#4a5565]">
                For collaborations, continuing education, internships, and technical assistance,
                contact details and application forms will be published here. Thank you for your
                interest.
              </p>
              <button
                type="button"
                className="font-ui mt-6 cursor-default rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-6 py-2.5 text-[14px] font-bold text-[#9ca3af]"
              >
                Notify me when available
              </button>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-[#e5e7eb] bg-[#f0fffe] py-14">
          <div className={`${wrapperClass} text-center`}>
            <p className="font-ui mx-auto max-w-[560px] text-[15px] leading-[1.7] text-[#4a5565]">
              Clinical care pathways and wellness programs remain available while we expand research
              and education resources.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/care"
                className="font-ui inline-flex rounded-full bg-[#1f948e] px-6 py-2.5 text-[14px] font-bold text-white transition hover:brightness-95"
              >
                Explore Care
              </a>
              <a
                href="/treatments"
                className="font-ui inline-flex rounded-full border border-[#1f948e] bg-white px-6 py-2.5 text-[14px] font-bold text-[#1f948e] transition hover:bg-white/90"
              >
                Wellness &amp; therapies
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
