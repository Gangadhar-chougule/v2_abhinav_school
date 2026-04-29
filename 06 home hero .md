# Unit 06 — Home Hero Specification

Current implementation:
- `website/src/components/PageHero.js`
- Home usage in `website/src/app/page.js`

## Current Behavior

- Home hero uses `PageHero` with slideshow via image array.
- Slide sources currently include:
  - `school-building.jpg`
  - `unnamed (11).webp`
- Overlay and readability improvements already implemented:
  - layered dark gradients
  - frosted content panel (`bg-black/35`, border, blur, shadow)
- CTA buttons inside hero:
  - Learn More (`/about`)
  - Contact Us (`/contact`)

## Visual/Positioning Rules

1. Hero keeps large visual impact (`size="large"`).
2. Text area stays constrained (`max-w-3xl`) to avoid over-stretching.
3. Overlay must preserve readability on both bright and dark images.
4. CTA buttons stay in first viewport on common laptop screens.

## Quality Targets

- Maintain legible white text on every slide.
- Avoid sudden brightness flicker during transition.
- Keep content panel padding balanced for mobile and desktop.
- Ensure hero does not push critical next-section content too far below fold.

## Next Iteration Options

- Add slide indicators for direct navigation.
- Add accessibility pause/play control for slideshow.
- Add localized CTA labels tuned for Marathi/English.

## QA Checklist

- Verify hero at `1366x768`, `1024x768`, `390x844`.
- Verify heading wraps cleanly and never overlaps CTA row.
- Verify both slides keep text contrast ratio acceptable.
- Verify no 404 in terminal for hero images.