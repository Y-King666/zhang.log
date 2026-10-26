'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
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

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-white/15 bg-background-dark/80 text-slate-300 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] transition-[opacity,transform,border-color,background-color,color] duration-300 ease-out hover:border-lobster/60 hover:bg-lobster/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <ArrowUp className="size-5" strokeWidth={2.5} />
    </button>
  );
}
