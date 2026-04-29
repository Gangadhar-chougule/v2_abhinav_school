# Unit 05 — Header Mobile Specification

Implementation file: `website/src/components/Header.js`

## Current Mobile Behavior (from code + screenshot)

- Mobile trigger shown on `lg:hidden`.
- Toggle icon switches `Menu` / `X`.
- Expanded panel:
  - rounded white container with subtle border
  - vertical link stack
  - bottom full-width `Apply Now` CTA (`button-primary mt-2 w-full py-3`)
- Active/selected row state:
  - `bg-slate-50 text-primary`

## Observed Match with Screenshot

The provided screenshot matches the current implementation pattern:
- stacked rows with gray active background
- strong green CTA at bottom
- spacing and row shape are visually close to final target

## Mobile Acceptance Criteria

1. Tap targets stay comfortable on phones (>= 44px visual height).
2. Menu opens/closes without layout jump.
3. Selecting a link closes the menu.
4. Active route is still clearly visible in the list.
5. CTA remains the final action in the panel.

## Next Refinement Suggestions

- Add explicit mobile active indicator (left border or icon marker).
- Add Escape-key close behavior for keyboard users.
- Optionally lock body scroll while menu is open.
- Improve top spacing between logo and panel for visual breathing.

## QA Checklist

- Test iPhone/Android widths (`360`, `390`, `412` px).
- Confirm no horizontal scrolling when menu open.
- Confirm CTA remains fully visible on short-height screens.
- Confirm menu closes on every nav click.