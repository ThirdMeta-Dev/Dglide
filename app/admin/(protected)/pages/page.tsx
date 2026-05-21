"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FileText, Eye, EyeOff, LayoutGrid } from "lucide-react";

type Page = {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  is_published: boolean;
  updated_at: string;
};

const PAGE_EDITOR_ROUTES: Record<string, string> = {
  home: "/admin/homepage",
};

export default function PagesAdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("dglide_pages").select("*").order("created_at").then(({ data }) => {
      if (data) setPages(data);
    });
  }, []);

  async function togglePublish(id: string, current: boolean) {
    await supabase.from("dglide_pages").update({ is_published: !current }).eq("id", id);
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p)));
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Pages</h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Manage all website pages</p>
      </div>

      <div className="flex flex-col gap-3">
        {pages.map((page) => {
          const editorRoute = PAGE_EDITOR_ROUTES[page.slug];
          return (
            <div key={page.id} className="bg-white rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-[10px] bg-[#F0F2FF] flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#1C2BFF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-black [font-family:var(--font-sora)] truncate">{page.title}</p>
                <p className="text-xs text-[#888] [font-family:var(--font-inter)]">/{page.slug}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full [font-family:var(--font-inter)] ${page.is_published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {page.is_published ? "Published" : "Draft"}
              </span>
              {editorRoute && (
                <Link
                  href={editorRoute}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#F0F2FF] text-[#1C2BFF] hover:bg-[#1C2BFF] hover:text-white transition-colors [font-family:var(--font-inter)] font-medium"
                >
                  <LayoutGrid className="w-3 h-3" />
                  Edit Sections
                </Link>
              )}
              <button onClick={() => togglePublish(page.id, page.is_published)} className="p-2 text-[#AAA] hover:text-[#1C2BFF] transition-colors">
                {page.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
        {pages.length === 0 && (
          <div className="bg-white rounded-[16px] p-8 text-center text-sm text-[#888] [font-family:var(--font-inter)]">No pages yet</div>
        )}
      </div>
    </div>
  );
}
