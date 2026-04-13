"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type NavItem = { href: string; label: string };

type Props = {
  brandName?: string;
  navItems: NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

const careMenuItems: NavItem[] = [
  { href: "/care?section=cancer-care", label: "Cancer Care" },
  { href: "/care?section=neuro-care", label: "Neurological Care" },
  { href: "/care?section=cardiac-care", label: "Cardiac Care" },
  { href: "/care?section=respiratory-care", label: "Respiratory Care" },
  { href: "/care?section=womens-care", label: "Women's Care" },
  { href: "/care?section=pediatric-care", label: "Pediatric Care" },
  { href: "/care?section=skin-hair-care", label: "Skin & Hair Care" },
  { href: "/care?section=digestive-care", label: "Digestive Care" },
  { href: "/care?section=endocrinology-care", label: "Endocrinology Care" },
  { href: "/care?section=musculoskeletal-care", label: "Musculoskeletal Care" },
  { href: "/care?section=other-services", label: "Other Services" },
];

const wellnessMenuItems: NavItem[] = [
  { href: "/treatments?section=panchakarma", label: "Panchakarma" },
  { href: "/treatments?section=acupuncture", label: "Acupuncture" },
  { href: "/treatments?section=cupping", label: "Cupping Therapy" },
  { href: "/treatments?section=yoga-therapy", label: "Yoga Therapy" },
  { href: "/treatments?section=kalari-marma", label: "Kalari Marma Therapy" },
  { href: "/treatments?section=integrated-care", label: "Integrated Healthcare" },
];

export function SiteHeader({
  brandName = "Saukhyabharathi",
  navItems,
  ctaHref,
  ctaLabel,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const withDirectRoutes = navItems.map((item) => {
    if (item.label === "Care") return { ...item, href: "/care" };
    if (item.label === "Wellness") return { ...item, href: "/treatments" };
    return item;
  });

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-[68px] w-[min(1440px,calc(100%-36px))] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-[#1f948e]">
            <Image
              src="/images/logo.png"
              alt="Saukhyabharathi logo"
              fill
              className="scale-125 object-contain"
              sizes="40px"
              priority
            />
          </span>
          <span className="text-[28px] leading-none font-bold tracking-[0.1px] text-[#101828] whitespace-nowrap xl:text-[32px]">
            {brandName}
          </span>
        </Link>

        <nav className="font-ui hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          {withDirectRoutes.map((item) => {
            const menuItems =
              item.label === "Care"
                ? careMenuItems
                : item.label === "Wellness"
                  ? wellnessMenuItems
                  : null;
            if (!menuItems) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[15px] text-[#4a5565] hover:text-[#101828]"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <div key={item.label} className="group relative flex items-center gap-1">
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[15px] text-[#4a5565] hover:text-[#101828]"
                >
                  {item.label}
                </a>
                <span className="text-[11px] text-[#4a5565]">▾</span>
                <div className="pointer-events-none invisible absolute top-[42px] left-0 z-40 min-w-[248px] rounded-xl border border-[#e5e7eb] bg-white p-2 opacity-0 shadow-[0_10px_28px_rgba(16,24,40,0.14)] transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                  {menuItems.map((menuItem) => (
                    <a
                      key={menuItem.href}
                      href={menuItem.href}
                      className="block rounded-lg px-3 py-2 text-[14px] text-[#4a5565] hover:bg-[#f0fffe] hover:text-[#101828]"
                    >
                      {menuItem.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="flex min-h-[44px] min-w-[44px] cursor-pointer flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-2 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-[2px] w-6 rounded bg-[#101828] transition ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 rounded bg-[#101828] transition ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-6 rounded bg-[#101828] transition ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        <a
          href={ctaHref}
          className="font-ui hidden h-10 min-w-[170px] items-center justify-center rounded-full bg-[#1f948e] px-5 text-[15px] font-bold text-white transition hover:brightness-95 lg:inline-flex"
        >
          {ctaLabel}
        </a>
      </div>

      {mobileOpen ? (
        <nav className="font-ui flex flex-col gap-4 border-t border-[#e5e7eb] bg-white px-6 py-5 lg:hidden">
          {withDirectRoutes.map((item) => {
            const menuItems =
              item.label === "Care"
                ? careMenuItems
                : item.label === "Wellness"
                  ? wellnessMenuItems
                  : null;
            return (
              <div key={item.label} className="border-b border-[#f0f1f3] pb-2 last:border-b-0">
                <a
                  href={item.href}
                  className="block py-2 text-[16px] text-[#4a5565]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
                {menuItems ? (
                  <div className="ml-3 mt-1 space-y-1">
                    {menuItems.map((menuItem) => (
                      <a
                        key={menuItem.href}
                        href={menuItem.href}
                        className="block py-1 text-[14px] text-[#5b6571]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {menuItem.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <a
            href={ctaHref}
            className="mt-2 rounded-full bg-[#1f948e] px-5 py-3 text-center text-[15px] font-bold text-white"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

