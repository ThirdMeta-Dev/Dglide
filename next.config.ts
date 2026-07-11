import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
