import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ChapterReveal from "@/components/ChapterReveal";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "About - Waves Company",
  description:
    "A printer, a gift, and a tilde. The origin story of Waves Company — algorithmically crafted lighting objects.",
  openGraph: {
    title: "About - Waves Company",
    description:
      "A printer, a gift, and a tilde. The origin story of Waves Company — algorithmically crafted lighting objects.",
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

const chapters = [
  {
    title: "Curiosity",
    body: [
      "It started with computational design. Learning how geometry could be generated through logic, how parameters could replace intuition, how a machine could be told exactly what to make — and then asked to make something better.",
      "That curiosity led to a 3D printer. Not for production. Not for a business plan. Just to close the gap between what was being modeled on screen and what could exist in a room.",
      "The first few weeks were what they always are. Benchys. Vases. Random prints from the internet. The usual range of things a person makes when they're still figuring out what a machine can actually do.",
    ],
    image: "Computational design — Grasshopper parametric model",
  },
  {
    title: "The Lamp",
    body: [
      "Then came a specific problem. A gift for a mother who loved decorating her home. A lamp felt right — but buying one felt like a shortcut.",
      "So instead, one was designed. An origami form. A CNC-milled wooden base. Wired carefully. Assembled by hand.",
      "When it was switched on, something shifted. The way the printed layers diffused the light. The way the geometry created shadow gradients that no off-the-shelf shade could produce. The realisation that this material — this process — had something to say about light that hadn't been said yet.",
    ],
    image: "The first lamp — origami form, CNC base, warm light",
  },
  {
    title: "Going Deeper",
    body: [
      "The instinct, as always, was to push further. Past the slicer. Past the defaults. Into the G-code — the raw instruction set that tells a printer exactly where to move, how fast, and how much to extrude.",
      "Using Grasshopper as the engine, custom toolpaths were developed. Extrusion logic was rewritten. Print parameters were tested, broken, and refined again. Layer height was treated as a design variable. Wall density as a lighting tool. Toolpath direction as texture.",
      "This wasn't convenience. This was a medium being understood on its own terms.",
    ],
    image: "Custom toolpath — G-code visualisation",
  },
  {
    title: "The Gap",
    body: [
      "Looking at what else existed — 3D printed lighting sold online, on marketplaces, in shops — revealed a consistent pattern. Vase mode. Simple extrusions. Forms chosen because they were easy to print, not because they were worth making.",
      "The question became: what if someone approached this the way industrial product designers approach their work? With structural intent. Material reasoning. Proportional discipline. What if the process was taken seriously?",
    ],
    image: "Comparison — standard vase mode vs Waves toolpath",
  },
  {
    title: "The First Objects",
    body: [
      "Two designs were developed. Tested across multiple iterations. Structurally resolved. Electrically considered. Components sourced carefully. Bases CNC-milled from wood to add material honesty beyond the printed form.",
      "The Hourglass. The Ripple.",
      "Launched on the 1st of January, 2026.",
      "Since then, Waves has completed installations for offices and residences, and is currently working with architects and interior designers on custom lighting briefs. The catalogue grows from real projects. Every piece made for a specific space becomes the next object in the collection.",
      "Not because the technology is interesting. Because what it allows us to make is.",
    ],
    image: "Hourglass and Ripple — the first two products",
  },
];

const beliefs = [
  "Objects deserve the same intellectual rigour as buildings.",
  "Light is not decoration — it is atmosphere.",
  "We design with computation. We decide with judgment.",
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* ─── Opening ─── */}
      <section className="px-6 pb-8 pt-12 lg:pb-12 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/40">
              Origin story
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
              A printer, a gift, and a tilde.
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-primary/60">
              Waves wasn&rsquo;t planned. It was prototyped&thinsp;&mdash;&thinsp;the
              way most honest things are.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 1: Origin Story — 5 chapters ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          {chapters.map((chapter, i) => (
            <ChapterReveal
              key={chapter.title}
              index={i}
              className={i > 0 ? "mt-20 lg:mt-28" : ""}
            >
              {/* Chapter number + title */}
              <div className="mb-8 flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-widest text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-3xl md:text-4xl">{chapter.title}</h2>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-5">
                {chapter.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base font-light leading-relaxed text-primary/80 md:text-lg md:leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Chapter image placeholder */}
              <div className="mt-10">
                <PlaceholderImage
                  label={chapter.image}
                  aspect="aspect-[16/9]"
                />
              </div>
            </ChapterReveal>
          ))}
        </div>
      </section>

      {/* ─── Section 2: The Name ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-7xl text-surface/20 md:text-9xl">~</p>
            <h2 className="mt-6 text-3xl text-surface md:text-4xl">
              The Name
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-surface/70 md:text-lg md:leading-relaxed">
              The tilde. A small symbol on the keyboard&thinsp;&mdash;&thinsp;shaped
              like a wave. The same wave the printer traces across a surface.
              The same undulation that appears in the lamp forms. Light travels
              in waves. The name was already there.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 3: The Studio ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">The Studio</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-base font-light leading-relaxed text-primary/80 md:text-lg md:leading-relaxed">
              Waves Company was founded by an architect and computational
              designer with a background in parametric modeling and digital
              fabrication. The studio operates in close collaboration with Koodu
              Architecture, which provides both the spatial context and the
              client relationships through which much of the early work has
              developed.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-5 text-base font-light leading-relaxed text-primary/80 md:text-lg md:leading-relaxed">
              We are a small studio. We are building carefully.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 4: What We Believe ─── */}
      <section className="bg-surface-dark px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-12 md:gap-16">
            {beliefs.map((belief, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className="text-center font-serif text-2xl leading-snug text-primary md:text-3xl lg:text-4xl">
                  &ldquo;{belief}&rdquo;
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-wide text-primary/40">
              Still printing. Still curious.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
