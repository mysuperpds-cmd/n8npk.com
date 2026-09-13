import type { CaseStudy } from "@/lib/content/types";

export const caseStudyDisclaimer =
  "These are illustrative automation scenarios based on common, real-world business processes we build for clients — presented here to show how a project typically comes together. They are examples of our approach, not claims about a specific named client.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "online-store-order-automation",
    title: "Automating order-to-delivery for a growing online store",
    industry: "E-commerce",
    summary: "A WooCommerce store outgrew its manual order process as daily order volume increased.",
    challenge:
      "Staff were manually checking new orders, updating an inventory spreadsheet, and messaging customers individually — a process that took longer every week as order volume grew, and occasionally led to stock mismatches.",
    approach: [
      "Mapped the full order lifecycle from checkout to delivery notification",
      "Connected WooCommerce to n8n to trigger on every new order",
      "Automated inventory updates, invoice generation and WhatsApp confirmation",
      "Added a daily sales summary delivered automatically each morning",
    ],
    chain: ["WooCommerce Order", "n8n", "Inventory Update", "Invoice", "WhatsApp Notification"],
    outcomeThemes: [
      "Order confirmations now go out within seconds instead of hours",
      "Inventory records stay consistent without manual reconciliation",
      "Staff time shifted from data entry to actual customer service",
    ],
  },
  {
    slug: "agency-lead-response-automation",
    title: "Cutting lead response time for a digital marketing agency",
    industry: "Marketing Agency",
    summary: "An agency running Facebook lead ads for clients struggled with delayed follow-up across accounts.",
    challenge:
      "Leads from multiple client ad accounts were checked manually at different intervals, meaning some leads went cold before anyone reached out — hurting both client results and the agency's own reporting.",
    approach: [
      "Connected each client's Facebook Lead Ads account to a shared n8n workflow",
      "Routed leads automatically into the right CRM pipeline per client",
      "Added instant WhatsApp alerts to the assigned account manager",
      "Built a simple weekly report summarizing lead volume and response time",
    ],
    chain: ["Facebook Lead Ad", "n8n", "CRM", "WhatsApp Alert", "Account Manager"],
    outcomeThemes: [
      "Lead follow-up time dropped from hours to minutes",
      "Account managers could prove faster response times to clients",
      "Reporting became automatic instead of manually compiled",
    ],
  },
  {
    slug: "clinic-appointment-reminders",
    title: "Reducing no-shows for a multi-branch clinic",
    industry: "Healthcare",
    summary: "A clinic with several branches had no consistent way to remind patients of upcoming appointments.",
    challenge:
      "Front-desk staff at each branch were expected to call or message patients before appointments, but this happened inconsistently depending on how busy the desk was that day, leading to a steady rate of no-shows.",
    approach: [
      "Connected the clinic's booking system to n8n across all branches",
      "Built a scheduled workflow checking for upcoming appointments twice daily",
      "Automated WhatsApp reminders sent to patients ahead of their visit",
      "Added a simple confirmation reply flow to flag likely cancellations early",
    ],
    chain: ["Booking System", "n8n", "Schedule Check", "WhatsApp Reminder"],
    outcomeThemes: [
      "Noticeably fewer missed appointments across branches",
      "Front-desk staff freed from manual reminder calls",
      "Consistent patient experience regardless of branch",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
