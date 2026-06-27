import Image from "next/image";
import Link from "next/link";

/*
 * "One Platform Underneath. Many Solutions on Top." — Why DGlide page
 * Figma node 1099:1148 (1200x677 desktop frame)
 */

type Capability = {
  label: string;
  icon: string;
  /** pill width at desktop (px) */
  width: number;
  /** horizontal stagger offset from the column's outer edge (px) */
  indent: number;
};

const LEFT_CAPABILITIES: Capability[] = [
  { label: "Workflow engine",           icon: "/why-dglide/one-platform/icon-workflow-engine.png",        width: 341, indent: 0 },
  { label: "Forms and templates",       icon: "/why-dglide/one-platform/icon-forms-templates.png",        width: 341, indent: 36 },
  { label: "Approvals and escalations", icon: "/why-dglide/one-platform/icon-approvals-escalations.png",  width: 341, indent: 72 },
  { label: "SLA logic",                 icon: "/why-dglide/one-platform/icon-sla-logic.png",              width: 286, indent: 108 },
];

const RIGHT_CAPABILITIES: Capability[] = [
  { label: "Dashboards and reports",    icon: "/why-dglide/one-platform/icon-dashboards-reports.png",     width: 341, indent: 0 },
  { label: "Mobile access",             icon: "/why-dglide/one-platform/icon-mobile-access.png",          width: 341, indent: 36 },
  { label: "APIs and webhooks",         icon: "/why-dglide/one-platform/icon-apis-webhooks.png",          width: 341, indent: 72 },
  { label: "Role-based access",         icon: "/why-dglide/one-platform/icon-role-based-access.png",      width: 286, indent: 108 },
];

function CapabilityPill({
  capability,
  side,
  fullWidthOnMobile,
}: {
  capability: Capability;
  side: "left" | "right";
  fullWidthOnMobile?: boolean;
}) {
  const isLeft = side === "left";
  return (
    <div
      className={`flex items-center gap-4 rounded-[30px] border border-[#F3F3F3] ${
        fullWidthOnMobile ? "w-full max-w-[341px]" : ""
      } ${isLeft ? "p-[10px]" : "py-[10px] pl-[10px] pr-4"}`}
      style={{
        ...(fullWidthOnMobile ? {} : { width: capability.width }),
        height: 64,
        background: isLeft
          ? "linear-gradient(90deg, #F3F3F3 5.29%, #FFF 100%)"
          : "linear-gradient(90deg, #FFF 0%, #F3F3F3 100%)",
      }}
    >
      {!isLeft && (
        <Image
          src={capability.icon}
          alt=""
          width={80}
          height={44}
          className="w-20 h-11 flex-shrink-0 object-contain"
        />
      )}
      <span
        className={`flex-1 text-[16px] leading-[26px] text-[#FF7F1C] ${
          isLeft ? "text-right" : "text-left"
        }`}
        style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
      >
        {capability.label}
      </span>
      {isLeft && (
        <Image
          src={capability.icon}
          alt=""
          width={80}
          height={44}
          className="w-20 h-11 flex-shrink-0 object-contain"
        />
      )}
    </div>
  );
}

function ArrowRight({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M2 9h14M12 5l4 4-4 4"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WDOnePlatformSection({ data }: { data?: Record<string, string> }) {
  return (
    <section className="w-full bg-[#F3F3F3] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12 lg:gap-[60px]">
        {/* Heading + subtitle */}
        <div className="flex flex-col items-center gap-3">
          <h2
            className="text-center text-[32px] leading-[40px] md:text-[48px] md:leading-[58px]"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              background: "linear-gradient(180deg, #FF7F1C 0%, #000 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            One Platform Underneath. Many <br className="hidden md:block" />
            Solutions on Top.
          </h2>
          <p
            className="text-center text-[16px] leading-[26px] tracking-[0.2px] text-[#6F7276] max-w-[1010px]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontWeight: 400 }}
          >
            DGlide isn&apos;t a collection of disconnected tools. Every solution runs on one
            shared, configurable operations backbone.
          </p>
        </div>

        {/* Capability diagram — pixel-perfect absolute layout at lg+ */}
        <div className="hidden lg:block relative w-full max-w-[1104px] mx-auto h-[301px]">
          {/* Center hub illustration (behind the pills) */}
          <Image
            src="/why-dglide/one-platform/platform-hub.png"
            alt="DGlide platform hub connecting shared capabilities"
            width={1374}
            height={548}
            className="absolute left-[209px] top-4 w-[687px] h-[274px] z-0"
          />
          {/* Left column */}
          <div className="absolute left-0 top-0 w-[416px] flex flex-col items-end gap-[15px] z-10">
            {LEFT_CAPABILITIES.map((c) => (
              <div key={c.label} style={{ marginRight: c.indent }}>
                <CapabilityPill capability={c} side="left" />
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="absolute right-0 top-0 w-[416px] flex flex-col items-start gap-[15px] z-10">
            {RIGHT_CAPABILITIES.map((c) => (
              <div key={c.label} style={{ marginLeft: c.indent }}>
                <CapabilityPill capability={c} side="right" />
              </div>
            ))}
          </div>
        </div>

        {/* Capability diagram — stacked below lg */}
        <div className="lg:hidden flex flex-col items-center gap-6">
          <Image
            src="/why-dglide/one-platform/platform-hub.png"
            alt="DGlide platform hub connecting shared capabilities"
            width={1374}
            height={548}
            className="w-full max-w-[560px] h-auto"
          />
          <div className="w-full flex flex-col items-center gap-3">
            {[...LEFT_CAPABILITIES, ...RIGHT_CAPABILITIES].map((c, i) => (
              <CapabilityPill
                key={c.label}
                capability={c}
                side={i < LEFT_CAPABILITIES.length ? "left" : "right"}
                fullWidthOnMobile
              />
            ))}
          </div>
        </div>

        {/* Closing line + CTAs */}
        <div className="flex flex-col items-center gap-6">
          <p
            className="text-center text-[20px] leading-[30px] text-black"
            style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
          >
            Start with one workflow. Expand across operations as your business grows.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={data?.cta_primary_href ?? "/demo"}
              className="dg-btn-fill inline-flex items-center gap-[10px] px-8 py-3.5 rounded-[40px] text-white font-semibold text-base leading-[20.16px] transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-sora), Sora, sans-serif",
                background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
              }}
            >
              Book A Demo
              <ArrowRight stroke="#FFFFFF" />
            </Link>
            <Link
              href={data?.cta_secondary_href ?? "/platform"}
              className="dg-btn-outline inline-flex items-center gap-[10px] px-8 py-3.5 rounded-[40px] border border-[#1C2BFF] bg-white text-[#141FB5] text-base leading-[20.16px] transition-colors hover:bg-[#1C2BFF]/5"
              style={{ fontFamily: "var(--font-sora), Sora, sans-serif", fontWeight: 400 }}
            >
              Explore Platform
              <ArrowRight stroke="#141FB5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
