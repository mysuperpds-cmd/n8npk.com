import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { title: "Tell us what you want to automate", description: "Share the process that's taking too much manual time — we'll listen before proposing anything." },
  { title: "We analyze your process", description: "We map exactly how the task works today, including exceptions and edge cases." },
  { title: "We build and test your n8n workflow", description: "We build the automation and test it against real scenarios before you see it." },
  { title: "We deploy and support it", description: "We launch the workflow and stay available as your process or tools evolve." },
];

export function HowItWorks() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="How It Works" title="A simple, four-step process" align="center" className="mx-auto" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent)]/50 text-sm font-semibold text-[var(--color-accent-text)]">
                {index + 1}
              </span>
              <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
