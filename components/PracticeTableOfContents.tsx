'use client';

import { useEffect, useMemo, useState } from 'react';
import { getLenis } from './SmoothScroll';
import { useSectionScrollSpy } from './useSectionScrollSpy';

interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

interface TocGroup {
  id: string;
  title: string;
  children: TocItem[];
}

export default function PracticeTableOfContents({
  title,
  items: providedItems,
  mobileOnly = false,
}: {
  title: string;
  items?: TocItem[];
  mobileOnly?: boolean;
}) {
  const [discoveredItems, setDiscoveredItems] = useState<TocItem[]>([]);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const items = providedItems ?? discoveredItems;
  const { activeId, setActiveId } = useSectionScrollSpy(items.map((item) => item.id));

  // 按 h2 分组，h3 归入临近的 h2；无 h2 时 h3 自成一组，用于 hover 详情面板的子项
  const groups = useMemo(() => {
    const result: TocGroup[] = [];
    for (const item of items) {
      if (item.level === 2) {
        result.push({ id: item.id, title: item.label, children: [] });
      } else {
        const last = result[result.length - 1];
        if (last) last.children.push(item);
        else result.push({ id: item.id, title: item.label, children: [] });
      }
    }
    return result;
  }, [items]);

  // activeId 所在的分组索引，用于小屏横杠高亮
  const activeGroupIndex = useMemo(() => {
    const index = groups.findIndex((g) => g.id === activeId || g.children.some((c) => c.id === activeId));
    return index === -1 ? 0 : index;
  }, [groups, activeId]);

  // 仅 h2 参与编号；h3 子标题不编号（字号更小，见渲染处）
  const numberedItems = useMemo(() => {
    let h2Count = 0;
    return items.map((item) => ({ ...item, number: item.level === 2 ? ++h2Count : null }));
  }, [items]);

  useEffect(() => {
    if (providedItems) return;

    const content = document.querySelector('[data-project-content]');
    if (!content) return;

    const headings = Array.from(content.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'));
    const nextItems = headings.map((heading) => ({
      id: heading.id,
      label: heading.textContent?.trim() || heading.id,
      level: heading.tagName === 'H3' ? 3 : 2,
    })) as TocItem[];
    setDiscoveredItems(nextItems);
  }, [providedItems]);

  const scrollToHeading = (item: TocItem) => {
    const heading = document.getElementById(item.id);
    if (!heading) return;

    const topOffset = 144;
    const targetTop = window.scrollY + heading.getBoundingClientRect().top - topOffset;
    window.history.replaceState(null, '', `#${item.id}`);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(Math.max(0, targetTop), {
        immediate: true,
        force: true,
        programmatic: true,
        lock: true,
      });
    } else {
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
    }
    setActiveId(item.id, true);
  };

  if (items.length === 0) return null;

  return (
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-50 lg:static lg:translate-y-0 lg:z-auto">
      {/* 小屏：右侧波形刻度，hover 显示章节详情 */}
      <div className="flex flex-col items-end gap-0.5 lg:hidden" onMouseLeave={() => setHoveredGroup(null)}>
        {groups.map((group, index) => (
          <div key={group.id} className="relative flex justify-end" onMouseEnter={() => setHoveredGroup(index)}>
            <button
              type="button"
              onClick={() => scrollToHeading({ id: group.id, label: group.title, level: 2 })}
              aria-label={group.title}
              className="group relative z-20 flex h-5 items-center justify-end px-0.5"
            >
              <span
                className={`block rounded-full transition-all duration-300 ease-out ${
                  index === activeGroupIndex
                    ? 'bg-lobster h-0.5 w-7 shadow-[0_0_8px_rgba(255,69,0,0.65)]'
                    : 'bg-white/25 h-px w-4 group-hover:bg-white/65'
                }`}
                style={hoveredGroup === null ? undefined : {
                  width: `${Math.max(16, 30 - Math.min(3, Math.abs(index - hoveredGroup)) * 4)}px`,
                  height: index === hoveredGroup ? '3px' : '2px',
                  backgroundColor: index === hoveredGroup ? 'rgb(255 69 0)' : undefined,
                  boxShadow: index === hoveredGroup ? '0 0 9px rgba(255, 69, 0, 0.7)' : undefined,
                }}
              />
            </button>
            {hoveredGroup === index && (
              <div className="absolute right-[calc(100%+0.75rem)] top-1/2 z-10 w-max max-w-[16rem] -translate-y-1/2 rounded-2xl border border-white/15 bg-zinc-800/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-2 duration-200">
                <h4 className="text-white font-bold text-sm mb-2.5">{group.title}</h4>
                {group.children.length > 0 && (
                  <ul className="space-y-1.5">
                    {group.children.map((child) => (
                      <li key={child.id} className="flex items-start gap-2 text-slate-200 text-[11px] leading-snug">
                        <span className="mt-0.5 size-1.5 rounded-full bg-lobster/90"></span>
                        {child.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 大屏：右侧 sticky 完整目录 */}
      {!mobileOnly && (
        <section className="hidden lg:block edge-lit-card rounded-3xl p-6 backdrop-blur-md">
        <span className="text-white font-bold">{title}</span>
        <nav className="mt-5 space-y-1" aria-label={title}>
          {numberedItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(item);
              }}
              className={`group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors ${
                activeId === item.id ? 'bg-lobster/10 text-lobster' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
              } ${item.level === 3 ? 'ml-4' : ''}`}
            >
              {item.level === 2 ? (
                <span className="mt-0.5 min-w-5 font-mono text-[10px] opacity-60">{String(item.number).padStart(2, '0')}</span>
              ) : (
                <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-lobster/75" aria-hidden="true"></span>
              )}
              <span className={`${item.level === 3 ? 'text-xs text-slate-400' : 'text-sm'} font-medium leading-snug`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        </section>
      )}
    </div>
  );
}
