import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SBH | Soukhya Bharathi",
  description:
    "Philosophy, mission, values, and team at Soukhya Bharathi — integrative Ayurvedic care with institutional transparency.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
