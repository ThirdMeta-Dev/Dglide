"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { comparisonGroups } from "./comparison-data";
import { calculateAccordionScrollTarget } from "./accordion-scroll";
import styles from "./ComparisonPage.module.css";

function Value({ value, product }: { value: string; product: "dglide" | "freshdesk" }) {
  const normalized = value.toLowerCase();
  const tone = normalized.includes("partial") || normalized.includes("add-on")
    ? styles.valueLight
    : styles.valueDark;

  return (
    <span className={`${styles.value} ${tone}`}>
      <span>{value}</span>
      <span className={styles.srOnly}> for {product === "dglide" ? "DGlide" : "Freshdesk"}</span>
    </span>
  );
}

function FeatureTick() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.matrixFeatureTick} width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden>
      <path d="M4.92601 6.82581L9.4923 9.10904L18.6249 4.54257L22.2779 6.36916L9.4923 12.7622L1.27297 8.65239L4.92601 6.82581Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 6.50354L9.4923 8.78677L18.6249 4.22031L22.2779 6.04689L9.4923 12.4399L1.27297 8.33013L4.92601 6.50354Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.53528L9.4923 7.81851L18.6249 3.25204L22.2779 5.07863L9.4923 11.4717L1.27297 7.36187L4.92601 5.53528Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 4.88879L9.4923 7.17203L18.6249 2.60556L22.2779 4.43215L9.4923 10.8252L1.27297 6.71538L4.92601 4.88879Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round" />
    </svg>
  );
}

export default function ComparisonMatrix() {
  const [openIndex, setOpenIndex] = useState(0);
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matrix = matrixRef.current;
    const stickyHeader = matrix
      ?.closest("section")
      ?.querySelector<HTMLElement>("[data-comparison-sticky-header]");

    if (!matrix || !stickyHeader) return;

    const updateStickyTop = () => {
      const headerTop = Number.parseFloat(window.getComputedStyle(stickyHeader).top) || 0;
      matrix.style.setProperty(
        "--matrix-group-sticky-top",
        `${Math.ceil(headerTop + stickyHeader.getBoundingClientRect().height)}px`
      );
    };

    updateStickyTop();
    const resizeObserver = new ResizeObserver(updateStickyTop);
    resizeObserver.observe(stickyHeader);
    window.addEventListener("resize", updateStickyTop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  const toggleGroup = (groupIndex: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenIndex(-1);
      return;
    }

    const matrix = matrixRef.current;
    const targetGroup = matrix?.querySelector<HTMLElement>(
      `[data-comparison-group="${groupIndex}"]`
    );
    if (!matrix || !targetGroup) {
      setOpenIndex(groupIndex);
      return;
    }

    const previousGroup = openIndex >= 0
      ? matrix.querySelector<HTMLElement>(`[data-comparison-group="${openIndex}"]`)
      : null;
    const previousButton = previousGroup?.querySelector<HTMLElement>("button");
    const collapsingContentHeight = previousGroup && previousButton && openIndex < groupIndex
      ? previousGroup.getBoundingClientRect().height - previousButton.getBoundingClientRect().height
      : 0;
    const stickyTop = Number.parseFloat(
      matrix.style.getPropertyValue("--matrix-group-sticky-top")
    ) || 0;
    const precedingGroup = targetGroup.previousElementSibling as HTMLElement | null;
    const precedingButton = precedingGroup?.querySelector<HTMLElement>("button");
    const precedingTriggerHeight = precedingButton
      ? precedingButton.getBoundingClientRect().height
        + (Number.parseFloat(window.getComputedStyle(targetGroup).marginTop) || 0)
      : 0;

    window.scrollTo({
      top: calculateAccordionScrollTarget({
        currentScrollY: window.scrollY,
        targetGroupTop: targetGroup.getBoundingClientRect().top,
        stickyTop,
        collapsingContentHeight,
        precedingTriggerHeight,
      }),
      behavior: "auto",
    });
    setOpenIndex(groupIndex);
  };

  return (
    <div className={styles.matrix} ref={matrixRef}>
      {comparisonGroups.map((group, groupIndex) => {
        const isOpen = openIndex === groupIndex;

        return (
          <div
            className={`${styles.matrixGroup} ${isOpen ? styles.matrixGroupOpen : ""}`}
            data-comparison-group={groupIndex}
            key={group.title}
          >
            <button
              type="button"
              className={styles.matrixGroupButton}
              onClick={() => toggleGroup(groupIndex, isOpen)}
              data-comparison-group-trigger={groupIndex}
              aria-expanded={isOpen}
              aria-controls={`comparison-group-${groupIndex}`}
            >
              <span>{group.title}</span>
              <svg viewBox="0 0 16 16" aria-hidden>
                <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`comparison-group-${groupIndex}`}
                  className={styles.matrixRowsMotion}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className={styles.matrixRowsViewport}
                    role="region"
                    tabIndex={0}
                    aria-label={`${group.title} comparison table. Scroll horizontally to see all columns.`}
                  >
                    <div className={styles.matrixRows}>
                      <div className={styles.matrixMobileColumnHeader} aria-hidden>
                        <span>Capability</span>
                        <span className={styles.matrixMobileBrand}>
                          <Image
                            className={styles.matrixMobileDglideLogo}
                            src="/logo.png"
                            alt=""
                            width={320}
                            height={56}
                          />
                        </span>
                        <span className={styles.matrixMobileBrand}>
                          <Image
                            className={styles.matrixMobileFreshdeskLogo}
                            src="/comparison/freshdesk-logo.png"
                            alt=""
                            width={47}
                            height={49}
                          />
                          <span className={styles.matrixMobileFreshworksText}>freshworks</span>
                        </span>
                      </div>
                      {group.rows.map((row) => (
                        <div className={styles.matrixRow} key={row.feature}>
                          <div className={styles.matrixFeature}><FeatureTick /><span>{row.feature}</span></div>
                          <div className={styles.matrixValue} data-label="DGlide">
                            <Value value={row.dglide} product="dglide" />
                          </div>
                          <div className={styles.matrixValue} data-label="Freshdesk">
                            <Value value={row.freshdesk} product="freshdesk" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
