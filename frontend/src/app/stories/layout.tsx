import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Saukhyabharathi",
  description:
    "Video testimonials and written reviews from patient and caregiver experiences at Saukhyabharathi.",
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
