# Integration

No project files were uploaded (only the video), so this is a drop-in package. Merge it into your site:

1. Copy `assets/` into your site. If your video lives elsewhere, point the `<source src>` to it.
2. Include `assets/css/hero.css` and `assets/js/hero.js` (with `defer`).
3. On your existing hero markup add: `.hero`, `.hero__video`, `.hero__overlay`, `.hero__content`,
   and `.hero__title / .hero__sub / .hero__cta` with `class="reveal" style="--i:0|1|2"`.
   Add `.site-nav` to your navbar.
4. Give the section after the hero the class `.after-hero` (or copy its gradient and gold hairline).
5. Replace the placeholder copy in index.html with your real heading, subtitle and links. Routes are untouched.

Notes
- The original MP4 is unmodified. `hero-poster.jpg` is a still frame extracted from it (loading/fallback image).
- The video is about 7 MB. Consider also exporting a smaller mobile version (about 720p) and a .webm, then adding extra `<source>` tags.
- Scroll parallax uses native CSS scroll-driven animations; hero.js only adds a fallback for older browsers.

## Chaos layer (added)
- `assets/css/chaos.css` + `assets/js/chaos.js`: funny event cards, toasts, a dodging "Skip the registration fee" button, a "Walk the plank" button, and a "Do not press" button that ends in a page-sway mutiny.
- All motion is disabled under prefers-reduced-motion (toasts still work).
- Event names, descriptions, dates and prizes are jokes/placeholders. Swap in your real details.
- Suggested GitHub repo name: pirated-website
