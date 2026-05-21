import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TestimonialsCMS from "./TestimonialsCMS";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("dglide_pages")
    .select("id")
    .eq("slug", "home")
    .single();

  if (!page) notFound();

  const { data: sectionRow } = await supabase
    .from("dglide_sections")
    .select("id")
    .eq("page_id", page.id)
    .eq("section_type", "testimonials")
    .single();

  if (!sectionRow) notFound();

  const { data: blocks } = await supabase
    .from("dglide_content_blocks")
    .select("id, block_key, block_type, value")
    .eq("section_id", sectionRow.id)
    .order("order_index");

  return (
    <div>
      <div className="mb-8">
        <a href="/admin/homepage" className="text-sm text-[#888] [font-family:var(--font-inter)] hover:text-[#1C2BFF] mb-3 inline-block">
          ← Homepage Sections
        </a>
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">
          Hear It From The Teams
        </h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
          Manage section text and testimonial cards. Changes save instantly.
        </p>
      </div>

      <TestimonialsCMS
        sectionId={sectionRow.id}
        initialBlocks={(blocks ?? []).map((b) => ({
          id: b.id as string,
          key: b.block_key as string,
          type: b.block_type as string,
          value: String((b.value as { v: unknown })?.v ?? ""),
        }))}
      />
    </div>
  );
}
