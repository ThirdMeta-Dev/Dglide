"use client";

import { FunctionComponent, useState, useRef } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  workflowChangeBullets,
  workflowChangeSubtitle,
  workflowChangeTitle,
  workflowTimelineItems,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

/* ─── Mobile arc carousel ────────────────────────────────────── */
type ArcPos = { l: number; t: number }; // left % + top px

function MobileArcCarousel({ items }: { items: typeof workflowTimelineItems }) {
  const N = items.length;
  const [active, setActive] = useState(0);
  const [drag,   setDrag]   = useState(0);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);

  const prevI     = (active - 1 + N) % N;
  const nextI     = (active + 1) % N;
  const farPrevI  = (active - 2 + N) % N;
  const farNextI  = (active + 2) % N;

  // Positions: l = left %, t = top px (icon center, stage = 240px)
  // Arc: M -80,-58 Q 180,450 440,-58 → bottom at (180,196), edges cross x=0/360 at y≈72
  const P: Record<string, ArcPos> = {
    FL: { l: -20, t: 48  },  // far left  (off-screen)
    L:  { l:   3, t: 73  },  // left peek — on arc at x≈11px
    A:  { l:  50, t: 196 },  // active — exact arc bottom
    R:  { l:  97, t: 73  },  // right peek — on arc at x≈349px
    FR: { l: 120, t: 48  },  // far right (off-screen)
  };

  const SNAP = 60;
  const t = Math.max(-1, Math.min(1, drag / SNAP));
  const lp = (a: ArcPos, b: ArcPos, u: number): ArcPos =>
    ({ l: a.l + (b.l - a.l) * u, t: a.t + (b.t - a.t) * u });

  const getPos = (i: number): ArcPos | null => {
    if (i === active) {
      if (t > 0) return lp(P.A, P.R, t);
      if (t < 0) return lp(P.A, P.L, -t);
      return P.A;
    }
    if (i === prevI) {
      if (t > 0) return lp(P.L, P.A, t);
      if (t < 0) return lp(P.L, P.FL, -t);
      return P.L;
    }
    if (i === nextI) {
      if (t < 0) return lp(P.R, P.A, -t);
      if (t > 0) return lp(P.R, P.FR, t);
      return P.R;
    }
    if (i === farPrevI && t > 0) return lp(P.FL, P.L, t);
    if (i === farNextI && t < 0) return lp(P.FR, P.R, -t);
    return null;
  };

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
    if (t >= 0.5)       setActive(prevI);
    else if (t <= -0.5) setActive(nextI);
    setDrag(0);
  };

  const goPrev = () => { setActive(prevI); setIsDown(false); setDrag(0); };
  const goNext = () => { setActive(nextI); setIsDown(false); setDrag(0); };

  const TR = isDown
    ? "none"
    : "left 0.38s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.25s";

  return (
    <div className="sol-wc-mobile">
      {/* Arc + icons */}
      <div
        className="sol-wc-arc-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Wide orange bowl arc — very wide bezier, enters stage high up */}
        <svg
          className="sol-wc-arc-svg"
          viewBox="0 0 360 240"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* P0=(-80,-58) P1=(180,450) P2=(440,-58) → bottom at (180,196), enters at y≈72 */}
          <path
            d="M -80,-58 Q 180,450 440,-58"
            stroke="#FF7F1C"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="180" cy="196" r="5" fill="#FF7F1C" />
        </svg>

        {/* Icons: side items show icon only, active shows icon only (text is below) */}
        {items.map((item, i) => {
          const pos = getPos(i);
          if (!pos) return null;
          const isAct = i === active;
          return (
            <div
              key={item.title}
              onClick={i === prevI ? goPrev : i === nextI ? goNext : undefined}
              style={{
                position: "absolute",
                left: `${pos.l}%`,
                top: pos.t,
                transform: "translate(-50%, -50%)",
                transition: TR,
                zIndex: isAct ? 10 : 5,
                opacity: isAct ? 1 : 0.6,
                cursor: !isAct ? "pointer" : "default",
                pointerEvents: !isAct ? "auto" : "none",
                width: "20vw",
                height: "auto",
              }}
            >
              <img
                src={item.icon}
                alt=""
                style={{ display: "block", width: "100%", height: "auto", maxWidth: "none" }}
              />
            </div>
          );
        })}
      </div>

      {/* Active title only — centered */}
      <div className="sol-wc-arc-labels">
        <span className="sol-wc-arc-label-active">{items[active].title}</span>
      </div>

      {/* Active description */}
      <p className="sol-wc-arc-desc">{items[active].description}</p>

      {/* Navigation — outline left, filled right */}
      <div className="sol-wc-arc-nav">
        <button onClick={goPrev} className="sol-wc-arc-btn sol-wc-arc-btn--prev" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 13.5L6.5 9L11 4.5" stroke="#FF7F1C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={goNext} className="sol-wc-arc-btn sol-wc-arc-btn--next" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4.5L11.5 9L7 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="sol-wc-arc-counter">{active + 1}/{N}</span>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────── */

type WorkflowChangeSectionProps = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  timelineItems?: typeof workflowTimelineItems;
  sectionId?: string;
};

const TickIcon = () => (
  <span className="sol-workflow-change-tick-icon-wrap" aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.005"
      height="12.762"
      viewBox="0 0 24 14"
      fill="none"
      aria-hidden
    >
      <path d="M4.92601 6.82574L9.4923 9.10898L18.6249 4.54251L22.2779 6.3691L9.4923 12.7622L1.27297 8.65233L4.92601 6.82574Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
    </svg>
  </span>
);

const WorkflowChangeSection: FunctionComponent<WorkflowChangeSectionProps> = ({
  title = workflowChangeTitle,
  subtitle = workflowChangeSubtitle,
  bullets = workflowChangeBullets,
  timelineItems = workflowTimelineItems,
  sectionId,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id={sectionId} className="sol-section sol-workflow-change-section">
      <SolutionsContainer>
        <div className="sol-workflow-change-inner">
          <ScrollReveal direction="left">
            <div className="sol-workflow-change-left">
              <div className="sol-workflow-change-intro">
                <h2 className="sol-workflow-change-heading">
                  {title}
                </h2>
                <p className="sol-workflow-change-subtitle">
                  {subtitle}
                </p>
              </div>

              <ul className="sol-workflow-change-bullets">
                {bullets.map((bullet) => (
                  <li key={bullet} className="sol-workflow-change-bullet">
                    <TickIcon />
                    <span className="sol-workflow-change-bullet-text">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Mobile arc carousel — hidden on desktop via CSS */}
          <MobileArcCarousel items={timelineItems} />

          <ScrollReveal direction="right">
            <div className="sol-workflow-change-track">
              <img
                src="/solutions/ellipse.svg"
                alt=""
                width={527}
                height={663}
                className="sol-workflow-change-arc"
                aria-hidden
              />

              <div className="sol-workflow-change-timeline">
                {timelineItems.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <div key={item.title} className="sol-workflow-change-row">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`sol-workflow-change-node sol-workflow-change-node-${index}${isActive ? " sol-workflow-change-node--active" : ""}`}
                        aria-label={item.title}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <img
                          src={item.icon}
                          alt=""
                          width={73}
                          height={40}
                          className="sol-workflow-change-node-icon"
                          aria-hidden
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`sol-workflow-change-item${isActive ? " sol-workflow-change-item--active" : ""}`}
                        style={{ width: item.width, maxWidth: "100%" }}
                        aria-expanded={isActive}
                      >
                        <div className="sol-workflow-change-item-content">
                          <span
                            className={`sol-workflow-change-item-title${isActive ? " sol-workflow-change-item-title--active" : ""}`}
                          >
                            {item.title}
                          </span>
                          {isActive && item.description && (
                            <p className="sol-workflow-change-item-description">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default WorkflowChangeSection;
