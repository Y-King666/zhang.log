'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSectionScrollSpyResult {
  activeId: string;
  setActiveId: (id: string, lockToCurrentScroll?: boolean) => void;
}

// 元素在文档中的布局位置（offsetTop 链路累加），不受 transform 影响。
// 文章页没有 transform 时它与 rect 等价；但 openclaw 页正文外层 motion 容器带
// scaleY / rotateX 折叠动效，getBoundingClientRect() 返回的是被变换过、随滚动
// 剧烈变化的框，用它做滚动高亮会乱跳（实测：滚一点就从 01 跳到 04，再跳回 01）。
function layoutTop(element: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useSectionScrollSpy(ids: string[]): UseSectionScrollSpyResult {
  const [activeId, setActiveIdState] = useState(ids[0] || '');
  const activeIndexRef = useRef(0);
  const lockedIdRef = useRef<string | null>(null);
  const lockedScrollYRef = useRef(0);
  const idsKey = ids.join('|');

  useEffect(() => {
    if (ids.length === 0) {
      activeIndexRef.current = 0;
      setActiveIdState('');
      return;
    }

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element));
      if (sections.length === 0) return;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (lockedIdRef.current !== null) {
        if (Math.abs(window.scrollY - lockedScrollYRef.current) <= 8) {
          setActiveIdState(lockedIdRef.current);
          return;
        }
        lockedIdRef.current = null;
      }

      if (window.scrollY <= 8) {
        activeIndexRef.current = 0;
      } else if (atBottom) {
        activeIndexRef.current = sections.length - 1;
      } else {
        // 触发线取视口上方 35% 处：章节标题越过这条线才算进入该章节。
        // 用布局坐标按顺序取"最后一个已越线的章节"，因此高亮只会随滚动单调前进，
        // 不会因为动画把某个章节的框撑大而乱跳。
        const anchor = window.scrollY + window.innerHeight * 0.35;
        let index = 0;
        sections.forEach((section, sectionIndex) => {
          if (layoutTop(section) <= anchor) index = sectionIndex;
        });
        activeIndexRef.current = index;
      }

      setActiveIdState(sections[activeIndexRef.current].id);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [idsKey]);

  const setActiveId = useCallback((id: string, lockToCurrentScroll = false) => {
    const index = ids.indexOf(id);
    if (index !== -1) {
      activeIndexRef.current = index;
      if (lockToCurrentScroll) {
        lockedIdRef.current = id;
        lockedScrollYRef.current = window.scrollY;
      }
    }
    setActiveIdState(id);
  }, [ids, idsKey]);

  return { activeId, setActiveId };
}
