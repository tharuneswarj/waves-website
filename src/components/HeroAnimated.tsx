"use client";

import { motion } from "framer-motion";
import GlassButton from "./GlassButton";
import AmbientBackground from "./AmbientBackground";
import HeroSketches from "./HeroSketches";

export default function HeroAnimated() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-surface px-6 pb-20 pt-28 md:px-10 lg:px-16">
      {/* Ambient gradient blobs */}
      <AmbientBackground />

      {/* Scattered lamp sketches */}
      <HeroSketches />

      {/* Caption - top left area, below nav */}
      <motion.p
        className="relative z-10 mb-auto max-w-[300px] pt-8 font-sans text-sm font-light leading-relaxed text-primary/45"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Lighting objects designed through code, material honesty, and human touch.
      </motion.p>

      {/* Headline - bottom left, oversized */}
      <motion.h1
        className="relative z-10 max-w-[75%] text-5xl leading-[0.95] text-primary sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Light,
        <br />
        algorithmically
        <br />
        crafted.
      </motion.h1>

      {/* Glass CTA buttons */}
      <motion.div
        className="relative z-10 mt-10 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <GlassButton href="/shop" variant="primary">
          Explore the Collection
        </GlassButton>
        <GlassButton href="/studio" variant="secondary">
          View Our Work
        </GlassButton>
      </motion.div>

      {/* Wave mark watermark - bottom centre */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg viewBox="0 0 120 20" fill="none" className="h-2.5 w-16">
          <path d="M10 12 Q30 2, 60 10 Q90 18, 110 6" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
}
