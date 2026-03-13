"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  dark?: boolean;
  className?: string;
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  dark = false,
  className = "",
}: GlassButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-10 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-[12px] border";

  let variantClasses: string;

  if (dark) {
    variantClasses =
      variant === "primary"
        ? "bg-accent/90 text-white border-white/20 hover:bg-accent hover:shadow-[0_0_30px_rgba(237,63,39,0.3)]"
        : "bg-[var(--glass-bg-dark)] text-surface border-surface/20 hover:bg-[var(--glass-bg-dark-heavy)] hover:border-surface/40";
  } else {
    variantClasses =
      variant === "primary"
        ? "bg-primary/85 text-surface border-white/15 hover:bg-primary/95 hover:shadow-[0_0_30px_rgba(19,70,134,0.25)]"
        : "bg-[var(--glass-bg)] text-primary border-[var(--glass-border)] hover:bg-[var(--glass-bg-heavy)]";
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const inner = (
    <motion.span
      className={combinedClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }

  return (
    <button onClick={onClick} type="button">
      {inner}
    </button>
  );
}
