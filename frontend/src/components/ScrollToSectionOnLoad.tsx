"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  paramKey?: string;
};

export function ScrollToSectionOnLoad({ paramKey = "section" }: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const targetId = searchParams.get(paramKey);
    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
  }, [paramKey, searchParams]);

  return null;
}
