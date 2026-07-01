"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { motionEase } from "@/components/animations/MotionPrimitives";
import styles from "./PricingPage.module.css";

type FeatureRowData = {
  name: string;
  starter: string;
  advanced: string;
  enterprise: string;
};

type FeatureGroup = {
  title: string;
  rows: FeatureRowData[];
};

type FAQItem = {
  question: string;
  answer: string;
};

const Y = "✓";
const N = "—";

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Core Platform",
    rows: [
      { name: "Configurable workflows, forms & approvals",  starter: Y, advanced: Y, enterprise: Y },
      { name: "Role-based access control & teams",          starter: Y, advanced: Y, enterprise: Y },
      { name: "Mobile app (field + manager)",               starter: Y, advanced: Y, enterprise: Y },
      { name: "Dashboards & standard reports",              starter: Y, advanced: Y, enterprise: Y },
      { name: "Self-service portal",                        starter: Y, advanced: Y, enterprise: Y },
      { name: "Audit logs & multi-language support",        starter: Y, advanced: Y, enterprise: Y },
    ],
  },
  {
    title: "CRM & Sales",
    rows: [
      { name: "Lead capture, scoring & assignment rules",          starter: Y, advanced: Y, enterprise: Y },
      { name: "Contact, account & pipeline management (Kanban)",   starter: Y, advanced: Y, enterprise: Y },
      { name: "Omnichannel: email, WhatsApp, SMS, social",         starter: Y, advanced: Y, enterprise: Y },
      { name: "Quote, invoice & PO generation (CPQ)",              starter: N, advanced: Y, enterprise: Y },
      { name: "Process automation & custom workflows",             starter: N, advanced: Y, enterprise: Y },
      { name: "Forecast dashboard",                                starter: N, advanced: Y, enterprise: Y },
      { name: "Territory management",                              starter: N, advanced: N, enterprise: Y },
      { name: "Journey orchestration",                             starter: N, advanced: N, enterprise: Y },
    ],
  },
  {
    title: "Field Service (FSM)",
    rows: [
      { name: "Work order creation, tracking & lifecycle",            starter: Y, advanced: Y, enterprise: Y },
      { name: "Technician assignment & scheduling",                   starter: Y, advanced: Y, enterprise: Y },
      { name: "Daily planner & real-time task updates",               starter: Y, advanced: Y, enterprise: Y },
      { name: "Dynamic forms & field data capture",                   starter: Y, advanced: Y, enterprise: Y },
      { name: "Tool & inventory management",                          starter: N, advanced: Y, enterprise: Y },
      { name: "Route tracking & distance-based expense",              starter: N, advanced: Y, enterprise: Y },
      { name: "OTP / customer-verified work order closure",           starter: N, advanced: Y, enterprise: Y },
      { name: "Photo proof, audit trail & compliance checklists",     starter: N, advanced: Y, enterprise: Y },
      { name: "Customer portal (tracking & rescheduling)",            starter: N, advanced: N, enterprise: Y },
    ],
  },
  {
    title: "IT & Service Desk (ITSM)",
    rows: [
      { name: "Incident & ticket management",                            starter: Y, advanced: Y, enterprise: Y },
      { name: "Omnichannel ticket intake (email, web, WhatsApp)",        starter: Y, advanced: Y, enterprise: Y },
      { name: "Email templates & canned responses",                      starter: Y, advanced: Y, enterprise: Y },
      { name: "SLA tracking & escalation rules",                         starter: Y, advanced: Y, enterprise: Y },
      { name: "Custom ticket status, fields & layouts",                  starter: Y, advanced: Y, enterprise: Y },
      { name: "Multilingual knowledge base & portal workspace",          starter: N, advanced: Y, enterprise: Y },
      { name: "Ticket auto-tagging & guided conversations",              starter: N, advanced: Y, enterprise: Y },
      { name: "Custom AI/ML models",                                     starter: N, advanced: N, enterprise: Y },
    ],
  },
  {
    title: "Customization & Integrations",
    rows: [
      { name: "Custom fields, tabs & layouts",             starter: Y,   advanced: Y,     enterprise: Y     },
      { name: "Marketplace extensions",                   starter: "2", advanced: "All", enterprise: "All" },
      { name: "Integrations & external API",              starter: N,   advanced: Y,     enterprise: Y     },
      { name: "Unlimited groups & email accounts",        starter: N,   advanced: Y,     enterprise: Y     },
      { name: "White labeling",                           starter: N,   advanced: N,     enterprise: Y     },
      { name: "Priority support & tailored onboarding",  starter: N,   advanced: N,     enterprise: Y     },
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
      "Do CRM, Field Service, and IT service cost extra, or is it one platform?",
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

function PlanCell({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className={styles.tableCheck} aria-label="Included">
        <Check size={15} strokeWidth={2.4} />
      </span>
    );
  }
  if (value === "—") {
    return <span className={styles.tableDash} aria-label="Not included">—</span>;
  }
  return <span className={styles.tableValue}>{value}</span>;
}

function FeatureRow({
  row,
  index,
}: {
  row: FeatureRowData;
  index: number;
}) {
  return (
    <div
      className={`${styles.featureRow} ${
        index % 2 === 0 ? styles.featureRowLight : styles.featureRowDark
      }`}
    >
      <div className={styles.featureName}>{row.name}</div>
      <div className={styles.featureChecks}>
        <PlanCell value={row.starter} />
        <PlanCell value={row.advanced} />
        <PlanCell value={row.enterprise} />
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
              <span>
                <Image src="/pricing/icon-starter.png" alt="" width={88} height={48} className={styles.planHeaderIcon} />
                Starter
              </span>
              <span>
                <Image src="/pricing/icon-advanced.png" alt="" width={88} height={48} className={styles.planHeaderIcon} />
                Advanced
              </span>
              <span>
                <Image src="/pricing/icon-enterprise.png" alt="" width={88} height={48} className={styles.planHeaderIcon} />
                Enterprise
              </span>
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
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {group.rows.map((row, rowIndex) => (
                        <FeatureRow
                          key={row.name}
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
