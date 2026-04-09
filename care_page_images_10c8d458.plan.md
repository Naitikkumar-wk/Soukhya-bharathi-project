---
name: Care Page Images
overview: Add relevant Unsplash stock images to each specialty section using a two-column alternating layout (image + content), and configure Next.js to allow the Unsplash CDN domain.
todos:
  - id: nextconfig
    content: Add images.unsplash.com to remotePatterns in next.config.ts
    status: completed
  - id: data
    content: Add imageSrc and imageAlt fields to each specialty in the specialties array
    status: completed
  - id: component
    content: Update SpecialtySection to render a 2-column layout with alternating image side
    status: completed
isProject: false
---

# Add Images to Care Page Specialty Sections

## What changes

Two files need to be edited:

- [`frontend/next.config.ts`](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/next.config.ts) — add `images.unsplash.com` to `remotePatterns` so Next.js `<Image>` allows Unsplash CDN URLs
- [`frontend/src/app/care/page.tsx`](C:/Users/TECQNIO/Desktop/Soukhya-bharathi/frontend/src/app/care/page.tsx) — add `imageSrc` + `imageAlt` to each specialty, update `SpecialtySection` to a two-column layout

---

## Layout Change: Two-Column Alternating

Each specialty section becomes a 2-column block. Image side and content side alternate left/right:

```
Even sections (0, 2, 4...):
[ IMAGE (left) ]  |  [ Heading + chips + CTA (right) ]

Odd sections (1, 3, 5...):
[ Heading + chips + CTA (left) ]  |  [ IMAGE (right) ]
```

On mobile: image stacks on top, content below (always).

Image: `rounded-2xl`, `object-cover`, fixed height `h-[320px]`

---

## Image Map (all free Unsplash, no Plus required)

| Specialty | Unsplash Photo ID | Description |
|---|---|---|
| Cancer Care & Surgical Oncology | `1631558553280-fa082c260e15` | NCI — doctor with compassionate hand on patient's shoulder during consultation |
| Neurological Care | `1758691461973-553db5285280` | Doctor showing brain MRI scan on tablet to patient |
| Cardiac Care | `1628348070889-cb656235b4eb` | Cardiologist taking ECG/heart notes with stethoscope |
| Respiratory Care | `1576091160399-112ba8d25d1d` | Doctor with stethoscope, chest/lung examination |
| Women's Care | `1659353888906-adb3e0041693` | Female doctor in white coat — gynecology / women's health consult |
| Pediatric Care | `1758691463331-2ac00e6f676f` | Doctor examining young boy with his mother present |
| Skin & Hair Care | `1598300042247-d088f8ab3a91` | Close-up dermatology skin examination |
| Digestive Care | `1635773054018-3ed9e6f3fae7` | Doctor and patient in consultation — gastroenterology |
| Endocrinology Care | `1579684385127-1ef15d508118` | Nurse checking blood glucose — diabetes management |
| Musculoskeletal Care | `1544965502-1e3a95a1e8d2` | Physiotherapist treating patient's shoulder/joint |
| Other Services | `1584820927498-cfe5211fd8bf` | Home care nurse visiting elderly patient |

All URLs follow this format:
```
https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=800&q=80
```

---

## `next.config.ts` change needed

Add this so Next.js `<Image>` allows Unsplash CDN:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
},
```

---

## `SpecialtySection` component change

Add `imageSrc` and `imageAlt` props, add a 2-column grid wrapper:

```tsx
<section id={specialty.id} className={...}>
  <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center ${flipped ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <div className="relative h-[320px] overflow-hidden rounded-2xl">
      <Image src={specialty.imageSrc} alt={specialty.imageAlt} fill className="object-cover" />
    </div>
    <div>
      {/* existing heading + chips + CTA */}
    </div>
  </div>
</section>
```

`flipped` = `index % 2 !== 0` to alternate image side

---

## No new files, no deleted files