import Image from "next/image";

type Props = {
  wrapperClass?: string;
};

export function SiteFooter({ wrapperClass = "mx-auto w-[min(1184px,calc(100%-48px))]" }: Props) {
  return (
    <footer id="contact" className="mt-20 bg-[#1f948e] pt-16 text-white/80">
      <div
        className={`${wrapperClass} grid grid-cols-1 gap-10 pb-8 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1.1fr]`}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-[#1f948e]">
              <Image src="/images/logo.png" alt="Soukhya Bharathi logo" width={28} height={28} />
            </span>
            <span className="text-[24px] font-bold text-white">Soukhya bharathi</span>
          </div>
          <p className="font-ui mt-3.5 mb-4.5 text-[14px]">
            Discover the ancient science of life. We provide authentic Ayurvedic treatments for a
            balanced and healthy lifestyle.
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Quick Links</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            <li>Home</li>
            <li>Care</li>
            <li>Treatments</li>
            <li>
              <a href="/research" className="text-white/80 underline-offset-2 hover:text-white hover:underline">
                Research &amp; Education
              </a>
            </li>
            <li>Success Stories</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Treatments</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            <li>Panchakarma</li>
            <li>Shirodhara</li>
            <li>Abhyanga Massage</li>
            <li>Herbal Therapy</li>
            <li>Yoga &amp; Meditation</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[16px] font-bold text-white">Visit Us</h4>
          <ul className="font-ui space-y-2.5 text-[14px]">
            <li>108 Lotus Valley Road, Kerala, India 682001</li>
            <li>+91 98765 43210</li>
            <li>namaste@ayurveda.wellness</li>
          </ul>
        </div>
      </div>
      <div
        className={`${wrapperClass} flex h-auto flex-col items-start justify-between gap-4 border-t border-white/15 py-4 text-[14px] text-white/60 md:h-[62px] md:flex-row md:items-center`}
      >
        <span>© 2026 Ayurveda Wellness. All rights reserved.</span>
        <div className="font-ui flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

