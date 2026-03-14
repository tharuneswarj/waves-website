"use client";

import { motion } from "framer-motion";
import GlassButton from "./GlassButton";
import HeroSketches from "./HeroSketches";

export default function HeroAnimated() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-surface px-6 pb-20 pt-40 md:px-10 lg:px-16">

      {/* Scattered lamp sketches */}
      <HeroSketches />

      {/* Caption - top left area, below nav */}
      <motion.p
        className="relative z-10 mb-auto max-w-[300px] font-sans text-sm font-light leading-relaxed text-primary/45"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Lighting objects designed through code, material honesty, and human touch.
      </motion.p>

      {/* Headline - bottom left, oversized */}
      <motion.h1
        className="relative z-10 max-w-[75%] text-5xl leading-[0.95] text-primary sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        initial={{ opacity: 0, filter: "blur(6px)" }}
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

    </section>
  );
}
