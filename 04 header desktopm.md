# Unit 04 — Header Desktop Specification

Implementation file: `website/src/components/Header.js`

## Current Desktop Structure

- Sticky wrapper: `sticky top-0 z-50`
- Scroll compaction:
  - default: `bg-white py-4`
  - scrolled: `bg-white border-b border-slate-200 py-2`
- Left block:
  - logo icon tile
  - `orgName` + `schoolName` from language context
- Center-right:
  - nav links (desktop only: `lg:flex`)
  - About dropdown with two subroutes:
    - `/about`
    - `/vision-mission`
- Far right:
  - language switcher
  - `Apply Now` button linking to `/admissions`

## Desktop Acceptance Criteria

1. Header remains sticky and does not jitter on scroll.
2. Active route is clearly highlighted (`text-primary`).
3. About dropdown opens/closes reliably and closes on outside click.
4. CTA remains visible at desktop breakpoints.
5. Nav alignment stays single-row on `lg` and above.

## Design Refinement Targets (Next Iteration)

- Increase desktop nav spacing consistency (`gap` and link padding harmony).
- Add subtle dropdown elevation for hierarchy clarity.
- Improve active state contrast for accessibility under bright displays.

## QA Checklist

- Test on `/`, `/about`, `/events`, `/gallery`.
- Confirm dropdown closes when clicking outside.
- Confirm sticky behavior from top to deep scroll.
- Confirm no wrapping of desktop nav around 1024px widths.