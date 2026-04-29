# Abhinav School UI Documentation Index

This index is aligned with the current codebase state.

## Core Documents

- `design.md`  
  Master system doc: architecture, page map, positioning rules, scaling strategy.

- `globalstokens.md`  
  Active global token reference from `website/src/app/globals.css`.

- `typographyclasses .md`  
  Typography and layout utility classes currently used in production.

- `componentclasses.md`  
  Component class standards for buttons, cards, forms, and section surfaces.

## Header + Hero Units

- `04 header desktopm.md`  
  Desktop header behavior and acceptance criteria from `website/src/components/Header.js`.

- `05 headermobile.md`  
  Mobile menu behavior mapped to current UI and screenshot state.

- `06 home hero .md`  
  Home hero implementation (`PageHero`) and slideshow/readability standards.

## Execution Order (Recommended)

1. `design.md`
2. `globalstokens.md`
3. `typographyclasses .md`
4. `componentclasses.md`
5. `04 header desktopm.md`
6. `05 headermobile.md`
7. `06 home hero .md`

## Implementation Workflow

For each iteration:

1. Choose one target section/page.
2. Follow corresponding doc acceptance criteria.
3. Implement in code.
4. Run lint and visual QA (desktop + mobile).
5. Update doc status notes after merge.
