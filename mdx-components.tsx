import { isValidElement, type ReactNode, type AnchorHTMLAttributes, type TableHTMLAttributes, type HTMLAttributes } from 'react';
import type { MDXComponents } from 'mdx/types';
import { ArrowUpRight } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

function textContent(value: ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(textContent).join('');
  if (isValidElement(value)) {
    const props = value.props as { children?: ReactNode };
    return textContent(props.children);
  }
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
  // 小屏表格改为横向滑动：外层容器负责滚动，见 globals.css 的 .table-scroll
  return (
    <div className="table-scroll">
      <table {...props}>{withoutWhitespace(children)}</table>
    </div>
  );
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
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 font-medium text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-orange-300 hover:decoration-orange-300"
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4 shrink-0 self-center" />
    </a>
  );
}

/* 段落缩进覆盖：正文段落默认由 globals.css 的 .prose p 统一缩进 2em。
   需要逐段调整时在 MDX 里用：
     <NoIndent>顶格的段落</NoIndent>
     <Indent n={1}>缩进 1 个字符的段落</Indent>        // n 省略时为 2
   两者都渲染成 <p>，继续继承 prose 的段落样式；用行内 style 覆盖 .prose p。
   内容要紧贴标签写（不要空行），否则 MDX 会在组件内再包一层 <p>。 */
function NoIndent({ children, style, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} style={{ ...style, textIndent: 0 }}>
      {children}
    </p>
  );
}

function Indent({ n = 2, children, style, ...props }: HTMLAttributes<HTMLParagraphElement> & { n?: number }) {
  return (
    <p {...props} style={{ ...style, textIndent: `${n}em` }}>
      {children}
    </p>
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
    NoIndent,
    Indent,
  };
}
