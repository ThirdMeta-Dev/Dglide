-- ============================================================
-- 011: Competitor + Capabilities (fix + cards) + Logos + Testimonials
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- ── CompetitorSection ─────────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'competitor';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'title',           'text', '{"v":"DGlide Vs. Everything Else You''ve Tried"}'::jsonb,                                                                                                   10),
      (_sid, 'comp_1_label',    'text', '{"v":"Enterprise Suites"}'::jsonb,                                                                                                                          11),
      (_sid, 'comp_1_bullet_1', 'text', '{"v":"Heavy, slow to roll out"}'::jsonb,                                                                                                                    12),
      (_sid, 'comp_1_bullet_2', 'text', '{"v":"Powerful, complex, and overkill"}'::jsonb,                                                                                                            13),
      (_sid, 'comp_2_label',    'text', '{"v":"Standard Software"}'::jsonb,                                                                                                                          14),
      (_sid, 'comp_2_bullet_1', 'text', '{"v":"Fixed workflows you cannot change"}'::jsonb,                                                                                                          15),
      (_sid, 'comp_2_bullet_2', 'text', '{"v":"Cheap upfront"}'::jsonb,                                                                                                                              16),
      (_sid, 'comp_3_label',    'text', '{"v":"Custom Build"}'::jsonb,                                                                                                                               17),
      (_sid, 'comp_3_bullet_1', 'text', '{"v":"Months to build"}'::jsonb,                                                                                                                            18),
      (_sid, 'comp_3_bullet_2', 'text', '{"v":"You get fit and a permanent IT burden"}'::jsonb,                                                                                                      19),
      (_sid, 'right_title',     'text', '{"v":"With DGlide"}'::jsonb,                                                                                                                                20),
      (_sid, 'right_body',      'text', '{"v":"DGlide is not a heavier suite, a rigid tool, or a build you maintain forever. It is a platform shaped to how you work, and adjusted as your operation changes."}'::jsonb, 21),
      (_sid, 'right_feat_1',    'text', '{"v":"Fits your workflows from day one"}'::jsonb,                                                                                                            22),
      (_sid, 'right_feat_2',    'text', '{"v":"Live in weeks, not months"}'::jsonb,                                                                                                                   23),
      (_sid, 'right_feat_3',    'text', '{"v":"Never goes out of date"}'::jsonb,                                                                                                                      24),
      (_sid, 'right_feat_4',    'text', '{"v":"No IT project to maintain"}'::jsonb,                                                                                                                   25)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── CapabilitiesSection — fix title/subtitle + add cards ──
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'capabilities';

  if _sid is not null then
    -- Fix wrong title/subtitle values left by migration 005
    update dglide_content_blocks
    set value = '{"v":"One Platform. Every Capability Your Operation Needs"}'::jsonb
    where section_id = _sid and block_key = 'title';

    update dglide_content_blocks
    set value = '{"v":"One set of capabilities, working across your whole operation."}'::jsonb
    where section_id = _sid and block_key = 'subtitle';

    -- Add 4 capability cards (icon + title + desc)
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'cap_1_title', 'text',  '{"v":"Automated Workflows"}'::jsonb,                                     10),
      (_sid, 'cap_1_desc',  'text',  '{"v":"Cut the manual steps between every stage."}'::jsonb,               11),
      (_sid, 'cap_1_icon',  'image', '{"v":""}'::jsonb,                                                        12),
      (_sid, 'cap_2_title', 'text',  '{"v":"Approvals & SLA Tracking"}'::jsonb,                                13),
      (_sid, 'cap_2_desc',  'text',  '{"v":"Stage-based approvals, escalations, and SLA logic built in."}'::jsonb, 14),
      (_sid, 'cap_2_icon',  'image', '{"v":""}'::jsonb,                                                        15),
      (_sid, 'cap_3_title', 'text',  '{"v":"Real-Time Dashboards"}'::jsonb,                                    16),
      (_sid, 'cap_3_desc',  'text',  '{"v":"Role-based views of every job, request, and exception."}'::jsonb,  17),
      (_sid, 'cap_3_icon',  'image', '{"v":""}'::jsonb,                                                        18),
      (_sid, 'cap_4_title', 'text',  '{"v":"Mobile Access"}'::jsonb,                                           19),
      (_sid, 'cap_4_desc',  'text',  '{"v":"Field teams update jobs and visits from the site."}'::jsonb,       20),
      (_sid, 'cap_4_icon',  'image', '{"v":""}'::jsonb,                                                        21)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── LogoCarouselSection — logo image slots ─────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'logo_carousel';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'logo_1_image', 'image', '{"v":"/logo.png"}'::jsonb, 10),
      (_sid, 'logo_2_image', 'image', '{"v":"/logo.png"}'::jsonb, 11),
      (_sid, 'logo_3_image', 'image', '{"v":"/logo.png"}'::jsonb, 12),
      (_sid, 'logo_4_image', 'image', '{"v":"/logo.png"}'::jsonb, 13),
      (_sid, 'logo_5_image', 'image', '{"v":"/logo.png"}'::jsonb, 14),
      (_sid, 'logo_6_image', 'image', '{"v":"/logo.png"}'::jsonb, 15),
      (_sid, 'logo_7_image', 'image', '{"v":"/logo.png"}'::jsonb, 16)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── TestimonialsSection — section fields + 4 testimonials ──
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'testimonials';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'section_title', 'text', '{"v":"Hear It From The Teams Using DGlide"}'::jsonb,                                                      1),
      (_sid, 'subtitle',      'text', '{"v":"These Are Operations Teams That Stopped Fighting Their Software Once They Picked DGlide"}'::jsonb,   2),
      -- Testimonial 1
      (_sid, 'testimonial_1_quote',   'text',  '{"v":"We finally have visibility in our operations. Your system adapts to how you work and the results speak for themselves."}'::jsonb, 10),
      (_sid, 'testimonial_1_name',    'text',  '{"v":"Infrastructure Team"}'::jsonb,   11),
      (_sid, 'testimonial_1_company', 'text',  '{"v":"Scaleops International"}'::jsonb, 12),
      (_sid, 'testimonial_1_image',   'image', '{"v":""}'::jsonb,                       13),
      -- Testimonial 2
      (_sid, 'testimonial_2_quote',   'text',  '{"v":"DGlide replaced five different tools for us. Now my entire team works from one place — no confusion, no dropped tasks."}'::jsonb, 20),
      (_sid, 'testimonial_2_name',    'text',  '{"v":"Operations Director"}'::jsonb,  21),
      (_sid, 'testimonial_2_company', 'text',  '{"v":"Virenxia Group"}'::jsonb,        22),
      (_sid, 'testimonial_2_image',   'image', '{"v":""}'::jsonb,                      23),
      -- Testimonial 3
      (_sid, 'testimonial_3_quote',   'text',  '{"v":"Our field teams update jobs in real time. No more end-of-day catch-up calls or missed service windows."}'::jsonb, 30),
      (_sid, 'testimonial_3_name',    'text',  '{"v":"Operations Manager"}'::jsonb,   31),
      (_sid, 'testimonial_3_company', 'text',  '{"v":"Nexus Field Services"}'::jsonb,  32),
      (_sid, 'testimonial_3_image',   'image', '{"v":""}'::jsonb,                      33),
      -- Testimonial 4
      (_sid, 'testimonial_4_quote',   'text',  '{"v":"We went live in three weeks. The team stopped asking about the software after day two — it just fit."}'::jsonb, 40),
      (_sid, 'testimonial_4_name',    'text',  '{"v":"General Manager"}'::jsonb,      41),
      (_sid, 'testimonial_4_company', 'text',  '{"v":"Aero Precision Works"}'::jsonb,  42),
      (_sid, 'testimonial_4_image',   'image', '{"v":""}'::jsonb,                      43)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
