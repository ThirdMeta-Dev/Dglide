import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/it-service-management-itsm', destination: '/itsm', permanent: true },
      { source: '/it-service-management-itsm/', destination: '/itsm', permanent: true },
      { source: '/field-service-management-fsm', destination: '/fsm', permanent: true },
      { source: '/field-service-management-fsm/', destination: '/fsm', permanent: true },
      { source: '/support', destination: '/contact-us', permanent: true },
      { source: '/support/', destination: '/contact-us', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aovvrjsdsbzjlpbodasb.supabase.co",
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
