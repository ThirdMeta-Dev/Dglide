-- ============================================================
-- 013: LiveFaster step fields + Footer 6-column seed
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

do $$
declare
  _page_id uuid;
  _sid     uuid;
begin
  select id into _page_id from dglide_pages where slug = 'home';

  -- ── LiveFasterSection — update title/subtitle + add 3 step cards ──
  select id into _sid from dglide_sections
  where page_id = _page_id and section_type = 'live_faster';

  if _sid is not null then
    -- Fix title/subtitle to match current frontend
    update dglide_content_blocks
    set value = '{"v":"From Demo to Live in Weeks"}'::jsonb
    where section_id = _sid and block_key = 'title';

    update dglide_content_blocks
    set value = '{"v":"Live Faster Than a Custom Build Would Even Start"}'::jsonb
    where section_id = _sid and block_key = 'subtitle';

    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      (_sid, 'step_1_title',     'text', '{"v":"Pick Your Starting System"}'::jsonb,                       10),
      (_sid, 'step_1_desc',      'text', '{"v":"Start With A Ready-To-Go System"}'::jsonb,                 11),
      (_sid, 'step_1_cta_label', 'text', '{"v":"Get Started Now"}'::jsonb,                                 12),
      (_sid, 'step_1_cta_href',  'url',  '{"v":"/schedule-demo"}'::jsonb,                                  13),
      (_sid, 'step_2_title',     'text', '{"v":"Configure to Your Operation"}'::jsonb,                     14),
      (_sid, 'step_2_desc',      'text', '{"v":"Shape It As Per Your Needs"}'::jsonb,                      15),
      (_sid, 'step_2_cta_label', 'text', '{"v":"Get Started Now"}'::jsonb,                                 16),
      (_sid, 'step_2_cta_href',  'url',  '{"v":"/schedule-demo"}'::jsonb,                                  17),
      (_sid, 'step_3_title',     'text', '{"v":"Launch in Weeks"}'::jsonb,                                 18),
      (_sid, 'step_3_desc',      'text', '{"v":"Once All Customization Is Done, Go-Live"}'::jsonb,         19),
      (_sid, 'step_3_cta_label', 'text', '{"v":"Get Started Now"}'::jsonb,                                 20),
      (_sid, 'step_3_cta_href',  'url',  '{"v":"/schedule-demo"}'::jsonb,                                  21)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;

-- ── Footer global_settings — add new fields (merge into existing JSONB) ──
update dglide_global_settings
set value = value || '{
  "newsletter_placeholder": "Enter Your Email",
  "tagline":                "We finally have visibility in our operations. Your system adapts to how you work.",
  "privacy_label":          "Privacy Policy",
  "privacy_href":           "#",
  "terms_label":            "Terms",
  "terms_href":             "#"
}'::jsonb
where key = 'footer';

-- ── Footer links — widen column_index constraint to support 6 columns ──
alter table dglide_footer_links
  drop constraint if exists dglide_footer_links_column_index_check;

alter table dglide_footer_links
  add constraint dglide_footer_links_column_index_check
    check (column_index between 0 and 5);

-- ── Footer links — seed 6 correct DGlide columns ──
-- If column 3 (Why DGlide) doesn't exist yet, replace all links with DGlide content
do $$
begin
  if not exists (select 1 from dglide_footer_links where column_index = 3) then
    delete from dglide_footer_links;

    insert into dglide_footer_links (column_index, column_heading, label, href, order_index, is_visible) values
      -- Column 0: Platform
      (0, 'Platform',   'Overview',                          '#', 0, true),
      (0, null,         'Living Service Model (LSM)',         '#', 1, true),
      (0, null,         'Architecture & Capabilities',        '#', 2, true),
      -- Column 1: Solutions
      (1, 'Solutions',  'Field Service Management',           '#', 0, true),
      (1, null,         'Process Management',                 '#', 1, true),
      (1, null,         'Service / ITSM Workflows',           '#', 2, true),
      (1, null,         'Field Sales Execution',              '#', 3, true),
      (1, null,         'CRM (Support Layer)',                '#', 4, true),
      -- Column 2: Use Cases
      (2, 'Use Cases',  'Field Service Businesses',           '#', 0, true),
      (2, null,         'Manufacturing & Process Businesses', '#', 1, true),
      (2, null,         'Growing SMB Operations',             '#', 2, true),
      (2, null,         'Internal Operations Teams',          '#', 3, true),
      -- Column 3: Why DGlide
      (3, 'Why DGlide', 'Compare Alternatives',              '#', 0, true),
      (3, null,         'Who It''s For / Not For',            '#', 1, true),
      -- Column 4: Resources
      (4, 'Resources',  'Blog',                              '#', 0, true),
      (4, null,         'Guides / Playbooks',                 '#', 1, true),
      -- Column 5: Company
      (5, 'Company',    'About DGlide',                      '#', 0, true),
      (5, null,         'Contact / Book Demo',                '#', 1, true);
  end if;
end $$;
