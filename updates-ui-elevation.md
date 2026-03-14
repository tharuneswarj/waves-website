# Waves Website - UI Elevation: Fixes & Polish

*Generated: 14 March 2026 from Claude.ai conversation*
*Status: PENDING EXECUTION*
*Branch: `ui-elevation` (continue on same branch)*

---

> **Context:** The ui-elevation branch has Phase 1 foundation + creative build (hero, nav, product showcase, sketch system, SketchMotif) all working. This file contains 11 targeted fixes from a full audit of the current branch state. Execute all fixes, then run `npm run build` to verify.

---

## Fix 1: Waves logo alignment with nav pill

**File:** `src/components/Header.tsx`
**Problem:** The brand mark has inconsistent padding and sits at a different vertical position than the nav pill.

**Find (line 50):**
```tsx
        className="fixed top-0 left-6 z-[51] pt-5 py-3 lg:left-10"
```

**Replace with:**
```tsx
        className="fixed top-0 left-8 z-[51] flex h-[56px] items-center lg:left-12"
```

**Why:** `h-[56px]` matches the total height of the nav pill area (20px top padding + ~36px pill). `items-center` vertically centers the logo. `left-8` / `lg:left-12` gives proper breathing room.

---

## Fix 2: "Explore the Collection" button should be coral, not blue

**File:** `src/components/GlassButton.tsx`
**Problem:** Primary variant (non-dark) uses `bg-primary/85` = blue. Should be coral.

**Find (lines 35-36):**
```tsx
        ? "bg-primary/85 text-surface border-white/15 hover:bg-primary/95 hover:shadow-[0_0_30px_rgba(19,70,134,0.25)]"
```

**Replace with:**
```tsx
        ? "bg-accent/90 text-white border-white/20 hover:bg-accent hover:shadow-[0_0_30px_rgba(237,63,39,0.25)]"
```

---

## Fix 3: Show PNG sketches on mobile

**File:** `src/components/HeroSketches.tsx`
**Problem:** Line 28 has `hidden md:block` which hides all sketches on mobile.

**In the `SketchElement` function, find (line 28):**
```tsx
      className="group absolute hidden md:block"
```

**Replace with:**
```tsx
      className={`group absolute ${sketch.type === "product" ? "block" : "hidden md:block"}`}
```

**Why:** On mobile, only product-type sketches (Ripple, Hourglass) are shown. Project and decorative sketches stay hidden to avoid clutter on small screens.

---

## Fix 4: Remove tilde wavemark from hero

**File:** `src/components/HeroAnimated.tsx`
**Problem:** Wave mark watermark at the bottom of the hero is redundant - we have the Waves brand mark in the header.

**Remove this entire block (lines 56-66):**
```tsx
      {/* Wave mark watermark - bottom centre */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg viewBox="0 0 120 20" fill="none" className="h-2.5 w-16">
          <path d="M10 12 Q30 2, 60 10 Q90 18, 110 6" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>
```

---

## Fix 5: ShadeSwatches from Shopify data, not hardcoded

**File:** `src/components/ShadeSwatches.tsx`
**Problem:** Hardcoded SHADES array. Should pull from Shopify.

**Replace entire file with:**
```tsx
interface Shade {
  name: string;
  color: string;
}

const DEFAULT_SHADES: Shade[] = [
  { name: "Chalk", color: "#F5F0E8" },
  { name: "Sand", color: "#D4C5A9" },
  { name: "Amber", color: "#C8956A" },
  { name: "Smoke", color: "#7A7A7A" },
];

interface ShadeSwatchesProps {
  className?: string;
  shades?: Shade[];
}

export default function ShadeSwatches({ className = "", shades }: ShadeSwatchesProps) {
  const items = shades && shades.length > 0 ? shades : DEFAULT_SHADES;

  return (
    <div className={`flex gap-2 ${className}`}>
      {items.map((shade) => (
        <div
          key={shade.name}
          title={shade.name}
          className="h-3.5 w-3.5 rounded-full border border-white/30 transition-all duration-200 hover:scale-125 hover:shadow-[0_0_8px_var(--sw-color)]"
          style={{ backgroundColor: shade.color, "--sw-color": shade.color } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

**File:** `src/components/ProductShowcase.tsx`
**Update Product interface (around line 10) to add shades:**
```tsx
interface Product {
  id: string;
  title: string;
  handle: string;
  priceFormatted: string;
  imageUrl?: string;
  imageAlt?: string;
  shades?: { name: string; color: string }[];
}
```

**Update both `<ShadeSwatches>` usages (desktop ~line 91 and mobile ~line 130):**
```tsx
<ShadeSwatches className="mt-3" shades={product.shades} />
```

**File:** `src/app/page.tsx`
**Add import:**
```tsx
import { getShadeColours } from "@/lib/product-content";
```

**Update `toShowcaseProduct` function:**
```tsx
function toShowcaseProduct(p: ShopifyProduct) {
  const colourMap = getShadeColours(p);
  const shades = Object.entries(colourMap).map(([name, color]) => ({ name, color }));

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    priceFormatted: `From ${formatMinPrice(p)}`,
    imageUrl: p.featuredImage?.url,
    imageAlt: p.featuredImage?.altText || p.title,
    shades: shades.length > 0 ? shades : undefined,
  };
}
```

---

## Fix 6: AuthModal - frosted glass treatment

**File:** `src/components/AuthModal.tsx`

**Find (line 70-71):**
```tsx
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
```
**Replace with:**
```tsx
      className="fixed inset-0 z-[200] flex items-center justify-center bg-primary/20 p-4 backdrop-blur-[8px]"
```

**Find (line 73):**
```tsx
      <div className="relative w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl">
```
**Replace with:**
```tsx
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--glass-bg-heavy)] p-8 shadow-xl backdrop-blur-[16px] border border-[var(--glass-border)]">
```

---

## Fix 7: CartDrawer - frosted glass treatment

**File:** `src/components/CartDrawer.tsx`

**Find (line 59):**
```tsx
            className="fixed inset-0 z-50 bg-black/40"
```
**Replace with:**
```tsx
            className="fixed inset-0 z-50 bg-primary/15 backdrop-blur-[4px]"
```

**Find (line 68):**
```tsx
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-2xl"
```
**Replace with:**
```tsx
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-[var(--glass-bg-heavy)] backdrop-blur-[20px] border-l border-[var(--glass-border)] shadow-2xl"
```

---

## Fix 8: Page transition blink/glitch

**File:** `src/components/PageTransition.tsx`
**Problem:** `filter: blur()` causes a 1-frame flash between exit and enter animations. Browser needs a paint cycle to composite the blur filter.

**Replace entire file with:**
```tsx
"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Key:** `initial={false}` prevents first-load animation. Blur removed entirely. Exit is opacity-only.

---

## Fix 9: Update todo-assets.md with sketch PNGs

**File:** `todo-assets.md`
**Add after the "Compare pair" section, before "## Shopify Admin Tasks":**

```markdown
---

### 6. Hero sketch PNGs (line drawings)

Coral (#ED3F27) line drawings on transparent PNG background. Architectural line-drawing style, 2-3px stroke, no fills. Place in `/public/sketches/`.

| Filename | Subject | Canvas Size | Notes |
|---|---|---|---|
| `lamp-ripple.png` | Ripple table lamp | 400x500px | Full lamp + base |
| `lamp-hourglass.png` | Hourglass table lamp | 400x500px | Full lamp + base |
| `pendant-chennai.png` | Chennai small pendant | 300x450px | Include ~80px cord at top |
| `pendant-linear.png` | Linear pendant | 600x300px | Wide, two cords |
| `lamp-floor.png` | Floor lamp | 250x700px | Full height |
| `tilde-motif.png` | Tilde wave decoration | 200x100px | Decorative only |

Used by: `src/lib/sketch-map.ts` -> `src/components/HeroSketches.tsx`
Fallback: SVG placeholders render until real PNGs are uploaded.
```

---

## Fix 10: Create /public/sketches/ directory

```bash
mkdir -p public/sketches
touch public/sketches/.gitkeep
```

---

## Fix 11: Shopify shade data flow (covered by Fix 5)

No additional changes beyond Fix 5. The chain: shopify.ts GraphQL -> product-content.ts getShadeColours() -> page.tsx toShowcaseProduct() -> ProductShowcase -> ShadeSwatches.

---

## Verification Checklist

1. `npm run build` - zero errors
2. Homepage - coral "Explore" button, not blue
3. Homepage mobile (375px) - Ripple + Hourglass sketches visible
4. Click account icon - frosted glass modal
5. Click cart icon - frosted glass drawer
6. Navigate pages - clean fade, no blink
7. Product cards - all 4 shade swatches from Shopify
8. Waves logo aligned with nav pill
9. No tilde at hero bottom

---

## Completed
- [x] Phase 1 foundation - 14 Mar 2026
- [x] Creative build (hero, nav, showcase, sketches) - 14 Mar 2026
- [x] Fixes & polish (all 11 fixes) - 14 Mar 2026
