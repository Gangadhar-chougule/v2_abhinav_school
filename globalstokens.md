# Global Tokens Reference

Source of truth: `website/src/app/globals.css`

## Color Tokens (HSL-based)

- `--primary`: `142 76% 36%` (brand green)
- `--secondary`: `217 91% 60%` (brand blue)
- `--accent`: `48 96% 53%` (brand yellow)
- `--foreground`: `222 47% 11%` (main text)
- `--muted-foreground`: `215 16% 47%` (secondary text)
- `--border` / `--input`: `214 32% 91%`
- `--destructive`: `0 84% 60%`

## Typography Tokens

- `--font-heading`: `'Poppins', system-ui, sans-serif`
- `--font-body`: `'Poppins', system-ui, sans-serif`

## Global Layout Tokens

- Standard content wrapper: `.section-container`
  - max width `72rem`
  - side padding `1rem`
- Standard vertical rhythm: `.section-spacing`
  - mobile `5rem`, md `6rem`, lg `8rem`

## Motion + Visual Tokens (Current)

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: currently disabled (`none`) in token layer
- Hero slide animation:
  - `.hero-slide` uses `heroCrossfade` with `18s linear infinite`

## Practical Rules

1. Reuse these tokens/classes, do not introduce new per-page color constants.
2. Keep section spacing consistent via `.section-spacing`.
3. If token changes are needed, apply in one place (`globals.css`) and test all pages.

## QA Check

- Header, hero, and primary buttons visually match green/blue/yellow palette.
- Body and heading fonts remain Poppins across all pages.
- Borders and form controls keep a unified subtle gray stroke.