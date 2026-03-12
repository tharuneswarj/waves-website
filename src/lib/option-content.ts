/**
 * option-content.ts
 *
 * Maps exact Shopify option value strings → display label + subtitle.
 * Edit this file when adding new products or changing option descriptions.
 * Keys must exactly match the option value strings in Shopify Admin.
 */

export interface OptionContent {
  /** Short display name shown as the button headline. */
  label: string;
  /** Descriptive caption shown in small mono text below the label. */
  subtitle: string;
}

export const OPTION_CONTENT: Record<string, OptionContent> = {
  // ── Lamp Base ─────────────────────────────────────────────────────────
  "Printed Base (Digitally crafted - matches the shade)": {
    label: "Printed Base",
    subtitle: "3D printed PLA · Matches your shade",
  },
  "Teak Wood Base (CNC milled - hand finished)": {
    label: "Teak Wood Base",
    subtitle: "CNC milled · Hand finished",
  },

  // ── Cable ─────────────────────────────────────────────────────────────
  Black: {
    label: "Black",
    subtitle: "Braided black linen",
  },
  Linen: {
    label: "Linen",
    subtitle: "Natural braided linen",
  },
};

/**
 * Look up display content for a Shopify option value.
 * Falls back to the raw Shopify string with no subtitle if no entry exists.
 */
export function getOptionContent(value: string): OptionContent {
  return OPTION_CONTENT[value] ?? { label: value, subtitle: "" };
}
