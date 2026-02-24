import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote", "react-quill-new"],
  async redirects() {
    return [
      { source: "/services", destination: "/due-diligence", permanent: true },
    ];
  },
};

export default nextConfig;
