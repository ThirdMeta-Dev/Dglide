"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies-db";
import CaseStudyDownloadModal from "@/components/case-studies/CaseStudyDownloadModal";
import styles from "./CaseStudiesPage.module.css";
import mobileFix from "./CaseStudiesMobileFix.module.css";

const CATEGORIES = ["Operations","Field Service","Workflow & Process","Configurable vs Custom","Continuous Fit (LSM)","Industry Insights"];
// Hidden per request (Jul 2026) — flip to true to bring the category filter back.
const SHOW_CATEGORIES = false;

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden>
      <path d="M1.00003 8.09393C0.447744 8.09394 1.60277e-05 8.54167 5.96046e-08 9.09395C-1.59085e-05 9.64624 0.447686 10.0939 0.999971 10.0939L1 9.09393L1.00003 8.09393ZM15.1442 10.0935C15.6964 10.0935 16.1442 9.64577 16.1442 9.09349C16.1442 8.5412 15.6965 8.0935 15.1442 8.09352L15.1442 9.09352L15.1442 10.0935ZM1 9.09393L0.999971 10.0939L15.1442 10.0935L15.1442 9.09352L15.1442 8.09352L1.00003 8.09393L1 9.09393Z" fill="currentColor" />
      <path d="M10.3983 12.4279C10.0077 12.8184 10.0077 13.4516 10.3982 13.8421C10.7887 14.2326 11.4219 14.2326 11.8124 13.8421L11.1054 13.135L10.3983 12.4279ZM15.8538 9.80074C16.2443 9.41021 16.2443 8.77704 15.8538 8.38653C15.4633 7.99602 14.8301 7.99603 14.4396 8.38657L15.1467 9.09366L15.8538 9.80074ZM11.1054 13.135L11.8124 13.8421L15.8538 9.80074L15.1467 9.09366L14.4396 8.38657L10.3983 12.4279L11.1054 13.135Z" fill="currentColor" />
      <path d="M11.8087 4.34188C11.4182 3.95137 10.785 3.95139 10.3945 4.34192C10.0039 4.73246 10.0039 5.36562 10.3944 5.75613L11.1016 5.04901L11.8087 4.34188ZM14.4355 9.79721C14.826 10.1877 15.4592 10.1877 15.8497 9.79717C16.2403 9.40664 16.2403 8.77347 15.8498 8.38296L15.1426 9.09009L14.4355 9.79721ZM11.1016 5.04901L10.3944 5.75613L14.4355 9.79721L15.1426 9.09009L15.8498 8.38296L11.8087 4.34188L11.1016 5.04901Z" fill="currentColor" />
    </svg>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  if (!value && !label) return null;
  return <div><strong>{value}</strong><span>{label}</span></div>;
}

function DownloadButton({ study, onClick }: { study: CaseStudy; onClick: (study: CaseStudy) => void }) {
  return (
    <button type="button" className={styles.downloadBtn} onClick={() => onClick(study)}>
      Download Case study <ArrowIcon />
    </button>
  );
}

function PersonRow({ study, withLogo }: { study: CaseStudy; withLogo?: boolean }) {
  return (
    <div className={styles.personRow}>
      {withLogo && study.logoUrl && (
        <span className={styles.logoBox}>
          <Image src={study.logoUrl} alt={study.company} width={170} height={36} />
        </span>
      )}
      {study.personName && <strong>{study.personName}</strong>}
      {study.personRole && <span>{study.personRole}</span>}
    </div>
  );
}

function FeaturedCard({ study, onDownload }: { study: CaseStudy; onDownload: (s: CaseStudy) => void }) {
  return (
    <section
      className={`${styles.featured} ${mobileFix.section}`}
      style={SHOW_CATEGORIES ? undefined : { marginTop: 96 }}
    >
      <div className={styles.featuredCopy}>
        <h2>The Featured Casestudy</h2>
        <div>
          <h3>{study.title}</h3>
          <p>{study.excerpt}</p>
        </div>
        <PersonRow study={study} withLogo />
      </div>
      <div className={styles.featuredMetrics}>
        <Metric value={study.metricOneValue} label={study.metricOneLabel} />
        <Metric value={study.metricTwoValue} label={study.metricTwoLabel} />
        <DownloadButton study={study} onClick={onDownload} />
      </div>
    </section>
  );
}

function LibraryCard({ study, onDownload }: { study: CaseStudy; onDownload: (s: CaseStudy) => void }) {
  return (
    <article className={styles.libCard}>
      <div className={styles.libCardBody}>
        {study.logoUrl && (
          <Image src={study.logoUrl} alt={study.company} width={205} height={40} className={styles.cardLogo} />
        )}
        <div className={styles.cardCopy}>
          <h3>{study.title}</h3>
          <p>{study.excerpt}</p>
          <PersonRow study={study} />
        </div>
      </div>
      <div className={styles.libCardMetrics}>
        <Metric value={study.metricOneValue} label={study.metricOneLabel} />
        <Metric value={study.metricTwoValue} label={study.metricTwoLabel} />
        <DownloadButton study={study} onClick={onDownload} />
      </div>
    </article>
  );
}

export default function CaseStudiesClient({ studies }: { studies: CaseStudy[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("featured");
  const [slide, setSlide] = useState(0);
  const [downloadStudy, setDownloadStudy] = useState<CaseStudy | null>(null);
  const libraryRef = useRef<HTMLElement>(null);

  const featured = useMemo(
    () => studies.find((s) => s.isFeatured) || null,
    [studies]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = studies.filter(
      (s) =>
        (!q || `${s.company} ${s.title} ${s.excerpt}`.toLowerCase().includes(q)) &&
        (!category || s.category === category)
    );
    return sort === "company"
      ? [...matches].sort((a, b) => a.company.localeCompare(b.company))
      : matches;
  }, [studies, category, query, sort]);

  const total = filtered.length;
  const current = Math.min(slide, Math.max(0, total - 1));
  const study = filtered[current];

  function go(delta: number) {
    if (!total) return;
    setSlide((current + delta + total) % total);
  }

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${mobileFix.hero}`}>
        <nav aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><span>Resources</span><span>›</span><strong>Case Study Listing</strong>
        </nav>
        <h1>Practical ideas for running operations<br className={styles.desktopBreak} /> without fighting your tools.</h1>
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span className="sr-only">Search case studies</span>
            <input value={query} onChange={(e) => { setQuery(e.target.value); setSlide(0); }} placeholder="Search articles and topics" />
            <span aria-hidden>⌕</span>
          </label>
          <label className={styles.sort}>
            <span className="sr-only">Sort case studies</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Sort by</option>
              <option value="company">Company A–Z</option>
            </select>
          </label>
        </div>
      </section>

      {SHOW_CATEGORIES && (
        <section className={`${styles.categorySection} ${mobileFix.section}`} aria-label="Case study categories">
          <span>Categories</span>
          <div>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? styles.categoryActive : ""}
                onClick={() => { setCategory(category === item ? "" : item); setSlide(0); }}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {featured && <FeaturedCard study={featured} onDownload={setDownloadStudy} />}

      <section
        className={`${styles.library} ${mobileFix.section}`}
        ref={libraryRef}
        style={featured ? undefined : { marginTop: 96 }}
      >
        <div className={styles.libraryHead}>
          <h2>The Full Casestudy Library</h2>
          {total > 0 && (
            <div className={styles.carouselNav}>
              <span>{current + 1}/{total}</span>
              <button type="button" onClick={() => go(-1)} disabled={total < 2} aria-label="Previous case study">←</button>
              <button type="button" className={styles.carouselNext} onClick={() => go(1)} disabled={total < 2} aria-label="Next case study">→</button>
            </div>
          )}
        </div>
        {study ? (
          <LibraryCard study={study} onDownload={setDownloadStudy} />
        ) : (
          <p className={styles.empty}>
            {studies.length === 0
              ? "Case studies are on the way. Check back soon."
              : "No case studies match this search and category."}
          </p>
        )}
      </section>

      <section className={`${styles.cta} ${mobileFix.section}`}>
        <span>From insight to action</span>
        <h2>Stop reading about better operations.<br />Start running them.</h2>
        <Link href="/schedule-demo" className={styles.ctaButton}>Book a Demo <ArrowIcon /></Link>
      </section>

      {downloadStudy && <CaseStudyDownloadModal study={downloadStudy} onClose={() => setDownloadStudy(null)} />}
    </main>
  );
}
