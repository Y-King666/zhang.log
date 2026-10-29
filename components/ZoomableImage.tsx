'use client';

import { useState } from 'react';
import ParallaxImage from './ParallaxImage';
import ImageLightbox from './ImageLightbox';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n-context';

// 可点击放大的视差图：本体保留视差效果，点击后全屏查看原图（ImageLightbox）。
// className 同时作用于外层 button 与内部 ParallaxImage，调用方传 absolute inset-0 等定位类即可。
export default function ZoomableImage({
  src,
  alt,
  className = '',
  sizes,
  blurDataURL,
  priority = false,
  lightboxAlt,
  distance,
  fit,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  blurDataURL?: string;
  priority?: boolean;
  lightboxAlt?: string;
  distance?: number;
  fit?: 'cover' | 'contain';
}) {
  const [open, setOpen] = useState(false);
  const { dict } = useI18n();
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${dict['ui.openImage']}: ${alt}`}
        className={cn('block cursor-zoom-in', className)}
      >
        <ParallaxImage
          src={src}
          alt={alt}
          className={className}
          sizes={sizes}
          blurDataURL={blurDataURL}
          priority={priority}
          distance={distance}
          fit={fit}
        />
      </button>
      <ImageLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        alt={lightboxAlt ?? alt}
        closeLabel={dict['ui.close']}
      />
    </>
  );
}
