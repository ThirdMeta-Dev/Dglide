"use client";

import Image from "next/image";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const RIGHT_ITEM_DEFAULTS = [
  "Every tool replaced by one platform",
  "One dashboard for the whole operation",
  "Automated routing of work and approvals",
  "Service, field, and office in sync",
  "Faster service resolution",
  "Continuous fit through the Living Service Model",
];

export default function CaseStudiesSection({ data }: { data?: Record<string, string> }) {
  const sectionTitle   = data?.title          ?? "Proof, Not Promises";
  const challengeTitle = data?.challenge_title ?? "The Challenge";
  const challengeBody  = data?.challenge_body  ?? "A 50-person laser machine manufacturer stopped the leaks: lost leads, slow service, no visibility.";
  const challengeTag1  = data?.challenge_tag_1 ?? "Automated Operational Flows";
  const challengeTag2  = data?.challenge_tag_2 ?? "Workflow Coordination";
  const metricsTitle   = data?.metrics_title   ?? "The Success Metrics";
  const metricsBody    = data?.metrics_body    ?? "After DGlide, the team could see and act in real time.\n The numbers moved within the first quarter.";
  const metric1Num     = data?.metric_1_num    ?? "3X";
  const metric1Label   = data?.metric_1_label  ?? "Lead Capture";
  const metric2Num     = data?.metric_2_num    ?? "8 Min";
  const metric2Label   = data?.metric_2_label  ?? "Response Down From 40+";
  const metric3Num     = data?.metric_3_num    ?? "75%";
  const metric3Label   = data?.metric_3_label  ?? "Lower Cost";
  const quoteText      = data?.quote_text      ?? "Now I open my phone and see every project, every complaint, every shipment.";
  const testimonialImg = data?.testimonial_image;
  const rightTitle     = data?.right_title     ?? "How DGlide Fixed It";
  const rightItems     = RIGHT_ITEM_DEFAULTS.map((d, i) => data?.[`right_item_${i + 1}`] ?? d);
  const ctaLabel       = data?.cta_label       ?? "Get the full story";
  const ctaHref        = data?.cta_href        ?? "/schedule-demo";

  return (
    <section
      style={{
        width: "100%",
        background: "#F3F3F3",
        padding: "80px 0 96px",
      }}
    >
      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title */}
        <ScrollReveal direction="up">
        <div style={{ marginBottom: 56, position: "relative", display: "inline-block" }}>
          <h2
            className="sec-h2"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "60px",
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
              lineHeight: "60px",
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
        </ScrollReveal>

        {/* Two-column */}
        <StaggerReveal stagger={0.1} className="css-two-col" style={{ display: "flex", alignItems: "flex-start", isolation: "isolate" }}>

          {/* LEFT CARD */}
          <StaggerItem>
          <div
            className="css-left"
            style={{
              width: 699,
              flexShrink: 0,
              borderRadius: 16,
              background: "linear-gradient(106deg, rgba(243, 243, 243, 0.60) 47.85%, rgba(255, 255, 255, 0.60) 98.89%)",
              padding: "40px 40px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* The Challenge */}
            <div style={{ borderLeft: "2px solid #FF7F1C", paddingLeft: 20 }}>
              <h3
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#FF7F1C",
                  margin: "0 0 14px",
                }}
              >
                {challengeTitle}
              </h3>
              <div style={{ borderLeft: "1px solid #D0D0D0", paddingLeft: 14, marginBottom: 18 }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#555",
                    lineHeight: "25px",
                    margin: 0,
                    maxWidth: 370,
                  }}
                >
                  {challengeBody}
                </p>
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const }}>
                {[challengeTag1, challengeTag2].map((tag, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Image src="/case-studies/tag-bullet.svg" alt="" width={22} height={13} className="object-contain flex-shrink-0" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#000" }}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Success Metrics */}
            <div style={{ borderLeft: "2px solid #FF7F1C", paddingLeft: 20 }}>
              <h3
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#1C2BFF",
                  margin: "0 0 14px",
                }}
              >
                {metricsTitle}
              </h3>
              <div style={{ borderLeft: "1px solid #D0D0D0", paddingLeft: 14, marginBottom: 24 }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "28px",
                    letterSpacing: "0.2px",
                    textTransform: "capitalize" as const,
                    color: "#555",
                    margin: 0,
                    maxWidth: 350,
                  }}
                >
                  {metricsBody}
                </p>
              </div>
              <div className="css-metrics" style={{ display: "flex", gap: 40 }}>
                {[
                  { num: metric1Num, label: metric1Label },
                  { num: metric2Num, label: metric2Label },
                  { num: metric3Num, label: metric3Label },
                ].map((m, i) => (
                  <div key={i}>
                    <p
                      className="css-metric-num"
                      style={{
                        fontFamily: "var(--font-tasa-orbiter)",
                        fontSize: 40,
                        fontWeight: 400,
                        color: "#000",
                        lineHeight: "52px",
                        margin: 0,
                      }}
                    >
                      {m.num}
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: 400,
                        color: "#555",
                        lineHeight: "26px",
                        letterSpacing: "0.2px",
                        textTransform: "capitalize" as const,
                        margin: 0,
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote + avatar */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {testimonialImg ? (
                <img
                  src={testimonialImg}
                  alt="Testimonial"
                  style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#D9D9D9",
                    flexShrink: 0,
                  }}
                />
              )}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  color: "#FF7F1C",
                  fontStyle: "italic",
                  lineHeight: "26px",
                  margin: 0,
                }}
              >
                &ldquo;{quoteText}&rdquo;
              </p>
            </div>
          </div>
          </StaggerItem>

          {/* RIGHT CARD */}
          <StaggerItem>
          <div
            className="css-right"
            style={{
              width: 445,
              flexShrink: 0,
              borderRadius: 16,
              background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
              boxShadow: "-6px -6px 10px rgba(0, 0, 0, 0.06)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              marginLeft: -40,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Logo */}
            <Image src="/case-studies/dglide-logo.png" alt="DGlide" width={160} height={28} className="object-contain" />

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 24,
                fontWeight: 400,
                color: "#000",
                margin: 0,
                lineHeight: "30px",
              }}
            >
              {rightTitle}
            </h3>

            {/* Orange divider */}
            <div style={{ width: 75, height: 2, background: "#FF7F1C" }} />

            {/* List items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {rightItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src="/case-studies/list-bullet.svg" alt="" width={22} height={13} className="object-contain flex-shrink-0" />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: 300,
                      color: "#000",
                      lineHeight: "26px",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "auto" }}>
              <a
                href={ctaHref}
                className="dg-btn-fill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  width: "100%",
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
                  boxSizing: "border-box",
                }}
              >
                {ctaLabel} <span className="btn-arrow" style={{ fontSize: 18, display: "inline-block" }}>→</span>
              </a>
            </div>
          </div>
          </StaggerItem>

        </StaggerReveal>
      </div>
    </section>
  );
}
