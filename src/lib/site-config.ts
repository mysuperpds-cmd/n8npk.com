export const siteConfig = {
  name: "N8NPK",
  domain: "n8npk.com",
  url: "https://n8npk.com",
  legalName: "N8NPK",
  tagline: "n8n Automation & AI Workflow Solutions in Pakistan",
  description:
    "N8NPK designs and builds n8n automation and AI-powered workflows that connect your business apps, cut repetitive work, and help teams in Pakistan and beyond operate more efficiently.",
  affiliationNote:
    "N8NPK is an independent automation studio specializing in solutions built with n8n. We are not the n8n company and are not officially affiliated with or endorsed by n8n GmbH.",
  contact: {
    email: "mysuperpds@gmail.com",
    phone: null as string | null,
  },
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    x: null as string | null,
  },
  serviceArea:
    "Serving businesses across Pakistan — including Lahore, Islamabad, Karachi, Rawalpindi, Faisalabad, Gujranwala, Gujrat and Peshawar — plus international clients remotely.",
  keywords: [
    "n8n automation Pakistan",
    "n8n automation services Pakistan",
    "n8n automation agency Pakistan",
    "n8n consultant Pakistan",
    "n8n workflow automation",
    "n8n AI automation",
    "business automation Pakistan",
    "workflow automation Pakistan",
    "AI automation Pakistan",
    "WhatsApp automation Pakistan",
    "e-commerce automation Pakistan",
    "WooCommerce automation Pakistan",
    "CRM automation Pakistan",
    "API automation Pakistan",
  ],
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const servicesNav: NavLink[] = [
  {
    label: "n8n Automation Services",
    href: "/services/n8n-automation",
    description: "End-to-end workflow builds on the n8n platform",
  },
  {
    label: "AI Automation",
    href: "/services/ai-automation",
    description: "AI agents and intelligent decision workflows",
  },
  {
    label: "Business Workflow Automation",
    href: "/services/business-workflow-automation",
    description: "Automate operations, HR, finance and reporting",
  },
  {
    label: "E-commerce Automation",
    href: "/services/ecommerce-automation",
    description: "WooCommerce, Shopify, orders and inventory",
  },
  {
    label: "WhatsApp Automation",
    href: "/services/whatsapp-automation",
    description: "Notifications, support and lead follow-up",
  },
  {
    label: "Lead & CRM Automation",
    href: "/services/lead-crm-automation",
    description: "Capture, qualify and route leads automatically",
  },
  {
    label: "API Integrations",
    href: "/services/api-integrations",
    description: "Connect any app with a REST, webhook or API layer",
  },
  {
    label: "Custom n8n Workflows",
    href: "/services/custom-n8n-workflows",
    description: "Bespoke automation for unique processes",
  },
  {
    label: "Automation Consulting",
    href: "/services/automation-consulting",
    description: "Process audits and an automation roadmap",
  },
];

export const resourcesNav: NavLink[] = [
  { label: "Blog", href: "/blog", description: "Guides on n8n and automation" },
  { label: "Case Studies", href: "/case-studies", description: "Example automation scenarios" },
  { label: "Workflow Library", href: "/workflows", description: "Browse ready-to-build workflows" },
];

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Workflow Library", href: "/workflows" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: servicesNav.map(({ label, href }) => ({ label, href })),
  company: [
    { label: "About N8NPK", href: "/about" },
    { label: "Industries We Serve", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Workflow Library", href: "/workflows" },
    { label: "Blog", href: "/blog" },
    { label: "Request an Automation", href: "/request-automation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export const navCta: NavLink = { label: "Request an Automation", href: "/request-automation" };
