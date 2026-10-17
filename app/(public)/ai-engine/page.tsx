import type { Metadata } from "next";
import AiEnginePage from "@/components/ai-engine/AiEnginePage";
import { AI_FAQS } from "@/data/aiEnginePageData";
import "@/components/ai-engine/ai-engine.css";

// The Meta pixel loads site-wide through Google Tag Manager, so this page adds no pixel of its own.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";

export const metadata: Metadata = {
  title: "AI Engine: Turn a Diagram into a Working App",
  description:
    "Describe or draw your process and DGlide's AI engine builds a working no-code app, validated by a second AI and shipped safely to production.",
  alternates: { canonical: "/ai-engine" },
  openGraph: {
    title: "AI Engine: Turn a Diagram into a Working App | DGlide",
    description:
      "Describe or draw your process and DGlide's AI engine builds a working no-code app, validated by a second AI and shipped safely to production.",
    url: "/ai-engine",
    images: [{ url: "/ai-engine/og-ai-engine.png", width: 1200, height: 630, alt: "A flow diagram turned into a working DGlide app" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "DGlide AI Engine",
      url: `${SITE_URL}/ai-engine`,
      description:
        "Describe or draw your process and DGlide's AI engine builds a working no-code app, validated by a second AI and shipped safely to production.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "AI Engine", item: `${SITE_URL}/ai-engine` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: AI_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function AiEngineRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AiEnginePage />
    </>
  );
}
