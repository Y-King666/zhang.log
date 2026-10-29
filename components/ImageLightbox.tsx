'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// 可缩放/拖拽的大图查看层：portal 抛到 body，避免被父级 transform 影响 fixed 定位。
// 滚轮或双指缩放（1-5 倍），放大后可拖拽平移；Esc 或点击背景关闭；打开时锁定页面滚动。
type Point = { x: number; y: number };

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZERO_OFFSET = { x: 0, y: 0 };

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 1000) / 1000));
}

function midpoint(first: Point, second: Point): Point {
  return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
}

function pointDistance(first: Point, second: Point) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

export default function ImageLightbox({
  open,
  onClose,
  src,
  alt,
  closeLabel = '关闭',
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  closeLabel?: string;
}) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const scaleRef = useRef(1);
  const offsetRef = useRef(ZERO_OFFSET);
  const pointers = useRef(new Map<number, Point>());
  const drag = useRef<{ pointerId: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const pinch = useRef<{
    startDistance: number;
    startScale: number;
    startOffset: Point;
    startCenter: Point;
    imageCenter: Point;
  } | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const updateTransform = (nextScale: number, nextOffset: Point) => {
    const boundedScale = clampScale(nextScale);
    const boundedOffset = boundedScale === MIN_SCALE ? ZERO_OFFSET : nextOffset;
    scaleRef.current = boundedScale;
    offsetRef.current = boundedOffset;
    setScale(boundedScale);
    setOffset(boundedOffset);
  };

  const close = () => {
    pointers.current.clear();
    pinch.current = null;
    drag.current = null;
    updateTransform(MIN_SCALE, ZERO_OFFSET);
    onClose();
  };

  const getImageCenter = (): Point => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: rect.left + rect.width / 2 - offsetRef.current.x,
      y: rect.top + rect.height / 2 - offsetRef.current.y,
    };
  };

  const startPinch = () => {
    const [first, second] = [...pointers.current.values()];
    const startDistance = pointDistance(first, second);
    if (startDistance < 1) return;
    pinch.current = {
      startDistance,
      startScale: scaleRef.current,
      startOffset: offsetRef.current,
      startCenter: midpoint(first, second),
      imageCenter: getImageCenter(),
    };
    drag.current = null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    event.currentTarget.setPointerCapture?.(event.pointerId);

    if (pointers.current.size >= 2) {
      startPinch();
      return;
    }

    if (scaleRef.current > MIN_SCALE) {
      drag.current = {
        pointerId: event.pointerId,
        sx: event.clientX,
        sy: event.clientY,
        ox: offsetRef.current.x,
        oy: offsetRef.current.y,
      };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size >= 2 && pinch.current) {
      const [first, second] = [...pointers.current.values()];
      const currentCenter = midpoint(first, second);
      const currentDistance = pointDistance(first, second);
      const gesture = pinch.current;
      const nextScale = clampScale(gesture.startScale * (currentDistance / gesture.startDistance));

      if (nextScale === MIN_SCALE) {
        updateTransform(MIN_SCALE, ZERO_OFFSET);
        return;
      }

      const ratio = nextScale / gesture.startScale;
      updateTransform(nextScale, {
        x: currentCenter.x - gesture.imageCenter.x - ratio * (gesture.startCenter.x - gesture.imageCenter.x - gesture.startOffset.x),
        y: currentCenter.y - gesture.imageCenter.y - ratio * (gesture.startCenter.y - gesture.imageCenter.y - gesture.startOffset.y),
      });
      return;
    }

    const currentDrag = drag.current;
    if (!currentDrag || currentDrag.pointerId !== event.pointerId) return;
    updateTransform(scaleRef.current, {
      x: currentDrag.ox + event.clientX - currentDrag.sx,
      y: currentDrag.oy + event.clientY - currentDrag.sy,
    });
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    pinch.current = null;
    const remaining = [...pointers.current.entries()][0];
    drag.current =
      remaining && scaleRef.current > MIN_SCALE
        ? {
            pointerId: remaining[0],
            sx: remaining[1].x,
            sy: remaining[1].y,
            ox: offsetRef.current.x,
            oy: offsetRef.current.y,
          }
        : null;
  };

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
      updateTransform(scaleRef.current * factor, offsetRef.current);
    };
    const element = backdropRef.current;
    element?.addEventListener('wheel', onWheel, { passive: false });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      element?.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex touch-none items-center justify-center overflow-hidden overscroll-none bg-black/85 p-4 backdrop-blur-md md:p-8"
      onClick={close}
    >
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal md:right-8 md:top-8"
        aria-label={closeLabel}
      >
        <span aria-hidden="true">×</span>
      </button>
      <div
        className="relative flex h-full min-h-0 w-full min-w-0 touch-none select-none items-center justify-center overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute size-9 animate-spin rounded-full border-2 border-white/20 border-t-white/80 transition-opacity duration-300 motion-reduce:animate-none ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={`max-h-full max-w-full cursor-grab rounded-xl object-contain shadow-[0_24px_100px_rgba(0,0,0,0.7)] transition-opacity duration-500 active:cursor-grabbing motion-reduce:transition-none ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
          }}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </div>,
    document.body
  );
}
