"use client";

import { FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { platformVerticalCapabilities } from "@/data/platformPageData";

const PlatformVerticalCapabilitiesSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = platformVerticalCapabilities[activeIndex];

  return (
    <section className="sol-section">
      <SolutionsContainer>
        <div className="sol-plat-vertical-cap-grid">
          <div className="sol-plat-vertical-cap-media" aria-hidden />

          <div className="sol-plat-vertical-cap-list">
            {platformVerticalCapabilities.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={item.id} className="sol-plat-vertical-cap-item">
                  <button
                    type="button"
                    className={`sol-plat-vertical-cap-trigger${
                      isActive ? " sol-plat-vertical-cap-trigger--active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.id} {item.title}
                  </button>

                  {isActive && (
                    <div className="sol-plat-vertical-cap-panel">
                      <span className="sol-plat-vertical-cap-active-bar" aria-hidden />
                      <h3 className="sol-plat-vertical-cap-panel-title">
                        {active.panelTitle}
                      </h3>
                      <p className="sol-plat-vertical-cap-panel-description">
                        {active.description}
                      </p>
                      <ul className="sol-plat-vertical-cap-features">
                        {active.features.map((feature) => (
                          <li key={feature} className="sol-plat-vertical-cap-feature">
                            <img
                              src="/solutions/orange-bg.svg"
                              alt=""
                              width={22}
                              height={22}
                              aria-hidden
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="sol-plat-vertical-cap-quote">
                        &ldquo;{active.quote}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformVerticalCapabilitiesSection;
