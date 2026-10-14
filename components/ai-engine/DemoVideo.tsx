"use client";

import { useRef } from "react";
import { trackCta } from "./TrackedLink";
import { AI_DEMO_VIDEO } from "@/data/aiEnginePageData";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

// Demo video with play and percent-watched events for GTM. Rendered only once AI_DEMO_VIDEO.src is set.
export default function DemoVideo() {
  const sent = useRef(new Set<number>());

  function push(event: Record<string, unknown>) {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(event);
  }

  return (
    <video
      className="ai-video"
      controls
      preload="none"
      playsInline
      poster={AI_DEMO_VIDEO.poster}
      onPlay={() => trackCta("ai-demo-play")}
      onTimeUpdate={(event) => {
        const v = event.currentTarget;
        if (!v.duration) return;
        const pct = Math.floor(((v.currentTime / v.duration) * 100) / 25) * 25;
        if (pct > 0 && !sent.current.has(pct)) {
          sent.current.add(pct);
          push({ event: "video_progress", video: "ai-engine-demo", percent: pct });
        }
      }}
    >
      <source src={AI_DEMO_VIDEO.src} type="video/mp4" />
      {AI_DEMO_VIDEO.captions ? <track kind="captions" src={AI_DEMO_VIDEO.captions} srcLang="en" label="English" default /> : null}
    </video>
  );
}
