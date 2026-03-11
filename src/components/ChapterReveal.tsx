"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ChapterRevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export default function ChapterReveal({
  children,
  className,
  index = 0,
}: ChapterRevealProps) {
  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
    >
      {children}
    </motion.article>
  );
}
