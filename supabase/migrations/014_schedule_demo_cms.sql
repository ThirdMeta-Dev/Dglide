-- ============================================================
-- 014: Schedule Demo page — sections + content blocks
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin

  -- ── Page ──────────────────────────────────────────────────
  insert into dglide_pages (slug, title)
  values ('schedule-demo', 'Schedule Demo')
  on conflict (slug) do nothing;

  select id into _page_id from dglide_pages where slug = 'schedule-demo';

  -- ── Sections ──────────────────────────────────────────────
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'hero') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'hero', 0, true);
  end if;
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'logo_strip') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'logo_strip', 1, true);
  end if;
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'why_dglide') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'why_dglide', 2, true);
  end if;
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'case_studies') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'case_studies', 3, true);
  end if;
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'cta') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'cta', 4, true);
  end if;
  if not exists (select 1 from dglide_sections where page_id = _page_id and section_type = 'faq') then
    insert into dglide_sections (page_id, section_type, order_index, is_visible) values (_page_id, 'faq', 5, true);
  end if;

  -- ── Hero blocks ───────────────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'hero';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'label',               'text', '{"v":"Book a Live DGlide Walkthrough"}'::jsonb,                                                                                             0),
    (_sid, 'title',               'text', '{"v":"One System To Run\nYour Whole Operation"}'::jsonb,                                                                                    1),
    (_sid, 'description',         'text', '{"v":"No long forms. Tell us how you run things in 30 seconds, and we will show you DGlide built around it."}'::jsonb,                      2),
    (_sid, 'bullet_1',            'text', '{"v":"Live operational visibility"}'::jsonb,                                                                                                3),
    (_sid, 'bullet_2',            'text', '{"v":"Automated work routing"}'::jsonb,                                                                                                     4),
    (_sid, 'bullet_3',            'text', '{"v":"Cross-team coordination"}'::jsonb,                                                                                                    5),
    (_sid, 'testimonial_1_quote', 'text', '{"v":"We were spending lakhs to generate leads, then losing them because nobody saw the alert in time. DGlide closed that gap."}'::jsonb,  6),
    (_sid, 'testimonial_1_name',  'text', '{"v":"Mr. Lorem ipsum"}'::jsonb,                                                                                                           7),
    (_sid, 'testimonial_1_role',  'text', '{"v":"Prompt Lasers, Prompt Lasers"}'::jsonb,                                                                                              8),
    (_sid, 'testimonial_2_quote', 'text', '{"v":"Our field team went from WhatsApp chaos to a single dashboard. Coordination that used to take hours now happens automatically."}'::jsonb, 9),
    (_sid, 'testimonial_2_name',  'text', '{"v":"Ms. Priya Sharma"}'::jsonb,                                                                                                          10),
    (_sid, 'testimonial_2_role',  'text', '{"v":"Operations Head, NexGen Services"}'::jsonb,                                                                                          11),
    (_sid, 'testimonial_3_quote', 'text', '{"v":"We configured DGlide in two weeks. No dev cycles, no delays. It just mapped to how we actually work."}'::jsonb,                      12),
    (_sid, 'testimonial_3_name',  'text', '{"v":"Mr. Arjun Mehta"}'::jsonb,                                                                                                           13),
    (_sid, 'testimonial_3_role',  'text', '{"v":"Director, FastTrack Logistics"}'::jsonb,                                                                                             14),
    (_sid, 'form_intro_text',     'text', '{"v":"Hi, I''m Vinayak from DGlide. Answer a couple of quick questions, and I''ll tailor your demo."}'::jsonb,                              15),
    (_sid, 'form_submit_label',   'text', '{"v":"Get the full story"}'::jsonb,                                                                                                        16),
    (_sid, 'form_slots_text',     'text', '{"v":"Book Now, Only 8 Demo Slots Left This Week!"}'::jsonb,                                                                               17),
    (_sid, 'form_privacy_text',   'text', '{"v":"All your data stays private and secure with us."}'::jsonb,                                                                           18),
    (_sid, 'success_heading',     'text', '{"v":"Demo Booked!"}'::jsonb,                                                                                                              19),
    (_sid, 'success_body',        'text', '{"v":"We''ll reach out within 1 business day to confirm your walkthrough slot."}'::jsonb,                                                   20)
  on conflict (section_id, block_key) do nothing;

  -- ── Logo Strip blocks ─────────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'logo_strip';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'heading_line_1', 'text', '{"v":"Who''s Already Running"}'::jsonb, 0),
    (_sid, 'heading_line_2', 'text', '{"v":"on DGlide"}'::jsonb,              1),
    (_sid, 'logo_1',         'text', '{"v":"Husqvarna"}'::jsonb,              2),
    (_sid, 'logo_2',         'text', '{"v":"TechCorp"}'::jsonb,               3),
    (_sid, 'logo_3',         'text', '{"v":"BuildFast"}'::jsonb,              4),
    (_sid, 'logo_4',         'text', '{"v":"Nexus Ltd"}'::jsonb,              5),
    (_sid, 'logo_5',         'text', '{"v":"Apex Systems"}'::jsonb,           6),
    (_sid, 'logo_6',         'text', '{"v":"CoreFlow"}'::jsonb,               7),
    (_sid, 'logo_7',         'text', '{"v":"Virenxia"}'::jsonb,               8)
  on conflict (section_id, block_key) do nothing;

  -- ── Why DGlide blocks ─────────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'why_dglide';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'title',       'text', '{"v":"Why Businesses Move to DGlide"}'::jsonb,                                                                       0),
    (_sid, 'subtitle',    'text', '{"v":"DGlide is not one more tool to manage. It is one connected system built to fit how your operation actually runs."}'::jsonb, 1),
    (_sid, 'card_1_title','text', '{"v":"Ready to Deploy"}'::jsonb,                                                                                     2),
    (_sid, 'card_1_desc', 'text', '{"v":"DGlide is ready to run on day one, shaped to your workflows"}'::jsonb,                                          3),
    (_sid, 'card_2_title','text', '{"v":"Configured to Your Operation"}'::jsonb,                                                                         4),
    (_sid, 'card_2_desc', 'text', '{"v":"DGlide maps to your real process, so there are no workarounds"}'::jsonb,                                        5),
    (_sid, 'card_3_title','text', '{"v":"Never Goes Out of Date"}'::jsonb,                                                                               6),
    (_sid, 'card_3_desc', 'text', '{"v":"Through the Living Service Model, your system is kept in step"}'::jsonb,                                        7),
    (_sid, 'card_4_title','text', '{"v":"No Dev Team Required"}'::jsonb,                                                                                 8),
    (_sid, 'card_4_desc', 'text', '{"v":"Get the fit of custom software without the cost, the timeline, or the developers"}'::jsonb,                     9),
    (_sid, 'card_5_title','text', '{"v":"One Connected Platform"}'::jsonb,                                                                               10),
    (_sid, 'card_5_desc', 'text', '{"v":"Service, field work, sales, and coordination run on one platform"}'::jsonb,                                     11)
  on conflict (section_id, block_key) do nothing;

  -- ── Case Studies blocks ───────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'case_studies';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'title',           'text', '{"v":"Proof, Not Promises"}'::jsonb,                                                                                              0),
    (_sid, 'challenge_title', 'text', '{"v":"The Challenge"}'::jsonb,                                                                                                   1),
    (_sid, 'challenge_body',  'text', '{"v":"A 50-person laser machine manufacturer stopped the leaks: lost leads, slow service, no visibility."}'::jsonb,              2),
    (_sid, 'challenge_tag_1', 'text', '{"v":"Automated Operational Flows"}'::jsonb,                                                                                     3),
    (_sid, 'challenge_tag_2', 'text', '{"v":"Workflow Coordination"}'::jsonb,                                                                                           4),
    (_sid, 'metrics_title',   'text', '{"v":"The Success Metrics"}'::jsonb,                                                                                             5),
    (_sid, 'metrics_body',    'text', '{"v":"After DGlide, the team could see and act in real time. The numbers moved within the first quarter."}'::jsonb,              6),
    (_sid, 'metric_1_num',    'text', '{"v":"3X"}'::jsonb,                                                                                                              7),
    (_sid, 'metric_1_label',  'text', '{"v":"Lead Capture"}'::jsonb,                                                                                                   8),
    (_sid, 'metric_2_num',    'text', '{"v":"8 Min"}'::jsonb,                                                                                                           9),
    (_sid, 'metric_2_label',  'text', '{"v":"Response Down From 40+"}'::jsonb,                                                                                         10),
    (_sid, 'metric_3_num',    'text', '{"v":"75%"}'::jsonb,                                                                                                             11),
    (_sid, 'metric_3_label',  'text', '{"v":"Lower Cost"}'::jsonb,                                                                                                     12),
    (_sid, 'quote_text',      'text', '{"v":"Now I open my phone and see every project, every complaint, every shipment."}'::jsonb,                                     13),
    (_sid, 'right_title',     'text', '{"v":"How DGlide Fixed It"}'::jsonb,                                                                                             14),
    (_sid, 'right_item_1',    'text', '{"v":"Every tool replaced by one platform"}'::jsonb,                                                                             15),
    (_sid, 'right_item_2',    'text', '{"v":"One dashboard for the whole operation"}'::jsonb,                                                                           16),
    (_sid, 'right_item_3',    'text', '{"v":"Automated routing of work and approvals"}'::jsonb,                                                                         17),
    (_sid, 'right_item_4',    'text', '{"v":"Service, field, and office in sync"}'::jsonb,                                                                              18),
    (_sid, 'right_item_5',    'text', '{"v":"Faster service resolution"}'::jsonb,                                                                                       19),
    (_sid, 'right_item_6',    'text', '{"v":"Continuous fit through the Living Service Model"}'::jsonb,                                                                 20),
    (_sid, 'cta_label',       'text', '{"v":"Get the full story"}'::jsonb,                                                                                              21),
    (_sid, 'cta_href',        'url',  '{"v":"/schedule-demo"}'::jsonb,                                                                                                  22)
  on conflict (section_id, block_key) do nothing;

  -- ── CTA blocks ────────────────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'cta';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'badge_text', 'text', '{"v":"Get an All-in-One Platform"}'::jsonb,                                                                                     0),
    (_sid, 'title',      'text', '{"v":"Tell us how your operation runs. We will show you where DGlide fits. About 30 minutes."}'::jsonb,                         1),
    (_sid, 'cta_label',  'text', '{"v":"Get a Demo"}'::jsonb,                                                                                                     2),
    (_sid, 'cta_href',   'url',  '{"v":"/schedule-demo"}'::jsonb,                                                                                                  3)
  on conflict (section_id, block_key) do nothing;

  -- ── FAQ blocks ────────────────────────────────────────────
  select id into _sid from dglide_sections where page_id = _page_id and section_type = 'faq';
  insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
    (_sid, 'title',   'text', '{"v":"Frequently Asked questions"}'::jsonb,  0),
    (_sid, 'faq_1_q', 'text', '{"v":"What can I expect from the demo?"}'::jsonb,   1),
    (_sid, 'faq_1_a', 'text', '{"v":"You''ll get a live walkthrough of DGlide built around your specific operation — not a generic product tour. We''ll show you exactly how your workflows, stages, and team fit inside the system."}'::jsonb, 2),
    (_sid, 'faq_2_q', 'text', '{"v":"How long does the demo take?"}'::jsonb,       3),
    (_sid, 'faq_2_a', 'text', '{"v":"The demo runs about 30 minutes. We keep it focused on your operation, so you see what matters without a long, generic tour."}'::jsonb, 4),
    (_sid, 'faq_3_q', 'text', '{"v":"Do I have to commit to anything?"}'::jsonb,   5),
    (_sid, 'faq_3_a', 'text', '{"v":"Not at all. The demo is completely free and carries no obligation. It''s a chance to see whether DGlide fits before you make any decisions."}'::jsonb, 6),
    (_sid, 'faq_4_q', 'text', '{"v":"Does DGlide work for an operation like mine?"}'::jsonb, 7),
    (_sid, 'faq_4_a', 'text', '{"v":"DGlide is built for field service operations, manufacturing, growing SMBs, and internal operations teams. If you run coordinated work across people, locations, or stages, it''s likely a fit — that''s exactly what we''ll confirm in the demo."}'::jsonb, 8)
  on conflict (section_id, block_key) do nothing;

end $$;
