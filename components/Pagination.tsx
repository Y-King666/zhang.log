'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 生成页码窗口：最多 7 格，超出用省略号收拢，保证首尾与当前页可见
function getPages(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', current - 1, current, current + 1, '…', total];
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="分页">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="上一页"
        className="flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-black text-slate-400 transition-colors hover:border-lobster/40 hover:text-white disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-slate-400"
      >
        <ArrowLeft className="size-3.5" />
      </button>

      <div className="flex items-center gap-1">
        {getPages(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-slate-600">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`size-9 rounded-full text-xs font-black transition-colors ${
                p === page ? 'bg-lobster text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="下一页"
        className="flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-black text-slate-400 transition-colors hover:border-lobster/40 hover:text-white disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-slate-400"
      >
        <ArrowRight className="size-3.5" />
      </button>
    </nav>
  );
}
