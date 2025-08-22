import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...weitere config options hier...
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
