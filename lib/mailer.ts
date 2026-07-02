import nodemailer from "nodemailer";

export const NOTIFY_EMAILS = [
  "support@dglide.com",
  "seo@hexanovate.com",
  "drushti.gothi@hexanovate.com",
  "vamshi.vadali@hexanovate.com",
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
};

export async function sendNotification(
  subject: string,
  fields: NotificationFields
) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  const { name, email, phone, company, message } = fields;
  const html = `
    <h2 style="font-family:sans-serif;color:#1a1a1a">${escapeHtml(subject)}</h2>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#333">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "—")}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message || "—")}</td></tr>
    </table>
  `;
  await transporter.sendMail({
    from: `DGlide <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAILS,
    subject,
    html,
  });
}
