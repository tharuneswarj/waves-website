#!/usr/bin/env node
// scripts/seed-metafields.js
// CommonJS — run with: node scripts/seed-metafields.js
// Reads .env.local automatically via node --env-file=.env.local

"use strict";

// ── Read env (try process.env first, then parse .env.local manually) ──────────
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN  = process.env.SHOPIFY_ADMIN_API_TOKEN;
// Admin API requires the .myshopify.com domain — NOT your custom storefront domain
const MYSHOPIFY_DOMAIN = process.env.SHOPIFY_MYSHOPIFY_DOMAIN;

if (!DOMAIN || !TOKEN || !MYSHOPIFY_DOMAIN) {
  console.error(
    "❌  Missing env vars. Need in .env.local:\n" +
    "    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN\n" +
    "    SHOPIFY_ADMIN_API_TOKEN\n" +
    "    SHOPIFY_MYSHOPIFY_DOMAIN   (e.g. your-store.myshopify.com)"
  );
  process.exit(1);
}

const ADMIN_URL = `https://${MYSHOPIFY_DOMAIN}/admin/api/2025-01/graphql.json`;

// ──────────────────────────────────────────────────────────
// PRODUCT DATA  — key = your Shopify product handle
// ──────────────────────────────────────────────────────────

const PRODUCT_DATA = {
  "the-hour-glass-table-lamp": {
    design_story: [
      "The Hourglass started with proportion. A form that narrows at its centre and expands at both ends — structurally challenging for 3D printing, visually distinctive in how it handles light.",
      "The pinch at the centre creates a natural division of light. The upper half diffuses upward, filling the space above. The lower half pools light downward onto the surface below. The narrowing also required custom structural support in the toolpath — the walls needed to thicken precisely where the geometry was most vulnerable.",
      "Eleven iterations before the waist felt right. Too narrow and the form looked fragile. Too wide and the light division disappeared. The final geometry balances visual tension with structural confidence — a form that looks considered from every angle.",
    ],
    shade_colours: { Chalk: "#F5F0E8", Sand: "#C8A882", Amber: "#D4824A", Smoke: "#6B6560" },
    usage_care:
      "Use an E14 LED bulb, warm white, max 22W. The shade is 3D-printed PLA — keep away from prolonged direct sunlight and heat sources above 50°C. Clean with a soft dry cloth only. Always switch off before changing the bulb.",
    dimensions: "H 180mm × W 80mm",
    weight: "~280g",
    material: "PLA (plant-based polymer)",
    bulb_spec: "E14, max 22W LED (warm white recommended)",
    cord_length: "1.8m with inline switch",
    print_time: "08h 42m",
    layer_height: "Varies 1mm – 2mm",
  },

  ripple: {
    design_story: [
      "The Ripple began as a question about rhythm. What happens when a continuous curve is interrupted by deliberate density shifts — when the wall thickens and thins in a pattern that echoes the form's own geometry?",
      "The toolpath was written to vary extrusion rate along the height of the piece. Near the base, the walls are denser — more opaque, structurally grounded. As the form rises, extrusion thins gradually, allowing more light to pass through. The result is a vertical gradient of diffusion that no uniform wall thickness could produce.",
      "Seven iterations. The first three resolved the geometry. The next four refined the toolpath until the light behaviour matched the intent — warm and grounded at the base, soft and open at the top. Each version was printed, lit, observed, and adjusted.",
    ],
    shade_colours: { Chalk: "#F5F0E8", Sand: "#C8A882", Amber: "#D4824A", Smoke: "#6B6560" },
    usage_care:
      "Use an E14 LED bulb, warm white, max 22W. The shade is 3D-printed PLA — keep away from prolonged direct sunlight and heat sources above 50°C. Clean with a soft dry cloth only. Always switch off before changing the bulb.",
    dimensions: "H 200mm × W 80mm",
    weight: "~300g",
    material: "PLA (plant-based polymer)",
    bulb_spec: "E14, max 22W LED (warm white recommended)",
    cord_length: "1.8m with inline switch",
    print_time: "12h 20m",
    layer_height: "Varies 1mm – 2mm",
  },
};

// ──────────────────────────────────────────────────────────
// METAFIELD DEFINITIONS
// ──────────────────────────────────────────────────────────

const METAFIELD_DEFINITIONS = [
  { name: "Design Story",       namespace: "waves", key: "design_story", type: "json",                    ownerType: "PRODUCT", description: "Array of paragraphs describing the design process" },
  { name: "Shade Colours",      namespace: "waves", key: "shade_colours", type: "json",                   ownerType: "PRODUCT", description: "JSON map of shade name → hex colour" },
  { name: "Usage & Care",       namespace: "waves", key: "usage_care",   type: "single_line_text_field",  ownerType: "PRODUCT", description: "Usage and care copy for the product accordion" },
  { name: "Dimensions",         namespace: "waves", key: "dimensions",   type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. H 180mm × W 80mm" },
  { name: "Weight",             namespace: "waves", key: "weight",       type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. ~280g" },
  { name: "Material",           namespace: "waves", key: "material",     type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. PLA (plant-based polymer)" },
  { name: "Bulb Specification", namespace: "waves", key: "bulb_spec",    type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. E14, max 22W LED" },
  { name: "Cord Length",        namespace: "waves", key: "cord_length",  type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. 1.8m with inline switch" },
  { name: "Print Time",         namespace: "waves", key: "print_time",   type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. 08h 42m" },
  { name: "Layer Height",       namespace: "waves", key: "layer_height", type: "single_line_text_field",  ownerType: "PRODUCT", description: "e.g. Varies 1mm – 2mm" },
];

// ──────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────

async function adminFetch(query, variables = {}) {
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join("\n"));
  return json.data;
}

async function createMetafieldDefinition(def) {
  const data = await adminFetch(
    `mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition { id name key }
        userErrors { field message code }
      }
    }`,
    { definition: def }
  );
  const errors = data.metafieldDefinitionCreate.userErrors;
  const realErrors = errors.filter((e) => e.code !== "TAKEN_FOR_FIELD");
  if (realErrors.length > 0) {
    console.warn(`  ⚠️  ${def.key}:`, realErrors.map((e) => e.message).join(", "));
  } else if (errors.some((e) => e.code === "TAKEN_FOR_FIELD")) {
    console.log(`  ✓  ${def.key} — already exists`);
  } else {
    console.log(`  ✓  Created: ${def.key}`);
  }
}

async function getProductId(handle) {
  const data = await adminFetch(
    `query($handle: String!) { productByHandle(handle: $handle) { id title } }`,
    { handle }
  );
  if (!data.productByHandle) {
    console.warn(`  ⚠️  Product not found: "${handle}" — check the handle in Shopify Admin`);
    return null;
  }
  console.log(`  Found: ${data.productByHandle.title} (${data.productByHandle.id})`);
  return data.productByHandle.id;
}

async function setMetafields(productId, handle, d) {
  const metafields = [
    { namespace: "waves", key: "design_story", type: "json",                   ownerId: productId, value: JSON.stringify(d.design_story) },
    { namespace: "waves", key: "shade_colours", type: "json",                  ownerId: productId, value: JSON.stringify(d.shade_colours) },
    { namespace: "waves", key: "usage_care",    type: "single_line_text_field", ownerId: productId, value: d.usage_care },
    { namespace: "waves", key: "dimensions",    type: "single_line_text_field", ownerId: productId, value: d.dimensions },
    { namespace: "waves", key: "weight",        type: "single_line_text_field", ownerId: productId, value: d.weight },
    { namespace: "waves", key: "material",      type: "single_line_text_field", ownerId: productId, value: d.material },
    { namespace: "waves", key: "bulb_spec",     type: "single_line_text_field", ownerId: productId, value: d.bulb_spec },
    { namespace: "waves", key: "cord_length",   type: "single_line_text_field", ownerId: productId, value: d.cord_length },
    { namespace: "waves", key: "print_time",    type: "single_line_text_field", ownerId: productId, value: d.print_time },
    { namespace: "waves", key: "layer_height",  type: "single_line_text_field", ownerId: productId, value: d.layer_height },
  ];

  const data = await adminFetch(
    `mutation SetMetafields($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { key value }
        userErrors { field message }
      }
    }`,
    { metafields }
  );
  const errors = data.metafieldsSet.userErrors;
  if (errors.length > 0) {
    console.error(`  ❌  Errors on ${handle}:`, errors);
  } else {
    console.log(`  ✓  Set ${data.metafieldsSet.metafields.length} metafields`);
  }
}

// ──────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔧  Waves Metafield Seed Script`);
  console.log(`    Store: ${DOMAIN}\n`);

  console.log("📐  Step 1: Creating metafield definitions...");
  for (const def of METAFIELD_DEFINITIONS) {
    await createMetafieldDefinition(def);
  }

  console.log("\n📦  Step 2: Setting metafield values per product...");
  for (const [handle, data] of Object.entries(PRODUCT_DATA)) {
    console.log(`\n  → ${handle}`);
    const id = await getProductId(handle);
    if (!id) continue;
    await setMetafields(id, handle, data);
  }

  console.log("\n✅  Done! Verify in Shopify Admin → Products → [product] → Metafields\n");
}

main().catch((err) => {
  console.error("❌  Script error:", err.message);
  process.exit(1);
});
