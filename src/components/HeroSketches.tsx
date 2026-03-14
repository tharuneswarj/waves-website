"use client";

import { useState } from "react";
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

  // Extract the placeholder key from the src path (e.g., "/sketches/lamp-ripple.png" -> "lamp-ripple")
  const placeholderKey = sketch.src.replace("/sketches/", "").replace(".png", "");
  const placeholderSvg = sketchPlaceholders[placeholderKey];

  const content = (
    <motion.div
      className={`group absolute ${sketch.type === "product" ? "block" : "hidden md:block"}`}
      style={{
        ...sketch.position,
        width: sketch.width,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.85, rotate: sketch.rotate - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: sketch.rotate }}
      transition={{ duration: 0.6, ease: "easeOut", delay: sketch.delay }}
      whileHover={{ scale: 1.1, rotate: sketch.rotate + 8, zIndex: 10 }}
    >
      {/* The sketch image or SVG fallback */}
      {!imgFailed ? (
        <Image
          src={sketch.src}
          alt={sketch.label}
          width={200}
          height={280}
          className="h-auto w-full object-contain"
          onError={() => setImgFailed(true)}
          unoptimized // PNGs are small, no need for Shopify CDN optimisation
        />
      ) : placeholderSvg ? (
        <div
          className="h-auto w-full"
          dangerouslySetInnerHTML={{ __html: placeholderSvg }}
        />
      ) : null}

      {/* Hover tooltip */}
      {sketch.type !== "decorative" && (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[var(--glass-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 backdrop-blur-[8px] border border-[var(--glass-border)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap">
          {sketch.label}
        </span>
      )}
    </motion.div>
  );

  // Wrap in Link if href exists, otherwise just render
  if (sketch.href) {
    return (
      <Link href={sketch.href} className="contents">
        {content}
      </Link>
    );
  }

  return content;
}
