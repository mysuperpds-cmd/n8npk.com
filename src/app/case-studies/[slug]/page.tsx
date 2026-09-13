import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";
import { caseStudies, caseStudyDisclaimer, getCaseStudyBySlug } from "@/lib/content/case-studies";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>{study.industry}</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            {study.title}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{study.summary}</p>
          <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs leading-relaxed text-[var(--color-text-faint)]">
            {caseStudyDisclaimer}
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">The challenge</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{study.challenge}</p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-text-faint)]">The automation chain</p>
            <WorkflowChain steps={study.chain} />
          </div>

          <div>
            <SectionHeading eyebrow="Approach" title="How the workflow was built" />
            <ol className="mt-6 flex flex-col gap-3">
              {study.approach.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-xs font-medium text-[var(--color-accent-text)]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">What typically improves</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {study.outcomeThemes.map((theme) => (
                <li key={theme} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaSection title="Want a similar workflow for your business?" />
    </>
  );
}
