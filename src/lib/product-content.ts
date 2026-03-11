// Product-specific content — design stories and specifications.
// This data lives here until Shopify metafields are populated,
// at which point it can be pulled dynamically.

interface DesignStory {
  paragraphs: string[];
}

interface ProductSpecs {
  [label: string]: string;
}

// ──────────────────────────────────────
// Design Stories (Item 7)
// ──────────────────────────────────────

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

export function getDesignStory(handle: string): string[] {
  return (designStories[handle] ?? defaultDesignStory).paragraphs;
}

// ──────────────────────────────────────
// Product Specifications (Item 8)
// ──────────────────────────────────────

const productSpecs: Record<string, [string, string][]> = {
  ripple: [
    ["Dimensions", "H 200mm × W 80mm"],
    ["Weight", "~300g"],
    ["Material", "PLA (plant-based polymer)"],
    ["Bulb", "E14, max 22W LED (warm white recommended)"],
    ["Cord length", "1.8m with inline switch"],
    ["Base", "Standard / CNC wood base"],
    ["Print time", "12h 20m"],
    ["Layer height", "Varies 1mm – 2mm"],
  ],
  hourglass: [
    ["Dimensions", "H 180mm × W 80mm"],
    ["Weight", "~280g"],
    ["Material", "PLA (plant-based polymer)"],
    ["Bulb", "E14, max 22W LED (warm white recommended)"],
    ["Cord length", "1.8m with inline switch"],
    ["Base", "Standard / CNC wood base"],
    ["Print time", "08h 42m"],
    ["Layer height", "Varies 1mm – 2mm"],
  ],
};

const defaultSpecs: [string, string][] = [
  ["Dimensions", "H 280mm × W 180mm"],
  ["Weight", "~450g"],
  ["Material", "PLA (plant-based polymer)"],
  ["Bulb", "E27, max 12W LED (warm white recommended)"],
  ["Cord length", "1.8m with inline switch"],
  ["Base", "Standard / CNC wood base"],
  ["Print time", "19h 42m"],
  ["Layer height", "0.16mm"],
];

export function getProductSpecs(handle: string): [string, string][] {
  return productSpecs[handle] ?? defaultSpecs;
}
