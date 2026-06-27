"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TABS = [
  {
    label: "Field Service Businesses",
    title: "Field Service Businesses",
    subtitle:
      "Installation and after-sales teams running work orders, scheduling, and SLAs across the field, where missed updates cost real jobs.",
    image: "/business-tabs/tab-1.png",
    bullets: [
      "Fits Your Service Workflow: Work orders, scheduling, and SLAs match how your service team actually runs.",
      "Visibility Across the Field: See where every job and technician stands, without making a call.",
    ],
  },
  {
    label: "Manufacturing & Process",
    title: "Manufacturing & Process",
    subtitle:
      "Multi-stage manufacturers tracking production, dependencies, quality, and approvals, where job status often lives in someone's head.",
    image: "/business-tabs/tab-2.png",
    bullets: [
      "Built for Multi-Stage Work: Track every stage, dependency, and approval from raw material to dispatch.",
      "See the Floor in Real Time: Know where every job stands without walking the floor to find out.",
    ],
  },
  {
    label: "Growing SMB Operations",
    title: "Growing SMB Operations",
    subtitle:
      "Operations outgrowing spreadsheets and WhatsApp, where every team added a different tool and nothing connects.",
    image: "/business-tabs/tab-3.png",
    bullets: [
      "One System, Not Ten Tools: Replace the patchwork of apps with one connected operation.",
      "Scales as You Grow: Add teams, sites, and workflows without the system breaking.",
    ],
  },
  {
    label: "Internal Operations Teams",
    title: "Internal Operations Teams",
    subtitle:
      "Service and ops teams running approvals and requests a basic ticketing tool was never built to handle.",
    image: "/business-tabs/tab-4.png",
    bullets: [
      "Beyond a Help Desk: Run real internal workflows, not just tickets and queues.",
      "Approvals That Don't Get Lost: Every request and approval tracked, routed, and visible.",
    ],
  },
  {
    label: "Field Sales Teams",
    title: "Field Sales Teams",
    subtitle:
      "Field sales teams tracking visits, routes, orders, and territories, where activity is hard to see and harder to manage.",
    image: "/business-tabs/tab-5.png",
    bullets: [
      "Structure for the Field: Plan routes, log visits, and capture orders in one place.",
      "Visibility Across Territories: See real field activity and results, not just end-of-day reports.",
    ],
  },
];

const SECTION_BG = "#F3F3F3";

function getTabStyle(i: number, active: number): React.CSSProperties {
  const isActive   = i === active;
  const isLeftAdj  = i === active - 1;
  const isRightAdj = i === active + 1;

  const base: React.CSSProperties = {
    width: 248,
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontFamily: "var(--font-tasa-orbiter)",
    fontSize: 15,
    fontWeight: 400,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  if (isActive) {
    return {
      ...base,
      borderRadius: 40,
      background: "#FF7F1C",
      padding: "20px 12px",
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
      padding: "17px 36px",
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
      padding: "17px 36px",
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
    padding: "17px 36px",
    color: "#FF7F1C",
    lineHeight: "26px",
    zIndex: 4,
    position: "relative",
  };
}

export default function PlatformBusinessTabsSection() {
  const [active, setActive] = useState(0);
  const tabRowRef = useRef<HTMLDivElement>(null);
  const tabRefs   = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabClick(i: number) {
    setActive(i);
    const btn = tabRefs.current[i];
    const row = tabRowRef.current;
    if (btn && row) {
      const left = btn.offsetLeft - row.offsetWidth / 2 + btn.offsetWidth / 2;
      row.scrollTo({ left, behavior: "smooth" });
    }
  }

  const tab           = TABS[active];
  const showLeftFade  = active > 0;
  const showRightFade = active < TABS.length - 1;

  return (
    <section
      className="sol-section"
      style={{ width: "100%", background: SECTION_BG, padding: "80px 0 96px" }}
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
            Built for Businesses Like Yours
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
            Built for Businesses Like Yours
          </h2>
        </div>

        {/* Tab strip with fade overlays */}
        <div style={{ position: "relative", marginBottom: 8, zIndex: 2 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 140,
              zIndex: 5,
              background: `linear-gradient(to right, ${SECTION_BG} 30%, transparent)`,
              pointerEvents: "none",
              opacity: showLeftFade ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 140,
              zIndex: 5,
              background: `linear-gradient(to left, ${SECTION_BG} 30%, transparent)`,
              pointerEvents: "none",
              opacity: showRightFade ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          />

          <div
            ref={tabRowRef}
            className="plat-btabs-row"
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={i}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i)}
                style={getTabStyle(i, active)}
                className="plat-btabs-btn"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content card */}
        <div
          className="plat-btabs-content-card"
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
          {/* Left: text */}
          <div
            className="plat-btabs-left-panel"
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
                lineHeight: "27px",
                letterSpacing: "0.2px",
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
              {tab.bullets.map((b, idx) => (
                <div key={idx} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <Image
                    src="/business-tabs/bullet.svg"
                    alt=""
                    width={31}
                    height={18}
                    style={{ objectFit: "contain", flexShrink: 0, marginTop: 4 }}
                  />
                  <span
                    style={{
                      color: "#000",
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontSize: 15,
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
                href="/schedule-demo"
                className="dg-btn-fill"
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
                Get Started Now <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div
            className="plat-btabs-right-panel"
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
            <Image
              key={tab.image}
              src={tab.image}
              alt="DGlide dashboard"
              width={700}
              height={472}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

      </div>

      <style>{`
        .plat-btabs-row::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .plat-btabs-btn {
            width: auto !important;
            min-width: unset !important;
            padding: 10px 18px !important;
            font-size: 13px !important;
            line-height: 18px !important;
          }
          .plat-btabs-content-card {
            background-image: none !important;
            background: transparent !important;
            padding: 20px 0 !important;
            flex-direction: column !important;
            gap: 24px !important;
            min-height: unset !important;
          }
          .plat-btabs-left-panel {
            width: 100% !important;
          }
          .plat-btabs-right-panel {
            min-height: 220px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
