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
