import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForms from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact - Waves Company",
  description:
    "Get in touch — whether you want to buy a lamp or have a custom lighting project in mind.",
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      {/* ─── Header ─── */}
      <section className="px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">Get in Touch</h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-primary/60">
              Whether you&rsquo;re looking for a lamp or have a space that needs
              something specific.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Forms ─── */}
      <section className="px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto max-w-3xl">
          <ContactForms />
        </div>
      </section>

      {/* ─── Direct Contact ─── */}
      <section className="border-t border-primary/10 px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-sans text-sm font-light text-primary/50">
              Or reach us directly
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="mailto:hello@waves.company"
                className="font-sans text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                hello@waves.company
              </a>
              <a
                href="https://instagram.com/waves_company_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                @waves_company_
              </a>
            </div>
            <p className="mt-6 font-mono text-xs tracking-wide text-primary/30">
              We typically respond within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
