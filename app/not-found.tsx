import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { anonClient } from '@/lib/supabase/anon'
import Header, { type NavItemData, type HeaderSettings } from '@/components/layout/Header'
import Footer, { type FooterSettings, type FooterLink } from '@/components/layout/Footer'
import '@/styles/homepage-responsive.css'

const SUPABASE_READY = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const getHeaderData = unstable_cache(
  async (): Promise<{ navItems: NavItemData[]; settings: HeaderSettings | undefined }> => {
    if (!SUPABASE_READY) return { navItems: [], settings: undefined }
    try {
      const [{ data: nav }, { data: gs }] = await Promise.all([
        anonClient.from('dglide_navigation').select('id, parent_id, label, href, has_dropdown').eq('is_visible', true).order('order_index'),
        anonClient.from('dglide_global_settings').select('value').eq('key', 'header').single(),
      ])
      type NavRow = { id: string; parent_id: string | null; label: string; href: string; has_dropdown: boolean }
      const rows = (nav ?? []) as NavRow[]
      const navItems: NavItemData[] = rows
        .filter((r) => !r.parent_id)
        .map((r) => ({
          label: r.label,
          href: r.href,
          has_dropdown: r.has_dropdown,
          children: rows
            .filter((c) => c.parent_id === r.id)
            .map((c) => ({ label: c.label, href: c.href, has_dropdown: c.has_dropdown })),
        }))
      return { navItems, settings: gs?.value as HeaderSettings | undefined }
    } catch {
      return { navItems: [], settings: undefined }
    }
  },
  ['layout-header'],
  { revalidate: 300 }
)

const getFooterData = unstable_cache(
  async (): Promise<{ settings: FooterSettings | undefined; links: FooterLink[] }> => {
    if (!SUPABASE_READY) return { settings: undefined, links: [] }
    try {
      const [{ data: gs }, { data: fl }] = await Promise.all([
        anonClient.from('dglide_global_settings').select('value').eq('key', 'footer').single(),
        anonClient.from('dglide_footer_links').select('id, column_index, column_heading, label, href, order_index').eq('is_visible', true).order('column_index').order('order_index'),
      ])
      return {
        settings: gs?.value as FooterSettings | undefined,
        links: (fl ?? []) as FooterLink[],
      }
    } catch {
      return { settings: undefined, links: [] }
    }
  },
  ['layout-footer'],
  { revalidate: 300 }
)

export default async function NotFound() {
  const [{ navItems, settings }, { settings: footerSettings, links: footerLinks }] = await Promise.all([
    getHeaderData(),
    getFooterData(),
  ])

  return (
    <>
      <Header navItems={navItems} settings={settings} />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px',
          background: '#fff',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          textAlign: 'center',
          minHeight: '60vh',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#FF7F1C',
            marginBottom: '16px',
          }}
        >
          404 Error
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-sora), Sora, sans-serif',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#0D0D0D',
            margin: '0 0 20px',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '17px',
            lineHeight: '28px',
            color: '#6F7276',
            maxWidth: '440px',
            margin: '0 0 40px',
          }}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or no longer exists.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 28px',
              borderRadius: '999px',
              background: '#1C2BFF',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Go to Homepage
          </Link>
          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 28px',
              borderRadius: '999px',
              border: '1.5px solid #E5E5E5',
              color: '#333',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Browse Blogs
          </Link>
        </div>
      </main>
      <Footer settings={footerSettings} links={footerLinks} />
    </>
  )
}
