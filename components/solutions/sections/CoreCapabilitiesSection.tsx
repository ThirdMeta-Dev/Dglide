"use client";

import Image from "next/image";
import {
  type CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden style={{ width: "21.005px", height: "12.762px", aspectRatio: "79/48", flexShrink: 0 }}>
    <path d="M4.92601 6.82574L9.4923 9.10898L18.6249 4.54251L22.2779 6.3691L9.4923 12.7622L1.27297 8.65233L4.92601 6.82574Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.8587L9.4923 8.14194L18.6249 3.57547L22.2779 5.40206L9.4923 11.7951L1.27297 7.68529L4.92601 5.8587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  capabilityTabs,
  capabilityTabContent,
} from "@/data/solutionsPageData";

const NOTCH_HEIGHT = 71;
const TAB_COLUMN_WIDTH = 320;
const NOTCH_LEFT = TAB_COLUMN_WIDTH + 4;

export type CapabilityTabItem = {
  label: string;
  title: string;
  paragraphs: string[];
  features: string[];
  whyItMatters: string;
  image: string;
};

export type CoreCapabilitiesSectionProps = {
  heading?: string;
  items?: CapabilityTabItem[];
};

const DEFAULT_ITEMS: CapabilityTabItem[] = capabilityTabs.map((tab) => ({
  label: tab,
  ...capabilityTabContent[tab],
}));

const getTabVariant = (
  index: number,
  activeIndex: number,
): "before" | "active" | "after" | "default" => {
  if (index === activeIndex) return "active";
  if (index === activeIndex - 1) return "before";
  if (index === activeIndex + 1) return "after";
  return "default";
};

const CoreCapabilitiesSection: FunctionComponent<CoreCapabilitiesSectionProps> = ({
  heading = "The Capabilities Behind Every Resolved Request",
  items = DEFAULT_ITEMS,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const content = items[activeIndex];

  const layoutRef = useRef<HTMLDivElement>(null);
  const tabsStripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<number, HTMLButtonElement>>>({});
  const [notchTop, setNotchTop] = useState(0);

  const syncNotchPosition = useCallback(() => {
    const layout = layoutRef.current;
    const activeButton = tabRefs.current[activeIndex];
    if (!layout || !activeButton) return;

    const layoutRect = layout.getBoundingClientRect();
    const tabRect = activeButton.getBoundingClientRect();
    const tabCenter = tabRect.top + tabRect.height / 2 - layoutRect.top;

    setNotchTop(tabCenter - NOTCH_HEIGHT / 2);
  }, [activeIndex]);

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

  // Scroll the active tab into center of the strip on mobile
  useEffect(() => {
    const btn = tabRefs.current[activeIndex];
    const strip = tabsStripRef.current;
    if (!btn || !strip) return;
    const left = btn.offsetLeft - strip.offsetWidth / 2 + btn.offsetWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section id="core-capabilities" className="sol-section sol-capabilities-section">
      <SolutionsContainer>
        <h2 className="sol-capabilities-heading">
          {heading}
        </h2>

        <div ref={layoutRef} className="sol-capabilities-layout">
          <div ref={tabsStripRef} className="sol-capabilities-tabs">
            {items.map((item, index) => {
              const variant = getTabVariant(index, activeIndex);

              return (
                <button
                  key={item.label}
                  ref={(el) => {
                    if (el) tabRefs.current[index] = el;
                    else delete tabRefs.current[index];
                  }}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`sol-cap-tab sol-cap-tab--${variant}`}
                >
                  {item.label}
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
                      <span className="sol-cap-panel-feature-icon-wrap">
                        <TickIcon />
                      </span>
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

              <div className="sol-cap-panel-media">
                <Image
                  key={content.image}
                  src={content.image}
                  alt=""
                  width={700}
                  height={420}
                  className="sol-cap-panel-media-img"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default CoreCapabilitiesSection;
