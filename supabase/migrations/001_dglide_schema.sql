-- DGlide CMS Schema
-- All tables prefixed with dglide_ to avoid conflicts with existing tables

-- Global settings (header config, footer config, site-wide settings)
create table if not exists dglide_global_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Pages
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

-- Sections within a page
create table if not exists dglide_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references dglide_pages(id) on delete cascade,
  section_type text not null,
  order_index integer not null default 0,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Flexible content blocks (key-value per section)
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

-- Navigation items (header)
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

-- Footer link columns
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

-- Media library
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

-- Updated_at trigger function
create or replace function dglide_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger dglide_pages_updated_at before update on dglide_pages
  for each row execute function dglide_set_updated_at();

create trigger dglide_sections_updated_at before update on dglide_sections
  for each row execute function dglide_set_updated_at();

create trigger dglide_content_blocks_updated_at before update on dglide_content_blocks
  for each row execute function dglide_set_updated_at();

create trigger dglide_navigation_updated_at before update on dglide_navigation
  for each row execute function dglide_set_updated_at();

-- RLS Policies
alter table dglide_global_settings enable row level security;
alter table dglide_pages enable row level security;
alter table dglide_sections enable row level security;
alter table dglide_content_blocks enable row level security;
alter table dglide_navigation enable row level security;
alter table dglide_footer_links enable row level security;
alter table dglide_media enable row level security;

-- Public read for published content
create policy "public_read_global_settings" on dglide_global_settings for select using (true);
create policy "public_read_pages" on dglide_pages for select using (is_published = true);
create policy "public_read_sections" on dglide_sections for select using (is_visible = true);
create policy "public_read_content_blocks" on dglide_content_blocks for select using (true);
create policy "public_read_navigation" on dglide_navigation for select using (is_visible = true);
create policy "public_read_footer_links" on dglide_footer_links for select using (is_visible = true);
create policy "public_read_media" on dglide_media for select using (true);

-- Authenticated users (admins) can do everything
create policy "admin_all_global_settings" on dglide_global_settings for all using (auth.role() = 'authenticated');
create policy "admin_all_pages" on dglide_pages for all using (auth.role() = 'authenticated');
create policy "admin_all_sections" on dglide_sections for all using (auth.role() = 'authenticated');
create policy "admin_all_content_blocks" on dglide_content_blocks for all using (auth.role() = 'authenticated');
create policy "admin_all_navigation" on dglide_navigation for all using (auth.role() = 'authenticated');
create policy "admin_all_footer_links" on dglide_footer_links for all using (auth.role() = 'authenticated');
create policy "admin_all_media" on dglide_media for all using (auth.role() = 'authenticated');
