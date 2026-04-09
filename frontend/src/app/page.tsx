"use client";

import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";

const navItems: NavItem[] = [
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/#research", label: "Research" },
  { href: "/#about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
  { href: "/appointment", label: "Appointment" },
];

const careCards = [
  {
    src: "/images/care-terminal.webp",
    alt: "Terminal illness care",
    title: "Terminal Illness Care",
    text: "Patient journey, care-team doctors, and testimonial-backed support for long-term guidance.",
    href: "#",
    linkLabel: "View Program",
  },
  {
    src: "/images/care-neuro.webp",
    alt: "Neuro cognitive care",
    title: "Neuro Cognitive Care",
    text: "Structured care approach with patient stories, specialist doctors, and direct appointments.",
    href: "#",
    linkLabel: "View Program",
  },
  {
    src: "/images/care-book.webp",
    alt: "Book appointment",
    title: "Book Appointment",
    text: "Start with intake form, choose date and doctor, and continue through confirmation and follow-up.",
    href: "/appointment",
    linkLabel: "Start Booking",
  },
];

const wellnessCards = [
  {
    src: "/images/wellness-panchakarma.webp",
    alt: "Panchakarma treatment",
    title: "Panchakarma",
    text: "Clinical detox protocol with treatment benefits, process details, FAQs, and booking entry.",
    href: "/treatments#panchakarma",
    linkLabel: "View Details",
  },
  {
    src: "/images/wellness-acupuncture.webp",
    alt: "Acupuncture treatment",
    title: "Acupuncture",
    text: "Targeted pain and stress support with clear eligibility, treatment process, and follow-up steps.",
    href: "/treatments#acupuncture",
    linkLabel: "View Details",
  },
  {
    src: "/images/wellness-all.webp",
    alt: "Other therapeutic treatments",
    title: "All Treatment Details",
    text: "Cupping Therapy, Yoga Therapy, and Kalari Marma Therapy with structured detail sections.",
    href: "/treatments",
    linkLabel: "Explore Treatments",
  },
];

const researchCards = [
  {
    src: "/images/research-highlights.webp",
    alt: "Research highlights",
    title: "Research Highlights",
    text: "Publications, research outcomes, and education programs for trust and transparency.",
    href: "#",
    linkLabel: "View Research & Education",
  },
  {
    src: "/images/doctor.webp",
    alt: "Doctor team",
    title: "Doctors",
    text: "Meet specialists for Terminal Illness Care and Neuro Cognitive Care programs.",
    href: "#",
    linkLabel: "Meet Doctors",
  },
  {
    src: "/images/stories.webp",
    alt: "Patient stories",
    title: "Success Stories",
    text: "Video testimonials and written reviews from patient journeys across programs.",
    href: "/stories",
    linkLabel: "View Stories",
  },
];

const testimonials = [
  {
    text: "I felt a noticeable improvement in sleep and digestion within two weeks. The consultation was deeply personalized and practical.",
    name: "Aditya R",
  },
  {
    text: "The therapies were calming and professional. I now follow a daily routine that reduced stress and improved my focus at work.",
    name: "Neha M",
  },
  {
    text: "Excellent care and very knowledgeable doctors. The Panchakarma program helped me feel lighter, healthier, and more energetic.",
    name: "Rahul K",
  },
];

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-11 text-center">
      <h2 className="text-[36px] leading-[1.1] font-bold text-[#101828] md:text-[42px]">{title}</h2>
      {subtitle ? (
        <p className="font-ui mx-auto mt-3 max-w-[640px] text-[15px] text-[#4a5565]">{subtitle}</p>
      ) : null}
    </div>
  );
}

function ImageCard({
  src,
  alt,
  title,
  text,
  href,
  linkLabel,
}: {
  src: string;
  alt: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition hover:shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
      <div className="relative h-[255px] w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
      </div>
      <div className="p-6">
        <h3 className="text-[24px] font-bold text-[#101828]">{title}</h3>
        <p className="font-ui mt-2 mb-4 text-[14px] text-[#4a5565]">{text}</p>
        <a href={href} className="font-ui text-[14px] font-medium text-[#1e3a8a]">
          {linkLabel} →
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        <section id="about" className="relative flex min-h-[630px] items-center overflow-hidden text-white">
          <Image
            src="/images/home-hero.webp"
            alt="Soukhya Bharathi reception"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(179deg,rgba(1,73,69,0.8)_0.49%,rgba(255,255,255,0)_187.51%)]" />
          <div className="absolute inset-0 bg-black/25" />
          <div className={`relative ${wrapperClass}`}>
            <div className="max-w-[560px]">
              <p className="font-ui text-[14px] text-white/90">Authentic Ayurveda Care</p>
              <h1 className="mt-3 text-[clamp(36px,7vw,60px)] leading-[1.12] font-bold text-white">
                Restore Harmony in
                <br />
                Mind, Body &amp; Spirit
              </h1>
              <p className="font-ui mt-5 mb-8 max-w-[520px] text-[18px] leading-[1.55] text-white/90">
                Experience the ancient wisdom of Ayurveda through personalized consultations,
                natural therapies, and holistic wellness practices.
              </p>
              <div className="font-ui flex flex-wrap gap-3.5">
                <a
                  href="/treatments"
                  className="inline-flex items-center justify-center rounded-full bg-[#1f948e] px-6 py-[13px] text-[14px] font-bold text-white transition hover:brightness-95"
                >
                  Start Your Journey
                </a>
                <a
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white px-6 py-[13px] text-[14px] font-bold text-[#111]"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="care" className="py-20">
          <div className={wrapperClass}>
            <SectionTitle
              title="Care @ Saukhyabharathi"
              subtitle="Choose the right care pathway and move directly to doctors, stories, and appointment booking."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {careCards.map((card) => (
                <ImageCard key={card.title} {...card} />
              ))}
            </div>
            <p className="font-ui mt-5 text-center text-[14px] text-[#1e3a8a]">
              <a href="#">Explore all care sub-sections →</a>
            </p>
          </div>
        </section>

        <section id="treatments" className="py-20 pt-8">
          <div className={wrapperClass}>
            <SectionTitle title="Ayurveda & Wellness Treatments" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {wellnessCards.map((card) => (
                <ImageCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="py-20 pt-3">
          <div className={wrapperClass}>
            <SectionTitle title="Research & Education + Success Stories" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {researchCards.map((card) => (
                <ImageCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="pt-11 pb-20">
          <div className={wrapperClass}>
            <div className="mb-11 text-center">
              <h2 className="text-[36px] leading-[1.1] font-bold text-[#101828]">Testimonials</h2>
              <p className="mt-1 text-[20px] font-bold text-black">4.5 Rating based on 1560 reviews</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((review) => (
                <article
                  key={review.name}
                  className="flex min-h-[250px] flex-col justify-between rounded-2xl border border-white bg-[rgba(89,255,247,0.03)] p-[30px] shadow-[0_4px_6px_-1px_rgba(0,0,0,.1),0_2px_4px_-2px_rgba(0,0,0,.1)]"
                >
                  <p className="font-ui text-[16px]">{review.text}</p>
                  <div>
                    <div className="mb-2.5 text-[24px] tracking-[2px] text-[#fdce37]">
                      ★★★★<span className="text-[#d9d9d9]">★</span>
                    </div>
                    <div className="font-ui text-[16px] font-bold text-black">{review.name}</div>
                  </div>
                </article>
              ))}
            </div>
            <p className="font-ui mt-5 text-center text-[14px] text-[#1e3a8a]">
              <a href="/appointment">Book Appointment →</a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
