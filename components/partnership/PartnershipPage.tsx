"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";

const supportItems = [
  ["sandbox-workspace", "A Sandbox Workspace", "Your own DGlide workspace to demo to clients and practice on."],
  ["short-certification", "Short Certification", "One short course, so a person on your team can set up clients."],
  ["founder-first-calls-support", "The Founder on Your First Calls", "Samir Tripathy joins your first 3 client calls."],
  ["named-partner-manager", "A Named Partner Manager", "One person who answers your questions and tracks your deals."],
  ["ready-sales-kit", "A Ready Sales Kit", "A deck, a demo video and a proposal template, ready to send."],
  ["partner-whatsapp", "A Partner WhatsApp Group", "Quick answers from the DGlide team and other partners."],
];

const faqs = [
  ["Does it cost anything to join?", "There is no joining fee in the founding partner programme. Implementation partners nominate one person to complete the short certification within 30 days. Any client-specific delivery work remains yours to scope and charge for."],
  ["When and how do partners get paid?", "Partner earnings are calculated after the client pays DGlide. Payouts are processed monthly on the 10th, are GST-exclusive, and include a TDS certificate where applicable. Amounts below ₹5,000 carry forward to the next payout cycle."],
  ["Who owns the client relationship?", "Clients you validly register stay attached to you for 90 days, with a 30-day extension while active discussions continue. DGlide checks new opportunities against the registration log. DGlide does not contact a registered client without you."],
  ["Do I keep earning when a client renews?", "Implementation partners receive 20% of every renewal while the client stays with DGlide. Founding partners keep their launch terms for 24 months. Your own implementation, training, and support fees remain entirely yours."],
  ["Is there territory exclusivity?", "The programme protects registered client opportunities rather than reserving an entire territory. The first valid registration wins and remains protected for the stated registration window."],
  ["Can chartered accountants join?", "Yes, subject to the professional rules that apply to your practice. A chartered accountant can pass the referral reward to the client as a first-year discount and retain their normal advisory fees."],
  ["Can partners in the UAE join?", "Yes. The programme is open to qualifying IT firms, consultants, and equipment-sector partners in the UAE as well as India."],
  ["What happens if a client leaves?", "Renewal earnings continue only while the client remains on DGlide. Any earned and payable amount from earlier paid periods is unaffected."],
];

const logoSources = [
  "/logos/power2u.png", "/logos/armadillo.png", "/logos/lead-controls.png",
  "/logos/clarion.png", "/logos/indo-tech.png", "/logos/jsw.svg",
  "/logos/rolcon.svg", "/logos/sharp-laser-component.svg", "/logos/tgt.svg",
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`partner-eyebrow${light ? " partner-eyebrow--light" : ""}`}>{children}</p>;
}

function Arrow() {
  return (
    <svg className="partner-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PartnerIcon({ name, className = "" }: { name: string; className?: string }) {
  return <Image className={`partner-figma-icon ${className}`.trim()} src={`/partnership/icons/${name}.svg`} alt="" aria-hidden="true" width={106} height={60} />;
}

function PartnerTick({ className = "" }: { className?: string }) {
  return <Image className={`partner-tick ${className}`.trim()} src="/solutions/hero-tick.svg" alt="" aria-hidden="true" width={24} height={14} />;
}

export default function PartnershipPage() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("fullName"),
          email: form.get("email"),
          contact: form.get("phone"),
          company: form.get("company"),
          message: form.get("partnershipRequirement"),
          formType: "Partnership Application",
          sourcePath: "/partnership",
          sourceUrl: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Failed to submit");
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="partnership-page">
      <section className="partner-hero">
        <div className="partner-container partner-hero-grid">
          <div>
            <nav className="partner-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Partners</span></nav>
            <Eyebrow>DGLIDE PARTNER PROGRAM</Eyebrow>
            <h1>Bring After-Sales Service Software to the Manufacturers You Already Serve</h1>
            <p className="partner-lead">For Tally, SAP Business One and IT partners in India and the UAE. Earn 30% of year-one subscription and 20% on every renewal, and keep all your implementation fees.</p>
            <ul className="partner-icon-lines">
              <li><PartnerIcon name="founder-first-calls" />Samir, DGlide&apos;s Founder, on Your First Client Calls</li>
              <li><PartnerIcon name="registered-clients" />Clients You Register Stay Yours</li>
            </ul>
            <div className="partner-button-row">
              <a className="partner-btn partner-btn--primary" href="#apply">Apply to Partner <Arrow /></a>
              <a className="partner-btn partner-btn--outline" href="#earnings">See What You Earn <Arrow /></a>
            </div>
            <div className="partner-trust-chips"><span>A reply within 2 working days</span><span>Founding cohort: 10 places</span><span>Used by DGlide customers</span></div>
          </div>
          <aside className="partner-snapshot" aria-label="What you earn">
            <p className="partner-card-kicker">WHAT YOU EARN</p>
            <div><strong>30%</strong><span>of the client&apos;s year-one subscription</span></div>
            <div><strong>20%</strong><span>of every renewal, while the client stays</span></div>
            <div><strong>100%</strong><span>of your implementation and support fees</span></div>
            <i aria-hidden="true" />
          </aside>
        </div>
      </section>

      <section className="partner-section" id="earnings">
        <div className="partner-container">
          <header className="partner-section-head partner-section-head--center"><Eyebrow>WHAT YOU EARN</Eyebrow><h2>What You Earn, in Rupees</h2><p>Two ways to earn. Founding partners keep these launch terms for 24 months.</p></header>
          <div className="partner-two-grid">
            <article className="partner-rate-card"><span>01</span><p className="partner-rate">30% <small>+ 20%</small></p><h3>Implementation Partner</h3><p>30% of the client&apos;s year-one subscription. 20% of every renewal, for as long as the client stays. 100% of your implementation, training and support fees.</p></article>
            <article className="partner-rate-card"><span>02</span><p className="partner-rate">20%</p><h3>Referral Partner</h3><p>20% of the client&apos;s year-one subscription, paid once the client pays. No selling or setup needed. You make the introduction, and DGlide handles the rest.</p></article>
          </div>
          <div className="partner-example"><div><Eyebrow>EXAMPLE</Eyebrow><h3>A manufacturer&apos;s service team signs up at <em>₹1,50,000 a year.</em></h3></div><dl><div><dt>Implementation partner</dt><dd>₹45,000 year one · ₹30,000 each renewal · plus your fees</dd></div><div><dt>Referral partner</dt><dd>₹30,000 once the client pays</dd></div></dl></div>
          <div className="partner-facts"><div><PartnerIcon name="paid-monthly" /><p><strong>Paid monthly</strong>On the 10th</p></div><div><PartnerIcon name="clean-paperwork" /><p><strong>Clean paperwork</strong>GST-exclusive, with a TDS certificate</p></div><div><PartnerIcon name="never-lost" /><p><strong>Never lost</strong>Minimum payout ₹5,000, carried forward</p></div></div>
          <p className="partner-center-link"><Link href="/terms-conditions">Read the Full Partner Terms <Arrow /></Link></p>
        </div>
      </section>

      <section className="partner-section partner-section--neutral" id="ways">
        <div className="partner-container">
          <header className="partner-section-head partner-section-head--center"><Eyebrow>TWO WAYS TO PARTNER</Eyebrow><h2>Pick the Way You Work With Clients</h2></header>
          <div className="partner-two-grid">
            <PartnerTrack number="01" icon="implementation-partners" title="Implementation Partners" who="Tally, SAP Business One and ERP partners in India, and IT firms in the UAE." you="Sell DGlide, set it up, train the service team and support them after go-live." earn="30% of year one, 20% of every renewal, and all your service fees." included={["A sandbox workspace", "Certification", "DGlide on your first deals", "A named partner manager"]} requirement="One person certified within 30 days of joining." button="Apply as an Implementation Partner" primary />
            <PartnerTrack number="02" icon="referral-partners" title="Referral Partners" who="Consultants, machinery dealers and advisors trusted by service heads and plant owners." you="Introduce a client. DGlide runs the demo, the setup and the support." earn="20% of year one, paid once." included={["A registration link", "A status update at each stage", "The monthly payout"]} requirement="Requirements: none." button="Apply as a Referral Partner" />
          </div>
          <div className="partner-info-rows"><p><PartnerIcon name="chartered-accountants" />Chartered accountants in practice can pass the referral reward to the client as a first-year discount and keep their own advisory fees.</p><p><PartnerIcon name="building-integration" />Building an integration with DGlide? Mention it in the application form.</p></div>
        </div>
      </section>

      <section className="partner-section partner-clients">
        <div className="partner-container partner-client-grid">
          <header className="partner-section-head"><Eyebrow>WHAT YOUR CLIENTS GET</Eyebrow><h2>Service Software Built Around the Equipment Your Clients Maintain</h2><p>Your manufacturing clients already run their books in Tally or an ERP. DGlide runs what happens after the sale.</p></header>
          <div className="partner-capability-grid">
            <Benefit icon="amc-renewals" title="AMC Contracts and Renewals">Every contract, visit schedule and renewal date in one place, so service revenue does not lapse.</Benefit>
            <Benefit icon="service-closure" title="Service Requests to Closure">Complaints logged, assigned to a technician and closed with proof of the work done.</Benefit>
            <Benefit icon="installed-base" title="Installed Base and Warranty">Every machine sold, its serial number and its warranty status, at a glance.</Benefit>
            <Benefit icon="tally-erp" title="Works Beside Tally and the ERP">DGlide sits next to the accounting system instead of replacing it.</Benefit>
          </div>
        </div>
        <div className="partner-container partner-logo-row"><div><strong>DGlide Customers</strong><Link href="/case-studies">Read the Case Studies <Arrow /></Link></div><div className="partner-logo-window"><div>{[...logoSources, ...logoSources].map((src, index) => <Image key={`${src}-${index}`} src={src} alt={index < logoSources.length ? "DGlide customer logo" : ""} aria-hidden={index >= logoSources.length} width={150} height={58} />)}</div></div></div>
      </section>

      <section className="partner-section partner-section--neutral">
        <div className="partner-container"><header className="partner-section-head partner-section-head--center"><Eyebrow>SUPPORT YOU GET</Eyebrow><h2>What DGlide Puts Behind Every Partner</h2></header><div className="partner-support-grid">{supportItems.map(([icon, title, copy]) => <article key={title}><PartnerIcon name={icon} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      </section>

      <section className="partner-section partner-protection">
        <div className="partner-container"><header className="partner-section-head partner-section-head--center"><Eyebrow>YOUR CLIENTS STAY YOURS</Eyebrow><h2>Three Rules That Protect the Clients You Bring</h2></header><div className="partner-rules-grid"><Rule icon="register-first" title="Register First">Register a client before the first demo. For 90 days that client is yours, with one 30-day extension while talks are active.</Rule><Rule icon="first-valid-registration" title="First Valid Registration Wins">DGlide checks every new lead against the register, so every opportunity has a clear owner.</Rule><Rule icon="stay-beside-you" title="We Stay Beside You">DGlide never contacts a registered client without you, and your renewal share continues for as long as they stay.</Rule></div></div>
      </section>

      <section className="partner-section partner-eligibility">
        <div className="partner-container"><header className="partner-section-head partner-section-head--center"><Eyebrow>WHO THIS IS FOR</Eyebrow><h2>Who the Program Is For, and Who It Is Not</h2></header><div className="partner-eligibility-grid"><div><h3><PartnerTick />A strong fit</h3><ul><li><PartnerTick />Firms with manufacturing or equipment clients in India or the UAE</li><li><PartnerTick />Tally, SAP Business One and ERP implementers who want service revenue</li><li><PartnerTick />Consultants and dealers trusted by service heads and plant owners</li></ul></div><div><h3>Not the right fit</h3><ul><li>Firms that sell a competing field service product</li><li>Affiliate sites without client relationships</li><li>Firms outside India and the UAE, for now</li></ul></div></div><p className="partner-eligibility-note">If the implementation track is not right for you, the referral track may be.</p></div>
      </section>

      <section className="partner-section partner-section--neutral">
        <div className="partner-container"><header className="partner-section-head partner-section-head--center"><Eyebrow>HOW IT WORKS</Eyebrow><h2>From Application to Your First Payout</h2></header><ol className="partner-steps"><Step number="01" title="Apply in Two Minutes">Tell DGlide about your firm and the clients you serve.</Step><Step number="02" title="Talk Within 2 Working Days">A named person replies and books a 30-minute call.</Step><Step number="03" title="Get Set Up in a Week">Sign, open your sandbox and start certification.</Step><Step number="04" title="Win Your First Client Together">DGlide co-sells your first deals and you earn from the first payment.</Step></ol></div>
      </section>

      <section className="partner-founding"><div className="partner-founding-shell"><div><Eyebrow light>FOUNDING PARTNERS</Eyebrow><h2>Join the First 10 DGlide Partners</h2><p>The first 10 partners lock the launch terms for 24 months and get Samir on their first 3 client calls.</p></div><div><p><strong>10</strong><span>of 10 places left</span></p><a className="partner-btn partner-btn--light" href="#apply">Claim a Founding Place <Arrow /></a></div></div></section>

      <section className="partner-section partner-faq">
        <div className="partner-container partner-faq-grid"><header className="partner-section-head"><Eyebrow>PARTNER FAQ</Eyebrow><h2>Questions From<br /><em>DGlide Partners</em></h2><p>Clear answers before you apply.</p></header><div>{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="partner-section partner-apply" id="apply">
        <div className="partner-container partner-apply-grid"><header className="partner-section-head"><Eyebrow>BECOME A PARTNER</Eyebrow><h2>Apply to Become a DGlide Partner</h2><p>Tell DGlide about your firm and your clients. A named person replies within 2 working days.</p><ol className="partner-next-list"><li><span>01</span>A reply within 2 working days</li><li><span>02</span>A 30-minute call</li><li><span>03</span>Your sandbox within a week</li></ol></header><div className="partner-form-card">{submitted ? <div className="partner-success"><span><PartnerTick /></span><h3>Thanks for applying.</h3><p>Your DGlide partner manager will reply within 2 working days.</p></div> : <form onSubmit={submitApplication}><div className="partner-field-pair"><label>Name<input name="fullName" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div><div className="partner-field-pair"><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91" required /></label><label>Company name<input name="company" autoComplete="organization" required /></label></div><label>Partnership requirement<textarea name="partnershipRequirement" rows={4} placeholder="Tell us what kind of partnership you are looking for" required /></label><p className="partner-consent">DGlide will contact you about the partner program by email or WhatsApp.</p>{error ? <p className="partner-form-error" role="alert">{error}</p> : null}<button className="partner-btn partner-btn--primary partner-btn--wide" disabled={sending} type="submit">{sending ? "Sending…" : "Send My Application"} {!sending ? <Arrow /> : null}</button><p className="partner-terms-link"><Link href="/terms-conditions">Partner Terms</Link></p></form>}</div></div>
      </section>
    </div>
  );
}

function PartnerTrack({ number, icon, title, who, you, earn, included, requirement, button, primary = false }: { number: string; icon: string; title: string; who: string; you: string; earn: string; included: string[]; requirement: string; button: string; primary?: boolean }) {
  return <article className="partner-track"><div><div className="partner-track-heading"><PartnerIcon name={icon} /><span className="partner-mark">{number}</span></div><h3>{title}</h3><dl><div><dt>Who</dt><dd>{who}</dd></div><div><dt>You</dt><dd>{you}</dd></div><div><dt>You earn</dt><dd><strong>{earn}</strong></dd></div></dl><p className="partner-mini-label">INCLUDED</p><ul>{included.map((item) => <li key={item}><PartnerTick />{item}</li>)}</ul><p className="partner-requirement">{requirement}</p></div><a className={`partner-btn partner-btn--wide ${primary ? "partner-btn--primary" : "partner-btn--outline"}`} href="#apply">{button} <Arrow /></a></article>;
}

function Benefit({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return <article className="partner-benefit"><PartnerIcon name={icon} /><h3>{title}</h3><p>{children}</p></article>;
}

function Rule({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return <article><PartnerIcon name={icon} /><h3>{title}</h3><p>{children}</p></article>;
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <li><span>{number}</span><h3>{title}</h3><p>{children}</p></li>;
}
