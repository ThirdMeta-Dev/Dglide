import "@/styles/homepage-responsive.css";
import Header, { type NavItemData, type HeaderSettings } from "@/components/layout/Header";
import Footer, { type FooterSettings, type FooterLink } from "@/components/layout/Footer";
import { unstable_cache } from "next/cache";
import { anonClient } from "@/lib/supabase/anon";

const SUPABASE_READY = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const getHeaderData = unstable_cache(
  async (): Promise<{ navItems: NavItemData[]; settings: HeaderSettings | undefined }> => {
    if (!SUPABASE_READY) return { navItems: [], settings: undefined };
    try {
      const [{ data: nav }, { data: gs }] = await Promise.all([
        anonClient.from("dglide_navigation").select("id, parent_id, label, href, has_dropdown").eq("is_visible", true).order("order_index"),
        anonClient.from("dglide_global_settings").select("value").eq("key", "header").single(),
      ]);
      type NavRow = { id: string; parent_id: string | null; label: string; href: string; has_dropdown: boolean };
      const rows = (nav ?? []) as NavRow[];
      const navItems: NavItemData[] = rows
        .filter((r) => !r.parent_id)
        .map((r) => ({
          label: r.label,
          href: r.href,
          has_dropdown: r.has_dropdown,
          children: rows
            .filter((c) => c.parent_id === r.id)
            .map((c) => ({ label: c.label, href: c.href, has_dropdown: c.has_dropdown })),
        }));
      return { navItems, settings: gs?.value as HeaderSettings | undefined };
    } catch {
      return { navItems: [], settings: undefined };
    }
  },
  ["layout-header"],
  { revalidate: 300 }
);

const getFooterData = unstable_cache(
  async (): Promise<{ settings: FooterSettings | undefined; links: FooterLink[] }> => {
    if (!SUPABASE_READY) return { settings: undefined, links: [] };
    try {
      const [{ data: gs }, { data: fl }] = await Promise.all([
        anonClient.from("dglide_global_settings").select("value").eq("key", "footer").single(),
        anonClient.from("dglide_footer_links").select("id, column_index, column_heading, label, href, order_index").eq("is_visible", true).order("column_index").order("order_index"),
      ]);
      return {
        settings: gs?.value as FooterSettings | undefined,
        links: (fl ?? []) as FooterLink[],
      };
    } catch {
      return { settings: undefined, links: [] };
    }
  },
  ["layout-footer"],
  { revalidate: 300 }
);

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
