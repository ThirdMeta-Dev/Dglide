-- Seed: Default navigation items
insert into dglide_navigation (label, href, order_index, has_dropdown) values
  ('Home', '/', 0, false),
  ('Services', '/services', 1, false),
  ('Solutions', '/solutions', 2, false),
  ('Industry', '/industry', 3, true),
  ('Resources', '/resources', 4, true)
on conflict do nothing;

-- Seed: Footer columns
-- Column 0: Company
insert into dglide_footer_links (column_index, column_heading, label, href, order_index) values
  (0, 'Company', 'About Us', '/about', 0),
  (0, null, 'Careers', '/careers', 1),
  (0, null, 'Contact', '/contact', 2),
  (0, null, 'Blog', '/blog', 3)
on conflict do nothing;

-- Column 1: Services
insert into dglide_footer_links (column_index, column_heading, label, href, order_index) values
  (1, 'Services', 'Services', '/services', 0),
  (1, null, 'Solutions', '/solutions', 1),
  (1, null, 'Industries', '/industry', 2),
  (1, null, 'Pricing', '/pricing', 3)
on conflict do nothing;

-- Column 2: Resources
insert into dglide_footer_links (column_index, column_heading, label, href, order_index) values
  (2, 'Resources', 'Documentation', '/docs', 0),
  (2, null, 'Case Studies', '/case-studies', 1),
  (2, null, 'Blog', '/blog', 2),
  (2, null, 'Support', '/support', 3)
on conflict do nothing;

-- Seed: Global settings
insert into dglide_global_settings (key, value) values
  ('header', '{
    "logo_url": "",
    "cta_label": "Get Started Now",
    "cta_href": "/contact",
    "is_sticky": true
  }'::jsonb),
  ('footer', '{
    "newsletter_heading": "Subscribe to Our Newsletter",
    "newsletter_button_label": "Subscribe Now",
    "phone": "+91 6787878787",
    "email": "info@dglide.com",
    "copyright": "Copyright © 2025 DGlide. All Rights Reserved. Developed by Hexanovate",
    "social": {
      "linkedin": "",
      "twitter": "",
      "whatsapp": "",
      "instagram": ""
    }
  }'::jsonb),
  ('site', '{
    "site_name": "DGlide",
    "tagline": "",
    "favicon": "",
    "og_default_image": ""
  }'::jsonb)
on conflict (key) do update set value = excluded.value;

-- Seed: Home page
insert into dglide_pages (slug, title, meta_description) values
  ('home', 'Home', 'Welcome to DGlide')
on conflict (slug) do nothing;
