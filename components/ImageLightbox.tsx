'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// 可缩放/拖拽的大图查看层：portal 抛到 body，避免被父级 transform 影响 fixed 定位。
// 滚轮缩放（1-5 倍），放大后可拖拽平移；Esc 或点击背景关闭；打开时锁定页面滚动。
export default function ImageLightbox({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    onClose();
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (scale <= 1) return;
    drag.current = { sx: event.clientX, sy: event.clientY, ox: offset.x, oy: offset.y };
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.sx;
    const dy = event.clientY - drag.current.sy;
    setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
  };

  const handlePointerUp = () => {
    drag.current = null;
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
      setScale((current) => Math.min(5, Math.max(1, +(current * factor).toFixed(3))));
    };
    const element = backdropRef.current;
    element?.addEventListener('wheel', onWheel, { passive: false });
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      element?.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (scale <= 1 && (offset.x !== 0 || offset.y !== 0)) {
      setOffset({ x: 0, y: 0 });
    }
  }, [scale, offset]);

  if (!open) return null;

  return createPortal(
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-md md:p-8"
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster md:right-8 md:top-8"
        aria-label="关闭"
      >
        <span aria-hidden="true">×</span>
      </button>
      <img
        src={src}
        alt={alt}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="max-h-full max-w-full cursor-grab select-none touch-none rounded-xl object-contain shadow-[0_24px_100px_rgba(0,0,0,0.7)] active:cursor-grabbing"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body
  );
}
