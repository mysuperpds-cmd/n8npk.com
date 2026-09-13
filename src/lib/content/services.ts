import type { ServiceDetail } from "@/lib/content/types";

export const services: ServiceDetail[] = [
  {
    slug: "n8n-automation",
    name: "n8n Automation Services",
    shortDescription:
      "Custom n8n workflows that connect your business apps and automate the manual steps between them.",
    metaDescription:
      "N8NPK builds custom n8n automation workflows for businesses in Pakistan — connecting your apps, removing manual data entry, and keeping your systems in sync.",
    heroSubhead:
      "We design, build, test and maintain n8n workflows that do the repetitive parts of your job automatically — so your team can focus on work that actually needs a human.",
    problem:
      "Most businesses run on a mix of tools — spreadsheets, a website, a payment gateway, WhatsApp, an inbox, maybe a CRM — that don't talk to each other. Someone ends up copying data between them by hand, every single day.",
    solution:
      "n8n is a workflow automation platform that can connect almost any app, API, database or AI tool. We use it to build workflows that watch for an event (a new order, a form submission, a message) and automatically carry out the steps that used to be manual — updating records, sending notifications, generating documents, or triggering the next step in your process.",
    examples: [
      {
        title: "New order to fulfilment",
        chain: ["Order Placed", "n8n", "Inventory Update", "Invoice", "Customer Notification"],
        benefit: "Orders move to fulfilment within seconds, with no manual re-entry.",
      },
      {
        title: "Form submission to CRM",
        chain: ["Website Form", "n8n", "CRM Record", "Team Notification"],
        benefit: "Every lead is captured and assigned before your team even checks their inbox.",
      },
    ],
    integrations: [
      "Google Sheets & Workspace",
      "WooCommerce & Shopify",
      "WhatsApp Business API",
      "CRMs (HubSpot, Pipedrive, custom)",
      "Email (Gmail, Outlook, SMTP)",
      "Payment gateways & invoicing tools",
      "Airtable & databases",
      "REST APIs & webhooks",
    ],
    benefits: [
      "Removes repetitive manual data entry",
      "Cuts the delay between an event happening and someone acting on it",
      "Reduces copy-paste errors between systems",
      "Gives you a single automated process instead of scattered manual steps",
      "Scales without needing to hire for repetitive tasks",
    ],
    process: [
      { title: "Discovery call", description: "We learn what you do manually today, which tools you use, and where the time actually goes." },
      { title: "Workflow design", description: "We map the automation as a clear step-by-step flow and confirm it with you before building anything." },
      { title: "Build & test", description: "We build the workflow in n8n and test it against real scenarios, including edge cases." },
      { title: "Deploy & support", description: "We deploy the workflow, document it, and stay available for adjustments as your process evolves." },
    ],
    faqs: [
      {
        question: "Do we need to already use n8n?",
        answer: "No. We set up and host the automation platform for you as part of the build, or work inside your existing n8n instance if you already have one.",
      },
      {
        question: "What if our tools aren't on n8n's standard list?",
        answer: "n8n supports custom HTTP requests and webhooks, so most apps with an API can be connected even without a dedicated integration.",
      },
      {
        question: "How long does a typical workflow take to build?",
        answer: "A simple workflow can be live within a few days. More advanced, multi-step automations typically take one to three weeks depending on the number of systems involved.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    shortDescription:
      "Combine n8n with AI models to handle judgment-based tasks — replies, classification, extraction and qualification.",
    metaDescription:
      "AI automation services in Pakistan built on n8n — AI customer support, lead qualification, document processing and AI agents connected to your business systems.",
    heroSubhead:
      "Standard automation follows fixed rules. AI automation adds judgment — reading a message, understanding intent, and deciding what should happen next.",
    problem:
      "Some tasks can't be automated with simple if/then rules because they involve understanding language, context or unstructured documents — replying to a customer question, judging whether a lead is worth following up, or pulling the right details out of an invoice.",
    solution:
      "We connect n8n workflows to AI models to handle these judgment-based steps. The AI reads the input, makes a decision or generates a response, and n8n takes it from there — updating a record, sending a reply, or routing it to a person when it isn't confident.",
    examples: [
      {
        title: "AI lead qualification",
        chain: ["New Lead", "n8n", "AI Scoring", "CRM", "Sales Notification"],
        benefit: "Sales teams only get notified about leads worth calling.",
      },
      {
        title: "AI customer message triage",
        chain: ["Customer Message", "n8n", "AI Classification", "Route to Team or Auto-Reply"],
        benefit: "Routine questions get an instant answer; complex ones reach a human immediately.",
      },
    ],
    integrations: [
      "OpenAI / Anthropic / other LLM APIs",
      "Vector databases for knowledge lookup",
      "WhatsApp & live chat",
      "CRMs and helpdesks",
      "Google Sheets & databases",
      "Document and PDF sources",
    ],
    benefits: [
      "Handles judgment-based tasks that pure rules can't cover",
      "Gives instant first responses around the clock",
      "Frees your team from reading and sorting routine messages",
      "Keeps a human in the loop for anything the AI isn't confident about",
      "Improves consistently as you refine the source material it works from",
    ],
    process: [
      { title: "Identify the decision point", description: "We find the specific step in your process where judgment is currently required." },
      { title: "Design the AI step", description: "We define what the AI should read, what it should decide, and what happens with low-confidence results." },
      { title: "Build & test with real examples", description: "We test against real messages, documents or leads before going live." },
      { title: "Monitor & refine", description: "We review outcomes and refine prompts and rules as your business changes." },
    ],
    faqs: [
      {
        question: "Will AI replace our support or sales team?",
        answer: "No — we design these workflows to handle routine, repetitive judgment calls and hand anything uncertain or high-value to your team, not to replace them.",
      },
      {
        question: "Can the AI work from our own documents and policies?",
        answer: "Yes, we can connect a knowledge base of your documents so responses are grounded in your actual policies rather than generic answers.",
      },
      {
        question: "Is our data safe when using AI models?",
        answer: "We use reputable AI providers, avoid sending unnecessary personal data, and can discuss data handling requirements specific to your business before we build anything.",
      },
    ],
  },
  {
    slug: "business-workflow-automation",
    name: "Business Workflow Automation",
    shortDescription:
      "Automate the recurring operational, finance, HR and reporting tasks that eat up your team's week.",
    metaDescription:
      "Business workflow automation with n8n — automate operations, finance, HR and reporting tasks for SMEs and growing companies in Pakistan.",
    heroSubhead:
      "Every business has recurring internal work — approvals, reports, reminders, record-keeping — that follows a predictable pattern. We automate that pattern.",
    problem:
      "Operational tasks like weekly reports, approval chains, onboarding checklists and reminders are predictable, but they still take real time every week because someone has to do them manually.",
    solution:
      "We map your recurring internal processes and rebuild them as n8n workflows that run on a schedule or trigger automatically, pulling data from your existing systems and delivering the result where you need it.",
    examples: [
      {
        title: "Weekly performance report",
        chain: ["Schedule", "n8n", "Pull Data from Systems", "Google Sheets", "Email to Team"],
        benefit: "Reports are ready every Monday morning without anyone compiling them.",
      },
      {
        title: "Employee onboarding checklist",
        chain: ["New Hire Form", "n8n", "Account Creation Tasks", "Notify HR & Manager"],
        benefit: "Nothing gets missed on a new hire's first day.",
      },
    ],
    integrations: [
      "Google Workspace & Microsoft 365",
      "Airtable, Notion & databases",
      "Accounting and invoicing tools",
      "HR and payroll systems",
      "Slack & Microsoft Teams",
      "Internal APIs",
    ],
    benefits: [
      "Reclaims hours spent on recurring manual tasks every week",
      "Standardizes processes so they run the same way every time",
      "Reduces the risk of steps being forgotten",
      "Gives management visibility without chasing updates",
      "Frees senior staff from admin work",
    ],
    process: [
      { title: "Map current process", description: "We document exactly how the task is done today, including exceptions." },
      { title: "Redesign for automation", description: "We simplify the process where needed so it can run reliably without a person." },
      { title: "Build & pilot", description: "We build the workflow and run it alongside the manual process until it's proven." },
      { title: "Switch over & support", description: "We fully switch it over and remain available for tweaks as the business changes." },
    ],
    faqs: [
      {
        question: "What kinds of internal processes are worth automating?",
        answer: "Anything recurring, rule-based and time-consuming — reporting, approvals, reminders, data reconciliation and onboarding are common starting points.",
      },
      {
        question: "Do you need access to our internal systems?",
        answer: "Only the access required to read or write the specific data involved in the workflow, granted through your own accounts and permissions.",
      },
    ],
  },
  {
    slug: "ecommerce-automation",
    name: "E-commerce Automation",
    shortDescription:
      "Automate orders, inventory, notifications and reporting for WooCommerce and Shopify stores.",
    metaDescription:
      "E-commerce automation for WooCommerce and Shopify stores in Pakistan — order processing, inventory sync, customer notifications and reporting with n8n.",
    heroSubhead:
      "Every order that comes into your store triggers a chain of tasks. We automate that chain so it runs the same way, every time, without manual work.",
    problem:
      "As an online store grows, order processing, inventory updates, customer notifications and reporting become too much to handle manually — and manual handling is where mistakes and delays creep in.",
    solution:
      "We connect your store (WooCommerce or Shopify) to n8n so that orders automatically trigger the next steps — updating inventory, generating invoices, notifying customers, and feeding clean data into your reporting sheets or CRM.",
    examples: [
      {
        title: "Order to customer notification",
        chain: ["WooCommerce Order", "n8n", "Inventory Update", "Invoice", "WhatsApp Notification"],
        benefit: "Customers get instant confirmation while your inventory stays accurate.",
      },
      {
        title: "Daily sales report",
        chain: ["Schedule", "n8n", "Shopify Orders", "Google Sheets Report"],
        benefit: "You see yesterday's performance without opening the store dashboard.",
      },
    ],
    integrations: [
      "WooCommerce",
      "Shopify",
      "Payment gateways",
      "WhatsApp Business API",
      "Courier / shipping APIs",
      "Google Sheets",
      "CRMs",
      "Email marketing tools",
    ],
    benefits: [
      "Faster order-to-fulfilment time",
      "Fewer stock discrepancies between store and warehouse",
      "Automatic customer notifications at every order stage",
      "Clean, always-current sales data for reporting",
      "Less manual work as order volume grows",
    ],
    process: [
      { title: "Store audit", description: "We review your current order flow and identify where manual work happens." },
      { title: "Workflow design", description: "We design the automation to match how your store actually operates." },
      { title: "Build & test with real orders", description: "We test using real store data before switching anything live." },
      { title: "Go live & monitor", description: "We monitor the first order cycles closely and refine as needed." },
    ],
    faqs: [
      {
        question: "Do you support abandoned cart automation?",
        answer: "Yes, where your platform and email/WhatsApp provider support it, we can automate abandoned cart follow-ups within their allowed use policies.",
      },
      {
        question: "Can this work alongside our existing plugins and apps?",
        answer: "Usually yes — n8n integrates via APIs and webhooks, so it typically runs alongside your existing store plugins rather than replacing them.",
      },
    ],
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    shortDescription:
      "Automated order updates, appointment reminders, lead follow-up and support notifications on WhatsApp.",
    metaDescription:
      "WhatsApp automation for businesses in Pakistan — order updates, appointment reminders, lead follow-up and customer support notifications built with n8n.",
    heroSubhead:
      "WhatsApp is where your customers already are. We automate the messages your business needs to send — reliably, and within WhatsApp's own business messaging rules.",
    problem:
      "Sending order updates, reminders and follow-ups manually on WhatsApp doesn't scale, and it's easy to forget or delay messages when your team is busy.",
    solution:
      "We build n8n workflows that connect to appropriate WhatsApp Business messaging solutions, so notifications, reminders and follow-ups go out automatically based on events in your other systems — an order, a booking, or a form submission.",
    examples: [
      {
        title: "Order status updates",
        chain: ["Order Update", "n8n", "WhatsApp Business API", "Customer"],
        benefit: "Customers stay informed without your team sending each message.",
      },
      {
        title: "Appointment reminders",
        chain: ["Booking System", "n8n", "Schedule Check", "WhatsApp Reminder"],
        benefit: "Fewer no-shows for clinics, salons and service businesses.",
      },
    ],
    integrations: [
      "WhatsApp Business Platform (Cloud API)",
      "Booking and appointment systems",
      "WooCommerce & Shopify",
      "CRMs",
      "Google Sheets",
    ],
    benefits: [
      "Faster, more consistent customer communication",
      "Fewer missed appointments and follow-ups",
      "Reduced manual messaging workload for your team",
      "A record of what was sent and when",
    ],
    process: [
      { title: "Use-case mapping", description: "We identify which messages should be automated and what should trigger them." },
      { title: "Messaging setup", description: "We help set up the appropriate WhatsApp Business messaging channel for automated use." },
      { title: "Build & test", description: "We build and test the workflow with real message templates." },
      { title: "Launch & monitor", description: "We launch and monitor delivery, adjusting templates and timing as needed." },
    ],
    faqs: [
      {
        question: "Can this send bulk unsolicited marketing messages?",
        answer: "No — we build automation for legitimate transactional and customer-service messaging within WhatsApp's business messaging policies, not unsolicited bulk marketing.",
      },
      {
        question: "Do we need a WhatsApp Business API account?",
        answer: "For automated, programmatic messaging you'll need an approved WhatsApp Business Platform account; we can advise on the right setup for your volume and use case.",
      },
    ],
  },
  {
    slug: "lead-crm-automation",
    name: "Lead Generation & CRM Automation",
    shortDescription:
      "Capture leads from every channel, route them automatically, and keep your CRM accurate without manual entry.",
    metaDescription:
      "Lead and CRM automation with n8n — capture leads from Facebook, Instagram, your website and WhatsApp, and route them automatically into your CRM.",
    heroSubhead:
      "Leads arrive from ads, forms, WhatsApp and social media. We make sure every one of them lands in your CRM and reaches your sales team without delay.",
    problem:
      "When leads come from multiple channels, someone has to manually check each source and enter the details into a CRM — and by the time they do, the lead may have gone cold.",
    solution:
      "We build workflows that pull leads from Facebook/Instagram lead forms, your website, and WhatsApp directly into your CRM, apply any qualification rules you need, and notify your sales team immediately.",
    examples: [
      {
        title: "Facebook lead to sales team",
        chain: ["Facebook Lead Ad", "n8n", "CRM", "WhatsApp Notification", "Sales Team"],
        benefit: "Sales follows up within minutes instead of hours.",
      },
      {
        title: "Website lead qualification",
        chain: ["Website Form", "n8n", "AI Qualification", "CRM", "Sales Notification"],
        benefit: "Sales sees which leads are worth prioritizing first.",
      },
    ],
    integrations: [
      "Facebook & Instagram Lead Ads",
      "Website forms",
      "HubSpot, Pipedrive & custom CRMs",
      "WhatsApp Business API",
      "Google Sheets",
      "Email",
    ],
    benefits: [
      "No lead falls through the cracks between channels",
      "Faster follow-up time improves conversion",
      "CRM data stays accurate without manual entry",
      "Sales team gets notified the moment a lead arrives",
    ],
    process: [
      { title: "Map lead sources", description: "We identify every channel leads currently come from." },
      { title: "Design routing logic", description: "We define how leads should be captured, qualified and assigned." },
      { title: "Build & connect CRM", description: "We connect each source to your CRM through n8n." },
      { title: "Test & launch", description: "We test with real lead submissions before going fully live." },
    ],
    faqs: [
      {
        question: "Can you connect to any CRM?",
        answer: "Most CRMs with an API or webhook support can be connected, including popular platforms and many custom-built systems.",
      },
      {
        question: "Can leads be automatically scored or qualified?",
        answer: "Yes, using rule-based scoring or AI-based qualification, depending on how much judgment the qualification requires.",
      },
    ],
  },
  {
    slug: "api-integrations",
    name: "API Integrations",
    shortDescription:
      "Connect any two systems with an API or webhook layer — including tools without a native n8n integration.",
    metaDescription:
      "Custom API integration services using n8n — connect any business system with a REST API or webhook, even without a native integration.",
    heroSubhead:
      "Not every tool has a ready-made connector. We build the API layer that links your systems together, whatever they are.",
    problem:
      "Some of the tools businesses rely on don't have a pre-built connection to each other, leaving teams to move data manually or maintain fragile, one-off scripts.",
    solution:
      "n8n can call any REST API and receive any webhook, so we build custom integration workflows between systems — including internal or lesser-known tools — using their documented APIs.",
    examples: [
      {
        title: "Custom system to CRM sync",
        chain: ["Internal System", "n8n", "API Call", "CRM Update"],
        benefit: "Two systems that never talked to each other now stay in sync automatically.",
      },
      {
        title: "Webhook-triggered workflow",
        chain: ["Third-Party Webhook", "n8n", "Data Transformation", "Destination System"],
        benefit: "Events from any connected tool can trigger your internal processes instantly.",
      },
    ],
    integrations: [
      "Any REST or webhook-based API",
      "Internal/legacy business systems",
      "Databases (Postgres, MySQL, Airtable)",
      "SaaS tools without native n8n nodes",
    ],
    benefits: [
      "Connects tools that don't natively integrate",
      "Removes fragile manual exports/imports between systems",
      "Keeps data consistent across your tool stack",
      "Built to be maintainable, not a one-off script",
    ],
    process: [
      { title: "Review API documentation", description: "We assess what each system's API can and can't do." },
      { title: "Design the data flow", description: "We map exactly what data moves where, and how it's transformed along the way." },
      { title: "Build & test", description: "We build the integration and test it against real data and edge cases." },
      { title: "Document & support", description: "We hand over clear documentation and remain available if the APIs change." },
    ],
    faqs: [
      {
        question: "What if a system has no public API?",
        answer: "We'll assess alternatives such as scheduled exports, database-level access, or other supported methods — we won't attempt anything that violates a platform's terms of service.",
      },
      {
        question: "Can you work with our developers?",
        answer: "Yes, we regularly collaborate with in-house developers, sharing workflow logic and API contracts.",
      },
    ],
  },
  {
    slug: "custom-n8n-workflows",
    name: "Custom n8n Workflows",
    shortDescription:
      "Bespoke automation for processes that don't fit a template — built around exactly how your business works.",
    metaDescription:
      "Custom n8n workflow development for unique business processes in Pakistan — built around your exact tools, rules and edge cases.",
    heroSubhead:
      "Not every process fits a template. When your workflow has its own logic, exceptions and rules, we build it from scratch around exactly how your business works.",
    problem:
      "Generic automation templates often break down once they meet the specific rules, exceptions and approval chains of a real business process.",
    solution:
      "We design custom n8n workflows from the ground up — including conditional logic, multi-step approvals, error handling and retries — tailored to your exact process rather than a generic template.",
    examples: [
      {
        title: "Multi-stage approval workflow",
        chain: ["Request Submitted", "n8n", "Manager Approval", "Finance Approval", "Action Taken"],
        benefit: "Approvals move forward automatically, with a clear record of every decision.",
      },
      {
        title: "Conditional document generation",
        chain: ["Trigger Event", "n8n", "Rule Evaluation", "Custom Document", "Delivery"],
        benefit: "The right document is generated and sent based on your own business rules.",
      },
    ],
    integrations: [
      "Any tool involved in your specific process",
      "Databases and internal systems",
      "Document generation tools",
      "Notification channels (email, WhatsApp, Slack)",
    ],
    benefits: [
      "Built around your actual process, not a generic template",
      "Handles exceptions and edge cases properly",
      "Includes error handling so failures are caught, not silent",
      "Fully documented so it can be maintained long-term",
    ],
    process: [
      { title: "Deep process discovery", description: "We take the time to understand every branch and exception in your process." },
      { title: "Custom logic design", description: "We design the workflow logic, including how errors and exceptions are handled." },
      { title: "Build & thorough testing", description: "We test extensively against edge cases before launch." },
      { title: "Handover & documentation", description: "We provide full documentation so your team understands how it works." },
    ],
    faqs: [
      {
        question: "How is this different from a standard workflow build?",
        answer: "Custom workflows typically involve more branching logic, multiple approval stages, or integration with less common systems than a standard single-purpose automation.",
      },
      {
        question: "Can it be modified later as our process changes?",
        answer: "Yes — we document the workflow clearly so it can be updated as your business evolves, either by us or your own team.",
      },
    ],
  },
  {
    slug: "automation-consulting",
    name: "Automation Consulting",
    shortDescription:
      "A structured audit of your operations to find the highest-impact automation opportunities and a roadmap to build them.",
    metaDescription:
      "n8n automation consulting for businesses in Pakistan — a process audit and automation roadmap prioritized by impact and effort.",
    heroSubhead:
      "Not sure where to start with automation? We audit your current processes and hand you a clear, prioritized roadmap.",
    problem:
      "Many businesses know they want to automate but aren't sure which processes to tackle first, or whether automation is even the right fit for a given task.",
    solution:
      "We run a structured audit of your current operations, identify where automation would have the most impact for the least effort, and deliver a prioritized roadmap — whether or not you build it with us.",
    examples: [
      {
        title: "Process audit",
        chain: ["Discovery Interviews", "n8n Feasibility Review", "Prioritized Roadmap"],
        benefit: "You know exactly which automations to build first and why.",
      },
    ],
    integrations: [
      "N/A — this is an advisory engagement covering your existing tool stack",
    ],
    benefits: [
      "Clear picture of where time is actually being lost",
      "Prioritized by business impact, not guesswork",
      "Realistic view of what automation can and can't do for your process",
      "A roadmap you can execute with us or independently",
    ],
    process: [
      { title: "Stakeholder interviews", description: "We talk to the people who actually run the process day to day." },
      { title: "Process mapping", description: "We document current workflows and where time and errors accumulate." },
      { title: "Opportunity scoring", description: "We score each opportunity by impact and effort to build." },
      { title: "Roadmap delivery", description: "We deliver a prioritized roadmap with clear next steps." },
    ],
    faqs: [
      {
        question: "Do we have to hire N8NPK to build the roadmap afterward?",
        answer: "No — the roadmap is yours to use however you'd like, though we're happy to build it with you if it's a good fit.",
      },
      {
        question: "How long does a consulting engagement take?",
        answer: "Most audits take one to two weeks depending on the number of processes and stakeholders involved.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
