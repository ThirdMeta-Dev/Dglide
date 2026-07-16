"use client";

import { FunctionComponent, useEffect, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import {
  platformBackboneDescription,
  platformBackboneHeading,
  platformBackboneLayers,
} from "@/data/platformPageData";

const STACK_TOP_BASE = 100;
const STACK_TOP_STEP = 24;

const PlatformBackboneSection: FunctionComponent = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveLayer((value) => (value + 1) % platformBackboneLayers.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  return (
  <section id="platform-backbone" className="sol-plat-backbone-section">
    <SolutionsContainer>
      <div className="sol-plat-backbone-layout">
        <ScrollReveal
          direction="up"
          style={{ position: "sticky", top: `${STACK_TOP_BASE}px`, alignSelf: "start" }}
        >
          <div className="sol-plat-backbone-left">
            <h2 className="sol-plat-backbone-heading">{platformBackboneHeading}</h2>
            <p className="sol-plat-backbone-description">{platformBackboneDescription}</p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="sol-plat-backbone-cards">
          {platformBackboneLayers.map((layer, i) => (
            <StaggerItem
              key={layer.title}
              style={{
                position: "sticky",
                top: `${STACK_TOP_BASE + i * STACK_TOP_STEP}px`,
                zIndex: i + 1,
              }}
            >
            <article
              className={`sol-plat-backbone-card${activeLayer === i ? " sol-plat-backbone-card--active" : ""}`}
              onMouseEnter={() => setActiveLayer(i)}
            >
              <div className="sol-plat-backbone-card-header">
                <img
                  src={layer.icon}
                  alt=""
                  width={88}
                  height={48}
                  className="sol-plat-backbone-card-icon"
                  aria-hidden
                />
                <div className="sol-plat-backbone-card-info">
                  <span className="sol-plat-backbone-card-layer">{layer.layer}</span>
                  <h3 className="sol-plat-backbone-card-title">{layer.title}</h3>
                  <p className="sol-plat-backbone-card-desc">{layer.description}</p>
                </div>
              </div>
              <div className="sol-plat-backbone-tags">
                {layer.tags.map((tag) => (
                  <span key={tag} className="sol-plat-backbone-tag">{tag}</span>
                ))}
              </div>
            </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SolutionsContainer>
  </section>
  );
};

export default PlatformBackboneSection;
