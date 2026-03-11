"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  /** When set, the gallery tries to jump to the first image whose altText contains this string */
  activeShade?: string | null;
}

export default function ProductGallery({
  images,
  productTitle,
  activeShade,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Jump to the first image matching the shade when selection changes
  useEffect(() => {
    if (!activeShade) return;
    const shade = activeShade.toLowerCase();
    const matchIdx = images.findIndex(
      (img) => img.altText?.toLowerCase().includes(shade)
    );
    if (matchIdx !== -1) {
      setActiveIndex(matchIdx);
    }
  }, [activeShade, images]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] max-h-[70vh] items-center justify-center rounded-2xl bg-primary/10 lg:max-h-none">
        <span className="font-mono text-xs text-primary/40">No images</span>
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — shorter aspect ratio, capped height on mobile */}
      <div className="relative aspect-[4/5] max-h-[65vh] overflow-hidden rounded-2xl bg-primary/5 lg:max-h-none">
        <Image
          src={active.url}
          alt={active.altText || productTitle}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-150 ${
                i === activeIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-surface opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productTitle} ${i + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
