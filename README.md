# Vinci · Be Invincible

B2B landing page for Vinci — קורסי חשיבה חיובית ומיינדסט למחלקות HR.

Hebrew (RTL) · React 18 + Vite · Tailwind CSS · Framer Motion.

## Features

- **Animated preloader** with the Vinci logo + mini-elephant peek
- **Scroll progress bar**, **custom cursor halo**, **parallaxed elephant orbs**
- **Hero** with word-by-word title reveal, scroll parallax, morphing pink halo
- **3D-tilt value cards** (cursor-tracked rotation)
- **Scroll-driven timeline** in "How it works"
- **ROI of Happiness™ calculator** — interactive sliders, spring-animated counters, bar chart
- **Auto-advancing testimonial carousel**
- **Magnetic CTA button** in the final conversion strip
- **Form with elephant-confetti success state**
- Full RTL layout, mobile-first responsive, `prefers-reduced-motion` aware

## Stack

| Tech | Why |
| --- | --- |
| React 18 + Vite | fast HMR, lean output |
| Tailwind CSS v3 + `tailwindcss-rtl` | logical-property RTL utilities |
| Framer Motion v11 | scroll-driven animations, springs, magnetic effects |
| Lucide React | icons |
| Fredoka (Google Fonts) | Hebrew + Latin display font |

## Getting started

```bash
npm install
npm run dev   # http://localhost:5180
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
public/
  logo.svg                      Brand logo (used in nav, preloader, footer)
  character/                    5 character poses (8K masters resized to ≤1400px)
    hero-peace.png              winking + peace sign — Hero
    pointing.png                denim, pointing — ValuePillars
    hoodie.png                  hoodie + finger up — HowItWorks + FinalCTA
    professor.png               lab coat + whiteboard — ROICalculator
    peeking.png                 peeking — Preloader + ContactForm
src/
  App.jsx                       composition + preloader gate
  index.css                     Tailwind + RTL + custom slider/shimmer styles
  lib/
    roi.js                      pure ROI heuristics + ILS formatters
  components/
    Preloader.jsx               animated logo entrance
    ScrollProgress.jsx          top progress bar
    CursorHalo.jsx              spring-followed cursor (desktop only)
    FloatingMascots.jsx         8 parallaxed elephant orbs
    ElephantSilhouette.jsx      inline SVG used by orbs + confetti
    BgPattern.jsx               flow / radial / dots / mesh variants
    Nav.jsx                     sticky blur nav, RTL drawer
    Hero.jsx                    title reveal + character + parallax
    TrustStrip.jsx              infinite logo marquee
    ValuePillars.jsx            3D-tilt cards
    HowItWorks.jsx              scroll-driven timeline
    ROICalculator.jsx           sliders + animated counters
    Testimonials.jsx            auto-advancing carousel
    FinalCTA.jsx                magnetic button strip
    ContactForm.jsx             validated form + confetti success
    Footer.jsx
```

## Customizing

- **Brand pink**: `tailwind.config.js` → `theme.extend.colors.brand.pink` (`#f2778a`)
- **Form submit**: wire `handleSubmit` in `src/components/ContactForm.jsx` to your CRM/Calendly endpoint (currently `console.log`s the lead).
- **ROI heuristics**: tune the constants in `src/lib/roi.js` if your benchmarks differ.
- **Optional Afarsek font**: drop `afarsek.woff2` into `public/fonts/` and the display font will activate (graceful fallback to Fredoka otherwise).

## License

© Vinci. All rights reserved.
