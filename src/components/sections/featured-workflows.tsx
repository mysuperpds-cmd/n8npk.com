import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowCard } from "@/components/workflow/workflow-card";
import { getFeaturedWorkflows } from "@/lib/content/workflows";

export function FeaturedWorkflows() {
  const featured = getFeaturedWorkflows();

  return (
    <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Workflow Library"
            title="Automation workflows you can put to work"
            description="A sample of the workflows we build regularly. Every workflow in our library has its own detail page showing exactly how it works."
          />
          <Button href="/workflows" variant="secondary" className="shrink-0">
            Browse full library
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>
      </Container>
    </section>
  );
}
