import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
// @ts-expect-error Node's strip-types test runner requires the explicit TypeScript extension.
import { calculateAccordionScrollTarget } from "./accordion-scroll.ts";

const comparisonStyles = readFileSync(
  new URL("./ComparisonPage.module.css", import.meta.url),
  "utf8"
);

test("prepositions a lower group before the previous group collapses", () => {
  assert.equal(
    calculateAccordionScrollTarget({
      currentScrollY: 4704,
      targetGroupTop: 500,
      stickyTop: 224,
      collapsingContentHeight: 375,
    }),
    4605
  );
});

test("aligns an earlier group without subtracting content below it", () => {
  assert.equal(
    calculateAccordionScrollTarget({
      currentScrollY: 3200,
      targetGroupTop: 420,
      stickyTop: 269,
      collapsingContentHeight: 0,
    }),
    3351
  );
});

test("keeps the preceding toggle fully visible below the sticky heading", () => {
  assert.equal(
    calculateAccordionScrollTarget({
      currentScrollY: 4341,
      targetGroupTop: 224,
      stickyTop: 224,
      collapsingContentHeight: 0,
      precedingTriggerHeight: 66,
    }),
    4275
  );
});

test("keeps the open-toggle mask inside the six-pixel accordion gap", () => {
  assert.match(
    comparisonStyles,
    /\.matrixGroupOpen \.matrixGroupButton \{[\s\S]*?box-shadow: 0 -3px 0 3px #f3f3f3;/
  );
});

test("never requests a negative document position", () => {
  assert.equal(
    calculateAccordionScrollTarget({
      currentScrollY: 40,
      targetGroupTop: 80,
      stickyTop: 224,
      collapsingContentHeight: 0,
    }),
    0
  );
});
