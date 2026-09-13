import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How N8NPK collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro={`This Privacy Policy explains how ${siteConfig.legalName} ("we", "us") handles information collected through ${siteConfig.domain}. We collect only what's needed to respond to your inquiries and improve the site.`}
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you submit a contact form or automation request, we collect the details you provide — such as your name, email, phone/WhatsApp number, business name and a description of what you'd like to automate.",
            "We may also collect standard technical information such as browser type and pages visited, typically through analytics tools, to understand how the site is used.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use the information you submit to respond to your inquiry, prepare a proposal, and communicate with you about a potential or ongoing project.",
            "We do not sell your information to third parties.",
          ],
        },
        {
          heading: "Analytics and cookies",
          body: [
            "We may use analytics tools such as Google Analytics or Google Tag Manager to understand site usage. See our Cookie Policy for more detail on the cookies used.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "We retain inquiry information for as long as reasonably needed to respond to you or deliver a project, and take reasonable measures to protect it from unauthorized access.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            `If you'd like your information updated or removed, contact us at ${siteConfig.contact.email} and we'll act on your request.`,
          ],
        },
        {
          heading: "Changes to this policy",
          body: ["We may update this policy from time to time. Material changes will be reflected on this page with an updated date."],
        },
      ]}
    />
  );
}
