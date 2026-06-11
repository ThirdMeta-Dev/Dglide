"use client";

import { FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformLivingServiceDescription,
  platformLivingServiceHeading,
  platformLivingServiceSidebar,
  platformLivingServiceStages,
} from "@/data/platformPageData";

const STAGE_POSITIONS = [
  { top: "8%", left: "50%" },
  { top: "32%", left: "18%" },
  { top: "32%", left: "82%" },
  { top: "72%", left: "50%" },
];

const PlatformLivingServiceSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="sol-section sol-plat-living-section">
      <SolutionsContainer>
        <div className="sol-plat-living-header">
          <div>
            <h2 className="sol-plat-living-heading">{platformLivingServiceHeading}</h2>
            <p className="sol-plat-living-description">
              {platformLivingServiceDescription}
            </p>
          </div>
          <div className="sol-plat-living-nav">
            <span>{activeIndex + 1}/4</span>
            <button type="button" className="sol-plat-living-nav-btn" aria-label="Previous">
              ←
            </button>
            <button
              type="button"
              className="sol-plat-living-nav-btn sol-plat-living-nav-btn--active"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div className="sol-plat-living-body">
          <div className="sol-plat-living-sidebar">
            {platformLivingServiceSidebar.map((item) => (
              <div key={item} className="sol-plat-living-sidebar-item">
                <img
                  src="/solutions/orange-bg.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden
                />
                {item}
              </div>
            ))}
          </div>

          <div className="sol-plat-living-orbit">
            <span className="sol-plat-living-orbit-ring" aria-hidden />
            {platformLivingServiceStages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                className={`sol-plat-living-stage${
                  stage.active ? " sol-plat-living-stage--active" : ""
                }`}
                style={{
                  top: STAGE_POSITIONS[index]?.top,
                  left: STAGE_POSITIONS[index]?.left,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src="/solutions/orange-bg.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
                {stage.label}
              </button>
            ))}
          </div>

          <div>
            <h3 className="sol-plat-living-detail-title">
              Your System Adapts To How You Work Start With A Worki System, Not A
              Your System
            </h3>
            <ul className="sol-plat-living-detail-list">
              <li>&gt; Lorem Ipsum is simply dummy</li>
              <li>&gt; Lorem Ipsum is simply</li>
            </ul>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformLivingServiceSection;
