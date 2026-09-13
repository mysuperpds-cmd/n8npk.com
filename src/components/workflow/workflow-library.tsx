"use client";

import { useMemo, useState } from "react";
import { WorkflowCard } from "@/components/workflow/workflow-card";
import type { WorkflowCategory, WorkflowItem } from "@/lib/content/types";

export function WorkflowLibrary({
  workflows,
  categories,
}: {
  workflows: WorkflowItem[];
  categories: WorkflowCategory[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<WorkflowCategory | "All">("All");

  const filtered = useMemo(() => {
    return workflows.filter((workflow) => {
      const matchesCategory = activeCategory === "All" || workflow.categories.includes(activeCategory);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        workflow.name.toLowerCase().includes(q) ||
        workflow.summary.toLowerCase().includes(q) ||
        workflow.categories.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [workflows, activeCategory, query]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <label htmlFor="workflow-search" className="sr-only">
          Search workflows
        </label>
        <input
          id="workflow-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search workflows — e.g. WhatsApp, invoice, lead"
          className="w-full max-w-md rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === "All"
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === category
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-faint)]" role="status">
        {filtered.length} workflow{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] p-10 text-center text-sm text-[var(--color-text-muted)]">
          No workflows match your search yet. Try a different keyword or{" "}
          <a href="/request-automation" className="text-[var(--color-accent-text)] hover:underline">
            request a custom workflow
          </a>
          .
        </div>
      )}
    </div>
  );
}
