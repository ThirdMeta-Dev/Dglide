"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformBusinessTabContent,
  platformBusinessTabs,
  type PlatformBusinessTab,
} from "@/data/platformPageData";

const PlatformBusinessTabsSection: FunctionComponent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PlatformBusinessTab>(
    "Manufacturing & Process",
  );
  const content = platformBusinessTabContent[activeTab];

  return (
    <section className="sol-section">
      <SolutionsContainer>
        <header className="sol-what-improves-header">
          <h2 className="sol-what-improves-heading">
            Built For Businesses Where Workflows Are Not Simple
          </h2>
        </header>

        <div className="sol-plat-business-tabs">
          {platformBusinessTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`sol-plat-business-tab${
                activeTab === tab ? " sol-plat-business-tab--active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="sol-plat-business-panel">
          <div className="sol-plat-business-panel-grid">
            <div>
              <div className="sol-hero-eyebrow">
                <span className="sol-hero-eyebrow-bar" aria-hidden />
                <span className="sol-hero-eyebrow-text">{content.eyebrow}</span>
              </div>
              <h3 className="sol-cap-panel-title">{content.title}</h3>
              <p className="sol-cap-panel-description">{content.description}</p>
              <ul className="sol-cap-panel-features">
                {content.features.map((feature) => (
                  <li key={feature} className="sol-cap-panel-feature">
                    <img
                      src="/solutions/orange-bg.svg"
                      alt=""
                      width={36}
                      height={36}
                      className="sol-cap-panel-feature-icon"
                    />
                    <span className="sol-cap-panel-feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24 }}>
                <SolutionsButton
                  variant="get-started-now"
                  onClick={() => scrollToContact(router)}
                >
                  {content.cta}
                </SolutionsButton>
              </div>
            </div>
            <div className="sol-plat-business-media" aria-hidden />
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformBusinessTabsSection;
