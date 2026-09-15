'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* MDX 正文图：接本地资源地址即可展示。圆角边框与阴影直接设在 <img> 上，边框永远贴合图片。
   尺寸按图片宽高比分级：比例越宽（信息越密集、字越小）图放得越大，方正内容大且清晰则用更小尺寸。
   读 natural 尺寸后算出与容器匹配的宽高（SSR 未就绪时用下方 CSS 双上限兜底，不会露黑边）。
   caption 图注、点击 lightbox 放大；放大视窗内滚轮缩放图片（拦截页面滚动与 ctrl+滚轮页面缩放），
   ESC / 点击遮罩关闭。 */
const MAX_W = 720;
const MAX_SCALE = 5;

function computeSize(naturalW: number, naturalH: number, containerW: number) {
  const ratio = naturalW / naturalH;
  // 高度基准按比例分级：近方/4:3 → 360（小），中宽 → 440，超宽（信息密）→ 520（大）
  const baseH = ratio > 2 ? 520 : ratio > 1.45 ? 440 : 360;
  const maxW = Math.min(containerW * 0.96, MAX_W);
  let w = ratio * baseH;
  let h = baseH;
  if (w > maxW) { w = maxW; h = w / ratio; } // 宽超上限：降宽、高同比
  return { w: Math.round(w), h: Math.round(h) };
}

export default function Figure({
  src,
  alt = '',
  caption,
  className,
}: {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [dim, setDim] = useState<{ w: number; h: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const calc = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const containerW = figureRef.current?.clientWidth || MAX_W;
    setDim(computeSize(img.naturalWidth, img.naturalHeight, containerW));
  }, []);

  // 挂载时若图片已加载完成（SSR 预载）立即算；窗口 resize 时重算
  useEffect(() => {
    if (imgRef.current?.complete) calc();
    const onResize = () => calc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [calc]);

  // lightbox：ESC 关闭、锁定背景滚动、非被动 wheel 拦截 → 滚轮缩放图片（同时拦住滚动与 ctrl+滚轮页面缩放）
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
      setScale((s) => Math.min(MAX_SCALE, Math.max(1, +(s * factor).toFixed(3))));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    const el = lightboxRef.current;
    el?.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      el?.removeEventListener('wheel', onWheel);
    };
  }, [open]);

  const close = () => {
    setScale(1);
    setOpen(false);
  };

  return (
    <>
      <figure ref={figureRef} className={cn('my-10 flex flex-col items-center', className)}>
        {/* 按钮仅作透明点击 / 悬浮层，无边框背景；视觉样式全在 img 上，边框永远贴合图片 */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={alt || '放大查看图片'}
          className="block w-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={calc}
            className="mx-auto block h-auto w-auto max-h-[480px] max-w-[min(100%,680px)] rounded-3xl border border-white/10 shadow-2xl"
            style={dim ? { width: dim.w, height: dim.h, maxWidth: dim.w, maxHeight: dim.h } : undefined}
          />
        </button>
        {caption && (
          <figcaption className="mt-3 text-center text-xs italic text-slate-500">{caption}</figcaption>
        )}
      </figure>

      {open && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background-dark/90 p-6 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="关闭"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={close}
          >
            <X className="size-5" />
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-3xl bg-background-dark shadow-2xl transition-transform duration-150 will-change-transform"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      )}
    </>
  );
}
