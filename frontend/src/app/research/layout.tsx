import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Education | Saukhyabharathi",
  description:
    "Governance and ethics oversight, research highlights, continuing education programs, and quality/MSDS documentation at Saukhyabharathi.",
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
