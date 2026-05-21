-- ============================================================
-- 012: LivingService — per-slide detail text (replaces shared detail_text)
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'living_service';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'slide_1_detail', 'text', '{"v":"Daily work runs in one system, because DGlide maps to your real workflow, not the other way around."}'::jsonb, 28),
      (_sid, 'slide_2_detail', 'text', '{"v":"Your system keeps up as your operation evolves — no re-implementation needed."}'::jsonb,                       29),
      (_sid, 'slide_3_detail', 'text', '{"v":"Scale your team without adding tool complexity. DGlide grows with you."}'::jsonb,                             30),
      (_sid, 'slide_4_detail', 'text', '{"v":"Make changes yourself, without waiting on a developer or a support ticket."}'::jsonb,                         31)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
