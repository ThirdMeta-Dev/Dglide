import Header, { type NavItemData, type HeaderSettings } from "@/components/layout/Header";
import Footer, { type FooterSettings, type FooterLink } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

async function getHeaderData(): Promise<{ navItems: NavItemData[]; settings: HeaderSettings | undefined }> {
  try {
    const supabase = await createClient();
    const [{ data: nav }, { data: gs }] = await Promise.all([
      supabase.from("dglide_navigation").select("label, href, has_dropdown").eq("is_visible", true).order("order_index"),
      supabase.from("dglide_global_settings").select("value").eq("key", "header").single(),
    ]);
    return {
      navItems: (nav ?? []) as NavItemData[],
      settings: gs?.value as HeaderSettings | undefined,
    };
  } catch {
    return { navItems: [], settings: undefined };
  }
}

async function getFooterData(): Promise<{ settings: FooterSettings | undefined; links: FooterLink[] }> {
  try {
    const supabase = await createClient();
    const [{ data: gs }, { data: fl }] = await Promise.all([
      supabase.from("dglide_global_settings").select("value").eq("key", "footer").single(),
      supabase.from("dglide_footer_links").select("id, column_index, column_heading, label, href, order_index").eq("is_visible", true).order("column_index").order("order_index"),
    ]);
    return {
      settings: gs?.value as FooterSettings | undefined,
      links:    (fl ?? []) as FooterLink[],
    };
  } catch {
    return { settings: undefined, links: [] };
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [{ navItems, settings }, { settings: footerSettings, links: footerLinks }] = await Promise.all([
    getHeaderData(),
    getFooterData(),
  ]);

  return (
    <>
      <Header navItems={navItems} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={footerSettings} links={footerLinks} />
    </>
  );
}
