import nodemailer from "nodemailer";

export const NOTIFY_EMAILS = [
  "drushti.gothi@hexanovate.com",
  "vamshi.vadali@hexanovate.com",
  "samir@dglide.com",
  "letstalk@dglide.com",
];

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
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

export async function sendNotification(
  subject: string,
  fields: NotificationFields
) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
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
    from: `DGlide <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAILS,
    subject,
    html,
  });
}
