"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformRealityBannerCta,
  platformRealityBannerEyebrow,
  platformRealityBannerHeading,
  platformRealityCards,
} from "@/data/platformPageData";

const PlatformOperationalRealitySection: FunctionComponent = () => {
  const router = useRouter();

  return (
    <section id="platform-reality" className="sol-section sol-plat-reality-section">
      <SolutionsContainer>
        <div className="sol-plat-reality-header">
          <h2 className="sol-plat-reality-heading">Built For Operational Reality</h2>
          <p className="sol-plat-reality-intro">
            Your System Adapts To How You Work Start With A Working System, Not A
            Blank Platform.
          </p>
        </div>

        <div className="sol-plat-reality-grid">
          {platformRealityCards.map((card) => (
            <article
              key={card.title}
              className={`sol-plat-reality-card${
                card.offset ? " sol-plat-reality-card--offset" : ""
              }`}
            >
              <img
                src="/solutions/orange-bg.svg"
                alt=""
                width={48}
                height={48}
                className="sol-plat-reality-card-icon"
                aria-hidden
              />
              <h3 className="sol-plat-reality-card-title">{card.title}</h3>
              <p className="sol-plat-reality-card-description">{card.description}</p>
              <span className="sol-plat-reality-card-tag">
                <span className="sol-plat-reality-card-tag-bar" aria-hidden />
                {card.tag}
              </span>
            </article>
          ))}
        </div>

        <div className="sol-plat-reality-banner">
          <div className="sol-plat-reality-banner-copy">
            <span className="sol-plat-reality-banner-eyebrow">
              <span className="sol-plat-reality-banner-eyebrow-bar" aria-hidden />
              {platformRealityBannerEyebrow}
            </span>
            <p className="sol-plat-reality-banner-heading">
              <span className="sol-plat-reality-banner-heading-accent">A </span>
              {platformRealityBannerHeading.replace(/^A\s/, "")}
            </p>
          </div>
          <button
            type="button"
            className="sol-plat-reality-banner-btn"
            onClick={() => scrollToContact(router)}
          >
            {platformRealityBannerCta}
          </button>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformOperationalRealitySection;
