import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "n8n Automation Services",
  description:
    "Explore N8NPK's n8n automation services — AI automation, business workflow automation, e-commerce, WhatsApp, CRM, API integrations and custom workflow development.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            n8n automation services built around your business
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            From a single automated workflow to a full AI-assisted process, every service below is
            built using n8n and tailored to how your business actually operates.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
              >
                <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">{service.name}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{service.shortDescription}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-text)]">
                  Learn more <span aria-hidden>→</span>
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
