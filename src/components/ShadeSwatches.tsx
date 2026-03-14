interface Shade {
  name: string;
  color: string;
}

interface ShadeSwatchesProps {
  className?: string;
  shades?: Shade[];
}

export default function ShadeSwatches({ className = "", shades }: ShadeSwatchesProps) {
  // Only render swatches if the product actually has shade data
  if (!shades || shades.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {shades.map((shade) => (
        <div
          key={shade.name}
          title={shade.name}
          className="h-3.5 w-3.5 rounded-full border border-white/30 transition-all duration-200 hover:scale-125 hover:shadow-[0_0_8px_var(--sw-color)]"
          style={{ backgroundColor: shade.color, "--sw-color": shade.color } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
