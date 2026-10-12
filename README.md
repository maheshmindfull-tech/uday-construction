# Uday Construction — Home Page (React + Tailwind CSS)

Vite + React 18 + Tailwind CSS 3.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Folder structure

```
uday-construction/
├── index.html                  Fonts (Cormorant Garamond, Manrope), page title
├── package.json
├── vite.config.js
├── tailwind.config.js          Colors (ink, night, brass, mist), fonts, max width
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   └── videos/                 Put hero.mp4 here (create the folder)
└── src/
    ├── main.jsx
    ├── App.jsx                 Page = sections in sketch order
    ├── index.css               Tailwind + small shared classes (.eyebrow, .section-title)
    ├── data/
    │   └── content.js          ALL text, numbers and image imports — edit here
    ├── components/
    │   ├── Header.jsx          Logo tab (top-left) + MENU button (top-right)
    │   ├── Hero.jsx            Video / poster
    │   ├── About.jsx           Building image + about text
    │   ├── Stats.jsx           Big number + 4 smaller numbers
    │   ├── Ticker.jsx          Continuous right-to-left moving marquee ribbon
    │   ├── CoreValues.jsx      3 values with vertical dividers
    │   ├── ImageBanner.jsx     Smaller full-width image banner
    │   ├── Projects.jsx        Headline, All projects button, 3 ongoing projects
    │   ├── Thoughts.jsx        Thoughts on real estate + legacy image
    │   ├── Testimonials.jsx    Testimonial over project image
    │   ├── ProjectGallery.jsx  Interactive gallery with categories and full-screen lightbox
    │   └── Footer.jsx
    └── assets/images/
        ├── logo.svg                 placeholder — replace with your real logo
        ├── hero-poster.svg          hero video poster / fallback image
        ├── about-architecture.svg   building architecture (portrait)
        ├── banner.svg               image banner (wide)
        ├── project-1.svg … project-3.svg
        ├── legacy.svg               legacy image
        └── testimonial-bg.svg       project image (coming soon)
```

## Replacing the placeholder images and video

1. Drop your real files into `src/assets/images/` (JPG, PNG, WebP or SVG).
2. Either keep the same file names, or change the `import` lines at the top of `src/data/content.js`.
3. Hero video: put `hero.mp4` in `public/videos/` and set `videoSrc: '/videos/hero.mp4'` in `content.js`. The play/pause button appears automatically once a video is set.
4. Client video testimonials:
   - Place your client video files (e.g. `client-1.mp4`, `client-2.mp4`) in `public/videos/`.
   - In `src/data/content.js`, set `videoSrc: '/videos/client-1.mp4'` for each testimonial item.
   - You can also customize client name, project location, quote, duration, and thumbnail poster.

Recommended image sizes: hero 1920×1080, about 840×1120, banner 1920×680, projects 720×760, legacy 920×1040, testimonial background 1920×1120.

## Placeholder content

The text, the 100,000+ figure and the four small numbers (00, 00, 00+, 0,000+) are placeholders. Replace them in `src/data/content.js`.
