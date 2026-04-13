import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { InPageScrollNav } from "@/components/InPageScrollNav";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];

const committees = [
  {
    title: "Clinical Ethics Committee",
    summary:
      "Supports ethical conduct for clinical and research activities involving participants, aligned with institutional policies and applicable standards (placeholder).",
    scope: [
      "Protocol and consent review (placeholder)",
      "Ongoing ethics oversight (placeholder)",
      "Recommendations and reporting pathways (placeholder)",
    ],
  },
  {
    title: "Data Safety Monitoring Board",
    summary:
      "Provides independent review of safety and outcome data where applicable, helping identify risk signals and protective actions during studies (placeholder).",
    scope: [
      "Safety signal review (placeholder)",
      "Interim data considerations (placeholder)",
      "Continuation recommendations (placeholder)",
    ],
  },
  {
    title: "Institutional Ethics Committee",
    summary:
      "Institutional body for ethics review and approvals, supporting documentation integrity and investigator communication (placeholder).",
    scope: [
      "Initial and amendment review (placeholder)",
      "Compliance monitoring support (placeholder)",
      "Documentation and reporting (placeholder)",
    ],
  },
];

const publications = [
  {
    title: "Integrated supportive care outcomes (placeholder)",
    venue: "Journal / Year — to be updated",
    summary: "Placeholder summary; replace with approved publication details when available.",
  },
  {
    title: "Protocol documentation in clinical settings (placeholder)",
    venue: "Journal / Year — to be updated",
    summary: "Placeholder publication entry for future linking and indexing.",
  },
  {
    title: "Education program evaluation brief (placeholder)",
    venue: "Internal report / Year — to be updated",
    summary: "Placeholder for institutional learning outcomes and reporting.",
  },
];

const educationPrograms = [
  {
    title: "Foundations in integrative research literacy",
    audience: "Clinicians and trainees (placeholder)",
    duration: "Duration TBD",
    summary:
      "Orientation to ethics awareness, documentation expectations, and collaboration pathways (placeholder).",
  },
  {
    title: "Workshop series — evidence context for classical therapies",
    audience: "Multi-disciplinary teams (placeholder)",
    duration: "Duration TBD",
    summary:
      "Sessions on translating practice knowledge into study design and reporting formats (placeholder).",
  },
  {
    title: "Seminar — quality systems for herbomineral formulations",
    audience: "Technical and pharmacy staff (placeholder)",
    duration: "Duration TBD",
    summary:
      "Overview of traceability, batch documentation, and safety documentation alignment (placeholder).",
  },
];

const cmeItems = [
  {
    title: "Ayurveda Oncology Clinical Internship and Training",
    description:
      "Structured clinical exposure and supervised learning, subject to eligibility and capacity (placeholder).",
    whoFor: ["Residents and fellows (placeholder)", "Licensed clinicians (placeholder)"],
  },
  {
    title: "Thesis and Project Guidance and Assistance",
    description:
      "Mentoring support for theses and projects, including documentation alignment and ethics readiness (placeholder).",
    whoFor: ["Students and researchers (placeholder)", "Institutional affiliates (placeholder)"],
  },
  {
    title: "Technical Assistance for Protocol development, Case Documentation and Report Publication",
    description:
      "Guidance on protocol drafting, case records, and manuscript/report preparation (placeholder).",
    whoFor: ["Principal investigators (placeholder)", "Study coordinators (placeholder)"],
  },
  {
    title: "Expert Guidance in preparation of Heavy metal and herbomineral based therapeutics",
    description:
      "Consultative support on preparation workflows and documentation under institutional oversight (placeholder).",
    whoFor: ["Manufacturing / pharmacy teams (placeholder)", "Clinical leads (placeholder)"],
  },
  {
    title: "Quality control of heavy metal and herbomineral based drugs with Material Safety Data Sheet",
    description:
      "Documentation-oriented overview of QC expectations and MSDS alignment; downloadable library will be linked when available (placeholder).",
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
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/research" ctaLabel="Research & Education" />

      <main>
        <section className="border-b border-[#e5e7eb] bg-[#f0fffe] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[900px] text-center">
              <p className="font-ui text-[13px] font-bold uppercase tracking-[0.12em] text-[#1f948e]">
                Research &amp; Education
              </p>
              <h1 className="mt-3 text-[40px] leading-[1.1] font-bold text-[#101828] md:text-[52px]">
                Research &amp; Education
              </h1>
              <p className="font-ui mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.8] text-[#4a5565]">
                Ethics oversight, safety monitoring, education programs, and quality documentation — in one
                place for institutional transparency (placeholder).
              </p>

              <InPageScrollNav
                items={[
                  { label: "Ethics", targetId: "governance" },
                  { label: "Highlights", targetId: "highlights" },
                  { label: "CME", targetId: "cme" },
                  { label: "Quality", targetId: "quality" },
                  { label: "Enquiries", targetId: "research-enquiries" },
                ]}
                className="font-ui mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#4a5565]"
                itemClassName="rounded-full border border-[#a7e9e3] bg-white px-4 py-2 transition hover:border-[#1f948e] hover:text-[#1f948e]"
                separatorClassName="text-[#d1d5db]"
              />
            </div>
          </div>
        </section>

        <section id="governance" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <SectionTitle
              title="Governance & Ethics"
              subtitle="Committee structures that support responsible conduct of research and learning (placeholder)."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {committees.map((c) => (
                <article
                  key={c.title}
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

        <section
          id="highlights"
          className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20"
        >
          <div className={wrapperClass}>
            <SectionTitle
              title="Research Highlights"
              subtitle="Publications and education programs (placeholder entries until client shares links)."
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
                <p className="font-ui mt-5 text-[13px] text-[#9ca3af]">View all publications — coming soon</p>
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

        <section id="cme" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <SectionTitle
              title="Continuing Medical Education & Training"
              subtitle="Program outlines are placeholders until schedules and eligibility are finalized."
            />
            <div className="space-y-3">
              {cmeItems.map((item) => (
                <details
                  key={item.title}
                  className="rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(16,24,40,0.06)]"
                >
                  <summary className="cursor-pointer list-none text-[16px] font-semibold text-[#101828] md:text-[17px]">
                    {item.title}
                  </summary>
                  <div className="mt-4 border-t border-[#f0f1f3] pt-4">
                    <p className="font-ui text-[14px] leading-[1.7] text-[#4a5565]">{item.description}</p>
                    <p className="font-ui mt-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                      Who it is for (placeholder)
                    </p>
                    <ul className="font-ui mt-1 list-disc space-y-1 pl-5 text-[13px] text-[#4a5565]">
                      {item.whoFor.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="quality"
          className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20"
        >
          <div className={wrapperClass}>
            <div className="rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-8 py-10 md:px-12">
              <h2 className="text-[28px] font-bold text-[#101828] md:text-[34px]">
                Quality control &amp; safety documentation
              </h2>
              <p className="font-ui mt-3 max-w-[800px] text-[15px] leading-[1.8] text-[#4a5565]">
                We maintain documentation practices for quality control and MSDS alignment where applicable.
                Specific downloadable files will be listed here when approved for publication (placeholder).
              </p>
              <ul className="font-ui mt-6 list-disc space-y-2 pl-5 text-[14px] text-[#4a5565]">
                <li>Analytical QC summaries — document library coming soon</li>
                <li>MSDS repository — links to be added when available</li>
                <li>SOP references — to be coordinated with administration</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="research-enquiries" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[640px] rounded-2xl border border-[#e5e7eb] bg-white px-8 py-10 text-center shadow-[0_2px_8px_rgba(16,24,40,0.06)]">
              <h2 className="text-[26px] font-bold text-[#101828]">Research enquiries</h2>
              <p className="font-ui mt-3 text-[15px] leading-[1.8] text-[#4a5565]">
                For collaborations, CME, and research enquiries, contact details and application forms will be
                published here (placeholder).
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
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
