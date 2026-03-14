# Waves Website - Updates

*Generated: 15 March 2026 from Claude.ai conversation*
*Status: COMPLETE*
*Branch: `ui-elevation`*

---

> Two focused fixes. Execute in order. Run `npm run build` after completion.

---

## Fix 1: Sketch sizing and placement - desktop and mobile

The real sketch PNGs are now in `/public/sketches/`. The current sizes are too small on both desktop and mobile, leaving too much empty space in the hero. The sketches should fill the space between the caption ("Lighting objects designed through code...") at the top and the headline ("Light, algorithmically crafted.") at the bottom.

### 1a. Update sketch sizes and positions

**File:** `src/lib/sketch-map.ts`

**Replace the entire `heroSketches` array (from the opening `export const heroSketches` through the closing `];` before the `sketchPlaceholders` block) with:**

```typescript
export const heroSketches: SketchItem[] = [
  // ── Pendants (hanging from top) ──
  {
    id: "chennai-pendant",
    label: "Chennai Pendant",
    src: "/sketches/pendant-chennai.png",
    href: "/studio/chennai-residence",
    position: { top: "4%", left: "34%" },
    width: "160px",
    rotate: -2,
    delay: 0.4,
    type: "project",
  },
  {
    id: "linear-pendant",
    label: "Linear Pendant",
    src: "/sketches/pendant-linear.png",
    href: null,
    position: { top: "2%", right: "10%" },
    width: "260px",
    rotate: 1,
    delay: 0.55,
    type: "project",
  },

  // ── Table lamps (center-right area, prominent) ──
  {
    id: "ripple-sketch",
    label: "The Ripple",
    src: "/sketches/lamp-ripple.png",
    href: "/shop/the-ripple-lamp",
    position: { top: "28%", right: "6%" },
    width: "200px",
    rotate: -4,
    delay: 0.7,
    type: "product",
  },
  {
    id: "hourglass-sketch",
    label: "The Hourglass",
    src: "/sketches/lamp-hourglass.png",
    href: "/shop/the-hour-glass-lamp",
    position: { top: "22%", right: "26%" },
    width: "180px",
    rotate: 5,
    delay: 0.85,
    type: "product",
  },

  // ── Floor lamp (tall, bottom-right) ──
  {
    id: "floor-lamp",
    label: "Floor Lamp",
    src: "/sketches/lamp-floor.png",
    href: null,
    position: { bottom: "4%", right: "3%" },
    width: "120px",
    rotate: 2,
    delay: 1.0,
    type: "project",
  },
];
```

**Size changes:**
- Chennai pendant: 100px → 160px
- Linear pendant: 180px → 260px
- Ripple: 130px → 200px
- Hourglass: 120px → 180px
- Floor lamp: 80px → 120px

**Position changes:**
- All sketches repositioned to spread across the right side of the hero more prominently
- Pendants pushed closer to the top edge
- Table lamps (Ripple + Hourglass) centered in the mid-right zone
- Floor lamp tucked into the bottom-right corner

Do NOT touch the `sketchPlaceholders` object - keep it as-is.

---

### 1b + Fix 2: Update HeroSketches component (mobile sizing + hover exit lag)

**File:** `src/components/HeroSketches.tsx`

**Replace the entire file contents with:**

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSketches, sketchPlaceholders } from "@/lib/sketch-map";

export default function HeroSketches() {
  return (
    <>
      {heroSketches.map((sketch) => (
        <SketchElement key={sketch.id} sketch={sketch} />
      ))}
    </>
  );
}

function SketchElement({ sketch }: { sketch: (typeof heroSketches)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const placeholderKey = sketch.src.replace("/sketches/", "").replace(".png", "");
  const placeholderSvg = sketchPlaceholders[placeholderKey];

  // After entrance animation completes, switch to fast spring for hover interactions.
  // This fixes the hover-exit lag: without this, the slow entrance transition (0.6s + delay)
  // is reused when the cursor leaves, making the rotation back feel sluggish.
  const baseTransition = reducedMotion
    ? { duration: 0 }
    : hasEntered
      ? { type: "spring" as const, stiffness: 400, damping: 20 }
      : { duration: 0.6, ease: "easeOut" as const, delay: sketch.delay };

  const imageContent = (
    <>
      {!imgFailed ? (
        <Image
          src={sketch.src}
          alt={sketch.label}
          width={200}
          height={280}
          className="h-auto w-full object-contain"
          onError={() => setImgFailed(true)}
          unoptimized
        />
      ) : placeholderSvg ? (
        <div
          className="h-auto w-full"
          dangerouslySetInnerHTML={{ __html: placeholderSvg }}
        />
      ) : null}
    </>
  );

  return (
    <motion.div
      className={`group absolute ${sketch.type === "product" ? "block max-md:!w-[130px]" : "hidden md:block"}`}
      style={{
        ...sketch.position,
        width: sketch.width,
        zIndex: 1,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85, rotate: sketch.rotate - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: sketch.rotate }}
      transition={baseTransition}
      onAnimationComplete={() => {
        if (!hasEntered) setHasEntered(true);
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
    >
      {sketch.href ? (
        <Link href={sketch.href} className="block">
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}

      {sketch.type !== "decorative" && (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[var(--glass-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 backdrop-blur-[8px] border border-[var(--glass-border)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
          {sketch.label}
        </span>
      )}
    </motion.div>
  );
}
```

**Three things changed in this file:**

1. **Mobile sizing** - `max-md:!w-[70px] max-md:opacity-50` changed to `max-md:!w-[130px]`
   - Width: 70px → 130px (nearly double, fills the empty space between caption and headline)
   - Removed opacity-50: sketches are now fully visible on mobile

2. **Hover exit lag fixed** - Added `hasEntered` state + `onAnimationComplete` callback
   - On page load: entrance animation plays with the slow 0.6s stagger (unchanged, still smooth)
   - After entrance completes: `hasEntered` flips to true, switching `baseTransition` to a fast spring
   - Hover IN: fast spring (stiffness 400, damping 15) - unchanged, already snappy
   - Hover OUT: now uses the same fast spring instead of the slow 0.6s entrance transition
   - Result: both hover in and out feel equally responsive

3. **Link moved inside motion.div** - Fixes potential hover detection issues where the Link wrapper could interfere with Framer Motion's whileHover

---

## Verification Checklist

1. `npm run build` - zero errors
2. Desktop hero: all 5 sketches visibly larger, filling the right side between caption and headline
3. Mobile hero (~375px): Ripple and Hourglass are ~130px wide, fully opaque, clearly visible in the space between caption and headline
4. Page load: sketches still stagger in smoothly with the gentle entrance animation
5. Hover IN on any sketch: snaps to straight + scales up instantly
6. Hover OUT on any sketch: snaps back to tilted position instantly (no lag, matches hover-in speed)
