'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSectionScrollSpyResult {
  activeId: string;
  setActiveId: (id: string, lockToCurrentScroll?: boolean) => void;
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
      const viewportCenter = window.innerHeight / 2;

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
        const containingIndex = sections.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= viewportCenter && rect.bottom > viewportCenter;
        });

        if (containingIndex !== -1) {
          activeIndexRef.current = containingIndex;
        } else {
          const precedingIndex = sections.reduce((index, section, sectionIndex) => {
            return section.getBoundingClientRect().top <= viewportCenter ? sectionIndex : index;
          }, 0);
          activeIndexRef.current = precedingIndex;
        }
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
