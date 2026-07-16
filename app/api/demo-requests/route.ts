import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { appendLeadToSheet } from "@/lib/sheets";
import { appendLeadSourceToMessage, readLeadSource } from "@/lib/lead-source";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^[+\d\s().-]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  // 5 submissions per IP per minute
  if (!checkRateLimit(`demo:${getClientIp(req)}`, { max: 5, windowMs: 60_000 }))
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = readString(body.name);
  const email = readString(body.email).toLowerCase();
  const contact = readString(body.contact);
  const company = readString(body.company);
  const message = readString(body.message);
  const source = readLeadSource(body, "Schedule Demo", req.headers.get("referer"));

  const errors: Record<string, string> = {};
  const digitCount = contact.replace(/\D/g, "").length;

  if (!name || name.length < 2 || name.length > 100)
    errors.name = "Name must be 2–100 characters.";
  if (!email || email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Enter a valid email address.";
  if (!contact || !PHONE_CHARS_RE.test(contact) || digitCount < 7 || digitCount > 15)
    errors.contact = "Enter a valid contact number.";
  if (!company || company.length < 2 || company.length > 140)
    errors.company = "Company name must be 2–140 characters.";
  if (message.length > 1000)
    errors.message = "Message must be 1000 characters or less.";

  if (Object.keys(errors).length > 0)
    return NextResponse.json({ error: "Please correct the highlighted fields.", fieldErrors: errors }, { status: 400 });

  try {
    const supabase = await createClient();
    const storedMessage = appendLeadSourceToMessage(message, source);
    const { error } = await supabase.from("dglide_demo_requests").insert({
      name, email, contact: contact || null, company, message: storedMessage || null,
    });
    if (error) throw error;

    sendNotification(`New Demo Request — ${company}`, { name, email, phone: contact, company, message, ...source })
      .catch((err: unknown) => console.error("Demo request email error:", err));

    appendLeadToSheet('Demo Request', { name, email, phone: contact, company, message, ...source }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo request error:", err);
    return NextResponse.json({ error: "We could not submit your request right now. Please try again in a moment." }, { status: 500 });
  }
}
