import type { PricingPlan } from "@/lib/content/types";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Automation",
    tagline: "For a single, well-defined workflow",
    priceLabel: "Starting from — Contact us",
    bestFor: "Small businesses automating their first process",
    features: [
      "One end-to-end workflow build",
      "Up to 2 connected apps or systems",
      "Testing against real scenarios",
      "Basic documentation",
      "2 weeks of post-launch support",
    ],
  },
  {
    name: "Business Automation",
    tagline: "For teams automating multiple processes",
    priceLabel: "Starting from — Contact us",
    bestFor: "Growing businesses with several manual processes",
    features: [
      "Up to 4 connected workflows",
      "Multi-app and API integrations",
      "WhatsApp or CRM automation included",
      "Workflow documentation & handover",
      "30 days of post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "Advanced Automation",
    tagline: "For complex, multi-step business processes",
    priceLabel: "Starting from — Contact us",
    bestFor: "Businesses with branching logic, approvals or AI needs",
    features: [
      "Custom multi-step workflows with conditional logic",
      "AI automation components where needed",
      "Error handling and monitoring",
      "Priority build timeline",
      "60 days of post-launch support",
    ],
  },
  {
    name: "Custom Enterprise Automation",
    tagline: "For organizations with ongoing automation needs",
    priceLabel: "Custom — Contact us",
    bestFor: "Organizations needing an ongoing automation partner",
    features: [
      "Dedicated automation roadmap",
      "Multiple workflows built and maintained over time",
      "Ongoing monitoring and optimization",
      "Direct access for new automation requests",
      "Custom SLA and support terms",
    ],
  },
];
