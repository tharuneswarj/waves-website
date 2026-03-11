// Product-specific content — design stories and specifications.
// This is now used as a FALLBACK ONLY for when metafields aren't set in Shopify.
// Primary source of truth: Shopify metafields (waves.* namespace).
// Run `node scripts/seed-metafields.js` to populate Shopify with the defaults below.

import type { ShopifyProduct } from "@/lib/shopify";

// ──────────────────────────────────────
// Metafield helpers
// ──────────────────────────────────────

/** The shared design story shown on every product page. */
export function getDesignStory(): string[] {
  return [
    "Every Waves lamp begins as parametric logic — a set of mathematical rules that define curvature, layer rhythm, and structural integrity. The form is not drawn; it is generated through computation and refined through judgment.",
    "The toolpath is where the real design happens. Unlike standard slicing software that treats every layer identically, we write custom G-code that varies speed, extrusion, and layer height to create surface texture and light diffusion patterns unique to each piece.",
    "After printing, each lamp is hand-finished — wired, assembled, and quality-checked. The base is fitted, the cord is measured, and the bulb is tested for the precise warmth we intend.",
  ];
}

/** Extract category metafield color swatches from product options. */
export function getShadeColours(
  product?: ShopifyProduct | null
): Record<string, string> {
  const colours: Record<string, string> = {};
  
  if (product?.options) {
    for (const option of product.options) {
      if (option.optionValues) {
        for (const val of option.optionValues) {
          if (val.swatch?.color) {
            colours[val.name] = val.swatch.color;
          }
        }
      }
    }
  }

  // Fallback to legacy metafield if category metafields aren't used yet
  if (Object.keys(colours).length === 0 && product?.shadeColours?.value) {
    try {
      const parsed = JSON.parse(product.shadeColours.value);
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      // ignore
    }
  }

  return colours;
}

/** Build the specs array from individual metafields. */
export function getProductSpecs(
  handle: string,
  product?: ShopifyProduct | null
): [string, string][] {
  const specs: [string, string][] = [];
  if (product) {
    if (product.dimensions?.value) specs.push(["Dimensions", product.dimensions.value]);
    if (product.weight?.value) specs.push(["Weight", product.weight.value]);
    if (product.material?.value) specs.push(["Material", product.material.value]);
    if (product.bulbSpec?.value) specs.push(["Bulb", product.bulbSpec.value]);
    if (product.cordLength?.value) specs.push(["Cord length", product.cordLength.value]);
    if (product.printTime?.value) specs.push(["Print time", product.printTime.value]);
    if (product.layerHeight?.value) specs.push(["Layer height", product.layerHeight.value]);
  }
  return specs;
}

/** Get usage & care from metafield. */
export function getUsageCare(product?: ShopifyProduct | null): string {
  return product?.usageCare?.value ?? "";
}

// ──────────────────────────────────────
// Hardcoded fallbacks
// ──────────────────────────────────────

interface DesignStory {
  paragraphs: string[];
}

const designStories: Record<string, DesignStory> = {
  ripple: {
    paragraphs: [
      "The Ripple began as a question about rhythm. What happens when a continuous curve is interrupted by deliberate density shifts — when the wall thickens and thins in a pattern that echoes the form's own geometry?",
      "The toolpath was written to vary extrusion rate along the height of the piece. Near the base, the walls are denser — more opaque, structurally grounded. As the form rises, extrusion thins gradually, allowing more light to pass through. The result is a vertical gradient of diffusion that no uniform wall thickness could produce.",
      "Seven iterations. The first three resolved the geometry. The next four refined the toolpath until the light behaviour matched the intent — warm and grounded at the base, soft and open at the top. Each version was printed, lit, observed, and adjusted.",
    ],
  },
  hourglass: {
    paragraphs: [
      "The Hourglass started with proportion. A form that narrows at its centre and expands at both ends — structurally challenging for 3D printing, visually distinctive in how it handles light.",
      "The pinch at the centre creates a natural division of light. The upper half diffuses upward, filling the space above. The lower half pools light downward onto the surface below. The narrowing also required custom structural support in the toolpath — the walls needed to thicken precisely where the geometry was most vulnerable.",
      "Eleven iterations before the waist felt right. Too narrow and the form looked fragile. Too wide and the light division disappeared. The final geometry balances visual tension with structural confidence — a form that looks considered from every angle.",
    ],
  },
};

const defaultDesignStory: DesignStory = {
  paragraphs: [
    "Every Waves lamp begins as parametric logic — a set of mathematical rules that define curvature, layer rhythm, and structural integrity. The form is not drawn; it is generated through computation and refined through judgment.",
    "The toolpath is where the real design happens. Unlike standard slicing software that treats every layer identically, we write custom G-code that varies speed, extrusion, and layer height to create surface texture and light diffusion patterns unique to each piece.",
    "After printing, each lamp is hand-finished — wired, assembled, and quality-checked. The base is fitted, the cord is measured, and the bulb is tested for the precise warmth we intend.",
  ],
};


