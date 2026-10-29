'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta } from '@/lib/content';
import { getDisplayTag } from '@/lib/tag-display';
import ListFilters from '@/components/ListFilters';
import Pagination from '@/components/Pagination';

const CATEGORY_FILTERS: Record<string, (category: string) => boolean> = {
  all: () => true,
  tech: (category) => ['tutorial', 'explainer', 'architecture', 'frontend'].includes(category),
  community: (category) => category === 'ecosystem',
  latest: (category) => category === 'trends',
};

const PAGE_SIZE = 6;

export default function BlogClient({
  dict,
  lang,
  articles,
}: {
  dict: Dictionary;
  lang: string;
  articles: BlogMeta[];
}) {
  const t = (key: keyof Dictionary) => dict[key];
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);

  const categories = [
    { value: 'all', label: t('list.filter.all') },
    { value: 'tech', label: t('blog.categories.tech') },
    { value: 'community', label: t('blog.categories.community') },
    { value: 'latest', label: t('blog.categories.latest') },
  ];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles
      .filter((article) => CATEGORY_FILTERS[active]?.(article.category) ?? true)
      .filter((article) => {
        if (!query) return true;
        return [
          article.title,
          article.slug,
          dict[`blog.category.${article.category}`],
          ...article.tags.flatMap((tag) => [tag, getDisplayTag(tag, lang)]),
        ]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return a.date.localeCompare(b.date);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return b.date.localeCompare(a.date);
      });
  }, [active, articles, dict, lang, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [active, search, sort]);

  return (
    <main className="cocoon-home mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 sm:px-6 sm:pt-36 md:pb-24 lg:pt-40">
      <nav className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-fog sm:mb-14">
        <Link href={`/${lang}`} className="transition-colors hover:text-paper">
          {t('blog.detail.home')}
        </Link>
        <span className="text-rule">/</span>
        <span className="text-paper">{t('nav.blog')}</span>
      </nav>

      <header>
        <h1 className="text-[clamp(3.2rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em] text-paper">
          {t('blog.page.title')}
        </h1>
      </header>

      <div className="mt-12 md:mt-16">
        <ListFilters
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={t('list.search')}
          sort={sort}
          onSortChange={setSort}
          sortLabel={t('list.sort')}
          sortOptions={[
            { value: 'latest', label: t('list.sort.latest') },
            { value: 'oldest', label: t('list.sort.oldest') },
            { value: 'title', label: t('list.sort.title') },
          ]}
          filter={active}
          onFilterChange={setActive}
          filterOptions={categories}
          clearLabel={t('list.clear')}
        />
      </div>

      <div>
        {paged.map((article) => (
          <Link
            key={article.slug}
            href={`/${lang}/blogs/${article.slug}`}
            prefetch={false}
            className="group grid gap-4 border-t border-rule py-7 md:grid-cols-12 md:items-start md:gap-6"
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-fog md:col-span-2 md:block">
              <time dateTime={article.date}>{article.date}</time>
              <span className="md:mt-2 md:block">
                {t(`blog.category.${article.category}` as keyof Dictionary)}
              </span>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-xl font-medium leading-snug tracking-[-0.025em] text-paper transition-colors group-hover:text-signal md:text-2xl">
                {article.title}
              </h2>
              {article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-fog">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>#{getDisplayTag(tag, lang)}</span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-fog md:col-span-2 md:pt-1">
              {t('blog.readTime.format').replace('{n}', article.readTime || '—')}
            </p>
            <div className="flex justify-end md:col-span-1">
              <ArrowUpRight className="size-4 text-fog transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="border-t border-rule py-16 text-sm text-fog">{t('blog.noArticles')}</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
