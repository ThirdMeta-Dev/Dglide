"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

/* ------------------------------------------------------------------ */
/* Data — exact strings + geometry from Figma node 1118:2187           */
/* ------------------------------------------------------------------ */

const HEADING = "Our Journey Toward Better Software";
const SUBTEXT =
  "DGlide is built by a team focused on operations, workflow systems, product engineering, and customer implementation.";

type Milestone = {
  title: string;
  desc: string;
  icon: string;
  /* Stage coordinates (1200x321 stage, from Figma, rel. to section) */
  iconX: number; // icon frame is 88x48
  iconY: number;
  cardX: number; // inactive card x (w=199, y=227)
  activeX: number; // active card x (w=380)
  activeY: number; // active card y (Figma: 152 for the drawn active state)
};

const MILESTONES: Milestone[] = [
  {
    title: "Where It Started",
    desc: "We began by solving messy, real-world operations that off-the-shelf software could not fit.",
    icon: "/about/journey/icon-where-it-started.png",
    iconX: 16,
    iconY: 146,
    cardX: 16,
    activeX: 16,
    activeY: 218,
  },
  {
    title: "The Platform Foundation",
    desc: "We built one shared, configurable backbone for operational workflows, instead of one-off tools.",
    icon: "/about/journey/icon-platform-foundation.png",
    iconX: 455,
    iconY: 80,
    cardX: 400,
    activeX: 241,
    activeY: 152,
  },
  {
    title: "Packaged Solution Systems",
    desc: "On that backbone, we packaged ready-to-run systems for field service, sales, service, and process.",
    icon: "/about/journey/icon-packaged-solution-systems.png",
    iconX: 804,
    iconY: 152,
    /* cardX=621 ensures this card clears card1's active right edge (241+380=621)
       and card3 (1001) clears this card's active right edge (621+380=1001). */
    cardX: 621,
    activeX: 580,
    activeY: 224,
  },
  {
    title: "Living Service Model",
    desc: "We made continuous adaptation to the model, so your system keeps fitting long after go-live.",
    icon: "/about/journey/icon-living-service-model.png",
    iconX: 1115,
    iconY: 165,
    cardX: 1001,
    activeX: 820,
    activeY: 227,
  },
];

/* Wave trail centerline — exact geometry from Figma strokeGeometry of
   Vector 6804 (gray, 1px #EAEAEA) / Vector 6805 (orange, 2px #FF7F1C,
   same curve truncated at x=733 in the drawn snapshot). */
const WAVE_D =
  "M0.172 129.726L63.404 106.587C253.266 37.109 459.722 26.774 655.574 76.944L802.918 114.688C932.996 148.009 1068.69 153.136 1200.91 129.726";

const STAGE_W = 1200;
const STAGE_H = 385;
/* Fill passes a milestone's icon center -> that milestone becomes active.
   Icon centers: 60 / 354 / 848 / 1159. (Figma snapshot: fill ends at
   x=733 with milestone 2 active -> 354 <= 733 < 848.) */
const THRESHOLDS = [499, 848, 1159]; // icon centers: card1=499, card2=848, card3=1159
/* Trail is fully filled at 85% of the pinned scroll so the final state
   has room to breathe before the pin releases. */
const FILL_END = 0.85;

const CARD_FILL = "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)";
const ACTIVE_BORDER = "linear-gradient(180deg, #FF7F1C 0%, #F3F3F3 100%)";
const INACTIVE_BORDER = "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* Even-spaced inactive positions for each active state.
   Cards always stay in natural left-to-right order — no swapping.
   CARD_X[activeIdx][cardIdx]

   State 0 — card0 active (16–396): 804px remaining / 3 cards → ~52px gaps
   State 1 — card1 active (241–621): card0 centred in 241px left; cards 2+3 evenly in 579px right
   State 2 — card2 active (621–1001): cards 0+1 evenly in 621px left; card3 flush at 1001
   State 3 — card3 active (820–1200): cards 0+1+2 evenly in 820px left
*/
const CARD_X: Record<number, number[]> = {
  0: [ 16,  448,  699,  950],
  1: [ 21,  241,  681,  940],
  2: [ 61,  321,  580, 1001],
  3: [ 56,  311,  566,  820],
};


/* ------------------------------------------------------------------ */

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function AUJourneySection() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const fillRectRef = useRef<SVGRectElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const activeRef = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      const fillX = clamp(p / FILL_END, 0, 1) * STAGE_W;
      // Drive the trail fill directly (no re-render needed)
      fillRectRef.current?.setAttribute("width", String(fillX));
      let idx = 0;
      for (const t of THRESHOLDS) if (fillX >= t) idx += 1;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIdx(idx);
      }
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      setScale(Math.min(1, (window.innerWidth - 48) / STAGE_W));
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative w-full lg:h-[300vh]">
      {/* Pinned viewport-height container (lg+). Below lg the section is
          a normal static block that stacks vertically. */}
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:items-center lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* ---------- Header — Figma frame 1118:2188 ---------- */}
          <div className="flex flex-col gap-5 px-5 lg:px-0">
            {/* Heading — TASA Orbiter 400, 44/50, vertical gradient
                black (bottom) -> #FF7F1C (top) */}
            <ScrollReveal direction="up">
            <h2
              className="bg-clip-text text-center text-[32px] leading-[1.15] text-transparent lg:text-right lg:text-[44px] lg:leading-[50px]"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                backgroundImage:
                  "linear-gradient(to top, #000000 12.07%, #FF7F1C 87.93%)",
              }}
            >
              {HEADING}
            </h2>
            </ScrollReveal>
            {/* Subtext — Inter 400, 16/26, +0.2px, #555, right-aligned */}
            <p
              className="w-full text-left text-base leading-[26px] text-[#555555] lg:w-[429px] lg:self-end lg:text-right"
              style={{
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.2px",
              }}
            >
              {SUBTEXT}
            </p>
          </div>

          {/* ---------- Desktop: scroll-driven timeline stage ---------- */}
          <div
            className="mt-2 hidden lg:block"
            style={{ height: STAGE_H * scale }}
          >
            <div
              className="relative left-1/2 overflow-hidden"
              style={{
                width: STAGE_W,
                height: STAGE_H,
                transform: `translateX(-50%) scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              {/* Wave trail — gray base + orange progress fill */}
              <svg
                viewBox="0 0 1200 166"
                width={1200}
                height={166}
                fill="none"
                className="absolute left-0 top-0"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="au-journey-fill">
                    <rect
                      ref={fillRectRef}
                      x="0"
                      y="0"
                      width="0"
                      height="166"
                    />
                  </clipPath>
                </defs>
                <path d={WAVE_D} stroke="#EAEAEA" strokeWidth="1" />
                <g clipPath="url(#au-journey-fill)">
                  <path d={WAVE_D} stroke="#FF7F1C" strokeWidth="2" />
                </g>
              </svg>

              {/* Milestone icons — follow their card when inactive, stay on curve when active */}
              {MILESTONES.map((m, i) => {
                const active = i === activeIdx;
                const cardLeft = active ? m.activeX : (CARD_X[activeIdx]?.[i] ?? m.cardX);
                const iconLeft = active ? m.iconX : cardLeft + 55;
                return (
                  <Image
                    key={m.title}
                    src={m.icon}
                    alt=""
                    width={88}
                    height={48}
                    className="absolute"
                    style={{
                      left: iconLeft,
                      top: m.iconY,
                      transition: `left 0.6s ${EASE}`,
                    }}
                  />
                );
              })}

              {/* Milestone cards */}
              {MILESTONES.map((m, i) => {
                const active = i === activeIdx;
                return (
                  <div
                    key={m.title}
                    className="absolute rounded-2xl p-6"
                    style={{
                      left: active ? m.activeX : (CARD_X[activeIdx]?.[i] ?? m.cardX),
                      top: active ? m.activeY : 227,
                      width: active ? 380 : 199,
                      zIndex: active ? 20 : 10,
                      border: "1px solid transparent",
                      background: `${CARD_FILL} padding-box, ${
                        active ? ACTIVE_BORDER : INACTIVE_BORDER
                      } border-box`,
                      transition: `left 0.6s ${EASE}, top 0.6s ${EASE}, width 0.6s ${EASE}`,
                    }}
                  >
                    <h3
                      className="text-base leading-[23px]"
                      style={{
                        fontFamily: "var(--font-tasa-orbiter)",
                        fontWeight: 500,
                        color: active ? "#FF7F1C" : "#000000",
                        transition: "color 0.4s ease",
                      }}
                    >
                      {m.title}
                    </h3>
                    {m.desc ? (
                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: active ? 96 : 0,
                          opacity: active ? 1 : 0,
                          transition: `max-height 0.6s ${EASE}, opacity 0.4s ease`,
                        }}
                      >
                        <p
                          className="pt-1.5 text-[15px] leading-[25px] text-[#555555]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            letterSpacing: "0.2px",
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- Mobile / tablet: static vertical stack ---------- */}
          <StaggerReveal className="mt-10 flex flex-col gap-8 px-5 pb-4 lg:hidden">
            {MILESTONES.map((m, i) => {
              const highlighted = i === 0;
              return (
                <StaggerItem key={m.title}>
                <div className="flex flex-col gap-3">
                  <Image src={m.icon} alt="" width={88} height={48} />
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      border: "1px solid transparent",
                      background: `${CARD_FILL} padding-box, ${
                        highlighted ? ACTIVE_BORDER : INACTIVE_BORDER
                      } border-box`,
                    }}
                  >
                    <h3
                      className="text-base leading-[23px]"
                      style={{
                        fontFamily: "var(--font-tasa-orbiter)",
                        fontWeight: 500,
                        color: highlighted ? "#FF7F1C" : "#000000",
                      }}
                    >
                      {m.title}
                    </h3>
                    {m.desc ? (
                      <p
                        className="pt-1.5 text-[15px] leading-[25px] text-[#555555]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          letterSpacing: "0.2px",
                        }}
                      >
                        {m.desc}
                      </p>
                    ) : null}
                  </div>
                </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
