import Link from "next/link";
import Image from "next/image";

export type FooterSettings = {
  newsletter_heading?:      string;
  newsletter_placeholder?:  string;
  newsletter_button_label?: string;
  tagline?:                 string;
  phone?:                   string;
  email?:                   string;
  copyright?:               string;
  privacy_label?:           string;
  privacy_href?:            string;
  terms_label?:             string;
  terms_href?:              string;
  social?: {
    linkedin?:  string;
    twitter?:   string;
    whatsapp?:  string;
    instagram?: string;
  };
};

export type FooterLink = {
  id:             string;
  column_index:   number;
  column_heading: string | null;
  label:          string;
  href:           string;
  order_index:    number;
};

const DEFAULT_COLS = [
  {
    heading: "Platform",
    links: [
      { label: "Overview",                      href: "#" },
      { label: "Living Service Model (LSM)",    href: "#" },
      { label: "Architecture & Capabilities",   href: "#" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Field Service Management",   href: "#" },
      { label: "Process Management",         href: "#" },
      { label: "Service / ITSM Workflows",   href: "#" },
      { label: "Field Sales Execution",      href: "#" },
      { label: "CRM (Support Layer)",        href: "#" },
    ],
  },
  {
    heading: "Use Cases",
    links: [
      { label: "Field Service Businesses",          href: "#" },
      { label: "Manufacturing & Process Businesses", href: "#" },
      { label: "Growing SMB Operations",            href: "#" },
      { label: "Internal Operations Teams",         href: "#" },
    ],
  },
  {
    heading: "Why DGlide",
    links: [
      { label: "Compare Alternatives",    href: "#" },
      { label: "Who It's For / Not For",  href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog",              href: "#" },
      { label: "Guides / Playbooks", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DGlide",         href: "#" },
      { label: "Contact / Book Demo",  href: "#" },
    ],
  },
];

function NavColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div style={{ flex: "1 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          fontWeight: 500,
          lineHeight: "24px",
          color: "#000",
        }}
      >
        {heading}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: "22px",
              color: "#545454",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AAAAAA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer({
  settings,
  links,
}: {
  settings?: FooterSettings;
  links?: FooterLink[];
}) {
  const newsletterHeading     = settings?.newsletter_heading      ?? "Subscribe to Our Newsletter";
  const newsletterPlaceholder = settings?.newsletter_placeholder  ?? "Enter Your Email";
  const newsletterButtonLabel = settings?.newsletter_button_label ?? "Subscribe Now";
  const tagline    = settings?.tagline    ?? "We finally have visibility in our operations. Your system adapts to how you work.";
  const email      = settings?.email      ?? "Info@loremipsum.com";
  const phone      = settings?.phone      ?? "+91 6787878787";
  const copyright  = settings?.copyright  ?? "Copyright © 2024 Lorem Ipsum All Rights Reserved. Developed by Hexanovate";
  const privacyLabel = settings?.privacy_label ?? "Privacy Policy";
  const privacyHref  = settings?.privacy_href  ?? "#";
  const termsLabel   = settings?.terms_label   ?? "Terms";
  const termsHref    = settings?.terms_href    ?? "#";
  const social = settings?.social ?? {};

  const columns = DEFAULT_COLS.map((def, i) => {
    const colLinks = (links ?? []).filter((l) => l.column_index === i);
    return {
      heading: colLinks.find((l) => l.column_heading)?.column_heading ?? def.heading,
      links:   colLinks.length > 0 ? colLinks.map((l) => ({ label: l.label, href: l.href })) : def.links,
    };
  });

  const row1 = columns.slice(0, 3);
  const row2 = columns.slice(3, 6);

  return (
    <footer style={{ width: "100%", marginTop: "auto" }}>
      {/* Newsletter banner */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "8px 8px 8px 48px",
            borderRadius: 40,
            background: "linear-gradient(90deg, #F5E7DE 0%, #F3F3F3 100%)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              lineHeight: "28px",
              color: "#000",
              margin: 0,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {newsletterHeading}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div
              style={{
                width: 370,
                height: 48,
                background: "#FFF",
                borderRadius: 35,
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  lineHeight: "21px",
                  color: "#ABABAB",
                }}
              />
            </div>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 40,
                border: "1.5px solid #141FB5",
                background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
                color: "#FFF",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {newsletterButtonLabel}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 9H15M15 9L10 4M15 9L10 14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div style={{ width: "100%", background: "transparent", borderRadius: "30px 30px 0 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 0" }}>

          <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

            {/* Brand column */}
            <div style={{ width: 272, flexShrink: 0, display: "flex", flexDirection: "column", gap: 26 }}>
              <div style={{ position: "relative", width: 205, height: 36 }}>
                <Image
                  src="/logo.png"
                  alt="DGlide"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: "25px",
                  letterSpacing: "0.2px",
                  color: "#545454",
                  margin: 0,
                }}
              >
                {tagline}
              </p>

              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, color: "#000" }}>
                    {email}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: 15, fontWeight: 600, color: "#000" }}>
                    {phone}
                  </span>
                </div>
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Link href={social.linkedin || "#"} aria-label="LinkedIn" style={{ color: "#333", display: "flex" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
                <Link
                  href={social.twitter || "#"}
                  aria-label="Twitter"
                  style={{ width: 44, height: 44, borderRadius: 23, background: "#1C2BFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href={social.whatsapp || "#"} aria-label="WhatsApp" style={{ color: "#333", display: "flex" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </Link>
                <Link href={social.instagram || "#"} aria-label="Instagram" style={{ color: "#333", display: "flex" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Nav grid — 2 rows × 3 columns */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 36 }}>
              <div style={{ display: "flex", gap: 60 }}>
                {row1.map((col) => <NavColumn key={col.heading} {...col} />)}
              </div>
              <div style={{ display: "flex", gap: 60 }}>
                {row2.map((col) => <NavColumn key={col.heading} {...col} />)}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, #FBFBFB 0%, #D5D5D5 100%)", margin: "48px 0 0" }} />

          {/* Bottom bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 32px" }}>
            <p style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "22.4px", color: "#545454", margin: 0 }}>
              {copyright}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Link href={privacyHref} style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: 14, fontWeight: 400, color: "#545454", textDecoration: "none" }}>
                {privacyLabel}
              </Link>
              <span style={{ color: "#D5D5D5" }}>·</span>
              <Link href={termsHref} style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: 14, fontWeight: 400, color: "#545454", textDecoration: "none" }}>
                {termsLabel}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
