import nodemailer from "nodemailer";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const FROM_EMAIL = "no-reply@dglide.com";
const sesConfigured = Boolean(process.env.SES_ACCESS_KEY_ID && process.env.SES_SECRET_ACCESS_KEY);
const localSmtpConfigured = Boolean(
  process.env.NODE_ENV !== "production" && process.env.SMTP_USER && process.env.SMTP_PASS
);
const emailConfigured = sesConfigured || localSmtpConfigured;
const senderEmail = sesConfigured ? FROM_EMAIL : process.env.SMTP_USER || FROM_EMAIL;

export const NOTIFY_EMAILS = [
  "samir@dglide.com",
  "vinayak@dglide.com",
];

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const sesClient = new SESv2Client({
  region: process.env.SES_REGION || "ap-south-1",
  credentials: sesConfigured
    ? {
        accessKeyId: process.env.SES_ACCESS_KEY_ID!,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
      }
    : undefined,
});

const transporter = sesConfigured
  ? nodemailer.createTransport({
      SES: { sesClient, SendEmailCommand },
    })
  : nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: localSmtpConfigured
        ? {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
          }
        : undefined,
    });

export type NotificationFields = {
  name: string;
  email: string;
  phone?: string;
  company: string;
  message?: string;
  formType?: string;
  sourcePath?: string;
  sourceUrl?: string;
};

function tableRow(label: string, value: string) {
  return `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`;
}

export async function sendCaseStudyPdf(input: {
  to: string;
  name: string;
  title: string;
  company: string;
  pdfUrl: string;
}) {
  if (!emailConfigured) throw new Error("Email is not configured");
  const { to, name, title, company, pdfUrl } = input;
  const safeTitle = escapeHtml(title);
  const safeUrl = escapeHtml(pdfUrl);
  // Files uploaded to our own storage get attached; external links
  // (Google Drive etc. — too big to attach) become a download button.
  const isAttachable = pdfUrl.includes("/storage/v1/object/public/");
  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#333;line-height:1.6">
      <h2 style="color:#1a1a1a">Your case study is here</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for your interest in <strong>${safeTitle}</strong>${company ? ` — the ${escapeHtml(company)} story` : ""}. ${
        isAttachable
          ? "The full case study is attached to this email as a PDF."
          : "Use the button below to download the full case study."
      }</p>
      <p style="margin:24px 0">
        <a href="${safeUrl}" style="background:#1C2BFF;color:#fff;text-decoration:none;padding:12px 26px;border-radius:40px;display:inline-block;font-weight:600">
          Download the case study
        </a>
      </p>
      <p>Want to see how DGlide would work for your operation? <a href="https://www.dglide.com/schedule-demo" style="color:#1C2BFF">Book a demo</a>.</p>
      <p style="color:#888;font-size:13px;margin-top:28px">— The DGlide Team</p>
    </div>
  `;
  const filename =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "case-study";
  await transporter.sendMail({
    from: `DGlide <${senderEmail}>`,
    to,
    subject: `Your DGlide case study: ${title}`,
    html,
    ...(isAttachable
      ? { attachments: [{ filename: `${filename}.pdf`, path: pdfUrl }] }
      : {}),
  });
}

export async function sendFsmBrochure(input: {
  to: string;
  name: string;
  pdfUrl: string;
}) {
  if (!emailConfigured) throw new Error("Email is not configured");
  const { to, name, pdfUrl } = input;
  const safeUrl = escapeHtml(pdfUrl);
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#333;line-height:1.65;max-width:620px;margin:0 auto">
      <p style="margin:0 0 20px;color:#1C2BFF;font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase">DGlide Field Service Management</p>
      <h2 style="margin:0 0 18px;color:#1a1a1a;font-size:26px">Your DGlide FSM brochure is ready</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for your interest in DGlide. The brochure shows how service teams can manage work orders, scheduling, technicians, customer communication, and reporting in one configurable platform.</p>
      <p style="margin:28px 0">
        <a href="${safeUrl}" style="background:#1C2BFF;color:#fff;text-decoration:none;padding:13px 28px;border-radius:40px;display:inline-block;font-weight:700">
          Download Brochure
        </a>
      </p>
      <p>If you would like to see DGlide mapped to your own field-service workflow, <a href="https://www.dglide.com/schedule-demo" style="color:#1C2BFF">book a live demo</a>.</p>
      <p style="color:#888;font-size:13px;margin-top:30px">Regards,<br />The DGlide Team</p>
    </div>
  `;
  await transporter.sendMail({
    from: `DGlide <${senderEmail}>`,
    to,
    subject: "Your DGlide FSM brochure is ready",
    html,
  });
}

export async function sendNotification(
  subject: string,
  fields: NotificationFields
) {
  if (!emailConfigured) return;
  const { name, email, phone, company, message, formType, sourcePath, sourceUrl } = fields;
  const sourceLabel = sourcePath || sourceUrl || "";
  const html = `
    <h2 style="font-family:sans-serif;color:#1a1a1a">${escapeHtml(subject)}</h2>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#333">
      ${tableRow("Name", name)}
      ${tableRow("Email", email)}
      ${tableRow("Phone", phone || "—")}
      ${tableRow("Company", company)}
      ${formType ? tableRow("Form Type", formType) : ""}
      ${sourceLabel ? tableRow("Source Page", sourceLabel) : ""}
      ${sourceUrl && sourceUrl !== sourceLabel ? tableRow("Source URL", sourceUrl) : ""}
      ${tableRow("Message", message || "—")}
    </table>
  `;
  await transporter.sendMail({
    from: `DGlide <${senderEmail}>`,
    to: NOTIFY_EMAILS,
    subject,
    html,
  });
}
