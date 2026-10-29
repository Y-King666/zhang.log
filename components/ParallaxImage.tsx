'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import ProgressiveImage from './ProgressiveImage';

// 图片滑移视差：图在自身容器内随滚动上下滑动，滚动经过时与文字形成前后错位。
// 外层容器需给足宽高（aspect-* 或高度），图内部按滑动量出血放大供裁剪。
export default function ParallaxImage({
  src,
  alt,
  className = '',
  distance = 56,
  sizes,
  blurDataURL,
  priority = false,
  fit = 'cover',
}: {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  sizes?: string;
  blurDataURL?: string;
  priority?: boolean;
  // cover：图放大出血、在框内滑动（有裁切）；contain：整张图完整显示、在页面上轻微漂移（无裁切）
  fit?: 'cover' | 'contain';
}) {
  const ref = useRef<HTMLDivElement>(null);
  // 小屏按比例收窄滑动量与出血：效果保留，但图片可见占比大幅提高
  const [isWide, setIsWide] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const slide = distance === 0 ? 0 : isWide ? distance : Math.max(12, Math.round(distance * 0.3));
  // 出血永远比滑移多 8px：滑到行程两端时图片边缘仍留在容器外，不会露出容器底色
  const bleed = slide + 8;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [slide, -slide]);

  // contain：整张图按原比例铺满槽位，再整体上下漂移，任何一帧都不会被裁掉。
  // 容器不能 overflow-hidden，否则漂移出去的那一半会被切掉；漂移量由周围留白容纳。
  if (fit === 'contain') {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),rgba(16,18,18,0.92)_70%)]',
          className
        )}
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <ProgressiveImage
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            blurDataURL={blurDataURL}
            priority={priority}
            className="object-contain"
          />
        </motion.div>
      </div>
    );
  }

  return (
    // 用 cn 合并：调用方传 absolute inset-0（详情页 hero）时会覆盖内置 relative，避免容器塌陷。
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),rgba(16,18,18,0.92)_70%)]',
        className
      )}
    >
      <motion.div style={{ y, top: -bleed, bottom: -bleed }} className="absolute inset-x-0">
        <ProgressiveImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          blurDataURL={blurDataURL}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
