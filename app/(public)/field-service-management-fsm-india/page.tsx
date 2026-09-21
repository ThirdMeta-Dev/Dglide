import type { Metadata } from "next";
import Script from "next/script";
import FSMPage from "../field-service-management-fsm/page";

// Ads-only landing page: identical to /field-service-management-fsm but must
// never be indexed — no canonical, excluded from sitemap.ts.
export const metadata: Metadata = {
  title: { absolute: "Field Service Management Software for India | DGlide" },
  description:
    "Stop coordinating field teams over WhatsApp and Excel. DGlide gives real-time visibility on visits, work orders, and scheduling.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function FSMIndiaAdsPage() {
  return (
    <>
      <Script id="meta-pixel-fsm-india" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1286548570123704');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1286548570123704&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <FSMPage adsLanding />
    </>
  );
}
