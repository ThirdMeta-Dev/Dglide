import { HOME_FAQS } from "@/data/homepageRevamp";
import "./home-revamp.css";

// Homepage FAQ. The FAQPage schema in app/(public)/page.tsx mirrors this text exactly.
export default function HomeFaqSection() {
  return (
    <section className="hr-section hr-faq" aria-labelledby="home-faq-title">
      <div className="hr-inner hr-faq-grid">
        <header className="hr-head">
          <p className="hr-eyebrow">FAQ</p>
          <h2 id="home-faq-title">Questions About DGlide</h2>
        </header>
        <div>
          {HOME_FAQS.map((faq) => (
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
  );
}
