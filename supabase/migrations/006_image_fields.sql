-- ============================================================
-- 006: Image fields + Supabase Storage bucket
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

-- ── Storage bucket ────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('dglide-media', 'dglide-media', true)
on conflict (id) do nothing;

-- Storage RLS policies
drop policy if exists "dglide_media_public_read"       on storage.objects;
drop policy if exists "dglide_media_admin_insert"      on storage.objects;
drop policy if exists "dglide_media_admin_update"      on storage.objects;
drop policy if exists "dglide_media_admin_delete"      on storage.objects;

create policy "dglide_media_public_read"
  on storage.objects for select
  using (bucket_id = 'dglide-media');

create policy "dglide_media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'dglide-media');

create policy "dglide_media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'dglide-media');

create policy "dglide_media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'dglide-media');

-- ── Image content blocks ──────────────────────────────────────

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- Hero: product_image
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'hero';
  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'product_image', 'image', '{"v":"/hero-product.png"}'::jsonb, 10)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- OneSystem: center_image
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'one_system';
  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'center_image', 'image', '{"v":"/onesystem-center.png"}'::jsonb, 10)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- HowItWorks: bg_image
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'how_it_works';
  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'bg_image', 'image', '{"v":"/how-it-works-bg.png"}'::jsonb, 10)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- LivingService: circle_image + waves_image
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'living_service';
  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'circle_image', 'image', '{"v":"/living-service-circle.png"}'::jsonb, 10)
    on conflict (section_id, block_key) do nothing;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'waves_image', 'image', '{"v":"/living-service-waves.png"}'::jsonb, 11)
    on conflict (section_id, block_key) do nothing;
  end if;

  -- BusinessTabs: tab_image
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'business_tabs';
  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index)
    values (_sid, 'tab_image', 'image', '{"v":"/section-tabs.png"}'::jsonb, 10)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
