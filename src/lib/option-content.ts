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
  /** Short tag used for image filtering in alt texts (e.g., 'printed'). */
  tag?: string;
}

export const OPTION_CONTENT: Record<string, OptionContent> = {
  // ── Lamp Base ─────────────────────────────────────────────────────────
  "Printed Base (Digitally crafted - matches the shade)": {
    label: "Printed Base",
    subtitle: "3D printed PLA · Matches your shade",
    tag: "printed",
  },
  "Teak Wood Base (CNC milled - hand finished)": {
    label: "Teak Wood Base",
    subtitle: "CNC milled · Hand finished",
    tag: "wood",
  },

  // ── Cable ─────────────────────────────────────────────────────────────
  Black: {
    label: "Black",
    subtitle: "Braided black linen",
    tag: "black",
  },
  Linen: {
    label: "Linen",
    subtitle: "Natural braided linen",
    tag: "linen",
  },
};

/**
 * Look up display content for a Shopify option value.
 * Falls back to the raw Shopify string with no subtitle if no entry exists.
 */
export function getOptionContent(value: string): OptionContent {
  return OPTION_CONTENT[value] ?? { label: value, subtitle: "" };
}

/**
 * Gets the short tag used for image filtering in alt texts.
 * Uses the explicitly defined tag, or falls back to the lowercase raw value.
 */
export function getOptionTag(value: string | null): string | null {
  if (!value) return null;
  const content = OPTION_CONTENT[value];
  if (content?.tag) return content.tag;
  return value.toLowerCase();
}
