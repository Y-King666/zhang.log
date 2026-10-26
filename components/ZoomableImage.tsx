'use client';

import { useState } from 'react';
import ParallaxImage from './ParallaxImage';
import ImageLightbox from './ImageLightbox';
import { cn } from '@/lib/utils';

// 可点击放大的视差图：本体保留视差效果，点击后全屏查看原图（ImageLightbox）。
// className 同时作用于外层 button 与内部 ParallaxImage，调用方传 absolute inset-0 等定位类即可。
export default function ZoomableImage({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
  lightboxAlt,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  lightboxAlt?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`查看大图：${alt}`}
        className={cn('block cursor-zoom-in', className)}
      >
        <ParallaxImage src={src} alt={alt} className={className} sizes={sizes} priority={priority} />
      </button>
      <ImageLightbox open={open} onClose={() => setOpen(false)} src={src} alt={lightboxAlt ?? alt} />
    </>
  );
}
