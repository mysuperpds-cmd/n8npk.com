import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  { title: "Custom-built workflows", description: "We design automation around your actual process, not a rigid template." },
  { title: "Business-first approach", description: "Every workflow starts with the business problem, not the tool." },
  { title: "AI-ready automation", description: "We add AI where it genuinely helps, not as a buzzword." },
  { title: "API integrations", description: "If a tool has an API, we can usually connect it." },
  { title: "Scalable architecture", description: "Workflows are built to grow with your business, not break under it." },
  { title: "Local understanding", description: "We understand the tools and workflows Pakistani businesses actually use." },
  { title: "Ongoing support", description: "We stay available after launch, not just for the initial build." },
  { title: "Security-conscious implementation", description: "We follow secure practices for credentials, access and data handling." },
];

export function WhyN8npk() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Why N8NPK" title="An automation partner that builds around your business" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-2">
              <div className="h-1 w-8 rounded-full bg-[var(--color-accent)]" />
              <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
