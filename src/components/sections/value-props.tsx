import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const values = [
  { title: "Save time", description: "Repetitive tasks run automatically instead of consuming your team's day." },
  { title: "Reduce human error", description: "The same steps run the same way every time, with no missed fields or forgotten steps." },
  { title: "Respond faster", description: "Leads, orders and messages are acted on within seconds, not hours." },
  { title: "Connect your tools", description: "Apps that never talked to each other start sharing data automatically." },
  { title: "Improve productivity", description: "Your team spends time on work that actually needs a human." },
  { title: "Scale operations", description: "Handle more orders, leads and customers without hiring for repetitive work." },
];

export function ValueProps() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why Automate"
          title="What businesses actually get from automation"
          description="Automation isn't about replacing people — it's about removing the repetitive parts of a process so your team can focus on the work that needs judgment."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-heading text-lg font-medium text-[var(--color-text)]">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
