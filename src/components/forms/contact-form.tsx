"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
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
    // Placeholder submit — ready to be wired to an n8n webhook via N8N_LEAD_WEBHOOK_URL.
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] p-6 text-sm text-[var(--color-text)]">
        Thanks — your message has been received. We&apos;ll get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <p role="alert" className="rounded-xl border border-[var(--color-danger)]/40 bg-[rgba(242,99,92,0.08)] p-3 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" />
      <FieldTextarea label="Message" name="message" required />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[#04140f] transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      />
    </label>
  );
}

function FieldTextarea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--color-text)]">
        {label}
        {required ? <span className="text-[var(--color-accent-2)]"> *</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      />
    </label>
  );
}
