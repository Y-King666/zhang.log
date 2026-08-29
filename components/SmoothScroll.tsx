'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// 模块级单例：规避 Strict Mode 双挂载把 Lenis 滚动监听清掉的问题。
// 根布局常驻、不会卸载，因此不销毁是安全的；监听器一直挂在 window 上。
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export default function SmoothScroll() {
  useEffect(() => {
    if (!lenis) {
      lenis = new Lenis({
        lerp: 0.05,
        stopInertiaOnNavigate: true,
        respectReducedMotion: false,
      });
    }

    let raf = 0;
    const loop = (time: number) => {
      lenis!.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
