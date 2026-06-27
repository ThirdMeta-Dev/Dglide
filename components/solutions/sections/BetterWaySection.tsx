import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  customBuildItems,
  rigidToolsItems,
  betterWayFooterItems,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

type BetterWaySectionProps = {
  heading?: string;
  description?: string;
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
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
  description = "Until now, you had two bad options: software that does not fit, or a custom build that never ends. DGlide is the 3rd: Best of All Worlds.",
  leftTitle = "Fixed-Category Tools",
  rightTitle = "Building Your Own",
  leftItems = rigidToolsItems,
  rightItems = customBuildItems,
  footerItems = betterWayFooterItems,
}) => (
  <section className="sol-section sol-better-way-section">
    <SolutionsContainer>
      <div className="sol-better-way-inner">
        <ScrollReveal direction="up">
          <header className="sol-better-way-header">
            <h2 className="sol-better-way-heading">
              {heading}
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
                    {leftItems.map((item) => (
                      <div key={item} className="sol-better-way-side-item">
                        <TickIcon />
                        <span className="sol-better-way-side-item-text">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Center image — DGlide Platform */}
              <div className="sol-better-way-center">
                <Image
                  src="/solutions/better-way-center.png"
                  alt="DGlide Platform — the third option between rigid tools and custom builds"
                  width={367}
                  height={447}
                  className="sol-better-way-center-img"
                  priority
                />
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
                    {rightItems.map((item) => (
                      <div key={item} className="sol-better-way-side-item">
                        <span className="sol-better-way-side-item-text">
                          {item}
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
