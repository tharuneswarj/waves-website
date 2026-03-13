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
