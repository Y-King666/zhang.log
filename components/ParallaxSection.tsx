'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

// 贯穿视差容器：包住任意内容，滚动进入→离开时整体上下浮动。
// className 会透传到 motion.div，用于携带原本的布局样式。
export default function ParallaxSection({ children, className = '', distance = 48 }: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
