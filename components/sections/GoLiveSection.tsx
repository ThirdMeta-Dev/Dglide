import { GO_LIVE } from "@/data/homepageRevamp";
import "./home-revamp.css";

// Homepage risk block: what it takes to go live (timeline, AI checks, channels, mobile, formats).
export default function GoLiveSection() {
  return (
    <section className="hr-section hr-section--soft" aria-labelledby="go-live-title">
      <div className="hr-inner">
        <header className="hr-head">
          <p className="hr-eyebrow">{GO_LIVE.eyebrow}</p>
          <h2 id="go-live-title">{GO_LIVE.title}</h2>
          <p>{GO_LIVE.subtitle}</p>
        </header>
        <ol className="hr-golive">
          {GO_LIVE.items.map((item, index) => (
            <li key={item.title} className={item.title.startsWith("AI") ? "is-ai" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
