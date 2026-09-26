import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { blogPosts, getBlogPostBySlug } from "@/lib/content/blog";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.name },
  };

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article>
        <section className="border-b border-[var(--color-border)] bg-grid py-20 sm:py-28">
          <Container className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="font-heading text-3xl font-medium tracking-tight text-[var(--color-text)] sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
            <p className="text-xs text-[var(--color-text-faint)]">
              {formatDate(post.publishedAt)}
              {post.updatedAt ? ` · Updated ${formatDate(post.updatedAt)}` : null} · {post.readingMinutes} min read ·{" "}
              {siteConfig.name}
            </p>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-10">
              {post.sections.map((section) => (
                <div key={section.heading} className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-medium text-[var(--color-text)]">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-[var(--color-text-muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </section>
      </article>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-16 sm:py-20">
        <Container className="flex flex-col gap-6">
          <h2 className="font-heading text-lg font-medium text-[var(--color-text)]">More from the blog</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)]/40"
              >
                <Badge>{p.category}</Badge>
                <span className="text-sm font-medium text-[var(--color-text)]">{p.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
