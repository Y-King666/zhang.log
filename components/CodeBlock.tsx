'use client';

import { isValidElement, useLayoutEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

/* 语言 class（如 language-go）→ 展示名 */
const LANGUAGE_MAP: Record<string, string> = {
  ts: 'TypeScript',
  tsx: 'TSX',
  js: 'JavaScript',
  jsx: 'JSX',
  py: 'Python',
  go: 'Go',
  sh: 'Shell',
  bash: 'Bash',
  json: 'JSON',
  css: 'CSS',
  md: 'MDX',
};

/* 尽力在渲染期提取代码文本与语言，作为初始值（children 为可遍历的具体元素时生效）。
   客户端导航时 MDX 的 <code> 可能以 React.lazy 形式序列化，渲染期无法解析，由此处返回值兜底为空，再由 useLayoutEffect 从 DOM 纠正。 */
function getCodeData(children: React.ReactNode): { text: string; language: string } {
  let text = '';
  let language = '';
  const visit = (node: React.ReactNode): void => {
    if (node == null || typeof node === 'boolean') return;
    if (typeof node === 'string' || typeof node === 'number') {
      text += String(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (isValidElement(node)) {
      const props = node.props as { className?: string; children?: React.ReactNode };
      if (typeof props.className === 'string') {
        const m = props.className.match(/language-([\w-]+)/);
        if (m && !language) language = m[1];
      }
      visit(props.children);
    }
  };
  visit(children);
  return { text: text.replace(/\n$/, ''), language };
}

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const { dict } = useI18n();
  const preRef = useRef<HTMLPreElement>(null);
  const initial = getCodeData(children);
  const [text, setText] = useState(initial.text);
  const [language, setLanguage] = useState(initial.language);
  const [copied, setCopied] = useState(false);

  /* 真正渲染 children（而非仅递归其 props），让 lazy 形态的代码在挂载时被解析，再读 DOM 拿最终文本与语言 */
  useLayoutEffect(() => {
    const code = preRef.current?.querySelector('code');
    if (code) {
      setText((code.textContent ?? '').replace(/\n$/, ''));
      const m = String(code.className).match(/language-([\w-]+)/);
      setLanguage(m ? m[1] : '');
    }
  }, [children]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-lobster/80"></span>
          <span className="text-[11px] font-bold tracking-widest text-slate-400">
            {LANGUAGE_MAP[language] || language || 'code'}
          </span>
        </div>
        {/* 复制按钮：支持 hover 的设备上跟随卡片 hover 显隐；小屏与触屏常亮。
            Tailwind v4 把 group-hover 包在 @media (hover: hover) 内，触屏没有 hover，
            按钮会一直停在 opacity-0，用户在手机上根本看不到复制入口。 */}
        <button
          type="button"
          onClick={handleCopy}
          title={copied ? dict['code.copied'] : dict['code.copy']}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-400 opacity-0 transition-opacity hover:bg-white/10 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 max-sm:opacity-100 pointer-coarse:opacity-100"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className={copied ? 'text-green-400' : ''}>{copied ? dict['code.copied'] : dict['code.copy']}</span>
        </button>
      </div>
      <pre
        ref={preRef}
        className="!m-0 max-h-[32rem] overflow-x-auto overflow-y-auto !bg-transparent !p-4 sm:!p-5 !text-xs sm:!text-sm !leading-relaxed !text-slate-200 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!font-mono [&_code]:!text-xs sm:[&_code]:!text-sm [&_code]:!text-slate-200 [&_code]:!leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
}
