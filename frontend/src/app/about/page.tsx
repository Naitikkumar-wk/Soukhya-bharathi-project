import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { InPageScrollNav } from "@/components/InPageScrollNav";
import { ScrollToSectionOnLoad } from "@/components/ScrollToSectionOnLoad";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];

const teamPlaceholders = [
  { id: "1", label: "Clinical leadership" },
  { id: "2", label: "Ayurvedic physicians" },
  { id: "3", label: "Education & research" },
  { id: "4", label: "Operations & quality" },
];

const sectionVisuals = {
  philosophy: {
    src: "/images/Holistic wellbeing Philosophy.png",
    alt: "Soukhya Bharathi philosophy visual card",
  },
  mission: {
    src: "/images/Ayurveda-inspired mission.png",
    alt: "Soukhya Bharathi mission visual card",
  },
  values: {
    src: "/images/Saukhyabharathi Valu.png",
    alt: "Soukhya Bharathi values visual card",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        <Suspense fallback={null}>
          <ScrollToSectionOnLoad />
        </Suspense>
        {/* Hero — stock photo + wash; replace file in /public/images/ if needed */}
        <section className="relative overflow-hidden border-b border-[#e5e7eb]">
          <div className="pointer-events-none absolute inset-0 min-h-[380px] md:min-h-[440px]">
            <Image
              src="/images/care-book.webp"
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
                SaukhyaBharathi brings Ayurvedic care together with modern clinical practice. Here you can
                see how we think about healing, how we run our services, and how we stay accountable to
                patients and the community.
              </p>
              <nav
                aria-label="On this page"
                className="font-ui mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#4a5565]"
              >
                <InPageScrollNav
                  items={[
                    { label: "Philosophy", targetId: "philosophy" },
                    { label: "Mission", targetId: "mission" },
                    { label: "Values", targetId: "values" },
                    { label: "Team", targetId: "team" },
                  ]}
                  className="flex flex-wrap items-center justify-center gap-2"
                  itemClassName="rounded-full border border-[#a7e9e3] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm transition hover:border-[#1f948e] hover:text-[#1f948e]"
                  separatorClassName="text-[#d1d5db]"
                />
              </nav>
            </div>
          </div>
        </section>

        <section id="philosophy" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Philosophy</h2>
            </div>
            <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_32px_rgba(16,24,40,0.12)]">
              <Image
                src={sectionVisuals.philosophy.src}
                alt={sectionVisuals.philosophy.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) min(100vw - 48px, 460px), 460px"
              />
            </div>
          </div>
        </section>

        <section id="mission" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Mission</h2>
            </div>
            <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_32px_rgba(16,24,40,0.12)]">
              <Image
                src={sectionVisuals.mission.src}
                alt={sectionVisuals.mission.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) min(100vw - 48px, 460px), 460px"
              />
            </div>
          </div>
        </section>

        <section id="values" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Values</h2>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_32px_rgba(16,24,40,0.12)]">
              <Image
                src={sectionVisuals.values.src}
                alt={sectionVisuals.values.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) min(100vw - 48px, 460px), 460px"
              />
            </div>
          </div>
        </section>

        <section id="team" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Team</h2>
              <p className="font-ui mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.7] text-[#4a5565]">
                Leadership profiles, photos, and credentials will be added here after internal review and
                consent. Explore our care and wellness pages or book a consultation to learn how we work today.
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
                  <p className="mt-5 text-[16px] font-bold text-[#101828]">Details coming soon</p>
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
