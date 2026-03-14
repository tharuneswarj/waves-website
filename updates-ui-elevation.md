# Waves Website - Updates

*Generated: 14 March 2026 from Claude.ai conversation*
*Status: COMPLETE*
*Branch: `ui-elevation`*

---

> Execute all fixes in order. Run `npm run build` after completion.

---

## P0 — Do Now

### Fix 1: Hourglass sketch hover not activating

**File:** `src/components/HeroSketches.tsx`
**What:** The Hourglass sketch does not respond to hover (no scale, no rotation, no tooltip). Root cause: wrapping the entire `motion.div` inside `<Link className="contents">` breaks Framer Motion's `whileHover` detection in some browsers. Fix by moving the Link inside the motion.div so the motion element is always the outermost positioned element.

**Replace the entire `SketchElement` function (lines 19-86) with:**

```tsx
function SketchElement({ sketch }: { sketch: (typeof heroSketches)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Extract the placeholder key from the src path (e.g., "/sketches/lamp-ripple.png" -> "lamp-ripple")
  const placeholderKey = sketch.src.replace("/sketches/", "").replace(".png", "");
  const placeholderSvg = sketchPlaceholders[placeholderKey];

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
      className={`group absolute ${sketch.type === "product" ? "block max-md:!w-[70px] max-md:opacity-50" : "hidden md:block"}`}
      style={{
        ...sketch.position,
        width: sketch.width,
        zIndex: 1,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85, rotate: sketch.rotate - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: sketch.rotate }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: sketch.delay }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        transition: { type: "spring", stiffness: 400, damping: 15, duration: 0.2 }
      }}
    >
      {/* Image or SVG fallback - wrapped in Link if clickable */}
      {sketch.href ? (
        <Link href={sketch.href} className="block">
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}

      {/* Hover tooltip */}
      {sketch.type !== "decorative" && (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[var(--glass-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 backdrop-blur-[8px] border border-[var(--glass-border)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
          {sketch.label}
        </span>
      )}
    </motion.div>
  );
}
```

**Key change:** The `motion.div` is now always the outermost element (never wrapped in a Link). The Link sits inside, wrapping only the image content. This ensures `whileHover` fires correctly on every sketch.

---

### Fix 2: Move Ripple + Hourglass sketches for mobile fit

**File:** `src/lib/sketch-map.ts`
**What:** On mobile, the Ripple and Hourglass sketches collide with the "Light, algorithmically crafted." headline. Move both further right and lower.

**Ripple sketch - find:**
```typescript
    position: { top: "35%", right: "15%" },
```
**Replace with:**
```typescript
    position: { top: "40%", right: "5%" },
```

**Hourglass sketch - find:**
```typescript
    position: { top: "30%", right: "32%" },
```
**Replace with:**
```typescript
    position: { top: "36%", right: "18%" },
```

---

### Fix 3: Hero headline and CTA buttons too large on mobile

**File:** `src/components/HeroAnimated.tsx`

**3a. Headline - reduce mobile size**

**Find:**
```tsx
        className="relative z-10 max-w-[75%] text-5xl leading-[0.95] text-primary sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
```

**Replace with:**
```tsx
        className="relative z-10 max-w-[85%] md:max-w-[75%] text-3xl leading-[0.95] text-primary sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
```

This drops the mobile headline from `text-5xl` (48px) to `text-3xl` (30px), which keeps "algorithmically" from overwhelming the screen. Also widens `max-w` on mobile so the word doesn't wrap awkwardly.

**3b. CTA buttons - reduce mobile padding**

**File:** `src/components/GlassButton.tsx`

**Find:**
```tsx
    "inline-flex items-center justify-center px-10 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-[12px] border";
```

**Replace with:**
```tsx
    "inline-flex items-center justify-center px-6 py-2.5 md:px-10 md:py-3.5 rounded-full font-sans text-xs md:text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-[12px] border";
```

This reduces padding from `px-10 py-3.5` to `px-6 py-2.5` on mobile, and text from `text-sm` to `text-xs` on mobile.

---

### Fix 4: Mesh pendant showing shade swatches when it has none

**File:** `src/components/ShadeSwatches.tsx`
**What:** The component falls back to 4 hardcoded DEFAULT_SHADES when no shade data is provided. This is wrong for products like the Mesh pendant that have no shade options. Fix: return nothing when no shades are passed.

**Replace the entire file with:**

```tsx
interface Shade {
  name: string;
  color: string;
}

interface ShadeSwatchesProps {
  className?: string;
  shades?: Shade[];
}

export default function ShadeSwatches({ className = "", shades }: ShadeSwatchesProps) {
  // Only render swatches if the product actually has shade data
  if (!shades || shades.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {shades.map((shade) => (
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

**Key change:** Removed `DEFAULT_SHADES` entirely. If `shades` is undefined or empty, the component returns `null` - no dots shown. Products with Shopify shade data (Ripple, Hourglass) will still show their swatches. Products without shade options (Mesh pendant) will show nothing.

---

## Verification Checklist

1. `npm run build` - zero errors
2. Hero: hover over Hourglass sketch - tooltip appears, sketch scales and straightens
3. Hero: hover over Ripple sketch - same behaviour (regression check)
4. Hero (mobile ~375px): Ripple and Hourglass don't collide with the headline text
5. Hero (mobile): headline "Light, algorithmically crafted." is readable, not oversized
6. Hero (mobile): CTA buttons fit within viewport, not oversized
7. Product cards: Ripple and Hourglass show shade swatches (from Shopify data)
8. Product cards: Mesh pendant does NOT show shade swatches
