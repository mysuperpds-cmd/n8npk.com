import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-heading text-3xl font-medium tracking-tight text-[var(--color-text)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-faint)]">Last updated: {updated}</p>
        <p className="mt-6 leading-relaxed text-[var(--color-text-muted)]">{intro}</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">{section.heading}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-[var(--color-text-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
