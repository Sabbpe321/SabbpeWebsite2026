import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/compliance', destination: '/about', permanent: false },
      { source: '/security', destination: '/about', permanent: false },
      {
        source: '/products/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
