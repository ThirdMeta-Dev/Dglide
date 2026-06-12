-- 016: Replace "Services" nav item with "About Us" and add "Why Us" as its dropdown child

UPDATE dglide_navigation
SET label = 'About Us',
    href = '/about',
    has_dropdown = true,
    updated_at = now()
WHERE href = '/services';

INSERT INTO dglide_navigation (label, href, order_index, has_dropdown, parent_id, is_visible, open_in_new_tab)
SELECT 'Why Us', '/why-dglide', 0, false, id, true, false
FROM dglide_navigation
WHERE href = '/about'
  AND NOT EXISTS (SELECT 1 FROM dglide_navigation WHERE href = '/why-dglide');
