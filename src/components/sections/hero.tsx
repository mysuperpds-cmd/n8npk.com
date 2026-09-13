import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

const flowSteps = [
  { label: "Trigger", detail: "New order, lead or message", color: "var(--color-accent)" },
  { label: "n8n", detail: "Automation engine", color: "var(--color-accent-2)" },
  { label: "AI / Logic", detail: "Decisions & judgment", color: "var(--color-accent)" },
  { label: "Business Apps", detail: "CRM, WhatsApp, Sheets", color: "var(--color-accent-2)" },
  { label: "Result", detail: "Task done automatically", color: "var(--color-accent)" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(23,201,164,0.16),transparent_65%)]" />
      <Container className="relative flex flex-col gap-14 py-20 sm:py-28">
        <div className="flex max-w-3xl flex-col gap-6">
          <Eyebrow>n8n Automation &amp; AI Workflows in Pakistan</Eyebrow>
          <h1 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Automate Your Business with <span className="text-gradient">n8n &amp; AI</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            N8NPK builds custom automated workflows that connect the apps your business already uses,
            remove repetitive manual work, and help your team respond faster — for businesses in
            Pakistan and international clients working with us remotely.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/request-automation">Get Your Business Automated</Button>
            <Button href="/workflows" variant="secondary">
              Explore Automation Workflows
            </Button>
          </div>
        </div>

        <div className="glass glow rounded-3xl p-6 sm:p-10">
          <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-text-faint)]">
            How a typical automation flows
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
                <div className="flex flex-col items-center gap-3 lg:flex-1">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold"
                    style={{ borderColor: step.color, color: step.color, background: "rgba(255,255,255,0.02)" }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-medium text-[var(--color-text)]">{step.label}</p>
                    <p className="text-xs text-[var(--color-text-faint)]">{step.detail}</p>
                  </div>
                </div>
                {index < flowSteps.length - 1 ? (
                  <svg
                    className="hidden shrink-0 text-[var(--color-border-strong)] lg:block"
                    width="40"
                    height="12"
                    viewBox="0 0 40 12"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M0 6H36M36 6L29 1M36 6L29 11" stroke="currentColor" strokeWidth="1.5" className="flow-dash" />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link href="/services/n8n-automation" className="text-sm font-medium text-[var(--color-accent-text)] hover:underline">
              See how we build this for your business →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
