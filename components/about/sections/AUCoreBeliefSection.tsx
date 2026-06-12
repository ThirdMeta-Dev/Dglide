import Image from "next/image";

/* ------------------------------------------------------------------ */
/* "About Us" page — Our Core Belief section.                          */
/* Figma node 1118:1528 (file 3llVZUXUn7Ozs0e9784LCF).                 */
/*                                                                     */
/* Gradient heading + statement, three pillar cards (outer cards       */
/* dropped 32px) over a decorative stack of three blurred arch         */
/* shapes peeking out behind the middle card.                          */
/* ------------------------------------------------------------------ */

const ASSET = "/about/core-belief";

type Pillar = {
  icon: string;
  title: string;
  body: string;
  /* content alignment mirrors toward the center card (left / center / right) */
  align: string;
  text: string;
  /* outer cards are pushed down 32px on desktop — Frames 1618876724/723 */
  dropped: boolean;
};

const PILLARS: Pillar[] = [
  {
    icon: `${ASSET}/icon-workflow-awareness.png`,
    title: "Workflow Awareness",
    body: "Software should understand how your operation runs, then shape itself around it. Not the other way around.",
    align: "lg:items-start",
    text: "lg:text-left",
    dropped: true,
  },
  {
    icon: `${ASSET}/icon-team-support.png`,
    title: "Team Support",
    body: "Real people stay with you after go-live. You get a partner, not a vendor that ships and disappears.",
    align: "lg:items-center",
    text: "lg:text-center",
    dropped: false,
  },
  {
    icon: `${ASSET}/icon-continuous-evolution.png`,
    title: "Continuous Evolution",
    body: "Your business keeps changing, so your software should too. DGlide keeps adapting after go-live, with no rebuild.",
    align: "lg:items-end",
    text: "lg:text-right",
    dropped: true,
  },
];

/* Decorative arches — Group 1321316353 (x, y, w, h, top stop color) */
const ARCHES: Array<[number, number, number, number, string]> = [
  [0, 0, 648, 229, "#E5E6F2"],
  [30, 18, 588, 207, "#E5E6F2"],
  [51, 37, 546, 192, "#D8D9E9"],
];

export default function AUCoreBeliefSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col items-center gap-12">
        {/* ---------- Heading + statement — Frame 1618876717 ---------- */}
        <div className="flex flex-col items-center gap-4 max-w-[624px]">
          <h2
            className="text-center text-[36px] leading-[44px] md:text-[48px] md:leading-[58px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(0deg, #000000 0%, #FF7F1C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Core Belief
          </h2>
          <p
            className="text-center text-[#6F7276] text-[16px] leading-[27px] tracking-[0.2px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Businesses should not have to reshape their operations just to fit
            software.
          </p>
        </div>

        {/* ---------- Cards over decorative arches — Frame 1618876627 ---------- */}
        <div className="relative w-full max-w-[1104px]">
          {/* Blurred arch stack behind the middle card (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[648px] h-[229px] pointer-events-none"
          >
            {ARCHES.map(([x, y, w, h, top]) => (
              <div
                key={`${x}-${y}`}
                className="absolute rounded-t-[1000px] backdrop-blur-[60px]"
                style={{
                  left: x,
                  top: y,
                  width: w,
                  height: h,
                  background: `linear-gradient(180deg, ${top} 0%, #F3F3F3 100%)`,
                }}
              />
            ))}
          </div>

          {/* Card row — Frame 1618876669 */}
          <div className="relative flex flex-col lg:flex-row items-stretch lg:items-start gap-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={`flex-1 rounded-[16px] border border-white pt-12 px-7 pb-6 ${
                  pillar.dropped ? "lg:mt-8" : ""
                }`}
                style={{
                  background: "linear-gradient(to left, #FFFFFF 0%, #F6F6F6 100%)",
                }}
              >
                <div
                  className={`flex flex-col items-start gap-8 ${pillar.align}`}
                >
                  <Image
                    src={pillar.icon}
                    alt=""
                    width={88}
                    height={48}
                    className="w-[88px] h-[48px] flex-shrink-0"
                  />
                  <div className="flex flex-col gap-0.5 w-full">
                    <h3
                      className={`text-black text-[18px] leading-[26px] text-left ${pillar.text}`}
                      style={{
                        fontFamily: "var(--font-tasa-orbiter)",
                        fontWeight: 500,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-[#6F7276] text-[16px] leading-[27px] tracking-[0.2px] text-left ${pillar.text}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
