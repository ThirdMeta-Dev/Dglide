-- ============================================================
-- 009: HowItWorks steps + LivingService fields + BusinessTabs fields
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- ── HowItWorks steps ──────────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'how_it_works';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'step_1_title', 'text', '{"v":"Start With a Working System"}'::jsonb,           10),
      (_sid, 'step_1_desc',  'text', '{"v":"Begin on a ready-to-run system"}'::jsonb,         11),
      (_sid, 'step_2_title', 'text', '{"v":"Configure to Your Workflow"}'::jsonb,             12),
      (_sid, 'step_2_desc',  'text', '{"v":"Set up your stages, approvals, and roles"}'::jsonb, 13),
      (_sid, 'step_3_title', 'text', '{"v":"Launch Fast"}'::jsonb,                            14),
      (_sid, 'step_3_desc',  'text', '{"v":"Deploy fast, without long Dev cycles."}'::jsonb,  15),
      (_sid, 'step_4_title', 'text', '{"v":"Change It Anytime"}'::jsonb,                      16),
      (_sid, 'step_4_desc',  'text', '{"v":"No rebuild projects. Just ongoing fit."}'::jsonb, 17)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── LivingService fields ───────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'living_service';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'left_title',       'text', '{"v":"The Living Service Model: Fit That Doesn''t Expire"}'::jsonb,                                                                     10),
      (_sid, 'left_body',        'text', '{"v":"With the Living Service Model, your system is adjusted as your operation changes, quarter after quarter."}'::jsonb,              11),
      (_sid, 'feature_1',        'text', '{"v":"Real-Time Visibility"}'::jsonb,                                                                                                   12),
      (_sid, 'feature_2',        'text', '{"v":"Automated Operational Flows"}'::jsonb,                                                                                            13),
      (_sid, 'feature_3',        'text', '{"v":"Workflow Coordination"}'::jsonb,                                                                                                  14),
      (_sid, 'tab_1_label',      'text', '{"v":"Deploy Fast"}'::jsonb,                                                                                                            15),
      (_sid, 'tab_2_label',      'text', '{"v":"Use On the Go"}'::jsonb,                                                                                                          16),
      (_sid, 'tab_3_label',      'text', '{"v":"Adapts with You"}'::jsonb,                                                                                                        17),
      (_sid, 'tab_4_label',      'text', '{"v":"Optimize without Dev"}'::jsonb,                                                                                                   18),
      (_sid, 'detail_text',      'text', '{"v":"Daily work runs in one system, because DGlide maps to your real workflow, not the other way around."}'::jsonb,                   19),
      (_sid, 'slide_1_bullet_1', 'text', '{"v":"The software follows your changes"}'::jsonb,                                                                                      20),
      (_sid, 'slide_1_bullet_2', 'text', '{"v":"Configured to your integrations"}'::jsonb,                                                                                        21),
      (_sid, 'slide_2_bullet_1', 'text', '{"v":"Auto-updated to your workflow"}'::jsonb,                                                                                          22),
      (_sid, 'slide_2_bullet_2', 'text', '{"v":"No manual re-configuration needed"}'::jsonb,                                                                                      23),
      (_sid, 'slide_3_bullet_1', 'text', '{"v":"Elastic user management"}'::jsonb,                                                                                                24),
      (_sid, 'slide_3_bullet_2', 'text', '{"v":"Process templates for new teams"}'::jsonb,                                                                                        25),
      (_sid, 'slide_4_bullet_1', 'text', '{"v":"Self-serve configuration"}'::jsonb,                                                                                               26),
      (_sid, 'slide_4_bullet_2', 'text', '{"v":"No-code process changes"}'::jsonb,                                                                                                27)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── BusinessTabs fields ────────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'business_tabs';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'section_title',   'text', '{"v":"Built for Businesses Like Yours"}'::jsonb,                                               10),
      (_sid, 'cta_label',       'text', '{"v":"Get Started Now"}'::jsonb,                                                               11),
      (_sid, 'cta_href',        'url',  '{"v":"/schedule-demo"}'::jsonb,                                                                12),
      -- Tab 1
      (_sid, 'tab_1_label',    'text', '{"v":"Field Service Operations"}'::jsonb,                                                       20),
      (_sid, 'tab_1_title',    'text', '{"v":"Field Service Operations"}'::jsonb,                                                       21),
      (_sid, 'tab_1_subtitle', 'text', '{"v":"Field teams running on calls, WhatsApp, and manual logs"}'::jsonb,                        22),
      (_sid, 'tab_1_bullet_1', 'text', '{"v":"Best fit when technicians update jobs via text or phone calls."}'::jsonb,                 23),
      (_sid, 'tab_1_bullet_2', 'text', '{"v":"Best fit when dispatch and billing run in separate tools."}'::jsonb,                      24),
      (_sid, 'tab_1_bullet_3', 'text', '{"v":"Best fit when service history lives in people''s heads, not systems."}'::jsonb,           25),
      -- Tab 2
      (_sid, 'tab_2_label',    'text', '{"v":"Manufacturing & Process"}'::jsonb,                                                        30),
      (_sid, 'tab_2_title',    'text', '{"v":"Manufacturing & Process"}'::jsonb,                                                        31),
      (_sid, 'tab_2_subtitle', 'text', '{"v":"Factories running production on spreadsheets and floor knowledge"}'::jsonb,               32),
      (_sid, 'tab_2_bullet_1', 'text', '{"v":"Best fit when production updates travel by WhatsApp."}'::jsonb,                           33),
      (_sid, 'tab_2_bullet_2', 'text', '{"v":"Best fit when every product line works a little differently."}'::jsonb,                   34),
      (_sid, 'tab_2_bullet_3', 'text', '{"v":"Best fit when quality and dispatch don''t talk to each other."}'::jsonb,                  35),
      -- Tab 3
      (_sid, 'tab_3_label',    'text', '{"v":"Growing SMBs"}'::jsonb,                                                                   40),
      (_sid, 'tab_3_title',    'text', '{"v":"Growing SMBs"}'::jsonb,                                                                   41),
      (_sid, 'tab_3_subtitle', 'text', '{"v":"Small teams scaling faster than their current tools allow"}'::jsonb,                      42),
      (_sid, 'tab_3_bullet_1', 'text', '{"v":"Best fit when spreadsheets are your main operations system."}'::jsonb,                    43),
      (_sid, 'tab_3_bullet_2', 'text', '{"v":"Best fit when every new hire adds coordination overhead."}'::jsonb,                       44),
      (_sid, 'tab_3_bullet_3', 'text', '{"v":"Best fit when you''ve outgrown your first tool but aren''t enterprise."}'::jsonb,         45),
      -- Tab 4
      (_sid, 'tab_4_label',    'text', '{"v":"Operations & Support Teams"}'::jsonb,                                                     50),
      (_sid, 'tab_4_title',    'text', '{"v":"Operations & Support Teams"}'::jsonb,                                                     51),
      (_sid, 'tab_4_subtitle', 'text', '{"v":"Teams managing requests, issues, and cross-department workflows"}'::jsonb,                52),
      (_sid, 'tab_4_bullet_1', 'text', '{"v":"Best fit when tickets fall through the cracks between teams."}'::jsonb,                   53),
      (_sid, 'tab_4_bullet_2', 'text', '{"v":"Best fit when everyone works in silos with no shared dashboard."}'::jsonb,                54),
      (_sid, 'tab_4_bullet_3', 'text', '{"v":"Best fit when SLA tracking happens in shared spreadsheets."}'::jsonb,                     55)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
