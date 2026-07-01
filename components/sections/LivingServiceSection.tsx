"use client";

import Image from "next/image";
import React, { useState } from "react";

const STATIC_TITLE   = "The Living Service Model: Fit That Doesn't Expire";
const STATIC_BODY    = "With the Living Service Model, your system is adjusted as your operation changes, quarter after quarter.";
const FEATURE_DEFAULTS = ["Real-Time Visibility", "Automated Operational Flows", "Workflow Coordination"];
const TAB_DEFAULTS     = ["Deploy Fast", "Use On the Go", "Adapts with You", "Optimize without Dev"];

const SLIDE_DEFAULTS = [
  {
    counter: "1/4",
    detail: "Start with a working system, not a blank slate.",
    body: "",
    bullets: [
      "FSM, CRM, or process workflows ready to run on day one.",
      "Configured to your operation before go-live, not after months of building.",
    ],
  },
  {
    counter: "2/4",
    detail: "Real use shows what your system needs next.",
    body: "",
    bullets: [
      "Your team works the way they already do, with no forced workarounds.",
      "Gaps and edge cases surface through real operations, not guesswork.",
    ],
  },
  {
    counter: "3/4",
    detail: "Reshape workflows around what you learn, with no rebuild.",
    body: "",
    bullets: [
      "Change stages, approvals, and rules as your process evolves.",
      "Adjustments happen on the live system, not in a new project.",
    ],
  },
  {
    counter: "4/4",
    detail: "Keep improving as the business grows.",
    body: "",
    bullets: [
      "Add workflows, teams, and use cases without starting over.",
      "Your system stays aligned with operations, release after release.",
    ],
  },
];

const N = SLIDE_DEFAULTS.length;
const STEP_DEG = -22;

const CX = 240;
const CY = 240;
const ORBIT_R = 170;

function arcOffset(i: number, current: number): number {
  const raw = ((i - current) + N) % N;
  return raw > N / 2 ? raw - N : raw;
}

function tabPos(i: number, current: number): { x: number; y: number } {
  const offset = arcOffset(i, current);
  const angle  = ((180 + offset * STEP_DEG) * Math.PI) / 180;
  return {
    x: CX + Math.cos(angle) * ORBIT_R,
    y: CY + Math.sin(angle) * ORBIT_R,
  };
}

export default function LivingServiceSection({ data }: { data?: Record<string, string> }) {
  const [current, setCurrent] = useState(0);
  const [spinDir, setSpinDir] = useState<"prev" | "next" | null>(null);

  const title    = data?.left_title   ?? STATIC_TITLE;
  const body     = data?.left_body    ?? STATIC_BODY;
  const features = FEATURE_DEFAULTS.map((f, i) => data?.[`feature_${i + 1}`] ?? f);
  const tabs     = TAB_DEFAULTS.map((t, i) => data?.[`tab_${i + 1}_label`] ?? t);
  const slides   = SLIDE_DEFAULTS.map((s, i) => ({
    counter: s.counter,
    detail:  data?.[`slide_${i + 1}_detail`] ?? s.detail,
    body:    data?.[`slide_${i + 1}_body`]   ?? s.body,
    bullets: [
      data?.[`slide_${i + 1}_bullet_1`] ?? s.bullets[0],
      data?.[`slide_${i + 1}_bullet_2`] ?? s.bullets[1],
    ],
  }));

  const navigate = (dir: "prev" | "next") => {
    if (spinDir) return;
    setSpinDir(dir);
    setTimeout(() => {
      setCurrent((c) => (dir === "next" ? (c + 1) % N : (c - 1 + N) % N));
      setSpinDir(null);
    }, 650);
  };

  const slide = slides[current];

  return (
    <section className="w-full bg-[#F3F3F3] overflow-hidden" style={{ position: "relative" }}>
      {/* Waves — decorative bottom-left */}
      <img
        src={data?.waves_image ?? "/living-service-waves.png"}
        alt=""
        className="lss-waves"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "50%",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />

      <div
        className="max-w-[1280px] mx-auto lss-outer dg-inner-no-mobile-pad"
        style={{ padding: "80px 64px 80px", position: "relative", zIndex: 1 }}
      >
        {/* Counter + Nav */}
        <div
          className="lss-nav"
          style={{
            position: "absolute",
            top: 40,
            right: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 300,
              fontSize: 16,
              color: "#6F7276",
              letterSpacing: "0.5px",
            }}
          >
            {slide.counter}
          </span>
          <NavButton dir="prev" spinning={spinDir === "prev"} onClick={() => navigate("prev")} />
          <NavButton dir="next" spinning={spinDir === "next"} onClick={() => navigate("next")} />
        </div>

        {/* Two-column layout */}
        <div className="lss-two-col" style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>

          {/* LEFT */}
          <div className="lss-left" style={{ width: "60%", flexShrink: 0 }}>
            <h2
              className="sec-h2"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                fontSize: 56,
                lineHeight: "66px",
                textTransform: "capitalize",
                marginBottom: 20,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000 17.79%)",
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
                color: "#6F7276",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "28px",
                letterSpacing: "0.2px",
                textTransform: "capitalize",
                marginBottom: 32,
                maxWidth: 360,
              }}
            >
              {body}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src="/living-service/feature-bullet.svg" alt="" width={31} height={18} className="object-contain flex-shrink-0" />
                  <span style={{ fontFamily: "Inter, sans-serif", color: "#555", fontSize: 15, fontWeight: 400, lineHeight: "160%" }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Mobile slide — shown only on mobile via CSS */}
            <div className="lss-mobile-slide" style={{ display: "none", marginTop: 32 }}>
              {/* Horizontal scrollable tab bar */}
              <div
                className="lss-mobile-tabs"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  borderBottom: "1px solid #E8E8E8",
                  marginBottom: 24,
                }}
              >
                {tabs.map((label, i) => {
                  const isActive = i === current;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 16px 10px 6px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        flexShrink: 0,
                        borderBottom: isActive ? "2.5px solid #FF7F1C" : "2.5px solid transparent",
                        marginBottom: -1,
                      }}
                    >
                      <Image
                        src={`/living-service/tab-${i + 1}.png`}
                        alt=""
                        width={36}
                        height={18}
                        className="object-contain"
                        style={{ opacity: isActive ? 1 : 0.45 }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-tasa-orbiter)",
                          fontSize: 14,
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#FF7F1C" : "#000",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slide content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#000",
                  lineHeight: "24px",
                  margin: 0,
                }}>
                  {slide.detail}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {slide.bullets.map((b, idx) => (
                    <span key={idx} style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      fontWeight: 300,
                      color: "#545454",
                      lineHeight: "24px",
                    }}>
                      › {b}
                    </span>
                  ))}
                </div>
                <span style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#6F7276",
                  alignSelf: "flex-end",
                  marginTop: 4,
                }}>
                  {slide.counter}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lss-right" style={{ flex: 1, position: "relative", marginTop: 40, marginLeft: -120 }}>
            <div style={{ position: "relative", width: 480, height: 480 }}>
              <img
                src={data?.circle_image ?? "/living-service-circle.png"}
                alt=""
                style={{ width: 480, height: 480, position: "absolute", inset: 0, pointerEvents: "none" }}
              />

              {/* Orbit tabs */}
              {tabs.map((label, i) => {
                const { x, y } = tabPos(i, current);
                const offset   = arcOffset(i, current);
                const isActive = offset === 0;
                const dist     = Math.abs(offset);
                const opacity  = dist === 0 ? 1 : dist === 1 ? 0.72 : 0.45;
                return (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      position: "absolute",
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                      transition: "left 0.65s cubic-bezier(0.4,0,0.2,1), top 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                      opacity,
                      zIndex: isActive ? 10 : 6,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 20px 10px 14px",
                        borderRadius: 40,
                        border: `1.5px solid ${isActive ? "#FF7F1C" : "#E4E4E4"}`,
                        background: isActive ? "#FFF" : "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        whiteSpace: "nowrap",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "#FF7F1C" : "#6F7276",
                        boxShadow: isActive ? "0 2px 14px rgba(255,127,28,0.18)" : "0 1px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      <Image src={`/living-service/tab-${i + 1}.png`} alt="" width={40} height={20} className="object-contain flex-shrink-0" style={{ opacity: isActive ? 1 : 0.4 }} />
                      {label}
                    </div>
                  </div>
                );
              })}

              {/* Detail text inside circle — per-tab content */}
              <div style={{ position: "absolute", left: CX - 16, top: CY - 90, width: 232, zIndex: 2 }}>
                <p
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    color: "#000",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "24px",
                    letterSpacing: "0.1px",
                    marginBottom: slide.body ? 8 : 12,
                    width: "164%",
                  }}
                >
                  {slide.detail}
                </p>
                {slide.body && (
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#555",
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: "21px",
                      marginBottom: 10,
                      width: "164%",
                    }}
                  >
                    {slide.body}
                  </p>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {slide.bullets.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#555",
                        fontSize: 15,
                        fontStyle: "normal",
                        fontWeight: 300,
                        lineHeight: "160%",
                        display: "block",
                      }}
                    >
                      › {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function NavButton({
  dir,
  spinning,
  onClick,
}: {
  dir: "prev" | "next";
  spinning: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  const isNext = dir === "next";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        background: hovered ? "transparent" : "#FF7F1C",
        border: "1.5px solid #FF7F1C",
        transition: "background 0.2s ease",
        cursor: "pointer",
      }}
    >
      {spinning && (
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20" cy="20" r="18"
            fill="none"
            stroke={hovered ? "rgba(255,127,28,0.7)" : "rgba(255,255,255,0.6)"}
            strokeWidth="2"
            strokeDasharray="113"
            strokeLinecap="round"
            style={{ animation: "clockSpin 0.65s ease forwards" }}
          />
        </svg>
      )}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
        <path
          d={isNext ? "M3 8h10M9 5l3 3-3 3" : "M13 8H3M7 5l-3 3 3 3"}
          stroke={hovered ? "#FF7F1C" : "#fff"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
