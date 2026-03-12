// Parses alt text tags and filters product images by current variant selections.
// Tag format: "Alt text description [tag1|tag2|tag3]"
// Images with no tags are always shown.

import { getOptionTag } from "./option-content";

export interface ImageTags {
  shade: string | null;   // chalk | sand | amber | smoke
  base: string | null;    // printed | wood
  cable: string | null;   // black | linen
}

/** Parse tags from the end of an alt text string. */
export function parseImageTags(altText: string | null): ImageTags {
  const result: ImageTags = { shade: null, base: null, cable: null };
  if (!altText) return result;

  const match = altText.match(/\[([^\]]+)\]$/);
  if (!match) return result;

  const tags = match[1].toLowerCase().split("|").map(t => t.trim());

  const SHADE_VALUES = ["chalk", "sand", "amber", "smoke"];
  const BASE_VALUES = ["printed", "wood"];
  const CABLE_VALUES = ["black", "linen"];

  for (const tag of tags) {
    if (SHADE_VALUES.includes(tag)) result.shade = tag;
    else if (BASE_VALUES.includes(tag)) result.base = tag;
    else if (CABLE_VALUES.includes(tag)) result.cable = tag;
  }

  return result;
}

export interface ActiveSelections {
  shade: string | null;
  base: string | null;
  cable: string | null;
}

/**
 * Returns true if an image should be shown given the current selections.
 * An image is shown if:
 * - It has no tags (always shown), OR
 * - All its non-null tags match the corresponding active selection
 */
export function imageMatchesSelections(
  altText: string | null,
  selections: ActiveSelections
): boolean {
  const tags = parseImageTags(altText);
  const hasAnyTag = tags.shade !== null || tags.base !== null || tags.cable !== null;

  // Untagged images always show
  if (!hasAnyTag) return true;

  const selectedShadeTag = getOptionTag(selections.shade);
  const selectedBaseTag = getOptionTag(selections.base);
  const selectedCableTag = getOptionTag(selections.cable);

  // If shade not yet selected, show everything
  if (selections.shade === null) return true;

  // Shade tag must match if present
  if (tags.shade !== null && tags.shade !== selectedShadeTag) return false;

  // If base not yet selected, stop here — show shade-matched images
  if (selections.base === null) return true;

  // Base tag must match if present
  if (tags.base !== null && tags.base !== selectedBaseTag) return false;

  // If cable not yet selected, stop here — show shade+base matched images
  if (selections.cable === null) return true;

  // Cable tag must match if present
  if (tags.cable !== null && tags.cable !== selectedCableTag) return false;

  return true;
}
