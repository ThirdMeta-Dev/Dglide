import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routePath = new URL("../app/api/contact-requests/route.ts", import.meta.url);
const mailerPath = new URL("../lib/mailer.ts", import.meta.url);

test("brochure email failure does not block lead capture or form success", async () => {
  const routeSource = await readFile(routePath, "utf8");
  const sheetWrite = routeSource.indexOf("await appendLeadToSheet(");
  const brochureEmail = routeSource.indexOf("await sendFsmBrochure({");

  assert.notEqual(sheetWrite, -1, "the lead must still be appended to Google Sheets");
  assert.notEqual(brochureEmail, -1, "the brochure email must still be attempted");
  assert.ok(
    brochureEmail > sheetWrite,
    "required lead capture must complete before the optional brochure email"
  );
  assert.match(
    routeSource,
    /await sendFsmBrochure\(\{[\s\S]*?\}\)\.catch\(\(err: unknown\) =>[\s\S]*?FSM brochure email error:/,
    "an unavailable email provider must be logged without returning a 500"
  );
});

test("local brochure emails use SMTP while production remains on SES", async () => {
  const mailerSource = await readFile(mailerPath, "utf8");

  assert.match(mailerSource, /process\.env\.NODE_ENV !== "production"/);
  assert.match(mailerSource, /process\.env\.SMTP_USER/);
  assert.match(mailerSource, /process\.env\.SMTP_PASS/);
  assert.match(mailerSource, /sesConfigured\s*\?\s*nodemailer\.createTransport/);
  assert.match(mailerSource, /host: "smtp\.gmail\.com"/);
});
