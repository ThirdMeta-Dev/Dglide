import styles from "./ThankYouPage.module.css";

const REASONS = [
  {
    title: "Shaped to Your Operation",
    desc: "Configure the process to match how your team already works.",
    icon: "/thank-you/reason-shaped-operation.svg",
  },
  {
    title: "Live in Weeks, Not Months",
    desc: "You get a real, working setup fast, then refine it.",
    icon: "/thank-you/reason-live-weeks.svg",
  },
  {
    title: "Always Up to Date",
    desc: "New team, new product, new process? DGlide adjusts.",
    icon: "/thank-you/reason-always-updated.svg",
  },
  {
    title: "No IT Project to Own",
    desc: "No developer dependency, no maintenance pile-up.",
    icon: "/thank-you/reason-no-it-project.svg",
  },
];

export default function ThankYouReasons() {
  return (
    <section
      className={styles.reasonsSection}
      aria-labelledby="thank-you-reasons-title"
    >
      <div className={styles.reasonsInner}>
        <h2 className={styles.reasonsHeading} id="thank-you-reasons-title">
          Four Reasons DGlide Fits Where Others Don’t
        </h2>

        <div className={styles.reasonsGrid}>
          <div className={styles.reasonsGlow} aria-hidden />
          {REASONS.map((reason) => (
            <article className={styles.reasonCard} key={reason.title}>
              <img
                className={styles.reasonIcon}
                src={reason.icon}
                alt=""
                width="87"
                height="44"
                aria-hidden
              />
              <div className={styles.reasonCopy}>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDesc}>{reason.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
