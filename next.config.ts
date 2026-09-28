import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cap how long CDNs may serve stale ISR pages (stale-while-revalidate window).
  // Blog pages revalidate every 300s; this bounds worst-case staleness to ~10 min
  // instead of the Next.js default of one year. Origin regeneration cadence (and
  // therefore Supabase query/egress volume) is unchanged.
  expireTime: 600,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dglide.com' }],
        destination: 'https://www.dglide.com/:path*',
        permanent: true,
      },
      { source: '/posts', destination: '/blogs', permanent: true },
      { source: '/posts/', destination: '/blogs', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/', destination: '/blogs', permanent: true },
      { source: '/blog/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap/', destination: '/sitemap.xml', permanent: true },
      { source: '/sitema', destination: '/sitemap.xml', permanent: true },
      { source: '/sitema/', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/itsm', destination: '/it-service-management-itsm', permanent: true },
      { source: '/itsm/', destination: '/it-service-management-itsm', permanent: true },
      { source: '/fsm', destination: '/field-service-management-fsm', permanent: true },
      { source: '/fsm/', destination: '/field-service-management-fsm', permanent: true },
      {
        source: '/ticket-management',
        destination: '/blogs/ticket-management-software-for-operations-teams',
        permanent: true,
      },
      {
        source: '/ticket-management/',
        destination: '/blogs/ticket-management-software-for-operations-teams',
        permanent: true,
      },
      {
        source: '/no-code-low-code-future-business-applications',
        destination: '/blogs/no-code-low-code-future-business-applications',
        permanent: true,
      },
      {
        source: '/no-code-low-code-future-business-applications/',
        destination: '/blogs/no-code-low-code-future-business-applications',
        permanent: true,
      },
      { source: '/customer-stories', destination: '/case-studies', permanent: true },
      { source: '/customer-stories/', destination: '/case-studies', permanent: true },
      { source: '/logos/logo-1.png', destination: '/logos/power2u.png', permanent: true },
      { source: '/logos/logo-2.png', destination: '/logos/armadillo.png', permanent: true },
      { source: '/logos/logo-3.png', destination: '/logos/lead-controls.png', permanent: true },
      { source: '/logos/logo-4.png', destination: '/logos/clarion.png', permanent: true },
      { source: '/logos/logo-5.png', destination: '/logos/indo-tech.png', permanent: true },
      { source: '/logos/client-jsw.svg', destination: '/logos/jsw.svg', permanent: true },
      { source: '/logos/client-rolcon.svg', destination: '/logos/rolcon.svg', permanent: true },
      { source: '/logos/client-sharplaser.svg', destination: '/logos/sharp-laser-component.svg', permanent: true },
      { source: '/logos/client-tgt.svg', destination: '/logos/tgt.svg', permanent: true },
    ]
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yytdzxrryboagezbjiqa.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/avatar/**",
      },
    ],
  },
};

export default nextConfig;
