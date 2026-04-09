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
    title: "Patient recovery journey (temporary)",
    subtitle: "General wellness and rehabilitation story",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=patient%20testimonial%20wellness%20recovery",
  },
  {
    title: "Family experience and care feedback (temporary)",
    subtitle: "Care quality and communication perspective",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=family%20caregiver%20testimonial%20healthcare",
  },
  {
    title: "Integrative care experience (temporary)",
    subtitle: "Lifestyle and therapy follow-up feedback",
    embedUrl:
      "https://www.youtube-nocookie.com/embed?listType=search&list=integrative%20medicine%20patient%20story",
  },
];

export const reviewItems: ReviewItem[] = [
  {
    text: "I felt a noticeable improvement in sleep and digestion within two weeks. The consultation was deeply personalized and practical.",
    name: "Aditya R",
  },
  {
    text: "The therapies were calming and professional. I now follow a daily routine that reduced stress and improved my focus at work.",
    name: "Neha M",
  },
  {
    text: "Excellent care and very knowledgeable doctors. The Panchakarma program helped me feel lighter, healthier, and more energetic.",
    name: "Rahul K",
  },
];
