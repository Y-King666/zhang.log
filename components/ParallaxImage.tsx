'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

// 图片滑移视差：图在自身容器内随滚动上下滑动，滚动经过时与文字形成前后错位。
// 外层容器需给足宽高（aspect-* 或高度），图内部放大 16% 供滑动裁剪。
export default function ParallaxImage({
  src,
  alt,
  className = '',
  distance = 56,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    // 用 cn 合并：调用方传 absolute inset-0（详情页 hero）时会覆盖内置 relative，避免容器塌陷。
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
