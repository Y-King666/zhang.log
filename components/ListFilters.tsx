'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';

interface ListFilterOption {
  value: string;
  label: string;
}

interface ListSortOption {
  value: string;
  label: string;
}

export default function ListFilters({
  search,
  onSearchChange,
  searchPlaceholder,
  sort,
  onSortChange,
  sortLabel,
  sortOptions,
  filter,
  onFilterChange,
  filterOptions,
  clearLabel,
  children,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  sort: string;
  onSortChange: (value: string) => void;
  sortLabel: string;
  sortOptions: ListSortOption[];
  filter?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: ListFilterOption[];
  clearLabel: string;
  children?: ReactNode;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const selectedSort = sortOptions.find((option) => option.value === sort) ?? sortOptions[0];
  const hasActiveFilters = search.length > 0 || Boolean(filter && filter !== 'all');

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSortOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-end gap-6 lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-[420px]">
          <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-fog" />
          <input
            type="search"
            aria-label={searchPlaceholder}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full border-0 bg-transparent py-2 pl-7 pr-8 text-sm text-paper outline-none transition-colors placeholder:text-fog/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper/50 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label={clearLabel}
              title={clearLabel}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-fog transition-colors hover:text-paper"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 text-xs text-fog">
          <span className="hidden whitespace-nowrap sm:inline">{sortLabel}</span>
          <div ref={sortRef} className="relative min-w-[7.5rem] sm:min-w-[9rem]">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((open) => !open)}
              className="flex h-10 w-full items-center justify-between gap-3 border-0 bg-transparent px-0 text-left text-xs text-paper outline-none transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper/50"
            >
              <span className="truncate">{selectedSort?.label}</span>
              <ChevronDown
                className={`size-4 shrink-0 transition-transform ${sortOpen ? 'rotate-180 text-paper' : 'text-fog'}`}
              />
            </button>

            {sortOpen && (
              <div
                role="listbox"
                aria-label={sortLabel}
                className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-max min-w-full overflow-hidden border border-rule bg-surface/98 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                {sortOptions.map((option) => {
                  const selected = option.value === sort;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onSortChange(option.value);
                        setSortOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between gap-5 px-3 py-2.5 text-left text-xs transition-colors ${
                        selected ? 'text-paper' : 'text-fog hover:text-paper'
                      }`}
                    >
                      <span className="whitespace-nowrap">{option.label}</span>
                      {selected && <Check className="size-3.5 shrink-0 text-signal" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {filterOptions && onFilterChange && (
        <div className="mt-3 flex w-full flex-nowrap items-center gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filterOptions.map((option) => {
            const active = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange(option.value)}
                className={`relative shrink-0 py-1 text-xs transition-colors ${
                  active ? 'text-signal' : 'text-fog hover:text-paper'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            onSearchChange('');
            onFilterChange?.('all');
          }}
          className="mt-3 text-[11px] text-fog transition-colors hover:text-paper"
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}
