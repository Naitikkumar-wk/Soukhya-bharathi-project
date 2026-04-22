"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "sbh_cookie_consent";
const CONSENT_COOKIE = "sbh_cookie_consent";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type ConsentValue = "accepted" | "declined";

function readConsentFromCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "accepted" || value === "declined" ? value : null;
}

function persistConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_KEY, value);
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    const cookieValue = readConsentFromCookie();
    const current = saved ?? cookieValue;
    setVisible(current !== "accepted" && current !== "declined");
  }, []);

  const handleConsent = (value: ConsentValue) => {
    persistConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm md:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        className="w-full max-w-[560px] rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_34px_rgba(16,24,40,0.20)] md:p-6"
      >
        <h3 className="text-[22px] font-bold text-[#101828]">Cookie Preferences</h3>
        <p className="font-ui mt-2 text-[14px] leading-[1.65] text-[#4a5565]">
          We use cookies to improve your browsing experience and analyze site usage. Please accept or
          decline non-essential cookies to continue.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => handleConsent("declined")}
            className="font-ui inline-flex items-center justify-center rounded-full border border-[#e5e7eb] px-5 py-2.5 text-[13px] font-bold text-[#4a5565] transition hover:border-[#d1d5db] hover:text-[#101828]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="font-ui inline-flex items-center justify-center rounded-full bg-[#1f948e] px-5 py-2.5 text-[13px] font-bold text-white transition hover:brightness-95"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
