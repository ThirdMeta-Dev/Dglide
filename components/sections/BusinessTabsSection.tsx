"use client";

import { useState } from "react";

const TAB_DEFAULTS = [
  {
    label: "Field Service Operations",
    title: "Field Service Operations",
    subtitle: "Field teams running on calls, WhatsApp, and manual logs",
    bullets: [
      "Best fit when technicians update jobs via text or phone calls.",
      "Best fit when dispatch and billing run in separate tools.",
      "Best fit when service history lives in people's heads, not systems.",
    ],
  },
  {
    label: "Manufacturing & Process",
    title: "Manufacturing & Process",
    subtitle: "Factories running production on spreadsheets and floor knowledge",
    bullets: [
      "Best fit when production updates travel by WhatsApp.",
      "Best fit when every product line works a little differently.",
      "Best fit when quality and dispatch don't talk to each other.",
    ],
  },
  {
    label: "Growing SMBs",
    title: "Growing SMBs",
    subtitle: "Small teams scaling faster than their current tools allow",
    bullets: [
      "Best fit when spreadsheets are your main operations system.",
      "Best fit when every new hire adds coordination overhead.",
      "Best fit when you've outgrown your first tool but aren't enterprise.",
    ],
  },
  {
    label: "Operations & Support Teams",
    title: "Operations & Support Teams",
    subtitle: "Teams managing requests, issues, and cross-department workflows",
    bullets: [
      "Best fit when tickets fall through the cracks between teams.",
      "Best fit when everyone works in silos with no shared dashboard.",
      "Best fit when SLA tracking happens in shared spreadsheets.",
    ],
  },
];

function getTabStyle(i: number, active: number): React.CSSProperties {
  const isActive   = i === active;
  const isLeftAdj  = i === active - 1;
  const isRightAdj = i === active + 1;

  const base: React.CSSProperties = {
    width: 267,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontFamily: "var(--font-tasa-orbiter)",
    fontSize: 17,
    fontWeight: 400,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  if (isActive) {
    return {
      ...base,
      borderRadius: 40,
      background: "#FF7F1C",
      padding: "20px 2px",
      color: "#ffffff",
      fontFamily: "var(--font-sora), Sora, sans-serif",
      fontWeight: 600,
      lineHeight: "21px",
      boxShadow: "0 4px 20px rgba(255,127,28,0.35)",
      zIndex: 10,
      position: "relative",
    };
  }

  if (isLeftAdj) {
    return {
      ...base,
      borderRadius: 50,
      borderRight: "2px solid #FF7F1C",
      background: "linear-gradient(90deg, #FFF 0%, #FFF4EB 100%)",
      padding: "17px 50px",
      color: "#FF7F1C",
      lineHeight: "26px",
      zIndex: 7,
      position: "relative",
    };
  }

  if (isRightAdj) {
    return {
      ...base,
      borderRadius: 50,
      borderLeft: "2px solid #FF7F1C",
      background: "linear-gradient(270deg, #FFF 0%, #FFF4EB 100%)",
      padding: "17px 50px",
      color: "#FF7F1C",
      lineHeight: "26px",
      zIndex: 7,
      position: "relative",
    };
  }

  return {
    ...base,
    borderRadius: 50,
    background: "#ffffff",
    padding: "17px 50px",
    color: "#FF7F1C",
    lineHeight: "26px",
    zIndex: 4,
    position: "relative",
  };
}

export default function BusinessTabsSection({ data }: { data?: Record<string, string> }) {
  const [active, setActive] = useState(1);

  const sectionTitle = data?.section_title ?? "Built for Businesses Like Yours";
  const ctaLabel     = data?.cta_label     ?? "Get Started Now";
  const ctaHref      = data?.cta_href      ?? "/schedule-demo";

  const tabs = TAB_DEFAULTS.map((t, i) => ({
    label:    data?.[`tab_${i + 1}_label`]    ?? t.label,
    title:    data?.[`tab_${i + 1}_title`]    ?? t.title,
    subtitle: data?.[`tab_${i + 1}_subtitle`] ?? t.subtitle,
    bullets: [
      data?.[`tab_${i + 1}_bullet_1`] ?? t.bullets[0],
      data?.[`tab_${i + 1}_bullet_2`] ?? t.bullets[1],
      data?.[`tab_${i + 1}_bullet_3`] ?? t.bullets[2],
    ],
  }));

  const tab = tabs[active];

  return (
    <section
      style={{
        width: "100%",
        background: "#F3F3F3",
        padding: "80px 0 96px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title */}
        <div style={{ position: "relative", marginBottom: 56, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              color: "#000",
              lineHeight: "60px",
              textTransform: "capitalize",
              margin: 0,
            }}
          >
            {sectionTitle}
          </h2>
          <h2
            aria-hidden
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "60px",
              textTransform: "capitalize",
              margin: 0,
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #ff7f1c 0%, #000000 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              pointerEvents: "none",
            }}
          >
            {sectionTitle}
          </h2>
        </div>

        {/* Tab row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 8,
            position: "relative",
            zIndex: 2,
          }}
        >
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={getTabStyle(i, active)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div
          style={{
            backgroundImage: "url(/business-tabs-content.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            padding: "40px",
            display: "flex",
            gap: 68,
            alignItems: "stretch",
            minHeight: 472,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT: text content */}
          <div
            style={{
              width: 423,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                color: "#000",
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 24,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "30px",
                marginBottom: 18,
              }}
            >
              {tab.title}
            </h3>

            <p
              style={{
                color: "#555",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "27px",
                letterSpacing: "0.2px",
                textTransform: "capitalize",
                marginBottom: 32,
              }}
            >
              {tab.subtitle}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingLeft: 20,
                flex: 1,
              }}
            >
              {tab.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <img
                    src="/dglide-icon-orange.png"
                    alt=""
                    style={{ width: 40, height: 40, flexShrink: 0, marginTop: 2 }}
                  />
                  <span
                    style={{
                      color: "#000",
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontSize: 15,
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 60 }}>
              <a
                href={ctaHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 32px",
                  borderRadius: 40,
                  background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
                  color: "#fff",
                  textDecoration: "none",
                  fontFamily: "var(--font-sora), Sora, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "20px",
                  cursor: "pointer",
                }}
              >
                {ctaLabel} <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </div>

          {/* RIGHT: product image */}
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: "hidden",
              background: "linear-gradient(135deg, #f3f3f3 0%, #f6d9c3 100%)",
              minHeight: 360,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={data?.tab_image ?? "/section-tabs.png"}
              alt="DGlide dashboard"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
