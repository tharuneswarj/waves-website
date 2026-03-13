interface AmbientBackgroundProps {
  className?: string;
  dark?: boolean;
}

export default function AmbientBackground({
  className = "",
  dark = false,
}: AmbientBackgroundProps) {
  const blob1 = dark ? "var(--ambient-cream)" : "var(--ambient-blue)";
  const blob2 = dark ? "var(--ambient-coral-dark)" : "var(--ambient-coral)";
  const blob3 = dark ? "var(--ambient-cream)" : "var(--ambient-yellow)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full animate-ambient-drift-1"
        style={{ background: `radial-gradient(circle, ${blob1} 0%, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-[15%] -left-[10%] h-[50%] w-[50%] rounded-full animate-ambient-drift-2"
        style={{ background: `radial-gradient(circle, ${blob2} 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-[30%] left-[40%] h-[40%] w-[40%] rounded-full animate-ambient-drift-3 hidden md:block"
        style={{ background: `radial-gradient(circle, ${blob3} 0%, transparent 70%)` }}
      />
    </div>
  );
}
