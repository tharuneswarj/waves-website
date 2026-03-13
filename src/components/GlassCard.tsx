"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  tilt?: boolean;
  tiltMax?: number;
  dark?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  spotlight = false,
  tilt = false,
  tiltMax = 6,
  dark = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightPos({ x, y });
    },
    []
  );

  const glassClasses = dark
    ? "bg-[var(--glass-bg-dark)] border-[var(--glass-border-dark)]"
    : "bg-[var(--glass-bg)] border-[var(--glass-border)]";

  const spotlightColor = dark
    ? "rgba(253, 244, 227, 0.08)"
    : "rgba(253, 244, 227, 0.15)";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        tilt && isHovered
          ? {
              rotateX: ((spotlightPos.y - 50) / 50) * -tiltMax,
              rotateY: ((spotlightPos.x - 50) / 50) * tiltMax,
            }
          : { rotateX: 0, rotateY: 0 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={tilt ? { transformStyle: "preserve-3d", perspective: 1000 } : undefined}
      className={`
        relative overflow-hidden rounded-2xl
        backdrop-blur-[12px]
        border
        shadow-[var(--glass-shadow)]
        hover:shadow-[var(--glass-shadow-hover)]
        transition-shadow duration-300
        ${glassClasses}
        ${className}
      `}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
