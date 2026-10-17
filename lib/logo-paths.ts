// Customer logo paths: the admin panel may still hold the old file names from before the
// 28 Sep logo rename. next.config.ts redirects them, but next/image does not follow redirects
// (the optimiser returns 404), so every logo strip maps old names to current files here.

const LEGACY_LOGO_PATHS: Record<string, string> = {
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

const LOGO_NAMES: Record<string, string> = {
  "/logos/power2u.png": "Power2U",
  "/logos/armadillo.png": "AMS India",
  "/logos/lead-controls.png": "Load Controls",
  "/logos/clarion.png": "Clarion Coolers",
  "/logos/indo-tech.png": "Indotech",
  "/logos/jsw.svg": "JSW Steel",
  "/logos/rolcon.svg": "Rolcon",
  "/logos/sharp-laser-component.svg": "Sharp Laser Component",
  "/logos/tgt.svg": "TGT Watches",
};

export function currentLogoSrc(src: string): string {
  return LEGACY_LOGO_PATHS[src] ?? src;
}

// Company name for a logo; generic CMS alt text like "Client Logo" is replaced when the file is known.
export function logoAlt(src: string, cmsAlt?: string): string {
  const generic = !cmsAlt || /^client logo$/i.test(cmsAlt.trim());
  return generic ? LOGO_NAMES[currentLogoSrc(src)] ?? cmsAlt ?? "Customer logo" : cmsAlt;
}
