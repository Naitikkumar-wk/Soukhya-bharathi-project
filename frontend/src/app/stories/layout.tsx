import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Soukhya Bharathi",
  description:
    "Video testimonials and written reviews from patient and caregiver experiences at Soukhya Bharathi.",
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
