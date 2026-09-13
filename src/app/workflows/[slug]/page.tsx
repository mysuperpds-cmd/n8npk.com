import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";
import { getWorkflowBySlug, workflows } from "@/lib/content/workflows";

type Params = { slug: string };

export function generateStaticParams() {
  return workflows.map((workflow) => ({ slug: workflow.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return {};

  return {
    title: workflow.name,
    description: workflow.summary,
    alternates: { canonical: `/workflows/${workflow.slug}` },
  };
}

export default async function WorkflowDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) notFound();

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Workflow Library</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            {workflow.name}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{workflow.summary}</p>
          <div className="flex flex-wrap gap-2">
            {workflow.categories.map((category) => (
              <Badge key={category} tone="accent">
                {category}
              </Badge>
            ))}
            <Badge tone="amber">{workflow.complexity} complexity</Badge>
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/request-automation">Build This Automation For Me</Button>
            <Button href="/workflows" variant="secondary">
              Browse all workflows
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-text-faint)]">The automation chain</p>
            <WorkflowChain steps={workflow.chain} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Business problem</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{workflow.problem}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Before automation</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{workflow.before}</p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-2">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">The automated workflow</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{workflow.automated}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">How it works</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {workflow.howItWorks.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-xs font-medium text-[var(--color-accent-text)]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Apps &amp; integrations</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {workflow.apps.map((app) => (
                  <li key={app} className="rounded-full border border-[var(--color-border-strong)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]">
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Business benefits</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {workflow.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Who this is for</h2>
          <div className="flex flex-wrap gap-2">
            {workflow.audience.map((a) => (
              <span key={a} className="rounded-full bg-[var(--color-surface)] px-3.5 py-1.5 text-sm text-[var(--color-text-muted)]">
                {a}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-faint)]">
            Estimated complexity: <span className="text-[var(--color-text)]">{workflow.complexity}</span> — see our{" "}
            <Link href="/pricing" className="text-[var(--color-accent-text)] hover:underline">
              pricing packages
            </Link>{" "}
            for how this typically fits into a project.
          </p>
        </Container>
      </section>

      <CtaSection
        title="Want this workflow built for your business?"
        description="We'll confirm your exact tools and process before building anything, so what you get matches how you actually work."
        primaryLabel="Build This Automation For Me"
      />
    </>
  );
}
