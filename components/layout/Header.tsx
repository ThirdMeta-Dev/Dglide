"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItemData = {
  label: string;
  href: string;
  has_dropdown: boolean;
};

export type HeaderSettings = {
  cta_label: string;
  cta_href: string;
  is_sticky: boolean;
};

const DEFAULT_NAV: NavItemData[] = [
  { label: "Home",      href: "/",          has_dropdown: false },
  { label: "Services",  href: "/services",  has_dropdown: false },
  { label: "Solutions", href: "/solutions", has_dropdown: false },
  { label: "Platform",  href: "/platform",  has_dropdown: false },
  { label: "Industry",  href: "/industry",  has_dropdown: true  },
  { label: "Resources", href: "/resources", has_dropdown: true  },
];

const DEFAULT_SETTINGS: HeaderSettings = {
  cta_label: "Get Started Now",
  cta_href:  "/schedule-demo",
  is_sticky: true,
};

function NavItem({ item, isActive }: { item: NavItemData; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-1.5 text-sm leading-[22.4px] transition-colors duration-200 group",
        "[font-family:var(--font-sora)]",
        isActive ? "text-[#1C2BFF]" : "text-black hover:text-[#1C2BFF]"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full bg-[#1C2BFF] flex-shrink-0 transition-all duration-200",
          isActive
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
        )}
      />
      <span>{item.label}</span>
      {item.has_dropdown && (
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-colors duration-200",
            isActive ? "text-[#1C2BFF]" : "text-black group-hover:text-[#1C2BFF]"
          )}
          strokeWidth={1.5}
        />
      )}
    </Link>
  );
}

type Props = {
  navItems?: NavItemData[];
  settings?: HeaderSettings;
};

export default function Header({ navItems, settings }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (navItems && navItems.length > 0) ? navItems : DEFAULT_NAV;
  const cfg = settings ?? DEFAULT_SETTINGS;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn("z-50 w-full", cfg.is_sticky && "sticky top-0")}
      style={{ borderRadius: "0 0 25px 25px", background: "#FFF", boxShadow: "0 4px 10px 0 rgba(0,0,0,0.08)" }}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between h-[88px] px-8 max-w-[1200px] mx-auto gap-[60px]">
        <Link href="/" className="flex-shrink-0">
          <div className="w-[160px] h-[28px] relative">
            <Image src="/logo.png" alt="DGlide" fill className="object-contain object-left" priority />
          </div>
        </Link>

        <nav className="flex items-center gap-7">
          {nav.map((item) => (
            <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>

        <Link
          href={cfg.cta_href}
          className="flex items-center gap-2.5 px-8 py-[14px] rounded-[40px] text-white text-base font-semibold [font-family:var(--font-sora)] leading-[20.16px] flex-shrink-0 transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
        >
          {cfg.cta_label}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
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
        <button onClick={() => setMobileOpen((v) => !v)} className="p-2 text-black" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#F3F3F3] px-5 pb-5">
          <nav className="flex flex-col gap-1 pt-4">
            {nav.map((item) => (
              <Link
                key={item.href}
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
            ))}
          </nav>
          <Link
            href={cfg.cta_href}
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-[40px] text-white text-sm font-semibold [font-family:var(--font-sora)]"
            style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
          >
            {cfg.cta_label}
          </Link>
        </div>
      )}
    </header>
  );
}
