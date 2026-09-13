import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/blog";
import { caseStudies } from "@/lib/content/case-studies";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { workflows } from "@/lib/content/workflows";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/workflows`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/industries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/case-studies`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteConfig.url}/request-automation`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms-conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workflowRoutes: MetadataRoute.Sitemap = workflows.map((workflow) => ({
    url: `${siteConfig.url}/workflows/${workflow.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${siteConfig.url}/industries/${industry.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteConfig.url}/case-studies/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workflowRoutes, ...industryRoutes, ...caseStudyRoutes, ...blogRoutes];
}
