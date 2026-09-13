import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with N8NPK to discuss n8n automation, AI workflows or any question about automating your business.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Let&apos;s talk about your business
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-text-muted)]">
            Have a question before requesting a full automation plan? Send us a message and we&apos;ll get
            back to you directly.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm text-[var(--color-text-muted)]">
            <span className="font-medium text-[var(--color-text)]">Email</span>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--color-accent-text)]">
              {siteConfig.contact.email}
            </a>
          </div>
          <p className="max-w-md text-sm text-[var(--color-text-faint)]">{siteConfig.serviceArea}</p>
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
