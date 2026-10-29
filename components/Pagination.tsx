'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

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
  const { dict } = useI18n();
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex items-center justify-center gap-5" aria-label={dict['pagination.nav']}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={dict['pagination.previous']}
        className="flex items-center py-2 text-fog transition-colors hover:text-paper disabled:opacity-25"
      >
        <ArrowLeft className="size-3.5" />
      </button>

      <div className="flex items-center gap-3">
        {getPages(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="text-fog">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`relative py-2 font-mono text-xs transition-colors ${
                p === page ? 'text-paper' : 'text-fog hover:text-paper'
              }`}
            >
              {p}
              {p === page && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-signal" />}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={dict['pagination.next']}
        className="flex items-center py-2 text-fog transition-colors hover:text-paper disabled:opacity-25"
      >
        <ArrowRight className="size-3.5" />
      </button>
    </nav>
  );
}
