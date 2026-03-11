# Waves Website - Updates

*Generated: 11 March 2026 from Claude.ai code review*
*Status: COMPLETE*

---

## P2 - Blocked

### 14. 3D product viewer on product pages
**Files:** New component `src/components/ProductViewer3D.tsx`, update `src/app/shop/[handle]/page.tsx`
**What:** Add an interactive 3D model viewer using React Three Fiber. Auto-rotates when idle, touch/drag to rotate on mobile.
**Why:** The spec includes this and it's a strong differentiator from standard Shopify stores.
**Blocked by:** 3D model files (.glb) — see todo-assets.md

---

## Completed

### 1. Fix Zustand cart hydration mismatch — *11 March 2026*
Added `skipHydration: true` to persist config in `src/lib/cart-store.ts`. Created `src/components/CartHydration.tsx` and added it to `src/app/layout.tsx`.

### 2. Fix header transparency on homepage — *11 March 2026*
Added `usePathname()`, scroll listener (`scrollY > 80`), transparent/cream header logic, and logo swap between `Blue_and_Cream__Logo.png` and `Cream_and_Blue__Logo.png` in `src/components/Header.tsx`.

### 3. Fix studio project card empty heroImage branch — *11 March 2026*
Replaced empty div with proper `Image` component using `fill`, `sizes`, and `object-cover` in `src/app/studio/page.tsx`.

### 4. Fix CompareSlider invalid Tailwind class — *11 March 2026*
Changed `bg-primary/8` to `bg-primary/[0.08]` in `src/components/CompareSlider.tsx`.

### 5. Fix checkout link guard in CartDrawer — *11 March 2026*
Changed `href={cart?.checkoutUrl}` to `href={cart?.checkoutUrl ?? "#"}` in `src/components/CartDrawer.tsx`.

### 6. Connect homepage products to Shopify — *11 March 2026*
Added `getAllProducts` import with try/catch fallback pattern in `src/app/page.tsx`. Renders Shopify data when available, static cards otherwise.

### 7. Write product-specific design stories — *11 March 2026*
Created `src/lib/product-content.ts` with `getDesignStory(handle)` function. Added unique narratives for Ripple and Hourglass products.

### 8. Differentiate product specifications — *11 March 2026*
Added `getProductSpecs(handle)` to `src/lib/product-content.ts` with product-specific dimensions, weight, print time, and layer height for Ripple and Hourglass.

### 9. Update Shopify API version — *11 March 2026*
Updated endpoint from `2024-01` to `2025-01` in `src/lib/shopify.ts`.

### 10. Add page transition animations — *11 March 2026*
Created `src/components/PageTransition.tsx` using Framer Motion `AnimatePresence` with fade + slide transitions. Added to `src/app/layout.tsx`.

### 11. Add form transition animation in ContactForms — *11 March 2026*
Wrapped form switching in `AnimatePresence` with `motion.div` fade/slide transitions in `src/components/ContactForms.tsx`.

### 12. Add Open Graph images per page — *11 March 2026*
Added `openGraph` metadata with title, description, and logo image to all page files: `shop/page.tsx`, `studio/page.tsx`, `process/page.tsx`, `about/page.tsx`, `contact/page.tsx`.

### 13. Animated wave mark on homepage hero — *11 March 2026*
Created `src/components/WaveMark.tsx` with three SVG wave paths and staggered CSS keyframe animations. Added to homepage hero in `src/app/page.tsx`.
