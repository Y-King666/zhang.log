import type { ReactNode, AnchorHTMLAttributes, TableHTMLAttributes, HTMLAttributes } from 'react';
import type { MDXComponents } from 'mdx/types';
import { ArrowUpRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import Figure from '@/components/Figure';

function textContent(value: ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(textContent).join('');
  return '';
}

function headingId(children: ReactNode): string {
  return textContent(children)
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/[\s-]+/g, '-') || 'section';
}

function withoutWhitespace(children: ReactNode) {
  return Array.isArray(children)
    ? children.filter((child) => typeof child !== 'string' || child.trim() !== '')
    : children;
}

function Table({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table {...props}>{withoutWhitespace(children)}</table>;
}

function TableSection({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{withoutWhitespace(children)}</tbody>;
}

function TableHead({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{withoutWhitespace(children)}</thead>;
}

function TableRow({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>{withoutWhitespace(children)}</tr>;
}

function Heading({ level, children, ...props }: HTMLAttributes<HTMLHeadingElement> & { level: 2 | 3 }) {
  const id = headingId(children);
  if (level === 2) return <h2 id={id} {...props}>{children}</h2>;
  return <h3 id={id} {...props}>{children}</h3>;
}

function Heading2(props: HTMLAttributes<HTMLHeadingElement>) {
  return <Heading level={2} {...props} />;
}

function Heading3(props: HTMLAttributes<HTMLHeadingElement>) {
  return <Heading level={3} {...props} />;
}

/* MDX 自定义外链：<ExtLink href="...">文字</ExtLink> 渲染为带 ↗ 箭头的行内链接，外部链接新开窗口 */
function ExtLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 font-medium text-lobster underline decoration-lobster/40 underline-offset-4 transition-colors hover:text-orange-300 hover:decoration-orange-300"
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4 shrink-0 self-center" />
    </a>
  );
}

export function useMDXComponents(): MDXComponents {
  return {
    table: Table,
    thead: TableHead,
    tbody: TableSection,
    tr: TableRow,
    h2: Heading2,
    h3: Heading3,
    pre: CodeBlock,
    ExtLink,
    Figure,
  };
}
