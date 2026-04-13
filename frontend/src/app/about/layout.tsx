import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SBH | Saukhyabharathi",
  description:
    "Philosophy, mission, values, and team at Saukhyabharathi — integrative Ayurvedic care with institutional transparency.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
