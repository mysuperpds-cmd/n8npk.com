export function WorkflowChain({
  steps,
  className = "",
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text)] sm:text-sm">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="shrink-0 text-[var(--color-accent)]">
              <path d="M0 5H16M16 5L11 1M16 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );
}
