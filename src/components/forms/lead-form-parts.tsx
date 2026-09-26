"use client";

import { useEffect } from "react";
import { rememberFirstTouch } from "@/lib/leads/client";
import { siteConfig } from "@/lib/site-config";

// Rendered once in the root layout.
export function LeadAttributionTracker() {
  useEffect(() => {
    rememberFirstTouch();
  }, []);
  return null;
}

// Hidden from people and screen readers; bots that fill every field reveal themselves.
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

// Shown when the enquiry could not be delivered. The form keeps what the visitor typed.
export function SendFailure({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-[var(--color-danger)]/40 bg-[rgba(242,99,92,0.08)] p-4 text-sm text-[var(--color-text)]"
    >
      <p className="font-medium text-[var(--color-danger)]">{message}</p>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Your details are still in the form below. Please try again in a moment, or email us directly at{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-[var(--color-accent-text)] underline">
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </div>
  );
}
