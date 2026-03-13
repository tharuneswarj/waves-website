"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import ShadeSwatches from "./ShadeSwatches";

interface Product {
  id: string;
  title: string;
  handle: string;
  priceFormatted: string;
  imageUrl?: string;
  imageAlt?: string;
}

const cardTransforms = [
  { rotate: -5, translateX: "5%", zIndex: 1 },
  { rotate: 4, translateX: "-5%", zIndex: 2 },
  // Add more entries if products grow
];

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (products.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-section lg:py-section-lg">
      {/* Section heading - editorial, oversized */}
      <div className="mx-auto max-w-7xl mb-16 md:mb-24">
        <motion.h2
          className="text-5xl text-primary md:text-7xl lg:text-8xl leading-[0.95]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          The
          <br />
          collection
        </motion.h2>
      </div>

      {/* Fanned product cards */}
      <div className="mx-auto max-w-4xl">
        {/* Desktop: fanned overlap */}
        <div className="hidden md:flex items-center justify-center -space-x-12 lg:-space-x-16">
          {products.map((product, i) => {
            const transform = cardTransforms[i % cardTransforms.length];
            const isHovered = hoveredId === product.id;
            const someoneHovered = hoveredId !== null;

            return (
              <motion.div
                key={product.id}
                className="relative w-[300px] lg:w-[360px]"
                style={{ zIndex: isHovered ? 10 : transform.zIndex }}
                animate={{
                  rotate: isHovered ? 0 : transform.rotate,
                  scale: isHovered ? 1.08 : someoneHovered && !isHovered ? 0.95 : 1,
                  opacity: someoneHovered && !isHovered ? 0.75 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/shop/${product.handle}`}>
                  <GlassCard spotlight className="p-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-primary/5">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.imageAlt || product.title}
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-mono text-xs text-primary/40">{product.title}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="font-sans text-base font-medium text-primary">{product.title}</h3>
                      <span className="font-mono text-xs tracking-wide text-primary/70">{product.priceFormatted}</span>
                    </div>
                    <ShadeSwatches className="mt-3" />
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: clean vertical stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/shop/${product.handle}`}>
                <GlassCard spotlight className="p-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-primary/5">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.imageAlt || product.title}
                        fill
                        sizes="90vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-mono text-xs text-primary/40">{product.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-sans text-base font-medium text-primary">{product.title}</h3>
                    <span className="font-mono text-xs tracking-wide text-primary/70">{product.priceFormatted}</span>
                  </div>
                  <ShadeSwatches className="mt-3" />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-16 text-center font-sans text-sm font-light text-primary/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Each lamp is made to order. Choose your shade, base, and cable.
      </motion.p>
    </section>
  );
}
