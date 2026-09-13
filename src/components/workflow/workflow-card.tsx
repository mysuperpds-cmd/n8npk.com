import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { WorkflowChain } from "@/components/workflow/workflow-chain";
import type { WorkflowItem } from "@/lib/content/types";

export function WorkflowCard({ workflow }: { workflow: WorkflowItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40">
      <div className="flex flex-wrap gap-2">
        {workflow.categories.slice(0, 3).map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </div>
      <div>
        <h3 className="font-heading text-lg font-medium text-[var(--color-text)]">{workflow.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{workflow.summary}</p>
      </div>
      <WorkflowChain steps={workflow.chain} />
      <div className="mt-1 flex flex-col gap-1 text-sm text-[var(--color-text-muted)]">
        <p>
          <span className="font-medium text-[var(--color-text)]">Problem: </span>
          {workflow.problem}
        </p>
        <p>
          <span className="font-medium text-[var(--color-text)]">Benefit: </span>
          {workflow.benefits[0]}
        </p>
      </div>
      <Link
        href={`/workflows/${workflow.slug}`}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-text)] hover:underline"
      >
        Build this automation for me
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
