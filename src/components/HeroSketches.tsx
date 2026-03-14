"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSketches, sketchPlaceholders } from "@/lib/sketch-map";

export default function HeroSketches() {
  return (
    <>
      {heroSketches.map((sketch) => (
        <SketchElement key={sketch.id} sketch={sketch} />
      ))}
    </>
  );
}

function SketchElement({ sketch }: { sketch: (typeof heroSketches)[number] }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const placeholderKey = sketch.src.replace("/sketches/", "").replace(".png", "");
  const placeholderSvg = sketchPlaceholders[placeholderKey];

  // After entrance animation completes, switch to fast spring for hover interactions.
  // This fixes the hover-exit lag: without this, the slow entrance transition (0.6s + delay)
  // is reused when the cursor leaves, making the rotation back feel sluggish.
  const baseTransition = reducedMotion
    ? { duration: 0 }
    : hasEntered
      ? { type: "spring" as const, stiffness: 400, damping: 20 }
      : { duration: 0.6, ease: "easeOut" as const, delay: sketch.delay };

  const imageContent = (
    <>
      {!imgFailed ? (
        <Image
          src={sketch.src}
          alt={sketch.label}
          width={200}
          height={280}
          className="h-auto w-full object-contain"
          onError={() => setImgFailed(true)}
          unoptimized
        />
      ) : placeholderSvg ? (
        <div
          className="h-auto w-full"
          dangerouslySetInnerHTML={{ __html: placeholderSvg }}
        />
      ) : null}
    </>
  );

  return (
    <motion.div
      className={`group absolute ${sketch.type === "product" ? "block max-md:!w-[130px]" : "hidden md:block"}`}
      style={{
        ...sketch.position,
        width: sketch.width,
        zIndex: 1,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85, rotate: sketch.rotate - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: sketch.rotate }}
      transition={baseTransition}
      onAnimationComplete={() => {
        if (!hasEntered) setHasEntered(true);
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
    >
      {sketch.href ? (
        <Link href={sketch.href} className="block">
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}

      {sketch.type !== "decorative" && (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[var(--glass-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 backdrop-blur-[8px] border border-[var(--glass-border)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
          {sketch.label}
        </span>
      )}
    </motion.div>
  );
}
