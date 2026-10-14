import type { Metadata } from "next";
import Script from "next/script";
import AiEnginePage from "@/components/ai-engine/AiEnginePage";
import { AI_FAQS } from "@/data/aiEnginePageData";
import "@/components/ai-engine/ai-engine.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";
const META_PIXEL_ID = "1286548570123704";

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
      {/* Meta pixel fires only on the live domain, so local and staging visits do not count as ad traffic. */}
      <Script id="meta-pixel-ai-engine" strategy="afterInteractive">
        {`if (["dglide.com", "www.dglide.com"].indexOf(location.hostname) !== -1) {
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
}`}
      </Script>
      <AiEnginePage />
    </>
  );
}
