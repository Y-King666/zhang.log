'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { PracticeMeta } from '@/lib/content';
import PracticeIcon from '@/components/PracticeIcon';
import ListFilters from '@/components/ListFilters';
import Pagination from '@/components/Pagination';
import ProgressiveImage from '@/components/ProgressiveImage';
import { getDisplayTag } from '@/lib/tag-display';
import { SCENARIO_KEYS, SCENARIO_SET } from '@/lib/scenarios';

const PAGE_SIZE = 6;

export default function PracticeClient({
  dict,
  lang,
  projects,
  initialScenario,
}: {
  dict: Dictionary;
  lang: string;
  projects: PracticeMeta[];
  initialScenario?: string;
}) {
  const t = (key: keyof Dictionary) => dict[key];
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [activeScenario, setActiveScenario] = useState<string>(() => {
    return initialScenario && SCENARIO_SET.has(initialScenario) ? initialScenario : 'all';
  });

  const router = useRouter();
  const pathname = usePathname();

  const applyScenario = (scenario: string) => {
    setActiveScenario(scenario);
    const params = new URLSearchParams();
    if (scenario !== 'all') params.set('scenario', scenario);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects
      .filter((project) => activeScenario === 'all' || project.tags?.includes(activeScenario))
      .filter((project) => {
        if (!query) return true;
        return [
          project.title,
          project.slug,
          project.scenario || '',
          ...project.tags.flatMap((tag) => [tag, getDisplayTag(tag, lang)]),
        ]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return a.date.localeCompare(b.date);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.date.localeCompare(a.date);
      });
  }, [activeScenario, lang, projects, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const paged = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [activeScenario, search, sort]);

  return (
    <main className="cocoon-home mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 sm:px-6 sm:pt-36 md:pb-24 lg:pt-40">
      <nav className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-fog sm:mb-14">
        <Link href={`/${lang}`} className="transition-colors hover:text-paper">
          {t('blog.detail.home')}
        </Link>
        <span className="text-rule">/</span>
        <span className="text-paper">{t('nav.projects')}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-[clamp(3.2rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em] text-paper">
          {t('projects.page.title')}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-fog">{t('projects.page.subtitle')}</p>
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
            { value: 'featured', label: t('list.sort.featured') },
            { value: 'latest', label: t('list.sort.latest') },
            { value: 'oldest', label: t('list.sort.oldest') },
            { value: 'title', label: t('list.sort.title') },
          ]}
          filter={activeScenario}
          onFilterChange={applyScenario}
          filterOptions={[
            { value: 'all', label: t('list.filter.all') },
            ...SCENARIO_KEYS.map((key) => ({
              value: key,
              label: t(`agents.page.scenarios.${key}` as keyof Dictionary),
            })),
          ]}
          clearLabel={t('list.clear')}
        />
      </div>

      <div>
        {paged.map((project, index) => (
          <Link
            key={project.slug}
            href={`/${lang}/practice/${project.slug}`}
            prefetch={false}
            className="group grid gap-6 border-t border-rule py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
          >
            <div className="relative aspect-video overflow-hidden bg-surface md:col-span-4">
              <ProgressiveImage
                src={project.image}
                alt={project.title}
                fill
                priority={index === 0}
                blurDataURL={project.imageBlur}
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.025] group-hover:opacity-90"
              />
            </div>

            <div className="md:col-span-8">
              <div className="mb-3 flex items-center gap-2 text-[10px] text-fog">
                <PracticeIcon name={project.icon} className="size-3.5" />
                <span>{project.scenario || project.slug}</span>
              </div>
              <div className="flex items-start justify-between gap-5">
                <h2 className="max-w-2xl text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.045em] text-paper">
                  {project.title}
                </h2>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-fog transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
              </div>
              <p className="mt-4 text-xs leading-6 text-fog">
                {project.tags
                  .filter((tag) => !SCENARIO_SET.has(tag))
                  .map((tag) => getDisplayTag(tag, lang))
                  .join(' / ')}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 font-mono text-[10px] text-fog">
                <span>{project.date}</span>
                <span>{project.readTime || '—'} {t('blog.readTime.suffix')}</span>
              </div>
            </div>
          </Link>
        ))}

        {filteredProjects.length === 0 && (
          <p className="border-t border-rule py-16 text-sm text-fog">{t('list.empty')}</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
