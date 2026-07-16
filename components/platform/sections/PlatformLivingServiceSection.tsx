"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

const TITLE = "Your Software Should Be Compatible, Even After Go-Live";
const BODY  = "Real workflows change after teams start using the system. New rules appear. New approvals get added. New teams join. New exceptions come up.";
const FEATURES = [
  "Real-Time Operational Visibility",
  "Automated Operational Flows",
  "Cross-Team Workflow Coordination",
];
const TABS = ["Deploy", "Use", "Adapt", "Optimize"];

const SLIDES = [
  {
    counter: "1/4",
    detail: "You start on a system that already runs. DGlide is deployed as a ready-to-run setup shaped to your workflows.",
    bullets: [
      "Start on a Working System — You configure a system that already runs, instead of building one from scratch.",
      "Live in Weeks, Not Quarters — Your team is using DGlide while an ERP or custom build would still be in planning.",
    ],
  },
  {
    counter: "2/4",
    detail: "A system only delivers if people actually use it. DGlide fits how your team works, so there is no fighting the tool.",
    bullets: [
      "Built Around Your Real Workflow — Stages, approvals, and roles match your operation, so the tool never forces a detour.",
      "Adopted Without a Fight — When the software fits, people use it, so work stops leaking into chats and side files.",
    ],
  },
  {
    counter: "3/4",
    detail: "This is where DGlide is different from every category tool. When your process shifts, the system is reshaped to fit it, not the other way around.",
    bullets: [
      "Change Workflows Without Rebuilding — When your operation shifts, the system is reconfigured to match, not torn down and rebuilt.",
      "No Developer Dependency — Changes are made by configuration, so you are never stuck waiting in a development queue.",
    ],
  },
  {
    counter: "4/4",
    detail: "Optimize is where fit compounds. Real usage reveals what to tighten, automate, or simplify, and the system is improved quarter after quarter.",
    bullets: [
      "The System Improves With Use — Real usage shows what to tighten, and the system is refined around it on an ongoing basis.",
      "Friction Removed Before It Costs You — Everyday frictions are spotted and cleared before they turn into recurring delays.",
    ],
  },
];

const N = SLIDES.length;
const STEP_DEG = -22;
const CX = 240;
const CY = 240;
const ORBIT_R = 170;

function arcOffset(i: number, current: number) {
  const raw = ((i - current) + N) % N;
  return raw > N / 2 ? raw - N : raw;
}

function tabPos(i: number, current: number) {
  const offset = arcOffset(i, current);
  const angle  = ((180 + offset * STEP_DEG) * Math.PI) / 180;
  return { x: CX + Math.cos(angle) * ORBIT_R, y: CY + Math.sin(angle) * ORBIT_R };
}

function NavButton({ dir, spinning, onClick }: { dir: "prev" | "next"; spinning: boolean; onClick: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  const isNext = dir === "next";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={dir === "next" ? "Next" : "Previous"}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "transparent" : "#FF7F1C",
        border: "1.5px solid #FF7F1C",
        transition: "background 0.2s ease",
        cursor: "pointer", position: "relative", overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {spinning && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none"
            stroke={hovered ? "rgba(255,127,28,0.7)" : "rgba(255,255,255,0.6)"}
            strokeWidth="2" strokeDasharray="113" strokeLinecap="round"
            style={{ animation: "clockSpin 0.65s ease forwards" }}
          />
        </svg>
      )}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "relative", zIndex: 1 }}>
        <path
          d={isNext ? "M3 8h10M9 5l3 3-3 3" : "M13 8H3M7 5l-3 3 3 3"}
          stroke={hovered ? "#FF7F1C" : "#fff"}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

const PlatformLivingServiceSection: FunctionComponent = () => {
  const [current, setCurrent] = useState(0);
  const [spinDir, setSpinDir] = useState<"prev" | "next" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = window.setInterval(() => {
      setSpinDir("next");
      transitionTimer = setTimeout(() => {
        setCurrent((value) => (value + 1) % N);
        setSpinDir(null);
      }, 650);
    }, 5000);
    return () => {
      window.clearInterval(interval);
      if (transitionTimer) clearTimeout(transitionTimer);
    };
  }, []);

  const navigate = (dir: "prev" | "next") => {
    if (spinDir) return;
    setSpinDir(dir);
    setTimeout(() => {
      setCurrent((c) => (dir === "next" ? (c + 1) % N : (c - 1 + N) % N));
      setSpinDir(null);
    }, 650);
  };

  const slide = SLIDES[current];

  return (
    <section className="sol-section sol-plat-living-section plat-living-section" style={{ position: "relative", overflow: "hidden" }}>
      <img src="/living-service-waves.png" alt="" aria-hidden
        style={{ position: "absolute", bottom: 0, left: 0, width: "50%", pointerEvents: "none", zIndex: 0 }}
      />

      <div className="plat-living-container" style={{ maxWidth: 1104, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Counter + Nav */}
        <div className="plat-living-nav" style={{ position: "absolute", top: 0, right: 24, display: "flex", alignItems: "center", gap: 12, zIndex: 20 }}>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 300, fontSize: 16, color: "#6F7276" }}>
            {slide.counter}
          </span>
          <NavButton dir="prev" spinning={spinDir === "prev"} onClick={() => navigate("prev")} />
          <NavButton dir="next" spinning={spinDir === "next"} onClick={() => navigate("next")} />
        </div>

        <div className="plat-living-row" style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
          {/* LEFT */}
          <div className="plat-living-left" style={{ width: "58%", flexShrink: 0 }}>
            <h2 className="sol-plat-living-heading">{TITLE}</h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#6F7276", fontSize: 16, lineHeight: "28px", marginBottom: 32, maxWidth: 380 }}>
              {BODY}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {FEATURES.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src="/living-service/feature-bullet.svg" alt="" width={31} height={18} style={{ objectFit: "contain", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", color: "#555", fontSize: 15 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Mobile-only: tab pills */}
            <div className="plat-living-mobile-tabs">
              {TABS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setCurrent(i)}
                  className={`plat-living-mobile-tab${i === current ? " plat-living-mobile-tab--active" : ""}`}
                >
                  <Image src={`/living-service/tab-${i + 1}.png`} alt="" width={28} height={14} style={{ objectFit: "contain", flexShrink: 0 }} />
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile-only: slide detail */}
            <div className="plat-living-mobile-slide">
              <p className="plat-living-mobile-detail">{slide.detail}</p>
              <div className="plat-living-mobile-bullets">
                {slide.bullets.map((b) => (
                  <span key={b} className="plat-living-mobile-bullet">› {b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — orbit wheel (desktop only) */}
          <div className="plat-living-right" style={{ flex: 1, position: "relative", marginTop: 40, marginLeft: -120 }}>
            <div style={{ position: "relative", width: 480, height: 480 }}>
              <img src="/living-service-circle.png" alt="" aria-hidden
                style={{ width: 480, height: 480, position: "absolute", inset: 0, pointerEvents: "none" }}
              />

              {/* Orbit tabs */}
              {TABS.map((label, i) => {
                const { x, y } = tabPos(i, current);
                const offset   = arcOffset(i, current);
                const isActive = offset === 0;
                return (
                  <div
                    key={label}
                    onClick={() => setCurrent(i)}
                    style={{
                      position: "absolute", left: x, top: y,
                      transform: "translate(-50%, -50%)",
                      transition: "left 0.65s cubic-bezier(0.4,0,0.2,1), top 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                      opacity: 1, zIndex: isActive ? 10 : 6, cursor: "pointer",
                    }}
                  >
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "10px 20px 10px 14px", borderRadius: 40,
                      border: `1px solid ${isActive ? "#FF7F1C" : "#E4E4E4"}`,
                      background: isActive ? "#FFF" : "rgba(255, 255, 255, 0.50)",
                      backdropFilter: isActive ? "none" : "blur(50px)",
                      WebkitBackdropFilter: isActive ? "none" : "blur(50px)",
                      whiteSpace: "nowrap", fontFamily: "Inter, sans-serif",
                      fontSize: 13, fontWeight: isActive ? 500 : 400,
                      color: isActive ? "#FF7F1C" : "#6F7276",
                      boxShadow: isActive ? "0 2px 14px rgba(255,127,28,0.18)" : "0 1px 6px rgba(0,0,0,0.06)",
                    }}>
                      <Image src={`/living-service/tab-${i + 1}.png`} alt="" width={40} height={20}
                        style={{ objectFit: "contain", flexShrink: 0, opacity: isActive ? 1 : 0.4 }}
                      />
                      {label}
                    </div>
                  </div>
                );
              })}

              {/* Detail text inside circle */}
              <div style={{ position: "absolute", left: CX - 16, top: CY - 100, width: 232, zIndex: 2 }}>
                <p style={{
                  fontFamily: "var(--font-tasa-orbiter)", color: "#000",
                  fontSize: 15, fontWeight: 500, lineHeight: "22px",
                  marginBottom: 12, width: "164%",
                }}>
                  {slide.detail}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "164%" }}>
                  {slide.bullets.map((b) => (
                    <span key={b} style={{
                      fontFamily: "Inter, sans-serif", color: "#555",
                      fontSize: 13, fontWeight: 300, lineHeight: "160%", display: "block",
                    }}>
                      › {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .plat-living-mobile-tabs,
        .plat-living-mobile-slide {
          display: none;
        }
        @media (max-width: 767px) {
          .plat-living-section {
            overflow: hidden;
          }
          .plat-living-nav {
            position: static !important;
            justify-content: flex-end;
            margin-bottom: 20px;
          }
          .plat-living-row {
            flex-direction: column !important;
          }
          .plat-living-left {
            width: 100% !important;
          }
          .plat-living-right {
            display: none;
          }
          .plat-living-mobile-tabs {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 28px;
          }
          .plat-living-mobile-tab {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 40px;
            border: 1.5px solid #E4E4E4;
            background: rgba(255,255,255,0.85);
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 400;
            color: #6F7276;
            cursor: pointer;
          }
          .plat-living-mobile-tab--active {
            border-color: #FF7F1C;
            color: #FF7F1C;
            font-weight: 500;
            box-shadow: 0 2px 14px rgba(255,127,28,0.18);
          }
          .plat-living-mobile-slide {
            display: block;
            margin-top: 24px;
            padding: 20px;
            border-radius: 16px;
            background: #fff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          }
          .plat-living-mobile-detail {
            font-family: var(--font-tasa-orbiter), sans-serif;
            font-size: 15px;
            font-weight: 500;
            line-height: 24px;
            color: #000;
            margin: 0 0 14px;
          }
          .plat-living-mobile-bullets {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .plat-living-mobile-bullet {
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 300;
            line-height: 160%;
            color: #555;
          }
        }
      `}</style>
    </section>
  );
};

export default PlatformLivingServiceSection;
