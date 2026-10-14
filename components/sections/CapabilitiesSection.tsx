"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const CAP_DEFAULTS = [
  { title: "Automated Workflows",     desc: "Cut the manual steps between every stage." },
  { title: "Approvals & SLA Tracking", desc: "Stage-based approvals, escalations, and SLA logic built in." },
  { title: "Real-Time Dashboards",    desc: "Role-based views of every job, request, and exception." },
  { title: "Mobile Access",           desc: "Field teams update jobs and visits from the site." },
];

type ExtraCapability = { id: string; title: string; desc: string; href?: string };

function ExtraIcon({ id }: { id: string }) {
  return (
    <span style={{ display: "inline-grid", width: 56, height: 40, placeItems: "center", borderRadius: 12, background: "#FFF2E9", color: "#FF7F1C" }} aria-hidden="true">
      {id === "ai" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" fill="currentColor" /></svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      )}
    </span>
  );
}

export default function CapabilitiesSection({ data, extra = [] }: { data?: Record<string, string>; extra?: ExtraCapability[] }) {
  const sectionTitle = data?.title    ?? "One Platform. Every Capability Your Operation Needs";
  const subtitle     = data?.subtitle ?? "One set of capabilities, working across your whole operation.";

  const caps = CAP_DEFAULTS.map((c, i) => ({
    title: data?.[`cap_${i + 1}_title`] ?? c.title,
    desc:  data?.[`cap_${i + 1}_desc`]  ?? c.desc,
    icon:  data?.[`cap_${i + 1}_icon`],
  }));

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "80px 0 96px" }}>
      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title + subtitle */}
        <ScrollReveal direction="up">
        <div style={{ textAlign: "center", marginBottom: 68 }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 18 }}>
            <h2
              className="sec-h2"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "58px",
                color: "#000",
                margin: 0,
              }}
            >
              {sectionTitle}
            </h2>
            <h2
              aria-hidden
              className="sec-h2"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "58px",
                margin: 0,
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #FF7F1C 0%, #000000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "#6F7276", margin: 0 }}>
            {subtitle}
          </p>
        </div>
        </ScrollReveal>

        {/* 4-column cards */}
        <StaggerReveal className={extra.length ? "cap-grid cap-grid--grid" : "cap-grid"} style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {caps.map((cap, i) => (
            <StaggerItem key={i} className="cap-item" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ flexShrink: 0, marginBottom: 28 }}>
                <Image
                  src={cap.icon || `/capabilities/icon-${i + 1}.png`}
                  alt=""
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 17, fontWeight: 400, lineHeight: "25px", color: "#000", margin: "0 0 8px" }}>
                {cap.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "#545454", margin: 0 }}>
                {cap.desc}
              </p>
            </StaggerItem>
          ))}
          {extra.map((cap) => (
            <StaggerItem key={cap.id} className="cap-item" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ flexShrink: 0, marginBottom: 28 }}>
                <ExtraIcon id={cap.id} />
              </div>
              <h3 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 17, fontWeight: 400, lineHeight: "25px", color: "#000", margin: "0 0 8px" }}>
                {cap.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "#545454", margin: 0 }}>
                {cap.desc}
              </p>
              {cap.href ? (
                <Link href={cap.href} style={{ marginTop: 10, color: "#1C2BFF", fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 600 }}>
                  Explore the AI Engine →
                </Link>
              ) : null}
            </StaggerItem>
          ))}
        </StaggerReveal>

      </div>
    </section>
  );
}
