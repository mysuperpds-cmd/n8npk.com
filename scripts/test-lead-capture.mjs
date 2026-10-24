// End-to-end test of the lead forms' delivery path (email first, optional n8n), with fake servers.
// Usage: npm run build && node scripts/test-lead-capture.mjs
import { spawn } from "node:child_process";
import http from "node:http";
import assert from "node:assert/strict";

const SITE_PORT = 4800;
const EMAIL_ONLY_PORT = 4803;
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

// Fake Resend API. Modes: ok, fail (always 500), fail-once (500 then ok), reject (422 setup error).
const email = http.createServer(async (req, res) => {
  const body = await readBody(req);
  state.emailCalls.push({ ...JSON.parse(body), headers: req.headers });
  if (state.emailMode === "fail") return res.writeHead(500).end();
  if (state.emailMode === "reject") return res.writeHead(422).end('{"message":"invalid from"}');
  if (state.emailMode === "fail-once" && state.emailCalls.length === 1) return res.writeHead(500).end();
  res.writeHead(200).end('{"id":"test"}');
});

await new Promise((r) => n8n.listen(N8N_PORT, r));
await new Promise((r) => email.listen(EMAIL_PORT, r));

const emailEnv = {
  RESEND_API_KEY: "test-key",
  RESEND_API_URL: `http://127.0.0.1:${EMAIL_PORT}/emails`,
  LEAD_EMAIL_TO: "owner@example.com",
  LEAD_EMAIL_FROM: "N8NPK Leads <leads@example.com>",
};

let serverLog = "";
function startSite(port, extraEnv) {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    env: { ...process.env, ...emailEnv, ...extraEnv },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (d) => (serverLog += d));
  child.stderr.on("data", (d) => (serverLog += d));
  return child;
}

// Full setup: email plus the optional n8n copy.
const site = startSite(SITE_PORT, {
  N8N_LEAD_WEBHOOK_URL: `http://127.0.0.1:${N8N_PORT}/webhook/n8npk-lead`,
  N8N_WEBHOOK_SECRET: SECRET,
});
// Email-only setup: what goes live first.
const emailOnlySite = startSite(EMAIL_ONLY_PORT, { N8N_LEAD_WEBHOOK_URL: "", N8N_WEBHOOK_SECRET: "" });

async function waitForSite(port) {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`http://127.0.0.1:${port}/`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("site did not start");
}

let ipCounter = 1;
function submit(payload, ip = `10.0.0.${ipCounter++}`, port = SITE_PORT) {
  return fetch(`http://127.0.0.1:${port}/api/lead`, {
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
  await waitForSite(SITE_PORT);
  await waitForSite(EMAIL_ONLY_PORT);

  await test("email-only setup: enquiry is emailed with every field and the visitor sees success", async () => {
    reset("ok");
    const res = await submit(validRequest(), undefined, EMAIL_ONLY_PORT);
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
    assert.match(res.body.leadId, /^N8-\d{8}-[0-9a-f]{8}$/);
    assert.equal(state.n8nCalls.length, 0, "n8n is not called when not configured");
    assert.equal(state.emailCalls.length, 1);
    const mail = state.emailCalls[0];
    assert.deepEqual(mail.to, ["owner@example.com"]);
    assert.equal(mail.from, "N8NPK Leads <leads@example.com>");
    assert.equal(mail.reply_to, "test@example.com");
    assert.equal(mail.headers.authorization, "Bearer test-key");
    assert.equal(mail.headers["idempotency-key"], res.body.leadId);
    assert.match(mail.subject, /Request an Automation enquiry from Test Person/);
    for (const text of ["Test Person", "test@example.com", "0300 0000000", "Test Store", "Send WhatsApp order confirmations", "WooCommerce", "200 orders", "Not sure yet", "https://n8npk.com/request-automation", "google", res.body.leadId]) {
      assert.ok(mail.text.includes(text), `email contains ${text}`);
    }
    assert.ok(!mail.text.includes("Select an industry"), "placeholder choice is dropped");
  });

  await test("email-only setup: email provider down gives an honest error and logs the lead", async () => {
    reset("ok", "fail");
    const res = await submit(validRequest(), undefined, EMAIL_ONLY_PORT);
    assert.equal(res.status, 502);
    assert.equal(res.body.ok, false);
    assert.equal(state.emailCalls.length, 2, "retried once");
    await new Promise((r) => setTimeout(r, 200));
    assert.match(serverLog, /LEAD_DELIVERY_FAILED.*Send WhatsApp order confirmations/);
  });

  await test("contact form enquiry is emailed", async () => {
    reset("ok");
    const res = await submit({
      formType: "contact",
      startedAt: Date.now() - 60_000,
      fields: { name: "A", email: "a@example.com", subject: "Hi", message: "Question" },
      attribution: {},
    });
    assert.equal(res.status, 200);
    assert.match(state.emailCalls[0].subject, /Contact enquiry from A/);
    assert.match(state.emailCalls[0].text, /Subject: Hi/);
    assert.match(state.emailCalls[0].text, /Message: Question/);
  });

  await test("a name with line breaks cannot break the email subject", async () => {
    reset("ok");
    const payload = validRequest();
    payload.fields.name = "Eve\r\nBcc: victim@example.com";
    const res = await submit(payload);
    assert.equal(res.status, 200);
    assert.ok(!/[\r\n]/.test(state.emailCalls[0].subject));
  });

  await test("temporary email error: retried once with the same idempotency key", async () => {
    reset("ok", "fail-once");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    assert.equal(state.emailCalls.length, 2);
    assert.equal(state.emailCalls[0].headers["idempotency-key"], state.emailCalls[1].headers["idempotency-key"]);
  });

  await test("email setup error (4xx) is not retried", async () => {
    reset("fail", "reject");
    const res = await submit(validRequest());
    assert.equal(res.status, 502);
    assert.equal(state.emailCalls.length, 1);
  });

  await test("optional n8n add-on: receives a copy of the full lead", async () => {
    reset("ok");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    assert.equal(state.emailCalls.length, 1);
    assert.equal(state.n8nCalls.length, 1);
    assert.equal(state.n8nCalls[0].leadId, res.body.leadId);
    assert.equal(state.n8nCalls[0].utmSource, "google");
  });

  await test("n8n add-on failing or hanging does not affect the visitor when email works", async () => {
    reset("fail");
    assert.equal((await submit(validRequest())).status, 200);
    reset("hang");
    assert.equal((await submit(validRequest())).status, 200);
    assert.equal(state.emailCalls.length, 1);
  });

  await test("email down but n8n saved the lead: visitor sees success, problem is logged", async () => {
    reset("ok", "fail");
    const res = await submit(validRequest());
    assert.equal(res.status, 200);
    await new Promise((r) => setTimeout(r, 200));
    assert.match(serverLog, /LEAD_EMAIL_FAILED_SAVED_IN_N8N/);
  });

  await test("everything down: visitor gets an error and the lead is in the server log", async () => {
    reset("fail", "fail");
    const res = await submit(validRequest());
    assert.equal(res.status, 502);
    assert.equal(res.body.ok, false);
  });

  await test("bot filling the hidden field is silently ignored", async () => {
    reset("ok");
    const res = await submit({ ...validRequest(), honeypot: "http://spam.example" });
    assert.equal(res.status, 200);
    assert.equal(state.emailCalls.length, 0);
  });

  await test("form submitted too fast (bot) is silently ignored", async () => {
    reset("ok");
    const res = await submit({ ...validRequest(), startedAt: Date.now() });
    assert.equal(res.status, 200);
    assert.equal(state.emailCalls.length, 0);
  });

  await test("missing email is rejected with a field error", async () => {
    reset("ok");
    const payload = validRequest();
    payload.fields.email = "";
    const res = await submit(payload);
    assert.equal(res.status, 422);
    assert.ok(res.body.fieldErrors.email);
    assert.equal(state.emailCalls.length, 0);
  });

  await test("more than 5 enquiries in 10 minutes from one connection is limited", async () => {
    reset("ok");
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await submit(validRequest(), "10.9.9.9")).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  });
} finally {
  site.kill();
  emailOnlySite.kill();
  n8n.close();
  email.close();
}

console.log(results.join("\n"));
process.exit(results.some((line) => line.startsWith("FAIL")) ? 1 : 0);
