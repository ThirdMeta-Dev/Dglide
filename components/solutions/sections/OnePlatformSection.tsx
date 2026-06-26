"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformOrbitItems,
  platformWorkflowFeatures,
} from "@/data/solutionsPageData";

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden className="sol-platform-feature-tick-icon">
    <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.5036L9.4923 8.78683L18.6249 4.22037L22.2779 6.04695L9.4923 12.44L1.27297 8.33019L4.92601 6.5036Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.85883L9.4923 8.14206L18.6249 3.57559L22.2779 5.40218L9.4923 11.7952L1.27297 7.68541L4.92601 5.85883Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);

const FeatureIcon = () => (
  <span className="sol-platform-feature-icon-wrap" aria-hidden>
    <TickIcon />
  </span>
);


type OnePlatformSectionProps = {
  heading?: string;
  description?: string;
  features?: string[];
  orbitItems?: typeof platformOrbitItems;
  footerText?: string;
  ctaLabel?: string;
};

const OnePlatformSection: FunctionComponent<OnePlatformSectionProps> = ({
  heading = "One Platform. Your Whole Service Workflow.",
  description = "DGlide ITSM connects every step of a request, from the moment it arrives to the moment it's resolved, in one flow.",
  features = platformWorkflowFeatures,
  orbitItems = platformOrbitItems,
  footerText = "Every workflow can be configured around how your service team actually operates.",
  ctaLabel = "Book A Demo →",
}) => {
  const router = useRouter();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);

  const openNodeId = pinnedNodeId ?? activeNodeId;

  const handleNodeClick = (id: string) => {
    setPinnedNodeId((current) => (current === id ? null : id));
  };

  return (
    <section id="what-fsm-does" className="sol-section sol-platform-section">
      <SolutionsContainer>
        <div className="sol-platform-inner">
          <div className="sol-platform-main">
            <div className="sol-platform-content">
              <header className="sol-platform-header">
                <h2 className="sol-platform-heading">
                  {heading}
                </h2>
                <p className="sol-platform-description">
                  {description}
                </p>
              </header>

              <div className="sol-platform-body">
                <ul className="sol-platform-features">
                  {features.map((label, index) => (
                    <li key={`${label}-${index}`} className="sol-platform-feature">
                      <FeatureIcon />
                      <span className="sol-platform-feature-text">{label}</span>
                    </li>
                  ))}
                </ul>

                <div className="sol-platform-orbit-wrap">
                  <div
                    className="sol-platform-orbit"
                    onMouseLeave={() => setActiveNodeId(null)}
                  >
                    <img
                      src="/solutions/platform-center.png"
                      alt=""
                      className="sol-platform-orbit-diagram"
                      width={431}
                      height={431}
                      aria-hidden
                    />

                    {orbitItems.map((item) => {
                      const isOpen = openNodeId === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`sol-platform-node ${
                            isOpen ? "sol-platform-node--open" : ""
                          }`}
                          style={{ left: item.left, top: item.top }}
                          onMouseEnter={() => setActiveNodeId(item.id)}
                        >
                          {isOpen ? (
                            <button
                              type="button"
                              className="sol-platform-node-card"
                              onClick={() => handleNodeClick(item.id)}
                              aria-expanded
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="sol-platform-node-card-icon"
                                width={73}
                                height={40}
                                aria-hidden
                              />
                              <div className="sol-platform-node-card-body">
                                <h3 className="sol-platform-node-card-title">
                                  {item.label}
                                </h3>
                                <p className="sol-platform-node-card-description">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={`sol-platform-node-pill sol-platform-node-pill--icon-${item.iconSide}`}
                              aria-expanded={false}
                              onClick={() => handleNodeClick(item.id)}
                            >
                              {item.iconSide === "right" ? (
                                <>
                                  <span className="sol-platform-node-pill-label">
                                    {item.label}
                                  </span>
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="sol-platform-node-pill-icon"
                                    width={73}
                                    height={40}
                                    aria-hidden
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="sol-platform-node-pill-icon"
                                    width={73}
                                    height={40}
                                    aria-hidden
                                  />
                                  <span className="sol-platform-node-pill-label">
                                    {item.label}
                                  </span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="sol-platform-footer">
            <p className="sol-platform-footer-text">
              {footerText}
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              {ctaLabel}
            </SolutionsButton>
          </footer>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default OnePlatformSection;
