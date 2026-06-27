import Image from "next/image";

/* Card surface shared by all four feature cards */
const cardBg = "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)";

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: "/why-dglide/operations-run/icon-ready-before-customized.png",
    title: "Ready Before It Is Customized",
    body: "You start with a working operational system, then shape it to fit. No blank canvas, no long build.",
  },
  {
    icon: "/why-dglide/operations-run/icon-built-around-workflow.png",
    title: "Built Around Your Workflow",
    body: "Your workflows, roles, and approvals shape the system. It runs your operation, not someone else's template.",
  },
  {
    icon: "/why-dglide/operations-run/icon-designed-to-change.png",
    title: "Designed to Change After Go-Live",
    body: "Your business keeps moving. Through the Living Service Model, the system keeps fitting without a fresh project.",
  },
  {
    icon: "/why-dglide/operations-run/icon-lower-burden.png",
    title: "Lower Burden Than Custom Build",
    body: "You get custom-level fit without owning the code, hiring a dev team, or maintaining it forever.",
  },
];

/* Icon + title + body row, identical inside every card */
function FeatureContent({ feature }: { feature: Feature }) {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={feature.icon}
        alt=""
        width={88}
        height={48}
        className="w-[88px] h-[48px] flex-shrink-0"
      />
      <div className="flex flex-col gap-2">
        <h3
          className="[font-family:var(--font-tasa-orbiter)]"
          style={{ fontSize: "18px", fontWeight: 500, lineHeight: "26px", color: "#000000" }}
        >
          {feature.title}
        </h3>
        <p
          className="[font-family:var(--font-inter)]"
          style={{ fontSize: "15px", fontWeight: 400, lineHeight: "26px", letterSpacing: "0.2px", color: "#555555" }}
        >
          {feature.body}
        </p>
      </div>
    </div>
  );
}

export default function WDOperationsRunSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Heading */}
        <h2
          className="[font-family:var(--font-tasa-orbiter)] max-w-[664px] text-[28px] leading-[1.3] md:text-[36px] md:leading-[1.25] lg:text-[48px] lg:leading-[60px]"
          style={{
            fontWeight: 400,
            background: "linear-gradient(90deg, #FF7F1C 0%, #000000 23.69%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Built for How Operations Actually Run
        </h2>

        {/* Content: image + stacked feature cards */}
        <div className="mt-8 lg:-mt-5 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-end">
          {/* Left: product visual, bottom-aligned to the card column */}
          <div
            className="flex-shrink-0 w-full lg:w-[448px] rounded-2xl overflow-hidden border border-white"
            style={{ boxShadow: "4px 4px 0 0 #E0E0E0" }}
          >
            <Image
              src="/why-dglide/operations-run/operations-system.png"
              alt="DGlide live operational system being customized"
              width={1202}
              height={1309}
              className="w-full h-auto lg:w-[448px] lg:h-[488px] object-cover"
            />
          </div>

          {/* Right: two groups of overlapping cards */}
          <div className="w-full lg:w-[608px] flex flex-col gap-4">
            {/* Group 1: back card peeks above front card */}
            <div className="flex flex-col">
              {/* Back card — Ready Before It Is Customized */}
              <div
                className="ml-6 rounded-2xl border border-white"
                style={{ background: cardBg, padding: "24px 28px 48px 28px" }}
              >
                <FeatureContent feature={FEATURES[0]} />
              </div>
              {/* Front card — Built Around Your Workflow */}
              <div
                className="-mt-5 rounded-2xl"
                style={{ background: cardBg, boxShadow: "0 0 0 6px #F3F3F3", padding: "24px 28px" }}
              >
                <FeatureContent feature={FEATURES[1]} />
              </div>
            </div>

            {/* Group 2: back card peeks below front card */}
            <div className="flex flex-col">
              {/* Front card — Designed to Change After Go-Live */}
              <div
                className="relative z-[1] rounded-2xl"
                style={{ background: cardBg, boxShadow: "0 0 0 6px #F3F3F3", padding: "24px 28px" }}
              >
                <FeatureContent feature={FEATURES[2]} />
              </div>
              {/* Back card — Lower Burden Than Custom Build */}
              <div
                className="-mt-5 ml-6 rounded-2xl border border-white"
                style={{ background: cardBg, padding: "48px 28px 24px 28px" }}
              >
                <FeatureContent feature={FEATURES[3]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
