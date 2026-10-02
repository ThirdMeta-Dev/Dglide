import type { Metadata } from "next";
import { Sora, Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const socialPreviewImage = {
  url: '/social/dglide-homepage-hero.png',
  width: 1754,
  height: 1400,
  alt: 'DGlide configurable operations platform homepage hero',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'),
  title: {
    default: 'DGlide — Operations Platform for Field Service & ITSM',
    template: '%s | DGlide',
  },
  description: 'DGlide is a configurable operations platform for ITSM, field service management, and workflow automation. Purpose-built for mid-market teams.',
  openGraph: {
    type: 'website',
    siteName: 'DGlide',
    locale: 'en_US',
    images: [socialPreviewImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dglide',
    images: [socialPreviewImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T23WQK9J');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#F3F3F3]">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T23WQK9J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-T5K6SG2E0Z"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T5K6SG2E0Z');
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xp8x1ifkri");
        `}
      </Script>
    </html>
  );
}
