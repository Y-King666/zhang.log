'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  BookOpenCheck,
  Brain,
  Fingerprint,
  HeartHandshake,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { getLenis } from './SmoothScroll';

interface WorkspaceFileItem {
  file: string;
  role: string;
  description: string;
}

const FILE_ICONS = {
  'IDENTITY.md': Fingerprint,
  'SOUL.md': HeartHandshake,
  'AGENTS.md': BookOpenCheck,
  'USER.md': UserRound,
  'MEMORY.md': Brain,
  'TOOLS.md': Wrench,
} as const;

const DESKTOP_POSITIONS: Record<string, string> = {
  'IDENTITY.md': 'left-[15%] top-[16%]',
  'SOUL.md': 'left-1/2 top-[12.5%]',
  'AGENTS.md': 'left-[85%] top-[16%]',
  'USER.md': 'left-[12.5%] top-[75%]',
  'MEMORY.md': 'left-1/2 top-[89%]',
  'TOOLS.md': 'left-[87.5%] top-[75%]',
};

const DESKTOP_PATHS = [
  'M300 270 C230 210 170 150 90 90',
  'M300 270 C300 200 300 130 300 70',
  'M300 270 C370 210 430 150 510 90',
  'M300 270 C200 310 135 365 75 420',
  'M300 270 C300 350 300 430 300 500',
  'M300 270 C400 310 465 365 525 420',
];

export default function WorkspaceFileMap({
  items,
  lang,
  title,
  description,
  contents,
}: {
  items: WorkspaceFileItem[];
  lang: string;
  title: string;
  description: string;
  contents: Record<string, string>;
}) {
  const [selected, setSelected] = useState<WorkspaceFileItem | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const isEnglish = lang === 'en';

  const close = () => {
    setSelected(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const lenis = getLenis();
    const shouldRestartLenis = Boolean(lenis && !lenis.isStopped);
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (shouldRestartLenis) lenis?.start();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  const openFile = (item: WorkspaceFileItem, button: HTMLButtonElement) => {
    lastTriggerRef.current = button;
    setSelected(item);
  };

  const renderNode = (item: WorkspaceFileItem, compact = false) => {
    const Icon = FILE_ICONS[item.file as keyof typeof FILE_ICONS] ?? BookOpenCheck;
    return (
      <button
        key={item.file}
        type="button"
        data-workspace-node={item.file}
        onClick={(event) => openFile(item, event.currentTarget)}
        aria-haspopup="dialog"
        className={`group flex flex-col items-center justify-center rounded-[14px] border border-white/10 bg-[#0b0b0b]/78 px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-200 hover:border-white/25 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper ${
          compact ? 'min-h-[82px] w-full' : 'w-[112px]'
        }`}
      >
        <span className="flex size-8 items-center justify-center rounded-[10px] bg-white/[0.045] text-paper">
          <Icon className="size-4" strokeWidth={1.6} />
        </span>
        <span className="mt-2 break-all font-mono text-[10px] leading-4 text-paper">{item.file}</span>
        <span className="mt-1 text-[9px] leading-4 text-fog">{item.role}</span>
      </button>
    );
  };

  return (
    <div className="min-w-0">
      <h3 className="text-lg font-medium text-paper">{title}</h3>
      <p className="mt-3 text-xs leading-6 text-fog">{description}</p>

      <div className="relative mt-5 hidden h-[560px] overflow-hidden rounded-2xl bg-white/[0.012] md:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,134,145,0.13),transparent_56%)]" />
        <svg
          aria-hidden="true"
          viewBox="0 0 600 560"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {DESKTOP_PATHS.map((path) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="rgba(241,241,238,0.2)"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-[48%] z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex size-[132px] flex-col items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/92 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_70px_-30px_rgba(128,134,145,0.55)] backdrop-blur-xl">
            <div className="absolute inset-2 rounded-full border border-white/[0.06]" />
            <Image
              src="/images/openclaw/workspace-avatar.jpg"
              alt={isEnglish ? 'Jarvis' : '贾维斯'}
              width={58}
              height={55}
              className="relative size-[56px] rounded-full border border-white/15 object-cover"
            />
            <span className="relative mt-1.5 text-sm font-medium text-paper">
              {isEnglish ? 'Jarvis' : '贾维斯'}
            </span>
            <span className="relative mt-0.5 font-mono text-[8px] tracking-[0.14em] text-fog">
              MAIN AGENT
            </span>
          </div>
        </div>

        {items.map((item) => (
          <div
            key={item.file}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${DESKTOP_POSITIONS[item.file] ?? ''}`}
          >
            {renderNode(item)}
          </div>
        ))}
      </div>

      <div className="relative mt-5 h-[480px] overflow-hidden rounded-2xl bg-white/[0.012] p-4 md:hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 320 480"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M160 78 V155 H80 M160 155 H240 M160 155 V263 H80 M160 263 H240 M160 263 V371 H80 M160 371 H240"
            fill="none"
            stroke="rgba(241,241,238,0.19)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
        </svg>

        <div className="relative z-10 mx-auto flex size-[118px] flex-col items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/92 text-center backdrop-blur-xl">
          <Image
            src="/images/openclaw/workspace-avatar.jpg"
            alt={isEnglish ? 'Jarvis' : '贾维斯'}
            width={50}
            height={47}
            className="size-12 rounded-full border border-white/15 object-cover"
          />
          <span className="mt-1 text-sm font-medium text-paper">{isEnglish ? 'Jarvis' : '贾维斯'}</span>
          <span className="font-mono text-[8px] tracking-[0.12em] text-fog">MAIN AGENT</span>
        </div>

        <div className="absolute inset-x-4 top-[118px] z-10 grid grid-cols-2 gap-x-3 gap-y-[34px]">
          {items.map((item) => renderNode(item, true))}
        </div>
      </div>

      {selected &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-0 backdrop-blur-md sm:items-center sm:p-6"
            role="presentation"
            onClick={close}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="workspace-file-dialog-title"
              data-lenis-prevent
              className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-2xl border border-white/12 bg-[#0b0b0b]/96 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.72)] sm:rounded-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label={isEnglish ? 'Close file details' : '关闭文件详情'}
                className="absolute right-4 top-4 flex size-9 items-center justify-center text-fog transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3 pr-10">
                {(() => {
                  const Icon = FILE_ICONS[selected.file as keyof typeof FILE_ICONS] ?? BookOpenCheck;
                  return (
                    <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-paper">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                  );
                })()}
                <div>
                  <h3 id="workspace-file-dialog-title" className="font-mono text-base text-paper">
                    {selected.file}
                  </h3>
                  <p className="mt-1 text-xs text-fog">{selected.role}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-rule pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[10px] tracking-[0.1em] text-signal">
                    {isEnglish ? 'Source document' : '文件原文'}
                  </p>
                  {selected.file === 'USER.md' && (
                    <span className="text-[10px] text-fog">
                      {isEnglish ? 'Private identifiers redacted' : '敏感标识已脱敏'}
                    </span>
                  )}
                </div>
                <pre className="mt-3 whitespace-pre-wrap break-words bg-black/35 p-4 font-mono text-[11px] leading-6 text-paper/80">
                  {contents[selected.file] ?? selected.description}
                </pre>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
