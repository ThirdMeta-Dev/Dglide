import Image from "next/image";

/*
 * "Why We Think Differently" — About Us page
 * Figma node 1118:1850 (1200x410 desktop frame, 1104px content)
 */

/* Card surface shared by all four feature cards */
const cardBg = "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)";

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: "/about/think-differently/icon-ready-before-customized.png",
    title: "Ready Before It Is Customized",
    body: "Start with a working system, then tailor it to how you operate. No blank slate, no months of waiting.",
  },
  {
    icon: "/about/think-differently/icon-built-around-workflows.png",
    title: "Built Around Real Workflows",
    body: "DGlide runs the process you already have, instead of forcing your team into someone else's template.",
  },
  {
    icon: "/about/think-differently/icon-designed-to-change.png",
    title: "Designed to Change After Go-Live",
    body: "Your system keeps changing with your operation, on the live setup, with no rebuild and no new project.",
  },
  {
    icon: "/about/think-differently/icon-lower-burden.png",
    title: "Lower Burden Than Custom Build",
    body: "You get custom-level fit without owning code, a dev team, or the maintenance a build demands.",
  },
];

export default function AUThinkDifferentlySection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col gap-12">
        {/* ---------- Header row: heading left, note right ---------- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-[73px]">
          <h2
            className="flex-1 text-[36px] leading-[44px] md:text-[48px] md:leading-[60px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 76.87%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why We Think Differently
          </h2>
          <p
            className="md:w-[228px] md:flex-shrink-0 md:text-right text-[15px] leading-[26px] tracking-[0.2px] text-[#555555]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Most software forces a trade-off between ready and right. DGlide is
            built to avoid it.
          </p>
        </div>

        {/* ---------- 2x2 feature card grid ---------- */}
        <div className="relative">
          {/* Decorative radial glow behind the cards (Ellipse 470) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-[452px] top-[31px] w-[200px] h-[222px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white px-7 py-6"
                style={{ background: cardBg }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={73}
                    height={40}
                    className="w-[73px] h-[40px] flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <h3
                      className="text-black text-[18px] leading-[26px] font-medium"
                      style={{ fontFamily: "var(--font-tasa-orbiter)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-[#555555] text-[15px] leading-[26px] tracking-[0.2px]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {feature.body}
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
