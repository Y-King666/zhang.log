import type { NextConfig } from 'next';
import createNextMdx from '@next/mdx';

const withMDX = createNextMdx();

const nextConfig: NextConfig = {
  // 允许局域网设备经开发机地址访问 dev 静态资源，否则 Next.js 默认阻止跨域
  allowedDevOrigins: ['10.2.6.220'],
  images: {
    minimumCacheTTL: 31536000,
    // 封面 src 带文件指纹查询串（?v=...），Next 16 默认拒绝本地图片的查询串，这里放开 /images/ 下的任意查询串
    localPatterns: [{ pathname: '/images/**' }],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
  },
};

export default withMDX(nextConfig);
