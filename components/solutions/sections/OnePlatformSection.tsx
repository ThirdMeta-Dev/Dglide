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

const OrbitOutlineIcon: FunctionComponent = () => (
  <span className="sol-platform-node-outline-icon" aria-hidden>
    <img src="/solutions/section-1-icon.svg" alt="" width={24} height={24} />
  </span>
);

const OnePlatformSection: FunctionComponent = () => {
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
                  One Platform. Multiple Operational Systems
                </h2>
                <p className="sol-platform-description">
                  Dglide FSM connects every step of your field service
                  operation, from service request to job closure. Track customer
                  assets, field jobs, service history, and
                </p>
              </header>

              <div className="sol-platform-body">
                <ul className="sol-platform-features">
                  {platformWorkflowFeatures.map((label, index) => (
                    <li key={`${label}-${index}`} className="sol-platform-feature">
                      <img
                        src="/solutions/orange-bg.svg"
                        alt=""
                        className="sol-platform-feature-icon"
                        width={36}
                        height={36}
                        aria-hidden
                      />
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
                      src="/solutions/platform.svg"
                      alt=""
                      className="sol-platform-orbit-diagram"
                      width={431}
                      height={431}
                      aria-hidden
                    />

                    {platformOrbitItems.map((item) => {
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
                                src="/solutions/orange-bg.svg"
                                alt=""
                                className="sol-platform-node-card-icon"
                                width={44}
                                height={44}
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
                                  <OrbitOutlineIcon />
                                </>
                              ) : (
                                <>
                                  <OrbitOutlineIcon />
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
              Every workflow can be configured around how your service team
              actually operates.
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              Get Started Now
            </SolutionsButton>
          </footer>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default OnePlatformSection;
