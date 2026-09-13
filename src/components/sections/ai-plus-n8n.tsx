import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";

const aiUseCases = [
  "AI customer support",
  "AI lead qualification",
  "AI email processing",
  "AI content workflows",
  "AI document processing",
  "AI data extraction",
  "AI agents",
  "Automated decision workflows",
];

export function AiPlusN8n() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="AI + n8n"
            title="When automation needs to make a judgment call"
            description="Some tasks can't be solved with fixed rules — replying to a message, judging a lead, reading a document. We combine n8n with AI models to handle exactly that kind of step."
          />
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-text-faint)]">Typical AI workflow</p>
            <WorkflowChain steps={["Customer Message", "AI Processing", "Business Logic", "CRM/Database", "Response/Action"]} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {aiUseCases.map((useCase) => (
            <div
              key={useCase}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-sm font-medium text-[var(--color-text)]"
            >
              {useCase}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
