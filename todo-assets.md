# Waves Website — Asset Todo

*Updated: 13 March 2026*

Tasks for Tharun to complete manually before domain cutover.
Photography status updated based on live site review.

---

## Photography — What's Done ✓

Real Shopify images confirmed live on the staging site:

- **Ripple — all four shades** (chalk, sand, amber, smoke) — lit product shots ✓
- **Ripple — detail/zoomed shots** for each shade ✓  
- **Ripple — base shot** (chalk with printed base, black cable) ✓
- **Hourglass — dark/chalk variant** ✓

This is enough to take the site live. Everything below improves it further.

---

## Photography — Still Needed

Priority order. Do these before or shortly after domain cutover.

### 1. Salem Office Installation (highest priority)

The homepage installation section and the Studio case study both have placeholder grey boxes. This is the most visible gap on the site.

| Shot | Filename | Dimensions | Notes |
|---|---|---|---|
| Full installation wide | `salem-wide.jpg` | 2400×1030px (21:9) | All 5 pendants, shot from the side or end of the table. Pendants on. |
| Single pendant close | `salem-detail-single.jpg` | 1200×1200px (1:1) | One Ripple pendant from the installation, showing hardware and form in context. |
| Room from doorway | `salem-context-meeting.jpg` | 1600×1200px (4:3) | The meeting room as seen from the entrance. Show spatial impact. |

**Where to add once shot:**
- `/public/images/projects/salem/`
- Update `src/lib/projects.ts` — replace `heroImage: null` with `{ url: "/images/projects/salem/salem-wide.jpg", alt: "Salem office installation — 5 Ripple pendants" }`
- Update `gallery: []` with the detail and context shots

---

### 2. Hourglass — additional shades

Currently only the dark/chalk Hourglass variant is live. Sand, amber, and smoke variants needed to match Ripple coverage.

| Shot | Filename | Location |
|---|---|---|
| Hourglass — Sand shade | `hourglass-sand.jpg` | `/public/images/products/hourglass/` or upload to Shopify |
| Hourglass — Amber shade | `hourglass-amber.jpg` | same |
| Hourglass — Smoke shade | `hourglass-smoke.jpg` | same |
| Hourglass — detail/zoomed | `hourglass-detail-[shade].jpg` | same, for each shade |

Upload to Shopify Admin → Products → The Hour Glass → Media. Tag alt text correctly:
```
The Hourglass lamp in Sand shade [sand]
The Hourglass lamp in Amber shade [amber]
```

---

### 3. Process photography

For the Process page and the homepage "How it's made" strip. All four process strip sections currently show placeholder boxes.

| Shot | Filename | Dimensions | Notes |
|---|---|---|---|
| Grasshopper definition | `process-grasshopper.jpg` | 1200×1200px | Screenshot of the actual node graph. Real tool, not staged. |
| Toolpath visualisation | `process-toolpath.jpg` | 1200×1200px | G-code preview or Grasshopper toolpath preview showing path variation. |
| Printer mid-print | `process-printing.jpg` | 1200×1200px | Bambu A1 with a lamp shade partially built on the bed. Honest, not glamorous. |
| Hand assembly | `process-assembly.jpg` | 1200×1200px | Hands wiring, fitting base, or inspecting. Show the human element. |
| Lamp first switch-on | `process-light-on.jpg` | 1200×1200px | Completed lamp lit for the first time. Warm glow, visible diffusion. |

**Where to add:** `/public/images/process/`

Then in `src/app/process/page.tsx` and `src/app/page.tsx` replace `<PlaceholderImage>` components with Next.js `<Image src="/images/process/[filename]" ... />`.

---

### 4. Context / lifestyle shots

These are not blocking anything but will significantly improve conversion for D2C customers.

| Shot | Notes |
|---|---|
| Ripple on a bedside table, switched on | Warm ambient room, lamp contributing to lighting |
| Hourglass on a desk or shelf | Switched off, real space, minimal styling |
| Both lamps together in a room | Shows scale relationship between the two products |

---

### 5. Compare pair — for Process page slider

The CompareSlider component exists but has placeholder images. Two shots, same angle, same lighting:

| Shot | Filename | Notes |
|---|---|---|
| Standard vase mode print | `compare-vasemode.jpg` | A generic 3D printed vase mode object — plain cylinder or similar |
| Waves toolpath print | `compare-waves.jpg` | A Ripple or Hourglass at the same angle |

Both: 1600×900px, 16:9.

---

## Shopify Admin Tasks

### Fix product image alt texts (important — do before cutover)

Currently image alt texts contain only the raw filter tags, e.g. `[chalk]`. Screen readers read these out loud. Update every product image alt in Shopify Admin → Products → Media:

Format: `[Descriptive name] [tags]`

Examples:
```
Ripple lamp in Chalk shade [chalk]
Ripple lamp in Smoke shade, zoomed detail [smoke]
Ripple lamp in Sand shade, printed base, black cable [sand|printed|black]
The Hourglass lamp in Chalk shade [chalk]
```

### Verify pricing

Confirm both products show Rs 3,999 (standard) in Shopify Admin → Products → Variants. The live site is showing Rs 3,999, which differs from the Rs 4,999 in older brand docs — confirm which is correct.

---

## Domain Cutover Checklist

When photography is done and the site has been reviewed on the staging URL:

1. **Add domain in Vercel** — Project Settings → Domains → Add `waves.company`
2. **Vercel will show DNS instructions** — either an A record or CNAME
3. **Update DNS at your registrar** — wherever waves.company is registered, update the record Vercel specifies
4. **Wait for propagation** — usually 10–30 minutes, up to 48 hours
5. **Vercel handles SSL automatically** — HTTPS works immediately once DNS propagates
6. **Test** — open waves.company in a fresh browser tab, confirm the site loads, Shopify cart works, contact form submits

After cutover: submit `https://waves.company/sitemap.xml` to Google Search Console.