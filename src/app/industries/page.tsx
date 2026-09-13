import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { industries } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "N8NPK builds n8n automation for e-commerce, education, real estate, healthcare, marketing agencies, professional services, retail, startups and SMEs.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Automation built around your industry
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            {"Different industries face different repetitive work. Here's how we typically approach automation for each."}
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
              >
                <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">{industry.name}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{industry.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-text)]">
                  See use cases <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
