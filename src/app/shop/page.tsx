import Link from "next/link";
import Image from "next/image";
import { getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Waves Company",
  description:
    "Algorithmically crafted lighting objects. Each piece is printed over many hours. Good light is not rushed.",
};

function formatMinPrice(product: ShopifyProduct): string {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];

  try {
    products = await getAllProducts();
  } catch {
    // Shopify not connected yet — render with empty state
  }

  return (
    <main className="pt-24">
      {/* ─── Collection Header ─── */}
      <section className="px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">The Collection</h1>
            <p className="mt-4 max-w-lg text-lg font-light leading-relaxed text-primary/70">
              Each piece is printed over many hours. Good light is not rushed.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto max-w-7xl">
          {products.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <Link href={`/shop/${product.handle}`} className="group block">
                    <div className="overflow-hidden rounded-lg">
                      {product.featuredImage ? (
                        <div className="relative aspect-[3/4] bg-primary/5">
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                        <PlaceholderImage
                          label={`${product.title} — product photography`}
                          aspect="aspect-[3/4]"
                          className="transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="mt-5 flex items-baseline justify-between">
                      <h2 className="font-sans text-lg font-medium text-primary md:text-xl">
                        {product.title}
                      </h2>
                      <span className="font-mono text-xs tracking-wide text-primary/60">
                        From {formatMinPrice(product)}
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Fallback when Shopify isn't connected */
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {["Ripple", "Hourglass"].map((name, i) => (
                <ScrollReveal key={name} delay={i * 0.1}>
                  <div className="group block">
                    <PlaceholderImage
                      label={`${name} Table Lamp — connect Shopify to load`}
                      aspect="aspect-[3/4]"
                    />
                    <div className="mt-5 flex items-baseline justify-between">
                      <h2 className="font-sans text-lg font-medium text-primary md:text-xl">
                        {name}
                      </h2>
                      <span className="font-mono text-xs tracking-wide text-primary/60">
                        From &#8377;4,999
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Custom Work Banner ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl text-surface md:text-4xl">
              Looking for something specific?
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-surface/70 md:text-lg">
              We design custom lighting for architects, designers, and spaces
              that demand specificity.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full border-2 border-surface/40 px-10 py-3.5 font-sans text-sm font-medium tracking-wide text-surface transition-colors hover:border-surface hover:bg-surface/10"
            >
              Start a conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
