"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { motionEase } from "@/components/animations/MotionPrimitives";
import styles from "./PricingPage.module.css";

type FeatureGroup = {
  title: string;
  rows: string[];
};

type FAQItem = {
  question: string;
  answer: string;
};

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Core Platform",
    rows: [
      "Configurable workflows, forms & approvals",
      "Role-based access control & teams",
      "Mobile app (field + manager)",
      "Dashboards & standard reports",
      "Self-service portal",
      "Audit logs & multi-language support",
    ],
  },
  {
    title: "CRM & Sales",
    rows: [
      "Lead and account tracking",
      "Pipeline stages and activity history",
      "Quotes, follow-ups, and customer notes",
    ],
  },
  {
    title: "Field Service (FSM)",
    rows: [
      "Job assignment and dispatch",
      "Field updates from mobile teams",
      "Visit history, checklists, and service reports",
    ],
  },
  {
    title: "IT & Service Desk (ITSM)",
    rows: [
      "Ticket intake and status flows",
      "SLA views and escalation routing",
      "Internal service dashboards",
    ],
  },
  {
    title: "Customization & Integrations",
    rows: [
      "Custom workflow and form configuration",
      "API access and external app connections",
      "Marketplace extensions and tailored setup",
    ],
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Why don't you list prices on this page?",
    answer:
      "DGlide is scoped around your workflow, team structure, and operating needs. The demo gives you a precise quote instead of a generic price that does not match your setup.",
  },
  {
    question: "How is DGlide priced?",
    answer:
      "Pricing scales with your plan, Starter, Advanced, or Enterprise, and your scope, not a rigid per-head license. You pay for the system you build, and your quote shows exactly what's included, with no surprise add-ons.",
  },
  {
    question: "How do I know which plan is right for me?",
    answer:
      "We map your operation during the demo, then recommend the plan that fits your current workflow and the next layer of scale you need.",
  },
  {
    question:
      "Do CRM, field service, and IT service cost extra, or is it one platform?",
    answer:
      "DGlide is one platform. Your plan and scope determine which operating areas are configured first and what gets added later.",
  },
  {
    question: "Can I upgrade or change plans later?",
    answer:
      "Yes. DGlide is designed to evolve with your operation, so your setup can expand as your processes, teams, or integration needs change.",
  },
  {
    question: "Are there setup or hidden fees?",
    answer:
      "Your quote shows the setup, plan, and included scope clearly before you commit. The goal is predictable pricing without surprise add-ons.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Timelines depend on your workflow scope, but DGlide is built for faster rollout than traditional custom software implementations.",
  },
  {
    question: "Does DGlide offer a Free Trial?",
    answer:
      "The best first step is a free demo using your workflow context, so you can see the system fit before deciding on a plan.",
  },
];

function PlanCheck() {
  return (
    <span className={styles.tableCheck} aria-label="Included">
      <Check size={15} strokeWidth={2.4} />
    </span>
  );
}

function FeatureRow({
  row,
  index,
}: {
  row: string;
  index: number;
}) {
  return (
    <div
      className={`${styles.featureRow} ${
        index % 2 === 0 ? styles.featureRowLight : styles.featureRowDark
      }`}
    >
      <div className={styles.featureName}>
        <span aria-hidden />
        {row}
      </div>
      <div className={styles.featureChecks}>
        <PlanCheck />
        <PlanCheck />
        <PlanCheck />
      </div>
    </div>
  );
}

export function PlanComparisonSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.compareSection}>
      <h2>Compare What&apos;s in Each Plan</h2>

      <div className={styles.compareScroller}>
        <div className={styles.compareTable}>
          <div className={styles.compareHeader}>
            <div className={styles.featureHeader}>Feature</div>
            <div className={styles.planHeaders}>
              <span>Starter</span>
              <span>Advanced</span>
              <span>Enterprise</span>
            </div>
          </div>

          {FEATURE_GROUPS.map((group, groupIndex) => {
            const isOpen = openIndex === groupIndex;

            return (
              <div key={group.title}>
                <button
                  type="button"
                  className={`${styles.groupToggle} ${
                    groupIndex === FEATURE_GROUPS.length - 1
                      ? styles.groupToggleLast
                      : ""
                  }`}
                  onClick={() => setOpenIndex(groupIndex)}
                  aria-expanded={isOpen}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    size={28}
                    strokeWidth={1.6}
                    className={isOpen ? styles.groupChevronOpen : ""}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className={styles.groupRows}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: motionEase }}
                    >
                      {group.rows.map((row, rowIndex) => (
                        <FeatureRow
                          key={row}
                          row={row}
                          index={rowIndex}
                        />
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PricingFAQSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqCard}>
        <div className={styles.faqLeft}>
          <div className={styles.faqTitleWrap}>
            <h2>Frequently Asked questions</h2>
            <h2 aria-hidden>Frequently Asked questions</h2>
          </div>
          <Image
            src="/pricing/pricing-faq-illustration.png"
            alt="Questions flowing through a magnifying glass into an answer"
            width={267}
            height={379}
            className={styles.faqImage}
          />
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                className={styles.faqItem}
                layout="size"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                {index > 0 ? <span className={styles.faqDivider} /> : null}
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className={`${styles.faqQuestion} ${
                    isOpen ? styles.faqQuestionOpen : ""
                  }`}
                  aria-expanded={isOpen}
                >
                  {item.question}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      style={{ overflow: "hidden" }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: motionEase }}
                    >
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
