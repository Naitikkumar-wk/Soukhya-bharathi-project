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
      "Supports ethical conduct for clinical care and research involving participants, in line with Saukhyabharathi policies and applicable regulations.",
    scope: [
      "Protocol and informed consent review",
      "Ongoing ethics oversight and documentation",
      "Guidance on reporting and escalation pathways",
    ],
  },
  {
    title: "Data Safety Monitoring Board",
    summary:
      "Where studies require it, an independent group reviews safety and outcome data to help identify signals early and support timely, careful decisions.",
    scope: [
      "Review of emerging safety signals",
      "Consideration of interim outcome data",
      "Recommendations on study continuation or modification",
    ],
  },
  {
    title: "Institutional Ethics Committee",
    summary:
      "Institutional ethics review and approvals, supporting sound documentation, investigator communication, and participant welfare.",
    scope: [
      "Initial submission and amendment review",
      "Support for compliance monitoring",
      "Documentation, correspondence, and periodic reporting",
    ],
  },
];

const publications = [
  {
    title: "Integrative oncology supportive care — clinical outcomes series",
    venue: "Peer-reviewed journal — citation to be linked",
    summary:
      "Summaries of structured supportive care alongside conventional oncology, with documentation and follow-up metrics from our programs.",
  },
  {
    title: "Case documentation and protocol adherence in integrative settings",
    venue: "Conference / journal — citation to be linked",
    summary:
      "How standardized case records and ethics workflows support reproducible clinical research at Saukhyabharathi.",
  },
  {
    title: "Education program outcomes — CME and internship reporting",
    venue: "Institutional report — year to be listed",
    summary:
      "Learning outcomes, attendance, and competency themes from our continuing education and training offerings.",
  },
];

const educationPrograms = [
  {
    title: "Foundations in integrative research literacy",
    audience: "Clinicians, residents, and clinical trainees",
    duration: "Schedule via academic office",
    summary:
      "Ethics awareness, documentation standards, and how clinical teams collaborate with research and quality functions.",
  },
  {
    title: "Workshop series — evidence context for classical therapies",
    audience: "Multi-disciplinary clinical teams",
    duration: "Schedule via academic office",
    summary:
      "Translating bedside experience into clear study questions, feasible designs, and responsible reporting.",
  },
  {
    title: "Seminar — quality systems for herbomineral formulations",
    audience: "Pharmacy, manufacturing, and technical staff",
    duration: "Schedule via academic office",
    summary:
      "Traceability, batch records, safety sheets, and how documentation supports patient safety and audits.",
  },
];

const cmeItems = [
  {
    title: "Ayurveda Oncology Clinical Internship and Training",
    description:
      "Supervised clinical exposure in integrative oncology settings, with clear learning objectives and competency checkpoints. Enrollment is subject to eligibility and capacity.",
    whoFor: ["Residents and fellows", "Licensed clinicians in related specialties"],
  },
  {
    title: "Thesis and Project Guidance and Assistance",
    description:
      "Mentoring for theses and research projects: topic refinement, documentation, ethics readiness, and alignment with institutional requirements.",
    whoFor: ["Students and researchers", "Institutional affiliates"],
  },
  {
    title: "Technical Assistance for Protocol development, Case Documentation and Report Publication",
    description:
      "Hands-on support for drafting protocols, maintaining case records, and preparing manuscripts or reports for ethical and scientific review.",
    whoFor: ["Principal investigators", "Study coordinators"],
  },
  {
    title: "Expert Guidance in preparation of Heavy metal and herbomineral based therapeutics",
    description:
      "Consultation on preparation workflows, batch documentation, and safety practices under institutional oversight and applicable standards.",
    whoFor: ["Manufacturing and pharmacy teams", "Clinical leads"],
  },
  {
    title: "Quality control of heavy metal and herbomineral based drugs with Material Safety Data Sheet",
    description:
      "Training and reference material on QC expectations, analytical summaries, and MSDS alignment. Downloadable resources will be listed as they are approved.",
    whoFor: ["QC personnel", "Regulatory liaisons"],
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
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

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
                Ethics oversight, safety monitoring, publications, continuing education, and quality
                documentation — how Saukhyabharathi supports responsible research and learning in the open.
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
              subtitle="Committees and boards that uphold ethical review, participant safety, and clear communication for investigators and trainees."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {committees.map((c) => (
                <article
                  key={c.title}
                  className="flex h-full flex-col rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                >
                  <h3 className="text-[22px] font-bold text-[#101828]">{c.title}</h3>
                  <p className="font-ui mt-3 flex-1 text-[15px] leading-[1.7] text-[#4a5565]">
                    {c.summary}
                  </p>
                  <div className="mt-5">
                    <p className="font-ui mb-2 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                      Scope
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
              subtitle="Selected publications and education highlights; full bibliographies and schedules are updated as they are approved for the website."
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
                      <p className="font-ui mt-2 text-[15px] leading-[1.65] text-[#4a5565]">{p.summary}</p>
                    </li>
                  ))}
                </ul>
                <p className="font-ui mt-5 text-[13px] text-[#9ca3af]">
                  Full publication list and DOI links — coming soon
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
                      <p className="font-ui mt-2 text-[15px] leading-[1.65] text-[#4a5565]">{prog.summary}</p>
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
              subtitle="Program outlines reflect our education roadmap; intake dates, batch size, and eligibility are confirmed with the academic office each season."
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
                    <p className="font-ui text-[15px] leading-[1.7] text-[#4a5565]">{item.description}</p>
                    <p className="font-ui mt-3 text-[11px] font-bold uppercase tracking-widest text-[#4a5565]">
                      Who it is for
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
                We maintain documentation for quality control and MSDS alignment where applicable to our
                formulations and processes. Downloadable summaries and repositories are listed here once
                approved for public release.
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
                For collaborations, CME, internships, and research enquiries, use the contact details in the
                site footer or book an appointment — dedicated application forms will be linked here when
                live.
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
