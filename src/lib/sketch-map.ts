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
