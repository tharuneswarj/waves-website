import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Home() {
  return (
    <main>
      {/* ─── Section 1: Hero ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-primary px-6 text-center text-surface">
        {/* Wave mark placeholder — will become Three.js / CSS animation */}
        <div className="mb-10">
          <svg
            width="80"
            height="50"
            viewBox="0 0 80 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40"
            aria-hidden="true"
          >
            <path
              d="M0 25C10 10 20 10 30 25C40 40 50 40 60 25C70 10 80 10 80 25"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0 30C10 15 20 15 30 30C40 45 50 45 60 30C70 15 80 15 80 30"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0 20C10 5 20 5 30 20C40 35 50 35 60 20C70 5 80 5 80 20"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="mb-6 text-5xl leading-tight text-surface md:text-7xl lg:text-8xl">
          Light, algorithmically crafted.
        </h1>

        <p className="mb-12 max-w-lg text-lg font-light leading-relaxed text-surface/80 md:text-xl">
          Lighting objects designed through code, material honesty, and human
          touch.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="rounded-full bg-accent px-10 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark"
          >
            Explore the Collection
          </Link>
          <Link
            href="/studio"
            className="rounded-full border-2 border-surface/40 px-10 py-3.5 font-sans text-sm font-medium tracking-wide text-surface transition-colors hover:border-surface hover:bg-surface/10"
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* ─── Section 2: Brand Statement ─── */}
      <section className="bg-surface px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-xl font-light leading-relaxed text-primary/90 md:text-2xl md:leading-relaxed">
              Objects deserve the same intellectual rigour as buildings.
              <br className="hidden md:block" />
              Light is not decoration&thinsp;&mdash;&thinsp;it is atmosphere.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 3: Featured Products ─── */}
      <section className="bg-surface px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:gap-12">
          {/* Ripple */}
          <ScrollReveal>
            <Link href="/shop/ripple" className="group block">
              <div className="overflow-hidden rounded-lg">
                <PlaceholderImage
                  label="Ripple Table Lamp — product photography"
                  aspect="aspect-[3/4]"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h2 className="font-sans text-lg font-medium text-primary md:text-xl">
                  Ripple
                </h2>
                <span className="font-mono text-xs tracking-wide text-primary/60">
                  From &#8377;4,999
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Hourglass */}
          <ScrollReveal delay={0.15}>
            <Link href="/shop/hourglass" className="group block">
              <div className="overflow-hidden rounded-lg">
                <PlaceholderImage
                  label="Hourglass Table Lamp — product photography"
                  aspect="aspect-[3/4]"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h2 className="font-sans text-lg font-medium text-primary md:text-xl">
                  Hourglass
                </h2>
                <span className="font-mono text-xs tracking-wide text-primary/60">
                  From &#8377;4,999
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 4: Process Strip ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl text-surface md:text-4xl">
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
                caption: "19h 42m print time",
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
      <section className="relative bg-surface px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-lg">
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
            <p className="font-serif text-2xl leading-snug text-primary/80 md:text-3xl">
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
