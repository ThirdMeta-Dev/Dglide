import TrackedLink from "@/components/ai-engine/TrackedLink";
import { AI_TEASER } from "@/data/aiEnginePageData";
import "@/components/ai-engine/ai-engine.css";

// Homepage block placed directly under the hero, introducing the AI engine.
export default function AiEngineTeaserSection() {
  return (
    <section className="ai-teaser" aria-labelledby="ai-teaser-title">
      <div className="ai-container">
        <header className="ai-teaser-head">
          <p className="ai-eyebrow">
            DGlide AI Engine <span className="ai-new">New</span>
          </p>
          <h2 id="ai-teaser-title">{AI_TEASER.title}</h2>
        </header>
        <ol className="ai-teaser-grid">
          {AI_TEASER.cards.map((card, index) => (
            <li className="ai-teaser-card" key={card.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </li>
          ))}
        </ol>
        <p className="ai-teaser-link">
          <TrackedLink ctaId="home-ai-teaser" href="/ai-engine" className="ai-link">
            {AI_TEASER.link}
            <svg className="ai-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </TrackedLink>
        </p>
      </div>
    </section>
  );
}
