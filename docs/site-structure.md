# Waves Company - Site Structure & Page Layouts

Complete page-by-page specification for waves.company.
Custom Next.js frontend + Shopify Storefront API backend.

---

## Navigation

**Header (persistent across all pages):**
- Wave mark logo (links to /)
- Nav links: Shop, Studio, Process, About, Contact
- Cart icon with item count (Shopify cart state)
- Mobile: hamburger menu with full-screen overlay

**Footer (persistent across all pages):**
- Wave mark + "waves company" wordmark
- Nav links repeated
- Instagram link
- Contact email
- Tagline: "Still printing. Still curious."
- Copyright + "Made in India"
- DM Mono for technical details

---

## Page 01 - Homepage

**Route:** `/`
**Audience:** Both D2C and B2B
**Priority:** Launch essential

**Purpose:** The front door. Establishes Waves as a design studio, not just a shop. Forks into D2C (Shop) and B2B (Studio) paths naturally without making anyone feel like they're on the wrong site.

### Section 1: Hero

Full-viewport section. Deep blue background or cinematic product shot showing light diffusion.

- Animated wave mark (subtle parametric motion - Three.js or CSS)
- Headline in DM Serif Display: "Light, algorithmically crafted."
- Subline in DM Sans Light: "Lighting objects designed through code, material honesty, and human touch."
- Two CTAs side by side:
  - "Explore the Collection" (coral button - links to /shop)
  - "View Our Work" (outlined button - links to /studio)

Tech: Three.js or CSS animation for wave mark. Lazy-loaded hero image/video. Consider a looping video of a lamp's light diffusing as background.

### Section 2: Brand Statement

Cream background. Generous whitespace.

- 2-3 lines of positioning text in DM Sans Light, large (20-24px)
- Example: "Objects deserve the same intellectual rigour as buildings. Light is not decoration - it is atmosphere."
- No CTA. Let the words breathe.

Tech: Static. Scroll-triggered fade-in with Framer Motion.

### Section 3: Featured Products

Two products displayed large - not a grid of thumbnails.

- Ripple and Hourglass, each taking roughly half the viewport width
- Large product photography (not cropped thumbnails)
- Hover state: crossfade to alternate angle or lit version
- Product name in DM Sans Medium
- Price in DM Mono
- Links to individual product pages

Tech: CSS grid. Hover crossfade. Shopify Storefront API for live pricing and availability.

### Section 4: Process Strip

Horizontal section showing 3-4 frames of the making process.

- Code > Print > Finish > Light
- Each frame: process photograph + short DM Mono caption
  - "Parametric logic in Grasshopper"
  - "19h 42m print time"
  - "Hand-finished. Carefully assembled."
  - "Diffused. Calibrated. Warm."
- Links to /process for the full story

Tech: Horizontal scroll on mobile. Parallax or scroll-triggered on desktop. Intersection Observer for animations.

### Section 5: Installation Highlight

One large installation photograph (Salem office once professionally shot).

- Full-width or near full-width image
- Overlay text: project name, type, location
- Brief caption: "5 Ripple pendants in horizontal formation. Designed for a corporate office in Salem."
- CTA: "See the full project" linking to /studio/salem

Tech: Static image with text overlay. Lazy loaded.

### Section 6: Closing Statement + Footer

- Short closing line before footer: "Designed with computation. Decided with judgment."
- Then the persistent footer

---

## Page 02 - Shop

**Route:** `/shop`
**Audience:** D2C
**Priority:** Launch essential

**Purpose:** Product catalogue. Currently 2 products - needs to feel curated, not empty.

### Section 1: Collection Header

- Headline in DM Serif Display: "The Collection"
- Subline in DM Sans Light: "Each piece is printed over many hours. Good light is not rushed."
- No hero image - let products be the visual

### Section 2: Product Grid

- 2-column layout on desktop, 1-column on mobile
- Large product images (minimum 600px wide)
- Product name: DM Sans Medium
- Price: DM Mono
- Hover: shows alternate angle
- When catalogue grows, add filter tabs: All / Table / Pendant / Wall

Tech: Shopify Storefront API (GraphQL). Fetch all products from collection. Dynamic rendering.

### Section 3: Custom Work Banner

Below the product grid:

- "Looking for something specific?"
- "We design custom lighting for architects, designers, and spaces that demand specificity."
- CTA: "Start a conversation" linking to /contact

---

## Page 03 - Product Detail Page

**Route:** `/shop/[handle]`
**Audience:** D2C
**Priority:** Launch essential

**Purpose:** Where the sale happens. Combines beautiful product presentation with the process story that justifies ₹4,999-5,999.

### Section 1: Product Hero (above fold)

Split layout:
- **Left (60%):** Image gallery
  - Main image (large)
  - Thumbnail strip below or alongside
  - 4-6 images: product alone, lit in dark, in a room context, layer detail close-up, base detail
  - Click to zoom/lightbox
- **Right (40%):** Product info
  - Product name: DM Serif Display
  - Price: DM Mono, clear
  - Variant selector: Base type (Standard / CNC Wood Base)
  - "Add to Cart" button (coral)
  - Brief 2-line description
  - Shipping info in small text

Tech: Shopify Storefront API for product data, variants, pricing. Cart API for add-to-cart.

### Section 2: 3D Model Viewer

Interactive 3D model. User can rotate, zoom. Subtle lighting simulation.

- Tab or toggle: "View in 3D"
- Auto-rotates slowly when idle
- Touch/drag to rotate on mobile

Tech: React Three Fiber with GLTF model. Or Shopify's native model viewer if using their 3D pipeline.

### Section 3: Design Story

Scrolling narrative section. This is the content that converts browsers into buyers.

- "How the [Product Name] was designed"
- 3-4 paragraphs covering:
  - The computational logic behind the form
  - What the toolpath does differently
  - How many iterations it went through
  - What the light behaviour is and why
- Interspersed with process images
- Print time in DM Mono: "Print time: 19h 42m"
- Iteration count: "Iteration 07"

Tech: Static content stored as Shopify metafields or CMS. Scroll-triggered section reveals.

### Section 4: Technical Specifications

Clean spec table in DM Mono:

- Dimensions (H x W)
- Weight
- Material
- Bulb type and wattage
- Cord length
- Base material
- Print time
- Layer height

Tech: Shopify metafields mapped to a spec component.

### Section 5: In Context

2-3 photographs of the lamp in a real room. Real spaces, real light, real shadow.

Tech: Static image grid. Lazy loaded.

---

## Page 04 - Studio

**Route:** `/studio`
**Audience:** B2B
**Priority:** Launch essential

**Purpose:** Portfolio and custom capabilities. Where architects and designers land. Replaces the studio deck for digital contexts.

### Section 1: Studio Introduction

- Headline: DM Serif Display: "Custom Lighting for Architects & Designers"
- Body: "We design and fabricate custom lighting for spaces that demand specificity. Pendant configurations, scale variations, bespoke forms - adapted to your brief."

### Section 2: Project Grid

Large image cards for each completed project:

- Project hero image
- Project name: DM Sans Medium
- Type description: DM Sans Regular (e.g., "Office Installation - 5x Ripple Pendants")
- Location: DM Mono
- Click opens full case study page

Currently: Salem Office (once photographed). Chennai Residence (on completion).
Placeholder state needed for when only 1-2 projects exist.

Tech: CMS-driven content (Sanity or Shopify Metaobjects).

### Section 3: Capabilities

3-4 capability cards with one image each:

- Pendant configurations (single and clustered)
- Scale variations (table to large-format)
- Custom forms (bespoke geometry from brief)
- Material exploration (different filaments and finishes)

### Section 4: Brief CTA

- "Have a project in mind?"
- "Tell us about the space. We'll tell you what's possible."
- CTA button linking to /contact with brief form pre-selected

---

## Page 05 - Project Case Study

**Route:** `/studio/[slug]`
**Audience:** B2B
**Priority:** Phase 2 (build template now, populate as projects complete)

**Purpose:** Deep dive into a specific installation. The link an architect sends to their client.

### Section 1: Hero Image

Full-width installation photograph with overlay:
- Project name
- Location
- Year
- Type (e.g., "5x Ripple Pendant - Horizontal Configuration")

### Section 2: Brief & Response

3-4 paragraphs:
- What the brief was
- What the spatial challenge was
- How Waves responded
- Written in studio voice - measured, process-focused

### Section 3: Project Gallery

8-12 images in a masonry or structured grid:
- Wide installation views
- Detail shots of individual pieces
- Process shots
- Context shots showing the space

With lightbox on click.

### Section 4: Technical Details

DM Mono spec block:
- Configuration
- Individual piece dimensions
- Total installation dimensions
- Materials
- Print time per piece
- Total project timeline

### Section 5: Next Project

Link to the next case study to keep browsing.

---

## Page 06 - Process

**Route:** `/process`
**Audience:** Both
**Priority:** Phase 2 (but high impact - build early if possible)

**Purpose:** The differentiator. Explains how Waves works in a way both homeowners and architects appreciate.

### Section 1: Opening

- DM Serif Display: "Most 3D printed lighting is made in vase mode."
- DM Sans Light: "We took a different approach."

### Section 2: Step-by-Step

Scrolling narrative with large visuals. 5 stages:

1. **Computation** - parametric modeling in Grasshopper. Screenshots of the algorithm. "Form is generated through logic, not drawn by hand."
2. **Toolpath** - custom G-code. Side-by-side: standard slicer output vs Waves toolpath. "Every layer is a design decision."
3. **Printing** - machine running. Time-lapse or photograph. Print time callout in DM Mono.
4. **Finishing** - hand assembly, wiring, base fitting. "Code defines the structure. Human hands give it nuance."
5. **Light** - the final object, switched on. The payoff.

Tech: Scroll-triggered sections with Framer Motion. Parallax images. Embedded video clips if available.

### Section 3: The Difference

Before/after comparison: standard vase mode print vs Waves toolpath result.

Tech: Image slider component (drag to compare).

### Section 4: Materials

Brief section on material choices:
- What materials are used
- Why they're chosen
- Material specs in DM Mono

---

## Page 07 - About

**Route:** `/about`
**Audience:** Both
**Priority:** Launch essential

**Purpose:** The origin story. Builds emotional foundation for both D2C buyer and B2B specifier.

### Section 1: Origin Story

The five-chapter long form narrative (from origin-story.md, Version 01):

1. **Curiosity** - computational design led to a 3D printer
2. **The Lamp** - a gift for a mother. Origami form. CNC base. Hand-wired.
3. **Going Deeper** - past the slicer, into the G-code
4. **The Gap** - what else existed was mostly vase mode
5. **The First Objects** - Hourglass and Ripple. January 2026.

Each chapter break has a supporting image or visual.

Tech: Scroll-based storytelling. Intersection Observer for chapter transitions. Framer Motion for reveals.

### Section 2: The Name

- "The tilde. A small symbol on the keyboard - shaped like a wave."
- Could include a subtle animation of ~ transforming into the wave mark

Tech: SVG/CSS animation.

### Section 3: The Studio

- Founded by an architect and computational designer
- Connection to Koodu Architecture
- Small studio. Building carefully.
- No full bio - just enough for credibility

### Section 4: What We Believe

Pull quotes from essence doc displayed as a series of short statements in DM Serif Display:

- "Objects deserve the same intellectual rigour as buildings."
- "Light is not decoration - it is atmosphere."
- "We design with computation. We decide with judgment."

Tech: Static with scroll-triggered fade-in.

---

## Page 08 - Contact

**Route:** `/contact`
**Audience:** Both
**Priority:** Launch essential

**Purpose:** Two distinct paths without feeling like a corporate switchboard.

### Section 1: Contact Selector

Two cards side by side:

**Card A: "I'd like to buy a lamp"**
- Opens simple enquiry form
- Or links to /shop if they just want to browse

**Card B: "I have a project in mind"**
- Opens structured brief form

### Section 2: General Enquiry Form

Fields:
- Name
- Email
- Message (textarea)
- Submit button

### Section 3: Project Brief Form

Fields:
- Name
- Firm / Company
- Email
- Phone (optional)
- Project type: Residential / Commercial / Hospitality / Retail / Other
- Project stage: Concept / Design Development / Construction / Completed Space
- Brief description (textarea)
- Timeline
- Budget range: Under ₹25K / ₹25K-50K / ₹50K-1L / ₹1L+ / Not sure yet
- Submit button

### Section 4: Direct Contact

Below both forms:
- Email: hello@waves.company (or actual email)
- Instagram: @waves_company_
- "We typically respond within 24 hours."

Tech: Form submissions via Formspree, or API route that sends to email/Notion.

---

## Cart & Checkout

**Cart:** Slide-out drawer from right side. Shows items, quantities, variant, price. "Continue Shopping" and "Checkout" buttons.

**Checkout:** Redirects to Shopify's hosted checkout. Keeps the purchase flow secure and reliable without building custom checkout.

Tech: Shopify Cart API (REST or GraphQL). Cart state managed in React context or Zustand.

---

## SEO & Metadata

Every page needs:
- Unique title tag (format: "Page Name - Waves Company")
- Meta description (unique per page, under 160 characters)
- Open Graph image (product image for shop pages, brand image for others)
- Structured data (Product schema for shop pages)

---

## Performance Targets

- Lighthouse score: 90+ across all categories
- LCP under 2.5s
- CLS under 0.1
- All images in WebP/AVIF via next/image
- Font loading: swap display for DM Sans/Mono, optional for DM Serif Display
