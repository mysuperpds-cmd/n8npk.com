import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern use of the N8NPK website and engagement of N8NPK's automation services.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 2026"
      intro={`These terms govern your use of ${siteConfig.domain} and, where applicable, any services you engage ${siteConfig.legalName} to perform. By using this website, you agree to these terms.`}
      sections={[
        {
          heading: "Independent service provider",
          body: [siteConfig.affiliationNote],
        },
        {
          heading: "Use of this website",
          body: [
            "Content on this website is provided for general informational purposes. Workflow examples, industry use cases and case studies are illustrative and intended to show our typical approach, not guarantees of specific results for any business.",
          ],
        },
        {
          heading: "Project engagements",
          body: [
            "Specific scope, pricing, timelines and deliverables for any automation project are agreed separately in writing before work begins. Nothing on this website constitutes a binding offer or contract.",
          ],
        },
        {
          heading: "Third-party platforms",
          body: [
            "Our workflows connect to third-party platforms (such as WhatsApp, WooCommerce, Shopify, CRMs and AI providers) that have their own terms of service. Clients are responsible for maintaining valid accounts and compliance with those platforms' policies.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            `${siteConfig.legalName} will take reasonable care in designing and building automation workflows, but is not liable for indirect or consequential losses arising from the use of automated systems, including third-party platform outages or policy changes outside our control.`,
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can be sent to ${siteConfig.contact.email}.`],
        },
      ]}
    />
  );
}
