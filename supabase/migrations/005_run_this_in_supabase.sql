-- ============================================================
-- DGlide Complete Setup — paste this entire file into
-- Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (fully idempotent)
-- ============================================================

-- ── 001: Schema ─────────────────────────────────────────────

create table if not exists dglide_global_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

create table if not exists dglide_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  meta_description text,
  og_image text,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dglide_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references dglide_pages(id) on delete cascade,
  section_type text not null,
  order_index integer not null default 0,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dglide_content_blocks (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references dglide_sections(id) on delete cascade,
  block_key text not null,
  block_type text not null check (block_type in ('text', 'richtext', 'image', 'video', 'url', 'color', 'boolean', 'array', 'number')),
  value jsonb not null default '{}',
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(section_id, block_key)
);

create table if not exists dglide_navigation (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text,
  order_index integer not null default 0,
  has_dropdown boolean default false,
  parent_id uuid references dglide_navigation(id) on delete cascade,
  is_visible boolean default true,
  open_in_new_tab boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dglide_footer_links (
  id uuid primary key default gen_random_uuid(),
  column_index integer not null check (column_index between 0 and 4),
  column_heading text,
  label text not null,
  href text not null,
  order_index integer not null default 0,
  is_visible boolean default true,
  open_in_new_tab boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dglide_media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  url text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists dglide_demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  contact text,
  company text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Updated_at trigger
create or replace function dglide_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'dglide_pages_updated_at') then
    create trigger dglide_pages_updated_at before update on dglide_pages for each row execute function dglide_set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'dglide_sections_updated_at') then
    create trigger dglide_sections_updated_at before update on dglide_sections for each row execute function dglide_set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'dglide_content_blocks_updated_at') then
    create trigger dglide_content_blocks_updated_at before update on dglide_content_blocks for each row execute function dglide_set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'dglide_navigation_updated_at') then
    create trigger dglide_navigation_updated_at before update on dglide_navigation for each row execute function dglide_set_updated_at();
  end if;
end $$;

-- RLS
alter table dglide_global_settings enable row level security;
alter table dglide_pages enable row level security;
alter table dglide_sections enable row level security;
alter table dglide_content_blocks enable row level security;
alter table dglide_navigation enable row level security;
alter table dglide_footer_links enable row level security;
alter table dglide_media enable row level security;
alter table dglide_demo_requests enable row level security;

-- Drop and recreate policies (idempotent)
do $$ declare r record; begin
  for r in select policyname, tablename from pg_policies where tablename like 'dglide_%' loop
    execute format('drop policy if exists %I on %I', r.policyname, r.tablename);
  end loop;
end $$;

-- Public read
create policy "public_read_global_settings"  on dglide_global_settings  for select using (true);
create policy "public_read_pages"            on dglide_pages             for select using (is_published = true);
create policy "public_read_sections"         on dglide_sections          for select using (is_visible = true);
create policy "public_read_content_blocks"   on dglide_content_blocks    for select using (true);
create policy "public_read_navigation"       on dglide_navigation        for select using (is_visible = true);
create policy "public_read_footer_links"     on dglide_footer_links      for select using (is_visible = true);
create policy "public_read_media"            on dglide_media             for select using (true);

-- Authenticated admin full access
create policy "admin_all_global_settings"   on dglide_global_settings  for all using (auth.role() = 'authenticated');
create policy "admin_all_pages"             on dglide_pages             for all using (auth.role() = 'authenticated');
create policy "admin_all_sections"          on dglide_sections          for all using (auth.role() = 'authenticated');
create policy "admin_all_content_blocks"    on dglide_content_blocks    for all using (auth.role() = 'authenticated');
create policy "admin_all_navigation"        on dglide_navigation        for all using (auth.role() = 'authenticated');
create policy "admin_all_footer_links"      on dglide_footer_links      for all using (auth.role() = 'authenticated');
create policy "admin_all_media"             on dglide_media             for all using (auth.role() = 'authenticated');

-- Demo requests: public insert, service role read/update
create policy "allow_insert_demo_requests"  on dglide_demo_requests     for insert with check (true);
create policy "service_role_demo_requests"  on dglide_demo_requests     for all using (auth.role() = 'service_role');
create policy "admin_read_demo_requests"    on dglide_demo_requests     for select using (auth.role() = 'authenticated');
create policy "admin_update_demo_requests"  on dglide_demo_requests     for update using (auth.role() = 'authenticated');

-- ── 002: Seed navigation, footer, global settings, pages ────

insert into dglide_navigation (label, href, order_index, has_dropdown) values
  ('Home',      '/',          0, false),
  ('Services',  '/services',  1, false),
  ('Solutions', '/solutions', 2, false),
  ('Industry',  '/industry',  3, true),
  ('Resources', '/resources', 4, true)
on conflict do nothing;

insert into dglide_global_settings (key, value) values
  ('header', '{"logo_url":"","cta_label":"Get Started Now","cta_href":"/schedule-demo","is_sticky":true}'::jsonb),
  ('footer', '{"newsletter_heading":"Subscribe to Our Newsletter","newsletter_button_label":"Subscribe Now","phone":"+91 6787878787","email":"info@dglide.com","copyright":"Copyright © 2025 DGlide. All Rights Reserved.","social":{"linkedin":"","twitter":"","whatsapp":"","instagram":""}}'::jsonb),
  ('site',   '{"site_name":"DGlide","tagline":"","favicon":"","og_default_image":""}'::jsonb)
on conflict (key) do update set value = excluded.value;

-- Pages
insert into dglide_pages (slug, title, meta_description) values
  ('home',          'Home',          'Welcome to DGlide'),
  ('schedule-demo', 'Schedule Demo', 'Book a live DGlide walkthrough')
on conflict (slug) do nothing;

-- ── 003: Homepage section content blocks ────────────────────

do $$
declare
  _page_id uuid;
  _sid uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- Only seed if no sections exist yet for this page
  if not exists (select 1 from dglide_sections where page_id = _page_id) then

    -- 1. Hero
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'hero', 1, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text',          'text', '{"v":"Configurable Operations Platform"}'::jsonb,                                                                                             0),
      (_sid, 'title',               'text', '{"v":"Your Operations Run on Workarounds. They Shouldn''t."}'::jsonb,                                                                        1),
      (_sid, 'subtitle',            'text', '{"v":"DGlide gives you ready-to-run systems for field service, sales, and operations that adapt to how your business actually works."}'::jsonb, 2),
      (_sid, 'cta_primary_label',   'text', '{"v":"Book a Demo"}'::jsonb,                                                                                                                  3),
      (_sid, 'cta_primary_href',    'url',  '{"v":"/schedule-demo"}'::jsonb,                                                                                                               4),
      (_sid, 'cta_secondary_label', 'text', '{"v":"See How It Works"}'::jsonb,                                                                                                             5),
      (_sid, 'cta_secondary_href',  'url',  '{"v":"#how-it-works"}'::jsonb,                                                                                                                6),
      (_sid, 'logo_carousel_title', 'text', '{"v":"Who''s Already Running on DGlide"}'::jsonb,                                                                                             7);

    -- 2. SoftwareWorks
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'software_works', 2, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Your Software Works."}'::jsonb,                                                                                                              0),
      (_sid, 'title',      'text', '{"v":"Just Not the Way You Do."}'::jsonb,                                                                                                          1),
      (_sid, 'subtitle',   'text', '{"v":"Every Tool You Bought Solved One Thing And Ignored How The Rest Of Your Operation Works."}'::jsonb,                                          2);

    -- 3. Comparison
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'comparison', 3, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Why DGlide"}'::jsonb,                                                                                                                                              0),
      (_sid, 'title',      'text', '{"v":"Stuck Between Rigid Tools And Building Your Own?"}'::jsonb,                                                                                                        1),
      (_sid, 'subtitle',   'text', '{"v":"Until now, you had two bad options: software that does not fit, or a custom build that never ends. DGlide is the 3rd: best of all worlds."}'::jsonb,               2);

    -- 4. FourReasons
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'four_reasons', 4, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Why DGlide"}'::jsonb,                                                                    0),
      (_sid, 'title',      'text', '{"v":"Four Reasons DGlide Fits Where Others Don''t"}'::jsonb,                                  1),
      (_sid, 'subtitle',   'text', '{"v":"Built for teams who need results, not just software"}'::jsonb,                            2);

    -- 5. OneSystem
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'one_system', 5, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"One Platform"}'::jsonb,                                                                                                             0),
      (_sid, 'title',      'text', '{"v":"Run Your Whole Operation On One System"}'::jsonb,                                                                                   1),
      (_sid, 'subtitle',   'text', '{"v":"Field Service, Production, Internal Ops, Field Sales. One Backbone, No Disconnected Tools."}'::jsonb,                               2);

    -- 6. HowItWorks
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'how_it_works', 6, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"How It Works"}'::jsonb,              0),
      (_sid, 'title',      'text', '{"v":"How DGlide Works"}'::jsonb,           1),
      (_sid, 'subtitle',   'text', '{"v":"From first look to full deployment in weeks"}'::jsonb, 2);

    -- 7. LivingService
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'living_service', 7, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"A Living Service"}'::jsonb,                                                             0),
      (_sid, 'title',      'text', '{"v":"Not Just Software — A Living Service That Evolves With You"}'::jsonb,                   1),
      (_sid, 'subtitle',   'text', '{"v":"DGlide adapts as your operations grow and change"}'::jsonb,                              2);

    -- 8. BusinessTabs
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'business_tabs', 8, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Built for Your Business"}'::jsonb,             0),
      (_sid, 'title',      'text', '{"v":"Tailored for Every Type of Operation"}'::jsonb, 1);

    -- 9. CaseStudies
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'case_studies', 9, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Proof, Not Promises"}'::jsonb,                                             0),
      (_sid, 'title',      'text', '{"v":"Real Results from Real Operations"}'::jsonb,                                1),
      (_sid, 'subtitle',   'text', '{"v":"See how teams like yours transformed with DGlide"}'::jsonb,                 2),
      (_sid, 'cta_label',  'text', '{"v":"Get the full story"}'::jsonb,                                              3),
      (_sid, 'cta_href',   'url',  '{"v":"#"}'::jsonb,                                                               4);

    -- 10. Competitor
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'competitor', 10, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Why Not the Alternatives?"}'::jsonb,                      0),
      (_sid, 'title',      'text', '{"v":"Every Other Option Has a Catch"}'::jsonb,                  1),
      (_sid, 'subtitle',   'text', '{"v":"See why DGlide wins where others fall short"}'::jsonb,     2);

    -- 11. Capabilities
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'capabilities', 11, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Capabilities"}'::jsonb,                                                         0),
      (_sid, 'title',      'text', '{"v":"Everything Your Operation Needs in One Place"}'::jsonb,                          1),
      (_sid, 'subtitle',   'text', '{"v":"From field dispatch to sales pipelines — it''s all here."}'::jsonb,              2);

    -- 12. LogoCarousel
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'logo_carousel', 12, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'title', 'text', '{"v":"Who''s Already Running on DGlide"}'::jsonb, 0);

    -- 13. Testimonials
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'testimonials', 13, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'title',    'text', '{"v":"What Operations Leaders Say"}'::jsonb,                   0),
      (_sid, 'subtitle', 'text', '{"v":"Hear from the teams running on DGlide every day"}'::jsonb, 1);

    -- 14. LiveFaster
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'live_faster', 14, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'title',    'text', '{"v":"Simple Setup. Powerful Results."}'::jsonb,                0),
      (_sid, 'subtitle', 'text', '{"v":"From first look to full deployment in three steps"}'::jsonb, 1);

    -- 15. CTA
    insert into dglide_sections (page_id, section_type, order_index, is_visible)
    values (_page_id, 'cta', 15, true) returning id into _sid;
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'badge_text', 'text', '{"v":"Get an All-in-One Platform"}'::jsonb,                                                              0),
      (_sid, 'title',      'text', '{"v":"Tell us how your operation runs. We will show you where DGlide fits. About 30 minutes."}'::jsonb,   1),
      (_sid, 'cta_label',  'text', '{"v":"Get a Demo"}'::jsonb,                                                                             2),
      (_sid, 'cta_href',   'url',  '{"v":"/schedule-demo"}'::jsonb,                                                                         3);

  end if;
end $$;
