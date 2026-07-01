import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | DGlide",
  description: "DGlide Terms and Conditions — rules and guidelines for using our platform and services.",
};

const fontTasa: React.CSSProperties = { fontFamily: "var(--font-tasa-orbiter), sans-serif" };
const fontInter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };
const body: React.CSSProperties = { ...fontInter, fontSize: 15, lineHeight: "26px", color: "#555555" };
const h2Style: React.CSSProperties = { ...fontTasa, fontSize: 20, fontWeight: 500, color: "#000", margin: "0 0 10px" };
const p: React.CSSProperties = { margin: "0 0 12px" };
const ul: React.CSSProperties = { paddingLeft: 20, margin: "8px 0 12px" };
const li: React.CSSProperties = { marginBottom: 8 };

function S({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
      <h2 style={h2Style}>{title}</h2>
      <div style={body}>{children}</div>
    </div>
  );
}

const TOC_ITEMS = [
  ["agreement",            "Agreement"],
  ["our-services",         "1. Our Services"],
  ["ip-rights",            "2. Intellectual Property Rights"],
  ["user-representations", "3. User Representations"],
  ["user-registration",    "4. User Registration"],
  ["products",             "5. Products"],
  ["purchases-payment",    "6. Purchases and Payment"],
  ["subscriptions",        "7. Subscriptions"],
  ["refunds",              "8. Return / Refunds Policy"],
  ["software",             "9. Software"],
  ["prohibited",           "10. Prohibited Activities"],
  ["ugc",                  "11. User Generated Contributions"],
  ["contribution-license", "12. Contribution License"],
  ["reviews",              "13. Guidelines for Reviews"],
  ["mobile-app",           "14. Mobile Application License"],
  ["social-media",         "15. Social Media"],
  ["third-party",          "16. Third-Party Websites and Content"],
  ["advertisers",          "17. Advertisers"],
  ["services-mgmt",        "18. Services Management"],
  ["privacy",              "19. Privacy Policy"],
  ["dmca",                 "20. DMCA Notice and Policy"],
  ["termination",          "21. Term and Termination"],
  ["modifications",        "22. Modifications and Interruptions"],
  ["governing-law",        "23. Governing Law"],
  ["dispute-resolution",   "24. Dispute Resolution"],
  ["corrections",          "25. Corrections"],
  ["disclaimer",           "26. Disclaimer"],
  ["liability",            "27. Limitations of Liability"],
  ["indemnification",      "28. Indemnification"],
  ["user-data",            "29. User Data"],
  ["electronic-comms",     "30. Electronic Communications and Signatures"],
  ["california",           "31. California Users and Residents"],
  ["miscellaneous",        "32. Miscellaneous"],
  ["contact",              "33. Contact Us"],
];

const subH: React.CSSProperties = { ...fontInter, fontSize: 14, fontWeight: 600, color: "#000", margin: "0 0 6px" };

export default function TermsConditionsPage() {
  return (
    <div style={{ background: "#F3F3F3", minHeight: "100vh", padding: "64px 0 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Page header — full width */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ ...fontInter, fontSize: 13, color: "#FF7F1C", fontWeight: 500, marginBottom: 8, marginTop: 0 }}>
            Last Updated: May 1, 2024
          </p>
          <h1 style={{
            ...fontTasa, fontSize: 44, fontWeight: 400, lineHeight: "54px", margin: "0 0 16px",
            background: "linear-gradient(90deg, #FF7F1C 0%, #000000 45%)",
            backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ ...fontInter, fontSize: 16, lineHeight: "28px", color: "#555555", margin: 0 }}>
            At DGlide, we believe in creating seamless experiences for businesses. Our Terms &amp; Conditions
            outline the rules and guidelines for using our platform and services. We aim to ensure that
            your journey with us is secure, fair, and easy to understand.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>

          {/* ── LEFT: sticky TOC ── */}
          <aside style={{
            width: 260,
            flexShrink: 0,
            position: "sticky",
            top: 90,
            alignSelf: "flex-start",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
          }}>
            <p style={{ ...fontInter, fontSize: 15, fontWeight: 700, color: "#000", margin: "0 0 16px" }}>
              Contents
            </p>
            <nav>
              {TOC_ITEMS.map(([id, label]) => (
                <div key={id} style={{ marginBottom: 10 }}>
                  <a
                    href={`#${id}`}
                    style={{
                      ...fontInter,
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#1C2BFF",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </nav>
          </aside>

          {/* ── RIGHT: scrollable content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ height: 1, background: "#E0E0E0", marginBottom: 40 }} />

            {/* Agreement */}
            <S id="agreement" title="Agreement">
              <p style={p}>
                We are DGlide, doing business as DGlide (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                a company registered in India at Office No. 337, 3rd Floor, Amanora Chambers, Hadapsar, Pune 411028, India.
              </p>
              <p style={p}>
                We operate the website <a href="https://dglide.com" style={{ color: "#1C2BFF" }}>https://dglide.com</a> (the &ldquo;Site&rdquo;) and
                the DGlide mobile application (the &ldquo;App&rdquo;), as well as any other related products and services that refer or
                link to these legal terms (collectively, the &ldquo;Services&rdquo;).
              </p>
              <p style={p}>
                You can contact us by phone at +91 95884 82557, email at{" "}
                <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>, or by mail to the address above.
              </p>
              <p style={p}>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity
                (&ldquo;you&rdquo;), and DGlide, concerning your access to and use of the Services. You agree that by accessing the
                Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL
                OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p style={p}>
                We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time.
                We will alert you about any changes by updating the &ldquo;Last updated&rdquo; date. It is your responsibility to
                periodically review these Legal Terms to stay informed of updates.
              </p>
              <p style={{ margin: 0 }}>
                The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to
                use or register for the Services.
              </p>
            </S>

            {/* 1 */}
            <S id="our-services" title="1. Our Services">
              <p style={p}>
                The information provided when using the Services is not intended for distribution to or use by any person or entity in
                any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject
                us to any registration requirement within such jurisdiction or country. Those persons who choose to access the Services
                from other locations do so on their own initiative and are solely responsible for compliance with local laws.
              </p>
              <p style={{ margin: 0 }}>
                The Services are not tailored to comply with industry-specific regulations (HIPAA, FISMA, etc.), so if your interactions
                would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate
                the Gramm-Leach-Bliley Act (GLBA).
              </p>
            </S>

            {/* 2 */}
            <S id="ip-rights" title="2. Intellectual Property Rights">
              <p style={subH}>Our intellectual property</p>
              <p style={p}>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code,
                databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services
                (collectively, the &ldquo;Content&rdquo;), as well as the trademarks, service marks, and logos contained therein
                (the &ldquo;Marks&rdquo;).
              </p>
              <p style={p}>
                Our Content and Marks are protected by copyright and trademark laws and treaties in India and around the world. The
                Content and Marks are provided in or through the Services &ldquo;AS IS&rdquo; for your internal business purpose only.
              </p>
              <p style={subH}>Your use of our Services</p>
              <p style={p}>Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable license to:</p>
              <ul style={ul}>
                <li style={li}>access the Services; and</li>
                <li style={li}>download or print a copy of any portion of the Content to which you have properly gained access, solely for your internal business purpose.</li>
              </ul>
              <p style={p}>
                Except as set out in this section, no part of the Services and no Content or Marks may be copied, reproduced,
                aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold,
                licensed, or otherwise exploited for any purpose whatsoever, without our express prior written permission.
              </p>
              <p style={p}>
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section, please address
                your request to: <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>.
              </p>
              <p style={p}>
                We reserve all rights not expressly granted to you in and to the Services, Content, and Marks. Any breach of these
                Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services
                will terminate immediately.
              </p>
              <p style={subH}>Your submissions and contributions</p>
              <p style={p}>
                By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services
                (&ldquo;Submissions&rdquo;), you agree to assign to us all intellectual property rights in such Submission. We shall own
                this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, without acknowledgment
                or compensation to you.
              </p>
              <p style={p}>
                When you post Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive,
                transferable, royalty-free, fully-paid, worldwide right and license to use, copy, reproduce, distribute, sell,
                publish, broadcast, store, publicly perform, publicly display, reformat, translate, excerpt, and exploit your
                Contributions for any purpose, commercial, advertising, or otherwise.
              </p>
              <p style={p}>
                You are solely responsible for your Submissions and Contributions and expressly agree to reimburse us for any and
                all losses that we may suffer because of your breach of this section, any third party&apos;s intellectual property
                rights, or applicable law.
              </p>
              <p style={subH}>Copyright infringement</p>
              <p style={{ margin: 0 }}>
                We respect the intellectual property rights of others. If you believe that any material available on or through the
                Services infringes upon any copyright you own or control, please immediately refer to the DMCA Notice and Policy
                section below.
              </p>
            </S>

            {/* 3 */}
            <S id="user-representations" title="3. User Representations">
              <p style={p}>By using the Services, you represent and warrant that:</p>
              <ol style={{ ...ul, paddingLeft: 24 }}>
                {[
                  "all registration information you submit will be true, accurate, current, and complete;",
                  "you will maintain the accuracy of such information and promptly update such registration information as necessary;",
                  "you have the legal capacity and you agree to comply with these Legal Terms;",
                  "you are not under the age of 13;",
                  "you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services;",
                  "you will not access the Services through automated or non-human means, whether through a bot, script, or otherwise;",
                  "you will not use the Services for any illegal or unauthorized purpose; and",
                  "your use of the Services will not violate any applicable law or regulation.",
                ].map((item) => <li key={item.slice(0, 40)} style={li}>{item}</li>)}
              </ol>
              <p style={{ margin: 0 }}>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend
                or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
              </p>
            </S>

            {/* 4 */}
            <S id="user-registration" title="4. User Registration">
              <p style={{ margin: 0 }}>
                You may be required to register to use the Services. You agree to keep your password confidential and will be
                responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username
                you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise
                objectionable.
              </p>
            </S>

            {/* 5 */}
            <S id="products" title="5. Products">
              <p style={{ margin: 0 }}>
                We make every effort to display as accurately as possible the features, specifications, and details of the products
                and services available through the Services. However, we do not guarantee that descriptions will be accurate,
                complete, reliable, current, or free of other errors. All products and services are subject to availability, and we
                reserve the right to discontinue any products or services at any time for any reason. Prices for all products are
                subject to change.
              </p>
            </S>

            {/* 6 */}
            <S id="purchases-payment" title="6. Purchases and Payment">
              <p style={p}>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made via the
                Services. You further agree to promptly update account and payment information, including email address, payment
                method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
              </p>
              <p style={p}>
                Applicable taxes will be added to the price of purchases as required by law. We may change prices at any time. You
                agree to pay all charges at the prices then in effect for your purchases, and you authorise us to charge your chosen
                payment provider for any such amounts upon placing your order.
              </p>
              <p style={{ margin: 0 }}>
                We reserve the right to refuse any order placed through the Services and to limit or cancel quantities purchased per
                person, per household, or per order at our sole discretion.
              </p>
            </S>

            {/* 7 */}
            <S id="subscriptions" title="7. Subscriptions">
              <p style={subH}>Billing and Renewal</p>
              <p style={p}>
                Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment
                method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you
                cancel the applicable subscription. The length of your billing cycle will depend on the type of subscription plan
                you choose when you subscribed to the Services.
              </p>
              <p style={subH}>Free Trial</p>
              <p style={p}>
                We may offer a free trial to new users who register with the Services. The account will be charged according to the
                user&apos;s chosen subscription at the end of the free trial period.
              </p>
              <p style={subH}>Cancellation</p>
              <p style={p}>
                You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the
                end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at{" "}
                <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>.
              </p>
              <p style={subH}>Fee Changes</p>
              <p style={{ margin: 0 }}>
                We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in
                accordance with applicable law.
              </p>
            </S>

            {/* 8 */}
            <S id="refunds" title="8. Return / Refunds Policy">
              <p style={{ margin: 0 }}>
                All sales are final. We do not issue refunds except as required by applicable law or as otherwise agreed in writing.
                If you believe you are entitled to a refund, please contact us at{" "}
                <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>.
              </p>
            </S>

            {/* 9 */}
            <S id="software" title="9. Software">
              <p style={{ margin: 0 }}>
                We may include software for use in connection with our Services. If such software is accompanied by an end user
                license agreement (&ldquo;EULA&rdquo;), the terms of the EULA will govern your use of the software. If such
                software is not accompanied by a EULA, then we grant to you a non-exclusive, revocable, personal, and
                non-transferable license to use such software solely in connection with our Services and in accordance with these
                Legal Terms. Any software and related documentation is provided &ldquo;AS IS&rdquo; without warranty of any kind.
                You may not reproduce or redistribute any software except in accordance with the EULA or these Legal Terms.
              </p>
            </S>

            {/* 10 */}
            <S id="prohibited" title="10. Prohibited Activities">
              <p style={p}>
                You may not access or use the Services for any purpose other than that for which we make the Services available.
                As a user of the Services, you agree not to:
              </p>
              <ul style={ul}>
                {[
                  "Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
                  "Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.",
                  "Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services.",
                  "Engage in unauthorized framing of or linking to the Services.",
                  "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
                  "Make improper use of our support services or submit false reports of abuse or misconduct.",
                  "Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.",
                  "Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.",
                  "Attempt to impersonate another user or person or use the username of another user.",
                  "Use any information obtained from the Services in order to harass, abuse, or harm another person.",
                  "Use the Services as part of any effort to compete with us or otherwise use the Services for any revenue-generating endeavor or commercial enterprise.",
                  "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.",
                  "Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.",
                  "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.",
                  "Delete the copyright or other proprietary rights notice from any Content.",
                  "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the Services.",
                  "Upload or transmit any material that acts as a passive or active information collection or transmission mechanism, including clear gifs, 1×1 pixels, web bugs, cookies, or other similar devices.",
                  "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.",
                  "Use the Services in a manner inconsistent with any applicable laws or regulations.",
                ].map((item) => <li key={item.slice(0, 40)} style={li}>{item}</li>)}
              </ul>
            </S>

            {/* 11 */}
            <S id="ugc" title="11. User Generated Contributions">
              <p style={p}>
                The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
                other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform,
                publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text,
                writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material
                (collectively, &ldquo;Contributions&rdquo;). Any Contributions you transmit may be treated as non-confidential
                and non-proprietary.
              </p>
              <p style={p}>When you create or make available any Contributions, you thereby represent and warrant that:</p>
              <ul style={ul}>
                {[
                  "The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including copyright, patent, trademark, trade secret, or moral rights of any third party.",
                  "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us to use your Contributions in any manner contemplated by the Services and these Legal Terms.",
                  "Your Contributions are not false, inaccurate, or misleading.",
                  "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.",
                  "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable.",
                  "Your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.",
                  "Your Contributions do not violate any applicable law, regulation, or rule.",
                  "Your Contributions do not violate the privacy or publicity rights of any third party.",
                  "Your Contributions do not include any offensive comments connected to race, national origin, gender, sexual preference, or physical handicap.",
                ].map((item) => <li key={item.slice(0, 40)} style={li}>{item}</li>)}
              </ul>
              <p style={{ margin: 0 }}>
                Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other
                things, termination or suspension of your rights to use the Services.
              </p>
            </S>

            {/* 12 */}
            <S id="contribution-license" title="12. Contribution License">
              <p style={p}>
                By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant
                that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive,
                transferable, royalty-free, fully-paid, worldwide right and license to host, use, copy, reproduce, disclose, sell,
                resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate,
                transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising,
                or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant
                and authorise sublicenses of the foregoing.
              </p>
              <p style={p}>
                We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and
                any intellectual property rights or other proprietary rights associated with your Contributions.
              </p>
              <p style={{ margin: 0 }}>
                We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions;
                (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to
                pre-screen or delete any Contributions at any time and for any reason, without notice.
              </p>
            </S>

            {/* 13 */}
            <S id="reviews" title="13. Guidelines for Reviews">
              <p style={p}>
                We may provide you with areas on the Services to leave reviews or ratings. When posting a review, you agree to
                comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed;
                (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language;
                (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age,
                marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal
                activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make
                any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and
                (8) you may not organise a campaign encouraging others to post reviews, whether positive or negative.
              </p>
              <p style={{ margin: 0 }}>
                We assume no liability for any review or for any claims, liabilities, or losses resulting from any review. By
                posting a review, you grant us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and
                sublicensable license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute
                all content relating to the review.
              </p>
            </S>

            {/* 14 */}
            <S id="mobile-app" title="14. Mobile Application License">
              <p style={subH}>Use License</p>
              <p style={p}>
                If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited
                right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use
                the App strictly in accordance with the terms and conditions of this mobile application license. You shall not:
                (1) decompile, reverse engineer, disassemble, or attempt to derive the source code of the App;
                (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App;
                (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App;
                (4) remove, alter, or obscure any proprietary notice posted by us or the licensors of the App;
                (5) use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not
                designed or intended.
              </p>
              <p style={subH}>Apple and Android Devices</p>
              <p style={{ margin: 0 }}>
                The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an
                &ldquo;App Distributor&rdquo;): (1) the license granted to you for our App is limited to a non-transferable license
                to use the application on a device that utilises the Apple iOS or Android operating systems, as applicable, and in
                accordance with the usage rules set forth in the applicable App Distributor&apos;s terms of service; (2) we are
                responsible for providing any maintenance and support services with respect to the App as specified in these Legal
                Terms; (3) you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and
                support services with respect to the App; (4) you represent and warrant that you are not located in a country that
                is subject to a government embargo or that has been designated as a &ldquo;terrorist supporting&rdquo; country.
              </p>
            </S>

            {/* 15 */}
            <S id="social-media" title="15. Social Media">
              <p style={{ margin: 0 }}>
                As part of the functionality of the Services, you may link your account with online accounts you have with
                third-party service providers (each such account, a &ldquo;Third-Party Account&rdquo;) by either: (1) providing
                your Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party
                Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.
                You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or
                grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern
                your use of the applicable Third-Party Account. By granting us access to any Third-Party Accounts, you understand
                that we may access, make available, and store any content that you have provided to and stored in your Third-Party
                Account so that it is available on and through the Services via your account. You will have the ability to disable
                the connection between your account on the Services and your Third-Party Accounts at any time.
              </p>
            </S>

            {/* 16 */}
            <S id="third-party" title="16. Third-Party Websites and Content">
              <p style={{ margin: 0 }}>
                The Services may contain links to other websites (&ldquo;Third-Party Websites&rdquo;) as well as articles,
                photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other
                content or items belonging to or originating from third parties (&ldquo;Third-Party Content&rdquo;). Such
                Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy,
                appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through
                the Services or any Third-Party Content posted on, available through, or installed from the Services. Inclusion of,
                linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not
                imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites
                or to use or install any Third-Party Content, you do so at your own risk.
              </p>
            </S>

            {/* 17 */}
            <S id="advertisers" title="17. Advertisers">
              <p style={{ margin: 0 }}>
                We allow advertisers to display their advertisements and other information in certain areas of the Services, such
                as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and
                we have no other relationship with advertisers.
              </p>
            </S>

            {/* 18 */}
            <S id="services-mgmt" title="18. Services Management">
              <p style={{ margin: 0 }}>
                We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms;
                (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms,
                including reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation,
                refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of
                your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability,
                to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way
                burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and
                property and to facilitate the proper functioning of the Services.
              </p>
            </S>

            {/* 19 */}
            <S id="privacy" title="19. Privacy Policy">
              <p style={{ margin: 0 }}>
                We care about data privacy and security. Please review our{" "}
                <a href="/privacy-policy" style={{ color: "#1C2BFF" }}>Privacy Policy</a>. By using the Services, you agree to be
                bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted
                in India. If you access the Services from any other region of the world with laws or other requirements governing
                personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued
                use of the Services, you are transferring your data to India, and you expressly consent to have your data transferred
                to and processed in India.
              </p>
            </S>

            {/* 20 */}
            <S id="dmca" title="20. Digital Millennium Copyright Act (DMCA) Notice and Policy">
              <p style={subH}>Notifications</p>
              <p style={p}>
                We respect the intellectual property rights of others. If you believe that any material available on or through the
                Services infringes upon any copyright you own or control, please immediately notify our Designated Copyright Agent
                using the contact information provided below (a &ldquo;Notification&rdquo;).
              </p>
              <p style={p}>All Notifications should include the following information:</p>
              <ol style={{ ...ul, paddingLeft: 24 }}>
                {[
                  "A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;",
                  "Identification of the copyrighted work claimed to have been infringed;",
                  "Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material;",
                  "Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and email address;",
                  "A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and",
                  "A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.",
                ].map((item) => <li key={item.slice(0, 40)} style={li}>{item}</li>)}
              </ol>
              <p style={subH}>Designated Copyright Agent</p>
              <p style={{ margin: 0, lineHeight: "26px" }}>
                DGlide Legal Team<br />
                Attn: Copyright Agent<br />
                Office No. 337, 3rd Floor, Amanora Chambers<br />
                Hadapsar, Pune 411028, India<br />
                Email: <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>
              </p>
            </S>

            {/* 21 */}
            <S id="termination" title="21. Term and Termination">
              <p style={p}>
                These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER
                PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY,
                DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON,
                INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL
                TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE
                YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
              </p>
              <p style={{ margin: 0 }}>
                If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new
                account under your name, a fake or borrowed name, or the name of any third party. In addition to terminating or
                suspending your account, we reserve the right to take appropriate legal action, including without limitation
                pursuing civil, criminal, and injunctive redress.
              </p>
            </S>

            {/* 22 */}
            <S id="modifications" title="22. Modifications and Interruptions">
              <p style={p}>
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at
                our sole discretion without notice. We have no obligation to update any information on our Services. We also reserve
                the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to
                you or any third party for any modification, price change, suspension, or discontinuance of the Services.
              </p>
              <p style={{ margin: 0 }}>
                We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other
                problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. You
                agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access
                or use the Services during any downtime or discontinuance of the Services.
              </p>
            </S>

            {/* 23 */}
            <S id="governing-law" title="23. Governing Law">
              <p style={{ margin: 0 }}>
                These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of India,
                applicable to agreements made and to be entirely performed within India, without regard to its conflict of law
                principles.
              </p>
            </S>

            {/* 24 */}
            <S id="dispute-resolution" title="24. Dispute Resolution">
              <p style={subH}>Informal Negotiations</p>
              <p style={p}>
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms,
                the Parties agree to first attempt to negotiate any Dispute informally for at least 30 days before initiating
                arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
              </p>
              <p style={subH}>Binding Arbitration</p>
              <p style={p}>
                If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and
                exclusively resolved through binding arbitration. The arbitration shall be commenced and conducted under the
                Commercial Arbitration Rules of the American Arbitration Association (&ldquo;AAA&rdquo;) and, where appropriate,
                the AAA&apos;s Supplementary Procedures for Consumer Related Disputes. The arbitrator must follow applicable law,
                and any award may be challenged if the arbitrator fails to do so.
              </p>
              <p style={subH}>Restrictions</p>
              <p style={p}>
                The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the
                full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right
                or authority for any Dispute to be arbitrated on a class-action basis; and (c) there is no right or authority for
                any Dispute to be brought in a purported representative capacity on behalf of the general public.
              </p>
              <p style={subH}>Exceptions</p>
              <p style={{ margin: 0 }}>
                The Parties agree that the following Disputes are not subject to the above provisions: (a) any Disputes seeking to
                enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any
                Dispute related to allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for
                injunctive relief.
              </p>
            </S>

            {/* 25 */}
            <S id="corrections" title="25. Corrections">
              <p style={{ margin: 0 }}>
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including
                descriptions, pricing, availability, and various other information. We reserve the right to correct any errors,
                inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
              </p>
            </S>

            {/* 26 */}
            <S id="disclaimer" title="26. Disclaimer">
              <p style={{ margin: 0 }}>
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT
                YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN
                CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
                ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY
                FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE OF
                ANY NATURE WHATSOEVER RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE
                OF OUR SECURE SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                TRANSMISSION TO OR FROM THE SERVICES, OR (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
                TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY.
              </p>
            </S>

            {/* 27 */}
            <S id="liability" title="27. Limitations of Liability">
              <p style={{ margin: 0 }}>
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE,
                LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR
                ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF
                ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.
              </p>
            </S>

            {/* 28 */}
            <S id="indemnification" title="28. Indemnification">
              <p style={{ margin: 0 }}>
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
                respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or
                demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of:
                (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your
                representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party,
                including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of
                the Services with whom you connected via the Services.
              </p>
            </S>

            {/* 29 */}
            <S id="user-data" title="29. User Data">
              <p style={{ margin: 0 }}>
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the
                Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data,
                you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using
                the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you
                hereby waive any right of action against us arising from any such loss or corruption of such data.
              </p>
            </S>

            {/* 30 */}
            <S id="electronic-comms" title="30. Electronic Communications, Transactions, and Signatures">
              <p style={{ margin: 0 }}>
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You
                consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other
                communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that
                such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND
                OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED
                BY US OR VIA THE SERVICES.
              </p>
            </S>

            {/* 31 */}
            <S id="california" title="31. California Users and Residents">
              <p style={{ margin: 0 }}>
                If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the
                Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market
                Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
              </p>
            </S>

            {/* 32 */}
            <S id="miscellaneous" title="32. Miscellaneous">
              <p style={{ margin: 0 }}>
                These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement
                and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms
                shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible
                by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible
                or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any
                provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that
                provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and
                enforceability of any remaining provisions. There is no joint venture, partnership, employment, or agency
                relationship created between you and us as a result of these Legal Terms or use of the Services.
              </p>
            </S>

            {/* 33 */}
            <S id="contact" title="33. Contact Us">
              <p style={p}>
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the
                Services, please contact us at:
              </p>
              <p style={{ margin: 0, lineHeight: "28px" }}>
                <strong style={{ color: "#000" }}>DGlide</strong><br />
                Office No. 337, 3rd Floor, Amanora Chambers<br />
                Hadapsar, Pune 411028, India<br />
                Phone: <a href="tel:+919588482557" style={{ color: "#1C2BFF" }}>+91 95884 82557</a><br />
                Email: <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF" }}>support@dglide.com</a>
              </p>
            </S>

          </div>{/* end right column */}
        </div>{/* end two-column */}
      </div>
    </div>
  );
}
