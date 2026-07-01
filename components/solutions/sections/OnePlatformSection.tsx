"use client";

import { FunctionComponent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformOrbitItems,
  platformWorkflowFeatures,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden className="sol-platform-feature-tick-icon">
    <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.5036L9.4923 8.78683L18.6249 4.22037L22.2779 6.04695L9.4923 12.44L1.27297 8.33019L4.92601 6.5036Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.85883L9.4923 8.14206L18.6249 3.57559L22.2779 5.40218L9.4923 11.7952L1.27297 7.68541L4.92601 5.85883Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);

const FeatureIcon = () => (
  <span className="sol-platform-feature-icon-wrap" aria-hidden>
    <TickIcon />
  </span>
);


/* ─── Mobile draggable orbit ─────────────────────────────────── */
type OrbitItem = {
  id: string; label: string; icon: string; description: string;
};

function MobileOrbit({ items }: { items: OrbitItem[] }) {
  const N = items.length;

  // Fixed pill center positions
  const SFL = { x: -180, y: 148 }; // far-left  (off screen)
  const SL  = { x:   20, y: 148 }; // left peek
  const SA  = { x:  180, y: 270 }; // active — bottom center
  const SR  = { x:  340, y: 148 }; // right peek
  const SFR = { x:  540, y: 148 }; // far-right (off screen)

  const lerp = (a: {x:number;y:number}, b: {x:number;y:number}, u: number) =>
    ({ x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u });

  const [active, setActive] = useState(1);
  const [drag,   setDrag]   = useState(0);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);

  const rightI    = (active + 1) % N;
  const leftI     = (active - 1 + N) % N;
  const farRightI = (active + 2) % N;
  const farLeftI  = (active - 2 + N) % N;

  // t: normalised drag. t<0 → drag left (next/right item comes in). t>0 → drag right (prev/left item comes in).
  const t = Math.max(-1, Math.min(1, drag / 70));

  const getPillPos = (i: number) => {
    if (i === active) {
      if (t < 0) return lerp(SA, SL, -t);  // drag left  → active slides left
      if (t > 0) return lerp(SA, SR, t);   // drag right → active slides right
      return SA;
    }
    if (i === rightI) {
      if (t < 0) return lerp(SR, SA, -t);  // drag left  → right slides to center
      if (t > 0) return lerp(SR, SFR, t);  // drag right → right exits right
      return SR;
    }
    if (i === leftI) {
      if (t > 0) return lerp(SL, SA, t);   // drag right → left slides to center
      if (t < 0) return lerp(SL, SFL, -t); // drag left  → left exits left
      return SL;
    }
    if (i === farRightI && t < 0) return lerp(SFR, SR, -t); // slides in from right
    if (i === farLeftI  && t > 0) return lerp(SFL, SL, t);  // slides in from left
    return t >= 0 ? SFR : SFL;
  };

  const isVisible = (i: number) =>
    i === active || i === leftI || i === rightI ||
    (i === farRightI && t < 0) || (i === farLeftI && t > 0);

  const goNext = () => { setActive((active + 1) % N); setDrag(0); setIsDown(false); };
  const goPrev = () => { setActive((active - 1 + N) % N); setDrag(0); setIsDown(false); };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDown(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setDrag(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    setIsDown(false);
    if (t <= -0.5) goNext();
    else if (t >= 0.5) goPrev();
    else setDrag(0);
  };

  const activeItem = items[active];
  const TR = isDown
    ? "none"
    : "left 0.4s cubic-bezier(0.4,0,0.2,1), top 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s";

  return (
    <div className="sol-mobile-orbit-root">
      {/* Orbit + pills + active card (all in one container) */}
      <div
        style={{ position: "relative", width: "100%", height: 456, overflow: "hidden", touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Platform circle image */}
        <img
          src="/solutions/platform-center-v2.png"
          alt=""
          style={{
            position: "absolute", left: 180, top: 148,
            width: 248, height: 248,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", zIndex: 1,
          }}
        />

        {/* Pills — only left & right (active is shown via card only) */}
        {items.map((item, i) => {
          if (!isVisible(i)) return null;
          const isAct = i === active;
          if (isAct) return null; // active item shown in card, not as pill
          const pos   = getPillPos(i);
          const isL   = i === leftI;
          const isR   = i === rightI;
          const op    = (isL || isR) ? 0.72 : 0.45;

          return (
            <div
              key={item.id}
              onClick={isL ? goPrev : isR ? goNext : undefined}
              style={{
                position: "absolute",
                left: pos.x, top: pos.y,
                transform: "translate(-50%, -50%)",
                transition: TR,
                zIndex: 5,
                opacity: op,
                cursor: (isL || isR) ? "pointer" : "default",
                pointerEvents: (isL || isR) ? "auto" : "none",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 14px 6px 10px",
                borderRadius: 30,
                background: "#fff",
                border: "1.5px solid #E4E4E4",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                whiteSpace: "nowrap",
              }}>
                <img src={item.icon} alt="" width={40} height={22}
                  style={{ objectFit: "contain", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 12, fontWeight: 400,
                  color: "#333",
                }}>
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Active content card — positioned on orbit where pill was */}
        <div style={{
          position: "absolute",
          top: 250, left: 16, right: 16,
          padding: "16px 20px 20px",
          background: "#fff",
          border: "1px solid #FF7F1C",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(15,23,42,0.06)",
          zIndex: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <img src={activeItem.icon} alt="" width={73} height={40}
              style={{ objectFit: "contain", flexShrink: 0 }} />
            <h3 style={{
              margin: 0, fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 16, fontWeight: 500, color: "#FF7F1C",
            }}>
              {activeItem.label}
            </h3>
          </div>
          <p style={{
            margin: 0, fontFamily: "Inter, sans-serif",
            fontSize: 15, color: "#545454", lineHeight: "24px",
          }}>
            {activeItem.description}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setDrag(0); }}
            style={{
              width: i === active ? 28 : 20, height: 4,
              borderRadius: 2, border: "none", cursor: "pointer", padding: 0,
              background: i === active ? "#FF7F1C" : "#D9D9D9",
              transition: "width 0.25s, background 0.2s",
            }}
            aria-label={items[i].label}
          />
        ))}
      </div>
    </div>
  );
}
/* ────────────────────────────────────────────────────────────── */

type OnePlatformSectionProps = {
  heading?: string;
  description?: string;
  features?: string[];
  orbitItems?: typeof platformOrbitItems;
  footerText?: string;
  ctaLabel?: string;
};

const OnePlatformSection: FunctionComponent<OnePlatformSectionProps> = ({
  heading = "One Platform. Your Whole Service Workflow.",
  description = "DGlide ITSM connects every step of a request, from the moment it arrives to the moment it's resolved, in one flow.",
  features = platformWorkflowFeatures,
  orbitItems = platformOrbitItems,
  footerText = "Every workflow can be configured around how your service team actually operates.",
  ctaLabel = "Book A Demo",
}) => {
  const router = useRouter();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);
  const [mobileActiveId, setMobileActiveId] = useState<string>(orbitItems[1]?.id ?? orbitItems[0]?.id);

  const openNodeId = pinnedNodeId ?? activeNodeId;

  const handleNodeClick = (id: string) => {
    setPinnedNodeId((current) => (current === id ? null : id));
    setMobileActiveId(id);
  };

  const mobileActiveItem = orbitItems.find((i) => i.id === mobileActiveId) ?? orbitItems[0];

  return (
    <section id="what-fsm-does" className="sol-section sol-platform-section">
      <SolutionsContainer>
        <div className="sol-platform-inner">
          <div className="sol-platform-main">
            <div className="sol-platform-content">
              <header className="sol-platform-header">
                <ScrollReveal direction="up">
                  <h2 className="sol-platform-heading">
                    {heading}
                  </h2>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                  <p className="sol-platform-description">
                    {description}
                  </p>
                </ScrollReveal>
              </header>

              <div className="sol-platform-body">
                <ScrollReveal direction="up" delay={0.15}>
                  <ul className="sol-platform-features">
                    {features.map((label, index) => (
                      <li key={`${label}-${index}`} className="sol-platform-feature">
                        <FeatureIcon />
                        <span className="sol-platform-feature-text">{label}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                {/* Mobile draggable orbit — hidden on desktop via CSS */}
                <MobileOrbit items={orbitItems} />

                <div className="sol-platform-orbit-wrap" style={{ position: "relative" }}>
                  <div
                    className="sol-platform-orbit"
                    onMouseLeave={() => setActiveNodeId(null)}
                  >
                    <img
                      src="/solutions/platform-center-v2.png"
                      alt=""
                      className="sol-platform-orbit-diagram"
                      width={431}
                      height={431}
                      aria-hidden
                    />

                    {orbitItems.map((item) => {
                      const isOpen = openNodeId === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`sol-platform-node ${
                            isOpen ? "sol-platform-node--open" : ""
                          }`}
                          style={{ left: item.left, top: item.top }}
                          onMouseEnter={() => setActiveNodeId(item.id)}
                        >
                          {isOpen ? (
                            <button
                              type="button"
                              className="sol-platform-node-card"
                              onClick={() => handleNodeClick(item.id)}
                              aria-expanded
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="sol-platform-node-card-icon"
                                width={73}
                                height={40}
                                aria-hidden
                              />
                              <div className="sol-platform-node-card-body">
                                <h3 className="sol-platform-node-card-title">
                                  {item.label}
                                </h3>
                                <p className="sol-platform-node-card-description">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={`sol-platform-node-pill sol-platform-node-pill--icon-${item.iconSide}${mobileActiveId === item.id ? " sol-platform-node-pill--mobile-active" : ""}`}
                              aria-expanded={false}
                              onClick={() => handleNodeClick(item.id)}
                            >
                              {item.iconSide === "right" ? (
                                <>
                                  <span className="sol-platform-node-pill-label">
                                    {item.label}
                                  </span>
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="sol-platform-node-pill-icon"
                                    width={73}
                                    height={40}
                                    aria-hidden
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="sol-platform-node-pill-icon"
                                    width={73}
                                    height={40}
                                    aria-hidden
                                  />
                                  <span className="sol-platform-node-pill-label">
                                    {item.label}
                                  </span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="sol-platform-footer">
            <p className="sol-platform-footer-text">
              {footerText}
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              {ctaLabel}
            </SolutionsButton>
          </footer>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default OnePlatformSection;
