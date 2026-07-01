"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import type { BlogPost } from "@/lib/blog-db";

const TABS = [
  { key: "blogs", label: "Blogs", comingSoon: false },
  { key: "case-studies", label: "Case Studies", comingSoon: true },
  { key: "glossary", label: "Glossary", comingSoon: true },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const tabBtnStyle = (isActive: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "10px 24px",
  borderRadius: 40,
  border: "1.5px solid #FF7F1C",
  background: isActive ? "#FF7F1C" : "transparent",
  fontFamily: "Sora, sans-serif",
  fontSize: 16,
  fontWeight: isActive ? 600 : 400,
  color: isActive ? "#FFF" : "#FF7F1C",
  cursor: "pointer",
  textAlign: "center" as const,
  transition: "background 0.2s ease, color 0.2s ease",
  display: "block",
  boxSizing: "border-box" as const,
});

function ReadMoreLink({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 400, color: hovered ? "#FF7F1C" : "#1C2BFF", transition: "color 0.22s ease" }}
    >
      Read More
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden style={{ transition: "transform 0.22s ease", transform: hovered ? "rotate(-45deg)" : "none", flexShrink: 0 }}>
        <path d="M1.00003 8.0939C0.447744 8.09392 1.60277e-05 8.54165 5.96046e-08 9.09393C-1.59085e-05 9.64622 0.447686 10.0939 0.999971 10.0939L1 9.0939L1.00003 8.0939ZM15.1442 10.0935C15.6964 10.0935 16.1442 9.64575 16.1442 9.09346C16.1442 8.54118 15.6965 8.09348 15.1442 8.09349L15.1442 9.09349L15.1442 10.0935ZM1 9.0939L0.999971 10.0939L15.1442 10.0935L15.1442 9.09349L15.1442 8.09349L1.00003 8.0939L1 9.0939Z" fill="currentColor"/>
        <path d="M10.3978 12.4279C10.0072 12.8184 10.0072 13.4516 10.3977 13.8421C10.7882 14.2326 11.4214 14.2326 11.8119 13.842L11.1049 13.1349L10.3978 12.4279ZM15.8533 9.80072C16.2438 9.41018 16.2438 8.77702 15.8533 8.38651C15.4628 7.99599 14.8296 7.99601 14.4391 8.38655L15.1462 9.09363L15.8533 9.80072ZM11.1049 13.1349L11.8119 13.842L15.8533 9.80072L15.1462 9.09363L14.4391 8.38655L10.3978 12.4279L11.1049 13.1349Z" fill="currentColor"/>
        <path d="M11.8077 4.34185C11.4172 3.95134 10.784 3.95136 10.3935 4.34189C10.003 4.73243 10.0029 5.36559 10.3935 5.75611L11.1006 5.04898L11.8077 4.34185ZM14.4345 9.79719C14.8251 10.1877 15.4582 10.1877 15.8488 9.79715C16.2393 9.40661 16.2393 8.77345 15.8488 8.38293L15.1417 9.09006L14.4345 9.79719ZM11.1006 5.04898L10.3935 5.75611L14.4345 9.79719L15.1417 9.09006L15.8488 8.38293L11.8077 4.34185L11.1006 5.04898Z" fill="currentColor"/>
      </svg>
    </span>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const showFill = isActive || hovered;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="urs-tab-btn"
      style={{
        ...tabBtnStyle(false),
        background: showFill ? "#FF7F1C" : "transparent",
        color: showFill ? "#FFF" : "#FF7F1C",
        fontWeight: isActive ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

export default function UsefulResourcesSection({ latestPost }: { latestPost?: BlogPost }) {
  const [activeTab, setActiveTab] = useState<TabKey>("blogs");

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "40px 0 60px" }}>
      <div className="urs-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <ScrollReveal direction="up">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "60px",
                margin: "0 0 12px",
                background: "linear-gradient(180deg, #FF7F1C 0%, #000 82.08%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Useful Resources To Check
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "28px", color: "#6F7276", margin: 0 }}>
              Dig Into Case Studies, Articles, And Operations Terms Explained Simply.
            </p>
          </div>
        </ScrollReveal>

        <div className="urs-layout" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

          {/* Left tabs */}
          <StaggerReveal className="urs-tabs" style={{ display: "flex", flexDirection: "column", gap: 16, width: 244, flexShrink: 0 }}>
            {TABS.map(({ key, label }) => (
              <StaggerItem key={key}>
                <TabButton
                  label={label}
                  isActive={activeTab === key}
                  onClick={() => setActiveTab(key)}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Right panel */}
          {activeTab === "blogs" && latestPost ? (
            <Link
              href={`/blogs/${latestPost.slug}`}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "stretch",
                borderRadius: 20,
                background: "#FFF",
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                textDecoration: "none",
              }}
            >
              <div style={{ width: "48%", flexShrink: 0, minHeight: 240, position: "relative" }}>
                {latestPost.featuredImageUrl ? (
                  <Image src={latestPost.featuredImageUrl} alt={latestPost.title} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#f3f3f3" }} />
                )}
              </div>
              <div style={{ flex: 1, padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
                <h3 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 18, fontWeight: 500, lineHeight: "28px", color: "#000", margin: 0 }}>
                  {latestPost.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "26px", color: "#545454", margin: 0, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>
                  {latestPost.excerpt}
                </p>
                <ReadMoreLink href={`/blogs/${latestPost.slug}`} />
              </div>
            </Link>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 240,
                borderRadius: 20,
                background: "#FFF",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 40, textAlign: "center" }}>
                <span style={{ fontSize: 40, lineHeight: 1 }}>🚀</span>
                <h3 style={{ margin: 0, fontFamily: "var(--font-tasa-orbiter)", fontSize: 24, fontWeight: 500, color: "#000" }}>
                  Coming Soon
                </h3>
                <p style={{ margin: 0, fontFamily: "Inter, sans-serif", fontSize: 15, color: "#6F7276", lineHeight: 1.6, maxWidth: 280 }}>
                  We&apos;re working on our {activeTab === "case-studies" ? "Case Studies" : "Glossary"} library. Check back soon!
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
