// End-to-end test of the lead forms' delivery path, with fake n8n and email servers.
// Usage: npm run build && node scripts/test-lead-capture.mjs
import { spawn } from "node:child_process";
import http from "node:http";
import assert from "node:assert/strict";

const SITE_PORT = 4800;
const N8N_PORT = 4801;
const EMAIL_PORT = 4802;
const SECRET = "test-secret";

const state = { n8nMode: "ok", emailMode: "ok", n8nCalls: [], emailCalls: [] };

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

const n8n = http.createServer(async (req, res) => {
  const body = await readBody(req);
  if (req.headers["x-webhook-secret"] !== SECRET) return res.writeHead(403).end();
  state.n8nCalls.push(JSON.parse(body));
  if (state.n8nMode === "hang") return; // never answers
  if (state.n8nMode === "fail") return res.writeHead(500).end("sheet error");
  res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
});

const email = http.createServer(async (req, res) => {
  const body = await readBody(req);
  state.emailCalls.push(JSON.parse(body));
  if (state.emailMode === "fail") return res.writeHead(500).end();
  res.writeHead(200).end('{"id":"test"}');
});

await new Promise((r) => n8n.listen(N8N_PORT, r));
await new Promise((r) => email.listen(EMAIL_PORT, r));

let serverLog = "";
const site = spawn("npx", ["next", "start", "-p", String(SITE_PORT)], {
  env: {
    ...process.env,
    N8N_LEAD_WEBHOOK_URL: `http://127.0.0.1:${N8N_PORT}/webhook/n8npk-lead`,
    N8N_WEBHOOK_SECRET: SECRET,
    RESEND_API_KEY: "test-key",
    RESEND_API_URL: `http://127.0.0.1:${EMAIL_PORT}/emails`,
    LEAD_BACKUP_EMAIL_TO: "owner@example.com",
    LEAD_BACKUP_EMAIL_FROM: "Leads <leads@example.com>",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
site.stdout.on("data", (d) => (serverLog += d));
site.stderr.on("data", (d) => (serverLog += d));

async function waitForSite() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`http://127.0.0.1:${SITE_PORT}/`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("site did not start");
}

let ipCounter = 1;
function submit(payload, ip = `10.0.0.${ipCounter++}`) {
  return fetch(`http://127.0.0.1:${SITE_PORT}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify(payload),
  }).then(async (res) => ({ status: res.status, body: await res.json() }));
}

const validRequest = () => ({
  formType: "request-automation",
  startedAt: Date.now() - 60_000,
  honeypot: "",
  fields: {
    name: "Test Person",
    email: "test@example.com",
    phone: "0300 0000000",
    business: "Test Store",
    industry: "Select an industry",
    automate: "Send WhatsApp order confirmations",
    tools: "WooCommerce",
    volume: "200 orders",
    budget: "Not sure yet",
    details: "",
  },
  attribution: { pageUrl: "https://n8npk.com/request-automation", landingPage: "/services?utm_source=google", utmSource: "google", referrer: "https://www.google.com/" },
});

function reset(n8nMode, emailMode = "ok") {
  Object.assign(state, { n8nMode, emailMode, n8nCalls: [], emailCalls: [] });
}

const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push(`PASS  ${name}`);
  } catch (error) {
    results.push(`FAIL  ${name}\n      ${error.message}`);
  }
}

try {
  await waitForSite();

  await test("normal enquiry reaches n8n with all fields, no backup email", async () => {
    reset("ok");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
    assert.match(res.body.leadId, /^N8-\d{8}-[0-9a-f]{8}$/);
    assert.equal(state.n8nCalls.length, 1);
    const lead = state.n8nCalls[0];
    assert.equal(lead.leadId, res.body.leadId);
    assert.equal(lead.name, "Test Person");
    assert.equal(lead.phone, "0300 0000000");
    assert.equal(lead.message, "Send WhatsApp order confirmations");
    assert.equal(lead.industry, "", "placeholder choice is dropped");
    assert.equal(lead.utmSource, "google");
    assert.equal(lead.pageUrl, "https://n8npk.com/request-automation");
    assert.ok(lead.receivedAtPakistan);
    assert.equal(state.emailCalls.length, 0);
  });

  await test("contact form enquiry is delivered", async () => {
    reset("ok");
    const res = await submit({
      formType: "contact",
      startedAt: Date.now() - 60_000,
      fields: { name: "A", email: "a@example.com", subject: "Hi", message: "Question" },
      attribution: {},
    });
    assert.equal(res.status, 200);
    assert.equal(state.n8nCalls[0].message, "Question");
    assert.equal(state.n8nCalls[0].subject, "Hi");
  });

  await test("n8n/Sheet error: retried once, then backup email carries the full lead", async () => {
    reset("fail");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    assert.equal(state.n8nCalls.length, 2);
    assert.equal(state.emailCalls.length, 1);
    assert.match(state.emailCalls[0].text, /Send WhatsApp order confirmations/);
    assert.equal(state.emailCalls[0].reply_to, "test@example.com");
  });

  await test("n8n not answering: times out, then backup email", async () => {
    reset("hang");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    assert.equal(state.emailCalls.length, 1);
  });

  await test("everything down: visitor gets an error and the lead is in the server log", async () => {
    reset("fail", "fail");
    const res = await submit(validRequest());
    assert.equal(res.status, 502);
    assert.equal(res.body.ok, false);
    await new Promise((r) => setTimeout(r, 200));
    assert.match(serverLog, /LEAD_DELIVERY_FAILED.*Send WhatsApp order confirmations/);
  });

  await test("bot filling the hidden field is silently ignored", async () => {
    reset("ok");
    const res = await submit({ ...validRequest(), honeypot: "http://spam.example" });
    assert.equal(res.status, 200);
    assert.equal(state.n8nCalls.length, 0);
  });

  await test("form submitted too fast (bot) is silently ignored", async () => {
    reset("ok");
    const res = await submit({ ...validRequest(), startedAt: Date.now() });
    assert.equal(res.status, 200);
    assert.equal(state.n8nCalls.length, 0);
  });

  await test("missing email is rejected with a field error", async () => {
    reset("ok");
    const payload = validRequest();
    payload.fields.email = "";
    const res = await submit(payload);
    assert.equal(res.status, 422);
    assert.ok(res.body.fieldErrors.email);
    assert.equal(state.n8nCalls.length, 0);
  });

  await test("more than 5 enquiries in 10 minutes from one connection is limited", async () => {
    reset("ok");
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await submit(validRequest(), "10.9.9.9")).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  });
} finally {
  site.kill();
  n8n.close();
  email.close();
}

console.log(results.join("\n"));
process.exit(results.some((line) => line.startsWith("FAIL")) ? 1 : 0);
