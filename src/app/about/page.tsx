import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About N8NPK",
  description:
    "N8NPK is an independent automation studio specializing in n8n and AI-powered workflows for businesses in Pakistan and international clients.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "We start with the process, not the tool", description: "Every project begins with understanding what actually happens in your business today, before we touch n8n." },
  { title: "We're honest about what automation can't do", description: "If a process genuinely needs human judgment throughout, we'll tell you rather than force-fit an automation." },
  { title: "We build to be maintained", description: "Workflows are documented clearly so they can be updated long after the initial build, by us or your own team." },
  { title: "We follow platform rules", description: "From WhatsApp messaging policies to API terms of service, we build automation that stays within the rules of the platforms it touches." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>About N8NPK</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            An independent n8n automation studio, built for Pakistani businesses
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            N8NPK specializes in building automation and AI-powered workflows on the n8n platform.
            {" "}{siteConfig.affiliationNote}
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Why we exist</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">
              Most businesses in Pakistan run on a genuinely capable mix of tools — a website, WhatsApp,
              spreadsheets, maybe a CRM — but spend far too much time manually moving information between
              them. We build the automation layer that connects those tools together, using n8n as the
              engine underneath.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">Who we work with</h2>
            <p className="leading-relaxed text-[var(--color-text-muted)]">
              {siteConfig.serviceArea} Whether you&apos;re a small team automating your first process or a
              growing company that needs several workflows connected together, we scope every project to
              match where you actually are.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="How We Work" title="A few principles that shape every project" />
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h3 className="font-heading text-base font-medium text-[var(--color-text)]">{principle.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{principle.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
