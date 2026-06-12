import { FunctionComponent } from "react";
import Image from "next/image";

/*
 * "One Platform. Multiple Operational Systems" — About Us page
 * Figma node 1118:1696 (1104x920 section frame)
 */

type Bullet = {
  text: string;
  /** stat bullets render in red (#FF0000 in Figma) */
  stat?: boolean;
};

type SolutionCard = {
  icon: string;
  title: string;
  desc: string;
  bullets: Bullet[];
  side: "left" | "right";
  /** fixed card height at desktop (px) */
  height: number;
  /** card background gradient (white fading toward the center hub) */
  gradient: string;
};

/* Reading order at desktop: left-top, right-top, left-bottom, right-bottom */
const LEFT_CARDS: SolutionCard[] = [
  {
    icon: "/about/multi-systems/icon-field-service.png",
    title: "Field Service Management",
    desc: "Schedule, dispatch, and track field jobs from request to closure, with full technician visibility.",
    bullets: [
      { text: "Schedule and dispatch in one view" },
      { text: "Track every job to closure" },
    ],
    side: "left",
    height: 308,
    gradient: "linear-gradient(107deg, #FFFFFF 0%, rgba(243, 243, 243, 0) 100%)",
  },
  {
    icon: "/about/multi-systems/icon-service-internal-ops.png",
    title: "Service & Internal Operations",
    desc: "Handle tickets, requests, and internal service workflows without things slipping through the cracks.",
    bullets: [
      { text: "0000+ Requests handled", stat: true },
      { text: "00% Resolved on time", stat: true },
    ],
    side: "left",
    height: 308,
    gradient: "linear-gradient(78deg, #FFFFFF 0%, rgba(243, 243, 243, 0) 100%)",
  },
];

const RIGHT_CARDS: SolutionCard[] = [
  {
    icon: "/about/multi-systems/icon-process-production.png",
    title: "Process & Production Workflows",
    desc: "Run multi-step production and operational processes with structured stages, approvals, and clean handoffs.",
    bullets: [
      { text: "Structured stages and approvals" },
      { text: "Clear handoffs between teams" },
    ],
    side: "right",
    height: 308,
    gradient: "linear-gradient(258deg, #FFFFFF 0%, rgba(243, 243, 243, 0) 100%)",
  },
  {
    icon: "/about/multi-systems/icon-field-sales.png",
    title: "Field Sales Execution",
    desc: "Track leads, visits, and follow-ups so field sales activity never goes dark.",
    bullets: [{ text: "Conversion Velocity +00%", stat: true }],
    side: "right",
    height: 282,
    gradient: "linear-gradient(284deg, #FFFFFF 0%, rgba(243, 243, 243, 0) 100%)",
  },
];

const CONNECTED_ITEMS = [
  "workflows",
  "forms",
  "approvals",
  "dashboards",
  "mobile access",
  "integrations",
];

/** Orange double-chevron marker used for bullets, stats and the bottom strip */
const BulletArrow: FunctionComponent = () => (
  <Image
    src="/about/multi-systems/bullet-arrow.svg"
    alt=""
    width={21}
    height={13}
    className="w-[21px] h-[13px] flex-shrink-0 object-contain"
    aria-hidden
  />
);

const Card: FunctionComponent<{ card: SolutionCard; fixedSize?: boolean }> = ({
  card,
  fixedSize,
}) => {
  const isRight = card.side === "right";
  return (
    <article
      className={`rounded-2xl px-7 py-6 flex flex-col justify-center ${
        fixedSize ? "w-[444px]" : "w-full max-w-[520px]"
      }`}
      style={{
        background: card.gradient,
        ...(fixedSize ? { height: card.height } : {}),
      }}
    >
      <div
        className={`flex flex-col gap-7 ${
          fixedSize && isRight ? "items-end" : "items-start"
        }`}
      >
        <Image
          src={card.icon}
          alt=""
          width={88}
          height={48}
          className="w-[88px] h-12 flex-shrink-0"
        />
        <div
          className={`flex flex-col gap-4 w-full ${
            fixedSize && isRight ? "items-end" : "items-start"
          }`}
        >
          <div className="flex flex-col gap-1.5 w-full">
            <h3
              className={`text-black text-[18px] leading-[26px] font-medium ${
                fixedSize && isRight ? "text-right" : "text-left"
              }`}
              style={{ fontFamily: "var(--font-tasa-orbiter)" }}
            >
              {card.title}
            </h3>
            <p
              className={`text-[#555555] text-[15px] leading-[26px] tracking-[0.2px] ${
                fixedSize && isRight ? "text-right" : "text-left"
              }`}
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {card.desc}
            </p>
          </div>
          <div
            className={`flex flex-col gap-0.5 ${
              fixedSize && isRight ? "items-end" : "items-start"
            }`}
          >
            {card.bullets.map((b) => (
              <div
                key={b.text}
                className={`flex items-center gap-3 ${
                  fixedSize && isRight ? "flex-row-reverse" : ""
                }`}
              >
                <BulletArrow />
                <span
                  className={`text-[15px] leading-[28px] ${
                    b.stat ? "text-[#FF0000]" : "text-[#555555]"
                  } ${fixedSize && isRight ? "text-right" : "text-left"}`}
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const CenterHub: FunctionComponent<{ fixedSize?: boolean }> = ({ fixedSize }) => (
  <Image
    src="/about/multi-systems/center-platform.png"
    alt="Dglide Platform — your system adapts to how you work, start with a working"
    width={944}
    height={910}
    className={
      fixedSize ? "w-[472px] h-[455px]" : "w-full max-w-[420px] h-auto"
    }
  />
);

const AUMultiSystemsSection: FunctionComponent = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col items-center gap-12 xl:gap-[60px]">
        {/* ---------- Heading + subtitle ---------- */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-center text-[36px] leading-[44px] md:text-[48px] md:leading-[60px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(0deg, #000000 0%, #FF7F1C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            One Platform. Multiple Operational Systems
          </h2>
          <p
            className="text-center text-[#6F7276] text-[16px] leading-[28px] tracking-[0.2px]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Run different parts of your operations on one backbone.
          </p>
        </div>

        {/* ---------- Content: cards + connected strip ---------- */}
        <div className="relative w-full flex flex-col gap-8 xl:gap-12">
          {/* Light panel behind the lower cards / strip (1200x123, Figma Rectangle 18619) */}
          <div
            aria-hidden
            className="hidden xl:block absolute -left-12 -right-12 top-[606px] h-[123px] rounded-b-[40px] z-0"
            style={{
              background: "linear-gradient(0deg, #FFFFFF 0%, #F3F3F3 100%)",
            }}
          />

          {/* Cards diagram — pixel-perfect absolute layout at xl+ (1104x648 stage) */}
          <div className="hidden xl:block relative w-[1104px] h-[648px] mx-auto">
            {/* Right column (lowest layer in Figma) */}
            <div className="absolute right-0 top-0 z-[1] flex flex-col items-end gap-8">
              {RIGHT_CARDS.map((card) => (
                <Card key={card.title} card={card} fixedSize />
              ))}
            </div>
            {/* Center hub illustration */}
            <div className="absolute left-[316px] top-[97px] z-[2]">
              <CenterHub fixedSize />
            </div>
            {/* Left column (top layer in Figma) */}
            <div className="absolute left-0 top-0 z-[3] flex flex-col gap-8">
              {LEFT_CARDS.map((card) => (
                <Card key={card.title} card={card} fixedSize />
              ))}
            </div>
          </div>

          {/* Cards diagram — stacked below xl */}
          <div className="xl:hidden flex flex-col items-center gap-6">
            <CenterHub />
            {[LEFT_CARDS[0], RIGHT_CARDS[0], LEFT_CARDS[1], RIGHT_CARDS[1]].map(
              (card) => (
                <Card key={card.title} card={card} />
              )
            )}
          </div>

          {/* "All Connected By" strip */}
          <div className="relative z-[1] w-full rounded-[40px] bg-[#F3F3F3] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] px-6 md:px-8 py-3 xl:h-[60px] flex flex-wrap items-center justify-center xl:justify-between gap-x-6 gap-y-2">
            <span
              className="text-[#FF7F1C] text-[18px] leading-[26px] font-medium"
              style={{ fontFamily: "var(--font-tasa-orbiter)" }}
            >
              All Connected By:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {CONNECTED_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <BulletArrow />
                  <span
                    className="text-black text-[15px] leading-[26px] font-normal"
                    style={{ fontFamily: "var(--font-tasa-orbiter)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AUMultiSystemsSection;
