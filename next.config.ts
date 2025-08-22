import type { NextConfig } from "next";


const ContentSecurityPolicy =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' plausible.io; " +
  "script-src-elem 'self' 'unsafe-inline' plausible.io; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src * blob: data:; " +
  "media-src 'none'; " +
  "connect-src *; " +
  "font-src 'self'; " +
  "frame-src plausible.io;";

const nextConfig: NextConfig = {
  // ...weitere config options hier...
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
