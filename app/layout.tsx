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
      <body className="min-h-full flex flex-col bg-[#F3F3F3]">
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
    </html>
  );
}
