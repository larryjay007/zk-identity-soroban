import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Enable WASM
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Force browser-safe bb.js version
    config.resolve.alias = {
      ...config.resolve.alias,
      "@aztec/bb.js": "@aztec/bb.js/dest/browser",
    };

    // Prevent Node modules leaking
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
};

export default nextConfig;