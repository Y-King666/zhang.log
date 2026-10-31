'use client';

import { useEffect } from 'react';

/* 停止滚动后滚动条继续显示的时长（毫秒） */
const HIDE_DELAY = 700;
/* 小屏章节刻度停留更久，保证停手后仍有可点窗口 */
const RAIL_HIDE_DELAY = 2000;

/**
 * 让全局滚动条静默隐藏、滚动时显现。
 * 通过 html[data-scrolling] 驱动 globals.css 里的 scrollbar-color 切换；
 * 滚动条宽度保持不变，只切换颜色，因此显隐不会引起内容跳动。
 * 小屏章节刻度共用同一套显隐节奏，但它需要更长的可点窗口，
 * 因此额外挂一个停留更久的 html[data-scrolling-rail]。
 */
export default function AutoHideScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    let hideTimer = 0;
    let railTimer = 0;

    const reveal = () => {
      if (root.dataset.scrolling === undefined) root.dataset.scrolling = '';
      if (root.dataset.scrollingRail === undefined) root.dataset.scrollingRail = '';
      window.clearTimeout(hideTimer);
      window.clearTimeout(railTimer);
      hideTimer = window.setTimeout(() => {
        delete root.dataset.scrolling;
      }, HIDE_DELAY);
      railTimer = window.setTimeout(() => {
        delete root.dataset.scrollingRail;
      }, RAIL_HIDE_DELAY);
    };

    // 捕获阶段监听，才能收到内部滚动容器（代码块、侧栏列表等）的 scroll 事件
    window.addEventListener('scroll', reveal, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', reveal, { capture: true });
      window.clearTimeout(hideTimer);
      window.clearTimeout(railTimer);
      delete root.dataset.scrolling;
      delete root.dataset.scrollingRail;
    };
  }, []);

  return null;
}
