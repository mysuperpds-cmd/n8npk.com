import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { pricingPlans } from "@/lib/content/pricing";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "N8NPK automation packages — Starter, Business, Advanced and Custom Enterprise Automation. Every project starts with a free scoping conversation.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Packages built around the size of the automation
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            Every business&apos;s automation needs are different, so exact pricing depends on the number
            of workflows, systems involved, and complexity. These packages give you a sense of scope —
            contact us for a quote specific to your project.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col gap-6 rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <div>
                  <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">{plan.name}</h2>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{plan.tagline}</p>
                </div>
                <p className="font-heading text-xl font-medium text-[var(--color-accent-text)]">{plan.priceLabel}</p>
                <p className="text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Best for</p>
                <p className="-mt-4 text-sm text-[var(--color-text-muted)]">{plan.bestFor}</p>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button href="/request-automation" variant={plan.highlighted ? "primary" : "secondary"} className="mt-auto">
                  Get a Quote
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-24">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="How Pricing Works"
            title="Every project starts with a scoping conversation"
            description="We don't quote a price until we understand what you're automating — the number of systems involved, how much logic is needed, and whether AI is part of the workflow. This keeps pricing fair and avoids surprises."
          />
        </Container>
      </section>

      <CtaSection title="Get a quote for your automation" primaryLabel="Request an Automation" />
    </>
  );
}
