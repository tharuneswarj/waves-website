const SHADES = [
  { name: "Chalk", color: "#F5F0E8" },
  { name: "Sand", color: "#D4C5A9" },
  { name: "Amber", color: "#C8956A" },
  { name: "Smoke", color: "#7A7A7A" },
];

export default function ShadeSwatches({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {SHADES.map((shade) => (
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
