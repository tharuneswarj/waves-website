"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  label: string;
  content: React.ReactNode;
}

function AccordionRow({ label, content }: AccordionItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-primary/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-sm font-medium text-primary">
          {label}
        </span>
        <span
          className={`ml-4 shrink-0 font-sans text-lg font-light text-primary/50 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 font-sans text-sm font-light leading-relaxed text-primary/70">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductAccordionProps {
  specs: [string, string][];
  usageCare: string;
}

export default function ProductAccordion({ specs, usageCare }: ProductAccordionProps) {
  const items: AccordionItem[] = [
    {
      label: "Specifications",
      content: (
        <table className="w-full">
          <tbody className="divide-y divide-primary/10">
            {specs.map(([label, value]) => (
              <tr key={label}>
                <td className="py-2 pr-4 font-mono text-xs tracking-wide text-primary/50">
                  {label}
                </td>
                <td className="py-2 font-mono text-xs tracking-wide text-primary">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      label: "Usage & Care",
      content: <p>{usageCare}</p>,
    },
    {
      label: "Shipping & Returns",
      content: (
        <div className="space-y-2">
          <p>Free shipping across India. Each lamp is made to order and ships within 5–7 business days.</p>
          <p>Because every piece is individually crafted, we do not accept returns. If your lamp arrives damaged, please photograph it and contact us within 48 hours — we'll make it right.</p>
        </div>
      ),
    },
    {
      label: "Product Documentation",
      content: (
        <p>
          A printed care card is included with every lamp. A digital version will be available for download here soon.
        </p>
      ),
    },
  ];

  return (
    <div className="border-b border-primary/10">
      {items.map((item) => (
        <AccordionRow key={item.label} {...item} />
      ))}
    </div>
  );
}
