"use client";

import {
  type CSSProperties,
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  capabilityTabs,
  capabilityTabContent,
  type CapabilityTab,
} from "@/data/solutionsPageData";

const NOTCH_HEIGHT = 71;
const TAB_COLUMN_WIDTH = 267;
const NOTCH_LEFT = TAB_COLUMN_WIDTH - 13;

const getTabVariant = (
  tab: CapabilityTab,
  activeTab: CapabilityTab,
): "before" | "active" | "after" | "default" => {
  const activeIndex = capabilityTabs.indexOf(activeTab);
  const index = capabilityTabs.indexOf(tab);

  if (index === activeIndex) return "active";
  if (index === activeIndex - 1) return "before";
  if (index === activeIndex + 1) return "after";
  return "default";
};

const CoreCapabilitiesSection: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<CapabilityTab>(
    "Scheduling & Dispatch",
  );
  const content = capabilityTabContent[activeTab];

  const layoutRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<CapabilityTab, HTMLButtonElement>>>({});
  const [notchTop, setNotchTop] = useState(0);

  const syncNotchPosition = useCallback(() => {
    const layout = layoutRef.current;
    const activeButton = tabRefs.current[activeTab];
    if (!layout || !activeButton) return;

    const layoutRect = layout.getBoundingClientRect();
    const tabRect = activeButton.getBoundingClientRect();
    const tabCenter = tabRect.top + tabRect.height / 2 - layoutRect.top;

    setNotchTop(tabCenter - NOTCH_HEIGHT / 2);
  }, [activeTab]);

  useLayoutEffect(() => {
    syncNotchPosition();

    const layout = layoutRef.current;
    if (!layout) return;

    const observer = new ResizeObserver(syncNotchPosition);
    observer.observe(layout);

    window.addEventListener("resize", syncNotchPosition);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncNotchPosition);
    };
  }, [syncNotchPosition]);

  return (
    <section id="core-capabilities" className="sol-section sol-capabilities-section">
      <SolutionsContainer>
        <h2 className="sol-capabilities-heading">
          Built for Businesses Like Yours
        </h2>

        <div ref={layoutRef} className="sol-capabilities-layout">
          <div className="sol-capabilities-tabs">
            {capabilityTabs.map((tab) => {
              const variant = getTabVariant(tab, activeTab);

              return (
                <button
                  key={tab}
                  ref={(el) => {
                    if (el) tabRefs.current[tab] = el;
                    else delete tabRefs.current[tab];
                  }}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`sol-cap-tab sol-cap-tab--${variant}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div
            className="sol-cap-panel-notch"
            style={
              {
                "--cap-notch-top": `${notchTop}px`,
                "--cap-notch-left": `${NOTCH_LEFT}px`,
              } as CSSProperties
            }
            aria-hidden
          />

          <div className="sol-cap-panel">
            <div className="sol-cap-panel-inner">
              <div className="sol-cap-panel-copy">
                <div className="sol-cap-panel-header">
                  <h3 className="sol-cap-panel-title">{content.title}</h3>
                  <p className="sol-cap-panel-description">
                    {content.paragraphs.join(" ")}
                  </p>
                </div>

                <ul className="sol-cap-panel-features">
                  {content.features.map((feature) => (
                    <li key={feature} className="sol-cap-panel-feature">
                      <img
                        src="/solutions/section-1-icon.svg"
                        alt=""
                        width={22}
                        height={22}
                        className="sol-cap-panel-feature-icon"
                      />
                      <span className="sol-cap-panel-feature-text">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="sol-cap-panel-why">
                  <span className="sol-cap-panel-why-label">
                    Why it matters:
                  </span>
                  <div className="sol-cap-panel-why-divider" aria-hidden />
                  <p className="sol-cap-panel-why-quote">
                    &ldquo;{content.whyItMatters}&rdquo;
                  </p>
                </div>
              </div>

              <div className="sol-cap-panel-media" aria-hidden />
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default CoreCapabilitiesSection;
