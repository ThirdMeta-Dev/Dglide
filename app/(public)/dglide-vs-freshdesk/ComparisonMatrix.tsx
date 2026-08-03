"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { comparisonGroups } from "./comparison-data";
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
  const pendingAlignmentRef = useRef<number | null>(null);
  const alignmentTimerRef = useRef<number | null>(null);

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
      if (alignmentTimerRef.current !== null) {
        window.clearTimeout(alignmentTimerRef.current);
      }
    };
  }, []);

  const alignOpenedGroup = (groupIndex: number) => {
    if (pendingAlignmentRef.current !== groupIndex) return;

    if (alignmentTimerRef.current !== null) {
      window.clearTimeout(alignmentTimerRef.current);
    }

    alignmentTimerRef.current = window.setTimeout(() => {
      const matrix = matrixRef.current;
      const group = matrix?.querySelector<HTMLElement>(
        `[data-comparison-group="${groupIndex}"]`
      );
      if (!matrix || !group || pendingAlignmentRef.current !== groupIndex) return;

      const stickyTop = Number.parseFloat(
        matrix.style.getPropertyValue("--matrix-group-sticky-top")
      ) || 0;
      const targetTop = window.scrollY + group.getBoundingClientRect().top - stickyTop;

      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      pendingAlignmentRef.current = null;
      alignmentTimerRef.current = null;
    }, 80);
  };

  const toggleGroup = (groupIndex: number, isOpen: boolean) => {
    pendingAlignmentRef.current = isOpen ? null : groupIndex;
    setOpenIndex(isOpen ? -1 : groupIndex);
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
                  className={styles.matrixRows}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={() => alignOpenedGroup(groupIndex)}
                >
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
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
