import Link from "next/link";
import Image from "next/image";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

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
      { label: "Blog",              href: "https://dglide.com/blog" },
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
            className="dg-footer-link"
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
      <ScrollReveal direction="up">
        <div className="footer-nl-outer" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div
            className="footer-newsletter"
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
              className="footer-nl-title"
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

            <div className="footer-nl-actions" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div
                className="footer-nl-input"
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
                className="dg-btn-fill"
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
      </ScrollReveal>

      {/* Footer body */}
      <div style={{ width: "100%", background: "transparent", borderRadius: "30px 30px 0 0" }}>
        <div className="footer-body-wrapper" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 0" }}>

          <div className="footer-body" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

            {/* Brand column */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="footer-brand-col" style={{ width: 272, flexShrink: 0, display: "flex", flexDirection: "column", gap: 26 }}>
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
                  <a href={`mailto:${email}`} className="dg-footer-contact" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                    <Image src="/footer/icon-email.png" alt="" width={24} height={24} className="object-contain" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, color: "inherit" }}>
                      {email}
                    </span>
                  </a>
                  <a href={`tel:${phone}`} className="dg-footer-contact" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                    <Image src="/footer/icon-phone.png" alt="" width={24} height={24} className="object-contain" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: 15, fontWeight: 600, color: "inherit" }}>
                      {phone}
                    </span>
                  </a>
                </div>

                {/* Social icons */}
                <style>{`
                  .dg-social-icon {
                    width: 40px; height: 40px; border-radius: 50%;
                    border: 1.5px solid #FF7F1C;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; transition: background 0.2s ease, border-color 0.2s ease;
                    overflow: hidden;
                  }
                  .dg-social-icon:hover { background: #1C2BFF; border-color: #1C2BFF; }
                  .dg-social-icon:hover img { filter: brightness(0) invert(1); }
                  .dg-footer-link { transition: color 0.18s ease; }
                  .dg-footer-link:hover { color: #1C2BFF !important; }
                  .dg-footer-contact { color: #000; transition: color 0.18s ease; }
                  .dg-footer-contact:hover { color: #1C2BFF !important; }
                `}</style>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {[
                    { href: social.linkedin  || "#", src: "/footer/social-linkedin.png",  label: "LinkedIn"  },
                    { href: social.twitter   || "#", src: "/footer/social-twitter.png",   label: "Twitter"   },
                    { href: social.whatsapp  || "#", src: "/footer/social-whatsapp.png",  label: "WhatsApp"  },
                    { href: social.instagram || "#", src: "/footer/social-instagram.png", label: "Instagram" },
                  ].map(({ href, src, label }) => (
                    <Link key={label} href={href} aria-label={label} className="dg-social-icon">
                      <Image src={src} alt="" width={20} height={20} className="object-contain" />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Nav grid — 2 rows × 3 columns */}
            <StaggerReveal
              className="footer-nav-grid"
              stagger={0.08}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 36 }}
            >
              <div className="footer-nav-row" style={{ display: "flex", gap: 60 }}>
                {row1.map((col) => (
                  <StaggerItem key={col.heading} direction="up">
                    <NavColumn {...col} />
                  </StaggerItem>
                ))}
              </div>
              <div className="footer-nav-row" style={{ display: "flex", gap: 60 }}>
                {row2.map((col) => (
                  <StaggerItem key={col.heading} direction="up">
                    <NavColumn {...col} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerReveal>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, #FBFBFB 0%, #D5D5D5 100%)", margin: "48px 0 0" }} />

          {/* Bottom bar */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 32px" }}>
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
          </ScrollReveal>

        </div>
      </div>
    </footer>
  );
}
