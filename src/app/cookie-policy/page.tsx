import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How N8NPK uses cookies and similar technologies on this website.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="September 2026"
      intro={`This Cookie Policy explains how ${siteConfig.domain} uses cookies and similar technologies.`}
      sections={[
        {
          heading: "What cookies we use",
          body: [
            "This site may use essential cookies required for basic functionality, along with optional analytics cookies (such as Google Analytics) to help us understand how visitors use the site, where enabled.",
            "We do not currently use advertising or cross-site tracking cookies.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can control or delete cookies through your browser settings. Disabling cookies may affect some non-essential features of the site but will not prevent you from browsing or submitting a contact form.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about this policy can be sent to ${siteConfig.contact.email}.`],
        },
      ]}
    />
  );
}
