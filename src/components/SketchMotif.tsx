interface SketchMotifProps {
  /** Which decorative SVG to show */
  variant: "tilde" | "ripple-outline" | "pendant-outline" | "grid-dots";
  /** CSS positioning class */
  className?: string;
  /** Opacity 0-1 */
  opacity?: number;
}

const motifs: Record<string, string> = {
  tilde: `<svg viewBox="0 0 70 35" fill="none" stroke="#ED3F27" stroke-width="1.5" stroke-linecap="round"><path d="M5 20 Q18 5, 35 18 Q52 31, 65 15"/></svg>`,
  "ripple-outline": `<svg viewBox="0 0 60 80" fill="none" stroke="#ED3F27" stroke-width="1" stroke-linecap="round" opacity="0.5"><ellipse cx="30" cy="10" rx="18" ry="5"/><path d="M12 10 C12 10, 9 55, 15 62 Q30 75, 45 62 C51 55, 48 10, 48 10"/><path d="M16 28 Q30 22, 44 28" opacity="0.4"/><path d="M14 40 Q30 34, 46 40" opacity="0.3"/></svg>`,
  "pendant-outline": `<svg viewBox="0 0 40 60" fill="none" stroke="#ED3F27" stroke-width="1" stroke-linecap="round" opacity="0.5"><line x1="20" y1="0" x2="20" y2="15"/><path d="M8 18 Q8 18, 5 45 Q5 50, 20 52 Q35 50, 35 45 Q32 18, 32 18"/></svg>`,
  "grid-dots": `<svg viewBox="0 0 80 80" fill="#ED3F27" opacity="0.15"><circle cx="10" cy="10" r="1.5"/><circle cx="30" cy="10" r="1.5"/><circle cx="50" cy="10" r="1.5"/><circle cx="70" cy="10" r="1.5"/><circle cx="10" cy="30" r="1.5"/><circle cx="30" cy="30" r="1.5"/><circle cx="50" cy="30" r="1.5"/><circle cx="70" cy="30" r="1.5"/><circle cx="10" cy="50" r="1.5"/><circle cx="30" cy="50" r="1.5"/><circle cx="50" cy="50" r="1.5"/><circle cx="70" cy="50" r="1.5"/><circle cx="10" cy="70" r="1.5"/><circle cx="30" cy="70" r="1.5"/><circle cx="50" cy="70" r="1.5"/><circle cx="70" cy="70" r="1.5"/></svg>`,
};

export default function SketchMotif({
  variant,
  className = "absolute top-8 right-8 w-16 h-16",
  opacity = 0.1,
}: SketchMotifProps) {
  const svg = motifs[variant];
  if (!svg) return null;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
