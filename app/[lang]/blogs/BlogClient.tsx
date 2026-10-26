'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta } from '@/lib/content';
import ListFilters from '@/components/ListFilters';
import Pagination from '@/components/Pagination';
import ParallaxSection from '@/components/ParallaxSection';
import { motion } from 'motion/react';

// Maps the 4 UI filter tabs to the blog frontmatter `category` values.
const CATEGORY_FILTERS: Record<string, (category: string) => boolean> = {
  all: () => true,
  tech: (c) => ['tutorial', 'explainer', 'architecture', 'frontend'].includes(c),
  community: (c) => c === 'ecosystem',
  latest: (c) => c === 'trends',
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
        return [article.title, article.slug, dict[`blog.category.${article.category}`], ...article.tags]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return a.date.localeCompare(b.date);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return b.date.localeCompare(a.date);
      });
  }, [active, articles, dict, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [active, search, sort]);

  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <main className="blog-page mx-auto w-full max-w-[1200px] px-6 pb-16 pt-24 sm:px-8 md:pb-24 lg:px-10 lg:pt-32">
      <motion.nav initial="hidden" animate="visible" variants={reveal} className="t-meta mb-10 flex items-center gap-2">
        <Link href={`/${lang}`} className="transition-colors hover:text-lobster">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster" />
        <span className="text-slate-300">{t('nav.blog')}</span>
      </motion.nav>

      <motion.header initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="blog-page-header">
        <h1 className="t-page">{t('blog.page.title')}</h1>
      </motion.header>

      <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }} className="blog-filters">
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
      </motion.div>

      <ParallaxSection>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          className="blog-index-list"
        >
          {paged.map((article) => (
            <motion.div key={article.slug} variants={reveal}>
              <Link href={`/${lang}/blogs/${article.slug}`} className="blog-index-row group">
                <div className="blog-index-date">
                  <time dateTime={article.date}>{article.date}</time>
                  <span>{t(`blog.category.${article.category}` as keyof Dictionary)}</span>
                </div>
                <div className="blog-index-copy">
                  <h2>{article.title}</h2>
                  {article.tags.length > 0 && (
                    <div className="blog-index-tags">
                      {article.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
                    </div>
                  )}
                </div>
                <div className="blog-index-meta">
                  <span>{t('blog.readTime.format').replace('{n}', article.readTime || '—')}</span>
                  <ArrowRight aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-20 text-slate-500">
              {t('blog.noArticles')}
            </div>
          )}
        </motion.div>
      </ParallaxSection>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
