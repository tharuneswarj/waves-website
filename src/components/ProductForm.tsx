"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { ShopifyProductVariant, ShopifyPrice } from "@/lib/shopify";
import ProductAccordion from "@/components/ProductAccordion";
import { getOptionContent } from "@/lib/option-content";

interface ProductFormProps {
  variants: ShopifyProductVariant[];
  descriptionHtml: string;
  specs: [string, string][];
  shadeColours: Record<string, string>;
  usageCare: string;
  onShadeChange?: (shade: string) => void;
  onBaseChange?: (base: string) => void;
  onCableChange?: (cable: string) => void;
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

// ── Known shade keywords for identification ─────────────
const SHADE_KEYWORDS = ["chalk", "sand", "amber", "smoke", "white", "natural", "beige"];

// ── Get unique values for the option at a given index ──
function getOptionValuesAtIndex(
  variants: ShopifyProductVariant[],
  index: number
): string[] {
  const seen = new Set<string>();
  for (const v of variants) {
    const opt = v.selectedOptions[index];
    if (opt) seen.add(opt.value);
  }
  return Array.from(seen);
}

// ── Find which option axis is the shade (by checking values) ──
function findShadeAxisIndex(variants: ShopifyProductVariant[]): number {
  for (let i = 0; i < 3; i++) {
    const values = getOptionValuesAtIndex(variants, i);
    const isShadeAxis = values.every((v) =>
      SHADE_KEYWORDS.some((k) => v.toLowerCase().includes(k))
    );
    if (isShadeAxis && values.length > 0) return i;
  }
  return 0; // fallback
}

// ── Find matching variant by 3 selections by index ──────
function findVariantBySelections(
  variants: ShopifyProductVariant[],
  selections: [string, string, string], // [opt0val, opt1val, opt2val]
): ShopifyProductVariant | null {
  return (
    variants.find(
      (v) =>
        v.selectedOptions[0]?.value === selections[0] &&
        v.selectedOptions[1]?.value === selections[1] &&
        v.selectedOptions[2]?.value === selections[2]
    ) ?? null
  );
}

// ── Step indicator ─────────────────────────────────────
function StepDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-200 ${
            i < current
              ? "w-4 bg-primary"
              : i === current
                ? "w-4 bg-primary/50"
                : "w-1.5 bg-primary/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductForm({
  variants,
  descriptionHtml,
  specs,
  shadeColours,
  usageCare,
  onShadeChange,
  onBaseChange,
  onCableChange,
}: ProductFormProps) {
  const { addItem, loading } = useCartStore();

  const hasOptions = variants.length > 1 && variants[0]?.selectedOptions.length >= 3;

  // Derive option axes by index position (works with any Shopify option names)
  const shadeAxisIdx = hasOptions ? findShadeAxisIndex(variants) : 0;
  const baseAxisIdx = shadeAxisIdx === 0 ? 1 : 0;
  const cableAxisIdx = [0, 1, 2].find((i) => i !== shadeAxisIdx && i !== baseAxisIdx) ?? 2;

  const shadeOptions = hasOptions ? getOptionValuesAtIndex(variants, shadeAxisIdx) : [];
  const baseOptions = hasOptions ? getOptionValuesAtIndex(variants, baseAxisIdx) : [];
  const cableOptions = hasOptions ? getOptionValuesAtIndex(variants, cableAxisIdx) : [];

  const useStepConfig =
    hasOptions && shadeOptions.length > 0 && baseOptions.length > 0 && cableOptions.length > 0;

  // Step state  (0 = shade, 1 = base, 2 = cable)
  const [step, setStep] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedCable, setSelectedCable] = useState<string | null>(null);

  // Fallback: single flat selector (original behaviour)
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? ""
  );

  // Resolve matching variant from step selections (index-based so option name doesn't matter)
  const selections: [string, string, string] | null =
    selectedShade && selectedBase && selectedCable
      ? (() => {
          const arr: [string, string, string] = ["", "", ""];
          arr[shadeAxisIdx] = selectedShade;
          arr[baseAxisIdx] = selectedBase;
          arr[cableAxisIdx] = selectedCable;
          return arr;
        })()
      : null;

  const matchedVariant = useStepConfig
    ? (selections ? findVariantBySelections(variants, selections) : null)
    : (variants.find((v) => v.id === selectedVariantId) ?? variants[0]);

  const allSelected =
    selectedShade !== null &&
    selectedBase !== null &&
    selectedCable !== null;

  const activeVariant = matchedVariant ?? variants[0];

  // ── Handlers ──
  function pickShade(shade: string) {
    setSelectedShade(shade);
    onShadeChange?.(shade);
    setStep(1);
  }

  function pickBase(base: string) {
    setSelectedBase(base);
    onBaseChange?.(base);
    setStep(2);
  }

  function pickCable(cable: string) {
    setSelectedCable(cable);
    onCableChange?.(cable);
  }

  function goBack() {
    if (step === 2) {
      setSelectedCable(null);
      setStep(1);
    } else if (step === 1) {
      setSelectedBase(null);
      setStep(0);
    }
  }

  // ── Render flat selector if we can't parse option axes ──
  if (!useStepConfig) {
    return (
      <div className="flex flex-col gap-6">
        <p className="font-mono text-lg tracking-wide">
          {activeVariant && formatPrice(activeVariant.price)}
        </p>
        {variants.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.availableForSale}
                onClick={() => setSelectedVariantId(v.id)}
                className={`rounded-full border px-5 py-2 font-sans text-sm transition-colors ${
                  v.id === selectedVariantId
                    ? "border-primary bg-primary text-surface"
                    : "border-primary/20 text-primary hover:border-primary/50"
                } ${!v.availableForSale ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}
        <div
          className="prose prose-sm max-w-none font-light leading-relaxed text-primary/80 [&_a]:text-primary [&_a]:underline [&_strong]:font-medium"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <AddToCartButton
          loading={loading}
          variant={activeVariant}
          onAdd={() => addItem(activeVariant?.id ?? "")}
        />
        <ShippingNote />
        <ProductAccordion specs={specs} usageCare={usageCare} />
      </div>
    );
  }

  // ── Tagline ──────────────────────────────────────────
  const Tagline = (
    <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-primary/75">
      Made to order · Uniquely yours
    </p>
  );

  // ── Step-by-step configurator ──
  const STEP_LABELS = ["Shade", "Base", "Cable"];

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <p className="font-mono text-lg tracking-wide">
        {activeVariant && formatPrice(activeVariant.price)}
      </p>

      {Tagline}

      {/* Progress + Back */}
      <div className="flex items-center justify-between">
        <StepDots total={3} current={step} />
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="font-sans text-xs font-medium text-primary/60 transition-colors hover:text-primary"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Steps */}
      <div>
        {/* ── Step 0: Shade ── */}
        {step === 0 && (
          <fieldset>
            <legend className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-primary/80">
              Select Shade
            </legend>
            <div className="flex gap-4">
              {shadeOptions.map((shade) => {
                const colour = shadeColours[shade] ?? "#CCC";
                return (
                  <button
                    key={shade}
                    type="button"
                    onClick={() => pickShade(shade)}
                    title={shade}
                    aria-label={shade}
                    className={`group flex flex-col items-center gap-2`}
                  >
                    <span
                      className={`h-10 w-10 rounded-full border-2 transition-all duration-150 ${
                        selectedShade === shade
                          ? "border-primary scale-110 shadow-md"
                          : "border-primary/20 hover:border-primary/60 hover:scale-105"
                      }`}
                      style={{ backgroundColor: colour }}
                    />
                    <span className="font-sans text-[11px] text-primary/75">
                      {shade}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ── Step 1: Base ── */}
        {step === 1 && (
          <fieldset>
            <legend className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-primary/80">
              Select Base
            </legend>
            <div className="flex flex-col gap-3">
              {baseOptions.map((base) => {
                const { label, subtitle } = getOptionContent(base);
                const isSelected = selectedBase === base;
                return (
                  <button
                    key={base}
                    type="button"
                    onClick={() => pickBase(base)}
                    className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-150 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-primary/15 hover:border-primary/35 hover:bg-primary/[0.02]"
                    }`}
                  >
                    {/* Left accent bar */}
                    <span
                      className={`mt-0.5 h-8 w-[3px] shrink-0 rounded-full transition-colors duration-150 ${
                        isSelected ? "bg-primary" : "bg-primary/20 group-hover:bg-primary/40"
                      }`}
                    />
                    <div className="flex flex-col">
                      <p className="font-sans text-sm font-medium text-primary">{label}</p>
                      {subtitle && (
                        <p className="mt-0.5 font-mono text-[10px] tracking-wide text-primary/50">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ── Step 2: Cable ── */}
        {step === 2 && (
          <fieldset>
            <legend className="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-primary/80">
              Select Cable
            </legend>
            <div className="flex gap-3">
              {cableOptions.map((cable) => {
                const { label, subtitle } = getOptionContent(cable);
                const isSelected = selectedCable === cable;
                return (
                  <button
                    key={cable}
                    type="button"
                    onClick={() => pickCable(cable)}
                    className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border py-4 px-5 text-center transition-all duration-150 ${
                      isSelected
                        ? "border-primary bg-primary text-surface"
                        : "border-primary/15 text-primary hover:border-primary/40 hover:bg-primary/[0.02]"
                    }`}
                  >
                    <span className="block font-sans text-sm font-medium">{label}</span>
                    {subtitle && (
                      <span
                        className={`block font-mono text-[10px] tracking-wide transition-colors ${
                          isSelected ? "text-surface/60" : "text-primary/45"
                        }`}
                      >
                        {subtitle}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      {/* Selection summary */}
      {(selectedShade || selectedBase || selectedCable) && (
        <div className="flex flex-wrap gap-2">
          {selectedShade && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 px-3 py-1 font-sans text-xs text-primary/70">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: shadeColours[selectedShade] ?? "#CCC" }}
              />
              {selectedShade}
            </span>
          )}
          {selectedBase && (
            <span className="rounded-full border border-primary/15 px-3 py-1 font-sans text-xs text-primary/70">
              {selectedBase}
            </span>
          )}
          {selectedCable && (
            <span className="rounded-full border border-primary/15 px-3 py-1 font-sans text-xs text-primary/70">
              {selectedCable} cable
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <div
        className="prose prose-sm max-w-none font-light leading-relaxed text-primary/80 [&_a]:text-primary [&_a]:underline [&_strong]:font-medium"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {/* Add to cart — only when all 3 selected */}
      <AddToCartButton
        loading={loading}
        variant={allSelected ? matchedVariant : null}
        onAdd={() => matchedVariant && addItem(matchedVariant.id)}
        disabled={!allSelected || !matchedVariant}
        hint={!allSelected ? `Choose ${STEP_LABELS[step].toLowerCase()} to continue` : undefined}
      />

      <ShippingNote />

      {/* Accordion */}
      <ProductAccordion specs={specs} usageCare={usageCare} />
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────

function AddToCartButton({
  loading,
  variant,
  onAdd,
  disabled,
  hint,
}: {
  loading: boolean;
  variant: ShopifyProductVariant | null | undefined;
  onAdd: () => void;
  disabled?: boolean;
  hint?: string;
}) {
  const soldOut = variant !== null && variant !== undefined && !variant.availableForSale;
  const isDisabled = loading || disabled || soldOut;

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={isDisabled}
        onClick={onAdd}
        className="w-full rounded-full bg-accent py-4 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading
          ? "Adding..."
          : soldOut
            ? "Sold Out"
            : disabled
              ? "Select options above"
              : "Add to Cart"}
      </button>
      {hint && !loading && (
        <p className="text-center font-sans text-xs text-primary/65">{hint}</p>
      )}
    </div>
  );
}

function ShippingNote() {
  return (
    <p className="font-mono text-[11px] tracking-wide text-primary/65">
      Free shipping across India. Ships in 5–7 business days.
    </p>
  );
}
