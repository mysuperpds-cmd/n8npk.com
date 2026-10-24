import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { deliverLead } from "@/lib/leads/deliver";
import {
  clean,
  normaliseFields,
  validateLeadFields,
  type Lead,
  type LeadFormType,
  type LeadResponse,
} from "@/lib/leads/lead";

const FORM_TYPES: LeadFormType[] = ["request-automation", "contact"];
// Humans take longer than this to fill in a form; most bots don't.
const MIN_FILL_MS = 2500;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 32 * 1024;

const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string, now: number) {
  const recent = (recentByIp.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentByIp.set(ip, recent);
  if (recentByIp.size > 5000) recentByIp.clear();
  return recent.length > RATE_LIMIT;
}

function json(body: LeadResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function pakistanTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "That message is too long. Please shorten it and try again." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Something went wrong reading the form. Please try again." }, 400);
  }

  const formType = body.formType as LeadFormType;
  if (!FORM_TYPES.includes(formType)) {
    return json({ ok: false, error: "Unknown form." }, 400);
  }

  const now = Date.now();
  const leadId = `N8-${new Date(now).toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 8)}`;

  // Bots: pretend success so they don't retry, but deliver nothing.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (clean(body.honeypot) || (startedAt && now - startedAt < MIN_FILL_MS)) {
    return json({ ok: true, leadId }, 200);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, now)) {
    return json(
      { ok: false, error: "Too many messages from this connection. Please wait a few minutes and try again." },
      429,
    );
  }

  const fields = normaliseFields(body.fields);
  const fieldErrors = validateLeadFields(formType, fields);
  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }

  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? (body.attribution as Record<string, unknown>)
      : {};
  const receivedAt = new Date(now);

  const lead: Lead = {
    leadId,
    receivedAt: receivedAt.toISOString(),
    receivedAtPakistan: pakistanTime(receivedAt),
    formType,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    business: fields.business,
    industry: fields.industry,
    website: fields.website,
    subject: fields.subject,
    message: formType === "request-automation" ? fields.automate : fields.message,
    tools: fields.tools,
    volume: fields.volume,
    budget: fields.budget,
    details: fields.details,
    pageUrl: clean(attribution.pageUrl, 500),
    landingPage: clean(attribution.landingPage, 500),
    referrer: clean(attribution.referrer, 500),
    utmSource: clean(attribution.utmSource, 200),
    utmMedium: clean(attribution.utmMedium, 200),
    utmCampaign: clean(attribution.utmCampaign, 200),
    utmTerm: clean(attribution.utmTerm, 200),
    utmContent: clean(attribution.utmContent, 200),
    userAgent: clean(request.headers.get("user-agent"), 300),
  };

  const result = await deliverLead(lead);
  if (!result.delivered) {
    return json(
      {
        ok: false,
        error: "Your message could not be sent because of a problem on our side.",
      },
      502,
    );
  }
  return json({ ok: true, leadId }, 200);
}
