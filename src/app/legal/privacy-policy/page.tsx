import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Waves Company",
  description: "Waves Company privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface pt-24">
      <section className="border-b border-primary/10 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-primary/30 uppercase">Legal</p>
          <h1 className="font-serif text-4xl text-primary md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 font-mono text-xs tracking-wide text-primary/40">Last updated: March 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-16">

          <div id="who-we-are">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">01</span>
              <h2 className="font-sans text-xl font-medium text-primary">Who we are</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Waves Company is a design and manufacturing studio based in India, operating at waves.company. We design and sell algorithmically crafted lighting objects — made to order, shipped worldwide. This Privacy Policy explains what personal information we collect when you use our website or purchase from us, how we use it, and what rights you have in relation to it. By using our website or placing an order, you agree to the collection and use of your information as described in this policy.</p>
            </div>
          </div>

          <div id="what-we-collect">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">02</span>
              <h2 className="font-sans text-xl font-medium text-primary">What we collect</h2>
            </div>
            <div className="space-y-6 pl-10">
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-widest text-primary/40 uppercase">Information you provide directly</p>
                <ul className="space-y-3">
                  {[
                    "Name, email address, and password when you create an account.",
                    "Shipping address and contact number when you place an order.",
                    "Message content and project details when you submit a contact or project enquiry form.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-widest text-primary/40 uppercase">Information collected automatically</p>
                <ul className="space-y-3">
                  {[
                    "Technical data including your IP address, browser type, device type, and operating system.",
                    "Pages visited, time spent on pages, and referring URLs.",
                    "Cart and browsing behaviour on our website.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-widest text-primary/40 uppercase">Information from third parties</p>
                <ul className="space-y-3">
                  {[
                    "Payment information is processed by Shopify Payments. We do not store your card details. Payment data is handled by Shopify in accordance with PCI DSS standards.",
                    "Order and account data is stored and managed through Shopify's infrastructure.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div id="how-we-use">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">03</span>
              <h2 className="font-sans text-xl font-medium text-primary">How we use your information</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">We use the information we collect to: process and fulfil orders; communicate about orders (confirmation, tracking, delivery); respond to contact and project enquiries; manage accounts; improve the website and service; comply with legal obligations.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We do not use your data for automated decision-making or profiling. We do not sell your data.</p>
            </div>
          </div>

          <div id="who-we-share-with">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">04</span>
              <h2 className="font-sans text-xl font-medium text-primary">Who we share your information with</h2>
            </div>
            <div className="space-y-4 pl-10">
              <ul className="space-y-3">
                {[
                  "Shopify (e-commerce and payments)",
                  "Shipping carriers (name and address for dispatch)",
                  "Notion (contact form message storage)",
                  "Legal authorities if required by law",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <p className="text-base font-light leading-relaxed text-primary/75">{item}</p>
                  </li>
                ))}
              </ul>
              <p className="text-base font-light leading-relaxed text-primary/75">We do not share with advertising networks or data brokers.</p>
            </div>
          </div>

          <div id="retention">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">05</span>
              <h2 className="font-sans text-xl font-medium text-primary">How long we keep your data</h2>
            </div>
            <div className="space-y-4 pl-10">
              <div className="overflow-hidden rounded-xl border border-primary/10">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: "Order records", value: "Minimum 7 years (GST law)" },
                      { label: "Account data", value: "Until account closed, then deleted within 30 days unless legally required" },
                      { label: "Enquiry messages", value: "Up to 24 months" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-primary/10 last:border-0">
                        <td className="px-5 py-4 font-mono text-[11px] tracking-wide text-primary/40 w-40">{row.label}</td>
                        <td className="px-5 py-4 font-sans text-sm font-light text-primary/75">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="your-rights">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">06</span>
              <h2 className="font-sans text-xl font-medium text-primary">Your rights</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Depending on your location, you may have rights including: access, correction, deletion, portability, and objection to processing.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">EEA and UK customers: your rights are governed by GDPR and UK GDPR respectively. Indian customers: your rights are governed by the Digital Personal Data Protection Act 2023 (DPDPA).</p>
              <p className="text-base font-light leading-relaxed text-primary/75">To exercise any of your rights, email hello@waves.company. We will respond within 30 days.</p>
            </div>
          </div>

          <div id="cookies">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">07</span>
              <h2 className="font-sans text-xl font-medium text-primary">Cookies</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">We use cookies for cart and account session functionality. Analytics are provided via Plausible — a cookie-free analytics service with no cross-site tracking. Shopify sets functional cookies for the checkout process.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">You can disable cookies in your browser settings. Doing so may affect cart and checkout functionality.</p>
            </div>
          </div>

          <div id="security">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">08</span>
              <h2 className="font-sans text-xl font-medium text-primary">Security</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Our website uses HTTPS throughout. Shopify Payments is PCI DSS Level 1 compliant — we never see or store your card details. We take reasonable technical and organisational measures to protect your data, but cannot guarantee absolute security against all threats.</p>
            </div>
          </div>

          <div id="international-transfers">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">09</span>
              <h2 className="font-sans text-xl font-medium text-primary">International transfers</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Waves Company is based in India. Data from international visitors is processed in India. Our service providers (Shopify, Notion) may process data in the United States and elsewhere, subject to applicable data protection law.</p>
            </div>
          </div>

          <div id="changes">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">10</span>
              <h2 className="font-sans text-xl font-medium text-primary">Changes to this policy</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">We may update this policy from time to time. Changes will be posted on this page with a revised date. Continued use of our website after changes are posted constitutes acceptance of the updated policy.</p>
            </div>
          </div>

          <div id="contact">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">11</span>
              <h2 className="font-sans text-xl font-medium text-primary">Contact</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">
                For any privacy-related questions or to exercise your rights, contact us at{" "}
                <a href="mailto:hello@waves.company" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">hello@waves.company</a>.
              </p>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-12">
            <p className="mb-4 text-sm font-light text-primary/50">Related policies</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/terms-of-service" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Terms of Service</Link>
              <Link href="/legal/refund-policy" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Refund Policy</Link>
              <Link href="/legal/shipping-policy" className="font-mono text-[11px] tracking-wide text-primary/50 underline underline-offset-4 transition-colors hover:text-primary">Shipping Policy</Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
