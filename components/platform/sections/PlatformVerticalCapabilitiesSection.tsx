"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import {
  platformCapabilitiesDescription,
  platformCapabilitiesHeading,
  platformVerticalCapabilities,
} from "@/data/platformPageData";

const INTERVAL_MS = 4000;
const TOTAL = platformVerticalCapabilities.length;

function TickIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="13"
      viewBox="0 0 24 14"
      fill="none"
      aria-hidden
      className="sol-plat-cap-tick"
    >
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
}

const PlatformVerticalCapabilitiesSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = platformVerticalCapabilities[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  return (
    <section id="platform-capabilities" className="sol-section sol-plat-cap-section">
      <SolutionsContainer>
        <ScrollReveal direction="up">
          <header className="sol-plat-cap-header">
            <h2 className="sol-plat-cap-heading">{platformCapabilitiesHeading}</h2>
            <p className="sol-plat-cap-subtext">{platformCapabilitiesDescription}</p>
          </header>
        </ScrollReveal>

        <div className="sol-plat-cap-grid">
          <div className="sol-plat-cap-media-wrap">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.image}
                src={active.image}
                alt=""
                className="sol-plat-cap-media"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          <motion.div
            className="sol-plat-vertical-cap-list"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {platformVerticalCapabilities.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <StaggerItem key={item.id}>
                <div className="sol-plat-vertical-cap-item">
                  <button
                    type="button"
                    className={`sol-plat-vertical-cap-trigger${isActive ? " sol-plat-vertical-cap-trigger--active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="sol-plat-vertical-cap-trigger-id">{item.id}</span>
                    {" "}{item.title}
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="sol-plat-vertical-cap-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <h3 className="sol-plat-vertical-cap-panel-title">{active.panelTitle}</h3>
                        <p className="sol-plat-vertical-cap-panel-description">{active.description}</p>
                        <ul className="sol-plat-vertical-cap-features">
                          {active.features.map((feature) => (
                            <li key={feature} className="sol-plat-vertical-cap-feature">
                              <TickIcon />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress track: grey line with orange fill on active item */}
                  <div className="sol-plat-vertical-cap-track">
                    {isActive && (
                      <span
                        key={activeIndex}
                        className="sol-plat-vertical-cap-fill"
                        style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      />
                    )}
                  </div>
                </div>
                </StaggerItem>
              );
            })}
          </motion.div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformVerticalCapabilitiesSection;
