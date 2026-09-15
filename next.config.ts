import type { NextConfig } from 'next';
import createNextMdx from '@next/mdx';

const withMDX = createNextMdx();

const nextConfig: NextConfig = {
  // 允许局域网设备（如移动端 10.2.207.60）经开发机地址访问 dev 静态资源，否则 Next.js 默认阻止跨域
  allowedDevOrigins: ['10.2.26.232'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
  },
};

export default withMDX(nextConfig);
