# Lead capture setup (N8NPK.com)

How enquiries from the **Request an Automation** and **Contact** forms reach you:

```
Website form → /api/lead (on the website) → n8n webhook → Google Sheet → WhatsApp alert to you
                                     └─ if n8n or the Sheet fails → backup email to you (Resend)
                                     └─ if that fails too → visitor sees an error and keeps their text;
                                        the full enquiry is written to the website's server log
```

The website only tells the visitor "received" after n8n confirms the row was saved in the Sheet, or after the backup email was sent.

No password or key goes into the code. Each secret lives in one of two places: **n8n credentials** or **Hostinger environment variables**.

---

## 1. Google Sheet

1. Create a new Google Sheet named `N8NPK Leads`, and name its first tab `Leads`.
2. Paste this into row 1 as the header row. Each word goes in its own column, from A to Y:

```
leadId	receivedAt	receivedAtPakistan	formType	name	email	phone	business	industry	website	subject	message	tools	volume	budget	details	pageUrl	landingPage	referrer	utmSource	utmMedium	utmCampaign	utmTerm	utmContent	userAgent
```

## 2. WhatsApp alert (Meta WhatsApp Cloud API)

1. Go to <https://developers.facebook.com> → **My Apps** → **Create App** → choose **Business**, then add the **WhatsApp** product.
2. Open **WhatsApp → API Setup**. Note the **Phone number ID** of the sending number. Meta's free test number is fine for alerts that only go to you.
3. Under **To**, add your personal WhatsApp number and verify it with the code Meta sends.
4. Open **WhatsApp Manager → Message templates → Create template**:
   - Category: **Utility** · Name: `new_lead_alert` · Language: **English**
   - Body: `New {{1}} enquiry from {{2}}. Phone: {{3}}. Email: {{4}}. Message: {{5}}. Lead ID: {{6}}`
   - Submit it and wait for approval.
5. Create a **permanent access token**: Business Settings → **System users** → add a user → **Generate token** with `whatsapp_business_messaging` permission. Keep this page open for step 3.4. Don't paste the token anywhere else.

## 3. n8n

1. In n8n: **Workflows → Import from File** → choose `automation/n8n/n8npk-lead-capture.json` from this repo.
2. **Website lead webhook** node → Credential → **Create new** (Header Auth):
   - Name: `X-Webhook-Secret`
   - Value: a long random password you make up (e.g. from a password manager). You'll use the same value in Hostinger.
3. **Save to Google Sheet** node → Credential → **Sign in with Google**, then pick `N8NPK Leads` and the `Leads` tab from the dropdowns.
4. **WhatsApp alert** node:
   - Credential → **Create new** (Bearer Auth) → paste the Meta permanent token **into n8n** only.
   - In the URL, replace `REPLACE_WITH_PHONE_NUMBER_ID` with the Phone number ID from step 2.2.
   - In the JSON body, replace `REPLACE_WITH_YOUR_WHATSAPP_NUMBER_E164_NO_PLUS` with your number in international form without `+`, e.g. `923001234567`.
5. Click **Save**, then switch the workflow to **Active**.
6. Open the webhook node and copy the **Production URL**. You'll need it in the next step.

## 4. Backup email (Resend)

1. Sign up at <https://resend.com> (the free plan is enough).
2. **Domains → Add domain** → `n8npk.com`. Resend shows 3–4 DNS records. Add them in **Hostinger → Domains → n8npk.com → DNS / Nameservers**, then click **Verify** in Resend.
3. **API Keys → Create API key** with "Sending access". Copy it straight into Hostinger in the next step.

## 5. Hostinger environment variables

In **Hostinger → Websites → n8npk.com → Node.js app → Environment variables**, add:

| Name | Value |
| --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | the n8n Production URL from step 3.6 |
| `N8N_WEBHOOK_SECRET` | the same secret as step 3.2 |
| `RESEND_API_KEY` | the Resend key from step 4.3 |
| `LEAD_BACKUP_EMAIL_TO` | the inbox that should get backup copies |
| `LEAD_BACKUP_EMAIL_FROM` | `N8NPK Leads <leads@n8npk.com>` |

Then redeploy or restart the app so it picks them up.

## 6. Test it live

1. Submit the Contact form on n8npk.com with your own details. You should see "received", a new row in the Sheet and a WhatsApp alert.
2. **Test the safety net:** in n8n, deactivate the workflow and submit again. You should see "received" on the site and get a `[Backup]` email. Reactivate the workflow afterwards.
3. Delete the test rows from the Sheet.

## For developers

- Code: `src/app/api/lead/route.ts`, `src/lib/leads/`, `src/components/forms/`.
- Automated test with fake n8n and email servers: `npm run build && npm run test:leads`.
