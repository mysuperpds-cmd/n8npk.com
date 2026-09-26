"use client";

import type { LeadAttribution, LeadFormType, LeadResponse } from "@/lib/leads/lead";

const FIRST_TOUCH_KEY = "n8npk:first-touch";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type FirstTouch = Omit<LeadAttribution, "pageUrl">;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readFirstTouch(): FirstTouch | null {
  try {
    const stored = window.sessionStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? (JSON.parse(stored) as FirstTouch) : null;
  } catch {
    return null;
  }
}

function currentTouch(): FirstTouch {
  const params = new URLSearchParams(window.location.search);
  const [utmSource, utmMedium, utmCampaign, utmTerm, utmContent] = UTM_KEYS.map(
    (key) => params.get(key) ?? "",
  );
  return {
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  };
}

// Called on every page view so the landing page and ad source survive
// until the visitor reaches a form.
export function rememberFirstTouch() {
  if (readFirstTouch()) return;
  try {
    window.sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(currentTouch()));
  } catch {
    // Storage blocked: attribution falls back to the form page itself.
  }
}

export async function submitLead(
  formType: LeadFormType,
  form: HTMLFormElement,
  startedAt: number,
): Promise<LeadResponse> {
  const data = new FormData(form);
  const fields: Record<string, string> = {};
  data.forEach((value, key) => {
    if (typeof value === "string" && key !== "company_website") fields[key] = value;
  });

  const attribution: LeadAttribution = {
    ...(readFirstTouch() ?? currentTouch()),
    pageUrl: window.location.href,
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType,
        fields,
        attribution,
        honeypot: String(data.get("company_website") ?? ""),
        startedAt,
      }),
    });
    const body = (await res.json().catch(() => null)) as LeadResponse | null;
    if (body) return body;
    return { ok: false, error: "Your message could not be sent because of a problem on our side." };
  } catch {
    return {
      ok: false,
      error: "Your message could not be sent. Please check your internet connection and try again.",
    };
  }
}

export function trackLead(formType: LeadFormType) {
  window.gtag?.("event", "generate_lead", { form_type: formType });
}
