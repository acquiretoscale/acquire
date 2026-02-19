import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  transpilePackages: ["next-mdx-remote", "react-quill-new"],
  async redirects() {
    return [
      { source: "/services", destination: "/due-diligence", permanent: true },
    ];
  },
};

export default nextConfig;
