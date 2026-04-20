import Image from "next/image";

type IntegratedCareModelSectionProps = {
  className?: string;
};

export function IntegratedCareModelSection({ className = "" }: IntegratedCareModelSectionProps) {
  return (
    <section
      id="integrated-care"
      className={`scroll-mt-28 rounded-2xl border border-[#a7e9e3] bg-[#f0fffe] px-6 py-10 sm:px-8 sm:py-12 ${className}`}
    >
      <div className="mb-10 text-center">
        <h2 className="text-[24px] font-bold text-[#101828] sm:text-[28px] md:text-[34px]">
          Ayurveda &amp; Modern Medicine Under One Roof
        </h2>
        <p className="font-ui mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.7] text-[#4a5565]">
          Our integrated care model combines the best of classical Ayurveda with evidence-based modern medicine
          for whole-person healing.
        </p>
      </div>
      <div className="mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-[#a7e9e3] bg-white p-3 shadow-[0_2px_8px_rgba(16,24,40,0.06)] sm:p-4">
        <Image
          src="/images/care-patient-process.png"
          alt="Integrated care model diagram"
          width={1024}
          height={571}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) min(100vw - 48px, 1100px), 1100px"
        />
      </div>
    </section>
  );
}
