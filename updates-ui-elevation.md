# Waves Website - UI Elevation: Final Production Build

*Generated: 14 March 2026 from Claude.ai conversation*
*Status: COMPLETE*
*Branch: `ui-elevation` (continue from Phase 1 foundation)*

---

> **Pre-requisites already done (Phase 1):**
> Glass tokens in globals.css, GlassCard, GlassButton, AmbientBackground, SmoothScroll, CursorGlow, Lenis + GSAP installed, blur page transitions.
>
> **This file covers the creative build:** Hero, nav, product showcase, editorial rhythm, site-wide line drawing motif.
>
> **Critical architecture rules:**
> - `src/app/page.tsx` is an async SERVER component. All interactive content must be separate `"use client"` components.
> - Framer Motion v12.35.2 - use `motion.div`, NOT `motion.create()`
> - Tailwind v4 - `@theme inline` in globals.css
> - ALL product data comes from Shopify. Never hardcode product names, prices, or handles.
> - `src/lib/product-content.ts` is the fallback data layer. Use it for products not yet in Shopify.
> - `src/lib/projects.ts` is the static project data layer (Salem, Chennai).

---

## Data Architecture: The Sketch Map

### The concept

The hero has scattered line-drawing PNGs of Waves products. Each sketch links to a product page (`/shop/[handle]`) or studio page (`/studio/[slug]`). The sketches must NOT be hardcoded - they should come from a data source so new products appear automatically.

### Create `src/lib/sketch-map.ts` (NEW FILE)

This is the single source of truth for which sketches appear on the hero and where they link. Claude Code or Tharun adds entries here when new products or projects arrive. The hero component reads this file.

```typescript
/**
 * Sketch Map - defines which line-drawing PNGs appear on the homepage hero.
 *
 * Each entry maps to a PNG file in /public/sketches/ and a destination link.
 * The hero component reads this array and places each sketch at its defined position.
 *
 * To add a new sketch:
 * 1. Place the PNG in /public/sketches/ (transparent background, coral #ED3F27 lines)
 * 2. Add an entry here with position, size, rotation, and link
 * 3. The hero will pick it up automatically
 *
 * Position uses percentage-based CSS (top/bottom/left/right as % of viewport).
 * This keeps the composition responsive.
 */

export interface SketchItem {
  /** Unique identifier */
  id: string;
  /** Display name shown on hover tooltip */
  label: string;
  /** Path to PNG in /public/sketches/ */
  src: string;
  /** Where clicking takes you - /shop/[handle] or /studio/[slug] or null if not yet linkable */
  href: string | null;
  /** CSS position properties (percentage-based) */
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  /** Width of the sketch element */
  width: string;
  /** Rotation in degrees (slight tilt for organic feel) */
  rotate: number;
  /** Stagger delay for entrance animation (seconds) */
  delay: number;
  /** Type: 'product' links to /shop, 'project' links to /studio, 'decorative' is not clickable */
  type: "product" | "project" | "decorative";
}

export const heroSketches: SketchItem[] = [
  // ── Pendants (hanging from top) ──
  {
    id: "chennai-pendant",
    label: "Chennai Pendant",
    src: "/sketches/pendant-chennai.png",
    href: "/studio/chennai-residence",
    position: { top: "3%", left: "32%" },
    width: "100px",
    rotate: -2,
    delay: 0.4,
    type: "project",
  },
  {
    id: "linear-pendant",
    label: "Linear Pendant",
    src: "/sketches/pendant-linear.png",
    href: null, // Not yet a live product or project
    position: { top: "2%", right: "18%" },
    width: "180px",
    rotate: 1,
    delay: 0.55,
    type: "project",
  },

  // ── Table lamps (mid-right area) ──
  {
    id: "ripple-sketch",
    label: "The Ripple",
    src: "/sketches/lamp-ripple.png",
    href: "/shop/the-ripple-lamp", // Exact Shopify handle
    position: { top: "35%", right: "15%" },
    width: "130px",
    rotate: -4,
    delay: 0.7,
    type: "product",
  },
  {
    id: "hourglass-sketch",
    label: "The Hourglass",
    src: "/sketches/lamp-hourglass.png",
    href: "/shop/the-hour-glass-lamp", // Exact Shopify handle
    position: { top: "30%", right: "32%" },
    width: "120px",
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
    position: { bottom: "8%", right: "8%" },
    width: "80px",
    rotate: 2,
    delay: 1.0,
    type: "project",
  },

  // ── Decorative tilde motif ──
  {
    id: "tilde-motif",
    label: "~",
    src: "/sketches/tilde-motif.png",
    href: null,
    position: { top: "18%", left: "10%" },
    width: "70px",
    rotate: -6,
    delay: 1.2,
    type: "decorative",
  },
];

/**
 * Placeholder SVG sketches used when PNG files haven't been uploaded yet.
 * Claude Code should render these as inline SVGs as fallback.
 * Once Tharun uploads the real PNGs, these are ignored.
 */
export const sketchPlaceholders: Record<string, string> = {
  "pendant-chennai": `<svg viewBox="0 0 70 100" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><line x1="35" y1="0" x2="35" y2="25"/><circle cx="35" cy="27" r="3"/><path d="M15 30 Q15 30, 10 70 Q10 78, 35 80 Q60 78, 60 70 Q55 30, 55 30"/><path d="M18 45 Q35 40, 52 45" opacity="0.4"/></svg>`,
  "pendant-linear": `<svg viewBox="0 0 140 70" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><line x1="30" y1="0" x2="30" y2="15"/><line x1="110" y1="0" x2="110" y2="15"/><rect x="10" y="15" width="120" height="35" rx="8"/><line x1="50" y1="22" x2="50" y2="43" opacity="0.3"/><line x1="90" y1="22" x2="90" y2="43" opacity="0.3"/></svg>`,
  "lamp-ripple": `<svg viewBox="0 0 100 130" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><ellipse cx="50" cy="18" rx="28" ry="8"/><path d="M22 18 C22 18, 18 85, 26 95 Q50 115, 74 95 C82 85, 78 18, 78 18"/><ellipse cx="50" cy="108" rx="28" ry="6"/><path d="M28 40 Q50 32, 72 40" opacity="0.4"/><path d="M26 55 Q50 47, 74 55" opacity="0.3"/><path d="M25 70 Q50 62, 75 70" opacity="0.2"/></svg>`,
  "lamp-hourglass": `<svg viewBox="0 0 80 120" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><ellipse cx="40" cy="12" rx="25" ry="7"/><path d="M15 12 C15 12, 30 50, 30 58 C30 66, 15 100, 15 100"/><path d="M65 12 C65 12, 50 50, 50 58 C50 66, 65 100, 65 100"/><ellipse cx="40" cy="103" rx="28" ry="6"/><path d="M32 56 Q40 52, 48 56" opacity="0.5"/></svg>`,
  "lamp-floor": `<svg viewBox="0 0 50 140" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><line x1="25" y1="35" x2="25" y2="120"/><ellipse cx="25" cy="125" rx="18" ry="5"/><ellipse cx="25" cy="15" rx="18" ry="6"/><path d="M7 15 C7 15, 10 35, 25 38 C40 35, 43 15, 43 15"/></svg>`,
  "tilde-motif": `<svg viewBox="0 0 70 35" fill="none" stroke="#ED3F27" stroke-width="2" stroke-linecap="round"><path d="M5 20 Q18 5, 35 18 Q52 31, 65 15"/></svg>`,
};
```

**Placeholder images directory:** Create `/public/sketches/` directory. For now, this will be empty. The hero component checks if the PNG file exists via `Image` `onError` fallback. If the PNG doesn't load, it renders the inline SVG placeholder from `sketchPlaceholders`.

**PNG specs for Tharun (document in `todo-assets.md`):**

| Filename | Subject | Canvas Size | Notes |
|---|---|---|---|
| `lamp-ripple.png` | Ripple table lamp | 400×500px | Full lamp + base, upright |
| `lamp-hourglass.png` | Hourglass table lamp | 400×500px | Full lamp + base, upright |
| `pendant-chennai.png` | Chennai small pendant | 300×450px | Include 80px cord at top |
| `pendant-linear.png` | Linear pendant | 600×300px | Wide format, two cords |
| `lamp-floor.png` | Floor lamp | 250×700px | Full height |
| `tilde-motif.png` | Tilde wave motif | 200×100px | Decorative only |

All PNGs: coral #ED3F27 lines on transparent background. Architectural line drawing style, 2-3px stroke, no fills.

---

## P0 - Header: Floating Glass Pill with Brand Mark

### 0.1 Rewrite Header.tsx

**File:** `src/components/Header.tsx`
**What:** Complete rewrite. Floating pill nav centred at top. Separate brand mark at top-left. "Home" link added.

**Key changes from current Header:**
- No longer full-width. Compact pill shape, centred.
- "Home" added as first nav link (replaces the logo-as-home-button)
- Brand mark (tilde + "WAVES" wordmark) sits top-left, OUTSIDE the pill, as a fixed element
- On homepage at scroll 0: pill has light glass on cream bg (NOT dark - the hero is now cream)
- On scroll past hero: pill gets slightly more opaque glass
- Contact removed from desktop pill (lives in footer + mobile menu) to keep it tight
- Mobile: pill shrinks to brand mark + hamburger + cart. Full-screen glass overlay on tap.

**Full replacement file:**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import AuthModal from "./AuthModal";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, cart } = useCartStore();
  const { customer } = useAuthStore();
  const itemCount = cart?.totalQuantity ?? 0;
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const glassClasses = scrolled
    ? "bg-[var(--glass-bg-heavy)] shadow-[0_4px_24px_rgba(19,70,134,0.06)]"
    : "bg-[var(--glass-bg)]";

  return (
    <>
      {/* ── Brand mark: top-left, always visible ── */}
      <Link
        href="/"
        className="fixed top-5 left-6 z-[51] lg:left-10"
        aria-label="Waves Company home"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          {/* Tilde mark */}
          <svg viewBox="0 0 36 20" fill="none" className="h-4 w-7">
            <path
              d="M3 13 Q9 3, 18 10 Q27 17, 33 7"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          {/* Wordmark */}
          <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-primary">
            Waves
          </span>
        </motion.div>
      </Link>

      {/* ── Floating pill nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`
            pointer-events-auto flex items-center gap-6
            rounded-full border border-[var(--glass-border)] px-8 py-3
            backdrop-blur-[16px] transition-all duration-500
            ${glassClasses}
          `}
        >
          {/* Nav links - desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-4 w-px bg-primary/15 md:block" />

          {/* Account */}
          {customer ? (
            <Link href="/account" className="text-primary transition-colors hover:text-accent" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="text-primary transition-colors hover:text-accent" aria-label="Sign in">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* Cart */}
          <button type="button" onClick={openCart} className="relative text-primary transition-colors hover:text-accent" aria-label="Open cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex flex-col justify-center gap-1 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </motion.nav>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--glass-bg-heavy)] backdrop-blur-[24px] md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-2xl font-medium text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
```

---

## P0 - Hero: Cream Background with Scattered Sketches

### 0.2 Create `HeroSketches` client component

**File:** `src/components/HeroSketches.tsx` (NEW FILE)
**What:** Renders the scattered line-drawing sketches from sketch-map.ts. Each sketch checks for the real PNG, falls back to inline SVG placeholder if missing.

```tsx
"use client";

import { useState } from "react";
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

  // Extract the placeholder key from the src path (e.g., "/sketches/lamp-ripple.png" -> "lamp-ripple")
  const placeholderKey = sketch.src.replace("/sketches/", "").replace(".png", "");
  const placeholderSvg = sketchPlaceholders[placeholderKey];

  const content = (
    <motion.div
      className="group absolute hidden md:block"
      style={{
        ...sketch.position,
        width: sketch.width,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.85, rotate: sketch.rotate - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: sketch.rotate }}
      transition={{ duration: 0.6, ease: "easeOut", delay: sketch.delay }}
      whileHover={{ scale: 1.12, zIndex: 10 }}
    >
      {/* The sketch image or SVG fallback */}
      {!imgFailed ? (
        <Image
          src={sketch.src}
          alt={sketch.label}
          width={200}
          height={280}
          className="h-auto w-full object-contain"
          onError={() => setImgFailed(true)}
          unoptimized // PNGs are small, no need for Shopify CDN optimisation
        />
      ) : placeholderSvg ? (
        <div
          className="h-auto w-full"
          dangerouslySetInnerHTML={{ __html: placeholderSvg }}
        />
      ) : null}

      {/* Hover tooltip */}
      {sketch.type !== "decorative" && (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[var(--glass-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 backdrop-blur-[8px] border border-[var(--glass-border)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
          {sketch.label}
        </span>
      )}
    </motion.div>
  );

  // Wrap in Link if href exists, otherwise just render
  if (sketch.href) {
    return (
      <Link href={sketch.href} className="contents">
        {content}
      </Link>
    );
  }

  return content;
}
```

---

### 0.3 Rewrite HeroAnimated

**File:** `src/components/HeroAnimated.tsx`
**What:** Complete rewrite. Cream background, blue text, scattered sketches, left-aligned oversized headline.

```tsx
"use client";

import { motion } from "framer-motion";
import GlassButton from "./GlassButton";
import AmbientBackground from "./AmbientBackground";
import HeroSketches from "./HeroSketches";

export default function HeroAnimated() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-surface px-6 pb-20 pt-28 md:px-10 lg:px-16">
      {/* Ambient gradient blobs */}
      <AmbientBackground />

      {/* Scattered lamp sketches */}
      <HeroSketches />

      {/* Caption - top left area, below nav */}
      <motion.p
        className="relative z-10 mb-auto max-w-[300px] pt-8 font-sans text-sm font-light leading-relaxed text-primary/45"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Lighting objects designed through code, material honesty, and human touch.
      </motion.p>

      {/* Headline - bottom left, oversized */}
      <motion.h1
        className="relative z-10 max-w-[75%] text-5xl leading-[0.95] text-primary sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Light,
        <br />
        algorithmically
        <br />
        crafted.
      </motion.h1>

      {/* Glass CTA buttons */}
      <motion.div
        className="relative z-10 mt-10 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <GlassButton href="/shop" variant="primary">
          Explore the Collection
        </GlassButton>
        <GlassButton href="/studio" variant="secondary">
          View Our Work
        </GlassButton>
      </motion.div>

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
    </section>
  );
}
```

**Note:** No `dark` props on GlassButton anymore - the hero is cream, so light variant is default.

---

### 0.4 Update homepage page.tsx

**File:** `src/app/page.tsx`
**What:** Wire up the new hero. Keep Shopify data flow intact.

**Import changes:**
- Add: `import HeroAnimated from "@/components/HeroAnimated";`
- Add: `import AmbientBackground from "@/components/AmbientBackground";`
- Add: `import ProductShowcase from "@/components/ProductShowcase";`
- Remove: `import WaveMark from "@/components/WaveMark";` (no longer used on homepage)
- Remove: `import PlaceholderImage from "@/components/PlaceholderImage";` ONLY if it's not used elsewhere on the page. It IS still used in the process strip and installation section, so KEEP IT.

**Replace Section 1 (hero)** - the entire section from `{/* --- Section 1: Hero --- */}` through its `</section>` with:
```tsx
      {/* ─── Section 1: Hero ─── */}
      <HeroAnimated />
```

**Section 2 (brand statement):** Make typography bigger. Change the `<p>` from:
```tsx
className="font-sans text-xl font-light leading-relaxed text-primary/90 md:text-2xl md:leading-relaxed"
```
to:
```tsx
className="font-sans text-2xl font-light leading-relaxed text-primary/80 md:text-3xl lg:text-4xl lg:leading-relaxed"
```
Also add `relative overflow-hidden` to the section tag and insert `<AmbientBackground />` as first child.

**Replace Section 3 (products)** with ProductShowcase. The data flow:

```tsx
      {/* ─── Section 3: Featured Products ─── */}
      <ProductShowcase
        products={products.map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          priceFormatted: `From ${formatMinPrice(p)}`,
          imageUrl: p.featuredImage?.url,
          imageAlt: p.featuredImage?.altText || p.title,
        }))}
      />
```

If products array is empty (Shopify not connected), pass static fallback:
```tsx
      {products.length > 0 ? (
        <ProductShowcase products={products.map(toCarouselProduct)} />
      ) : (
        <ProductShowcase
          products={[
            { id: "1", title: "The Ripple", handle: "the-ripple-lamp", priceFormatted: "From ₹3,999" },
            { id: "2", title: "The Hourglass", handle: "the-hour-glass-lamp", priceFormatted: "From ₹3,999" },
          ]}
        />
      )}
```

**Section 4 (process strip):** Change the heading to be left-aligned and bigger:
```tsx
className="mb-12 text-left text-4xl text-surface md:text-6xl lg:text-7xl"
```
instead of `text-center text-3xl md:text-4xl`. Also update the print time caption from "19h 42m" to "4-5 hours per shade".

**Section 5 (installation highlight):** Remove the `max-w-7xl` container constraint to make the image full-bleed:
- Change `<div className="mx-auto max-w-7xl">` to `<div className="mx-auto">`
- This lets the Salem photo span edge to edge

**Section 6 (closing statement):** Make typography larger:
```tsx
className="font-serif text-3xl leading-snug text-primary/80 md:text-5xl lg:text-6xl"
```

---

## P0 - Product Showcase: Fanned Cards

### 0.5 Create `ProductShowcase` component

**File:** `src/components/ProductShowcase.tsx` (NEW FILE)
**What:** Fanned overlapping product cards with glass treatment. Data-driven from Shopify.

Use the exact component code from `updates-ui-elevation-v3.md` section 0.3. It's already data-driven (accepts a `products` prop array). No changes needed to that code - copy it directly.

---

## P1 - Site-Wide Line Drawing Motif

### 1.1 Create `SketchMotif` decorative component

**File:** `src/components/SketchMotif.tsx` (NEW FILE)
**What:** A reusable decorative component that places small coral sketch elements on any section. Used on legal pages, process page, about page backgrounds.

```tsx
interface SketchMotifProps {
  /** Which decorative SVG to show */
  variant: "tilde" | "ripple-outline" | "pendant-outline" | "grid-dots";
  /** CSS positioning class */
  className?: string;
  /** Opacity 0-1 */
  opacity?: number;
}

const motifs: Record<string, string> = {
  tilde: `<svg viewBox="0 0 70 35" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><path d="M5 20 Q18 5, 35 18 Q52 31, 65 15"/></svg>`,
  "ripple-outline": `<svg viewBox="0 0 60 80" fill="none" stroke="#ED3F27" stroke-width="1" stroke-linecap="round" opacity="0.5"><ellipse cx="30" cy="10" rx="18" ry="5"/><path d="M12 10 C12 10, 9 55, 15 62 Q30 75, 45 62 C51 55, 48 10, 48 10"/><path d="M16 28 Q30 22, 44 28" opacity="0.4"/><path d="M14 40 Q30 34, 46 40" opacity="0.3"/></svg>`,
  "pendant-outline": `<svg viewBox="0 0 40 60" fill="none" stroke="#ED3F27" stroke-width="1" stroke-linecap="round" opacity="0.5"><line x1="20" y1="0" x2="20" y2="15"/><path d="M8 18 Q8 18, 5 45 Q5 50, 20 52 Q35 50, 35 45 Q32 18, 32 18"/></svg>`,
  "grid-dots": `<svg viewBox="0 0 80 80" fill="#ED3F27" opacity="0.15"><circle cx="10" cy="10" r="1.5"/><circle cx="30" cy="10" r="1.5"/><circle cx="50" cy="10" r="1.5"/><circle cx="70" cy="10" r="1.5"/><circle cx="10" cy="30" r="1.5"/><circle cx="30" cy="30" r="1.5"/><circle cx="50" cy="30" r="1.5"/><circle cx="70" cy="30" r="1.5"/><circle cx="10" cy="50" r="1.5"/><circle cx="30" cy="50" r="1.5"/><circle cx="50" cy="50" r="1.5"/><circle cx="70" cy="50" r="1.5"/><circle cx="10" cy="70" r="1.5"/><circle cx="30" cy="70" r="1.5"/><circle cx="50" cy="70" r="1.5"/><circle cx="70" cy="70" r="1.5"/></svg>`,
};

export default function SketchMotif({
  variant,
  className = "absolute top-8 right-8 w-16 h-16",
  opacity = 0.1,
}: SketchMotifProps) {
  const svg = motifs[variant];
  if (!svg) return null;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
```

### 1.2 Add SketchMotif to legal pages

**Files:** All four files in `src/app/legal/*/page.tsx`
**What:** Add a small tilde sketch motif in the top-right corner of each legal page

**Instructions:** In each legal page component, add inside the outermost container (make it `relative`):
```tsx
import SketchMotif from "@/components/SketchMotif";

// Inside the component, as first child of the main wrapper:
<SketchMotif variant="tilde" className="absolute top-12 right-12 w-20 h-10" opacity={0.08} />
```

### 1.3 Add SketchMotif to Process page

**File:** `src/app/process/page.tsx`
**What:** Small lamp sketches as watermarks behind each process stage

At the top of the process page layout, add:
```tsx
<SketchMotif variant="ripple-outline" className="absolute top-24 right-16 w-24 h-32" opacity={0.06} />
<SketchMotif variant="pendant-outline" className="absolute bottom-32 left-12 w-16 h-24" opacity={0.05} />
```

### 1.4 Add SketchMotif to About page

**File:** `src/app/about/page.tsx`
**What:** Tilde motifs near chapter transitions

Place `<SketchMotif variant="tilde" />` at appropriate points between chapter sections. Use low opacity (0.06-0.08) so they don't compete with the narrative text.

### 1.5 Footer tilde frieze

**File:** `src/components/Footer.tsx`
**What:** A thin tilde wave across the top border of the footer

Add as the first child inside the `<footer>` tag:
```tsx
<div className="flex justify-center py-4 opacity-[0.06]" aria-hidden="true">
  <svg viewBox="0 0 400 20" fill="none" className="h-2 w-64">
    <path d="M10 12 Q50 2, 100 12 Q150 22, 200 12 Q250 2, 300 12 Q350 22, 390 8" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
</div>
```

---

## P2 - Globals and Polish

### 2.1 Remove `html { scroll-behavior: smooth }` from globals.css

Already noted in Phase 1 but confirm it's done. Lenis conflicts with CSS smooth scroll.

### 2.2 Add `.scrollbar-hide` to globals.css (if not already present)

```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

### 2.3 Performance and accessibility

- All sketches hidden on mobile (`hidden md:block` in HeroSketches) - mobile gets the clean headline-only hero
- `prefers-reduced-motion`: sketch entrance animations should be instant (duration: 0)
- Glass nav pill: test on iOS Safari (backdrop-filter compositing)
- Lighthouse > 85 on mobile
- All sketch PNGs: `unoptimized` prop on `Image` (they're small decorative files, not product photos)

---

## File Changes Summary

| File | Action | Description |
|---|---|---|
| `src/lib/sketch-map.ts` | NEW | Data source for hero sketches |
| `src/components/Header.tsx` | REWRITE | Floating pill nav + brand mark |
| `src/components/HeroAnimated.tsx` | REWRITE | Cream bg, scattered sketches, left-aligned headline |
| `src/components/HeroSketches.tsx` | NEW | Renders sketches from sketch-map.ts with PNG/SVG fallback |
| `src/components/ProductShowcase.tsx` | NEW | Fanned product cards from Shopify data |
| `src/components/SketchMotif.tsx` | NEW | Reusable decorative sketch element for site-wide use |
| `src/components/Footer.tsx` | MODIFIED | Add tilde frieze at top |
| `src/app/page.tsx` | MODIFIED | New hero, bigger type, full-bleed installation |
| `src/app/legal/*/page.tsx` | MODIFIED | Add SketchMotif |
| `src/app/process/page.tsx` | MODIFIED | Add SketchMotif |
| `src/app/about/page.tsx` | MODIFIED | Add SketchMotif |
| `public/sketches/` | NEW DIR | Empty for now - Tharun adds PNGs here |
| `todo-assets.md` | MODIFIED | Add PNG sketch specs |

**Unchanged from Phase 1:** GlassCard, GlassButton, AmbientBackground, SmoothScroll, ShadeSwatches, ProcessStep, CursorGlow, PageTransition, globals.css (already has glass tokens), layout.tsx (already has SmoothScroll + CursorGlow)

---

## Completed
- [x] Phase 1 foundation (glass tokens, Lenis, components) - 14 Mar 2026
- [x] P0 Header rewrite (floating pill nav + brand mark) - 14 Mar 2026
- [x] P0 HeroSketches + HeroAnimated rewrite (cream bg, scattered sketches) - 14 Mar 2026
- [x] P0 page.tsx (new hero, bigger type, full-bleed installation) - 14 Mar 2026
- [x] P0 ProductShowcase (fanned product cards) - 14 Mar 2026
- [x] P0 sketch-map.ts + /public/sketches/ created - 14 Mar 2026
- [x] P1 SketchMotif component + added to legal/process/about pages - 14 Mar 2026
- [x] P1 Footer tilde frieze - 14 Mar 2026
- [x] P2 Globals verified + build passes - 14 Mar 2026
