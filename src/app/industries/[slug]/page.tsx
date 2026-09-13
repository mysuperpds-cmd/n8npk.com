import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { getIndustryBySlug, industries } from "@/lib/content/industries";
import { workflows } from "@/lib/content/workflows";

type Params = { slug: string };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: `Automation for ${industry.name}`,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedWorkflows = workflows.filter((w) => industry.relatedWorkflowSlugs.includes(w.slug));

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Automation for {industry.name}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{industry.summary}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/request-automation">Get Your Business Automated</Button>
            <Button href="/industries" variant="secondary">
              View all industries
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Common Pain Points" title="What usually slows this industry down" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {industry.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-muted)]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-danger)]" />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Use Cases" title="Where automation helps most" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.useCases.map((useCase) => (
              <div key={useCase.title} className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{useCase.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {relatedWorkflows.length > 0 ? (
        <section className="py-20 sm:py-24">
          <Container className="flex flex-col gap-6">
            <SectionHeading eyebrow="Related Workflows" title="Workflows commonly used in this industry" />
            <div className="flex flex-wrap gap-3">
              {relatedWorkflows.map((workflow) => (
                <Link
                  key={workflow.slug}
                  href={`/workflows/${workflow.slug}`}
                  className="rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm text-[var(--color-text)] hover:border-[var(--color-accent)]/50"
                >
                  {workflow.name}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection title={`Ready to automate your ${industry.name.toLowerCase()} business?`} />
    </>
  );
}
