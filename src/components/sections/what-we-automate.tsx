import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const categories = [
  "Sales",
  "Marketing",
  "Customer Support",
  "E-commerce",
  "Finance",
  "Operations",
  "HR",
  "Lead Management",
  "Reporting",
  "AI Workflows",
];

export function WhatWeAutomate() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="What We Automate"
          title="Automation across every part of the business"
          align="center"
          className="mx-auto"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6 text-center text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]/50"
            >
              {category}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
