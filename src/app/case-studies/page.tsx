import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";
import { caseStudies, caseStudyDisclaimer } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Illustrative automation scenarios showing how N8NPK approaches e-commerce, marketing and healthcare automation projects with n8n.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Example automation scenarios
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{caseStudyDisclaimer}</p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40 sm:p-8"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-text)]">{study.industry}</span>
              <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">{study.title}</h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{study.summary}</p>
              <WorkflowChain steps={study.chain} />
            </Link>
          ))}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
