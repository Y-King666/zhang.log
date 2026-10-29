'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
  className?: string;
  wrapperClassName?: string;
}

export default function ProgressiveImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  blurDataURL,
  className,
  wrapperClassName,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const reveal = (image: HTMLImageElement) => {
    const finish = () => setLoaded(true);
    if (typeof image.decode === 'function') {
      image.decode().then(finish, finish);
    } else {
      finish();
    }
  };

  useEffect(() => {
    setLoaded(false);
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) reveal(image);
  }, [src]);

  return (
    <span
      aria-busy={!loaded}
      className={cn(
        'relative block overflow-hidden bg-surface',
        fill && 'h-full w-full',
        wrapperClassName
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-500 motion-reduce:transition-none',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
        style={
          blurDataURL
            ? { backgroundImage: `url("${blurDataURL}")` }
            : { backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.09), rgba(16,18,18,0.96) 72%)' }
        }
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-opacity duration-500 motion-reduce:animate-none',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
      />
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={cn(
          'transition-opacity duration-700 ease-out motion-reduce:transition-none',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={(event) => reveal(event.currentTarget)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/20 border-t-white/70 transition-opacity duration-300 motion-reduce:animate-none',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
      />
    </span>
  );
}
