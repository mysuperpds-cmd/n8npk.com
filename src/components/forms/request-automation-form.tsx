"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { HoneypotField, SendFailure } from "@/components/forms/lead-form-parts";
import { industries } from "@/lib/content/industries";
import { submitLead, trackLead } from "@/lib/leads/client";

const budgetRanges = [
  "Not sure yet",
  "Under PKR 50,000",
  "PKR 50,000 – 150,000",
  "PKR 150,000 – 500,000",
  "PKR 500,000+",
];

export function RequestAutomationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const automate = String(data.get("automate") || "").trim();

    if (!name || !email || !automate) {
      setError("Please fill in your name, email, and what you'd like to automate.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");
    const result = await submitLead("request-automation", form, startedAt.current);
    if (result.ok) {
      trackLead("request-automation");
      setStatus("sent");
      form.reset();
      return;
    }
    setError(result.error);
    setStatus(result.fieldErrors ? "error" : "failed");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] p-8 text-[var(--color-text)]">
        <h3 className="font-heading text-lg font-medium">Request received</h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Thanks for sharing the details. We&apos;ll review what you&apos;d like to automate and get back to you
          with next steps and, where possible, an outline of how the workflow would work.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-6" noValidate>
      <HoneypotField />
      {status === "failed" && error ? <SendFailure message={error} /> : null}
      {status === "error" && error ? (
        <p role="alert" className="rounded-xl border border-[var(--color-danger)]/40 bg-[rgba(242,99,92,0.08)] p-3 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Business name" name="business" />
        <Field label="Email" name="email" type="email" required />
        <Field label="WhatsApp / Phone" name="phone" type="tel" />
        <SelectField label="Industry" name="industry" options={["Select an industry", ...industries.map((i) => i.name), "Other"]} />
        <Field label="Website (if any)" name="website" type="url" />
      </div>

      <FieldTextarea label="What do you want to automate?" name="automate" required rows={4} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Current tools / software" name="tools" placeholder="e.g. WooCommerce, Google Sheets, WhatsApp" />
        <Field label="Estimated monthly volume" name="volume" placeholder="e.g. ~200 orders/month" />
      </div>
      <SelectField label="Budget range" name="budget" options={budgetRanges} />
      <FieldTextarea label="Additional details" name="details" rows={3} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[#04140f] transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Get My Automation Plan"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--color-text)]">
        {label}
        {required ? <span className="text-[var(--color-accent-2)]"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  required,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--color-text)]">
        {label}
        {required ? <span className="text-[var(--color-accent-2)]"> *</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--color-text)]">{label}</span>
      <select
        name={name}
        defaultValue={options[0]}
        className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
