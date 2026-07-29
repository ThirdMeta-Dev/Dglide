"use client";

import Image from "next/image";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { technicianFeatures } from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const DURATION = 7000;

type TechnicianMobileSectionProps = {
  heading?: string;
  mobileHeading?: string;
  description?: string;
  mobileDescription?: string;
  features?: typeof technicianFeatures;
  mobileFeatures?: typeof technicianFeatures;
  mobileInitialIndex?: number;
  imageSrc?: string;
  imageAlt?: string;
  sectionClassName?: string;
};

const TechnicianMobileSection: FunctionComponent<TechnicianMobileSectionProps> = ({
  heading = "Stop Running Service Out of an Inbox",
  mobileHeading,
  description = "Agents shouldn't dig through email and chat to know what's next. DGlide gives every agent one clear workspace for daily service execution.",
  mobileDescription,
  features = technicianFeatures,
  mobileFeatures,
  mobileInitialIndex,
  imageSrc = "/solutions/agent-workspace.png",
  imageAlt = "DGlide agent workspace",
  sectionClassName = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    if (
      mobileInitialIndex !== undefined &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      setActiveIndex(mobileInitialIndex);
    }
  }, [mobileInitialIndex]);

  useEffect(() => {
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      setFillProgress(progress);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, features]);

  return (
    <section className={`sol-section sol-technician-section${sectionClassName ? ` ${sectionClassName}` : ""}`}>
      <SolutionsContainer>
        <div className="sol-technician-inner">
          <ScrollReveal direction="up">
            <header className="sol-technician-header">
              <h2 className="sol-technician-heading">
                <span className={mobileHeading ? "sol-copy-desktop" : ""}>{heading}</span>
                {mobileHeading ? <span className="sol-copy-mobile">{mobileHeading}</span> : null}
              </h2>
              <p className="sol-technician-description">
                <span className={mobileDescription ? "sol-copy-desktop" : ""}>{description}</span>
                {mobileDescription ? <span className="sol-copy-mobile">{mobileDescription}</span> : null}
              </p>
            </header>
          </ScrollReveal>

          <div className="sol-technician-panel">
            <div className="sol-technician-row">
              <ScrollReveal direction="left" delay={0.1} className="sol-technician-features-wrap">
                <div className="sol-technician-features">
                  <div className="sol-technician-features-list">
                    {features.map((feature, index) => {
                      const isExpanded = activeIndex === index;

                      return (
                        <Fragment key={feature.title}>
                          {index > 0 &&
                            (isExpanded ? (
                              <div className="sol-technician-active-bar" aria-hidden>
                                <span
                                  className="sol-technician-active-bar-fill"
                                  style={{ width: `${fillProgress * 100}%` }}
                                />
                              </div>
                            ) : (
                              <hr className="sol-technician-divider" />
                            ))}

                          {isExpanded ? (
                            <div className="sol-technician-feature-expanded">
                              <div className="sol-technician-feature-expanded-inner">
                                <div className="sol-technician-feature-row">
                                  <img
                                    src={feature.icon}
                                    alt=""
                                    className="sol-technician-feature-icon"
                                    width={73}
                                    height={40}
                                    aria-hidden
                                  />
                                  <h3 className="sol-technician-feature-title sol-technician-feature-title--active">
                                    <span className={mobileFeatures ? "sol-copy-desktop" : ""}>{feature.title}</span>
                                    {mobileFeatures ? (
                                      <span className="sol-copy-mobile">{mobileFeatures[index]?.title ?? feature.title}</span>
                                    ) : null}
                                  </h3>
                                </div>
                                {feature.description && (
                                  <p className="sol-technician-feature-description">
                                    <span className={mobileFeatures ? "sol-copy-desktop" : ""}>{feature.description}</span>
                                    {mobileFeatures ? (
                                      <span className="sol-copy-mobile">{mobileFeatures[index]?.description ?? feature.description}</span>
                                    ) : null}
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="sol-technician-feature-trigger"
                              aria-expanded={false}
                              onClick={() => setActiveIndex(index)}
                            >
                              <img
                                src={feature.icon}
                                alt=""
                                className="sol-technician-feature-icon"
                                width={73}
                                height={40}
                                aria-hidden
                              />
                              <span className="sol-technician-feature-title">
                                <span className={mobileFeatures ? "sol-copy-desktop" : ""}>{feature.title}</span>
                                {mobileFeatures ? (
                                  <span className="sol-copy-mobile">{mobileFeatures[index]?.title ?? feature.title}</span>
                                ) : null}
                              </span>
                            </button>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.1} className="sol-technician-phone-wrap">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={441}
                  height={647}
                  className="sol-technician-phone"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default TechnicianMobileSection;
