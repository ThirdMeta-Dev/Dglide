"use client";

import { useState } from "react";
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

  return (
    <div className={styles.matrix}>
      {comparisonGroups.map((group, groupIndex) => {
        const isOpen = openIndex === groupIndex;

        return (
          <div className={`${styles.matrixGroup} ${isOpen ? styles.matrixGroupOpen : ""}`} key={group.title}>
            <button
              type="button"
              className={styles.matrixGroupButton}
              onClick={() => setOpenIndex(isOpen ? -1 : groupIndex)}
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
