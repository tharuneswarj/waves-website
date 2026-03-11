import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Studio - Waves Company",
  description:
    "Custom lighting for architects and designers. Pendant configurations, scale variations, and bespoke forms adapted to your brief.",
  openGraph: {
    title: "Studio - Waves Company",
    description:
      "Custom lighting for architects and designers. Pendant configurations, scale variations, and bespoke forms adapted to your brief.",
    images: [
      {
        url: "/logos/Cream_and_Blue__Logo.png",
        width: 800,
        height: 600,
        alt: "Waves Company logo",
      },
    ],
  },
};

const capabilities = [
  {
    title: "Pendant Configurations",
    description: "Single and clustered formations for any ceiling geometry.",
    label: "Capability — pendant configurations",
  },
  {
    title: "Scale Variations",
    description: "From table-top to large-format statement pieces.",
    label: "Capability — scale variations",
  },
  {
    title: "Custom Forms",
    description: "Bespoke geometry generated from your project brief.",
    label: "Capability — custom forms",
  },
  {
    title: "Material Exploration",
    description: "Different filaments and finishes for specific contexts.",
    label: "Capability — material exploration",
  },
];

export default function StudioPage() {
  const projects = getAllProjects();

  return (
    <main className="pt-24">
      {/* ─── Section 1: Introduction ─── */}
      <section className="px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h1 className="max-w-2xl text-4xl md:text-5xl lg:text-6xl">
              Custom Lighting for Architects &amp; Designers
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-primary/70">
              We design and fabricate custom lighting for spaces that demand
              specificity. Pendant configurations, scale variations, bespoke
              forms&thinsp;&mdash;&thinsp;adapted to your brief.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 2: Project Grid ─── */}
      <section className="px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link href={`/studio/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-lg">
                    {project.heroImage ? (
                      <div className="relative aspect-[4/3] bg-primary/5">
                        <Image
                          src={project.heroImage.url}
                          alt={project.heroImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage
                        label={`${project.title} — installation photography`}
                        aspect="aspect-[4/3]"
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    <h2 className="font-sans text-lg font-medium text-primary md:text-xl">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm font-normal text-primary/60">
                      {project.type}
                    </p>
                    <p className="mt-1 font-mono text-[11px] tracking-wide text-primary/65">
                      {project.location}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Capabilities ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl text-surface md:text-4xl">
              What we can do
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 0.08}>
                <div className="flex flex-col gap-4">
                  <PlaceholderImage
                    label={cap.label}
                    aspect="aspect-square"
                    className="rounded-lg bg-surface/10"
                  />
                  <h3 className="text-base font-medium text-surface">
                    {cap.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-surface/60">
                    {cap.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Brief CTA ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl">Have a project in mind?</h2>
            <p className="mt-4 text-base font-light leading-relaxed text-primary/70 md:text-lg">
              Tell us about the space. We&rsquo;ll tell you what&rsquo;s
              possible.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-accent px-10 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark"
            >
              Start a conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
