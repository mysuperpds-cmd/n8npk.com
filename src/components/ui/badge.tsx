export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "amber";
}) {
  const tones: Record<string, string> = {
    default: "border-[var(--color-border-strong)] text-[var(--color-text-muted)]",
    accent: "border-[var(--color-accent)]/40 text-[var(--color-accent-text)] bg-[var(--color-accent-soft)]",
    amber: "border-[var(--color-accent-2)]/40 text-[var(--color-accent-2)] bg-[rgba(242,169,60,0.1)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
