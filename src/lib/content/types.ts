export type WorkflowCategory =
  | "AI"
  | "WhatsApp"
  | "E-commerce"
  | "CRM"
  | "Marketing"
  | "Sales"
  | "Lead Generation"
  | "Google Workspace"
  | "WordPress"
  | "WooCommerce"
  | "Shopify"
  | "Email"
  | "APIs"
  | "Productivity"
  | "Customer Support";

export type Complexity = "Simple" | "Moderate" | "Advanced";

export type WorkflowItem = {
  slug: string;
  name: string;
  categories: WorkflowCategory[];
  summary: string;
  chain: string[];
  problem: string;
  before: string;
  automated: string;
  apps: string[];
  howItWorks: string[];
  benefits: string[];
  complexity: Complexity;
  audience: string[];
  featured?: boolean;
};

export type ServiceFaq = { question: string; answer: string };

export type ServiceExample = {
  title: string;
  chain: string[];
  benefit: string;
};

export type ServiceDetail = {
  slug: string;
  name: string;
  shortDescription: string;
  metaDescription: string;
  heroSubhead: string;
  problem: string;
  solution: string;
  examples: ServiceExample[];
  integrations: string[];
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: ServiceFaq[];
};

export type IndustryUseCase = { title: string; description: string };

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
  painPoints: string[];
  useCases: IndustryUseCase[];
  relatedWorkflowSlugs: string[];
};

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  // The date the post first went live on this site. Never set earlier than that.
  publishedAt: string;
  // Set only when the content is meaningfully revised (not for typo fixes).
  updatedAt?: string;
  readingMinutes: number;
  sections: BlogSection[];
};

export type PricingPlan = {
  name: string;
  tagline: string;
  priceLabel: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string[];
  chain: string[];
  outcomeThemes: string[];
};
