import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SectionEditForm from "@/app/admin/(protected)/homepage/[section]/SectionEditForm";

const SECTION_LABELS: Record<string, string> = {
  hero:         "Demo Page Hero",
  logo_strip:   "Logo Strip",
  why_dglide:   "Why Businesses Move to DGlide",
  case_studies: "Proof, Not Promises",
  cta:          "Tell Us How Your Operation Runs",
  faq:          "Frequently Asked Questions",
};

const FIELD_LABELS: Record<string, string> = {
  label:               "Eyebrow Label",
  title:               "Main Heading",
  description:         "Description Paragraph",
  bullet_1:            "Bullet 1",
  bullet_2:            "Bullet 2",
  bullet_3:            "Bullet 3",
  testimonial_1_quote: "Testimonial 1 — Quote",
  testimonial_1_name:  "Testimonial 1 — Name",
  testimonial_1_role:  "Testimonial 1 — Role",
  testimonial_2_quote: "Testimonial 2 — Quote",
  testimonial_2_name:  "Testimonial 2 — Name",
  testimonial_2_role:  "Testimonial 2 — Role",
  testimonial_3_quote: "Testimonial 3 — Quote",
  testimonial_3_name:  "Testimonial 3 — Name",
  testimonial_3_role:  "Testimonial 3 — Role",
  form_intro_text:     "Form — Intro Chat Bubble",
  form_submit_label:   "Form — Submit Button Label",
  form_slots_text:     "Form — Slots Urgency Text",
  form_privacy_text:   "Form — Privacy Note",
  success_heading:     "Success — Heading",
  success_body:        "Success — Body Text",
  heading_line_1:      "Logo Strip — Heading Line 1",
  heading_line_2:      "Logo Strip — Heading Line 2",
  logo_1:              "Logo 1",
  logo_2:              "Logo 2",
  logo_3:              "Logo 3",
  logo_4:              "Logo 4",
  logo_5:              "Logo 5",
  logo_6:              "Logo 6",
  logo_7:              "Logo 7",
  subtitle:            "Subtitle / Description",
  card_1_title:        "Card 1 — Title",
  card_1_desc:         "Card 1 — Description",
  card_2_title:        "Card 2 — Title",
  card_2_desc:         "Card 2 — Description",
  card_3_title:        "Card 3 — Title",
  card_3_desc:         "Card 3 — Description",
  card_4_title:        "Card 4 — Title",
  card_4_desc:         "Card 4 — Description",
  card_5_title:        "Card 5 — Title",
  card_5_desc:         "Card 5 — Description",
  challenge_title:     "Challenge — Heading",
  challenge_body:      "Challenge — Body Text",
  challenge_tag_1:     "Challenge — Tag 1",
  challenge_tag_2:     "Challenge — Tag 2",
  metrics_title:       "Metrics — Heading",
  metrics_body:        "Metrics — Body Text",
  metric_1_num:        "Metric 1 — Number",
  metric_1_label:      "Metric 1 — Label",
  metric_2_num:        "Metric 2 — Number",
  metric_2_label:      "Metric 2 — Label",
  metric_3_num:        "Metric 3 — Number",
  metric_3_label:      "Metric 3 — Label",
  quote_text:          "Customer Quote",
  testimonial_image:   "Testimonial Avatar Image",
  right_title:         "Right Card — Title",
  right_item_1:        "Right Card — Item 1",
  right_item_2:        "Right Card — Item 2",
  right_item_3:        "Right Card — Item 3",
  right_item_4:        "Right Card — Item 4",
  right_item_5:        "Right Card — Item 5",
  right_item_6:        "Right Card — Item 6",
  cta_label:           "CTA Button Label",
  cta_href:            "CTA Button URL",
  badge_text:          "Badge / Label",
  faq_1_q:             "FAQ 1 — Question",
  faq_1_a:             "FAQ 1 — Answer",
  faq_2_q:             "FAQ 2 — Question",
  faq_2_a:             "FAQ 2 — Answer",
  faq_3_q:             "FAQ 3 — Question",
  faq_3_a:             "FAQ 3 — Answer",
  faq_4_q:             "FAQ 4 — Question",
  faq_4_a:             "FAQ 4 — Answer",
};

export default async function ScheduleDemoSectionEditPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!SECTION_LABELS[section]) notFound();

  const supabase = await createClient();
  const { data: page } = await supabase.from("dglide_pages").select("id").eq("slug", "schedule-demo").single();
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
    id:    b.id as string,
    key:   b.block_key as string,
    type:  b.block_type as string,
    label: FIELD_LABELS[b.block_key as string] ?? (b.block_key as string),
    value: String((b.value as { v: unknown })?.v ?? ""),
  }));

  return (
    <div>
      <div className="mb-8">
        <a href="/admin/schedule-demo" className="text-sm text-[#888] [font-family:var(--font-inter)] hover:text-[#1C2BFF] mb-3 inline-block">
          ← Schedule Demo Sections
        </a>
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">{SECTION_LABELS[section]}</h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Changes save instantly to Supabase and reflect on the live site.</p>
      </div>
      <SectionEditForm fields={fields} />
    </div>
  );
}
