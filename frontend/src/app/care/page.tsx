"use client";

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
  { href: "/#appointment", label: "Appointment" },
];

const specialties = [
  { title: "Ayurveda & Modern Medicine Under Single Roof", anchor: "#integrated-care" },
  { title: "Cancer care and Surgical Oncology", anchor: "#cancer-care" },
  { title: "Neurological Care", anchor: "#neuro-care" },
  { title: "Cardiac Care", anchor: "#cardiac-care" },
  { title: "Respiratory Care", anchor: "#respiratory-care" },
  { title: "Women’s Care", anchor: "#womens-care" },
  { title: "Pediatric Care", anchor: "#pediatric-care" },
  { title: "Skin and Hair Care", anchor: "#skin-hair-care" },
  { title: "Digestive Care", anchor: "#digestive-care" },
  { title: "Endocrinology Care", anchor: "#endocrinology-care" },
  { title: "Musculoskeletal Care", anchor: "#musculoskeletal-care" },
  { title: "Other Services", anchor: "#other-services" },
];

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-11 text-center">
      <h2 className="text-[36px] leading-[1.1] font-bold text-[#101828] md:text-[42px]">{title}</h2>
      {subtitle ? (
        <p className="font-ui mx-auto mt-3 max-w-[720px] text-[16px] leading-[1.6] text-[#4a5565]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function CareCard({
  title,
  text,
  href,
  imageSrc,
  imageAlt,
}: {
  title: string;
  text: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition hover:shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
      <div className="relative h-[280px] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[28px] font-bold text-[#101828]">{title}</h3>
        <p className="font-ui mt-2 mb-5 text-[14px] leading-[1.6] text-[#4a5565]">{text}</p>
        <div className="font-ui">
          <a href={href} className="block border-b border-[#e5e7eb] py-2 text-[14px] font-medium text-[#1e3a8a]">
            View Details →
          </a>
        </div>
      </div>
    </article>
  );
}

function ProgramSection({
  id,
  title,
  subtitle,
  cards,
  background,
}: {
  id: string;
  title: string;
  subtitle: string;
  background?: "plain" | "muted";
  cards: Array<{
    title: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
  }>;
}) {
  return (
    <section id={id} className={background === "muted" ? "bg-[#f9fafb] py-20" : "py-20"}>
      <div className={wrapperClass}>
        <SectionHead title={title} subtitle={subtitle} />
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {cards.map((c) => (
            <CareCard
              key={c.title}
              title={c.title}
              text={c.text}
              href={c.href}
              imageSrc={c.imageSrc}
              imageAlt={c.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CarePage() {
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/#appointment" ctaLabel="Book Appointment" />

      <main>
        <section className="py-12 text-center">
          <div className={wrapperClass}>
            <h1 className="text-[44px] font-bold text-[#101828] md:text-[48px]">Care @ Saukhyabharathi</h1>
            <p className="font-ui mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.6] text-[#4a5565]">
              Specialized care programs designed for specific health conditions and life stages.
              Choose your care pathway and connect with our expert physicians.
            </p>
          </div>
        </section>

        {/* Wireframe-first: all specialties grid */}
        <section className="py-10">
          <div className={wrapperClass}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((s) => (
                <a
                  key={s.title}
                  href={s.anchor}
                  className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="text-[16px] font-bold text-[#101828]">{s.title}</div>
                  <div className="font-ui mt-1 text-[13px] text-[#4a5565]">Explore →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured detailed programs (matches your care.html style) */}
        <ProgramSection
          id="terminal-care"
          title="Terminal Illness Care Program"
          subtitle="Compassionate, integrated support for patients with serious long-term conditions"
          cards={[
            {
              title: "Patient Journey",
              text: "Understanding the path through diagnosis, treatment, and ongoing wellness management with our comprehensive care model.",
              imageSrc: "/images/care-terminal.webp",
              imageAlt: "Patient journey",
              href: "#",
            },
            {
              title: "Doctors",
              text: "Meet our specialists experienced in Terminal Illness Care with decades of compassionate practice and patient outcomes.",
              imageSrc: "/images/doctor.webp",
              imageAlt: "Care doctors",
              href: "/#about",
            },
            {
              title: "Testimonials",
              text: "Hear from patients and families whose lives have been transformed through our Terminal Illness Care program.",
              imageSrc: "/images/stories.webp",
              imageAlt: "Patient stories",
              href: "/#stories",
            },
            {
              title: "Book Appointment",
              text: "Begin your care journey with a personalized consultation. Our team will assess and create your wellness plan.",
              imageSrc: "/images/care-book.webp",
              imageAlt: "Book appointment",
              href: "/#appointment",
            },
          ]}
        />

        <ProgramSection
          id="neuro-care"
          title="Neuro Cognitive Care Program"
          subtitle="Specialized support for neurological and cognitive health with evidence-based Ayurvedic approaches"
          background="muted"
          cards={[
            {
              title: "Care Approach",
              text: "Our structured methodology combines classical Ayurvedic principles with modern understanding of neuro-cognitive wellness.",
              imageSrc: "/images/care-neuro.webp",
              imageAlt: "Care approach",
              href: "#",
            },
            {
              title: "Patient Stories",
              text: "Real cases of patients who have regained mental clarity, improved focus, and better cognitive function.",
              imageSrc: "/images/stories.webp",
              imageAlt: "Patient stories",
              href: "/#stories",
            },
            {
              title: "Doctors",
              text: "Our Neuro Cognitive Care specialists bring years of experience in neurological health and cognitive rehabilitation.",
              imageSrc: "/images/doctor.webp",
              imageAlt: "Specialists",
              href: "/#about",
            },
            {
              title: "Book Appointment",
              text: "Start with a cognitive assessment and personalized care plan. Our doctors will guide your wellness journey.",
              imageSrc: "/images/care-book.webp",
              imageAlt: "Book now",
              href: "/#appointment",
            },
          ]}
        />

        <section className="py-0">
          <div className={wrapperClass}>
            <div className="mx-auto my-14 rounded-lg border border-[#a7e9e3] bg-[#f0fffe] p-8 text-center">
              <h3 className="text-[24px] font-bold text-[#101828]">Ready to Begin Your Care Journey?</h3>
              <p className="font-ui mx-auto mt-3 mb-5 max-w-[720px] text-[14px] text-[#4a5565]">
                Choose a program and take the first step toward better health with our expert team.
              </p>
              <a
                href="/#appointment"
                className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-6 py-2.5 text-[14px] font-bold text-white"
              >
                Book Your Consultation
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}

