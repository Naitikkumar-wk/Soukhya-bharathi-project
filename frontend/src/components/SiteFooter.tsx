import Image from "next/image";
import Link from "next/link";

type Props = {
  wrapperClass?: string;
};

const quickLinkClass =
  "text-white/80 underline-offset-2 transition hover:text-white hover:underline";

const iconClass = "mt-0.5 h-[18px] w-[18px] shrink-0 text-white/90";

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/** Matches wellness sections on `/treatments`; Shirodhara/Abhyanga anchor to Panchakarma as closest program content. */
const footerTreatmentLinks: { href: string; label: string }[] = [
  { href: "/treatments?section=panchakarma", label: "Panchakarma" },
  { href: "/treatments?section=panchakarma", label: "Shirodhara" },
  { href: "/treatments?section=panchakarma", label: "Abhyanga Massage" },
  { href: "/treatments?section=integrated-care", label: "Herbal Therapy" },
  { href: "/treatments?section=yoga-therapy", label: "Yoga & Meditation" },
];

export function SiteFooter({ wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]" }: Props) {
  return (
    <footer id="contact" className="mt-20 bg-[#1f948e] pt-16 text-white/80">
      <div
        className={`${wrapperClass} grid grid-cols-1 gap-10 pb-8 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1.1fr]`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#1f948e]">
              <Image
                src="/images/logo.png"
                alt="Saukhyabharathi logo"
                width={52}
                height={52}
                className="h-[52px] w-[52px] object-contain"
              />
            </span>
            <span className="text-[24px] font-bold text-white">Saukhyabharathi</span>
          </div>
          <p className="font-ui mt-3.5 mb-4.5 text-[14px]">
            Integrative Ayurveda and modern medicine under one roof — medical specialties, classical
            therapies, and wellness programs tailored to you.
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Quick Links</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            <li>
              <Link href="/" className={quickLinkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/care" className={quickLinkClass}>
                Care
              </Link>
            </li>
            <li>
              <Link href="/treatments" className={quickLinkClass}>
                Treatments
              </Link>
            </li>
            <li>
              <Link href="/research" className={quickLinkClass}>
                Research &amp; Education
              </Link>
            </li>
            <li>
              <Link href="/about" className={quickLinkClass}>
                About SBH
              </Link>
            </li>
            <li>
              <Link href="/stories" className={quickLinkClass}>
                Success Stories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Treatments</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            {footerTreatmentLinks.map((t) => (
              <li key={`${t.href}-${t.label}`}>
                <Link href={t.href} className={quickLinkClass}>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Visit Us</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            <li>
              <a
                href="https://maps.app.goo.gl/EZLmm7VTySGfyGFN9"
                target="_blank"
                rel="noopener noreferrer"
                className={`${quickLinkClass} inline-flex items-start gap-2.5`}
              >
                <IconMapPin className={iconClass} />
                <span>
                  1st Cross Road, Siddapura Rd, 1st Block, Jaya Nagar East, Jayanagar, Bengaluru,
                  Karnataka 560011
                </span>
              </a>
            </li>
            <li>
              <a href="tel:+919364087518" className={`${quickLinkClass} inline-flex items-start gap-2.5`}>
                <IconPhone className={iconClass} />
                <span>+91 93640 87518</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:sbh.hrmanager@gmail.com"
                className={`${quickLinkClass} inline-flex items-start gap-2.5 break-all`}
              >
                <IconMail className={iconClass} />
                <span>sbh.hrmanager@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${wrapperClass} flex h-auto flex-col items-start justify-between gap-4 border-t border-white/15 py-4 text-[14px] text-white/60 md:h-[62px] md:flex-row md:items-center`}
      >
        <span>© 2026 Saukhyabharathi. All rights reserved.</span>
        <div className="font-ui flex gap-4">
          <button type="button" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
            Privacy Policy
          </button>
          <button type="button" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
}

