import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { WorkflowChain } from "@/components/workflow/workflow-chain";
import { getServiceBySlug, services } from "@/lib/content/services";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            {service.name}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{service.heroSubhead}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/request-automation">Request This Automation</Button>
            <Button href="/services" variant="secondary">
              View all services
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">The problem</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{service.problem}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Our approach</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">{service.solution}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Example Workflows" title="What this looks like in practice" />
          <div className="grid gap-6 sm:grid-cols-2">
            {service.examples.map((example) => (
              <div key={example.title} className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{example.title}</h3>
                <WorkflowChain steps={example.chain} />
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{example.benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Common integrations</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {service.integrations.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Benefits</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {service.benefits.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Process" title="How we deliver this" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent)]/50 text-sm font-semibold text-[var(--color-accent-text)]">
                  {index + 1}
                </span>
                <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="flex flex-col divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2 py-6">
                <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-faint)]">
            Looking for something else? See our{" "}
            <Link href="/services" className="text-[var(--color-accent-text)] hover:underline">
              full list of services
            </Link>{" "}
            or browse the{" "}
            <Link href="/workflows" className="text-[var(--color-accent-text)] hover:underline">
              workflow library
            </Link>
            .
          </p>
        </Container>
      </section>

      <CtaSection
        title={`Ready to automate with ${service.name}?`}
        primaryLabel="Request This Automation"
      />
    </>
  );
}
