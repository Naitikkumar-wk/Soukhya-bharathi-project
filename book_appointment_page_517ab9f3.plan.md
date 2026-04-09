---
name: Book Appointment Page
overview: Build a new `/book` page — a 4-step appointment booking wizard that pulls all 11 specialties + 5 wellness therapies from the care page, lets the user pick a date and preferred time slot, and collects patient details before showing a confirmation screen.
todos:
  - id: create-book-page
    content: Create frontend/src/app/book/page.tsx with 4-step booking wizard (service selection, date/time, patient details, confirmation)
    status: pending
  - id: update-care-links
    content: Update all Book Appointment / Book a Session hrefs in care/page.tsx from /#appointment to /book
    status: pending
  - id: update-header-cta
    content: Update SiteHeader CTA href to /book in care/page.tsx and SiteHeader.tsx
    status: pending
isProject: false
---

# Book Appointment Page — Design Plan

## Route
New page at `frontend/src/app/book/page.tsx`

---

## Page Structure

### Header & Progress Bar
- Reuse `SiteHeader` with same nav items
- Sticky progress indicator below header showing:
  `Step 1 → Step 2 → Step 3 → Step 4` with labels (teal for current/done, grey for future)

---

## Step 1 — Choose a Service

**Layout:** Full-width grid of service cards

**Two groups, each with a section heading:**

**Specialties (11 cards)**
- Cancer Care & Surgical Oncology
- Neurological Care
- Cardiac Care
- Respiratory Care
- Women's Care
- Pediatric Care
- Skin & Hair Care
- Digestive Care
- Endocrinology Care
- Musculoskeletal Care
- Other Services

**Wellness Therapies (5 cards)**
- Panchakarma
- Acupuncture
- Cupping Therapy
- Yoga Therapy
- Kalari Marma Therapy

**Card design:** Icon + service name + short description; teal border + highlight on selected; 3 columns on desktop, 2 on tablet, 1 on mobile.

---

## Step 2 — Pick a Date & Preferred Time

**Left side — Calendar picker**
- Monthly grid calendar (custom-built with Tailwind, no heavy library)
- Disabled past dates, greyed out Sundays
- Selected date highlighted in teal

**Right side — Time Preference**
- 3 clickable cards (Morning / Afternoon / Evening) with icons and time range hints:
  - Morning: 8:00 AM – 12:00 PM
  - Afternoon: 12:00 PM – 4:00 PM
  - Evening: 4:00 PM – 7:00 PM
- Selected card fills with teal background

---

## Step 3 — Patient Details

Single-column form with clean labeled inputs:
- Full Name (text)
- Phone Number (tel)
- Age (number)
- Gender (radio: Male / Female / Other)
- Brief medical concern (textarea, max 300 chars)

All validation on submit. No email field (not requested).

---

## Step 4 — Confirmation

**Booking Summary card** (teal-bordered, light teal background):
- Service selected
- Date + Time preference
- Patient name, phone, age, gender
- Medical concern

**"Confirm Booking" button** — on click, transitions to a success state:
- Green checkmark animation
- "Your appointment request has been received. Our team will call you to confirm."
- "Book Another Appointment" link

---

## Design Language (matches existing site)
- Primary: `#1f948e` (teal), `#101828` (headings), `#4a5565` (body text)
- Background: white + `#f9fafb` alternating, `#f0fffe` teal tint
- Border: `#e5e7eb`, accent `#a7e9e3`
- Cards: `rounded-2xl`, `shadow-[0_2px_8px_rgba(16,24,40,0.06)]`
- Buttons: rounded-full, teal filled (primary) or teal outline (secondary)
- Font: existing `font-ui` utility class

---

## Navigation Between Steps
- "Next" button (teal, bottom-right) — disabled until selection made
- "Back" button (ghost/outline, bottom-left)
- Click on completed step in progress bar to go back
- State held in React `useState` (no external state library)

---

## Files to Create / Edit

- **Create:** `frontend/src/app/book/page.tsx` — full booking page
- **Edit:** `frontend/src/app/care/page.tsx` — update all `href="/#appointment"` links to `href="/book"` so every "Book Appointment" button on the care page routes here
- **Edit:** `frontend/src/components/SiteHeader.tsx` — update the CTA button href to `/book`
