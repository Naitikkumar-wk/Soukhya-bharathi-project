import Image from "next/image";
import Link from "next/link";

type Props = {
  wrapperClass?: string;
};

const quickLinkClass =
  "text-white/80 underline-offset-2 transition hover:text-white hover:underline";

export function SiteFooter({ wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]" }: Props) {
  return (
    <footer id="contact" className="mt-20 bg-[#1f948e] pt-16 text-white/80">
      <div
        className={`${wrapperClass} grid grid-cols-1 gap-10 pb-8 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1.1fr]`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-[#1f948e]">
              <Image src="/images/logo.png" alt="Saukhyabharathi logo" width={28} height={28} />
            </span>
            <span className="text-[24px] font-bold text-white">Saukhyabharathi</span>
          </div>
          <p className="font-ui mt-3.5 mb-4.5 text-[15px]">
            Integrative Ayurveda and modern medicine under one roof — medical specialties, classical
            therapies, and wellness programs tailored to you.
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Quick Links</h4>
          <ul className="font-ui space-y-2.5 text-[15px]">
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
          <ul className="font-ui space-y-2.5 text-[15px]">
            <li>Panchakarma</li>
            <li>Shirodhara</li>
            <li>Abhyanga Massage</li>
            <li>Herbal Therapy</li>
            <li>Yoga &amp; Meditation</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Visit Us</h4>
          <ul className="font-ui space-y-2.5 text-[15px]">
            <li>
              <a
                href="https://maps.app.goo.gl/EZLmm7VTySGfyGFN9"
                target="_blank"
                rel="noopener noreferrer"
                className={quickLinkClass}
              >
                1st Cross Road, Siddapura Rd, 1st Block, Jaya Nagar East, Jayanagar, Bengaluru,
                Karnataka 560011
              </a>
            </li>
            <li>+91 98765 43210</li>
            <li>care@saukhyabharathi.org</li>
          </ul>
        </div>
      </div>
      <div
        className={`${wrapperClass} flex h-auto flex-col items-start justify-between gap-4 border-t border-white/15 py-4 text-[15px] text-white/60 md:h-[62px] md:flex-row md:items-center`}
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

