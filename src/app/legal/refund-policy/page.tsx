import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Refund Policy — Waves Company",
  description: "Waves Company refund and return policy. Made-to-order lighting objects.",
};

export default function RefundPolicyPage() {
  return (
    <main className="relative min-h-screen bg-surface">
      <section className="border-b border-primary/10 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-primary/30 uppercase">Legal</p>
          <h1 className="font-serif text-4xl text-primary md:text-5xl">Refund Policy</h1>
          <p className="mt-4 font-mono text-xs tracking-wide text-primary/40">Last updated: March 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-16">

          <div id="overview">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">01</span>
              <h2 className="font-sans text-xl font-medium text-primary">Overview</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Every piece Waves Company makes is built to order — designed, printed, and assembled specifically for you. We do not hold stock. We do not manufacture speculatively. The lamp that arrives at your door was made after you placed your order.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Because of this, we do not accept returns for reasons of preference, change of mind, or ordering error. This policy exists not to protect us from inconvenience, but because returning a made-to-order object creates waste that conflicts with how we build.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We do, however, stand fully behind our work. If something arrives damaged — whether from transit or from a fault in manufacture — we will make it right.</p>
            </div>
          </div>

          <div id="eligible-refunds">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">02</span>
              <h2 className="font-sans text-xl font-medium text-primary">When a refund applies</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">We will issue a full refund or replacement (your choice) in the following circumstances:</p>
              <ul className="space-y-3 py-2">
                {[
                  "The product arrives physically damaged due to transit.",
                  "The product arrives with a manufacturing defect — a structural fault, an electrical failure, or a significant deviation from the confirmed order specifications.",
                  "The product does not match the configuration you ordered (wrong shade colour, base material, or cable option).",
                  "The product does not arrive within 30 days of your confirmed shipping date and the delay is not attributable to customs, address error, or force majeure.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                  </li>
                ))}
              </ul>
              <p className="text-base font-light leading-relaxed text-primary/75">Visible seams on printed surfaces are not a defect. They are an intentional design feature — a mark of honest manufacture. Every Waves lamp has one. This is communicated clearly at the point of purchase.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Minor variations in colour, texture, or surface pattern between product photographs and delivered product are inherent to 3D-printed objects and are not grounds for a refund.</p>
            </div>
          </div>

          <div id="process">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">03</span>
              <h2 className="font-sans text-xl font-medium text-primary">How to raise a claim</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">To initiate a refund or replacement claim, contact us within 7 days of receiving your order.</p>
              <ol className="space-y-3 py-2">
                {[
                  "Email hello@waves.company with subject line: Order [your order number] — Damage Claim",
                  "Include clear photographs of the damage, the packaging, and the product as received.",
                  "We will acknowledge your claim within 2 business days.",
                  "Once verified, we will arrange either a full refund to your original payment method or a replacement — whichever you prefer.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[11px] tracking-wide text-primary/30 mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-base font-light leading-relaxed text-primary/75">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="text-base font-light leading-relaxed text-primary/75">Refunds are processed within 5–7 business days of approval. The time taken to reflect in your account depends on your bank or payment provider.</p>
            </div>
          </div>

          <div id="not-eligible">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">04</span>
              <h2 className="font-sans text-xl font-medium text-primary">What we do not refund</h2>
            </div>
            <div className="space-y-4 pl-10">
              <ul className="space-y-3 py-2">
                {[
                  "Orders cancelled after the manufacturing process has begun.",
                  "Products damaged after delivery due to improper use, incorrect wiring, or physical impact.",
                  "Dissatisfaction with the visual appearance of the printed surface texture, seam lines, or layer patterns — these are documented features of the product.",
                  "Custom or bespoke orders where specifications were confirmed in writing before manufacture.",
                  "Shipping fees, customs duties, or import taxes paid by the customer.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="cancellations">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">05</span>
              <h2 className="font-sans text-xl font-medium text-primary">Order cancellations</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Orders may be cancelled without charge within 24 hours of placement, provided manufacture has not begun.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">After 24 hours, or once manufacture has started (we will confirm this by email), cancellation is not possible. The materials have been allocated and the print has begun.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">To request a cancellation within the 24-hour window, email hello@waves.company immediately with your order number.</p>
            </div>
          </div>

          <div id="jurisdiction">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">06</span>
              <h2 className="font-sans text-xl font-medium text-primary">Jurisdiction</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Waves Company operates from India and is subject to the Consumer Protection Act, 2019 (India) and applicable rules thereunder. For customers in other jurisdictions, we will make reasonable efforts to comply with applicable local consumer protection requirements.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">For any disputes arising from this policy, the courts of Coimbatore, Tamil Nadu, India shall have jurisdiction.</p>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-12">
            <p className="text-base font-light text-primary/60">
              Questions about this policy?{" "}
              <Link href="/contact" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">Contact us</Link>{" "}
              or email{" "}
              <a href="mailto:hello@waves.company" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">hello@waves.company</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
