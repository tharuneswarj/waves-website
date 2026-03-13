import Link from "next/link";
import { getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import HeroAnimated from "@/components/HeroAnimated";
import AmbientBackground from "@/components/AmbientBackground";
import ProductShowcase from "@/components/ProductShowcase";

function formatMinPrice(product: ShopifyProduct): string {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function toShowcaseProduct(p: ShopifyProduct) {
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    priceFormatted: `From ${formatMinPrice(p)}`,
    imageUrl: p.featuredImage?.url,
    imageAlt: p.featuredImage?.altText || p.title,
  };
}

export default async function Home() {
  let products: ShopifyProduct[] = [];

  try {
    products = await getAllProducts();
  } catch {
    // Shopify not connected — render with static fallback
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Waves Company",
            url: "https://waves.company",
            logo: "https://waves.company/logos/Cream_and_Blue_Logo_v2.png",
            description: "Algorithmically crafted lighting objects. Designed through computation, made by hand.",
            contactPoint: {
              "@type": "ContactPoint",
              email: "hello@waves.company",
              contactType: "customer service",
            },
            sameAs: ["https://instagram.com/waves_company_"],
          }),
        }}
      />

      {/* ─── Section 1: Hero ─── */}
      <HeroAnimated />

      {/* ─── Section 2: Brand Statement ─── */}
      <section className="relative bg-surface px-6 py-section lg:py-section-lg overflow-hidden">
        <AmbientBackground />
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-2xl font-light leading-relaxed text-primary/80 md:text-3xl lg:text-4xl lg:leading-relaxed">
              Objects deserve the same intellectual rigour as buildings.
              Light is not decoration&thinsp;&mdash;&thinsp;it is atmosphere.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 3: Featured Products ─── */}
      {products.length > 0 ? (
        <ProductShowcase products={products.map(toShowcaseProduct)} />
      ) : (
        <ProductShowcase
          products={[
            { id: "1", title: "The Ripple", handle: "the-ripple-lamp", priceFormatted: "From \u20B93,999" },
            { id: "2", title: "The Hourglass", handle: "the-hour-glass-lamp", priceFormatted: "From \u20B93,999" },
          ]}
        />
      )}

      {/* ─── Section 4: Process Strip ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-12 text-left text-4xl text-surface md:text-6xl lg:text-7xl">
              How it&rsquo;s made
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-10">
            {[
              {
                step: "01",
                title: "Code",
                caption: "Parametric logic in Grasshopper",
              },
              {
                step: "02",
                title: "Print",
                caption: "4-5 hours per shade",
              },
              {
                step: "03",
                title: "Finish",
                caption: "Hand-finished. Carefully assembled.",
              },
              {
                step: "04",
                title: "Light",
                caption: "Diffused. Calibrated. Warm.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="flex flex-col gap-4">
                  <PlaceholderImage
                    label={`Process — ${item.title}`}
                    aspect="aspect-square"
                    className="rounded-lg bg-surface/10"
                  />
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-surface/40">
                      {item.step}
                    </span>
                    <h3 className="mt-1 text-base font-medium text-surface">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] leading-relaxed text-surface/60">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <Link
                href="/process"
                className="inline-block font-sans text-sm font-medium tracking-wide text-surface/70 transition-colors hover:text-surface"
              >
                See the full process &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 5: Installation Highlight ─── */}
      <section className="relative bg-surface">
        <div className="mx-auto">
          <ScrollReveal>
            <div className="relative overflow-hidden">
              <PlaceholderImage
                label="Salem Office Installation — 5 Ripple pendants in horizontal formation (professional photography needed)"
                aspect="aspect-[21/9]"
                className="min-h-[320px]"
              />
              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/70 to-transparent p-6 md:p-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-surface/60">
                  Installation
                </span>
                <h2 className="mt-2 text-2xl text-surface md:text-3xl">
                  Salem Office
                </h2>
                <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-surface/80">
                  5 Ripple pendants in horizontal formation. Designed for a
                  corporate office in Salem.
                </p>
                <Link
                  href="/studio/salem"
                  className="mt-4 inline-block font-sans text-sm font-medium tracking-wide text-surface/70 transition-colors hover:text-surface"
                >
                  See the full project &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 6: Closing Statement ─── */}
      <section className="bg-surface px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-serif text-3xl leading-snug text-primary/80 md:text-5xl lg:text-6xl">
              Designed with computation.
              <br />
              Decided with judgment.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
