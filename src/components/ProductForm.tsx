"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { ShopifyProductVariant, ShopifyPrice } from "@/lib/shopify";

interface ProductFormProps {
  variants: ShopifyProductVariant[];
  description: string;
}

function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductForm({ variants, description }: ProductFormProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const { addItem, loading } = useCartStore();

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const hasMultipleVariants = variants.length > 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <p className="font-mono text-lg tracking-wide">
        {selectedVariant && formatPrice(selectedVariant.price)}
      </p>

      {/* Variant selector */}
      {hasMultipleVariants && (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-sans text-xs font-regular uppercase tracking-widest text-primary/60">
            {variants[0]?.selectedOptions[0]?.name ?? "Option"}
          </legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                disabled={!variant.availableForSale}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`rounded-full border px-5 py-2 font-sans text-sm transition-colors ${
                  variant.id === selectedVariantId
                    ? "border-primary bg-primary text-surface"
                    : "border-primary/20 text-primary hover:border-primary/50"
                } ${!variant.availableForSale ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Short description */}
      <p className="text-base font-light leading-relaxed text-primary/80">
        {description}
      </p>

      {/* Add to cart */}
      <button
        type="button"
        disabled={loading || !selectedVariant?.availableForSale}
        onClick={() => addItem(selectedVariantId)}
        className="w-full rounded-full bg-accent py-4 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding..." : selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
      </button>

      {/* Shipping note */}
      <p className="font-mono text-[11px] tracking-wide text-primary/40">
        Free shipping across India. Ships in 5-7 business days.
      </p>
    </div>
  );
}
