'use client';

import { useEffect } from 'react';

/* 停止滚动后滚动条继续显示的时长（毫秒） */
const HIDE_DELAY = 700;

/**
 * 让全局滚动条静默隐藏、滚动时显现。
 * 通过 html[data-scrolling] 驱动 globals.css 里的 scrollbar-color 切换；
 * 滚动条宽度保持不变，只切换颜色，因此显隐不会引起内容跳动。
 */
export default function AutoHideScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    let hideTimer = 0;

    const reveal = () => {
      if (root.dataset.scrolling === undefined) root.dataset.scrolling = '';
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        delete root.dataset.scrolling;
      }, HIDE_DELAY);
    };

    // 捕获阶段监听，才能收到内部滚动容器（代码块、侧栏列表等）的 scroll 事件
    window.addEventListener('scroll', reveal, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', reveal, { capture: true });
      window.clearTimeout(hideTimer);
      delete root.dataset.scrolling;
    };
  }, []);

  return null;
}
