// Shared by the browser forms and the /api/lead route handler.

export type LeadFormType = "request-automation" | "contact";

export type LeadAttribution = {
  pageUrl: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

export type LeadSubmission = {
  formType: LeadFormType;
  fields: Record<string, string>;
  attribution: Partial<LeadAttribution>;
  // Spam signals: a hidden field bots fill in, and when the form was first shown.
  honeypot?: string;
  startedAt?: number;
};

export type Lead = {
  leadId: string;
  receivedAt: string;
  receivedAtPakistan: string;
  formType: LeadFormType;
  name: string;
  email: string;
  phone: string;
  business: string;
  industry: string;
  website: string;
  subject: string;
  message: string;
  tools: string;
  volume: string;
  budget: string;
  details: string;
  pageUrl: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  userAgent: string;
};

export type LeadResponse =
  | { ok: true; leadId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const FIELD_LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  business: 200,
  industry: 120,
  website: 300,
  subject: 200,
  message: 5000,
  automate: 5000,
  tools: 500,
  volume: 200,
  budget: 100,
  details: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Select placeholders that mean "nothing chosen".
const EMPTY_CHOICES = new Set(["Select an industry"]);

export function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").trim().slice(0, max);
}

export function validateLeadFields(
  formType: LeadFormType,
  fields: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const messageField = formType === "request-automation" ? "automate" : "message";

  if (!fields.name) errors.name = "Please enter your name.";
  if (!fields.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (!fields[messageField]) {
    errors[messageField] =
      formType === "request-automation"
        ? "Please tell us what you'd like to automate."
        : "Please enter a message.";
  }
  return errors;
}

export function normaliseFields(raw: unknown): Record<string, string> {
  const source = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(FIELD_LIMITS)) {
    const value = clean(source[key], max);
    fields[key] = EMPTY_CHOICES.has(value) ? "" : value;
  }
  return fields;
}
