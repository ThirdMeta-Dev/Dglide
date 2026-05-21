-- ============================================================
-- 010: CaseStudies — all text + image fields
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
  where page_id = _page_id and section_type = 'case_studies';

  if _sid is not null then
    insert into dglide_content_blocks (section_id, block_key, block_type, value, order_index) values
      -- Section heading
      (_sid, 'title',            'text',  '{"v":"Proof, Not Promises"}'::jsonb,                                                                                            10),
      -- Left card — challenge
      (_sid, 'challenge_title',  'text',  '{"v":"The Challenge"}'::jsonb,                                                                                                  11),
      (_sid, 'challenge_body',   'text',  '{"v":"A 50-person laser machine manufacturer stopped the leaks: lost leads, slow service, no visibility."}'::jsonb,             12),
      (_sid, 'challenge_tag_1',  'text',  '{"v":"Automated Operational Flows"}'::jsonb,                                                                                    13),
      (_sid, 'challenge_tag_2',  'text',  '{"v":"Workflow Coordination"}'::jsonb,                                                                                          14),
      -- Left card — success metrics
      (_sid, 'metrics_title',    'text',  '{"v":"The Success Metrics"}'::jsonb,                                                                                            15),
      (_sid, 'metrics_body',     'text',  '{"v":"After DGlide, the team could see and act in real time. The numbers moved within the first quarter."}'::jsonb,             16),
      (_sid, 'metric_1_num',     'text',  '{"v":"3X"}'::jsonb,                                                                                                             17),
      (_sid, 'metric_1_label',   'text',  '{"v":"Lead Capture"}'::jsonb,                                                                                                   18),
      (_sid, 'metric_2_num',     'text',  '{"v":"8 Min"}'::jsonb,                                                                                                          19),
      (_sid, 'metric_2_label',   'text',  '{"v":"Response Down From 40+"}'::jsonb,                                                                                         20),
      (_sid, 'metric_3_num',     'text',  '{"v":"75%"}'::jsonb,                                                                                                            21),
      (_sid, 'metric_3_label',   'text',  '{"v":"Lower Cost"}'::jsonb,                                                                                                     22),
      -- Quote + avatar
      (_sid, 'quote_text',       'text',  '{"v":"Now I open my phone and see every project, every complaint, every shipment."}'::jsonb,                                    23),
      (_sid, 'testimonial_image','image', '{"v":""}'::jsonb,                                                                                                               24),
      -- Right card
      (_sid, 'right_title',      'text',  '{"v":"How DGlide Fixed It"}'::jsonb,                                                                                            25),
      (_sid, 'right_item_1',     'text',  '{"v":"Every tool replaced by one platform"}'::jsonb,                                                                            26),
      (_sid, 'right_item_2',     'text',  '{"v":"One dashboard for the whole operation"}'::jsonb,                                                                          27),
      (_sid, 'right_item_3',     'text',  '{"v":"Automated routing of work and approvals"}'::jsonb,                                                                        28),
      (_sid, 'right_item_4',     'text',  '{"v":"Service, field, and office in sync"}'::jsonb,                                                                             29),
      (_sid, 'right_item_5',     'text',  '{"v":"Faster service resolution"}'::jsonb,                                                                                      30),
      (_sid, 'right_item_6',     'text',  '{"v":"Continuous fit through the Living Service Model"}'::jsonb,                                                                31),
      -- CTA
      (_sid, 'cta_label',        'text',  '{"v":"Get the full story"}'::jsonb,                                                                                             32),
      (_sid, 'cta_href',         'url',   '{"v":"/schedule-demo"}'::jsonb,                                                                                                 33)
    on conflict (section_id, block_key) do nothing;
  end if;

end $$;
