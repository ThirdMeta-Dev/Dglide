"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionEase } from "@/components/animations/MotionPrimitives";
import { isFsmIndiaAdsPath, openFsmIndiaLeadModal } from "@/lib/fsm-india-ads";
import { fsmNavItems } from "@/data/fsmPageData";

const FSM_ADS_HEADER_ITEMS = fsmNavItems.filter((item) => item.id !== "integrations");

export type NavItemData = {
  label: string;
  href?: string;
  has_dropdown: boolean;
  children?: NavItemData[];
};

export type HeaderSettings = {
  cta_label: string;
  cta_href: string;
  is_sticky: boolean;
};

const DEFAULT_NAV: NavItemData[] = [
  { label: "Platform", href: "/platform", has_dropdown: false },
  {
    label: "Solution",
    has_dropdown: true,
    children: [
      { label: "Customer Relationship Management", href: "/customer-relationship-management-crm", has_dropdown: false },
      { label: "Manufacturing Process Management", href: "/manufacturing-management-software", has_dropdown: false },
    ],
  },
  { label: "Pricing", href: "/pricing", has_dropdown: false },
  { label: "Why DGlide?", href: "/why-dglide", has_dropdown: false },
  { label: "Company", href: "/about", has_dropdown: false },
  {
    label: "Resources",
    href: "/resources",
    has_dropdown: true,
    children: [{ label: "Blog", href: "/blogs", has_dropdown: false }],
  },
];

const DEFAULT_SETTINGS: HeaderSettings = {
  cta_label: "Get Started Now",
  cta_href:  "/schedule-demo",
  is_sticky: true,
};

function NavItem({
  item,
  isActive,
  isChildActive,
}: {
  item: NavItemData;
  isActive: (href: string) => boolean;
  isChildActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const href = item.label === "Resources" ? undefined : item.href;
  const active = (href ? isActive(href) : false) || isChildActive;
  const children = item.children ?? [];

  return (
    <div
      className="relative group/nav"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setOpen(false);
        }
      }}
    >
      {href ? (
        <Link
          href={href}
          className={cn(
            "flex items-center gap-1.5 whitespace-nowrap text-sm leading-[22.4px] transition-colors duration-200 group",
            "[font-family:var(--font-sora)]",
            active ? "text-[#1C2BFF]" : "text-black hover:text-[#1C2BFF]"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full bg-[#1C2BFF] flex-shrink-0 transition-all duration-200",
              active
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
            )}
          />
          <span>{item.label}</span>
          {item.has_dropdown && (
            <motion.span
              className="inline-flex"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  active ? "text-[#1C2BFF]" : "text-black group-hover:text-[#1C2BFF]"
                )}
                strokeWidth={1.5}
              />
            </motion.span>
          )}
        </Link>
      ) : (
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 whitespace-nowrap text-sm leading-[22.4px] transition-colors duration-200 group bg-transparent border-0 p-0 cursor-pointer",
            "[font-family:var(--font-sora)]",
            active ? "text-[#1C2BFF]" : "text-black hover:text-[#1C2BFF]"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full bg-[#1C2BFF] flex-shrink-0 transition-all duration-200",
              active
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
            )}
          />
          <span>{item.label}</span>
          {item.has_dropdown && (
            <motion.span
              className="inline-flex"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  active ? "text-[#1C2BFF]" : "text-black group-hover:text-[#1C2BFF]"
                )}
                strokeWidth={1.5}
              />
            </motion.span>
          )}
        </button>
      )}

      <AnimatePresence>
        {children.length > 0 && open && (
        <motion.div
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div
            className={cn(
              "rounded-2xl p-2 border border-white/60 bg-white/55 backdrop-blur-2xl",
              item.label === "Resources" ? "min-w-[190px]" : "min-w-[350px]"
            )}
            style={{ boxShadow: "0 8px 32px 0 rgba(28, 43, 255, 0.14), inset 0 1px 0 0 rgba(255,255,255,0.7)" }}
          >
            {children.map((child) => (
              <Link
                key={child.href!}
                href={child.href!}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap [font-family:var(--font-sora)]",
                  "transition-colors duration-200 group/item hover:bg-white/70",
                  isActive(child.href!) ? "text-[#1C2BFF]" : "text-black hover:text-[#1C2BFF]"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full bg-[#1C2BFF] flex-shrink-0 transition-all duration-200",
                    isActive(child.href!)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100"
                  )}
                />
                <span>{child.label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-auto flex-shrink-0 transition-transform duration-200 group-hover/item:-rotate-45"
                  aria-hidden
                >
                  <path
                    d="M2.5 8H13.5M13.5 8L9.5 4M13.5 8L9.5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Props = {
  navItems?: NavItemData[];
  settings?: HeaderSettings;
};

export default function Header({ navItems, settings }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [adsActiveSection, setAdsActiveSection] = useState(FSM_ADS_HEADER_ITEMS[0].id);
  const adsDesktopNavRef = useRef<HTMLElement>(null);
  const adsDesktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [adsNavFade, setAdsNavFade] = useState({ left: false, right: true });

  const sourceNav = (navItems && navItems.length > 0) ? navItems : DEFAULT_NAV;
  const findNav = (...labels: string[]) => sourceNav.find((item) =>
    labels.includes(item.label.trim().toLowerCase())
  );
  const sourceSolutions = findNav("solutions", "solution");
  const sourceResources = findNav("resources");
  const requiredSolutionLinks: NavItemData[] = [
    { label: "Field Service Management", href: "/field-service-management-fsm", has_dropdown: false },
    { label: "IT Service Management", href: "/it-service-management-itsm", has_dropdown: false },
    { label: "Customer Relationship Management", href: "/customer-relationship-management-crm", has_dropdown: false },
    { label: "Manufacturing Process Management", href: "/manufacturing-management-software", has_dropdown: false },
  ];
  const solutionChildren = [...(sourceSolutions?.children ?? [])];
  requiredSolutionLinks.forEach((required) => {
    if (!solutionChildren.some((child) => child.href === required.href)) solutionChildren.push(required);
  });
  const comparisonPaths = new Set([
    "/dglide-vs-freshdesk",
    "/freshdesk-alternative",
    "/freshdesk-vs-dglide",
  ]);
  const resourceChildren = (sourceResources?.children ?? []).filter((child) =>
    !comparisonPaths.has(child.href ?? "") && child.label.trim().toLowerCase() !== "comparison"
  );
  if (!resourceChildren.some((child) => child.href === "/blogs")) {
    resourceChildren.push({ label: "Blog", href: "/blogs", has_dropdown: false });
  }
  if (!resourceChildren.some((child) => child.href === "/case-studies")) {
    resourceChildren.push({ label: "Case Studies", href: "/case-studies", has_dropdown: false });
  }
  const nav: NavItemData[] = [
    { label: "Platform", href: "/platform", has_dropdown: false },
    { label: "Solution", has_dropdown: true, children: solutionChildren },
    { label: "Pricing", href: "/pricing", has_dropdown: false },
    { label: "Why DGlide?", href: "/why-dglide", has_dropdown: false },
    { label: "Company", href: "/about", has_dropdown: false },
    { label: "Resources", has_dropdown: true, children: resourceChildren },
  ];
  const cfg = settings ?? DEFAULT_SETTINGS;
  const isAdsLanding = isFsmIndiaAdsPath(pathname);

  useEffect(() => {
    if (!isAdsLanding) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setAdsActiveSection(visible[0].target.id);
      },
      { rootMargin: "-105px 0px -55% 0px", threshold: 0 }
    );

    FSM_ADS_HEADER_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isAdsLanding]);

  useEffect(() => {
    if (!isAdsLanding) return;
    const nav = adsDesktopNavRef.current;
    const activeLink = adsDesktopLinkRefs.current[adsActiveSection];
    if (!nav || !activeLink) return;

    const targetLeft = activeLink.offsetLeft - nav.clientWidth / 2 + activeLink.offsetWidth / 2;
    nav.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [adsActiveSection, isAdsLanding]);

  function updateAdsNavFade() {
    const nav = adsDesktopNavRef.current;
    if (!nav) return;
    const maxScroll = nav.scrollWidth - nav.clientWidth;
    setAdsNavFade({
      left: nav.scrollLeft > 4,
      right: nav.scrollLeft < maxScroll - 4,
    });
  }

  function scrollToAdsSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;
    const headerOffset = window.innerWidth >= 1024 ? 104 : 126;
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: "smooth" });
    setAdsActiveSection(id);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  if (isAdsLanding) {
    return (
      <header
        className={cn("z-50 w-full", cfg.is_sticky && "sticky top-0")}
        style={{ borderRadius: "0 0 25px 25px", background: "#FFF", boxShadow: "0 4px 10px 0 rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-5 px-5 lg:h-[88px] lg:px-8">
          <Link href="/" className="flex-shrink-0" aria-label="DGlide home">
            <div className="relative h-6 w-[120px] lg:h-[26px] lg:w-[145px]">
              <Image src="/logo.png" alt="DGlide" fill className="object-contain object-left" priority />
            </div>
          </Link>

          <div className="relative hidden min-w-0 flex-1 lg:block">
            <nav
              ref={adsDesktopNavRef}
              onScroll={updateAdsNavFade}
              className="flex min-w-0 items-center gap-6 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="FSM page sections"
            >
              {FSM_ADS_HEADER_ITEMS.map((item) => (
                <a
                  key={item.id}
                  ref={(element) => { adsDesktopLinkRefs.current[item.id] = element; }}
                  href={`#${item.id}`}
                  onClick={(event) => scrollToAdsSection(event, item.id)}
                  className={cn(
                    "shrink-0 whitespace-nowrap text-center text-[13px] font-medium leading-5 transition-colors [font-family:var(--font-sora)] xl:text-sm",
                    adsActiveSection === item.id ? "text-[#FF7F1C]" : "text-[#222222] hover:text-[#1C2BFF]"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {adsNavFade.left ? (
              <span className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white via-white/90 to-transparent" aria-hidden="true" />
            ) : null}
            {adsNavFade.right ? (
              <span className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/90 to-transparent" aria-hidden="true" />
            ) : null}
          </div>

          <button
            type="button"
            onClick={openFsmIndiaLeadModal}
            className="dg-btn-fill flex items-center gap-2 rounded-[40px] px-5 py-3 text-sm font-semibold text-white [font-family:var(--font-sora)] lg:px-8 lg:py-[14px] lg:text-base"
            style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
          >
            {cfg.cta_label}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav
          className="flex gap-5 overflow-x-auto border-t border-[#F1F1F1] px-5 py-3 lg:hidden"
          aria-label="FSM page sections"
        >
          {FSM_ADS_HEADER_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => scrollToAdsSection(event, item.id)}
              className={cn(
                "shrink-0 whitespace-nowrap text-xs font-medium [font-family:var(--font-sora)]",
                adsActiveSection === item.id ? "text-[#FF7F1C]" : "text-[#222222]"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    );
  }

  return (
    <header
      className={cn("z-50 w-full", cfg.is_sticky && "sticky top-0")}
      style={{ borderRadius: "0 0 25px 25px", background: "#FFF", boxShadow: "0 4px 10px 0 rgba(0,0,0,0.08)" }}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between h-[88px] px-8 max-w-[1280px] mx-auto gap-[52px]">
        <Link href="/" className="flex-shrink-0">
          <div className="w-[160px] h-[28px] relative">
            <Image src="/logo.png" alt="DGlide" fill className="object-contain object-left" priority />
          </div>
        </Link>

        <nav className="flex items-center gap-7">
          {nav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={isActive}
              isChildActive={(item.children ?? []).some((c) => isActive(c.href!))}
            />
          ))}
        </nav>

        <Link
          href={cfg.cta_href}
          className="dg-btn-fill flex-shrink-0 flex items-center gap-2.5 px-8 py-[14px] rounded-[40px] text-white text-base font-semibold [font-family:var(--font-sora)] leading-[20.16px]"
          style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
        >
          {cfg.cta_label}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="flex-shrink-0"
          >
            <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between h-16 px-5">
        <Link href="/">
          <div className="w-[120px] h-6 relative">
            <Image src="/logo.png" alt="DGlide" fill className="object-contain object-left" priority />
          </div>
        </Link>
        <motion.button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 text-black"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
        <motion.div
          className="lg:hidden bg-white border-t border-[#F3F3F3] px-5 pb-5"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: motionEase }}
        >
          <nav className="flex flex-col gap-1 pt-4">
            {nav.map((item) => {
              const children = item.children ?? [];
              const hasChildren = children.length > 0;
              const isExpanded = mobileExpanded === item.label;
              const parentActive = (item.href ? isActive(item.href) : false) || children.some((c) => isActive(c.href!));

              return (
                <div key={item.label}>
                  {hasChildren ? (
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 py-2.5 text-sm [font-family:var(--font-sora)]",
                        parentActive ? "text-[#1C2BFF] font-medium" : "text-black"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {parentActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1C2BFF] flex-shrink-0" />}
                        {item.label}
                      </span>
                      <motion.span
                        className="inline-flex flex-shrink-0"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                      </motion.span>
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 py-2.5 text-sm [font-family:var(--font-sora)]",
                        isActive(item.href) ? "text-[#1C2BFF] font-medium" : "text-black"
                      )}
                    >
                      {isActive(item.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#1C2BFF]" />}
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 py-2.5 text-sm [font-family:var(--font-sora)] text-black">
                      {item.label}
                    </span>
                  )}

                  <AnimatePresence initial={false}>
                    {hasChildren && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        {children.map((child) => (
                          <Link
                            key={child.href!}
                            href={child.href!}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-2 py-2 pl-5 text-sm [font-family:var(--font-sora)]",
                              isActive(child.href!) ? "text-[#1C2BFF] font-medium" : "text-[#444]"
                            )}
                          >
                            {isActive(child.href!) && <span className="w-1.5 h-1.5 rounded-full bg-[#1C2BFF]" />}
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              href={cfg.cta_href}
              onClick={() => setMobileOpen(false)}
              className="dg-btn-fill mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-[40px] text-white text-sm font-semibold [font-family:var(--font-sora)]"
              style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
            >
              {cfg.cta_label}
            </Link>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
