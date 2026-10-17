import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("./LogoCarouselSection.tsx", import.meta.url);
const resolverPath = new URL("../../lib/logo-paths.ts", import.meta.url);

const legacyLogoMappings = {
  "/logos/logo-1.png": "/logos/power2u.png",
  "/logos/logo-2.png": "/logos/armadillo.png",
  "/logos/logo-3.png": "/logos/lead-controls.png",
  "/logos/logo-4.png": "/logos/clarion.png",
  "/logos/logo-5.png": "/logos/indo-tech.png",
  "/logos/client-jsw.svg": "/logos/jsw.svg",
  "/logos/client-rolcon.svg": "/logos/rolcon.svg",
  "/logos/client-sharplaser.svg": "/logos/sharp-laser-component.svg",
  "/logos/client-tgt.svg": "/logos/tgt.svg",
};

test("saved legacy logo paths resolve to existing renamed assets", async () => {
  const [componentSource, resolverSource] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(resolverPath, "utf8"),
  ]);

  for (const [legacyPath, currentPath] of Object.entries(legacyLogoMappings)) {
    assert.match(
      resolverSource,
      new RegExp(`${legacyPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*${currentPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
      `${legacyPath} must map to ${currentPath}`,
    );

    const assetUrl = new URL(`../../public${currentPath}`, import.meta.url);
    const assetStats = await stat(assetUrl);
    assert.ok(assetStats.size > 0, `${currentPath} must exist and be non-empty`);
  }

  assert.match(componentSource, /currentLogoSrc\(data\?\.\[`logo_/);
});
