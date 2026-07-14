import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DGlide",
  description: "DGlide Privacy Policy — how we collect, use, and protect your personal information.",
};

const fontTasa: React.CSSProperties = { fontFamily: "var(--font-tasa-orbiter), sans-serif" };
const fontInter: React.CSSProperties = { fontFamily: "Inter, sans-serif" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ ...fontTasa, fontSize: 22, fontWeight: 500, color: "#000", marginBottom: 12, marginTop: 0 }}>
        {title}
      </h2>
      <div style={{ ...fontInter, fontSize: 15, lineHeight: "26px", color: "#555555" }}>
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#F3F3F3", minHeight: "100vh", padding: "64px 0 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ ...fontInter, fontSize: 13, color: "#FF7F1C", fontWeight: 500, marginBottom: 8, marginTop: 0 }}>
            Effective Date: May 1, 2024
          </p>
          <h1
            style={{
              ...fontTasa,
              fontSize: 44,
              fontWeight: 400,
              lineHeight: "54px",
              margin: "0 0 16px",
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 45%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ ...fontInter, fontSize: 16, lineHeight: "28px", color: "#555555", margin: 0 }}>
            This Privacy Policy describes how we collect, use, and protect your personal information
            when you use our enterprise application platform. Your privacy is important to us, and we
            are committed to safeguarding your data.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#E0E0E0", marginBottom: 40 }} />

        <Section title="Who We Are">
          <p style={{ margin: 0 }}>
            We provide enterprise software solutions as a data processor on behalf of your
            organization (the data controller). Your organization determines how your information
            is managed within our platform.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p style={{ marginTop: 0 }}>
            To deliver platform features and services requested by your organization, we may collect:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>Account Information:</strong> Name, email address,
              phone number, and other contact details provided during account setup.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>Device Information:</strong> Device type, operating
              system, unique identifiers, network details, and battery status.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>Location Data:</strong> GPS coordinates, travel
              history, and geographic details (only when using location-based services).
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>Usage Information:</strong> Feature interaction data,
              session durations, and usage analytics.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong style={{ color: "#000" }}>Media:</strong> Photos, documents, and other files
              uploaded by you while using platform features.
            </li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <p style={{ marginTop: 0 }}>
            We use the information collected for the following purposes:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
            {[
              "To provide and maintain core platform functionality",
              "To process and manage tasks assigned by your organization",
              "To improve platform performance and develop new features",
              "To help your organization monitor, report, and optimize operations",
              "To protect the security, integrity, and availability of the platform",
              "To comply with applicable legal and regulatory obligations",
            ].map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Information Sharing">
          <p style={{ marginTop: 0 }}>
            Your information is only shared under the following conditions:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 12px" }}>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>Within Your Organization:</strong> Based on
              role-based access controls set by your administrator.
            </li>
            <li style={{ marginBottom: 10 }}>
              <strong style={{ color: "#000" }}>With Service Providers:</strong> Only with trusted
              third-party providers (e.g., cloud hosting, data storage) under confidentiality
              agreements.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong style={{ color: "#000" }}>For Legal Requirements:</strong> If disclosure is
              required by law, court order, or legal process.
            </li>
          </ul>
          <p style={{ margin: 0 }}>We do not sell your personal information to third parties.</p>
        </Section>

        <Section title="Cookies and Tracking Technologies">
          <p style={{ margin: 0 }}>
            We may use cookies and similar technologies for performance monitoring and user
            experience improvements. You can manage cookie preferences through your browser settings.
          </p>
        </Section>

        <Section title="International Data Transfers">
          <p style={{ margin: 0 }}>
            Your data may be processed in countries outside your own, including where our data
            centers and service providers are located. We use appropriate safeguards, such as
            Standard Contractual Clauses (SCCs), to protect your information during international
            transfers.
          </p>
        </Section>

        <Section title="Data Security">
          <p style={{ marginTop: 0 }}>
            We implement industry-standard technical and organizational safeguards, including:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
            {[
              "Encryption of data in transit (TLS/SSL) and at rest",
              "Role-based access control and authentication mechanisms",
              "Periodic vulnerability scans and third-party security audits",
              "Staff training and internal security policies",
            ].map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Data Retention">
          <p style={{ marginTop: 0 }}>
            We retain your personal information:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 12px" }}>
            {[
              "For as long as your account is active or required by your organization",
              "As necessary for compliance with laws or internal record-keeping",
              "To resolve disputes or enforce our legal rights",
            ].map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
          <p style={{ margin: 0 }}>
            Your organization can request deletion of data, subject to regulatory and operational
            retention needs.
          </p>
        </Section>

        <Section title="Your Rights">
          <p style={{ marginTop: 0 }}>
            Depending on your location and applicable laws (e.g., GDPR, CCPA), you may have rights to:
          </p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 12px" }}>
            {[
              "Access and receive a copy of your data",
              "Correct or update inaccurate information",
              "Request deletion of your data (with exceptions)",
              "Restrict or object to specific processing activities",
              "Transfer your data to another service (data portability)",
            ].map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
          <p style={{ margin: 0 }}>
            To exercise these rights, please contact your organization&apos;s administrator or visit
            our <a href="/account-deletion" style={{ color: "#1C2BFF", textDecoration: "none" }}>Account Deletion page</a>.
          </p>
        </Section>

        <Section title="Updates to This Policy">
          <p style={{ margin: 0 }}>
            We may revise this Privacy Policy periodically. Significant changes will be communicated
            to your organization&apos;s administrator and reflected by an updated effective date.
          </p>
        </Section>

        <Section title="Contact Us">
          <p style={{ margin: "0 0 8px" }}>
            If you have any questions or concerns regarding this policy or our data practices:
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong style={{ color: "#000" }}>Email:</strong>{" "}
            <a href="mailto:support@dglide.com" style={{ color: "#1C2BFF", textDecoration: "none" }}>
              support@dglide.com
            </a>
          </p>
          <p style={{ margin: 0 }}>
            For information on how to delete your account, please visit our{" "}
            <a href="/account-deletion" style={{ color: "#1C2BFF", textDecoration: "none" }}>Account Deletion page</a>.
          </p>
        </Section>

      </div>
    </div>
  );
}
