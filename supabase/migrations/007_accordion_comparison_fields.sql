-- ============================================================
-- 007: SoftwareWorks accordion items + Comparison text fields
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- ── SoftwareWorks accordion items ──────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'software_works';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'item_1_title', 'text',  '{"v":"You Work Around The Software"}'::jsonb,                                                                                                             10),
      (_sid, 'item_1_body',  'text',  '{"v":"Every workaround costs time. Your team builds habits around software limits instead of around your actual goals."}'::jsonb,                         11),
      (_sid, 'item_1_image', 'image', '{"v":""}'::jsonb,                                                                                                                                        12),
      (_sid, 'item_2_title', 'text',  '{"v":"Every Task Needs A Workaround Because The Software Won''t Do It Your Way."}'::jsonb,                                                               13),
      (_sid, 'item_2_body',  'text',  '{"v":"Updates, Approvals, And Follow-Ups Live In Chats And Spreadsheets No One Can Track."}'::jsonb,                                                     14),
      (_sid, 'item_2_image', 'image', '{"v":""}'::jsonb,                                                                                                                                        15),
      (_sid, 'item_3_title', 'text',  '{"v":"What Worked At 10 People Fails At 50"}'::jsonb,                                                                                                    16),
      (_sid, 'item_3_body',  'text',  '{"v":"Processes that felt seamless when your team was small start breaking down as headcount grows and complexity compounds."}'::jsonb,                   17),
      (_sid, 'item_3_image', 'image', '{"v":""}'::jsonb,                                                                                                                                        18),
      (_sid, 'item_4_title', 'text',  '{"v":"You Find Out Too Late"}'::jsonb,                                                                                                                   19),
      (_sid, 'item_4_body',  'text',  '{"v":"By the time a bottleneck surfaces, it has already cost you days. Visibility gaps turn small issues into serious setbacks."}'::jsonb,                20),
      (_sid, 'item_4_image', 'image', '{"v":""}'::jsonb,                                                                                                                                        21)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── Comparison text fields ──────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'comparison';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'left_title',       'text', '{"v":"Fixed-Category Tools"}'::jsonb,                                            10),
      (_sid, 'left_item_1',      'text', '{"v":"Fast to start. Your business bends to fit the software."}'::jsonb,         11),
      (_sid, 'left_item_2',      'text', '{"v":"Cheap to start, expensive in workarounds."}'::jsonb,                       12),
      (_sid, 'left_item_3',      'text', '{"v":"Fits the category, not your business."}'::jsonb,                           13),
      (_sid, 'center_title',     'text', '{"v":"With\nDGlide"}'::jsonb,                                                    14),
      (_sid, 'center_feature_1', 'text', '{"v":"Speed and fit, together"}'::jsonb,                                         15),
      (_sid, 'center_feature_2', 'text', '{"v":"Low cost, no dev team"}'::jsonb,                                           16),
      (_sid, 'center_feature_3', 'text', '{"v":"No maintenance, no upkeeps"}'::jsonb,                                      17),
      (_sid, 'center_feature_4', 'text', '{"v":"Fully customized to your needs"}'::jsonb,                                  18),
      (_sid, 'right_title',      'text', '{"v":"Custom Builds"}'::jsonb,                                                   19),
      (_sid, 'right_item_1',     'text', '{"v":"Fits at first. Becomes a software project you own forever."}'::jsonb,      20),
      (_sid, 'right_item_2',     'text', '{"v":"Months to build, years to maintain, yours to fix."}'::jsonb,               21),
      (_sid, 'right_item_3',     'text', '{"v":"Custom fit comes with a custom headache."}'::jsonb,                        22),
      (_sid, 'bottom_1',         'text', '{"v":"Ready to Run"}'::jsonb,                                                    23),
      (_sid, 'bottom_2',         'text', '{"v":"Configured to Your Process"}'::jsonb,                                      24),
      (_sid, 'bottom_3',         'text', '{"v":"Adapts as You Change"}'::jsonb,                                            25)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
