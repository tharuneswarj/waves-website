# Waves Company - Website Project

## What This Is

A custom Next.js frontend for waves.company - a design and manufacturing studio creating algorithmically crafted lighting objects. The site connects to Shopify's Storefront API for commerce (products, cart, checkout). Everything else is custom.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, React Server Components)
- **Styling:** Tailwind CSS with custom config for brand system
- **Commerce:** Shopify Storefront API (GraphQL) - products, cart, checkout only
- **3D:** Three.js / React Three Fiber for product viewers and homepage animation
- **Animation:** Framer Motion for scroll reveals and page transitions
- **CMS:** Sanity.io for project case studies and editable content (or Shopify Metaobjects as fallback)
- **Hosting:** Vercel
- **Analytics:** Plausible (privacy-first, no cookie banners)

## Brand System - Always Follow These

### Colours (use CSS variables)

- `--blue: #134686` (primary anchor - headers, footers, hero sections)
- `--cream: #FDF4E3` (primary neutral - page backgrounds, body areas)
- `--coral: #ED3F27` (accent - CTAs, highlights, emphasis - use deliberately)
- `--yellow: #FEB21A` (micro accent - small icons, motion graphics - use sparingly)
- Hierarchy: 80% Blue+Cream, 15% Coral, 5% Yellow

### Typography (Google Fonts - DM family only)

- **DM Serif Display** - page titles, hero statements, section openers (48-80px)
- **DM Sans Light 300** - body copy (16-18px)
- **DM Sans Regular 400** - captions, labels, UI (12-14px)
- **DM Sans Medium 500** - subheadings, navigation (24-36px)
- **DM Mono Light 300** - technical specs, dimensions, metadata, print times (10-12px)
- Never mix in other typefaces. Never use DM Serif Display for body text. Never use DM Mono for headlines.

### Tailwind Config

Extend Tailwind with custom colour tokens, font families, and spacing. Map brand colours to semantic names: `primary` (blue), `surface` (cream), `accent` (coral), `highlight` (yellow).

## Site Structure

Full page-by-page spec is in `/docs/site-structure.md`. The site has 8 pages:

1. **Homepage** `/` - brand experience, forks into D2C and B2B paths
2. **Shop** `/shop` - product catalogue (Shopify data)
3. **Product Page** `/shop/[handle]` - product detail with 3D viewer, design story
4. **Studio** `/studio` - B2B portfolio and custom capabilities
5. **Project Case Study** `/studio/[slug]` - individual installation deep-dive
6. **Process** `/process` - how Waves works (the differentiator page)
7. **About** `/about` - origin story ("A printer, a gift, and a tilde")
8. **Contact** `/contact` - two paths: general enquiry + project brief form

## Key Architecture Decisions

- Homepage has two CTAs: "Explore the Collection" (D2C) and "View Our Work" (B2B)
- Product pages pull from Shopify Storefront API. Use GraphQL, not REST.
- Cart and checkout redirect to Shopify's hosted checkout
- Studio/project pages use CMS (Sanity or Shopify Metaobjects)
- Contact form: two modes - simple enquiry and structured project brief
- All images lazy-loaded. Use next/image for optimization.
- Responsive: mobile-first. Breakpoints at sm(640), md(768), lg(1024), xl(1280)

## Code Style

- TypeScript throughout
- Components in `/components`, pages in `/app`
- Use React Server Components by default, `'use client'` only when needed
- Tailwind for all styling - no CSS modules, no styled-components
- Framer Motion for animations - import only in client components
- Keep components small and composable
- Use semantic HTML (section, article, nav, header, footer, main)

## Reference Docs

Detailed brand and content documents are in `/docs/`:

- `brand-identity.md` - full colour, typography, and logo usage rules
- `tone-voice.md` - writing style, do's and don'ts, examples per channel
- `customer-profile.md` - three customer types and what they need
- `essence.md` - positioning, design language, what makes Waves different
- `origin-story.md` - three versions of the founding story (long/medium/short)
- `about.md` - company overview
- `site-structure.md` - complete page-by-page layout spec with sections and tech notes
- `progress-tracker.md` - current business state, products, pipeline

Reference these when writing copy, designing layouts, or making UX decisions.

## Design Principles

- The site should feel structured, calm, and intentional - like the products
- Generous whitespace. Breathing room between sections.
- Animations should be subtle and meaningful - scroll reveals, not flashy transitions
- Photography is primary. Let images do the heavy lifting.
- The homepage wave mark animation should feel alive but not distracting
- Mobile experience matters as much as desktop - many visitors come from Instagram/Pinterest
- Never feel like a generic Shopify store. This is a design studio website with commerce, not a shop with an about page.

# ─── Add this section to the bottom of the existing CLAUDE.md ───

## Updates Workflow

When the user says **"check updates"**, read `updates.md` in the repo root and execute changes in this order:

1. Read the full `updates.md` file
2. Check the *Status* line at the top - skip if it says COMPLETE
3. Work through **P0** items first, then **P1**, then **P2**
4. For each item:
   - Read the specified files
   - Make the exact changes described
   - If copy/content is provided verbatim, use it exactly as written (the founder has already approved it)
   - If a change is blocked (e.g., needs an image file that isn't in `/public` yet), skip it and note why
5. After completing each item, move it to the **Completed** section with today's date
6. After all items are done, change the Status line to `COMPLETE`
7. Commit with message: `fix: website updates from [date] review`

### Rules:
- Never invent copy or content - if the updates.md doesn't include the exact text, ask for it
- Never skip a P0 item unless it's explicitly blocked
- If something is ambiguous, check `/docs/` brand documents for guidance
- If a change touches the brand voice or customer-facing copy, reference `/docs/tone-voice.md`
- After making changes, run `npm run build` to verify nothing is broken

## Asset Checklist

`todo-assets.md` in the repo root lists all missing images, 3D models, and video files with exact filenames and locations. When implementing code that references these assets:

- Check if the file exists in `/public/` first
- If it exists, use it with `next/image` (proper width, height, alt text)
- If it doesn't exist, use the `PlaceholderImage` component as fallback
- When the founder says "I added the [asset name] photos", check `/public/` and swap PlaceholderImage components for real Image components

## Shopify Metafield Scripts

When `updates.md` includes a Shopify metafield script:
- Create the script file as specified
- Require `SHOPIFY_ADMIN_TOKEN` from `.env.local`
- Make scripts idempotent (safe to run multiple times)
- Run the script and verify the data appears in Shopify Admin

# CLAUDE.md Addendum - UI Elevation Branch

*Add this section to the bottom of CLAUDE.md when working on the `ui-elevation` branch*

---

## UI Elevation: Frosted Glass System

### Concept

"Light through glass" - the website UI mirrors the product (light passing through translucent 3D printed shades). Selective glassmorphism applied to interactive elements. Not every element gets glass - only cards, buttons, nav, and overlays.

### Version Corrections (update the Tech Stack section)

- **Framework:** Next.js 16.1.6 (App Router, RSC + SSR)
- **Styling:** Tailwind CSS v4 (`@theme inline` in globals.css, NOT tailwind.config)
- **Animation:** Framer Motion v12.35.2 (use `motion.div`, NOT `motion.create()`)
- **Smooth Scroll:** Lenis (NEW)
- **Scroll Animations:** GSAP + ScrollTrigger (NEW)
- **React:** 19.2.3

### Glass Design Tokens (in globals.css)

```css
/* Cream sections */
--glass-bg: rgba(253, 244, 227, 0.55);
--glass-bg-heavy: rgba(253, 244, 227, 0.75);
--glass-border: rgba(255, 255, 255, 0.3);

/* Blue sections (hero, process, footer) */
--glass-bg-dark: rgba(19, 70, 134, 0.4);
--glass-bg-dark-heavy: rgba(19, 70, 134, 0.6);
--glass-border-dark: rgba(253, 244, 227, 0.15);
```

### New Components (this branch)

| Component | File | Purpose |
|---|---|---|
| GlassCard | `src/components/GlassCard.tsx` | Frosted card with spotlight + 3D tilt. `dark` prop for blue sections. |
| GlassButton | `src/components/GlassButton.tsx` | Glass CTA. `dark` + `variant` props. |
| AmbientBackground | `src/components/AmbientBackground.tsx` | Drifting gradient blobs behind glass. `dark` prop. Server component. |
| SmoothScroll | `src/components/SmoothScroll.tsx` | Lenis wrapper in layout.tsx. Exposes `window.__lenis` for GSAP sync. |
| HeroAnimated | `src/components/HeroAnimated.tsx` | Animated hero (blur-in text, glass CTAs). Client component. |
| ProductCarousel | `src/components/ProductCarousel.tsx` | GSAP ScrollTrigger pinned horizontal scroll (desktop), CSS scroll-snap (mobile). |
| ShadeSwatches | `src/components/ShadeSwatches.tsx` | 4 colour dots (Chalk/Sand/Amber/Smoke). |
| ProcessStep | `src/components/ProcessStep.tsx` | Scroll-driven process step with warm glow on final step. |
| CursorGlow | `src/components/CursorGlow.tsx` | Subtle cursor-following radial gradient. Desktop only. |

### Critical Architecture Rule

`src/app/page.tsx` is an **async server component**. All interactive/animated content must be in separate `"use client"` components imported into it. Never add `"use client"` to page.tsx itself.

### Performance Rules

- Max 5-7 `backdrop-filter` elements visible in any viewport
- `will-change: transform` only during active animation
- Respect `prefers-reduced-motion` everywhere
- Lenis + GSAP: sync via `window.__lenis.on("scroll", ScrollTrigger.update)`
- Lazy-load ProductCarousel with `next/dynamic` if bundle grows

### Glass Where / Glass Not

**Glass YES:** Product cards, CTA buttons, nav header (scrolled), mobile overlay, info panels
**Glass NO:** Body text, footer, section backgrounds, headings, the hero background itself