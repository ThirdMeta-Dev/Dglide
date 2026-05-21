"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Type } from "lucide-react";

type Section = {
  id: string;
  section_type: string;
  order_index: number;
  is_visible: boolean;
  page_id: string;
  dglide_pages: { title: string; slug: string } | null;
};

export default function ContentAdminPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("dglide_sections")
      .select("*, dglide_pages(title, slug)")
      .order("order_index")
      .then(({ data }) => { if (data) setSections(data as Section[]); });
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Content Blocks</h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Edit text, images, and dynamic content per section</p>
      </div>

      {sections.length === 0 ? (
        <div className="bg-white rounded-[20px] p-10 text-center">
          <div className="w-12 h-12 rounded-[14px] bg-[#F0F2FF] flex items-center justify-center mx-auto mb-4">
            <Type className="w-5 h-5 text-[#1C2BFF]" />
          </div>
          <p className="font-semibold text-sm text-black [font-family:var(--font-sora)] mb-1">No sections yet</p>
          <p className="text-xs text-[#888] [font-family:var(--font-inter)]">Sections appear here as pages are built</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sections.map((s) => (
            <div key={s.id} className="bg-white rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-[10px] bg-[#F0F2FF] flex items-center justify-center">
                <Type className="w-4 h-4 text-[#1C2BFF]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-black [font-family:var(--font-sora)]">{s.section_type}</p>
                <p className="text-xs text-[#888] [font-family:var(--font-inter)]">{s.dglide_pages?.title} — order {s.order_index}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full [font-family:var(--font-inter)] ${s.is_visible ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {s.is_visible ? "Visible" : "Hidden"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
