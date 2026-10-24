import "server-only";
import type { Lead } from "@/lib/leads/lead";

// Delivery order (email first):
//   1. Email notification to the owner through Resend. Required. Retried once.
//   2. Optional copy to an n8n webhook (Google Sheets, WhatsApp) if it is configured.
//      It is an add-on: when it fails, the visitor is not affected as long as the
//      email went out.
//   3. The visitor is told "received" only when at least one of the two worked.
//      If both fail, the full lead goes to the server log so it can be recovered,
//      and the visitor sees an honest error with their text kept in the form.

const EMAIL_TIMEOUT_MS = 8000;
const EMAIL_ATTEMPTS = 2;
const N8N_TIMEOUT_MS = 5000;

export type DeliveryResult = {
  delivered: boolean;
  email: boolean;
  n8n: boolean | "not-configured";
  problems: string[];
};

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

// Keeps a header-like line on one line, whatever the visitor typed.
function oneLine(value: string, max = 80) {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

const FORM_LABELS: Record<Lead["formType"], string> = {
  "request-automation": "Request an Automation",
  contact: "Contact",
};

export function formatLeadEmail(lead: Lead): string {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["WhatsApp / phone", lead.phone],
    ["Business", lead.business],
    ["Industry", lead.industry],
    ["Website", lead.website],
    ["Subject", lead.subject],
    ["Message", lead.message],
    ["Current tools", lead.tools],
    ["Volume", lead.volume],
    ["Budget", lead.budget],
    ["Other details", lead.details],
  ];
  const tracking: [string, string][] = [
    ["Lead ID", lead.leadId],
    ["Received (Pakistan time)", lead.receivedAtPakistan],
    ["Form page", lead.pageUrl],
    ["First landing page", lead.landingPage],
    ["Referrer", lead.referrer],
    ["UTM source / medium / campaign", [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ")],
    ["UTM term / content", [lead.utmTerm, lead.utmContent].filter(Boolean).join(" / ")],
  ];
  const show = (list: [string, string][]) =>
    list.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);

  return [
    `New ${FORM_LABELS[lead.formType]} enquiry on n8npk.com.`,
    "Reply to this email to answer the visitor directly.",
    "",
    ...show(rows),
    "",
    "-- Tracking --",
    ...show(tracking),
  ].join("\n");
}

async function sendEmail(lead: Lead, problems: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    problems.push("lead email is not configured");
    return false;
  }

  const body = JSON.stringify({
    from,
    to: to.split(",").map((address) => address.trim()).filter(Boolean),
    reply_to: lead.email || undefined,
    subject: `New ${FORM_LABELS[lead.formType]} enquiry from ${oneLine(lead.name)} (${lead.leadId})`,
    text: formatLeadEmail(lead),
  });

  for (let attempt = 1; attempt <= EMAIL_ATTEMPTS; attempt++) {
    try {
      const res = await fetchWithTimeout(
        process.env.RESEND_API_URL ?? "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            // A retry after a lost response must not send a second email.
            "Idempotency-Key": lead.leadId,
          },
          body,
        },
        EMAIL_TIMEOUT_MS,
      );
      if (res.ok) return true;
      problems.push(`email attempt ${attempt}: HTTP ${res.status}`);
      // 4xx other than rate limiting means a setup problem; retrying won't help.
      if (res.status < 500 && res.status !== 429) break;
    } catch (error) {
      problems.push(`email attempt ${attempt}: ${error instanceof Error ? error.name : "error"}`);
    }
  }
  return false;
}

async function sendToN8n(lead: Lead, problems: string[]): Promise<boolean | "not-configured"> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) return "not-configured";

  try {
    const res = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Webhook-Secret": secret },
        body: JSON.stringify(lead),
      },
      N8N_TIMEOUT_MS,
    );
    if (res.ok) return true;
    problems.push(`n8n: HTTP ${res.status}`);
  } catch (error) {
    problems.push(`n8n: ${error instanceof Error ? error.name : "error"}`);
  }
  return false;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const problems: string[] = [];
  const [email, n8n] = await Promise.all([sendEmail(lead, problems), sendToN8n(lead, problems)]);
  const delivered = email || n8n === true;

  if (!delivered) {
    // Last resort: keep the whole enquiry in the server log so it can be recovered.
    console.error("LEAD_DELIVERY_FAILED", JSON.stringify({ problems, lead }));
  } else if (problems.length > 0) {
    console.error(
      email ? "LEAD_N8N_COPY_FAILED" : "LEAD_EMAIL_FAILED_SAVED_IN_N8N",
      JSON.stringify({ problems, leadId: lead.leadId }),
    );
  }
  return { delivered, email, n8n, problems };
}
