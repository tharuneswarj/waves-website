"use client";

import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductForm from "@/components/ProductForm";
import type { ShopifyImage, ShopifyProductVariant } from "@/lib/shopify";

interface ProductHeroProps {
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  productTitle: string;
  descriptionHtml: string;
  specs: [string, string][];
  shadeColours: Record<string, string>;
  usageCare: string;
}

/**
 * Client wrapper that owns the activeShade state so it can be shared
 * between ProductGallery (jumps to matching image) and ProductForm
 * (fires the callback on shade selection).
 *
 * This is necessary because page.tsx is a Server Component and cannot
 * hold state itself.
 */
export default function ProductHero({
  images,
  variants,
  productTitle,
  descriptionHtml,
  specs,
  shadeColours,
  usageCare,
}: ProductHeroProps) {
  const [activeShade, setActiveShade] = useState<string | null>(null);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:gap-14">
      {/* Gallery — left */}
      <div className="min-w-0">
        <ProductGallery
          images={images}
          productTitle={productTitle}
          activeShade={activeShade}
        />
      </div>

      {/* Product info — right */}
      <div className="min-w-0 flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl">{productTitle}</h1>
        <ProductForm
          variants={variants}
          descriptionHtml={descriptionHtml}
          specs={specs}
          shadeColours={shadeColours}
          usageCare={usageCare}
          onShadeChange={setActiveShade}
        />
      </div>
    </div>
  );
}
