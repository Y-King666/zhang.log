'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

interface OpenClawCodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  variant?: 'command' | 'config';
}

export default function OpenClawCodeBlock({
  code,
  title,
  language = 'bash',
  variant = 'command',
}: OpenClawCodeBlockProps) {
  const { dict } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-2.5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-slate-500">
          <span className="material-symbols-outlined !text-sm text-lobster">{variant === 'config' ? 'data_object' : 'terminal'}</span>
          {title ?? language}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold text-slate-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster"
        >
          <span className={`material-symbols-outlined !text-sm ${copied ? 'text-emerald-400' : ''}`}>
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? dict['code.copied'] : dict['code.copy']}
        </button>
      </div>
      <pre className={`w-full min-w-0 max-w-full overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300 ${variant === 'config' ? 'max-h-[30rem] overflow-y-auto' : ''}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
