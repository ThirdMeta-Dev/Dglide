import { createClient } from "@/lib/supabase/server";
import HomepageSectionGrid from "./HomepageSectionGrid";

const SECTION_META: Record<string, { label: string; fields: string[] }> = {
  hero:           { label: "Your Operations Run on Workarounds",  fields: ["badge_text", "title", "subtitle", "cta_primary_label", "cta_primary_href", "cta_secondary_label", "cta_secondary_href", "logo_carousel_title", "product_image"] },
  software_works: { label: "Your Software Works.",                fields: ["badge_text", "title", "subtitle", "item_1_title", "item_1_body", "item_1_image", "item_2_title", "item_2_body", "item_2_image", "item_3_title", "item_3_body", "item_3_image", "item_4_title", "item_4_body", "item_4_image"] },
  comparison:     { label: "Stuck Between Rigid Tools?",          fields: ["title", "subtitle", "left_title", "left_item_1", "left_item_2", "left_item_3", "center_title", "center_feature_1", "center_feature_2", "center_feature_3", "center_feature_4", "right_title", "right_item_1", "right_item_2", "right_item_3", "bottom_1", "bottom_2", "bottom_3"] },
  four_reasons:   { label: "Four Reasons DGlide Fits",            fields: ["title", "card_1_title", "card_1_desc", "card_2_title", "card_2_desc", "card_3_title", "card_3_desc", "card_4_title", "card_4_desc"] },
  one_system:     { label: "Run Your Whole Operation On One System", fields: ["title", "subtitle", "center_image", "left_1_title", "left_1_desc", "left_2_title", "left_2_desc", "right_1_title", "right_1_desc", "right_2_title", "right_2_desc"] },
  how_it_works:   { label: "How DGlide Works",                    fields: ["title", "bg_image", "step_1_title", "step_1_desc", "step_2_title", "step_2_desc", "step_3_title", "step_3_desc", "step_4_title", "step_4_desc"] },
  living_service: { label: "The Living Service Model",            fields: ["circle_image", "waves_image", "left_title", "left_body", "feature_1", "feature_2", "feature_3", "tab_1_label", "tab_2_label", "tab_3_label", "tab_4_label", "slide_1_detail", "slide_1_bullet_1", "slide_1_bullet_2", "slide_2_detail", "slide_2_bullet_1", "slide_2_bullet_2", "slide_3_detail", "slide_3_bullet_1", "slide_3_bullet_2", "slide_4_detail", "slide_4_bullet_1", "slide_4_bullet_2"] },
  business_tabs:  { label: "Built for Businesses Like Yours",     fields: ["section_title", "tab_image", "cta_label", "cta_href", "tab_1_label", "tab_1_title", "tab_1_subtitle", "tab_1_bullet_1", "tab_1_bullet_2", "tab_1_bullet_3", "tab_2_label", "tab_2_title", "tab_2_subtitle", "tab_2_bullet_1", "tab_2_bullet_2", "tab_2_bullet_3", "tab_3_label", "tab_3_title", "tab_3_subtitle", "tab_3_bullet_1", "tab_3_bullet_2", "tab_3_bullet_3", "tab_4_label", "tab_4_title", "tab_4_subtitle", "tab_4_bullet_1", "tab_4_bullet_2", "tab_4_bullet_3"] },
  case_studies:   { label: "Proof, Not Promises",                 fields: ["title", "challenge_title", "challenge_body", "challenge_tag_1", "challenge_tag_2", "metrics_title", "metrics_body", "metric_1_num", "metric_1_label", "metric_2_num", "metric_2_label", "metric_3_num", "metric_3_label", "quote_text", "testimonial_image", "right_title", "right_item_1", "right_item_2", "right_item_3", "right_item_4", "right_item_5", "right_item_6", "cta_label", "cta_href"] },
  competitor:     { label: "DGlide Vs. Everything Else",          fields: ["title", "comp_1_label", "comp_1_bullet_1", "comp_1_bullet_2", "comp_2_label", "comp_2_bullet_1", "comp_2_bullet_2", "comp_3_label", "comp_3_bullet_1", "comp_3_bullet_2", "right_title", "right_body", "right_feat_1", "right_feat_2", "right_feat_3", "right_feat_4"] },
  capabilities:   { label: "One Platform. Every Capability",      fields: ["title", "subtitle", "cap_1_title", "cap_1_desc", "cap_1_icon", "cap_2_title", "cap_2_desc", "cap_2_icon", "cap_3_title", "cap_3_desc", "cap_3_icon", "cap_4_title", "cap_4_desc", "cap_4_icon"] },
  logo_carousel:  { label: "Who's Already Running on DGlide",     fields: ["title", "logo_1_image", "logo_2_image", "logo_3_image", "logo_4_image", "logo_5_image", "logo_6_image", "logo_7_image"] },
  testimonials:   { label: "Hear It From The Teams",              fields: ["section_title", "subtitle"] },
  live_faster:    { label: "From Demo to Live in Weeks",          fields: ["title", "subtitle", "step_1_title", "step_1_desc", "step_1_cta_label", "step_1_cta_href", "step_2_title", "step_2_desc", "step_2_cta_label", "step_2_cta_href", "step_3_title", "step_3_desc", "step_3_cta_label", "step_3_cta_href"] },
  cta:            { label: "Tell Us How Your Operation Runs",     fields: ["badge_text", "title", "cta_label", "cta_href"] },
};

export default async function HomepageAdminPage() {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("dglide_pages")
    .select("id")
    .eq("slug", "home")
    .single();

  const { data: sections } = page
    ? await supabase
        .from("dglide_sections")
        .select("id, section_type, order_index, is_visible")
        .eq("page_id", page.id)
        .order("order_index")
    : { data: [] };

  const sectionRows = (sections ?? []).map((s) => ({
    id:           s.id as string,
    section_type: s.section_type as string,
    is_visible:   s.is_visible as boolean,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">
          Homepage Sections
        </h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
          Edit content or toggle visibility for each homepage section
        </p>
      </div>

      {sectionRows.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 text-sm text-amber-800 [font-family:var(--font-inter)]">
          No sections found. Run <code className="bg-amber-100 px-1 rounded">005_run_this_in_supabase.sql</code> in your Supabase SQL Editor first.
        </div>
      )}

      <HomepageSectionGrid sections={sectionRows} sectionMeta={SECTION_META} />
    </div>
  );
}
