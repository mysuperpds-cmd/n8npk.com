import "server-only";
import type { Lead } from "@/lib/leads/lead";

// Delivery order:
//   1. n8n webhook. n8n saves the lead to Google Sheets and replies 2xx only
//      after the row is written, then sends the WhatsApp alert.
//   2. Backup email through Resend, used only if n8n is missing or failed.
//   3. If both fail, the full lead is written to the server log so it can
//      still be recovered, and the visitor is told it did not go through.

const N8N_TIMEOUT_MS = 8000;
const N8N_ATTEMPTS = 2;
const EMAIL_TIMEOUT_MS = 8000;

export type DeliveryResult = {
  delivered: boolean;
  channel: "n8n" | "backup-email" | "none";
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

async function sendToN8n(lead: Lead, problems: string[]): Promise<boolean> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) {
    problems.push("n8n webhook is not configured");
    return false;
  }

  for (let attempt = 1; attempt <= N8N_ATTEMPTS; attempt++) {
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
      problems.push(`n8n attempt ${attempt}: HTTP ${res.status}`);
    } catch (error) {
      problems.push(`n8n attempt ${attempt}: ${error instanceof Error ? error.name : "error"}`);
    }
  }
  return false;
}

function formatLeadEmail(lead: Lead, problems: string[]): string {
  const lines = [
    "A new enquiry arrived on n8npk.com, but it could NOT be saved to the Google Sheet automatically.",
    "Please add it to the sheet by hand and check the n8n workflow.",
    "",
    `Problem: ${problems.join("; ")}`,
    "",
    ...Object.entries(lead).map(([key, value]) => `${key}: ${value || "-"}`),
  ];
  return lines.join("\n");
}

async function sendBackupEmail(lead: Lead, problems: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_BACKUP_EMAIL_TO;
  const from = process.env.LEAD_BACKUP_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    problems.push("backup email is not configured");
    return false;
  }

  try {
    const res = await fetchWithTimeout(
      process.env.RESEND_API_URL ?? "https://api.resend.com/emails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from,
          to: to.split(",").map((address) => address.trim()),
          reply_to: lead.email || undefined,
          subject: `[Backup] New ${lead.formType} enquiry from ${lead.name} (${lead.leadId})`,
          text: formatLeadEmail(lead, problems),
        }),
      },
      EMAIL_TIMEOUT_MS,
    );
    if (res.ok) return true;
    problems.push(`backup email: HTTP ${res.status}`);
  } catch (error) {
    problems.push(`backup email: ${error instanceof Error ? error.name : "error"}`);
  }
  return false;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const problems: string[] = [];

  if (await sendToN8n(lead, problems)) {
    return { delivered: true, channel: "n8n", problems };
  }

  const viaEmail = await sendBackupEmail(lead, problems);
  // Always leave a trace in the server log when the primary path failed.
  console.error(
    viaEmail ? "LEAD_PRIMARY_FAILED_BACKUP_SENT" : "LEAD_DELIVERY_FAILED",
    JSON.stringify({ problems, lead: viaEmail ? { leadId: lead.leadId } : lead }),
  );
  return { delivered: viaEmail, channel: viaEmail ? "backup-email" : "none", problems };
}
