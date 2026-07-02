import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAILS = [
  "support@dglide.com",
  "seo@hexanovate.com",
  "drushti.gothi@hexanovate.com",
  "vamshi.vadali@hexanovate.com",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, contact, company, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("dglide_demo_requests").insert({
      name,
      email,
      contact: contact || null,
      company,
      message: message || null,
    });

    if (error) throw error;

    // Send email notification (non-blocking — don't fail the request if email fails)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "DGlide <notifications@dglide.com>",
        to: NOTIFY_EMAILS,
        subject: `New Demo Request — ${company}`,
        html: `
          <h2>New Demo Request</h2>
          <table cellpadding="6" cellspacing="0">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${contact || "—"}</td></tr>
            <tr><td><strong>Company</strong></td><td>${company}</td></tr>
            <tr><td><strong>Message</strong></td><td>${message || "—"}</td></tr>
          </table>
        `,
      }).catch((err: unknown) => console.error("Demo request email error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo request error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
