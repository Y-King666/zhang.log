'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

interface OpenClawCodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  variant?: 'command' | 'config';
  frameClassName?: string;
}

export default function OpenClawCodeBlock({
  code,
  title,
  language = 'bash',
  variant = 'command',
  frameClassName,
}: OpenClawCodeBlockProps) {
  const { dict } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={`flex w-full min-w-0 max-w-full flex-col overflow-hidden border border-rule bg-surface ${frameClassName ?? ''}`}>
      <div className="flex shrink-0 items-center justify-between border-b border-rule bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-fog">
          <span className="material-symbols-outlined !text-sm text-signal">{variant === 'config' ? 'data_object' : 'terminal'}</span>
          {title ?? language}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-[10px] text-fog transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
        >
          <span className={`material-symbols-outlined !text-sm ${copied ? 'text-emerald-400' : ''}`}>
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? dict['code.copied'] : dict['code.copy']}
        </button>
      </div>
      <pre className={`w-full min-w-0 max-w-full overflow-x-auto p-4 font-mono text-xs leading-relaxed text-paper/85 ${
        frameClassName
          ? 'min-h-0 flex-1 overflow-y-auto'
          : variant === 'config'
            ? 'max-h-[30rem] overflow-y-auto'
            : ''
      }`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
