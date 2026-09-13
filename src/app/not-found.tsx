import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-grid py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-heading text-sm font-medium uppercase tracking-widest text-[var(--color-accent-text)]">
          404
        </span>
        <h1 className="font-heading text-3xl font-medium tracking-tight text-[var(--color-text)] sm:text-4xl">
          This page took a wrong turn in the workflow
        </h1>
        <p className="max-w-md text-base leading-relaxed text-[var(--color-text-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/workflows" variant="secondary">
            Browse Workflows
          </Button>
        </div>
      </Container>
    </section>
  );
}
