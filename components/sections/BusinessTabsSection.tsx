"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden style={{ width: "21.005px", height: "12.762px", aspectRatio: "79/48", flexShrink: 0 }}>
    <path d="M4.92601 6.82574L9.4923 9.10898L18.6249 4.54251L22.2779 6.3691L9.4923 12.7622L1.27297 8.65233L4.92601 6.82574Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.8587L9.4923 8.14194L18.6249 3.57547L22.2779 5.40206L9.4923 11.7951L1.27297 7.68529L4.92601 5.8587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);

const TAB_DEFAULTS = [
  {
    label: "Incident & Request Management",
    title: "Incident & Request Management",
    body: "Capture every incident and request in one queue, then turn it into a structured ticket with type, priority, owner, and history attached.",
    bullets: [
      "Structured tickets with clear ownership",
      "Type, priority, and history on every request",
      "Status visible from raised to resolved",
    ],
    why: "When requests are structured, nothing gets worked twice or dropped between people.",
    image: "/business-tabs/cap-1-incident.png",
  },
  {
    label: "Service Catalog & Self-Service",
    title: "Service Catalog & Self-Service",
    body: "Give people a portal to raise the right request the right way, from a catalog of services you define. Fewer \"quick question\" emails, cleaner intake.",
    bullets: [
      "Self-service portal for requesters",
      "Catalog of defined services",
      "Standardized intake, less back-and-forth",
    ],
    why: "Good intake means fewer misrouted tickets and faster first responses.",
    image: "/business-tabs/cap-2-catalog.png",
  },
  {
    label: "Approvals & Workflow Automation",
    title: "Approvals & Workflow Automation",
    body: "Build the approvals, routing, and multi-step flows your real processes need, across IT and beyond. Tickets move by rule, not by someone remembering to forward them.",
    bullets: [
      "Multi-step approvals and routing",
      "Rules across IT, HR, finance, and ops",
      "Workflows configured, not coded",
    ],
    why: "Automated routing stops work from stalling in inboxes between people.",
    image: "/business-tabs/cap-3-approvals.png",
  },
  {
    label: "SLA & Escalations",
    title: "SLA & Escalations",
    body: "Set response and resolution targets per service or contract. DGlide tracks every clock automatically and escalates a ticket before it breaches, not after the complaint.",
    bullets: [
      "SLA timers per service or team",
      "Automatic escalation before a breach",
      "Breach risk visible in real time",
    ],
    why: "Catching a slipping SLA early protects the service experience people judge you on.",
    image: "/business-tabs/cap-4-sla.png",
  },
  {
    label: "Asset & Change Visibility",
    title: "Asset & Change Visibility",
    body: "Link requests to the assets, systems, and changes they affect, so agents see context and changes don't collide. ITAM and change tracking without enterprise overhead.",
    bullets: [
      "Assets linked to tickets and history",
      "Change tracking and a basic calendar",
      "Context on every related system",
    ],
    why: "When agents see the asset and recent changes, they resolve faster and break less.",
    image: "/business-tabs/cap-5-asset.png",
  },
  {
    label: "Reports & Dashboards",
    title: "Reports & Dashboards",
    body: "See response times, SLA performance, agent productivity, and request trends in one dashboard. Spot the bottleneck before it costs you a contract or a renewal.",
    bullets: [
      "Response, SLA, and productivity in one view",
      "Trends across teams and request types",
      "Export-ready for reviews",
    ],
    why: "When you can see where service slows down, you fix the pattern, not just one ticket.",
    image: "/business-tabs/cap-6-reports.png",
  },
  {
    label: "Integrations",
    title: "Integrations",
    body: "Connect DGlide to your CRM, HRMS, ERP, and monitoring tools so request, asset, and customer data stays in sync. Service stops being an island.",
    bullets: [
      "Sync with CRM, HRMS, ERP, and FSM",
      "Asset and customer data stays current",
      "No double entry between systems",
    ],
    why: "When systems share data, your team stops re-keying and your records finally match.",
    image: "/business-tabs/cap-7-integrations.png",
  },
];

const TAB_W = 200;
const TAB_GAP = 12;

function getTabStyle(i: number, active: number): React.CSSProperties {
  const isActive   = i === active;
  const isLeftAdj  = i === active - 1;
  const isRightAdj = i === active + 1;

  const base: React.CSSProperties = {
    width: TAB_W,
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontFamily: "var(--font-tasa-orbiter)",
    fontSize: 14,
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
      padding: "17px 16px",
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
      padding: "17px 16px",
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
    padding: "17px 16px",
    color: "#FF7F1C",
    lineHeight: "26px",
    zIndex: 4,
    position: "relative",
  };
}

export default function BusinessTabsSection({ data }: { data?: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const ctaLabel = data?.cta_label ?? "Get Started Now";
  const ctaHref  = data?.cta_href  ?? "/schedule-demo";

  const tabs = TAB_DEFAULTS;

  const tab = tabs[active];

  const handleTabClick = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "80px 0 96px" }}>
      <style>{`.bts-tab-row::-webkit-scrollbar{display:none}`}</style>

      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title */}
        <div style={{ position: "relative", marginBottom: 56, textAlign: "center" }}>
          <h2
            className="sec-h2"
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
            The Capabilities Behind Every<br />Resolved Request
          </h2>
          <h2
            aria-hidden
            className="sec-h2"
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
            The Capabilities Behind Every<br />Resolved Request
          </h2>
        </div>

        {/* Tab row */}
        <div
          className="bts-tab-row"
          style={{
            display: "flex",
            gap: TAB_GAP,
            marginBottom: 8,
            position: "relative",
            zIndex: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
          } as React.CSSProperties}
        >
          {tabs.map((t, i) => (
            <button
              key={i}
              ref={(el) => { tabRefs.current[i] = el; }}
              className="bts-tab"
              onClick={() => handleTabClick(i)}
              style={getTabStyle(i, active)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div
          className="bts-content-card"
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
          {/* LEFT: text */}
          <div
            className="bts-content-left"
            style={{ width: 423, flexShrink: 0, display: "flex", flexDirection: "column" }}
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
                fontWeight: 400,
                lineHeight: "27px",
                letterSpacing: "0.2px",
                marginBottom: 24,
              }}
            >
              {tab.body}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {tab.bullets.map((bullet, bi) => (
                <div key={bi} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{
                    display: "flex",
                    width: 32,
                    height: 32,
                    padding: "8px 10px 9px 10px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    borderRadius: 8,
                    background: "#fff",
                    boxSizing: "border-box",
                  }}>
                    <TickIcon />
                  </span>
                  <span
                    style={{
                      color: "#333",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "22px",
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                color: "#777",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "20px",
                fontStyle: "italic",
                marginBottom: 0,
                flex: 1,
              }}
            >
              {tab.why}
            </p>

            {/* CTA */}
            <div style={{ marginTop: 32 }}>
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

          {/* RIGHT: image */}
          <div
            className="bts-img-col"
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
              className="w-full h-full object-cover block"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
