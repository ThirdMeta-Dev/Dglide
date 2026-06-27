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
  platformRealityIntro,
} from "@/data/platformPageData";

const PlatformOperationalRealitySection: FunctionComponent = () => {
  const router = useRouter();

  // Split "The Working System..." → highlight first word "The" and "You"
  const bannerWords = platformRealityBannerHeading.split(" ");

  return (
    <section
      id="platform-reality"
      className="sol-section sol-plat-reality-section"
      style={{
        backgroundImage: "url('/platform/reality-section-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SolutionsContainer>
        <div className="sol-plat-reality-header">
          <h2 className="sol-plat-reality-heading">Built for Operational Reality</h2>
          <p className="sol-plat-reality-intro">{platformRealityIntro}</p>
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
                src={card.icon}
                alt=""
                width={88}
                height={48}
                className="sol-plat-reality-card-icon"
                aria-hidden
              />
              <h3 className="sol-plat-reality-card-title">{card.title}</h3>
              <p className="sol-plat-reality-card-description">{card.description}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="208" height="1" viewBox="0 0 208 1" fill="none" aria-hidden className="sol-plat-reality-card-divider">
                <path d="M0 0.5L208 0.500018" stroke="url(#divider-grad)" />
                <defs>
                  <linearGradient id="divider-grad" x1="0" y1="1" x2="208" y2="1" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EAEAEA" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                </defs>
              </svg>
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
              {bannerWords.map((word, i) => {
                const accent = word === "The" || word === "You";
                return (
                  <span key={i} className={accent ? "sol-plat-reality-banner-heading-accent" : undefined}>
                    {word}{i < bannerWords.length - 1 ? " " : ""}
                  </span>
                );
              })}
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
