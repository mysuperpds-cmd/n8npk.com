export function Logo() {
  return (
    <span className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-[var(--color-text)]">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="1" y="1" width="24" height="24" rx="7" stroke="var(--color-accent)" strokeWidth="1.5" />
        <circle cx="7.5" cy="13" r="2.2" fill="var(--color-accent)" />
        <circle cx="18.5" cy="7.5" r="2.2" fill="var(--color-accent-2)" />
        <circle cx="18.5" cy="18.5" r="2.2" fill="var(--color-accent-2)" />
        <path d="M9.5 12.1L16.5 8.4M9.5 13.9L16.5 17.6" stroke="var(--color-text-muted)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      N8NPK
    </span>
  );
}
