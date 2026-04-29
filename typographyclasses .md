# Typography + Layout Classes

Source: `website/src/app/globals.css`

## Heading System

- `.heading-display`
  - Hero headline class
  - sizes: `3rem` base, `3.75rem` sm, `5.25rem` lg
- `.heading-section`
  - Section headline class
  - sizes: `1.875rem` base, `2.25rem` md, `3rem` lg
- `.heading-sub`
  - Card/sub-section title
  - sizes: `1.25rem` base, `1.5rem` md

## Body Text System

- `.body-large`
  - intro and supporting text near hero/section heading
- `.body-text`
  - standard paragraph text
- `.section-kicker`
  - capsule label above headings

## Layout Utility Classes

- `.section-container`: central width wrapper
- `.section-spacing`: section top/bottom rhythm
- `.section-panel`: bordered content panel with padding

## Usage Pattern

Use this sequence for any section:

1. `<section className="section-spacing">`
2. `<div className="section-container">`
3. optional kicker (`section-kicker`)
4. heading (`heading-section` or `heading-sub`)
5. body copy (`body-large` then `body-text`)

## Marathi Content Note

Where Marathi strings appear, confirm encoding is valid UTF-8 in source files.
If mojibake appears, fix file encoding before typography tweaks.

## QA

- No per-page arbitrary `text-[xx]` for primary headings.
- Headings and body text remain visually consistent across pages.
- Mobile (`<=767px`) heading readability remains intact.