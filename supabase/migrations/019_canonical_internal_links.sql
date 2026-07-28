-- Point internal navigation and migrated article links directly at canonical URLs.
-- Permanent redirects remain in next.config.ts for old links and backlinks.

update dglide_footer_links
set href = case href
  when '/fsm' then '/field-service-management-fsm'
  when '/itsm' then '/it-service-management-itsm'
  when '/blog' then '/blogs'
  when 'https://dglide.com/blog' then '/blogs'
  else href
end,
updated_at = now()
where href in ('/fsm', '/itsm', '/blog', 'https://dglide.com/blog');

update dglide_blogs
set content_html = replace(
      replace(
        replace(
          replace(
            replace(
              replace(
                content_html,
                'https://dglide.com/field-service-management-fsm/',
                '/field-service-management-fsm'
              ),
              'https://www.dglide.com/ticket-management/',
              '/blogs/ticket-management-software-for-operations-teams'
            ),
            'https://www.dglide.com/no-code-low-code-future-business-applications/',
            '/blogs/no-code-low-code-future-business-applications'
          ),
          'https://www.dglide.com/customer-stories/',
          '/case-studies'
        ),
        'https://www.dglide.com/it-service-management-itsm/',
        '/it-service-management-itsm'
      ),
      'https://dglide.com/contact-us/',
      '/contact-us'
    ),
    updated_at = now()
where slug = 'no-code-enterprise-platform-facility-management-middle-east'
  and (
    content_html like '%https://dglide.com/field-service-management-fsm/%'
    or content_html like '%https://www.dglide.com/ticket-management/%'
    or content_html like '%https://www.dglide.com/no-code-low-code-future-business-applications/%'
    or content_html like '%https://www.dglide.com/customer-stories/%'
    or content_html like '%https://www.dglide.com/it-service-management-itsm/%'
    or content_html like '%https://dglide.com/contact-us/%'
  );
