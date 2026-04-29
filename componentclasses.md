# Component Class Standards

Source: `website/src/app/globals.css`

## Buttons

- `.button-primary`
  - Primary action (Apply, Submit, Save)
- `.button-secondary`
  - Secondary action (Learn More, Cancel soft)
- `.button-accent`
  - Highlight CTA in dark sections

Guideline:
- Keep touch target comfortable (`py-3` on mobile menu CTA already applied in header).
- Do not create new button variants per page unless reused >= 3 times.

## Surfaces

- `.surface-card`
  - Default card container
- `.surface-card-strong`
  - Heavier emphasis for forms/important blocks
- `.section-panel`
  - Clean panel wrapper for grouped content

## Form Controls

- `.form-input`
- `.form-textarea`
- `.form-select`

Guideline:
- Use these classes everywhere (public forms + admin modals).
- Keep focus border behavior consistent with existing primary color.

## Hero Utilities

- `.hero-slideshow`, `.hero-slide`
- `.hero-animate`
- `.bg-hero-green`
- `.hero-admissions`, `.hero-facilities`

These classes are already tuned for readability and responsive behavior.

## Reveal + Interaction

- Scroll animation base: `.reveal-on-scroll` and `.is-visible`

Use `ScrollReveal` component instead of manual animation class combinations in page code.

## QA Checklist

- Primary/secondary/accent buttons look consistent across public and admin.
- Cards and panels have consistent radius/border language.
- Inputs/selects/textarea have matching visual style.
- No one-off inline styles replacing shared utility classes unnecessarily.