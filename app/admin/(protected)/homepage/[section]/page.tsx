import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SectionEditForm from "./SectionEditForm";

const SECTION_LABELS: Record<string, string> = {
  hero:           "Your Operations Run on Workarounds",
  software_works: "Your Software Works.",
  comparison:     "Stuck Between Rigid Tools?",
  four_reasons:   "Four Reasons DGlide Fits",
  one_system:     "Run Your Whole Operation On One System",
  how_it_works:   "How DGlide Works",
  living_service: "The Living Service Model",
  business_tabs:  "Built for Businesses Like Yours",
  case_studies:   "Proof, Not Promises",
  competitor:     "DGlide Vs. Everything Else",
  capabilities:   "One Platform. Every Capability",
  logo_carousel:  "Trusted by",
  testimonials:   "Hear It From The Teams",
  live_faster:    "From Demo to Live in Weeks",
  cta:            "Tell Us How Your Operation Runs",
};

const FIELD_LABELS: Record<string, string> = {
  badge_text:           "Badge / Label",
  title:                "Main Heading",
  subtitle:             "Subtitle / Description",
  cta_label:            "CTA Button Label",
  cta_href:             "CTA Button URL",
  cta_primary_label:    "Primary CTA Label",
  cta_primary_href:     "Primary CTA URL",
  cta_secondary_label:  "Secondary CTA Label",
  cta_secondary_href:   "Secondary CTA URL",
  logo_carousel_title:  "Logo Carousel Heading",
  product_image:        "Product / Hero Image",
  center_image:         "Center Illustration",
  bg_image:             "Background Image",
  circle_image:         "Circle / Rings Image",
  waves_image:          "Waves Decoration Image",
  tab_image:            "Tab Feature Image",
  item_1_title:         "Accordion 1 — Title",
  item_1_body:          "Accordion 1 — Description",
  item_1_image:         "Accordion 1 — Image",
  item_2_title:         "Accordion 2 — Title",
  item_2_body:          "Accordion 2 — Description",
  item_2_image:         "Accordion 2 — Image",
  item_3_title:         "Accordion 3 — Title",
  item_3_body:          "Accordion 3 — Description",
  item_3_image:         "Accordion 3 — Image",
  item_4_title:         "Accordion 4 — Title",
  item_4_body:          "Accordion 4 — Description",
  item_4_image:         "Accordion 4 — Image",
  left_col_title:       "Left Column Title",
  left_item_1:          "Left Item 1",
  left_item_2:          "Left Item 2",
  left_item_3:          "Left Item 3",
  center_title:         "Center Title (With DGlide)",
  center_feature_1:     "DGlide Feature 1",
  center_feature_2:     "DGlide Feature 2",
  center_feature_3:     "DGlide Feature 3",
  center_feature_4:     "DGlide Feature 4",
  right_col_title:      "Right Column Title",
  right_col_item_1:     "Right Item 1",
  right_col_item_2:     "Right Item 2",
  right_col_item_3:     "Right Item 3",
  bottom_1:             "Bottom Bar Item 1",
  bottom_2:             "Bottom Bar Item 2",
  bottom_3:             "Bottom Bar Item 3",
  card_1_title:         "Card 1 — Title",
  card_1_desc:          "Card 1 — Description",
  card_2_title:         "Card 2 — Title",
  card_2_desc:          "Card 2 — Description",
  card_3_title:         "Card 3 — Title",
  card_3_desc:          "Card 3 — Description",
  card_4_title:         "Card 4 — Title",
  card_4_desc:          "Card 4 — Description",
  left_1_title:         "Left Card 1 — Title",
  left_1_desc:          "Left Card 1 — Description",
  left_2_title:         "Left Card 2 — Title",
  left_2_desc:          "Left Card 2 — Description",
  right_1_title:        "Right Card 1 — Title",
  right_1_desc:         "Right Card 1 — Description",
  right_2_title:        "Right Card 2 — Title",
  right_2_desc:         "Right Card 2 — Description",
  step_1_title:         "Step 1 — Title",
  step_1_desc:          "Step 1 — Description",
  step_2_title:         "Step 2 — Title",
  step_2_desc:          "Step 2 — Description",
  step_3_title:         "Step 3 — Title",
  step_3_desc:          "Step 3 — Description",
  step_4_title:         "Step 4 — Title",
  step_4_desc:          "Step 4 — Description",
  step_1_cta_label:     "Step 1 — CTA Label",
  step_1_cta_href:      "Step 1 — CTA URL",
  step_2_cta_label:     "Step 2 — CTA Label",
  step_2_cta_href:      "Step 2 — CTA URL",
  step_3_cta_label:     "Step 3 — CTA Label",
  step_3_cta_href:      "Step 3 — CTA URL",
  left_title:           "Left Title",
  left_body:            "Left Body Text",
  feature_1:            "Feature Bullet 1",
  feature_2:            "Feature Bullet 2",
  feature_3:            "Feature Bullet 3",
  tab_1_label:          "Tab 1 — Label",
  tab_2_label:          "Tab 2 — Label",
  tab_3_label:          "Tab 3 — Label",
  tab_4_label:          "Tab 4 — Label",
  detail_text:          "Detail Text (inside circle)",
  slide_1_detail:       "Slide 1 — Detail Text (inside circle)",
  slide_1_bullet_1:     "Slide 1 — Bullet 1",
  slide_1_bullet_2:     "Slide 1 — Bullet 2",
  slide_2_detail:       "Slide 2 — Detail Text (inside circle)",
  slide_2_bullet_1:     "Slide 2 — Bullet 1",
  slide_2_bullet_2:     "Slide 2 — Bullet 2",
  slide_3_detail:       "Slide 3 — Detail Text (inside circle)",
  slide_3_bullet_1:     "Slide 3 — Bullet 1",
  slide_3_bullet_2:     "Slide 3 — Bullet 2",
  slide_4_detail:       "Slide 4 — Detail Text (inside circle)",
  slide_4_bullet_1:     "Slide 4 — Bullet 1",
  slide_4_bullet_2:     "Slide 4 — Bullet 2",
  section_title:        "Section Title",
  tab_1_title:          "Tab 1 — Title",
  tab_1_subtitle:       "Tab 1 — Subtitle",
  tab_1_bullet_1:       "Tab 1 — Bullet 1",
  tab_1_bullet_2:       "Tab 1 — Bullet 2",
  tab_1_bullet_3:       "Tab 1 — Bullet 3",
  tab_2_title:          "Tab 2 — Title",
  tab_2_subtitle:       "Tab 2 — Subtitle",
  tab_2_bullet_1:       "Tab 2 — Bullet 1",
  tab_2_bullet_2:       "Tab 2 — Bullet 2",
  tab_2_bullet_3:       "Tab 2 — Bullet 3",
  tab_3_title:          "Tab 3 — Title",
  tab_3_subtitle:       "Tab 3 — Subtitle",
  tab_3_bullet_1:       "Tab 3 — Bullet 1",
  tab_3_bullet_2:       "Tab 3 — Bullet 2",
  tab_3_bullet_3:       "Tab 3 — Bullet 3",
  tab_4_title:          "Tab 4 — Title",
  tab_4_subtitle:       "Tab 4 — Subtitle",
  tab_4_bullet_1:       "Tab 4 — Bullet 1",
  tab_4_bullet_2:       "Tab 4 — Bullet 2",
  tab_4_bullet_3:       "Tab 4 — Bullet 3",
  challenge_title:      "Challenge — Heading",
  challenge_body:       "Challenge — Body Text",
  challenge_tag_1:      "Challenge — Tag 1",
  challenge_tag_2:      "Challenge — Tag 2",
  metrics_title:        "Metrics — Heading",
  metrics_body:         "Metrics — Body Text",
  metric_1_num:         "Metric 1 — Number",
  metric_1_label:       "Metric 1 — Label",
  metric_2_num:         "Metric 2 — Number",
  metric_2_label:       "Metric 2 — Label",
  metric_3_num:         "Metric 3 — Number",
  metric_3_label:       "Metric 3 — Label",
  quote_text:           "Customer Quote",
  testimonial_image:    "Testimonial Avatar Image",
  right_title:          "Right Card — Title",
  right_item_1:         "Right Card — Item 1",
  right_item_2:         "Right Card — Item 2",
  right_item_3:         "Right Card — Item 3",
  right_item_4:         "Right Card — Item 4",
  right_item_5:         "Right Card — Item 5",
  right_item_6:         "Right Card — Item 6",
  comp_1_label:         "Competitor 1 — Label",
  comp_1_bullet_1:      "Competitor 1 — Bullet 1",
  comp_1_bullet_2:      "Competitor 1 — Bullet 2",
  comp_2_label:         "Competitor 2 — Label",
  comp_2_bullet_1:      "Competitor 2 — Bullet 1",
  comp_2_bullet_2:      "Competitor 2 — Bullet 2",
  comp_3_label:         "Competitor 3 — Label",
  comp_3_bullet_1:      "Competitor 3 — Bullet 1",
  comp_3_bullet_2:      "Competitor 3 — Bullet 2",
  right_body:           "Right Card — Body Text",
  right_feat_1:         "Right Card — Feature 1",
  right_feat_2:         "Right Card — Feature 2",
  right_feat_3:         "Right Card — Feature 3",
  right_feat_4:         "Right Card — Feature 4",
  cap_1_title:          "Capability 1 — Title",
  cap_1_desc:           "Capability 1 — Description",
  cap_1_icon:           "Capability 1 — Icon Image",
  cap_2_title:          "Capability 2 — Title",
  cap_2_desc:           "Capability 2 — Description",
  cap_2_icon:           "Capability 2 — Icon Image",
  cap_3_title:          "Capability 3 — Title",
  cap_3_desc:           "Capability 3 — Description",
  cap_3_icon:           "Capability 3 — Icon Image",
  cap_4_title:          "Capability 4 — Title",
  cap_4_desc:           "Capability 4 — Description",
  cap_4_icon:           "Capability 4 — Icon Image",
  logo_1_image:         "Logo 1",
  logo_2_image:         "Logo 2",
  logo_3_image:         "Logo 3",
  logo_4_image:         "Logo 4",
  logo_5_image:         "Logo 5",
  logo_6_image:         "Logo 6",
  logo_7_image:         "Logo 7",
};

export default async function SectionEditPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!SECTION_LABELS[section]) notFound();

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
    .eq("section_type", section)
    .single();

  if (!sectionRow) notFound();

  const { data: blocks } = await supabase
    .from("dglide_content_blocks")
    .select("id, block_key, block_type, value")
    .eq("section_id", sectionRow.id)
    .order("order_index");

  const fields = (blocks ?? []).map((b) => ({
    id: b.id as string,
    key: b.block_key as string,
    type: b.block_type as string,
    label: FIELD_LABELS[b.block_key as string] ?? b.block_key,
    value: String((b.value as { v: unknown })?.v ?? ""),
  }));

  return (
    <div>
      <div className="mb-8">
        <a
          href="/admin/homepage"
          className="text-sm text-[#888] [font-family:var(--font-inter)] hover:text-[#1C2BFF] mb-3 inline-block"
        >
          ← Homepage Sections
        </a>
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">
          {SECTION_LABELS[section]}
        </h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
          Changes save instantly to Supabase and reflect on the live site.
        </p>
      </div>

      <SectionEditForm fields={fields} />
    </div>
  );
}
