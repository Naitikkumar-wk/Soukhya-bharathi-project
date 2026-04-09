import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/#research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/#stories", label: "Stories" },
  { href: "/appointment", label: "Appointment" },
];

const values = [
  {
    title: "Patient dignity",
    text: "Care decisions are discussed with respect for autonomy, privacy, and cultural context (placeholder).",
  },
  {
    title: "Evidence-informed practice",
    text: "Clinical and educational activities align with documented protocols and ongoing learning (placeholder).",
  },
  {
    title: "Integrity & transparency",
    text: "Clear communication about scope of services, limitations, and pathways for escalation when appropriate (placeholder).",
  },
  {
    title: "Collaboration",
    text: "Coordination across specialties and with external providers when it supports safer, clearer care (placeholder).",
  },
];

const teamPlaceholders = [
  { id: "1", label: "Clinical leadership" },
  { id: "2", label: "Ayurvedic physicians" },
  { id: "3", label: "Education & research" },
  { id: "4", label: "Operations & quality" },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        {/* Hero — stock photo + wash; replace file in /public/images/ if needed */}
        <section className="relative overflow-hidden border-b border-[#e5e7eb]">
          <div className="pointer-events-none absolute inset-0 min-h-[380px] md:min-h-[440px]">
            <Image
              src="/images/about-hero.jpg"
              alt=""
              fill
              className="object-cover object-[center_35%]"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#f0fffe]/94 via-white/88 to-[#f0fffe]/93"
              aria-hidden
            />
            <div className="absolute inset-0 bg-[#1f948e]/[0.08]" aria-hidden />
          </div>
          <div className={`relative ${wrapperClass} py-14 md:py-20`}>
            <div className="mx-auto max-w-[880px] text-center">
              <p className="font-ui text-[13px] font-bold uppercase tracking-[0.12em] text-[#1f948e]">
                About SBH
              </p>
              <h1 className="mt-3 text-[40px] leading-[1.1] font-bold text-[#101828] md:text-[52px]">
                Soukhya Bharathi
              </h1>
              <p className="font-ui mx-auto mt-4 max-w-[640px] text-[16px] leading-[1.8] text-[#4a5565]">
                An institutional overview of who we are, what guides our work, and how we organize care,
                education, and quality (placeholder copy — replace with client-approved text).
              </p>
              <nav
                aria-label="On this page"
                className="font-ui mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#4a5565]"
              >
                <a
                  href="#philosophy"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Philosophy
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#mission"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Mission
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#values"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Values
                </a>
                <span className="text-[#d1d5db]">·</span>
                <a
                  href="#team"
                  className="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                >
                  Team
                </a>
              </nav>
            </div>
          </div>
        </section>

        <section id="philosophy" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Philosophy</h2>
              <p className="font-ui mt-4 text-[15px] leading-[1.85] text-[#4a5565]">
                Soukhya Bharathi is grounded in classical Ayurvedic principles applied within modern clinical
                and educational frameworks. We hold that sustainable wellness arises from alignment of diet,
                daily rhythm, therapies, and mind–body practices — always under appropriate medical oversight
                where indicated (placeholder).
              </p>
              <p className="font-ui mt-4 text-[15px] leading-[1.85] text-[#4a5565]">
                Our philosophy emphasizes continuity of care, transparent communication, and humility in
                describing what integrative approaches may support, without overstating outcomes (placeholder).
              </p>
            </div>
          </div>
        </section>

        <section id="mission" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
              <div className="relative h-[240px] w-full max-w-[520px] overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(16,24,40,0.12)] sm:h-[280px] lg:h-[320px] lg:w-[min(420px,42%)] lg:max-w-none lg:shrink-0">
                <Image
                  src="/images/about-accent.jpg"
                  alt="Team collaborating at a table"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 520px, 420px"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Mission</h2>
                <p className="font-ui mt-4 text-[15px] leading-[1.85] text-[#4a5565]">
                  To deliver responsible, patient-centered Ayurvedic and integrative services; to advance
                  education and research under institutional ethics and quality systems; and to contribute
                  to the community through clear information and accountable operations (placeholder).
                </p>
                <p className="font-ui mt-4 text-[15px] leading-[1.85] text-[#4a5565]">
                  This mission is reviewed and refined with leadership and will be updated when the
                  organization publishes its formal charter (placeholder).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Values</h2>
              <p className="font-ui mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.7] text-[#4a5565]">
                Shared expectations that guide how we work with patients, families, and partners (placeholder).
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <article
                  key={v.title}
                  className="flex h-full flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                >
                  <h3 className="text-[18px] font-bold text-[#101828]">{v.title}</h3>
                  <p className="font-ui mt-3 flex-1 text-[14px] leading-[1.7] text-[#4a5565]">{v.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Team</h2>
              <p className="font-ui mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.7] text-[#4a5565]">
                Named profiles, photographs, and credentials will appear here after internal review and consent
                (placeholder).
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamPlaceholders.map((member) => (
                <article
                  key={member.id}
                  className="flex flex-col items-center rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                >
                  <div
                    className="h-[120px] w-[120px] rounded-full border-2 border-dashed border-[#a7e9e3] bg-[#f0fffe]"
                    aria-hidden
                  />
                  <p className="mt-5 text-[16px] font-bold text-[#101828]">Profile coming soon</p>
                  <p className="font-ui mt-1 text-[13px] text-[#4a5565]">{member.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#e5e7eb] bg-[#f0fffe] py-12">
          <div className={`${wrapperClass} text-center`}>
            <p className="font-ui mx-auto max-w-[520px] text-[15px] leading-[1.7] text-[#4a5565]">
              Return to programs, wellness therapies, or appointment booking anytime.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="font-ui inline-flex rounded-full border border-[#1f948e] bg-white px-6 py-2.5 text-[14px] font-bold text-[#1f948e] transition hover:bg-white/90"
              >
                Home
              </Link>
              <Link
                href="/care"
                className="font-ui inline-flex rounded-full bg-[#1f948e] px-6 py-2.5 text-[14px] font-bold text-white transition hover:brightness-95"
              >
                Care
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
