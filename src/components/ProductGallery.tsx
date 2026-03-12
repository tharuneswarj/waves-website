"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { ShopifyImage, ShopifyProductVariant } from "@/lib/shopify";
import { imageMatchesSelections, type ActiveSelections } from "@/lib/image-filter";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  /** Selections object for filtering */
  selections: ActiveSelections;
  /** Variants — used to match via variant.image.url before falling back to altText */
  variants?: ShopifyProductVariant[];
}

export default function ProductGallery({
  images,
  productTitle,
  selections,
  variants = [],
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = useMemo(() => {
    const visibleImages = images.filter((img) =>
      imageMatchesSelections(img.altText, selections)
    );
    return visibleImages.length > 0 ? visibleImages : images;
  }, [images, selections]);

  useEffect(() => {
    setActiveIndex(0);
  }, [selections.shade, selections.base, selections.cable]);

  useEffect(() => {
    if (!selections.shade) return;
    const shade = selections.shade.toLowerCase();

    // Pass 1: find a variant whose selected options include this shade,
    // then look for its image URL in the gallery list (most reliable).
    const matchingVariant = variants.find((v) =>
      v.selectedOptions.some((o) => o.value.toLowerCase() === shade)
    );
    if (matchingVariant?.image?.url) {
      const idx = displayImages.findIndex((img) => img.url === matchingVariant.image!.url);
      if (idx !== -1) {
        setActiveIndex(idx);
        return;
      }
    }

    // Pass 2: fall back to altText substring match.
    const altIdx = displayImages.findIndex((img) =>
      img.altText?.toLowerCase().includes(shade)
    );
    if (altIdx !== -1) setActiveIndex(altIdx);
  }, [selections.shade, variants]);

  if (displayImages.length === 0) {
    return (
      <div className="flex aspect-[4/5] max-h-[70vh] items-center justify-center rounded-2xl bg-primary/10 lg:max-h-none">
        <span className="font-mono text-xs text-primary/40">No images</span>
      </div>
    );
  }

  const active = displayImages[Math.min(activeIndex, displayImages.length - 1)];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — shorter aspect ratio, capped height on mobile */}
      <div className="group relative aspect-[4/5] max-h-[65vh] overflow-hidden rounded-2xl bg-primary/5 lg:max-h-none">
        <Image
          src={active.url}
          alt={active.altText || productTitle}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary opacity-0 backdrop-blur transition-all duration-200 hover:bg-surface group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary opacity-0 backdrop-blur transition-all duration-200 hover:bg-surface group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-150 ${
                i === Math.min(activeIndex, displayImages.length - 1)
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
