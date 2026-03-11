"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  if (images.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-primary/10">
        <span className="font-mono text-xs text-primary/40">No images</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-primary/5">
        <Image
          src={active.url}
          alt={active.altText || productTitle}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md transition-opacity ${
                i === activeIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productTitle} ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
