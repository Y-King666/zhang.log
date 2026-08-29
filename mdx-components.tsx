import type { ReactNode, TableHTMLAttributes, HTMLAttributes } from 'react';
import type { MDXComponents } from 'mdx/types';

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

export function useMDXComponents(): MDXComponents {
  return {
    table: Table,
    thead: TableHead,
    tbody: TableSection,
    tr: TableRow,
    h2: Heading2,
    h3: Heading3,
  };
}
