import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ChapterReveal from "@/components/ChapterReveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import CompareSlider from "@/components/CompareSlider";


export const metadata: Metadata = {
  title: "Process - Waves Company",
  description:
    "Most 3D printed lighting is made in vase mode. We took a different approach.",
  openGraph: {
    title: "Process - Waves Company",
    description:
      "Most 3D printed lighting is made in vase mode. We took a different approach.",
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

const stages = [
  {
    step: "01",
    title: "Computation",
    body: "Form is generated through logic, not drawn by hand. Using Grasshopper as the parametric engine, geometry is defined by rules — curvature, proportion, structural integrity, and light diffusion are all parameters, not afterthoughts. The algorithm runs hundreds of variations. We pick the ones worth making.",
    detail:
      "Grasshopper definitions control every variable: wall angle, layer spacing, taper ratio, aperture diameter. Each change propagates through the entire model. The form is always structurally valid because the rules enforce it.",
    image: "Grasshopper parametric definition — algorithm screenshot",
    mono: null,
  },
  {
    step: "02",
    title: "Toolpath",
    body: "This is where the real design happens. Unlike standard slicing software that treats every layer identically, we write custom G-code. Speed, extrusion rate, and layer height vary across the print — creating surface texture and light diffusion patterns that standard vase mode cannot produce.",
    detail:
      "Every layer is a design decision. Where the nozzle slows, the wall thickens and becomes more opaque. Where it speeds up, the wall thins and lets more light through. Toolpath direction becomes texture. Layer height becomes rhythm.",
    image: "Custom G-code toolpath visualisation",
    mono: "Layer height: 0.16mm — variable extrusion",
  },
  {
    step: "03",
    title: "Printing",
    body: "The machine runs for hours. The Hourglass takes just under 20 hours. The Ripple, slightly less. There is no shortcut. The time is the integrity — each layer fused to the last, each curve resolved by the toolpath written for that specific form.",
    detail: null,
    image: "3D printer running — mid-print photograph",
    mono: "Print time: 19h 42m",
  },
  {
    step: "04",
    title: "Finishing",
    body: "Code defines the structure. Human hands give it nuance. Each lamp is removed from the build plate, inspected, cleaned. The electrical components are wired. The base — standard or CNC-milled wood — is fitted. The cord is measured and cut. Every connection is checked.",
    detail:
      "This is where the object becomes a product. Not through branding or packaging, but through the care of assembly. A lamp that works reliably, feels solid when you pick it up, and switches on exactly the way you expect it to.",
    image: "Hand assembly — wiring, base fitting, quality check",
    mono: null,
  },
  {
    step: "05",
    title: "Light",
    body: "The payoff. When the bulb is switched on, the printed layers become a diffusion system. Light passes through material of varying thickness and angle, creating gradients that shift as you move around the object. Shadow patterns emerge on surrounding surfaces. The room changes.",
    detail:
      "We test with warm white LEDs at specific colour temperatures. The material, the wall thickness, the geometry — they all determine how the light behaves. This is not decoration. This is atmosphere, designed.",
    image: "Final object — switched on, warm light diffusion",
    mono: "E27 warm white LED — 2700K recommended",
  },
];

export default function ProcessPage() {
  return (
    <main className="relative pt-24">
      {/* ─── Section 1: Opening ─── */}
      <section className="px-6 pb-8 pt-12 lg:pb-12 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Most 3D printed lighting is made in vase mode.
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-primary/60 md:text-xl">
              We took a different approach.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 2: Five Stages ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-4xl">
          {stages.map((stage, i) => {
            const isEven = i % 2 === 0;
            return (
              <ChapterReveal
                key={stage.step}
                index={i}
                className={i > 0 ? "mt-24 lg:mt-34" : ""}
              >
                <div
                  className={`flex flex-col gap-8 md:flex-row md:gap-12 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="flex-1">
                    <PlaceholderImage
                      label={stage.image}
                      aspect="aspect-square"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col justify-center">
                    <span className="font-mono text-[11px] tracking-widest text-primary/30">
                      {stage.step}
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl">
                      {stage.title}
                    </h2>
                    <p className="mt-5 text-base font-light leading-relaxed text-primary/80">
                      {stage.body}
                    </p>
                    {stage.detail && (
                      <p className="mt-4 text-sm font-light leading-relaxed text-primary/60">
                        {stage.detail}
                      </p>
                    )}
                    {stage.mono && (
                      <p className="mt-5 font-mono text-[11px] tracking-wide text-primary/65">
                        {stage.mono}
                      </p>
                    )}
                  </div>
                </div>
              </ChapterReveal>
            );
          })}
        </div>
      </section>

      {/* ─── Section 3: The Difference — Before/After ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-4 text-center text-3xl text-surface md:text-4xl">
              The Difference
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-center text-base font-light text-surface/60">
              Drag to compare a standard vase mode print with a Waves custom
              toolpath result.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <CompareSlider
              leftLabel="Standard vase mode — uniform wall, no texture control"
              rightLabel="Waves toolpath — variable extrusion, designed diffusion"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 4: Materials ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">Materials</h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-base font-light leading-relaxed text-primary/80 md:text-lg">
              We print in PLA — a plant-based polymer derived from corn starch.
              It&rsquo;s rigid, dimensionally stable, and prints with a surface
              quality that synthetic polymers struggle to match. The material is
              chosen for its behaviour with light: semi-translucent at thin wall
              thicknesses, opaque where structure demands it.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 overflow-hidden rounded-lg border border-primary/10">
              <table className="w-full">
                <tbody className="divide-y divide-primary/10">
                  {[
                    ["Material", "PLA (polylactic acid)"],
                    ["Source", "Plant-based — corn starch derivative"],
                    ["Layer height", "0.16mm (variable across print)"],
                    ["Wall thickness", "0.4mm – 1.2mm (variable)"],
                    ["Colour", "Natural translucent white"],
                    ["UV stability", "Indoor use recommended"],
                    ["Recyclability", "Industrially compostable"],
                  ].map(([label, value]) => (
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
    </main>
  );
}
