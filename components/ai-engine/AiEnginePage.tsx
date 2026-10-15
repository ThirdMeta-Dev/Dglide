import Image from "next/image";
import Link from "next/link";
import TrackedLink from "./TrackedLink";
import DemoVideo from "./DemoVideo";
import {
  AI_BUILD_FRAMES,
  AI_CHANGE,
  AI_COMPARISON,
  AI_DEMO_VIDEO,
  AI_FAQS,
  AI_HERO,
  AI_PROBLEM,
  AI_SAFE,
  AI_STEPS,
} from "@/data/aiEnginePageData";

function Arrow() {
  return (
    <svg className="ai-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`ai-eyebrow${light ? " ai-eyebrow--light" : ""}`}>{children}</p>;
}

const CODE_LINES = [
  "export async function createJobWork(req) {",
  "  const db = await connect(process.env.DB_URL);",
  "  if (!req.body.vendorId) throw new Error(\"vendor\");",
  "  const order = await db.insert(\"job_work\", {",
  "    ...req.body, status: \"PLANNING\",",
  "  });",
  "  await queue.publish(\"notify\", order.id);",
  "  // TODO: auth, retries, migrations, hosting",
  "  return order;",
  "}",
];

export default function AiEnginePage() {
  const hasVideo = Boolean(AI_DEMO_VIDEO.src);

  return (
    <div className="ai-page">
      {/* 1. Hero */}
      <section className="ai-hero">
        <div className="ai-container ai-hero-grid">
          <div>
            <nav className="ai-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <span>AI Engine</span>
            </nav>
            <Eyebrow>
              {AI_HERO.eyebrow} <span className="ai-new">New</span>
            </Eyebrow>
            <h1>{AI_HERO.title}</h1>
            <p className="ai-lead">{AI_HERO.pageSubtitle}</p>
            <div className="ai-btn-row">
              <TrackedLink ctaId="ai-engine-hero-primary" href="/schedule-demo?src=ai-engine-hero" className="ai-btn ai-btn--primary">
                {AI_HERO.primaryCta} <Arrow />
              </TrackedLink>
              <TrackedLink ctaId="ai-engine-hero-secondary" href="#demo" className="ai-btn ai-btn--outline">
                {hasVideo ? "Watch the Demo" : "See a Real Build"} <Arrow />
              </TrackedLink>
            </div>
          </div>
          <div className="ai-before-after" aria-label="A flow diagram turned into a working app">
            <figure className="ai-shot">
              <figcaption>Your Diagram</figcaption>
              <Image src="/ai-engine/job-work-diagram.webp" alt="Manufacturing job work flow diagram" width={1379} height={690} sizes="(max-width: 900px) 92vw, 500px" preload loading="eager" />
            </figure>
            <span className="ai-before-after-arrow" aria-hidden="true">
              <Arrow />
            </span>
            <figure className="ai-shot ai-shot--app">
              <figcaption>Your Working App</figcaption>
              <Image src="/ai-engine/schema-canvas.webp" alt="The Manufacturing Job Work app on the DGlide schema canvas" width={1760} height={470} sizes="(max-width: 900px) 92vw, 500px" preload loading="eager" />
            </figure>
          </div>
        </div>
      </section>

      {/* 2. The problem */}
      <section className="ai-section">
        <div className="ai-container ai-split">
          <header className="ai-head">
            <Eyebrow>The Problem</Eyebrow>
            <h2>{AI_PROBLEM.title}</h2>
            <p>{AI_PROBLEM.body}</p>
          </header>
          <div className="ai-compare-visual">
            <figure className="ai-code-card">
              <figcaption>Code Generators</figcaption>
              <pre aria-hidden="true">{CODE_LINES.join("\n")}</pre>
              <p>Files to host, secure and maintain</p>
            </figure>
            <figure className="ai-app-card">
              <figcaption>DGlide AI Engine</figcaption>
              <Image src="/ai-engine/schema-fields.webp" alt="Tables and fields of the job work app, editable in DGlide" width={1171} height={813} sizes="(max-width: 640px) 92vw, 300px" />
              <p>A working app you can edit</p>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="ai-section ai-section--soft" id="how-it-works">
        <div className="ai-container">
          <header className="ai-head ai-head--center">
            <Eyebrow>How It Works</Eyebrow>
            <h2>From Requirement to Running App in Four Steps</h2>
          </header>
          <ol className="ai-steps">
            {AI_STEPS.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Change it by asking */}
      <section className="ai-section">
        <div className="ai-container ai-split">
          <header className="ai-head">
            <Eyebrow>Change It by Asking</Eyebrow>
            <h2>{AI_CHANGE.title}</h2>
            <p>{AI_CHANGE.body}</p>
            <p className="ai-ask-bubble">{AI_CHANGE.example}</p>
          </header>
          <figure className="ai-frame">
            <Image src="/ai-engine/chat-workflow-built.webp" alt="A request to build workflows, followed by the AI engine creating the first workflow" width={722} height={567} sizes="(max-width: 900px) 92vw, 560px" />
            <figcaption>From a real build: workflows added by asking, then switched on when you are ready.</figcaption>
          </figure>
        </div>
      </section>

      {/* 5. Safe to ship */}
      <section className="ai-section ai-section--soft">
        <div className="ai-container">
          <header className="ai-head ai-head--center">
            <Eyebrow>Safe to Ship</Eyebrow>
            <h2>{AI_SAFE.title}</h2>
            <p>{AI_SAFE.body}</p>
          </header>
          <ol className="ai-loop" aria-label="Build, validate, fix, ship">
            {AI_SAFE.loop.map((stage, index) => (
              <li key={stage} className={index === 2 ? "is-fix" : undefined}>
                <span>{stage}</span>
              </li>
            ))}
          </ol>
          <p className="ai-loop-note">Fixes go back through validation before anything ships.</p>
        </div>
      </section>

      {/* 6. Why not just generate code */}
      <section className="ai-section">
        <div className="ai-container">
          <header className="ai-head ai-head--center">
            <Eyebrow>The Difference</Eyebrow>
            <h2>{AI_COMPARISON.title}</h2>
          </header>
          <div className="ai-table-wrap">
            <table className="ai-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Compared on</span>
                  </th>
                  <th scope="col">{AI_COMPARISON.columns[0]}</th>
                  <th scope="col" className="is-dglide">
                    {AI_COMPARISON.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {AI_COMPARISON.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.code}</td>
                    <td className="is-dglide">{row.dglide}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Demo */}
      <section className="ai-section ai-section--soft" id="demo">
        <div className="ai-container">
          <header className="ai-head ai-head--center">
            <Eyebrow>Demo</Eyebrow>
            <h2>{hasVideo ? "Watch the Demo" : "One Real Build, Step by Step"}</h2>
            <p>A manufacturing job work app, built on DGlide from a single flow diagram.{hasVideo ? "" : " These are screens from that build."}</p>
          </header>
          {hasVideo ? (
            <div className="ai-video-wrap">
              <DemoVideo />
            </div>
          ) : (
            <ol className="ai-storyboard">
              {AI_BUILD_FRAMES.map((frame, index) => (
                <li key={frame.src} className={index === 0 || index === AI_BUILD_FRAMES.length - 1 ? "is-wide" : undefined}>
                  <div className="ai-storyboard-img">
                    <Image src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} sizes={index === 0 || index === AI_BUILD_FRAMES.length - 1 ? "(max-width: 900px) 92vw, 1070px" : "(max-width: 640px) 92vw, 520px"} />
                  </div>
                  <div className="ai-storyboard-text">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{frame.title}</h3>
                    <p>{frame.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="ai-section ai-faq">
        <div className="ai-container ai-faq-grid">
          <header className="ai-head">
            <Eyebrow>FAQ</Eyebrow>
            <h2>Questions About the AI Engine</h2>
          </header>
          <div>
            {AI_FAQS.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="ai-cta">
        <div className="ai-cta-shell">
          <Eyebrow light>Book a Demo</Eyebrow>
          <h2>See It Build Live.</h2>
          <p>Bring a process diagram or a written requirement, and watch DGlide turn it into a working app.</p>
          <div className="ai-btn-row">
            <TrackedLink ctaId="ai-engine-final" href="/schedule-demo?src=ai-engine-final" className="ai-btn ai-btn--light">
              Book a Demo <Arrow />
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
