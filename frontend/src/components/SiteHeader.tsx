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

export function SiteHeader({
  brandName = "Soukhya Bharathi",
  navItems,
  ctaHref,
  ctaLabel,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-[68px] w-[min(1440px,calc(100%-36px))] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-[#1f948e]">
            <Image
              src="/images/logo.png"
              alt="Soukhya Bharathi logo"
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
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[14px] text-[#4a5565] hover:text-[#101828]"
            >
              {item.label}
            </a>
          ))}
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
          className="font-ui hidden h-10 min-w-[160px] items-center justify-center rounded-full bg-[#1f948e] px-5 text-[14px] font-bold text-white transition hover:brightness-95 lg:inline-flex"
        >
          {ctaLabel}
        </a>
      </div>

      {mobileOpen ? (
        <nav className="font-ui flex flex-col gap-4 border-t border-[#e5e7eb] bg-white px-6 py-5 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="border-b border-[#f0f1f3] py-2 text-[15px] text-[#4a5565] last:border-b-0"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="mt-2 rounded-full bg-[#1f948e] px-5 py-3 text-center text-[14px] font-bold text-white"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

