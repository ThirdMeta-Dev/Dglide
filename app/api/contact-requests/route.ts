import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { appendLeadToSheet } from "@/lib/sheets";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  contact?: unknown;
  company?: unknown;
  message?: unknown;
};

type FieldErrors = Partial<Record<"name" | "email" | "contact" | "company" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^[+\d\s().-]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactRequest(body: ContactRequestBody) {
  const values = {
    name: readString(body.name),
    email: readString(body.email).toLowerCase(),
    contact: readString(body.contact),
    company: readString(body.company),
    message: readString(body.message),
  };

  const fieldErrors: FieldErrors = {};
  const digitCount = values.contact.replace(/\D/g, "").length;

  if (!values.name) fieldErrors.name = "Name is required.";
  else if (values.name.length < 2) fieldErrors.name = "Name must be at least 2 characters.";
  else if (values.name.length > 100) fieldErrors.name = "Name must be 100 characters or less.";

  if (!values.email) fieldErrors.email = "Email ID is required.";
  else if (values.email.length > 254 || !EMAIL_RE.test(values.email))
    fieldErrors.email = "Enter a valid email address.";

  if (!values.contact) fieldErrors.contact = "Contact number is required.";
  else if (!PHONE_CHARS_RE.test(values.contact) || digitCount < 7 || digitCount > 15)
    fieldErrors.contact = "Enter a valid contact number.";

  if (!values.company) fieldErrors.company = "Company name is required.";
  else if (values.company.length < 2) fieldErrors.company = "Company name must be at least 2 characters.";
  else if (values.company.length > 140) fieldErrors.company = "Company name must be 140 characters or less.";

  if (values.message.length > 1000) fieldErrors.message = "Message must be 1000 characters or less.";

  return { values, fieldErrors };
}

export async function POST(req: Request) {
  // 5 submissions per IP per minute
  if (!checkRateLimit(`contact:${getClientIp(req)}`, { max: 5, windowMs: 60_000 }))
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });

  let body: ContactRequestBody;
  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { values, fieldErrors } = validateContactRequest(body);

  if (Object.keys(fieldErrors).length > 0)
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 }
    );

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("dglide_demo_requests").insert({
      name: values.name,
      email: values.email,
      contact: values.contact,
      company: values.company,
      message: values.message || null,
    });
    if (error) throw error;

    sendNotification(`New Contact Request — ${values.company}`, {
      name: values.name,
      email: values.email,
      phone: values.contact,
      company: values.company,
      message: values.message,
    }).catch((err: unknown) => console.error("Contact request email error:", err));

    appendLeadToSheet('Contact Us', {
      name: values.name,
      email: values.email,
      phone: values.contact,
      company: values.company,
      message: values.message,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact request error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
