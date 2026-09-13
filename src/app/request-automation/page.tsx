import type { Metadata } from "next";
import { RequestAutomationForm } from "@/components/forms/request-automation-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Request an Automation",
  description:
    "Tell N8NPK what you'd like to automate. Share your tools, volume and goals and we'll come back with a plan for how the workflow would work.",
  alternates: { canonical: "/request-automation" },
};

const expectations = [
  "We review your request and confirm we understand what you're trying to automate",
  "We'll ask follow-up questions if we need more detail about your tools or process",
  "You'll get a clear outline of the proposed workflow and next steps",
];

export default function RequestAutomationPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <Eyebrow>Request an Automation</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Tell us what you want to automate
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-text-muted)]">
            The more detail you share, the more useful our first response will be. There&apos;s no
            obligation — this starts a conversation, not a contract.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {expectations.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-xs font-medium text-[var(--color-accent-text)]">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <RequestAutomationForm />
        </div>
      </Container>
    </section>
  );
}
