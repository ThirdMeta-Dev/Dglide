import Link from "next/link";
import Image from "next/image";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import FooterNewsletter from "./FooterNewsletter";

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
      { label: "Overview",                      href: "/platform" },
      { label: "Living Service Model (LSM)",    href: "/platform" },
      { label: "Architecture & Capabilities",   href: "/platform" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Field Service Management",   href: "/field-service-management-fsm"  },
      { label: "Process Management",         href: "/manufacturing-management-software" },
      { label: "Service / ITSM Workflows",   href: "/it-service-management-itsm" },
      { label: "Field Sales Execution",      href: "/coming-soon" },
      { label: "CRM", href: "/customer-relationship-management-crm" },
    ],
  },
  {
    heading: "Use Cases",
    links: [
      { label: "Field Service Businesses",           href: "/coming-soon" },
      { label: "Manufacturing & Process Businesses", href: "/coming-soon" },
      { label: "Growing SMB Operations",             href: "/coming-soon" },
      { label: "Internal Operations Teams",          href: "/coming-soon" },
    ],
  },
  {
    heading: "Why DGlide",
    links: [
      { label: "Compare Alternatives",   href: "/why-dglide" },
      { label: "Who It's For / Not For", href: "/why-dglide" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog",               href: "https://dglide.com/blog" },
      { label: "Guides / Playbooks", href: "/coming-soon" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DGlide",        href: "/about" },
      { label: "Contact / Book Demo", href: "/schedule-demo" },
    ],
  },
];

function NavColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
  const configuredEmail = settings?.email?.trim();
  const configuredPhone = settings?.phone?.trim();
  const email = !configuredEmail || configuredEmail === "letstalk@dglide.com"
    ? "info@dglide.com"
    : configuredEmail;
  const phone = !configuredPhone || ["+91 95884 82557", "+91 6787878787"].includes(configuredPhone)
    ? "+91 80808 16087"
    : configuredPhone;
  const configuredCopyright = settings?.copyright?.trim();
  const copyright = !configuredCopyright
    || configuredCopyright.includes("Lorem Ipsum")
    || configuredCopyright.startsWith("Copyright © 2025 DGlide")
    ? "Copyright © 2026 DGlide. All Rights Reserved. Developed by Hexanovate"
    : configuredCopyright;
  const developerName = "Hexanovate";
  const developerNameIndex = copyright.indexOf(developerName);
  const privacyLabel = settings?.privacy_label ?? "Privacy Policy";
  const privacyHref  = settings?.privacy_href  ?? "/privacy-policy";
  const termsLabel   = settings?.terms_label   ?? "Terms & Conditions";
  const termsHref    = settings?.terms_href    ?? "/terms-conditions";
  const social = settings?.social ?? {
    linkedin: "https://www.linkedin.com/company/dglide/posts/?feedView=all",
    instagram: "https://www.instagram.com/dglide.ai/",
  };

  const columns = DEFAULT_COLS.map((def, i) => {
    const colLinks = (links ?? []).filter((l) => l.column_index === i);
    const resolvedLinks = (colLinks.length > 0
      ? colLinks.map((l) => ({ label: l.label, href: l.href === "#" ? "/coming-soon" : l.href }))
      : def.links)
      .map((link) => {
        if (def.heading !== "Solutions") return link;

        const label = link.label.trim().toLowerCase();
        if (label === "crm") {
          return { ...link, href: "/customer-relationship-management-crm" };
        }
        if (label === "process management") {
          return { ...link, href: "/manufacturing-management-software" };
        }
        return link;
      });

    if (
      def.heading === "Resources" &&
      !resolvedLinks.some((link) => link.href === "/case-studies")
    ) {
      resolvedLinks.push({ label: "Case Studies", href: "/case-studies" });
    }

    return {
      heading: colLinks.find((l) => l.column_heading)?.column_heading ?? def.heading,
      links: resolvedLinks,
    };
  });

  const row1 = columns.slice(0, 3); // Platform | Solutions | Use Cases
  const row2 = columns.slice(3, 6); // Why DGlide | Resources | Company

  return (
    <footer style={{ width: "100%", marginTop: "auto" }}>
      {/* Newsletter banner */}
      <ScrollReveal direction="up">
        <div className="footer-nl-outer" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div
            className="footer-nl-pill"
            style={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "8px 8px 8px 48px",
              borderRadius: 40,
              background: "linear-gradient(90deg, #F5E7DE 0%, #F3F3F3 100%)",
            }}
          >
            <FooterNewsletter
              heading={newsletterHeading}
              placeholder={newsletterPlaceholder}
              buttonLabel={newsletterButtonLabel}
            />
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
                <div className="footer-contact-group" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                <div className="footer-social-row" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {[
                    { href: social.linkedin  || "#", src: "/footer/social-linkedin.png",  label: "LinkedIn"  },
                    { href: social.instagram || "#", src: "/footer/social-instagram.png", label: "Instagram" },
                  ].map(({ href, src, label }) => (
                    <Link key={label} href={href} aria-label={label} className="dg-social-icon" target="_blank" rel="noopener noreferrer">
                      <Image src={src} alt="" width={20} height={20} className="object-contain" />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Nav grid — 2 rows × 3 columns, each row uses equal-width flex items */}
            <StaggerReveal
              className="footer-nav-grid"
              stagger={0.08}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: 36 }}
            >
              <div className="footer-nav-row" style={{ display: "flex", gap: 60 }}>
                {row1.map((col) => (
                  <div key={col.heading} style={{ flex: "1 0 0" }}>
                    <StaggerItem direction="up">
                      <NavColumn {...col} />
                    </StaggerItem>
                  </div>
                ))}
              </div>
              <div className="footer-nav-row" style={{ display: "flex", gap: 60 }}>
                {row2.map((col) => (
                  <div key={col.heading} style={{ flex: "1 0 0" }}>
                    <StaggerItem direction="up">
                      <NavColumn {...col} />
                    </StaggerItem>
                  </div>
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
                {developerNameIndex >= 0 ? (
                  <>
                    {copyright.slice(0, developerNameIndex)}
                    <a
                      href="https://hexanovate.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
                    >
                      {developerName}
                    </a>
                    {copyright.slice(developerNameIndex + developerName.length)}
                  </>
                ) : copyright}
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
