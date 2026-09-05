import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  // Keep production builds from overwriting assets used by the running dev server.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-build",
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
});

export default nextConfig;
