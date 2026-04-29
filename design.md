# Abhinav School UI System Documentation

This document is the implementation-focused design reference for this project.
It describes component identity, page composition, positioning rules, responsive behavior, and a scaling strategy for future UI work.

---

## 1) Technical Identity (Current Stack)

- Framework: Next.js App Router (`website/src/app`)
- UI: Tailwind utility classes + global style system in `website/src/app/globals.css`
- Shared layout wrappers: `Layout`, `Header`, `Footer`, `PageHero`, `ScrollReveal`
- Data-backed sections:
  - Public: `events`, `staff` pages now fetch API data
  - Admin: `admin/events`, `admin/staff` with local server file upload
- Image pipeline: local server storage only
  - Upload API: `website/src/app/api/upload/route.js`
  - Storage helper: `website/src/lib/localUploads.js`
  - Physical storage: `website/public/uploads/<section>`

---

## 2) Global Layout and Positioning System

### 2.1 Base Wrapping

- Main shell: `website/src/components/Layout.js`
  - `Header` (sticky)
  - `main.site-main` (page content)
  - `Footer`
  - `ScrollToTop`

### 2.2 Core Spacing + Width Tokens

- Container: `.section-container`
  - max width `72rem`, horizontal padding `1rem`
- Vertical section rhythm: `.section-spacing`
  - mobile: `5rem`
  - md: `6rem`
  - lg: `8rem`
- Cards:
  - `.surface-card` for normal content blocks
  - `.surface-card-strong` for elevated/high-priority blocks

### 2.3 Typography Scale

- Display title: `.heading-display`
- Section title: `.heading-section`
- Subsection title: `.heading-sub`
- Large paragraph: `.body-large`
- Body paragraph: `.body-text`
- Kicker badge: `.section-kicker`

Use these classes for consistency instead of ad-hoc font sizes.

---

## 3) Header and Mobile Menu (Based on Provided Screenshot)

### 3.1 Component

- File: `website/src/components/Header.js`
- Behavior:
  - Sticky top nav with scroll compaction
  - Desktop navigation + About dropdown
  - Mobile menu toggle with full list and CTA button

### 3.2 Screenshot-Mapped View (your menu image)

The screenshot corresponds to mobile expanded nav:
- Link stack inside bordered white panel
- Active/hover row background (`bg-slate-50`)
- Final full-width green CTA (`Apply Now`)

Rendered block in code:
- Mobile panel wrapper: `rounded border border-slate-200 bg-white p-2`
- Nav rows: `rounded px-4 py-3 text-sm font-medium`
- CTA: `button-primary mt-2 w-full py-3`

### 3.3 Menu Improvement Guidelines (for next iteration)

- Increase tap target to min `44px` height (already close, keep consistent)
- Add clearer active page contrast in mobile state
- Keep vertical spacing between rows at 8px visual rhythm
- Keep CTA pinned as final action in menu flow

---

## 4) Page-by-Page Component Map

### 4.1 Public Website

- Home (`website/src/app/page.js`)
  - `PageHero` slideshow
  - Stats strip
  - About split layout
  - Services cards
  - Activities highlight cards
  - CTA block

- About (`website/src/app/about/page.js`)
  - `PageHero`
  - narrative sections using shared typography/card classes

- Vision & Mission (`website/src/app/vision-mission/page.js`)
  - `PageHero`
  - mission/vision content blocks

- Admissions (`website/src/app/admissions/page.js`)
  - green hero ribbon
  - centered form surface (`surface-card-strong`)
  - form controls (`form-input`, `form-select`, `form-textarea`)

- Events (`website/src/app/events/page.js`)
  - now API-driven
  - list/grid of event cards with optional image, date, location, description

- Facilities (`website/src/app/facilities/page.js`)
  - `PageHero`
  - facility cards/content sections

- Staff (`website/src/app/staff/page.js`)
  - header image block
  - now API-driven staff table

- Gallery (`website/src/app/gallery/page.js`)
  - category filter chips
  - image grid + modal preview

- Contact (`website/src/app/contact/page.js`)
  - contact information and form-style interaction area

### 4.2 Admin

- Dashboard: `website/src/app/admin/dashboard/page.js`
- Events CRUD: `website/src/app/admin/events/page.js`
- Staff CRUD: `website/src/app/admin/staff/page.js`
- Admissions list: `website/src/app/admin/admissions/page.js`
- Login/Auth pages under `website/src/app/admin`

---

## 5) UI Positioning Rules (Project Standard)

- Always use `.section-container` for horizontal alignment.
- Use `.section-spacing` for top/bottom rhythm between sections.
- Keep hero content inside max-width wrapper (`max-w-3xl`/`max-w-[1000px]` patterns).
- Prefer `grid` + responsive breakpoints over manual margins for multi-column layouts.
- Use shared button classes:
  - `button-primary`
  - `button-secondary`
  - `button-accent`

Do not introduce new spacing/font systems per page unless design system is extended centrally.

---

## 6) Image Flow Documentation (Final, Current)

### 6.1 Upload and Storage

- Admin upload endpoint: `POST /api/upload?section=events|staff|gallery|site`
- Saves file under:
  - `/public/uploads/events`
  - `/public/uploads/staff`
  - etc.
- Returns browser path `/uploads/<section>/<filename>`

### 6.2 Data Use

- Events/staff APIs store returned `image` path in MongoDB records.
- Public pages consume that `image` path directly.
- On replace/delete, old local managed file is removed best-effort.

### 6.3 Static Marketing Images

- Shared static files remain in `/public/images`
- Resolver helper: `website/src/lib/imageUrls.js`
  - currently local fallback (`/images/<filename>`)

---

## 7) Unit Scaling Strategy (for future UI growth)

### 7.1 Spacing Scale

Use a fixed spacing sequence only:
- 4, 8, 12, 16, 24, 32, 48, 64 px

Map:
- micro UI gaps: 4-8
- form/control spacing: 12-16
- card internal spacing: 16-24
- section chunk gaps: 32-48
- major section rhythm: 64+

### 7.2 Typographic Scale

Keep existing class-based typography as source of truth.
If new sizes are needed, add once in `globals.css`, not inline repeatedly.

### 7.3 Breakpoint Behavior

- mobile-first default
- md: 2-column transitions
- lg: full desktop composition
- keep hero text sizes controlled on mobile (`@media (max-width: 767px)` already defined)

---

## 8) Priority Improvement Backlog (Recommended)

1. Header mobile menu polish:
   - stronger active highlight
   - tighter row spacing balance
   - optional subtle panel shadow
2. Convert admin `<img>` previews to optimized `next/image` where feasible.
3. Add visual loading skeletons for public `events` and `staff`.
4. Normalize Marathi text encoding in `staff` content source if any mojibake remains.
5. Add section-level design QA checklist per page before release.

---

## 9) Execution Checklist Per UI Iteration

For each page change:
1. Identify section + component name.
2. Confirm target classes (container, spacing, heading, card, button).
3. Apply responsive behavior at mobile/md/lg.
4. Validate with real content length and image aspect ratios.
5. Run lint and visual QA (desktop + mobile menu states).

This checklist should be followed for every design edit cycle to keep consistency across the whole site.

---

## 10) Iterative Delivery Plan (State-of-Art)

### Sprint A — Navigation Foundation

- Desktop header polish (`04 header desktopm.md`)
- Mobile menu polish (`05 headermobile.md`)
- Deliverables:
  - improved active states
  - menu accessibility refinements
  - consistent CTA behavior

### Sprint B — First Impression

- Home hero refinement (`06 home hero .md`)
- Deliverables:
  - improved slide control UX
  - stable readability under all hero images
  - responsive CTA alignment

### Sprint C — Design System Hardening

- Global/token/type/component docs sync
  - `globalstokens.md`
  - `typographyclasses .md`
  - `componentclasses.md`
- Deliverables:
  - no style drift across pages
  - clear class-level rules for all contributors

### Sprint D — Page-by-Page UI Scaling

Apply section standards to each page in order:
1. Home
2. About
3. Admissions
4. Events
5. Facilities
6. Staff
7. Gallery
8. Contact

For each page:
- inspect current structure
- map to standard layout/typography/component classes
- implement, lint, visual QA

### Sprint E — QA and Governance

- Documented acceptance tests per section
- Visual baseline screenshots (desktop/mobile)
- Final update to docs after each merged iteration
