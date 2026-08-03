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
    <svg className={styles.matrixFeatureTick} viewBox="0 0 22 14" aria-hidden>
      <path d="M2 7.2 7.4 10 20 3.5 16.7 2 7.4 6.8 5 5.6Z" fill="currentColor" />
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
