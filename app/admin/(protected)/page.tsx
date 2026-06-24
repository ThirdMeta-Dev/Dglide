import Link from "next/link";
import {
  Layout,
  Type,
  Image as ImageIcon,
  Navigation,
  FileText,
  Settings,
  Globe,
  CalendarCheck,
  BookOpen,
} from "lucide-react";

const quickLinks = [
  {
    title: "Blog",
    description: "Write and publish blog posts with AI assistance",
    href: "/admin/blog",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Demo Requests",
    description: "View and manage schedule demo form submissions",
    href: "/admin/demo-requests",
    icon: CalendarCheck,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Header & Navigation",
    description: "Edit nav items, logo, and CTA button",
    href: "/admin/header",
    icon: Navigation,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Footer",
    description: "Manage footer links, newsletter, and contact info",
    href: "/admin/footer",
    icon: Layout,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pages",
    description: "View and edit all website pages",
    href: "/admin/pages",
    icon: FileText,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Content Blocks",
    description: "Edit text, images, and dynamic content",
    href: "/admin/content",
    icon: Type,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Media Library",
    description: "Upload and manage images and videos",
    href: "/admin/media",
    icon: ImageIcon,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Site Settings",
    description: "SEO, metadata, and global configuration",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gray-100 text-gray-600",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">
          Dashboard
        </h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
          Manage every element of your DGlide website
        </p>
      </div>

      {/* Preview link */}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2 mb-8 text-sm [font-family:var(--font-inter)] text-[#1C2BFF] hover:underline"
      >
        <Globe className="w-4 h-4" />
        View live website
      </Link>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-[20px] p-6 hover:shadow-md transition-shadow group"
          >
            <div
              className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 ${item.color}`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-black [font-family:var(--font-sora)] text-sm mb-1 group-hover:text-[#1C2BFF] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-[#888] [font-family:var(--font-inter)]">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
