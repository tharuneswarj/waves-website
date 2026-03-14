# Waves Website - UI Elevation: Cleanup & Polish

*Generated: 15 March 2026 from Claude.ai conversation*
*Status: COMPLETE*
*Branch: `ui-elevation`*

---

> Execute all fixes in order. Run `npm run build` after completion.

---

## Fix 1: Remove tilde sketch from hero

**File:** `src/lib/sketch-map.ts`
**What:** Remove the tilde-motif entry from the `heroSketches` array and its SVG placeholder.

**Delete this entire entry from heroSketches array (the last item):**
```typescript
  {
    id: "tilde-motif",
    label: "~",
    src: "/sketches/tilde-motif.png",
    href: null,
    position: { top: "18%", left: "10%" },
    width: "70px",
    rotate: -3,
    delay: 1.2,
    type: "decorative",
  },
```

**Also delete the tilde-motif entry from the `sketchPlaceholders` object:**
```typescript
  "tilde-motif": `<svg viewBox="0 0 70 35" fill="none" stroke="#ED3F27" stroke-width="2" stroke-linecap="round"><path d="M5 20 Q18 5, 35 18 Q52 31, 65 15"/></svg>`,
```

---

## Fix 2: Make sketch hover rotation instant and snappy

**File:** `src/components/HeroSketches.tsx`

**Find (around line 41):**
```tsx
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
```

**Replace with:**
```tsx
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        transition: { type: "spring", stiffness: 400, damping: 15, duration: 0.2 }
      }}
```

---

## Fix 3: Push sketches below the navbar

**File:** `src/lib/sketch-map.ts`
**What:** Pendant sketches overlap the nav pill area. Add clearance.

- Chennai pendant: change `top: "3%"` to `top: "10%"`
- Linear pendant: change `top: "2%"` to `top: "8%"`
- Others already positioned well below nav.

---

## Fix 4: Footer links - all turn coral on hover

**File:** `src/components/Footer.tsx`
**What:** Replace every `hover:text-surface` with `hover:text-accent`.

There are 3 places in Footer.tsx:
1. Nav links (line ~35): `hover:text-surface` -> `hover:text-accent`
2. Email link (line ~42): `hover:text-surface` -> `hover:text-accent`
3. Instagram link (line ~43): `hover:text-surface` -> `hover:text-accent`

For the legal links at the bottom: change `hover:text-surface/60` to `hover:text-accent/80`

**File:** `src/app/page.tsx`
Also fix the two homepage links in the blue process section:
- "See the full process" link: `hover:text-surface` -> `hover:text-accent`
- "See the full project" link: `hover:text-surface` -> `hover:text-accent`

---

## Fix 5: Remove "Have a project in mind? Get in Touch" section

**File:** `src/app/page.tsx`
**Delete the entire Contact CTA section block:**
```tsx
      {/* ─── Section 6: Contact CTA ─── */}
      <section className="bg-surface px-6 py-section lg:py-section-lg text-center">
        <ScrollReveal>
          <p className="font-sans text-sm font-light text-primary/50 mb-4">Have a project in mind?</p>
          <GlassButton href="/contact" variant="secondary">Get in Touch</GlassButton>
        </ScrollReveal>
      </section>
```

Also remove the `GlassButton` import from the top of page.tsx if it's no longer used anywhere else in this file.

Renumber the closing statement section comment from "Section 7" to "Section 6".

---

## Fix 6: "View Our Work" button - visible border

**File:** `src/components/GlassButton.tsx`
**What:** Secondary variant on cream bg is invisible. Give it a clear blue outline.

**Find the non-dark secondary variant (around line 35-36):**
```tsx
        : "bg-[var(--glass-bg)] text-primary border-[var(--glass-border)] hover:bg-[var(--glass-bg-heavy)]";
```

**Replace with:**
```tsx
        : "bg-transparent text-primary border-primary/30 hover:border-primary/60 hover:bg-primary/5";
```

---

## Fix 7: Brand statement - two separate lines

**File:** `src/app/page.tsx`
**In Section 2 (Brand Statement), find:**
```tsx
              Objects deserve the same intellectual rigour as buildings.
              Light is not decoration&thinsp;&mdash;&thinsp;it is atmosphere.
```

**Replace with:**
```tsx
              Objects deserve the same intellectual rigour as buildings.
              <br />
              Light is not decoration&thinsp;&mdash;&thinsp;it is atmosphere.
```

---

## Fix 8: Remove ALL SketchMotif and tilde decorations from other pages

**File: `src/app/process/page.tsx`**
- Remove: `import SketchMotif from "@/components/SketchMotif";`
- Remove the two SketchMotif JSX lines (ripple-outline and pendant-outline)

**File: `src/app/about/page.tsx`**
- Remove: `import SketchMotif from "@/components/SketchMotif";`
- Remove the SketchMotif JSX line (tilde)

**File: `src/app/legal/refund-policy/page.tsx`**
- Remove: `import SketchMotif from "@/components/SketchMotif";`
- Remove the SketchMotif JSX line

**File: `src/app/legal/shipping-policy/page.tsx`**
- Same as above

**File: `src/app/legal/privacy-policy/page.tsx`**
- Same as above

**File: `src/app/legal/terms-of-service/page.tsx`**
- Same as above

**File: `src/components/Footer.tsx`**
Remove the tilde frieze SVG block at the top of the footer:
```tsx
      <div className="flex justify-center py-4 opacity-[0.06]" aria-hidden="true">
        <svg viewBox="0 0 400 20" fill="none" className="h-2 w-64">
          <path d="M10 12 Q50 2, 100 12 Q150 22, 200 12 Q250 2, 300 12 Q350 22, 390 8" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
```

**Do NOT delete the SketchMotif.tsx component file** - keep it for future use.

---

## Fix 9: Blue gradient at bottom of product collection section

**File:** `src/components/ProductShowcase.tsx`
**What:** Add a subtle blue gradient at the bottom of the collection section. This does two things: gives the glass product cards contrast against the cream bg, and creates a smooth visual bridge into the blue "How it's made" process strip below.

**Find the opening section tag (around line 33):**
```tsx
    <section className="relative overflow-hidden bg-surface px-6 py-section lg:py-section-lg">
```

**Add this immediately inside the section, as the first child before the heading div:**
```tsx
      {/* Gradient bridge to next blue section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(19, 70, 134, 0.04) 50%, rgba(19, 70, 134, 0.10) 100%)"
        }}
        aria-hidden="true"
      />
```

---

## Verification Checklist

1. `npm run build` - zero errors
2. Hero: no tilde sketch
3. Hero: sketches snap to straight on hover (fast, not sluggish)
4. Hero: no sketch overlaps the nav pill
5. Hero: "View Our Work" has visible blue outline
6. Homepage: brand statement on two lines
7. Homepage: no "Have a project in mind" section
8. Homepage: collection section has subtle blue gradient at bottom
9. Footer: all links turn coral on hover
10. Footer: no tilde frieze SVG
11. Process/About/Legal pages: no SketchMotif decorations
12. CursorGlow still working (the subtle lighter area - that's intentional)
