import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { blogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Guides on n8n, AI automation and workflow automation for businesses in Pakistan — written to be genuinely useful, not keyword-stuffed.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
        <Container className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Blog &amp; Resources</Eyebrow>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-[var(--color-text)] sm:text-5xl">
            Guides on n8n and business automation
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            Practical explanations of n8n, AI automation and workflow design — written for business
            owners, not just developers.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
              >
                <Badge>{post.category}</Badge>
                <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">{post.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
                <p className="mt-auto pt-2 text-xs text-[var(--color-text-faint)]">
                  {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
