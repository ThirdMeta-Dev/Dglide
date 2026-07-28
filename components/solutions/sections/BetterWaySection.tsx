import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";

const CENTER_ITEMS = [
  "Configurable operations platform",
  "Fit of a custom build",
  "Ready-to-run systems",
];

function CenterOvalIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#FF7F1C" fillOpacity="0.15" />
      <path
        d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16"
        stroke="#FF7F1C" strokeWidth="2.2" strokeLinecap="round"
      />
      <path
        d="M20 8L24 12L20 16"
        stroke="#FF7F1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function BetterWayCenterOval() {
  return (
    <div style={{ position: "relative", width: 300, height: 366, flexShrink: 0 }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        boxShadow: "0 24px 64px rgba(28,43,255,0.35), 0 8px 24px rgba(0,0,0,0.18)",
      }} />
      {/* White border ring */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "linear-gradient(175deg, #F0F0FF 0%, #C8C8E8 100%)",
      }} />
      {/* Blue body */}
      <div style={{
        position: "absolute", inset: 10, borderRadius: "50%",
        background: "linear-gradient(160deg, #4B5CFF 0%, #1C2BFF 45%, #141FB5 100%)",
        overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "36px 28px 36px",
        gap: 16,
      }}>
        {/* Shine highlight */}
        <div style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: "45%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.22) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Title */}
        <p style={{
          fontFamily: "var(--font-tasa-orbiter), sans-serif",
          fontWeight: 700, fontSize: 34, lineHeight: 1.15,
          color: "#fff", textAlign: "center", margin: 0, position: "relative", zIndex: 1,
        }}>
          DGlide<br />Platform
        </p>
        {/* Feature items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", position: "relative", zIndex: 1 }}>
          {CENTER_ITEMS.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CenterOvalIcon />
              <span style={{
                fontFamily: "Inter, sans-serif", fontWeight: 500,
                fontSize: 13, lineHeight: "18px", color: "#fff",
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom 3D base shadow */}
      <div style={{
        position: "absolute", bottom: -6, left: "10%", right: "10%", height: 20,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(20,31,181,0.45) 0%, transparent 70%)",
        filter: "blur(6px)",
      }} />
    </div>
  );
}
import {
  customBuildItems,
  rigidToolsItems,
  betterWayFooterItems,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

type BetterWaySectionProps = {
  heading?: string;
  mobileHeading?: string;
  description?: string;
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
  mobileLeftItems?: string[];
  mobileRightItems?: string[];
  footerItems?: string[];
};

const TickIcon: FunctionComponent = () => (
  <span className="sol-better-way-tick-icon" aria-hidden>
    <img
      src="/solutions/better-way/icon-tick.svg"
      alt=""
      width={32}
      height={32}
    />
  </span>
);

const BetterWaySection: FunctionComponent<BetterWaySectionProps> = ({
  heading = "Stuck Between Rigid Tools and Building Your Own?",
  mobileHeading,
  description = "Until now, you had two bad options: software that does not fit, or a custom build that never ends. DGlide is the 3rd: Best of All Worlds.",
  leftTitle = "Fixed-Category Tools",
  rightTitle = "Building Your Own",
  leftItems = rigidToolsItems,
  rightItems = customBuildItems,
  mobileLeftItems,
  mobileRightItems,
  footerItems = betterWayFooterItems,
}) => (
  <section className="sol-section sol-better-way-section">
    <SolutionsContainer>
      <div className="sol-better-way-inner">
        <ScrollReveal direction="up">
          <header className="sol-better-way-header">
            <h2 className="sol-better-way-heading">
              <span className={mobileHeading ? "sol-copy-desktop" : ""}>{heading}</span>
              {mobileHeading ? <span className="sol-copy-mobile">{mobileHeading}</span> : null}
            </h2>
            <p className="sol-better-way-description">
              {description}
            </p>
          </header>
        </ScrollReveal>

        <div className="sol-better-way-visual">
          <div className="sol-better-way-visual-bg" aria-hidden />

          <div className="sol-better-way-visual-panel">
            <div className="sol-better-way-diagram">
              {/* Left column — Fixed-Category Tools */}
              <ScrollReveal direction="left">
                <div className="sol-better-way-side sol-better-way-side--left">
                  <div className="sol-better-way-side-header">
                    <img
                      src="/solutions/better-way-icons/fixed-tools.png"
                      alt=""
                      width={73}
                      height={40}
                      className="sol-better-way-col-icon"
                      aria-hidden
                    />
                    <h3 className="sol-better-way-side-title">
                      {leftTitle}
                    </h3>
                  </div>
                  <div className="sol-better-way-side-list">
                    <div className="sol-better-way-side-line" aria-hidden />
                    {leftItems.map((item, index) => (
                      <div key={item} className="sol-better-way-side-item">
                        <TickIcon />
                        <span className="sol-better-way-side-item-text">
                          <span className={mobileLeftItems ? "sol-copy-desktop" : ""}>{item}</span>
                          {mobileLeftItems ? (
                            <span className="sol-copy-mobile">{mobileLeftItems[index] ?? item}</span>
                          ) : null}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Center image — DGlide Platform */}
              <div className="sol-better-way-center">
                <Image
                  src="/solutions/better-way-center-v3.svg"
                  alt="DGlide Platform — the third option between rigid tools and custom builds"
                  width={367}
                  height={456}
                  className="sol-better-way-center-img"
                  priority
                />
              </div>

              <div className="sol-better-way-mobile-core">
                <Image
                  src="/competitor/dglide-logo-white.png"
                  alt="DGlide"
                  width={132}
                  height={32}
                  className="sol-better-way-mobile-logo"
                />
                <div className="sol-better-way-mobile-core-list">
                  {CENTER_ITEMS.map((item) => (
                    <div key={item} className="sol-better-way-mobile-core-item">
                      <TickIcon />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — Building Your Own */}
              <ScrollReveal direction="right">
                <div className="sol-better-way-side sol-better-way-side--right">
                  <div className="sol-better-way-side-header">
                    <img
                      src="/solutions/better-way-icons/building-own.png"
                      alt=""
                      width={73}
                      height={40}
                      className="sol-better-way-col-icon"
                      aria-hidden
                    />
                    <h3 className="sol-better-way-side-title">
                      {rightTitle}
                    </h3>
                  </div>
                  <div className="sol-better-way-side-list">
                    <div className="sol-better-way-side-line" aria-hidden />
                    {rightItems.map((item, index) => (
                      <div key={item} className="sol-better-way-side-item">
                        <span className="sol-better-way-side-item-text">
                          <span className={mobileRightItems ? "sol-copy-desktop" : ""}>{item}</span>
                          {mobileRightItems ? (
                            <span className="sol-copy-mobile">{mobileRightItems[index] ?? item}</span>
                          ) : null}
                        </span>
                        <TickIcon />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Footer bar — direct child of visual so it escapes the panel's stacking context */}
          <div className="sol-better-way-footer-bar">
            {footerItems.map((label) => (
              <div key={label} className="sol-better-way-footer-item">
                <img
                  src="/solutions/hero-tick.svg"
                  alt=""
                  width={21}
                  height={13}
                  className="sol-better-way-footer-tick"
                  aria-hidden
                />
                <span className="sol-better-way-footer-text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default BetterWaySection;
