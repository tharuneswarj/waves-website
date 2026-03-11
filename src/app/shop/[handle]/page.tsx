import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import { getDesignStory, getProductSpecs } from "@/lib/product-content";
import ProductGallery from "@/components/ProductGallery";
import ProductForm from "@/components/ProductForm";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;

  try {
    const product = await getProductByHandle(handle);
    if (!product) return { title: "Product Not Found - Waves Company" };

    return {
      title: `${product.title} - Waves Company`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: `${handle} - Waves Company` };
  }
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;

  let product;
  try {
    product = await getProductByHandle(handle);
  } catch {
    // Shopify not connected
    product = null;
  }

  if (!product) {
    return <FallbackProductPage handle={handle} />;
  }

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const designStory = getDesignStory(handle);
  const specs = getProductSpecs(handle);

  return (
    <main className="pt-24">
      {/* ─── Section 1: Product Hero ─── */}
      <section className="px-6 pb-section pt-8 lg:pb-section-lg lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Gallery — left */}
          <ProductGallery images={images} productTitle={product.title} />

          {/* Product info — right */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl">{product.title}</h1>
            <ProductForm variants={variants} description={product.description} />
          </div>
        </div>
      </section>

      {/* ─── Section 2: Design Story ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl text-surface md:text-4xl">
              How the {product.title} was designed
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {designStory.map((paragraph, i) => (
              <ScrollReveal key={i}>
                <p className="text-base font-light leading-relaxed text-surface/80">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <PlaceholderImage
                label="Process — toolpath detail"
                aspect="aspect-square"
                className="rounded-lg bg-surface/10"
              />
              <PlaceholderImage
                label="Process — printing in progress"
                aspect="aspect-square"
                className="rounded-lg bg-surface/10"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 3: Technical Specs ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">Specifications</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-lg border border-primary/10">
              <table className="w-full">
                <tbody className="divide-y divide-primary/10">
                  {specs.map(([label, value]) => (
                    <tr key={label}>
                      <td className="px-5 py-3 font-mono text-xs tracking-wide text-primary/50">
                        {label}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs tracking-wide text-primary">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 4: In Context ─── */}
      <section className="px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">In context</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {["Bedside table, evening light", "Living room shelf", "Reading nook"].map(
              (label, i) => (
                <ScrollReveal key={label} delay={i * 0.1}>
                  <PlaceholderImage
                    label={`${product.title} — ${label}`}
                    aspect="aspect-[4/5]"
                  />
                </ScrollReveal>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ──────────────────────────────────────
// Fallback when Shopify isn't connected
// ──────────────────────────────────────

function FallbackProductPage({ handle }: { handle: string }) {
  const title = handle.charAt(0).toUpperCase() + handle.slice(1);

  return (
    <main className="pt-24">
      <section className="px-6 pb-section pt-8 lg:pb-section-lg lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr] lg:gap-16">
          <PlaceholderImage
            label={`${title} — connect Shopify to load product images`}
            aspect="aspect-[3/4]"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl">{title}</h1>
            <p className="font-mono text-lg tracking-wide">&#8377;4,999</p>
            <p className="text-base font-light leading-relaxed text-primary/70">
              Connect your Shopify Storefront API to load full product data,
              variants, and enable add-to-cart.
            </p>
            <div className="mt-4 rounded-lg border border-primary/10 p-5">
              <p className="font-mono text-xs tracking-wide text-primary/50">
                Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and
                NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
