import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gunte-lab.kachiboshi.co.jp',
        port: '',
        pathname: '/img/**',
      },
    ],
  },

};

export default nextConfig;
