import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";

export function WhatIsN8n() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="For Non-Technical Owners"
          title="What is n8n, in plain language?"
          description="n8n is a workflow automation platform that allows different applications, services, APIs and AI tools to work together automatically — without your team manually moving information between them."
        />
        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <p className="text-sm text-[var(--color-text-muted)]">A simple way to picture it:</p>
          <WorkflowChain steps={["Something happens", "n8n notices", "It takes action", "Your apps update"]} />
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            You don&apos;t need to understand code to benefit from it. We handle the technical build —
            your job is to tell us what currently takes your team too much time to do by hand.
          </p>
        </div>
      </Container>
    </section>
  );
}
