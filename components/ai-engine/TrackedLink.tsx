"use client";

import Link from "next/link";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

// Pushes a `cta_click` event to GTM's dataLayer, so AI Engine CTA clicks can be tracked without page-specific tags.
export function trackCta(ctaId: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "cta_click", cta_id: ctaId, page_path: window.location.pathname });
}

export default function TrackedLink({
  ctaId,
  href,
  className,
  children,
}: {
  ctaId: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isHash = href.startsWith("#");
  if (isHash) {
    return (
      <a href={href} className={className} data-cta={ctaId} onClick={() => trackCta(ctaId)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} data-cta={ctaId} onClick={() => trackCta(ctaId)}>
      {children}
    </Link>
  );
}
