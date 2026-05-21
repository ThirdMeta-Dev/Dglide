-- Migration 003: Seed homepage sections with default editable content blocks
DO $$
DECLARE
  _page_id uuid;
  _sid uuid;
BEGIN
  SELECT id INTO _page_id FROM dglide_pages WHERE slug = 'home';
  IF _page_id IS NULL THEN RAISE EXCEPTION 'Home page not found – run 002_dglide_seed.sql first'; END IF;

  -- 1. Hero
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'hero', 1, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text',           'text', '{"v":"Configurable Operations Platform"}'::jsonb,                                                                    0),
    (_sid, 'title',                'text', '{"v":"Your Operations Run on Workarounds. They Shouldn''t."}'::jsonb,                                                1),
    (_sid, 'subtitle',             'text', '{"v":"DGlide gives you ready-to-run systems for field service, sales, and operations that adapt to how your business actually works."}'::jsonb, 2),
    (_sid, 'cta_primary_label',   'text', '{"v":"Book a Demo"}'::jsonb,                                                                                         3),
    (_sid, 'cta_primary_href',    'url',  '{"v":"/demo"}'::jsonb,                                                                                               4),
    (_sid, 'cta_secondary_label', 'text', '{"v":"See How It Works"}'::jsonb,                                                                                    5),
    (_sid, 'cta_secondary_href',  'url',  '{"v":"#how-it-works"}'::jsonb,                                                                                       6),
    (_sid, 'logo_carousel_title', 'text', '{"v":"Who''s Already Running on DGlide"}'::jsonb,                                                                    7);

  -- 2. SoftwareWorks
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'software_works', 2, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Software That Works For You"}'::jsonb,                                                  0),
    (_sid, 'title',      'text', '{"v":"Built around how your team actually operates"}'::jsonb,                                  1),
    (_sid, 'subtitle',   'text', '{"v":"Most software forces you to change how you work. DGlide configures to match it."}'::jsonb, 2);

  -- 3. Comparison
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'comparison', 3, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Why DGlide"}'::jsonb,                                               0),
    (_sid, 'title',      'text', '{"v":"The Smarter Way to Build Operations"}'::jsonb,                       1),
    (_sid, 'subtitle',   'text', '{"v":"See how DGlide compares to your current options"}'::jsonb,           2);

  -- 4. FourReasons
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'four_reasons', 4, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Why DGlide"}'::jsonb,                                                        0),
    (_sid, 'title',      'text', '{"v":"Four Reasons Operations Leaders Choose DGlide"}'::jsonb,                      1),
    (_sid, 'subtitle',   'text', '{"v":"Built for teams who need results, not just software"}'::jsonb,                2);

  -- 5. OneSystem
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'one_system', 5, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"One Platform"}'::jsonb,                                                              0),
    (_sid, 'title',      'text', '{"v":"One System for Your Entire Operation"}'::jsonb,                                      1),
    (_sid, 'subtitle',   'text', '{"v":"Replace disconnected tools with one connected platform"}'::jsonb,                    2);

  -- 6. HowItWorks
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'how_it_works', 6, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"How It Works"}'::jsonb,                                       0),
    (_sid, 'title',      'text', '{"v":"Simple Setup. Powerful Results."}'::jsonb,                     1),
    (_sid, 'subtitle',   'text', '{"v":"From first look to full deployment in weeks"}'::jsonb,          2);

  -- 7. LivingService
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'living_service', 7, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"A Living Service"}'::jsonb,                                                             0),
    (_sid, 'title',      'text', '{"v":"Not Just Software — A Living Service That Evolves With You"}'::jsonb,                   1),
    (_sid, 'subtitle',   'text', '{"v":"DGlide adapts as your operations grow and change"}'::jsonb,                              2);

  -- 8. BusinessTabs
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'business_tabs', 8, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Built for Your Business"}'::jsonb,              0),
    (_sid, 'title',      'text', '{"v":"Tailored for Every Type of Operation"}'::jsonb,  1);

  -- 9. CaseStudies
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'case_studies', 9, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Proof, Not Promises"}'::jsonb,                                             0),
    (_sid, 'title',      'text', '{"v":"Real Results from Real Operations"}'::jsonb,                                1),
    (_sid, 'subtitle',   'text', '{"v":"See how teams like yours transformed with DGlide"}'::jsonb,                 2),
    (_sid, 'cta_label',  'text', '{"v":"Get the full story"}'::jsonb,                                              3),
    (_sid, 'cta_href',   'url',  '{"v":"#"}'::jsonb,                                                               4);

  -- 10. Competitor
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'competitor', 10, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Why Not the Alternatives?"}'::jsonb,                      0),
    (_sid, 'title',      'text', '{"v":"Every Other Option Has a Catch"}'::jsonb,                  1),
    (_sid, 'subtitle',   'text', '{"v":"See why DGlide wins where others fall short"}'::jsonb,     2);

  -- 11. Capabilities
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'capabilities', 11, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Capabilities"}'::jsonb,                                                         0),
    (_sid, 'title',      'text', '{"v":"Everything You Need to Run Operations at Scale"}'::jsonb,                        1),
    (_sid, 'subtitle',   'text', '{"v":"Powerful features built for operational complexity"}'::jsonb,                    2);

  -- 12. LogoCarousel
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'logo_carousel', 12, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'title', 'text', '{"v":"Trusted by Operations Teams Across Industries"}'::jsonb, 0);

  -- 13. Testimonials
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'testimonials', 13, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Customer Stories"}'::jsonb,                                    0),
    (_sid, 'title',      'text', '{"v":"What Operations Leaders Say About DGlide"}'::jsonb,             1),
    (_sid, 'subtitle',   'text', '{"v":"Real feedback from teams running on DGlide"}'::jsonb,           2);

  -- 14. LiveFaster
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'live_faster', 14, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'title',    'text', '{"v":"From Demo to Live in Weeks"}'::jsonb,                            0),
    (_sid, 'subtitle', 'text', '{"v":"Live Faster Than a Custom Build Would Even Start"}'::jsonb,       1);

  -- 15. CTA
  INSERT INTO dglide_sections (page_id, section_type, order_index, is_visible)
  VALUES (_page_id, 'cta', 15, true) RETURNING id INTO _sid;
  INSERT INTO dglide_content_blocks (section_id, block_key, block_type, value, order_index) VALUES
    (_sid, 'badge_text', 'text', '{"v":"Get an All-in-One Platform"}'::jsonb,                                                                                              0),
    (_sid, 'title',      'text', '{"v":"Tell us how your operation runs. We will show you where DGlide fits. And build it in weeks."}'::jsonb,                             1),
    (_sid, 'cta_label',  'text', '{"v":"Get a Demo"}'::jsonb,                                                                                                             2),
    (_sid, 'cta_href',   'url',  '{"v":"#"}'::jsonb,                                                                                                                      3);
END $$;
