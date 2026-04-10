---
name: Care Page UX Redesign
overview: Redesign the Care page information architecture so users can quickly find specialties and treatments while preserving the existing Soukhya Bharathi visual style.
todos:
  - id: define-ia
    content: Define final information architecture and group specialties into 3 user-friendly buckets.
    status: pending
  - id: content-normalization
    content: Normalize condition names, fix typos, and shorten section descriptions for scannability.
    status: pending
  - id: directory-ux
    content: Design sticky specialty directory with search and active-anchor behavior.
    status: pending
  - id: section-components
    content: Design accordion-based specialty sections with condition chips and repeated CTAs.
    status: pending
  - id: wellness-module
    content: Design therapy cards + integrated-care process + FAQ module.
    status: pending
  - id: conversion-accessibility
    content: Finalize CTA placements, accessibility checks, and mobile-first interaction behavior.
    status: pending
isProject: false
---

# Care Page UI Concept (User-Friendly + Brand-Matched)

## Design Goal
Create a scannable, conversion-focused `Care` page that handles many specialties without overwhelming users, while matching the current look in [frontend/src/app/page.tsx](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/src/app/page.tsx) and typography/colors in [frontend/src/app/globals.css](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/src/app/globals.css).

## Recommended Page Structure

1. **Hero + trust strip (above the fold)**
- Keep title: `Care @ Soukhya Bharathi`.
- Add 1-sentence value proposition: integrated Ayurveda + modern medicine.
- Add quick trust chips: `Expert Doctors`, `Integrated Care`, `Personalized Plans`, `Appointment Support`.
- Primary CTA: `Book Consultation`; secondary CTA: `Explore Specialties` (scroll to directory).

2. **Sticky specialty directory (key usability upgrade)**
- Replace the current plain grid links with grouped, searchable specialty pills/cards.
- Desktop: left sticky filter rail + right content.
- Mobile: horizontal chips + accordion sections.
- Group in 3 buckets for faster scanning:
  - **Medical Specialty Care** (Cancer, Neuro, Cardiac, Respiratory, Endocrinology, Digestive, Musculoskeletal)
  - **Life Stage & Wellness Care** (Women’s, Pediatric, Skin & Hair)
  - **Support Services** (Other Services)

3. **Specialty detail sections (accordion-style cards)**
- Each specialty section should include:
  - Section heading + short clinical promise
  - Condition list as bullet chips (readable, not long paragraphs)
  - `When to consult` micro-copy (2–3 lines)
  - CTA row: `Book Appointment`, `Talk to Care Team`
- Use expandable accordions so users can open only what they need.

4. **Integrated care explainer block (separate emphasis)**
- Add a dedicated section for `Ayurveda & Modern Medicine Under Single Roof`.
- Use a 3-step horizontal process card:
  1) Assessment
  2) Integrated treatment plan
  3) Follow-up + lifestyle protocol
- Add short FAQ accordion (3–5 FAQs).

5. **Wellness therapies module (second major section)**
- Title: `Ayurveda & Traditional Health Systems for Wellness`.
- Present therapies as visual cards in same existing card style:
  - Panchakarma, Acupuncture, Cupping, Yoga Therapy, Kalari Marma.
- Add per-card quick facts: best for / typical duration / consultation needed.

6. **Conversion footer band**
- Keep your current final CTA band style but make it stronger:
  - Add `Call now` and `WhatsApp` quick actions (if available).
  - Repeat top 3 benefits near CTA.

## Content Formatting Rules (important for readability)
- Convert every long raw list into **max 2-level structure**:
  - Specialty title
  - Condition chips/bullets
- Keep each condition label short and standardized:
  - Example: `Migraine` (fix typo), `ADHD` (fix typo), `Women’s Care` (apostrophe consistency).
- Use sentence-case section descriptions with 12–18 words each.

## Visual Language to Match Existing UI
- Reuse current tokens from [frontend/src/app/globals.css](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/src/app/globals.css): teal accents, serif display headings, soft gray backgrounds.
- Continue current component style from [frontend/src/app/care/page.tsx](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/src/app/care/page.tsx):
  - rounded corners (`rounded-2xl`)
  - subtle borders/shadows
  - clear hover feedback
- Add slight section alternation (`white` / `#f9fafb`) to reduce visual fatigue.

## Interaction/UX Details
- Add **anchor-aware active state** in directory while scrolling.
- Add **search input**: filter specialties and condition names.
- Use **accordion default collapsed** on mobile for easier navigation.
- Keep CTA visible every 2–3 sections to improve appointment conversion.

## Accessibility & Performance
- Maintain semantic heading order (`h1` then `h2` per section).
- Ensure contrast for teal links/buttons meets WCAG AA.
- Keep images in `webp`, lazy-load non-hero assets.
- Use concise alt text focused on care context.

## Suggested Content IA (from your provided list)
- `Care @ Soukhya Bharathi`
  - Integrated Care (Ayurveda + Modern)
  - Specialty Care Directory
    - Cancer & Surgical Oncology
    - Neurological
    - Cardiac
    - Respiratory
    - Women’s
    - Pediatric
    - Skin & Hair
    - Digestive
    - Endocrinology
    - Musculoskeletal
    - Other Services
- `Ayurveda & Traditional Health Systems for Wellness`
  - Panchakarma
  - Acupuncture
  - Cupping Therapy
  - Yoga Therapy
  - Kalari Marma Therapy
  - Integrated care benefits/process/FAQs

## Rollout Plan (low-risk)
1. Restructure page into data-driven sections.
2. Implement sticky directory + anchors.
3. Add specialty accordions and condition chips.
4. Add wellness therapy card grid + FAQ.
5. Polish copy and typo consistency.
6. Test mobile scroll, anchor jumps, and CTA flow.