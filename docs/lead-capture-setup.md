# Lead capture setup (N8NPK.com)

How enquiries from the **Request an Automation** and **Contact** forms reach you:

```
Website form → /api/lead (on the website) → email to your inbox (Resend)       ← step 1, goes live first
                                     └─ optional, later: copy to n8n → Google Sheet → WhatsApp alert
                                     └─ if nothing worked → visitor sees an error and keeps their text;
                                        the full enquiry is written to the website's server log
```

The website tells the visitor "received" only after the email was accepted by Resend (or, once the add-on is set up, after n8n saved the row). It never shows a fake success.

No password or key goes into the code. Each secret lives in **Hostinger environment variables** (and, for the add-on, in **n8n credentials**).

---

## Part 1: Email notifications (do this now)

### 1.1 Create the Resend account

1. Sign up at <https://resend.com> with the email address where you want to receive enquiries. The free plan is enough.
2. **API Keys → Create API key** → permission **Sending access**. Copy it straight into Hostinger in step 1.3. Don't paste it anywhere else.

### 1.2 Choose the sender address

- **Quick start (works immediately):** use `N8NPK Leads <onboarding@resend.dev>`. Resend only lets this address send to the email you signed up with, which is exactly what lead alerts need.
- **Recommended before relying on it:** verify the domain so alerts come from `leads@n8npk.com` and are less likely to land in spam. In Resend: **Domains → Add domain** → `n8npk.com`. Add the DNS records it shows wherever n8npk.com's DNS is managed (Hostinger → Domains → n8npk.com → DNS), then click **Verify**. The existing `google-site-verification` record must stay.

### 1.3 Hostinger environment variables

In **Hostinger → Websites → n8npk.com → Environment variables**, add:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | the key from step 1.1 |
| `LEAD_EMAIL_TO` | the inbox that receives enquiries (the Resend sign-up email for the quick start) |
| `LEAD_EMAIL_FROM` | `N8NPK Leads <onboarding@resend.dev>`, or `N8NPK Leads <leads@n8npk.com>` once verified |

Then click **Redeploy** so the app picks them up.

### 1.4 Test it live

1. Submit the Contact form on n8npk.com with your own details. You should see "received" and get an email within a minute. Pressing **Reply** answers the visitor directly.
2. Submit the Request an Automation form too, and check every field appears in the email.
3. If the site shows an error instead, check **Hostinger → Runtime logs** for `LEAD_DELIVERY_FAILED`. The full enquiry is in that log line.

---

## Part 2 (later, optional): Google Sheet and WhatsApp alert through n8n

Email keeps working on its own. When you're ready, this adds a copy of every lead to a Google Sheet and a WhatsApp alert. If n8n is down, emails still go out and visitors are not affected.

### 2.1 Google Sheet

1. Create a new Google Sheet named `N8NPK Leads`, and name its first tab `Leads`.
2. Paste this into row 1 as the header row. Each word goes in its own column, from A to Y:

```
leadId	receivedAt	receivedAtPakistan	formType	name	email	phone	business	industry	website	subject	message	tools	volume	budget	details	pageUrl	landingPage	referrer	utmSource	utmMedium	utmCampaign	utmTerm	utmContent	userAgent
```

### 2.2 WhatsApp alert (Meta WhatsApp Cloud API)

1. Go to <https://developers.facebook.com> → **My Apps** → **Create App** → choose **Business**, then add the **WhatsApp** product.
2. Open **WhatsApp → API Setup**. Note the **Phone number ID** of the sending number. Meta's free test number is fine for alerts that only go to you.
3. Under **To**, add your personal WhatsApp number and verify it with the code Meta sends.
4. Open **WhatsApp Manager → Message templates → Create template**:
   - Category: **Utility** · Name: `new_lead_alert` · Language: **English**
   - Body: `New {{1}} enquiry from {{2}}. Phone: {{3}}. Email: {{4}}. Message: {{5}}. Lead ID: {{6}}`
   - Submit it and wait for approval.
5. Create a **permanent access token**: Business Settings → **System users** → add a user → **Generate token** with `whatsapp_business_messaging` permission. Keep this page open for step 2.3.4. Don't paste the token anywhere else.

### 2.3 n8n

1. In n8n: **Workflows → Import from File** → choose `automation/n8n/n8npk-lead-capture.json` from this repo.
2. **Website lead webhook** node → Credential → **Create new** (Header Auth):
   - Name: `X-Webhook-Secret`
   - Value: a long random password you make up (e.g. from a password manager). You'll use the same value in Hostinger.
3. **Save to Google Sheet** node → Credential → **Sign in with Google**, then pick `N8NPK Leads` and the `Leads` tab from the dropdowns.
4. **WhatsApp alert** node:
   - Credential → **Create new** (Bearer Auth) → paste the Meta permanent token **into n8n** only.
   - In the URL, replace `REPLACE_WITH_PHONE_NUMBER_ID` with the Phone number ID from step 2.2.2.
   - In the JSON body, replace `REPLACE_WITH_YOUR_WHATSAPP_NUMBER_E164_NO_PLUS` with your number in international form without `+`, e.g. `923001234567`.
5. Click **Save**, then switch the workflow to **Active**.
6. Open the webhook node and copy the **Production URL**. You'll need it in the next step.

### 2.4 Hostinger environment variables (add-on)

Add these next to the email variables, then **Redeploy**:

| Name | Value |
| --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | the n8n Production URL from step 2.3.6 |
| `N8N_WEBHOOK_SECRET` | the same secret as step 2.3.2 |

### 2.5 Test the add-on

Submit the Contact form again. You should get the email, a new row in the Sheet and a WhatsApp alert. Delete the test rows afterwards.

## For developers

- Code: `src/app/api/lead/route.ts`, `src/lib/leads/`, `src/components/forms/`.
- Automated test with fake email and n8n servers: `npm run build && npm run test:leads`.
