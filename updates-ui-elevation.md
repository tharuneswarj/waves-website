# Waves Website - UI Elevation: Phase 3 Audit Fixes

*Generated: 14 March 2026*
*Status: COMPLETE*
*Branch: ui-elevation*

---

> Execute these 11 fixes in order. Run npm run build after all are done.

## Fix 1: Sketch hover - straighten instead of spinning

**File:** src/components/HeroSketches.tsx
**Find:** `whileHover={{ scale: 1.1, rotate: sketch.rotate + 8, zIndex: 10 }}`
**Replace:** `whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}`

## Fix 2: Lenis scroll - reduce duration and jitter

**File:** src/components/SmoothScroll.tsx
**Replace the Lenis config object with:**
```
duration: 0.8,
easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
touchMultiplier: 1.5,
smoothWheel: true,
syncTouch: false,
```

## Fix 3: Create CursorGlow + add to layout

**New file:** src/components/CursorGlow.tsx - subtle radial gradient following cursor, desktop only, respects prefers-reduced-motion.
**Layout change:** Add `<CursorGlow />` as first child inside body in layout.tsx.
(Full component code in the audit report.)

## Fix 4: Nav logo slightly larger

**File:** src/components/Header.tsx
**Find:** `className="h-[15px] w-auto"`
**Replace:** `className="h-[18px] w-auto"`

## Fix 5: Expand cardTransforms for 3+ products

**File:** src/components/ProductShowcase.tsx
**Replace cardTransforms array with:**
```
{ rotate: -6, zIndex: 1 },
{ rotate: -1, zIndex: 2 },
{ rotate: 4, zIndex: 3 },
{ rotate: 8, zIndex: 4 },
```

## Fix 6: Smaller sketches on mobile

**File:** src/components/HeroSketches.tsx
**Add to product-type sketch className:** `max-md:!w-[70px] max-md:opacity-50`

## Fix 7: Reduce hero blur from 12px to 6px

**File:** src/components/HeroAnimated.tsx
**Find:** `filter: "blur(12px)"`
**Replace:** `filter: "blur(6px)"`

## Fix 8: Add Contact CTA to homepage

**File:** src/app/page.tsx
**Add between Installation and Closing sections:**
A small centered section with "Have a project in mind?" text and GlassButton linking to /contact.

## Fix 9: prefers-reduced-motion on sketch animations

**File:** src/components/HeroSketches.tsx
**Check matchMedia and set duration/delay to 0 if reduced motion preferred.**

## Fix 10: Add sketch PNG specs to todo-assets.md

**File:** todo-assets.md
**Add section 6 with all 6 PNG filenames, sizes, and style requirements.**

## Fix 11: Already confirmed done

GlassButton coral, ShadeSwatches props, Shopify shade data, AuthModal glass, CartDrawer glass, PageTransition initial={false}, scroll-behavior removed, SketchMotif placed, Footer frieze done.

## Fix 12: Remove AmbientBackground from homepage

**File:** src/components/HeroAnimated.tsx
- Remove the import: `import AmbientBackground from "./AmbientBackground";`
- Remove the line: `<AmbientBackground />`

**File:** src/app/page.tsx
- Remove the import: `import AmbientBackground from "@/components/AmbientBackground";`
- In Section 2 (Brand Statement), remove the `<AmbientBackground />` line
- Remove `overflow-hidden` from the Section 2 `<section>` className (it was only there for the blobs)

**Do NOT delete the AmbientBackground component file itself** - it may be useful on the blue-bg process section or other pages later. Just stop using it on the homepage.

## Verification

1. npm run build - zero errors
2. Sketch hover straightens smoothly
3. Scroll is smooth, not sluggish
4. CursorGlow visible on desktop
5. Mobile sketches small and faded
6. Contact CTA visible on homepage
