import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { WorkflowLibrary } from "@/components/workflow/workflow-library";
import { workflowCategories, workflows } from "@/lib/content/workflows";

export const metadata: Metadata = {
  title: "n8n Workflow Library",
  description:
    "Browse N8NPK's library of ready-to-build n8n workflows across AI, WhatsApp, e-commerce, CRM, marketing and more — each with a full breakdown of how it works.",
  alternates: { canonical: "/workflows" },
};

export default function WorkflowsPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Workflow Library</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Automation workflows you can put to work
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            Search or filter by category to find a workflow close to what you need, then see exactly
            how it works — the problem it solves, the apps involved, and the business benefit.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <WorkflowLibrary workflows={workflows} categories={workflowCategories} />
        </Container>
      </section>

      <CtaSection
        title="Don't see exactly what you need?"
        description="Most of our workflows started as a custom request. Tell us what you want to automate and we'll design it around your process."
        primaryLabel="Request a Custom Workflow"
      />
    </>
  );
}
