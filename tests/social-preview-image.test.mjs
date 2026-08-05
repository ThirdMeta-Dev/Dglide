import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const imagePath = new URL("../public/social/dglide-homepage-hero.png", import.meta.url);
const layoutPath = new URL("../app/layout.tsx", import.meta.url);

test("homepage social preview contains the full hero capture", async () => {
  const [image, imageStats, layoutSource] = await Promise.all([
    readFile(imagePath),
    stat(imagePath),
    readFile(layoutPath, "utf8"),
  ]);

  assert.deepEqual(
    image.subarray(0, 8),
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    "social preview must remain a PNG",
  );
  assert.equal(image.readUInt32BE(16), 1754, "PNG width must match the supplied capture");
  assert.equal(image.readUInt32BE(20), 1400, "PNG height must match the supplied capture");
  assert.ok(imageStats.size > 100_000, "social preview is unexpectedly small and may be blank");

  assert.match(layoutSource, /url: ['"]\/social\/dglide-homepage-hero\.png['"]/);
  assert.match(layoutSource, /width: 1754/);
  assert.match(layoutSource, /height: 1400/);
});
