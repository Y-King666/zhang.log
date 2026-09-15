import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';

// 贯穿式视差：元素随滚动（进入视口→离开）整体 y 从 +distance 到 -distance，
// 相对普通滚动呈现"减速上浮"感，与 hero 的滚动视差一致
export function useParallax(distance = 48) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y, scrollYProgress };
}
