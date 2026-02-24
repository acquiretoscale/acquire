import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote", "react-quill-new"],
  async redirects() {
    return [
      { source: "/services", destination: "/due-diligence", permanent: true },
    ];
  },
  webpack(config, { dev }) {
    if (dev) {
      // Use polling instead of inotify/kqueue — fixes EMFILE errors on macOS
      // and ensures hot reload works reliably regardless of file descriptor limits.
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
