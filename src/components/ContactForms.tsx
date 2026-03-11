"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormType = "select" | "enquiry" | "brief";
type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-primary/15 bg-surface px-4 py-3 font-sans text-sm text-primary placeholder:text-primary/30 outline-none transition-colors focus:border-primary/40";
const labelClass =
  "block font-sans text-xs font-normal uppercase tracking-widest text-primary/50 mb-2";

export default function ContactForms() {
  const [formType, setFormType] = useState<FormType>("select");

  return (
    <div>
      <AnimatePresence mode="wait">
      {/* ─── Selector Cards ─── */}
      {formType === "select" ? (
        <motion.div
          key="select"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid gap-6 md:grid-cols-2"
        >
          <button
            type="button"
            onClick={() => setFormType("enquiry")}
            className="group rounded-lg border border-primary/10 p-8 text-left transition-colors hover:border-primary/30"
          >
            <h3 className="text-xl font-medium text-primary">
              I&rsquo;d like to buy a lamp
            </h3>
            <p className="mt-2 text-sm font-light text-primary/60">
              General question about our products, availability, or shipping.
            </p>
            <span className="mt-4 inline-block font-sans text-sm font-medium text-accent transition-colors group-hover:text-accent-dark">
              Send an enquiry &rarr;
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("brief")}
            className="group rounded-lg border border-primary/10 p-8 text-left transition-colors hover:border-primary/30"
          >
            <h3 className="text-xl font-medium text-primary">
              I have a project in mind
            </h3>
            <p className="mt-2 text-sm font-light text-primary/60">
              Custom lighting for a residence, office, or hospitality space.
            </p>
            <span className="mt-4 inline-block font-sans text-sm font-medium text-accent transition-colors group-hover:text-accent-dark">
              Submit a brief &rarr;
            </span>
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={formType}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="mx-auto max-w-xl"
        >
          <button
            type="button"
            onClick={() => setFormType("select")}
            className="mb-8 font-sans text-sm font-medium text-primary/40 transition-colors hover:text-primary"
          >
            &larr; Back
          </button>

          {formType === "enquiry" ? <EnquiryForm /> : <BriefForm />}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────
// General Enquiry Form
// ──────────────────────────────────────

function EnquiryForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = {
      formType: "enquiry",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h3 className="text-2xl font-medium text-primary">General Enquiry</h3>

      <div>
        <label htmlFor="enquiry-name" className={labelClass}>
          Name
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="enquiry-email" className={labelClass}>
          Email
        </label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={5}
          className={inputClass + " resize-none"}
          placeholder="What can we help you with?"
        />
      </div>

      <SubmitButton state={state} />
    </form>
  );
}

// ──────────────────────────────────────
// Project Brief Form
// ──────────────────────────────────────

const projectTypes = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Retail",
  "Other",
];

const projectStages = [
  "Concept",
  "Design Development",
  "Construction",
  "Completed Space",
];

const budgetRanges = [
  "Under ₹25K",
  "₹25K – 50K",
  "₹50K – 1L",
  "₹1L+",
  "Not sure yet",
];

function BriefForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const val = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
        ?.value ?? "";

    const data = {
      formType: "brief",
      name: val("name"),
      firm: val("firm"),
      email: val("email"),
      phone: val("phone"),
      projectType: val("projectType"),
      projectStage: val("projectStage"),
      description: val("description"),
      timeline: val("timeline"),
      budget: val("budget"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h3 className="text-2xl font-medium text-primary">Project Brief</h3>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="brief-name" className={labelClass}>
            Name
          </label>
          <input
            id="brief-name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="brief-firm" className={labelClass}>
            Firm / Company
          </label>
          <input
            id="brief-firm"
            name="firm"
            type="text"
            className={inputClass}
            placeholder="Studio or company name"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="brief-email" className={labelClass}>
            Email
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="brief-phone" className={labelClass}>
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="brief-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="+91"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="brief-type" className={labelClass}>
            Project Type
          </label>
          <select id="brief-type" name="projectType" className={inputClass}>
            <option value="">Select...</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brief-stage" className={labelClass}>
            Project Stage
          </label>
          <select id="brief-stage" name="projectStage" className={inputClass}>
            <option value="">Select...</option>
            {projectStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="brief-description" className={labelClass}>
          Brief Description
        </label>
        <textarea
          id="brief-description"
          name="description"
          required
          rows={5}
          className={inputClass + " resize-none"}
          placeholder="Tell us about the space and what you're looking for..."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="brief-timeline" className={labelClass}>
            Timeline
          </label>
          <input
            id="brief-timeline"
            name="timeline"
            type="text"
            className={inputClass}
            placeholder="e.g. 3 months"
          />
        </div>
        <div>
          <label htmlFor="brief-budget" className={labelClass}>
            Budget Range
          </label>
          <select id="brief-budget" name="budget" className={inputClass}>
            <option value="">Select...</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <SubmitButton state={state} />
    </form>
  );
}

// ──────────────────────────────────────
// Shared pieces
// ──────────────────────────────────────

function SubmitButton({ state }: { state: SubmitState }) {
  return (
    <div className="mt-2">
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-full bg-accent py-4 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting" ? "Sending..." : "Send"}
      </button>
      {state === "error" && (
        <p className="mt-3 text-center font-sans text-sm text-accent">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="py-12 text-center">
      <h3 className="text-2xl font-medium text-primary">
        Thank you.
      </h3>
      <p className="mt-3 text-base font-light text-primary/60">
        We&rsquo;ve received your message and will respond within 24 hours.
      </p>
    </div>
  );
}
