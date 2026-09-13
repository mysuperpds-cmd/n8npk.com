import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaSection({
  title = "Ready to Automate Your Business?",
  description = "Tell us what you'd like to automate and we'll show you exactly how it would work before you commit to anything.",
  primaryLabel = "Request an Automation",
  primaryHref = "/request-automation",
  secondaryLabel = "Talk to Us",
  secondaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-24">
        <h2 className="max-w-2xl font-heading text-3xl font-medium tracking-tight text-[var(--color-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref}>{primaryLabel}</Button>
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
