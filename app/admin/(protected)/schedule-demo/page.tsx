import { createClient } from "@/lib/supabase/server";
import HomepageSectionGrid from "@/app/admin/(protected)/homepage/HomepageSectionGrid";

const SECTION_META: Record<string, { label: string; fields: string[] }> = {
  hero: {
    label: "Demo Page Hero",
    fields: [
      "label", "title", "description", "bullet_1", "bullet_2", "bullet_3",
      "testimonial_1_quote", "testimonial_1_name", "testimonial_1_role",
      "testimonial_2_quote", "testimonial_2_name", "testimonial_2_role",
      "testimonial_3_quote", "testimonial_3_name", "testimonial_3_role",
      "form_intro_text", "form_submit_label", "form_slots_text", "form_privacy_text",
      "success_heading", "success_body",
    ],
  },
  logo_strip: {
    label: "Logo Strip",
    fields: ["heading_line_1", "heading_line_2", "logo_1", "logo_2", "logo_3", "logo_4", "logo_5", "logo_6", "logo_7"],
  },
  why_dglide: {
    label: "Why Businesses Move to DGlide",
    fields: [
      "title", "subtitle",
      "card_1_title", "card_1_desc", "card_2_title", "card_2_desc", "card_3_title", "card_3_desc",
      "card_4_title", "card_4_desc", "card_5_title", "card_5_desc",
    ],
  },
  case_studies: {
    label: "Proof, Not Promises",
    fields: [
      "title", "challenge_title", "challenge_body", "challenge_tag_1", "challenge_tag_2",
      "metrics_title", "metrics_body", "metric_1_num", "metric_1_label",
      "metric_2_num", "metric_2_label", "metric_3_num", "metric_3_label",
      "quote_text", "right_title", "right_item_1", "right_item_2", "right_item_3",
      "right_item_4", "right_item_5", "right_item_6", "cta_label", "cta_href",
    ],
  },
  cta: {
    label: "Tell Us How Your Operation Runs",
    fields: ["badge_text", "title", "cta_label", "cta_href"],
  },
  faq: {
    label: "Frequently Asked Questions",
    fields: ["title", "faq_1_q", "faq_1_a", "faq_2_q", "faq_2_a", "faq_3_q", "faq_3_a", "faq_4_q", "faq_4_a"],
  },
};

export default async function ScheduleDemoAdminPage() {
  const supabase = await createClient();
  const { data: page } = await supabase.from("dglide_pages").select("id").eq("slug", "schedule-demo").single();
  const { data: sections } = page
    ? await supabase
        .from("dglide_sections")
        .select("id, section_type, order_index, is_visible")
        .eq("page_id", page.id)
        .order("order_index")
    : { data: [] };

  const sectionRows = (sections ?? []).map((s) => ({
    id: s.id as string,
    section_type: s.section_type as string,
    is_visible: s.is_visible as boolean,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Schedule Demo Sections</h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Edit content or toggle visibility for each schedule-demo section</p>
      </div>
      {sectionRows.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 text-sm text-amber-800 [font-family:var(--font-inter)]">
          No sections found. Run <code className="bg-amber-100 px-1 rounded">014_schedule_demo_cms.sql</code> in your Supabase SQL Editor first.
        </div>
      )}
      <HomepageSectionGrid sections={sectionRows} sectionMeta={SECTION_META} baseHref="/admin/schedule-demo" />
    </div>
  );
}
