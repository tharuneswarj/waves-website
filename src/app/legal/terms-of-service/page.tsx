import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Waves Company",
  description: "Waves Company terms of service. Governing use of waves.company and all purchases.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="border-b border-primary/10 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-primary/30 uppercase">Legal</p>
          <h1 className="font-serif text-4xl text-primary md:text-5xl">Terms of Service</h1>
          <p className="mt-4 font-mono text-xs tracking-wide text-primary/40">Last updated: March 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-16">

          <div id="acceptance">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">01</span>
              <h2 className="font-sans text-xl font-medium text-primary">Acceptance of terms</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">These Terms of Service govern your use of waves.company and any purchase you make from Waves Company. By accessing the website or placing an order, you accept these terms in full. If you do not agree, do not use this website. We reserve the right to update these terms at any time; continued use constitutes acceptance.</p>
            </div>
          </div>

          <div id="about">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">02</span>
              <h2 className="font-sans text-xl font-medium text-primary">About Waves Company</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Waves Company is a design and manufacturing studio based in Coimbatore, Tamil Nadu, India. We design, manufacture, and sell algorithmically crafted lighting objects — made to order — through waves.company.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">
                Contact:{" "}
                <a href="mailto:hello@waves.company" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">hello@waves.company</a>
              </p>
            </div>
          </div>

          <div id="products-orders">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">03</span>
              <h2 className="font-sans text-xl font-medium text-primary">Products and orders</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">All products are made to order. We hold no stock. Manufacture begins after confirmed payment. Minor variations in colour, texture, and surface pattern are inherent to 3D printing and are not defects. Visible seams are an intentional design feature.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We reserve the right to refuse or cancel any order, in which case a full refund will be issued. Prices shown on the website may change at any time, but price changes will not affect orders already confirmed.</p>
            </div>
          </div>

          <div id="payment">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">04</span>
              <h2 className="font-sans text-xl font-medium text-primary">Payment</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Payment is required in full at the time of order. All payments are processed by Shopify Payments — we do not store your card details. Currency conversion fees charged by your bank or card provider are your responsibility.</p>
            </div>
          </div>

          <div id="shipping">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">05</span>
              <h2 className="font-sans text-xl font-medium text-primary">Shipping and delivery</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">
                Shipping, delivery times, and related conditions are governed by our{" "}
                <Link href="/legal/shipping-policy" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">Shipping Policy</Link>.
              </p>
            </div>
          </div>

          <div id="returns">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">06</span>
              <h2 className="font-sans text-xl font-medium text-primary">Returns and refunds</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">
                Returns, refunds, and cancellations are governed by our{" "}
                <Link href="/legal/refund-policy" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">Refund Policy</Link>.
              </p>
            </div>
          </div>

          <div id="intellectual-property">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">07</span>
              <h2 className="font-sans text-xl font-medium text-primary">Intellectual property</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">All content on waves.company — including designs, photographs, copy, the Waves Company name, logo, and all computational design work — is the intellectual property of Waves Company. No content may be reproduced for commercial purposes without our written consent.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Parametric models, toolpath logic, and G-code used to produce our products are proprietary. Purchasing a product confers no licence to reproduce, manufacture, or distribute the designs.</p>
            </div>
          </div>

          <div id="website-use">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">08</span>
              <h2 className="font-sans text-xl font-medium text-primary">Use of this website</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">You agree not to:</p>
              <ul className="space-y-3">
                {[
                  "Attempt to gain unauthorised access to any part of our systems or infrastructure.",
                  "Use automated scrapers, bots, or crawlers to extract data from the website.",
                  "Transmit malicious code, viruses, or other harmful software.",
                  "Engage in fraudulent activity including submitting false orders or payment details.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="liability">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">09</span>
              <h2 className="font-sans text-xl font-medium text-primary">Limitation of liability</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">To the fullest extent permitted by applicable law, Waves Company shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the website or any product purchased from us. Our total liability to you shall not exceed the amount you paid for the relevant order.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Nothing in these terms excludes or limits our liability for negligence causing personal injury or death, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.</p>
            </div>
          </div>

          <div id="product-safety">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">10</span>
              <h2 className="font-sans text-xl font-medium text-primary">Product safety and use</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Waves lamps are designed for standard household use with an E14 LED bulb. Use only compatible bulbs as specified. Electrical installation must comply with applicable local standards (IS standards in India).</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Waves Company is not liable for damage or injury resulting from improper installation, modification of the product, use of incompatible bulbs, or failure to follow applicable electrical safety standards.</p>
            </div>
          </div>

          <div id="privacy">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">11</span>
              <h2 className="font-sans text-xl font-medium text-primary">Privacy</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">
                Collection and use of your personal information is governed by our{" "}
                <Link href="/legal/privacy-policy" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div id="governing-law">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">12</span>
              <h2 className="font-sans text-xl font-medium text-primary">Governing law and disputes</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">These terms are governed by Indian law. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of Coimbatore, Tamil Nadu, India.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Nothing in these terms affects the statutory rights of consumers in the European Union or other jurisdictions where mandatory consumer protection laws apply.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Before initiating any formal dispute, we ask that you contact us directly at hello@waves.company. We will make every reasonable effort to resolve matters informally.</p>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-12">
            <p className="mb-4 text-sm font-light text-primary/50">Related policies</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy-policy" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Privacy Policy</Link>
              <Link href="/legal/refund-policy" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Refund Policy</Link>
              <Link href="/legal/shipping-policy" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Shipping Policy</Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
