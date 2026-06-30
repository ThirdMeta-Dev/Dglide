"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const SECTION_TITLE    = "From Demo to Live in Weeks";
const SECTION_SUBTITLE = "Live Faster Than a Custom Build Would Even Start";

const STEP_DEFAULTS = [
  { num: "01", title: "Pick Your Starting System",       desc: "Start With A Ready-To-Go System",                      ctaLabel: "Get Started Now", ctaHref: "/schedule-demo", shadow: false, marginTop: 0  },
  { num: "02", title: "Configure to Your Operation",     desc: "Shape It As Per Your Needs",                           ctaLabel: "Get Started Now", ctaHref: "/schedule-demo", shadow: true,  marginTop: 36 },
  { num: "03", title: "Launch in Weeks",                 desc: "Once All Customization Is Done, Go-Live",              ctaLabel: "Get Started Now", ctaHref: "/schedule-demo", shadow: true,  marginTop: 72 },
];

export default function LiveFasterSection({ data }: { data?: Record<string, string> }) {
  const title    = data?.title    ?? SECTION_TITLE;
  const subtitle = data?.subtitle ?? SECTION_SUBTITLE;
  const steps = STEP_DEFAULTS.map((s, i) => ({
    ...s,
    title:    data?.[`step_${i + 1}_title`]     ?? s.title,
    desc:     data?.[`step_${i + 1}_desc`]      ?? s.desc,
    ctaLabel: data?.[`step_${i + 1}_cta_label`] ?? s.ctaLabel,
    ctaHref:  data?.[`step_${i + 1}_cta_href`]  ?? s.ctaHref,
  }));

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "80px 0 120px" }}>
      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Header — right-aligned */}
        <ScrollReveal direction="up">
        <div className="lfs-header" style={{ textAlign: "right", marginBottom: 48 }}>
          <h2
            className="sec-h2"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "60px",
              margin: "0 0 8px",
              background: "linear-gradient(90deg, #000 0%, #FF7F1C 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "0.2px",
              color: "#6F7278",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
        </ScrollReveal>

        {/* Staggered cards row */}
        <ScrollReveal direction="up" delay={0.1}>
        <div className="lfs-cards" style={{ display: "flex", gap: 16 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="lfs-card"
              style={{
                flex: "1 0 0",
                alignSelf: "flex-start",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
                padding: "28px 60px 28px 28px",
                borderRadius: 16,
                border: "1px solid #FFF",
                background: "linear-gradient(180deg, #FFF 0%, #F6F6F6 100%)",
                boxShadow: step.shadow ? "-4px -4px 4px 0 rgba(0,0,0,0.04)" : undefined,
                marginTop: step.marginTop,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Step number — decorative */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 12,
                  right: 16,
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 68,
                  fontWeight: 400,
                  lineHeight: 1,
                  background: "linear-gradient(180deg, #FF7F1C 0%, transparent 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.4,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {step.num}
              </div>

              {/* Icon */}
              <Image src={`/live-faster/icon-${i + 1}.png`} alt="" width={86} height={44} className="object-contain flex-shrink-0" />

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: "26px",
                  color: "#000",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: "25px",
                  letterSpacing: "0.2px",
                  textTransform: "capitalize" as const,
                  color: "#555",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>

              {/* CTA link */}
              <a
                href={step.ctaHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-sora), Sora, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#1C2BFF",
                  textDecoration: "none",
                  marginTop: "auto",
                }}
              >
                {step.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 5l3 3-3 3"
                    stroke="#1C2BFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
