"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Navigation,
  Layout,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard",    href: "/admin",               icon: LayoutDashboard },
  { label: "Pages",        href: "/admin/pages",          icon: FileText },
  { label: "Demo Requests",href: "/admin/demo-requests",  icon: CalendarCheck },
  { label: "Header / Nav", href: "/admin/header",         icon: Navigation },
  { label: "Footer",       href: "/admin/footer",         icon: Layout },
  { label: "Media",        href: "/admin/media",          icon: ImageIcon },
  { label: "Settings",     href: "/admin/settings",       icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#F0F0F0] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-[#F0F0F0]">
        <div className="w-[120px] h-6 relative">
          <Image src="/logo.png" alt="DGlide" fill className="object-contain object-left" />
        </div>
        <span className="ml-2 text-[10px] font-medium bg-[#1C2BFF] text-white px-1.5 py-0.5 rounded-[4px] [font-family:var(--font-sora)]">
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm [font-family:var(--font-inter)] mb-0.5 transition-colors",
                isActive
                  ? "bg-[#1C2BFF]/8 text-[#1C2BFF] font-medium"
                  : "text-[#555] hover:bg-[#F5F5F5] hover:text-black"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#F0F0F0]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-[10px] text-sm text-[#888] [font-family:var(--font-inter)] hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
