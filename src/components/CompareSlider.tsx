"use client";

import { useState, useRef, useCallback } from "react";

interface CompareSliderProps {
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export default function CompareSlider({
  leftLabel,
  rightLabel,
  className = "",
}: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/9] select-none overflow-hidden rounded-lg ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Left side (before) */}
      <div className="absolute inset-0 flex items-center justify-center bg-primary/15">
        <span className="px-4 text-center font-mono text-xs tracking-wide text-primary/40">
          {leftLabel}
        </span>
      </div>

      {/* Right side (after) — clipped */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-primary/8"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <span className="px-4 text-center font-mono text-xs tracking-wide text-primary/60">
          {rightLabel}
        </span>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-accent"
        style={{ left: `${position}%` }}
      />

      {/* Slider handle */}
      <div
        className="absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-accent shadow-lg"
        style={{ left: `${position}%` }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3L2 8L5 13M11 3L14 8L11 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 rounded-full bg-primary/60 px-3 py-1 font-mono text-[10px] tracking-wide text-surface">
        Before
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-primary/60 px-3 py-1 font-mono text-[10px] tracking-wide text-surface">
        After
      </span>
    </div>
  );
}
