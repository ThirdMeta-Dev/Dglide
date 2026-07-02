import nodemailer from "nodemailer";

export const NOTIFY_EMAILS = [
  "support@dglide.com",
  "seo@hexanovate.com",
  "drushti.gothi@hexanovate.com",
  "vamshi.vadali@hexanovate.com",
];

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotification(subject: string, html: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  await transporter.sendMail({
    from: `DGlide <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAILS,
    subject,
    html,
  });
}
