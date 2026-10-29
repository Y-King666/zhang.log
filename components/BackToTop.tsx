'use client';

import { useEffect, useState } from 'react';
import { ArrowUpToLine } from 'lucide-react';
import { getLenis } from './SmoothScroll';

// 回到顶部：滚过一屏才出现，点击走 Lenis 平滑滚动；开启减弱动效时直接跳，不播动画。
export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true, programmatic: true, lock: true });
      else window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    if (lenis) lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 38rem = 正文容器半宽 35rem + 8px 间距 + 40px 按钮宽度；窄屏时由 max() 收回视口内。
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-7 right-5 z-40 flex size-10 items-center justify-center rounded-full border border-paper/35 bg-surface/90 text-paper/70 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[opacity,transform,color,border-color,background-color] duration-300 ease-out hover:border-paper/60 hover:bg-surface hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none sm:right-6 lg:right-[max(1rem,calc(50%_-_38rem))] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <ArrowUpToLine className="size-[18px]" strokeWidth={2.25} />
    </button>
  );
}
