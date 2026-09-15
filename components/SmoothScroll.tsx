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
        anchors: true,
        respectReducedMotion: false,
        /* 允许嵌套滚动元素原生滚动，并在滚动到其边界时溢出给 Lenis 平滑滚页面（短代码块/容器顶底溢出都交给页面） */
        allowNestedScroll: true,
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
