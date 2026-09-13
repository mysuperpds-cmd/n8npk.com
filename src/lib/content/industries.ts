import type { Industry } from "@/lib/content/types";

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce & Online Stores",
    summary: "Automate order processing, inventory, customer notifications and reporting for WooCommerce and Shopify stores.",
    metaDescription: "n8n automation for e-commerce businesses in Pakistan — order processing, inventory sync, customer notifications and reporting.",
    painPoints: [
      "Manual order processing that doesn't scale with growth",
      "Inventory counts that drift out of sync across channels",
      "Customers left without updates after checkout",
      "Sales data scattered across the store dashboard and spreadsheets",
    ],
    useCases: [
      { title: "Order processing automation", description: "Orders automatically update inventory, generate invoices and trigger customer notifications." },
      { title: "Abandoned cart recovery", description: "Personalized follow-ups for carts left without checking out." },
      { title: "Sales reporting", description: "Daily or weekly sales summaries delivered automatically to your sheet or inbox." },
    ],
    relatedWorkflowSlugs: ["woocommerce-order-to-invoice-whatsapp", "shopify-abandoned-cart-followup", "inventory-low-stock-alerts"],
  },
  {
    slug: "education",
    name: "Education & Training Institutes",
    summary: "Automate admissions inquiries, form intake, and student communication for schools, academies and training centers.",
    metaDescription: "n8n automation for educational institutions in Pakistan — admissions inquiries, form intake and student communication workflows.",
    painPoints: [
      "Admissions inquiries handled manually across multiple channels",
      "Registration forms that need to be re-entered into spreadsheets",
      "Reminders for classes, fees or events sent inconsistently",
    ],
    useCases: [
      { title: "Admissions inquiry routing", description: "Website and form inquiries are logged and routed to the right admissions staff automatically." },
      { title: "Form-to-record automation", description: "Registration form submissions are logged to Sheets and confirmed by email or WhatsApp." },
      { title: "Automated reminders", description: "Fee due dates, class schedules and events are reminded automatically." },
    ],
    relatedWorkflowSlugs: ["google-form-to-sheets-email-whatsapp", "appointment-reminder-whatsapp", "wordpress-form-lead-routing"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary: "Capture and route property inquiries instantly, and keep client follow-ups on schedule.",
    metaDescription: "n8n automation for real estate businesses in Pakistan — lead capture, inquiry routing and client follow-up workflows.",
    painPoints: [
      "Property inquiries from multiple portals and social ads handled inconsistently",
      "Follow-ups delayed while agents are out showing properties",
      "No central record of who inquired about which listing",
    ],
    useCases: [
      { title: "Lead capture and routing", description: "Inquiries from ads, forms and portals are captured and routed to the right agent automatically." },
      { title: "WhatsApp follow-up", description: "Instant WhatsApp acknowledgement while an agent prepares a full response." },
      { title: "Listing-based CRM tracking", description: "A structured record of every inquiry, tagged by listing and agent." },
    ],
    relatedWorkflowSlugs: ["facebook-lead-to-crm-whatsapp", "wordpress-form-lead-routing", "google-sheets-crm-lightweight"],
  },
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    summary: "Reduce no-shows and streamline patient communication with automated appointment workflows.",
    metaDescription: "n8n automation for clinics and healthcare providers in Pakistan — appointment reminders and patient communication workflows.",
    painPoints: [
      "Missed appointments due to inconsistent reminders",
      "Front-desk staff spending time on routine scheduling questions",
      "Patient records maintained separately from communication tools",
    ],
    useCases: [
      { title: "Appointment reminders", description: "Automated WhatsApp reminders ahead of scheduled visits reduce no-shows." },
      { title: "AI-assisted front desk support", description: "Routine scheduling and general questions answered automatically, with escalation for anything clinical." },
      { title: "Follow-up scheduling", description: "Automatic prompts for follow-up visits based on prior appointment data." },
    ],
    relatedWorkflowSlugs: ["appointment-reminder-whatsapp", "whatsapp-ai-agent-knowledge-base"],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    summary: "Automate lead capture, client reporting and content workflows across multiple client accounts.",
    metaDescription: "n8n automation for marketing agencies in Pakistan — lead capture, client reporting and content scheduling workflows.",
    painPoints: [
      "Manually compiling performance reports for every client",
      "Content approval and scheduling handled through disconnected tools",
      "Lead capture forms managed separately for each client account",
    ],
    useCases: [
      { title: "Client reporting automation", description: "Automated pulls from ad platforms into a shared reporting sheet or dashboard." },
      { title: "Content scheduling", description: "Approved content moves automatically from planning docs into scheduling tools." },
      { title: "Multi-client lead routing", description: "Leads from each client's channels are routed to the right account manager." },
    ],
    relatedWorkflowSlugs: ["social-media-content-scheduling", "facebook-lead-to-crm-whatsapp"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary: "Automate client intake, document handling and internal reporting for consultancies and service firms.",
    metaDescription: "n8n automation for professional services firms in Pakistan — client intake, document handling and reporting workflows.",
    painPoints: [
      "Client intake forms that require manual data entry into internal systems",
      "Invoices and documents processed by hand",
      "Internal reporting that takes hours to compile each week",
    ],
    useCases: [
      { title: "Client intake automation", description: "Intake forms feed directly into your project or CRM system." },
      { title: "Document data extraction", description: "Key details are pulled from invoices and contracts automatically." },
      { title: "Weekly reporting", description: "Recurring internal reports are generated and delivered on schedule." },
    ],
    relatedWorkflowSlugs: ["invoice-document-data-extraction", "google-form-to-sheets-email-whatsapp"],
  },
  {
    slug: "retail",
    name: "Retail",
    summary: "Connect point-of-sale, inventory and customer communication for single and multi-location retailers.",
    metaDescription: "n8n automation for retail businesses in Pakistan — inventory alerts, customer notifications and reporting workflows.",
    painPoints: [
      "Stock levels tracked manually across locations",
      "Customer communication handled inconsistently between branches",
      "Sales reporting compiled by hand at the end of each day",
    ],
    useCases: [
      { title: "Low stock alerts", description: "Automatic alerts when any product drops below its reorder threshold." },
      { title: "Customer notifications", description: "Automated order and pickup notifications sent via WhatsApp." },
      { title: "Sales summaries", description: "Daily sales figures delivered automatically to management." },
    ],
    relatedWorkflowSlugs: ["inventory-low-stock-alerts", "appointment-reminder-whatsapp"],
  },
  {
    slug: "startups",
    name: "Startups",
    summary: "Automate the operational basics early so your small team can focus on the product and customers.",
    metaDescription: "n8n automation for startups in Pakistan — lightweight CRM, lead capture and internal workflow automation.",
    painPoints: [
      "No dedicated operations team to handle repetitive admin work",
      "Leads and customer data scattered across tools",
      "Limited budget for expensive enterprise software",
    ],
    useCases: [
      { title: "Lightweight CRM automation", description: "A structured Google Sheet-based CRM with automated follow-up reminders." },
      { title: "Lead capture", description: "Every lead source feeds into one place automatically." },
      { title: "Internal task automation", description: "Recurring internal admin tasks handled without dedicated staff." },
    ],
    relatedWorkflowSlugs: ["google-sheets-crm-lightweight", "facebook-lead-to-crm-whatsapp"],
  },
  {
    slug: "smes",
    name: "Small & Medium Enterprises",
    summary: "Automate the operational, sales and reporting tasks that hold growing SMEs back from scaling further.",
    metaDescription: "n8n automation for SMEs in Pakistan — operations, sales and reporting automation to support business growth.",
    painPoints: [
      "Growth outpacing the team's ability to keep up with manual processes",
      "Data spread across disconnected tools and spreadsheets",
      "Management lacking real-time visibility into operations",
    ],
    useCases: [
      { title: "Operational reporting", description: "Recurring reports compiled and delivered automatically." },
      { title: "Sales and lead automation", description: "Leads captured, qualified and routed without manual work." },
      { title: "Cross-tool data sync", description: "Systems that don't natively talk to each other are connected via API." },
    ],
    relatedWorkflowSlugs: ["crm-data-enrichment-sync", "invoice-document-data-extraction"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
