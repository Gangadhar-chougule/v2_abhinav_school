Project Memograph — Abhinav Special School Website
===============================================

This file summarizes the code areas, recent changes, and how to modify the hero and admissions UI.

1) Summary of Recent Changes
- PageHero component (website/src/components/PageHero.js) now accepts `image` as string or array.
- Homepage (website/src/app/page.js) uses an array of campus images for a slideshow hero.
- Admissions page (website/src/app/admissions/page.js) now uses the green ribbon hero (no image).
- CSS updates (website/src/app/globals.css): slideshow crossfade, tuned hero sizes, stronger overlay, pause-on-hover.

2) Key files and locations
- website/src/components/PageHero.js — hero component used across pages.
- website/src/app/globals.css — global styles for hero and slideshow.
- website/src/app/page.js — home page wiring for PageHero images.
- website/src/app/admissions/page.js — admissions form and hero usage.
- website/public/images/ — static images included in the repo.
- website/src/lib/imageUrls.js — helper map to resolve image names to Cloudinary or local public/images.

3) How to change hero behavior
- To make a page use the green ribbon hero: call <PageHero ... image={null} /> or omit `image`.
- To use a single image: <PageHero image={getImageUrl('name.jpg') || '/images/name.jpg'} />
- To use slideshow: <PageHero image={[ '/images/a.jpg', '/images/b.webp' ]} />

4) Tuning the slideshow
- CSS in globals.css controls animation timing; change `animation: heroCrossfade 18s` to shorten/lengthen cycles.
- Pause-on-hover is implemented; remove if you want continuous playback.

5) Build notes
- Use `cd website && npm install` then `npm run dev` for local development.
- For production build: `npm run build`. If you see prerender errors like "getImageUrl is not defined", ensure imports exist in pages that reference helpers.

6) Next steps
- Provide a prioritized list of UI items and I’ll implement them iteratively, each change followed by a build check and pushed commit.

Contact
- I made these changes and pushed to origin/main. For further changes, point to this memograph and give specific page/component/visual instructions.
