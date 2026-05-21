"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SectionRow = {
  id: string;
  section_type: string;
  is_visible: boolean;
};

type SectionMeta = {
  label: string;
  fields: string[];
};

export default function HomepageSectionGrid({
  sections,
  sectionMeta,
}: {
  sections: SectionRow[];
  sectionMeta: Record<string, SectionMeta>;
}) {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.section_type, s.is_visible]))
  );
  const [toggling, setToggling] = useState<Record<string, boolean>>({});
  const supabase = createClient();

  async function toggleSection(type: string) {
    const row = sections.find((s) => s.section_type === type);
    if (!row || toggling[type]) return;

    const next = !visibility[type];
    setVisibility((v) => ({ ...v, [type]: next }));
    setToggling((t) => ({ ...t, [type]: true }));

    await supabase
      .from("dglide_sections")
      .update({ is_visible: next })
      .eq("id", row.id);

    setToggling((t) => ({ ...t, [type]: false }));
  }

  const seeded = sections.map((s) => s.section_type);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Object.entries(sectionMeta).map(([type, meta]) => {
        const exists  = seeded.includes(type);
        const visible = visibility[type] ?? true;

        return (
          <div
            key={type}
            className={`bg-white rounded-2xl p-6 group transition-shadow relative ${exists ? "hover:shadow-md" : "opacity-50"}`}
          >
            {/* Toggle — top-right corner */}
            {exists && (
              <button
                onClick={(e) => { e.preventDefault(); toggleSection(type); }}
                title={visible ? "Visible on frontend — click to hide" : "Hidden from frontend — click to show"}
                className="absolute top-4 right-4 flex items-center gap-1.5 focus:outline-none"
              >
                <span className="text-[10px] [font-family:var(--font-inter)] text-[#AAA] leading-none select-none">
                  {visible ? "On" : "Off"}
                </span>
                <div
                  className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${
                    toggling[type] ? "opacity-60" : ""
                  } ${visible ? "bg-[#1C2BFF]" : "bg-[#D0D5DD]"}`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${
                      visible ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </button>
            )}

            {/* Card link */}
            <Link
              href={exists ? `/admin/homepage/${type}` : "#"}
              className={`block ${!exists ? "pointer-events-none cursor-not-allowed" : ""}`}
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#1C2BFF]/8 flex items-center justify-center mb-4">
                <Layout className={`w-5 h-5 ${visible ? "text-[#1C2BFF]" : "text-[#AAA]"}`} />
              </div>
              <h3 className={`font-semibold [font-family:var(--font-sora)] text-sm mb-1 transition-colors ${
                visible
                  ? "text-black group-hover:text-[#1C2BFF]"
                  : "text-[#AAA]"
              }`}>
                {meta.label}
              </h3>
              <p className="text-xs text-[#888] [font-family:var(--font-inter)]">
                {meta.fields.length} editable field{meta.fields.length > 1 ? "s" : ""}
                {!exists && " · not seeded"}
                {exists && !visible && " · hidden"}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
