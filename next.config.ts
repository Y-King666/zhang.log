import type { NextConfig } from 'next';
import createNextMdx from '@next/mdx';

const withMDX = createNextMdx();

const nextConfig: NextConfig = {
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
