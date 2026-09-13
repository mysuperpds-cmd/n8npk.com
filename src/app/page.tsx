import type { Metadata } from "next";
import { AiPlusN8n } from "@/components/sections/ai-plus-n8n";
import { CtaSection } from "@/components/sections/cta-section";
import { FeaturedWorkflows } from "@/components/sections/featured-workflows";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IndustriesPreview } from "@/components/sections/industries-preview";
import { ValueProps } from "@/components/sections/value-props";
import { WhatIsN8n } from "@/components/sections/what-is-n8n";
import { WhatWeAutomate } from "@/components/sections/what-we-automate";
import { WhyN8npk } from "@/components/sections/why-n8npk";

export const metadata: Metadata = {
  title: "n8n Automation & AI Workflow Solutions in Pakistan",
  description:
    "N8NPK builds custom n8n automation and AI-powered workflows for businesses in Pakistan and beyond — connecting your apps, cutting repetitive work, and helping teams respond faster.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <WhatIsN8n />
      <WhatWeAutomate />
      <FeaturedWorkflows />
      <AiPlusN8n />
      <IndustriesPreview />
      <HowItWorks />
      <WhyN8npk />
      <CtaSection />
    </>
  );
}
