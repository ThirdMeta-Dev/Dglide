import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../app/(public)/case-studies/page.tsx", import.meta.url);
const dataPath = new URL("../lib/case-studies-db.ts", import.meta.url);

test("case-study listing bypasses the stale production page and data caches", async () => {
  const [pageSource, dataSource] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(dataPath, "utf8"),
  ]);

  assert.match(pageSource, /export const dynamic = ["']force-dynamic["']/);
  assert.match(pageSource, /export const revalidate = 0/);
  assert.match(pageSource, /listPublishedCaseStudiesFresh\(\)/);
  assert.match(dataSource, /supabaseServiceUncached as supabase/);

  const freshQuery = dataSource.match(
    /export async function listPublishedCaseStudiesFresh\(\): Promise<CaseStudy\[\]> \{([\s\S]*?)\n\}/
  );

  assert.ok(freshQuery, "fresh case-study query must be exported");
  assert.match(freshQuery[1], /await supabase\b/);
  assert.doesNotMatch(freshQuery[1], /supabaseCached/);

  const cachedQuery = dataSource.match(
    /export async function listPublishedCaseStudies\(\): Promise<CaseStudy\[\]> \{([\s\S]*?)\n\}/
  );

  assert.ok(cachedQuery, "cached homepage query must remain available");
  assert.match(cachedQuery[1], /await supabaseCached\b/);
});
