import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const thankYouPagePath = new URL("../app/(public)/thank-you/page.tsx", import.meta.url);
const accessHelperPath = new URL("../lib/thank-you-access.ts", import.meta.url);
const rootLayoutPath = new URL("../app/layout.tsx", import.meta.url);

test("thank-you page requires both the submission parameter and server cookie", async () => {
  const [pageSource, helperSource] = await Promise.all([
    readFile(thankYouPagePath, "utf8"),
    readFile(accessHelperPath, "utf8"),
  ]);

  assert.match(pageSource, /submitted === "1"/);
  assert.match(pageSource, /cookieStore\.get\(THANK_YOU_ACCESS_COOKIE\)/);
  assert.match(pageSource, /if \(!hasSubmissionAccess\) notFound\(\)/);
  assert.match(helperSource, /httpOnly: true/);
  assert.match(helperSource, /sameSite: "lax"/);
  assert.match(helperSource, /maxAge: THANK_YOU_ACCESS_MAX_AGE_SECONDS/);
  assert.match(helperSource, /url\.searchParams\.set\(THANK_YOU_ACCESS_PARAM, "1"\)/);
});

test("conversion tags render only inside the authorized thank-you page", async () => {
  const [pageSource, layoutSource] = await Promise.all([
    readFile(thankYouPagePath, "utf8"),
    readFile(rootLayoutPath, "utf8"),
  ]);

  assert.match(pageSource, /GTM-W8ZSJQM8/);
  assert.match(pageSource, /AW-18310414886/);
  assert.doesNotMatch(layoutSource, /GTM-W8ZSJQM8/);
  assert.doesNotMatch(layoutSource, /AW-18310414886/);
  assert.ok(
    pageSource.indexOf("if (!hasSubmissionAccess) notFound()") <
      pageSource.indexOf('id="google-tag-manager-thank-you"'),
    "the access guard must run before conversion tags are rendered"
  );
});

test("every successful thank-you form response grants access", async () => {
  const routePaths = [
    "../app/api/contact-requests/route.ts",
    "../app/api/demo-requests/route.ts",
    "../app/api/subscribe/route.ts",
    "../app/api/case-studies/download/route.ts",
  ];

  for (const relativePath of routePaths) {
    const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
    assert.match(source, /grantThankYouAccess\(NextResponse\.json\(\{ success: true \}\)\)/);
  }
});
