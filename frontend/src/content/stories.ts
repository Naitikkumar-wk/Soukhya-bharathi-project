export type VideoTestimonial = {
  title: string;
  subtitle: string;
  embedUrl: string;
};

export type ReviewItem = {
  text: string;
  name: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    title: "Healing journey — wellness and recovery",
    subtitle: "Illustrative embed; replace with Saukhyabharathi patient story",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=patient%20testimonial%20wellness%20recovery",
  },
  {
    title: "Family perspective on care",
    subtitle: "Illustrative embed; replace with approved caregiver testimonial",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=family%20caregiver%20testimonial%20healthcare",
  },
  {
    title: "Integrative medicine experience",
    subtitle: "Illustrative embed; replace with SBH integrative care video",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=integrative%20medicine%20patient%20story",
  },
];

export const reviewItems: ReviewItem[] = [
  {
    text: "Within two weeks my sleep and digestion felt steadier. The Saukhyabharathi team explained every step and tailored the plan to my work schedule.",
    name: "Aditya R.",
  },
  {
    text: "Calm, professional therapists and clear communication. The home routine they gave me cut down stress and helped me focus again.",
    name: "Neha M.",
  },
  {
    text: "Knowledgeable doctors across Ayurveda and modern medicine. Panchakarma left me lighter, more energetic, and confident about follow-up.",
    name: "Rahul K.",
  },
];
