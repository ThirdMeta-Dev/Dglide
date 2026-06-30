import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

/**
 * "Why DGlide" page — Custom-Level Fit section.
 * Figma node 1099:564 (file 3llVZUXUn7Ozs0e9784LCF).
 *
 * White 1200x754 rounded panel on the #F3F3F3 page background with
 * decorative elliptical "lens" arcs above and below, a gradient heading,
 * three pillar cards (middle card raised 52px) connected by gradient
 * lines to a central "Dglide Platform" pill.
 */

const ASSET = "/why-dglide/custom-fit";

const CARDS = [
  {
    icon: `${ASSET}/icon-ready-systems.svg`,
    title: "Ready Systems",
    body: "Start with a working operational system, not a blank build. You go live in weeks.",
    linkLabel: "Platform Page",
    href: "/platform",
    // content alignment mirrors toward the center card (right / center / left)
    align: "lg:items-end lg:text-right",
    raised: false,
    cardBg: "linear-gradient(to top left, #F3F3F3 0%, #FFFFFF 100%)",
  },
  {
    icon: `${ASSET}/icon-configurable-backbone.svg`,
    title: "Configurable Backbone",
    body: "One backbone that bends to your workflows, roles, and approvals. No workarounds.",
    linkLabel: "Platform Page",
    href: "/platform",
    align: "lg:items-center lg:text-center",
    raised: true,
    cardBg: "linear-gradient(to top, #F3F3F3 0%, #FFFFFF 100%)",
  },
  {
    icon: `${ASSET}/icon-living-service-model.svg`,
    title: "Living Service Model",
    body: "It keeps adapting after go-live, so you never outgrow it or rebuild.",
    linkLabel: "LSM Page",
    href: "/platform",
    align: "lg:items-start lg:text-left",
    raised: false,
    cardBg: "linear-gradient(to top right, #F3F3F3 0%, #FFFFFF 100%)",
  },
];

export default function WDCustomFitSection() {
  return (
    <section
      className="w-full overflow-hidden pt-[60px] pb-[92px] px-4 lg:px-0"
      style={{
        backgroundImage: "url(/why-dglide/custom-fit/section-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative max-w-[1200px] mx-auto">
        {/* Panel */}
        <div className="relative flex flex-col items-center gap-12 lg:gap-[60px] pt-12 lg:pt-[60px] pb-12 px-5 lg:px-12 lg:pb-12">
          {/* Header — Frame 1618873223 */}
          <ScrollReveal direction="up">
          <div className="w-full max-w-[1104px] flex flex-col items-center gap-4">
            <h2
              className="max-w-[854px] text-center text-[32px] leading-[1.21] lg:text-[48px] lg:leading-[58px]"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                background: "linear-gradient(180deg, #FF7F1C 0%, #000000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Custom-Level Fit. Productized Speed. No Software Project.
            </h2>
            <p
              className="max-w-[798px] text-center text-[#6F7276] text-[15px] lg:text-[16px] leading-[26px] lg:leading-[28px] tracking-[0.2px]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              DGlide is a configurable operations platform. You start with
              ready-to-deploy systems, adapt them to your workflows, and keep
              evolving after go-live through the Living Service Model.
            </p>
          </div>
          </ScrollReveal>

          {/* Cards + connectors + platform pill — Frame 1618876651 */}
          <div className="relative w-full max-w-[1104px] flex flex-col items-center" style={{ isolation: "isolate" }}>
            {/* Connector lines (desktop only) */}
            <div aria-hidden className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              {/* vertical line from middle card to pill — Vector 6794 */}
              <img
                src={`${ASSET}/connector-center.svg`}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 top-[268px] w-px h-[95px]"
              />
              {/* left card to pill — Vector 6795 */}
              <img
                src={`${ASSET}/connector-left.svg`}
                alt=""
                className="absolute left-[321px] top-[309px] w-[214.5px] h-[56.5px]"
              />
              {/* right card to pill — Vector 6792 */}
              <img
                src={`${ASSET}/connector-right.svg`}
                alt=""
                className="absolute left-[564px] top-[313px] w-[214.5px] h-[56.5px]"
              />
            </div>

            {/* Card row — Frame 1618876520 (middle card raised 52px) */}
            <StaggerReveal className="relative w-full flex flex-col lg:flex-row lg:items-end gap-4 lg:h-[343px]" style={{ zIndex: 1 }}>
              {CARDS.map((card) => (
                <StaggerItem
                  key={card.title}
                  className={`flex-1 rounded-[16px] p-px lg:h-[291px] ${
                    card.raised ? "lg:self-start" : "lg:self-end"
                  }`}
                  style={{
                    background: "linear-gradient(to top, #1C2BFF 0%, #FFFFFF 40%)",
                  }}
                >
                <div
                  className={`flex-1 rounded-[16px] p-px lg:h-[291px] ${
                    card.raised ? "lg:self-start" : "lg:self-end"
                  }`}
                  style={{
                    // 1px gradient border: #1C2BFF at the bottom fading to white
                    background:
                      "linear-gradient(to top, #1C2BFF 0%, #FFFFFF 40%)",
                  }}
                >
                  <div
                    className="h-full rounded-[15px] pt-[27px] pb-[27px] pl-[27px] pr-[59px]"
                    style={{ background: card.cardBg }}
                  >
                    <div
                      className={`h-full flex flex-col gap-12 lg:gap-0 lg:justify-between items-start text-left ${card.align}`}
                    >
                      <div className={`w-full flex flex-col gap-5 items-start ${card.align}`}>
                        <Image
                          src={card.icon}
                          alt=""
                          width={88}
                          height={48}
                          className="w-[88px] h-12"
                        />
                        <div className="w-full flex flex-col gap-2">
                          <h3
                            className="text-black text-[18px] leading-[26px]"
                            style={{
                              fontFamily: "var(--font-tasa-orbiter)",
                              fontWeight: 500,
                            }}
                          >
                            {card.title}
                          </h3>
                          <p
                            className="text-[#555555] text-[15px] leading-[25px] tracking-[0.2px]"
                            style={{
                              fontFamily: "var(--font-inter), Inter, sans-serif",
                            }}
                          >
                            {card.body}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-[10px] text-[#1C2BFF] text-[15px] leading-[19px] hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "var(--font-sora), Sora, sans-serif", fontWeight: 400 }}
                      >
                        {card.linkLabel}
                        <img
                          src={`${ASSET}/arrow-link.svg`}
                          alt=""
                          className="w-[17px] h-[11px]"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            {/* Dglide Platform pill — Frame 1618876633 */}
            <ScrollReveal direction="up" delay={0.2}>
              <Link
                href="/platform"
                className="dg-btn-fill relative z-10 mt-8 lg:-mt-6 inline-flex items-center justify-center rounded-[156px] px-12 py-6 text-white text-[24px] leading-[31px]"
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontWeight: 600,
                  background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
                  boxShadow:
                    "0 0 0 10px #F3F3F3, -4px -4px 4px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                Dglide Platform
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
