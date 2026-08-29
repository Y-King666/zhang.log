'use client';

import { useState, isValidElement } from 'react';
import { Copy, Check } from 'lucide-react';

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

/* 从 MDX 的 pre 子节点递归提取代码文本与语言（代码未走语法高亮，文本分散在若干字符串里） */
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
  const { text, language } = getCodeData(children);
  const [copied, setCopied] = useState(false);

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
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {LANGUAGE_MAP[language] || language || 'code'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          title={copied ? '已复制' : '复制'}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-400 opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className={copied ? 'text-green-400' : ''}>{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
      <pre className="!m-0 overflow-x-auto !bg-transparent !p-5 !text-sm !leading-relaxed !text-slate-200">
        <code className="!bg-transparent !p-0 !font-mono !text-sm !text-slate-200">{text}</code>
      </pre>
    </div>
  );
}
