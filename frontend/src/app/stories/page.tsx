import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { Suspense } from "react";
import { InPageScrollNav } from "@/components/InPageScrollNav";
import { ScrollToSectionOnLoad } from "@/components/ScrollToSectionOnLoad";
import { reviewItems, videoTestimonials } from "@/content/stories";

const wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/care", label: "Care" },
  { href: "/treatments", label: "Wellness" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About SBH" },
  { href: "/stories", label: "Stories" },
];

export default function StoriesPage() {
  return (
    <div className="bg-white text-[#4a5565]">
      <SiteHeader navItems={navItems} ctaHref="/appointment" ctaLabel="Book Appointment" />

      <main>
        <Suspense fallback={null}>
          <ScrollToSectionOnLoad />
        </Suspense>
        <section className="border-b border-[#e5e7eb] bg-[#f0fffe] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mx-auto max-w-[900px] text-center">
              <p className="font-ui text-[13px] font-bold uppercase tracking-[0.12em] text-[#1f948e]">
                Success Stories
              </p>
              <h1 className="mt-3 text-[40px] leading-[1.1] font-bold text-[#101828] md:text-[52px]">
                Patient Voices and Reviews
              </h1>
              <p className="font-ui mx-auto mt-4 max-w-[740px] text-[16px] leading-[1.8] text-[#4a5565]">
                Real patient and caregiver voices from Saukhyabharathi — integrative care, wellness
                therapies, and long-term follow-up. Video embeds below are illustrative until your
                approved recordings are linked.
              </p>
              <nav
                aria-label="On this page"
                className="font-ui mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#4a5565]"
              >
                <InPageScrollNav
                  items={[
                    { label: "Video Testimonials", targetId: "video-testimonials" },
                    { label: "Reviews", targetId: "reviews" },
                  ]}
                  className="flex flex-wrap items-center justify-center gap-2"
                  itemClassName="rounded-full border border-[#a7e9e3] bg-white px-4 py-2 transition hover:border-[#1f948e] hover:text-[#1f948e]"
                  separatorClassName="text-[#d1d5db]"
                />
              </nav>
            </div>
          </div>
        </section>

        <section id="video-testimonials" className="scroll-mt-28 py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-10 text-center">
              <h2 className="text-[34px] font-bold text-[#101828] md:text-[40px]">Video Testimonials</h2>
              <p className="font-ui mx-auto mt-3 max-w-[700px] text-[15px] leading-[1.7] text-[#4a5565]">
                Replace each video URL in <code className="rounded bg-[#f0fffe] px-1 py-0.5 text-[13px]">src/content/stories.ts</code> with
                Saukhyabharathi–approved testimonials when your media is ready.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videoTestimonials.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(16,24,40,0.06)]"
                >
                  <div className="relative aspect-video w-full bg-[#0b1f2a]">
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-bold text-[#101828]">{item.title}</h3>
                    <p className="font-ui mt-1 text-[15px] leading-[1.65] text-[#4a5565]">{item.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-28 border-t border-[#e5e7eb] bg-[#f9fafb] py-16 md:py-20">
          <div className={wrapperClass}>
            <div className="mb-11 text-center">
              <h2 className="text-[34px] leading-[1.1] font-bold text-[#101828] md:text-[40px]">Reviews</h2>
              <p className="font-ui mt-2 text-[15px] leading-[1.65] text-[#4a5565]">
                A sample of feedback we hear from patients and families. Names may use initials for privacy;
                expand this section with approved full stories and ratings as you collect them.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reviewItems.map((review) => (
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
            <p className="font-ui mt-6 text-center text-[14px] text-[#1e3a8a]">
              <a href="/appointment">Book Appointment →</a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter wrapperClass={wrapperClass} />
    </div>
  );
}
