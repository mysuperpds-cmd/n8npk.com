import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/lib/content/industries";

export function IndustriesPreview() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Automation built around how your industry actually works"
          align="center"
          className="mx-auto"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{industry.name}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{industry.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
