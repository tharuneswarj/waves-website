interface PlaceholderImageProps {
  label: string;
  aspect?: string;
  className?: string;
}

export default function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`${aspect} flex items-center justify-center rounded-lg bg-primary/10 ${className}`}
    >
      <span className="px-4 text-center font-mono text-xs tracking-wide text-primary/40">
        {label}
      </span>
    </div>
  );
}
