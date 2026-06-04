import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  // Next.js 16 enables Turbopack by default. An empty turbopack config is enough
  // for this static data dashboard; no custom webpack plumbing is required.
  turbopack: {},
};

module.exports = nextConfig;
