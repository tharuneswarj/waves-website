# Waves Website — Updates

*Branch: master*
*Generated: 13 March 2026*
*Status: COMPLETE*

---

## P0 — Legal pages + footer update

### 1. Create four legal pages

Create the following directory structure under `src/app/legal/`:

```
src/app/legal/refund-policy/page.tsx
src/app/legal/shipping-policy/page.tsx
src/app/legal/privacy-policy/page.tsx
src/app/legal/terms-of-service/page.tsx
```

All four page files are provided in full below. No new components needed — they use only existing brand tokens and Tailwind classes consistent with the rest of the site.

---

### 2. Update `src/components/Footer.tsx`

Add a `legalLinks` array and restructure the bottom bar to show legal links at the smallest font size (`font-mono text-[10px]`), separated by `·` dots, sitting just above the copyright line.

Replace the entire file with:

```tsx
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/legal/refund-policy", label: "Refund Policy" },
  { href: "/legal/shipping-policy", label: "Shipping Policy" },
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-of-service", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Waves Company home">
              <Image src="/logos/Blue_and_Cream_Logo_v2.png" alt="Waves Company" width={140} height={56} className="h-12 w-auto" />
            </Link>
            <p className="max-w-xs text-sm font-light leading-relaxed text-surface/80">
              Lighting objects designed through code, material honesty, and human touch.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-surface/80 transition-colors hover:text-surface">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a href="mailto:hello@waves.company" className="text-sm font-light text-surface/80 transition-colors hover:text-surface">
              hello@waves.company
            </a>
            <a href="https://instagram.com/waves_company_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-light text-surface/80 transition-colors hover:text-surface">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @waves_company_
            </a>
          </div>
        </div>

        <div className="my-10 h-px bg-surface/15" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-wide text-surface/50">Still printing. Still curious.</p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label="Legal">
              {legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link href={link.href} className="font-mono text-[10px] tracking-wide text-surface/35 transition-colors hover:text-surface/60">
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="font-mono text-[10px] text-surface/20">·</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
          <p className="font-mono text-xs tracking-wide text-surface/50">
            &copy; {new Date().getFullYear()} Waves Company &middot; Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

### 3. `src/app/legal/refund-policy/page.tsx` — full file

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy — Waves Company",
  description: "Waves Company refund and return policy. Made-to-order lighting objects.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-surface">
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
```

---

### 4. `src/app/legal/shipping-policy/page.tsx` — full file

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy — Waves Company",
  description: "Waves Company shipping policy. Every lamp is made to order. Manufacturing takes 7–10 days. Ships worldwide from India.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="border-b border-primary/10 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-primary/30 uppercase">Legal</p>
          <h1 className="font-serif text-4xl text-primary md:text-5xl">Shipping Policy</h1>
          <p className="mt-4 font-mono text-xs tracking-wide text-primary/40">Last updated: March 2026</p>
        </div>
      </section>

      <section className="border-b border-primary/10 bg-primary/5 px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary/30 uppercase mb-1">Manufacturing</p>
              <p className="font-sans text-base font-medium text-primary">7–10 business days</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary/30 uppercase mb-1">India delivery</p>
              <p className="font-sans text-base font-medium text-primary">3–5 business days after dispatch</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary/30 uppercase mb-1">International</p>
              <p className="font-sans text-base font-medium text-primary">12–25 business days after dispatch</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-16">

          <div id="made-to-order">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">01</span>
              <h2 className="font-sans text-xl font-medium text-primary">Made to order</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Nothing ships from a warehouse. Every Waves lamp is manufactured after you place your order — printed, assembled, and quality-checked before it leaves the studio.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">This means two things. First, your lamp is made specifically for you. Second, there is a lead time before it ships. We do not apologise for this. It is part of how we work.</p>
            </div>
          </div>

          <div id="lead-time">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">02</span>
              <h2 className="font-sans text-xl font-medium text-primary">Manufacturing and lead time</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">From the moment your order is confirmed, please allow the following:</p>
              <div className="overflow-hidden rounded-xl border border-primary/10 my-4">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: "Manufacturing", value: "7–10 business days", note: "Printing, assembly, wiring, quality check" },
                      { label: "Packaging", value: "1–2 business days", note: "Packed carefully for transit" },
                      { label: "Dispatch notification", value: "Within 24 hours of shipping", note: "Email with tracking details" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-primary/10 last:border-0">
                        <td className="px-5 py-4 font-mono text-[11px] tracking-wide text-primary/40 w-44">{row.label}</td>
                        <td className="px-5 py-4 font-sans text-sm font-medium text-primary">{row.value}</td>
                        <td className="px-5 py-4 font-mono text-[10px] tracking-wide text-primary/30 hidden sm:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-base font-light leading-relaxed text-primary/75">For custom or bespoke orders agreed with us directly, lead times will be confirmed in writing before manufacture begins.</p>
            </div>
          </div>

          <div id="delivery">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">03</span>
              <h2 className="font-sans text-xl font-medium text-primary">Delivery times</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Once dispatched from our studio, estimated delivery times are:</p>
              <div className="overflow-hidden rounded-xl border border-primary/10 my-4">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: "Within India", value: "3–5 business days" },
                      { label: "South Asia (SAARC)", value: "7–12 business days" },
                      { label: "Southeast Asia", value: "10–15 business days" },
                      { label: "Europe / UK", value: "12–18 business days" },
                      { label: "North America", value: "14–20 business days" },
                      { label: "Rest of world", value: "14–25 business days" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-primary/10 last:border-0">
                        <td className="px-5 py-4 font-mono text-[11px] tracking-wide text-primary/40 w-44">{row.label}</td>
                        <td className="px-5 py-4 font-sans text-sm font-medium text-primary">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-base font-light leading-relaxed text-primary/75">These are estimates, not guarantees. Delays can occur due to customs clearance, local postal service conditions, or circumstances outside our control. We will always communicate proactively if we become aware of a delay affecting your order.</p>
            </div>
          </div>

          <div id="tracking">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">04</span>
              <h2 className="font-sans text-xl font-medium text-primary">Tracking</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Every order ships with tracking. You will receive an email with your tracking number and a link to the carrier's tracking page within 24 hours of dispatch.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">If you have not received tracking information within 12 business days of your order being confirmed, contact us at hello@waves.company.</p>
            </div>
          </div>

          <div id="shipping-costs">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">05</span>
              <h2 className="font-sans text-xl font-medium text-primary">Shipping costs</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Shipping costs are calculated at checkout based on destination and order weight. These are shown clearly before payment.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We do not mark up shipping. You pay what the carrier charges us.</p>
            </div>
          </div>

          <div id="customs">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">06</span>
              <h2 className="font-sans text-xl font-medium text-primary">Customs, duties, and import taxes</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">For international orders, your shipment may be subject to import duties, customs fees, and local taxes upon arrival in your country. These charges are determined by your country's customs authority and are entirely outside our control.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Customs fees and import taxes are the responsibility of the recipient. Waves Company does not collect or reimburse these charges.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We are required by law to accurately declare the value and nature of goods on all customs documentation. We do not undervalue shipments.</p>
            </div>
          </div>

          <div id="damage">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">07</span>
              <h2 className="font-sans text-xl font-medium text-primary">Damage in transit</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">We pack every order carefully. If your lamp arrives damaged due to transit, please refer to our Refund Policy for the claims process.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Document the damage before unpacking fully — photograph the outer packaging and the product as received.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">See our <Link href="/legal/refund-policy" className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent">Refund Policy</Link> for full details on damage claims.</p>
            </div>
          </div>

          <div id="address">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-widest text-primary/25">08</span>
              <h2 className="font-sans text-xl font-medium text-primary">Delivery address</h2>
            </div>
            <div className="space-y-4 pl-10">
              <p className="text-base font-light leading-relaxed text-primary/75">Please ensure your delivery address is accurate at the time of ordering. We ship to the address provided at checkout.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">Address changes can be accommodated within 24 hours of order placement, provided dispatch has not occurred. Email hello@waves.company immediately with your order number and the corrected address.</p>
              <p className="text-base font-light leading-relaxed text-primary/75">We are not responsible for non-delivery due to an incorrect or incomplete address provided at checkout.</p>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-12">
            <p className="text-base font-light text-primary/60">
              Questions about your order?{" "}
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
```

---

### 5. `src/app/legal/privacy-policy/page.tsx` — full file

Write a privacy policy page following the exact same visual structure as the refund and shipping policy pages above (numbered sections, `font-mono text-[11px]` section numbers, `font-sans text-xl font-medium` headings, `text-base font-light` body, `pl-10` indent, bullet dots in `bg-accent`).

Cover these 11 sections in order, using the copy below:

**01 — Who we are**
Waves Company is a design and manufacturing studio based in India, operating at waves.company. We design and sell algorithmically crafted lighting objects — made to order, shipped worldwide. This Privacy Policy explains what personal information we collect when you use our website or purchase from us, how we use it, and what rights you have in relation to it. By using our website or placing an order, you agree to the collection and use of your information as described in this policy.

**02 — What we collect**
We collect information in the following ways:

*Information you provide directly:*
- Name, email address, and password when you create an account.
- Shipping address and contact number when you place an order.
- Message content and project details when you submit a contact or project enquiry form.

*Information collected automatically:*
- Technical data including your IP address, browser type, device type, and operating system.
- Pages visited, time spent on pages, and referring URLs.
- Cart and browsing behaviour on our website.

*Information from third parties:*
- Payment information is processed by Shopify Payments. We do not store your card details. Payment data is handled by Shopify in accordance with PCI DSS standards.
- Order and account data is stored and managed through Shopify's infrastructure.

**03 — How we use your information**
We use the information we collect to: process and fulfil orders; communicate about orders (confirmation, tracking, delivery); respond to contact and project enquiries; manage accounts; improve the website and service; comply with legal obligations. We do not use your data for automated decision-making or profiling. We do not sell your data.

**04 — Who we share your information with**
We share with: Shopify (e-commerce and payments); shipping carriers (name and address for dispatch); Notion (contact form message storage); legal authorities if required by law. We do not share with advertising networks or data brokers.

**05 — How long we keep your data**
Order records: minimum 7 years (GST law). Account data: until account closed, then deleted within 30 days unless legally required. Enquiry messages: up to 24 months.

**06 — Your rights**
Depending on location: access, correction, deletion, portability, objection. EEA/UK customers: GDPR/UK GDPR. Indian customers: DPDPA 2023. To exercise rights: email hello@waves.company. Response within 30 days.

**07 — Cookies**
We use cookies for cart and account session functionality. Analytics via Plausible (cookie-free, no cross-site tracking). Shopify sets functional cookies for checkout. You can disable cookies in browser settings.

**08 — Security**
HTTPS throughout. Shopify Payments is PCI DSS Level 1 compliant — we never see or store card details. We take reasonable measures to protect your data but cannot guarantee absolute security.

**09 — International transfers**
Waves is based in India. International visitors' data is processed in India. Service providers (Shopify, Notion) may process data in the US and elsewhere under applicable data protection law.

**10 — Changes to this policy**
We may update this policy. Changes posted with a revised date. Continued use constitutes acceptance.

**11 — Contact**
hello@waves.company

End with cross-links to Terms of Service, Refund Policy, and Shipping Policy.

---

### 6. `src/app/legal/terms-of-service/page.tsx` — full file

Write a terms of service page following the exact same visual structure (same numbered section pattern as the other legal pages).

Cover these 12 sections in order:

**01 — Acceptance of terms**
These Terms of Service govern your use of waves.company and any purchase you make from Waves Company. By accessing the website or placing an order, you accept these terms in full. If you do not agree, do not use this website. We reserve the right to update these terms at any time; continued use constitutes acceptance.

**02 — About Waves Company**
Design and manufacturing studio based in Coimbatore, Tamil Nadu, India. We design, manufacture, and sell algorithmically crafted lighting objects — made to order — through waves.company. Contact: hello@waves.company.

**03 — Products and orders**
All products are made to order. No stock held. Manufacture begins after confirmed payment. Minor variations in colour, texture, and surface pattern are inherent to 3D printing and not defects. Visible seams are an intentional design feature. We reserve the right to refuse or cancel any order, with full refund issued. Prices may change but not affect confirmed orders.

**04 — Payment**
Payment required in full at time of order. Processed by Shopify Payments — we do not store card details. Currency conversion fees from your bank are your responsibility.

**05 — Shipping and delivery**
Governed by our Shipping Policy (link to /legal/shipping-policy).

**06 — Returns and refunds**
Governed by our Refund Policy (link to /legal/refund-policy).

**07 — Intellectual property**
All content on waves.company — designs, photographs, copy, name, logo, computational design work — is Waves Company's intellectual property. No reproduction for commercial purposes without written consent. Parametric models, toolpath logic, and G-code are proprietary. Purchase confers no licence to reproduce designs.

**08 — Use of this website**
Do not: attempt unauthorised access; use scrapers or bots; transmit malicious code; engage in fraudulent activity.

**09 — Limitation of liability**
Waves Company not liable for indirect, incidental, consequential, or punitive damages to the fullest extent permitted by law. Total liability limited to amount paid for the relevant order. Nothing excludes liability for negligence, fraud, or death/personal injury.

**10 — Product safety and use**
Designed for standard household use with E14 LED. Use compatible bulbs only. Electrical installation must comply with applicable local standards (IS standards in India). Not liable for damage from improper installation or modification.

**11 — Privacy**
Governed by our Privacy Policy (link to /legal/privacy-policy).

**12 — Governing law and disputes**
Governed by Indian law. Disputes subject to exclusive jurisdiction of courts of Coimbatore, Tamil Nadu, India. EU consumers' statutory rights unaffected. We will attempt informal resolution first — contact hello@waves.company.

End with cross-links to Privacy Policy, Refund Policy, and Shipping Policy.

---

## Link audit findings (verified 13 March 2026)

**Clean — no broken links found:**
- All header nav links (/shop, /studio, /process, /about, /contact) — pages exist ✓
- Footer nav links — identical to header ✓
- /studio/salem — hardcoded on homepage, slug exists in projects.ts ✓
- All external links: https://instagram.com/waves_company_ ✓

**Flag — verify in Shopify Admin:**
- /shop/hourglass and /shop/ripple hardcoded on homepage (src/app/page.tsx lines 136 and 155). These resolve only if Shopify product handles are exactly `hourglass` and `ripple`. Check Shopify Admin → Products → each product → URL handle. If different (e.g. `ripple-lamp`), update page.tsx lines 136 and 155.

**Minor gap — not broken:**
- /studio/chennai-residence exists in projects.ts but is not linked from anywhere except the studio page's dynamic project grid. No action needed unless a direct link is wanted.

---

## Completed

- [x] P0 — Legal pages + footer update (13 March 2026)
  - Created src/app/legal/refund-policy/page.tsx
  - Created src/app/legal/shipping-policy/page.tsx
  - Created src/app/legal/privacy-policy/page.tsx
  - Created src/app/legal/terms-of-service/page.tsx
  - Updated src/components/Footer.tsx with legalLinks array and restructured bottom bar

- [x] sitemap.ts
- [x] robots.ts
- [x] JSON-LD product pages
- [x] JSON-LD homepage Organisation
- [x] OG image typo fixed in layout.tsx
- [x] Favicon added to layout.tsx
- [x] AuthModal portal fix
- [x] Checkout handoff — associateCustomerWithCart + CartDrawer
- [x] Headless customer accounts — Phase 1 + Phase 2
- [x] Progressive gallery filtering
- [x] 3-step configurator + Smart Variant Subtitles
- [x] Shopify Storefront API as single source of truth
- [x] PageTransition, metadataBase, generateMetadata on dynamic routes
- [x] Per-page static metadata on all routes
- [x] Real product photography live in Shopify
- [x] Mobile fixes
- [x] Notion integration
