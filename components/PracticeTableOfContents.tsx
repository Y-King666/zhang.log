'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { getLenis } from './SmoothScroll';
import { useSectionScrollSpy } from './useSectionScrollSpy';
import { useI18n } from '@/lib/i18n-context';

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
  desktopOnly = false,
}: {
  title: string;
  items?: TocItem[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}) {
  const [discoveredItems, setDiscoveredItems] = useState<TocItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { dict } = useI18n();
  const drawerCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // portal 只能在客户端挂载后创建
  useEffect(() => setMounted(true), []);

  // 底部抽屉：Esc 关闭，卸载时清掉延迟关闭的 timer
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  useEffect(() => () => {
    if (drawerCloseTimer.current) clearTimeout(drawerCloseTimer.current);
  }, []);

  const openDrawer = () => {
    if (drawerCloseTimer.current) clearTimeout(drawerCloseTimer.current);
    setDrawerOpen(true);
  };

  // 抽屉里选中一项：先跳章节，再收起抽屉（避免遮罩挡住刚跳到的内容）
  const selectInDrawer = (item: TocItem) => {
    scrollToHeading(item);
    closeDrawer();
  };

  const closeDrawer = () => {
    if (drawerCloseTimer.current) clearTimeout(drawerCloseTimer.current);
    drawerCloseTimer.current = setTimeout(() => setDrawerOpen(false), 240);
  };

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
    <>
      {/* 小屏：右侧章节刻度作为单一目录入口，点击任意一根线都拉起完整目录抽屉。
          同样走 portal 挂到 body：openclaw 页的 motion / parallax 祖先带 transform，
          会成为 fixed 元素的包含块，把刻度钉在文档中段而永远进不了视口。 */}
      {!desktopOnly && mounted && createPortal(
      <button
        type="button"
        onClick={openDrawer}
        aria-label={title}
        aria-haspopup="dialog"
        aria-expanded={drawerOpen}
        className="toc-rail group fixed right-1 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-2 p-2 lg:hidden"
      >
        {groups.map((group, index) => (
          <span
            key={group.id}
            className={`block h-px w-5 rounded-full transition-colors duration-300 ${
              index === activeGroupIndex
                ? 'bg-signal/70 group-hover:bg-signal/85'
                : 'bg-paper/25 group-hover:bg-paper/40'
            }`}
          />
        ))}
      </button>, document.body)}

      {/* 小屏：点刻度后从底部拉起的完整目录，可连续跳转。
          走 portal 挂到 body：祖先元素一旦带 transform（openclaw 页的 motion 容器、
          波形容器本身都有），就会成为 fixed 元素的包含块，抽屉会被压扁或跑到页尾。 */}
      {!desktopOnly && mounted && createPortal(
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              key="toc-backdrop"
              aria-label={dict['ui.closeNavigation']}
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="toc-sheet"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto overscroll-contain rounded-t-2xl border-t border-rule bg-surface/98 px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 backdrop-blur-xl lg:hidden"
            >
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-paper">{title}</span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label={dict['ui.close']}
                  className="flex size-8 items-center justify-center text-fog transition-colors hover:text-paper"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="space-y-4 pb-2" aria-label={title}>
                {groups.map((group, groupIndex) => (
                  <div key={group.id}>
                    <button
                      type="button"
                      onClick={() => selectInDrawer({ id: group.id, label: group.title, level: 2 })}
                      className={`flex w-full items-center gap-3 border-t border-rule px-1 py-3 text-left text-sm transition-colors ${
                        groupIndex === activeGroupIndex
                          ? 'text-paper'
                          : 'text-fog'
                      }`}
                    >
                      <span className="min-w-5 font-mono text-[10px] opacity-60">
                        {String(numberedItems.find((entry) => entry.id === group.id)?.number ?? groupIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">{group.title}</span>
                    </button>
                    {group.children.length > 0 && (
                      <ul className="mt-0.5 space-y-0.5 pl-8">
                        {group.children.map((child) => (
                          <li key={child.id}>
                            <button
                              type="button"
                              onClick={() => selectInDrawer(child)}
                              className={`flex w-full items-start gap-2.5 px-1 py-2.5 text-left text-xs leading-snug transition-colors ${
                                activeId === child.id ? 'text-paper' : 'text-fog'
                              }`}
                            >
                              <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-signal/75" aria-hidden="true" />
                              <span>{child.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body)}

      {/* 大屏：右侧 sticky 完整目录。
          小屏刻度/抽屉只在非 desktopOnly 实例里渲染：openclaw 页同时挂了移动专用实例和
          侧栏实例，两个实例都会 portal 出刻度条，挂在 body 上就会完全重叠成两份 DOM。 */}
      {!mobileOnly && (
        <section className="hidden border-t border-rule pt-5 lg:block">
        <span className="text-xs text-fog">{title}</span>
        <nav className="mt-3" aria-label={title}>
          {numberedItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(item);
              }}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={`group relative -mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors ${
                activeId === item.id
                  ? 'bg-paper/[0.035] text-paper'
                  : 'text-fog hover:bg-paper/[0.025] hover:text-paper'
              } ${item.level === 3 ? 'ml-4' : ''}`}
            >
              <span
                className={`absolute inset-y-2 left-0 w-0.5 rounded-full transition-colors ${
                  activeId === item.id ? 'bg-signal' : 'bg-transparent'
                }`}
                aria-hidden="true"
              />
              {item.level === 2 ? (
                <span
                  className={`mt-0.5 min-w-5 font-mono text-[10px] ${
                    activeId === item.id ? 'text-signal opacity-100' : 'opacity-60'
                  }`}
                >
                  {String(item.number).padStart(2, '0')}
                </span>
              ) : (
                <span
                  className={`mt-[5px] size-1.5 shrink-0 rounded-full ${
                    activeId === item.id ? 'bg-signal' : 'bg-fog/40'
                  }`}
                  aria-hidden="true"
                ></span>
              )}
              <span
                className={`${item.level === 3 ? 'text-xs' : 'text-sm'} leading-snug ${
                  activeId === item.id
                    ? 'font-semibold'
                    : `font-medium ${item.level === 3 ? 'text-slate-400' : ''}`
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        </section>
      )}
    </>
  );
}
