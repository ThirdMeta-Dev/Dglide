"use client";

import { useEffect, useRef, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { sectionNavItems } from "@/data/solutionsPageData";

// Header is 88px tall on desktop; nav is 48px — total offset for scroll-margin
const HEADER_HEIGHT = 88;

export default function SolutionsSectionNav({ items = sectionNavItems }: { items?: typeof sectionNavItems }) {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navStripRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const ids = items.map((i) => i.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${HEADER_HEIGHT + 48 + 1}px 0px -40% 0px`,
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Scroll active pill into center of the nav strip (mobile)
  useEffect(() => {
    const link = linkRefs.current[activeId];
    const strip = navStripRef.current;
    if (!link || !strip) return;
    const left = link.offsetLeft - strip.offsetWidth / 2 + link.offsetWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [activeId]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = HEADER_HEIGHT + 48 + 16; // header + nav bar + breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  return (
    <nav className="sol-nav-bar" aria-label="Solutions sections">
      <SolutionsContainer className="flex justify-center">
        <div ref={navStripRef} className="sol-section-nav">
          {items.map((item) => (
            <a
              key={item.id}
              ref={(el) => { linkRefs.current[item.id] = el; }}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`sol-section-nav-link${
                activeId === item.id ? " sol-section-nav-link--active" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </SolutionsContainer>
    </nav>
  );
}
