import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

/*
 * "One Platform Underneath. Many Solutions on Top." — Why DGlide page
 * Figma node 1099:1148 (1200x677 desktop frame)
 * Mobile: Figma node 1722:13437 (360x975)
 */

type Capability = {
  label: string;
  icon: string;
  width: number;
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

type MobileCapability = { label: string; icon: string };

const MOBILE_TOP_PILLS: MobileCapability[] = [
  { label: "SLA logic",                 icon: "/why-dglide/one-platform/icon-sla-logic.png" },
  { label: "Workflow engine",           icon: "/why-dglide/one-platform/icon-workflow-engine.png" },
  { label: "Forms and templates",       icon: "/why-dglide/one-platform/icon-forms-templates.png" },
  { label: "Approvals and escalations", icon: "/why-dglide/one-platform/icon-approvals-escalations.png" },
];

const MOBILE_BOTTOM_PILLS: MobileCapability[] = [
  { label: "Role-based access",         icon: "/why-dglide/one-platform/icon-role-based-access.png" },
  { label: "APIs and webhooks",         icon: "/why-dglide/one-platform/icon-apis-webhooks.png" },
  { label: "Dashboards and reports",    icon: "/why-dglide/one-platform/icon-dashboards-reports.png" },
  { label: "Mobile access",             icon: "/why-dglide/one-platform/icon-mobile-access.png" },
];

/* Desktop pill component */
function CapabilityPill({ capability, side }: { capability: Capability; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`flex items-center gap-4 rounded-[30px] border border-[#F3F3F3] ${isLeft ? "p-[10px]" : "py-[10px] pl-[10px] pr-4"}`}
      style={{
        width: capability.width,
        height: 64,
        background: isLeft
          ? "linear-gradient(90deg, #F3F3F3 5.29%, #FFF 100%)"
          : "linear-gradient(90deg, #FFF 0%, #F3F3F3 100%)",
      }}
    >
      {!isLeft && (
        <Image src={capability.icon} alt="" width={80} height={44} className="w-20 h-11 flex-shrink-0 object-contain" />
      )}
      <span
        className={`flex-1 text-[16px] leading-[26px] text-[#FF7F1C] ${isLeft ? "text-right" : "text-left"}`}
        style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
      >
        {capability.label}
      </span>
      {isLeft && (
        <Image src={capability.icon} alt="" width={80} height={44} className="w-20 h-11 flex-shrink-0 object-contain" />
      )}
    </div>
  );
}

/* Mobile pill — full width, white background, icon left */
function MobilePill({ pill }: { pill: MobileCapability }) {
  return (
    <div
      className="w-full flex items-center gap-3 rounded-[40px] border border-[#E8E8E8] bg-white py-2 pl-3 pr-5"
      style={{ height: 60 }}
    >
      <div className="w-[52px] h-[38px] flex items-center justify-center flex-shrink-0">
        <Image src={pill.icon} alt="" width={52} height={38} className="w-full h-full object-contain" />
      </div>
      <span
        className="flex-1 text-[14px] leading-[24px] text-[#FF7F1C]"
        style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
      >
        {pill.label}
      </span>
    </div>
  );
}

/* Dashed vertical connector lines between pill groups and hub */
function ConnectorLines() {
  const xs = [72, 120, 190, 238];
  const height = 72;
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 310 ${height}`}
      fill="none"
      aria-hidden
      className="w-full"
    >
      {xs.map((x) => (
        <g key={x}>
          <circle cx={x} cy={5} r={3.5} fill="#1C2BFF" fillOpacity="0.35" />
          <line
            x1={x} y1={10} x2={x} y2={height - 10}
            stroke="#1C2BFF"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx={x} cy={height - 5} r={3.5} fill="#1C2BFF" fillOpacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

/* Blue pill hub */
function PlatformHub() {
  return (
    <div
      className="w-full flex items-center justify-center rounded-[40px]"
      style={{
        height: 80,
        background: "linear-gradient(135deg, #2233E0 0%, #1420A8 100%)",
      }}
    >
      <span
        className="text-white text-[22px] leading-[30px]"
        style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 700 }}
      >
        DGlide Platform
      </span>
    </div>
  );
}

function ArrowRight({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 9h14M12 5l4 4-4 4" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WDOnePlatformSection({ data }: { data?: Record<string, string> }) {
  return (
    <section className="w-full bg-[#F3F3F3] overflow-hidden">
      <div className="dg-inner-no-mobile-pad max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12 lg:gap-[60px]">

        {/* Heading + subtitle */}
        <ScrollReveal direction="up">
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
        </ScrollReveal>

        {/* Capability diagram — desktop (lg+) */}
        <div className="hidden lg:block relative w-full max-w-[1104px] mx-auto h-[301px]">
          <Image
            src="/why-dglide/one-platform/platform-hub.png"
            alt="DGlide platform hub connecting shared capabilities"
            width={1374}
            height={548}
            className="absolute left-[209px] top-4 w-[687px] h-[274px] z-0"
          />
          <div className="absolute left-0 top-0 w-[416px] flex flex-col items-end gap-[15px] z-10">
            {LEFT_CAPABILITIES.map((c) => (
              <div key={c.label} style={{ marginRight: c.indent }}>
                <CapabilityPill capability={c} side="left" />
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-0 w-[416px] flex flex-col items-start gap-[15px] z-10">
            {RIGHT_CAPABILITIES.map((c) => (
              <div key={c.label} style={{ marginLeft: c.indent }}>
                <CapabilityPill capability={c} side="right" />
              </div>
            ))}
          </div>
        </div>

        {/* Capability diagram — mobile (below lg) per Figma node 1722:13437 */}
        <div className="lg:hidden flex flex-col items-center w-full">

          {/* Top pill group */}
          <StaggerReveal className="w-full flex flex-col gap-2">
            {MOBILE_TOP_PILLS.map((pill) => (
              <StaggerItem key={pill.label}>
                <MobilePill pill={pill} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Dashed connector — pills to hub */}
          <ConnectorLines />

          {/* Platform hub pill */}
          <PlatformHub />

          {/* Dashed connector — hub to pills */}
          <ConnectorLines />

          {/* Bottom pill group */}
          <StaggerReveal className="w-full flex flex-col gap-2">
            {MOBILE_BOTTOM_PILLS.map((pill) => (
              <StaggerItem key={pill.label}>
                <MobilePill pill={pill} />
              </StaggerItem>
            ))}
          </StaggerReveal>

        </div>

        {/* Closing line + CTAs */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col items-center gap-6">
            <p
              className="text-center text-[20px] leading-[30px] text-black"
              style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
            >
              Start with one workflow. Expand across operations as your business grows.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href={data?.cta_primary_href ?? "/schedule-demo"}
                className="dg-btn-fill inline-flex items-center gap-[10px] px-8 py-3.5 rounded-[40px] text-white font-semibold text-base leading-[20.16px]"
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
        </ScrollReveal>

      </div>
    </section>
  );
}
