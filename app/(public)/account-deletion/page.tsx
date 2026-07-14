import type { Metadata } from "next";
import styles from "./AccountDeletion.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: "Learn how to request deletion of your DGlide account and what happens to your data during the account deletion process.",
  alternates: {
    canonical: `${SITE_URL}/account-deletion`,
  },
  openGraph: {
    title: "Account Deletion | DGlide",
    description: "How to request deletion of your DGlide account and data.",
    url: `${SITE_URL}/account-deletion`,
    type: "website",
  },
};

const contents = [
  ["overview", "Overview"],
  ["deletion-process", "Account Deletion Process"],
  ["contact-administrator", "1. Contact Your Administrator"],
  ["administrator-review", "2. Administrator Review"],
  ["deactivation-deletion", "3. Account Deactivation and Deletion"],
  ["data-retention", "Data Retention"],
  ["support", "Need Help?"],
] as const;

const steps = [
  ["contact-administrator", "Step 1", "Contact Your Administrator"],
  ["administrator-review", "Step 2", "Administrator Review"],
  ["deactivation-deletion", "Step 3", "Account Deactivation and Deletion"],
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export default function AccountDeletionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Account &amp; Data</p>
          <h1 className={styles.title}>Account Deletion</h1>
          <p className={styles.intro}>How to request deletion of your account and data</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.toc} aria-label="Account deletion contents">
            <p className={styles.tocTitle}>Contents</p>
            <nav className={styles.tocNav}>
              {contents.map(([id, label]) => (
                <a key={id} href={`#${id}`} className={styles.tocLink}>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <main className={styles.content}>
            <div className={styles.divider} />

            <Section id="overview" title="Account Deletion">
              <p>
                As an enterprise application, account deletion is managed by your organization&apos;s
                administrator. This page outlines the process for requesting account deletion and
                what happens to your data.
              </p>
            </Section>

            <Section id="deletion-process" title="Account Deletion Process">
              <div className={styles.steps} aria-label="Account deletion steps">
                {steps.map(([id, step, label]) => (
                  <a key={id} href={`#${id}`} className={styles.stepTab}>
                    <span className={styles.stepNumber}>{step}</span>
                    <span className={styles.stepLabel}>{label}</span>
                  </a>
                ))}
              </div>
            </Section>

            <Section id="contact-administrator" title="1. Contact Your Administrator">
              <p>
                Contact your organization&apos;s administrator to request account deletion. Only
                administrators have the ability to delete user accounts from the system.
              </p>
            </Section>

            <Section id="administrator-review" title="2. Administrator Review">
              <p>
                Your administrator will review your request and may need to transfer your
                responsibilities, reassign your tasks, or archive important data.
              </p>
            </Section>

            <Section id="deactivation-deletion" title="3. Account Deactivation and Deletion">
              <p>
                Once approved, your administrator will first deactivate your account and then
                permanently delete it after any required data retention period.
              </p>
            </Section>

            <Section id="data-retention" title="Data Retention">
              <div className={styles.notice}>
                <p>
                  <strong>Important:</strong>{" "}Data deletion is subject to your organization&apos;s data
                  retention policies and legal requirements. Some information may be retained for
                  legitimate business purposes, legal compliance, or audit requirements.
                </p>
              </div>
            </Section>

            <section id="support" className={`${styles.section} ${styles.supportCard}`}>
              <h2 className={styles.sectionTitle}>Need help with account deletion?</h2>
              <div className={styles.sectionBody}>
                <p>
                  If you&apos;re having trouble contacting your administrator or have questions about
                  data retention, our support team is here to help.
                </p>
                <a className={styles.supportLink} href="mailto:support@dglide.com">
                  Contact Support
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
