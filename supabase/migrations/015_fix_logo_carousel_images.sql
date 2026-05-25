-- Fix logo carousel: replace placeholder /logo.png with actual client logo paths
DO $$
DECLARE
  _page_id uuid;
  _sid     uuid;
BEGIN
  SELECT id INTO _page_id FROM dglide_pages WHERE slug = 'home' LIMIT 1;
  SELECT id INTO _sid FROM dglide_sections WHERE page_id = _page_id AND section_type = 'logo_carousel' LIMIT 1;

  IF _sid IS NOT NULL THEN
    UPDATE dglide_content_blocks SET value = '{"v":"/logos/logo-1.png"}'::jsonb WHERE section_id = _sid AND block_key = 'logo_1_image';
    UPDATE dglide_content_blocks SET value = '{"v":"/logos/logo-2.png"}'::jsonb WHERE section_id = _sid AND block_key = 'logo_2_image';
    UPDATE dglide_content_blocks SET value = '{"v":"/logos/logo-3.png"}'::jsonb WHERE section_id = _sid AND block_key = 'logo_3_image';
    UPDATE dglide_content_blocks SET value = '{"v":"/logos/logo-4.png"}'::jsonb WHERE section_id = _sid AND block_key = 'logo_4_image';
    UPDATE dglide_content_blocks SET value = '{"v":"/logos/logo-5.png"}'::jsonb WHERE section_id = _sid AND block_key = 'logo_5_image';
    -- Remove extra slots beyond 5 that pointed to placeholder
    DELETE FROM dglide_content_blocks WHERE section_id = _sid AND block_key IN ('logo_6_image', 'logo_7_image');
  END IF;
END $$;
