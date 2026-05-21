-- ============================================================
-- 008: FourReasons card fields + OneSystem card fields
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- ── FourReasons cards ──────────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'four_reasons';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'card_1_title', 'text', '{"v":"Shaped to Your Operation"}'::jsonb,                                     10),
      (_sid, 'card_1_desc',  'text', '{"v":"Configure the process to match how your team already works."}'::jsonb,  11),
      (_sid, 'card_2_title', 'text', '{"v":"Live in Weeks, Not Months"}'::jsonb,                                    12),
      (_sid, 'card_2_desc',  'text', '{"v":"You get a real, working setup fast, then refine it."}'::jsonb,          13),
      (_sid, 'card_3_title', 'text', '{"v":"Always Up to Date"}'::jsonb,                                            14),
      (_sid, 'card_3_desc',  'text', '{"v":"New team, new product, new process? DGlide adjusts."}'::jsonb,          15),
      (_sid, 'card_4_title', 'text', '{"v":"No IT Project to Own"}'::jsonb,                                         16),
      (_sid, 'card_4_desc',  'text', '{"v":"No developer dependency, no maintenance pile-up."}'::jsonb,             17)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- ── OneSystem cards ────────────────────────────────────────
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'one_system';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'left_1_title',  'text', '{"v":"Field Service Management"}'::jsonb,                                              11),
      (_sid, 'left_1_desc',   'text', '{"v":"Work Orders, Scheduling, Dispatch, And Field Execution At One Place."}'::jsonb,  12),
      (_sid, 'left_2_title',  'text', '{"v":"Service & Internal Operations"}'::jsonb,                                         13),
      (_sid, 'left_2_desc',   'text', '{"v":"Handle Internal Requests And Approvals Without The Ticketing-Tool Limits."}'::jsonb, 14),
      (_sid, 'right_1_title', 'text', '{"v":"Process & Production Management"}'::jsonb,                                       15),
      (_sid, 'right_1_desc',  'text', '{"v":"Track Every Stage From Raw Material To Finished Product."}'::jsonb,              16),
      (_sid, 'right_2_title', 'text', '{"v":"Field Sales Management"}'::jsonb,                                                17),
      (_sid, 'right_2_desc',  'text', '{"v":"Plan Routes, Log Visits, Manage Territories."}'::jsonb,                         18)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
