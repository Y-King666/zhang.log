'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { Dictionary } from '@/lib/i18n';
import type { PracticeMeta } from '@/lib/content';
import { ArrowRight } from 'lucide-react';
import PracticeIcon from '@/components/PracticeIcon';
import { motion } from 'motion/react';
import ListFilters from '@/components/ListFilters';
import Pagination from '@/components/Pagination';
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

  const router = useRouter();
  const pathname = usePathname();

  const [activeScenario, setActiveScenario] = useState<string>(() => {
    return initialScenario && SCENARIO_SET.has(initialScenario) ? initialScenario : 'all';
  });
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
        return [project.title, project.slug, project.scenario || '', ...project.tags]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return a.date.localeCompare(b.date);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.date.localeCompare(a.date);
      });
  }, [activeScenario, projects, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const paged = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [activeScenario, search, sort]);

  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-20 pt-20 sm:pt-28 lg:pt-40">
      <motion.nav initial="hidden" animate="visible" variants={reveal} className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-6 sm:mb-8 lg:mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t('nav.projects')}</span>
      </motion.nav>
      <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
          {t('projects.page.title')}
        </h1>
        <p className="text-slate-400 text-base max-w-2xl">
          {t('projects.page.subtitle')}
        </p>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }}>
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
        clearLabel={t('list.clear')}
      >
        <div className="flex w-full flex-nowrap items-center gap-1 overflow-hidden pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 lg:w-auto lg:flex-wrap lg:gap-3 lg:pb-0">
          {(['all', ...SCENARIO_KEYS] as const).map((key) => {
            const active = activeScenario === key;
            return (
              <button
                key={key}
                onClick={() => applyScenario(key as string)}
                className={`min-w-0 flex-1 whitespace-nowrap rounded-full px-1 py-1.5 text-center text-[10px] font-bold transition-colors sm:px-3 sm:text-xs lg:flex-none lg:px-3.5 ${active ? 'bg-lobster text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
              >
                {key === 'all' ? t('list.filter.all') : t(`agents.page.scenarios.${key}` as keyof Dictionary)}
              </button>
            );
          })}
        </div>
      </ListFilters>
      </motion.div>

      <div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } } }}
          className="flex min-h-[400px] flex-col gap-10 md:gap-14"
        >
          {paged.map((project) => (
            <motion.div key={project.slug} variants={reveal} whileHover={{ y: -10 }}>
              <Link
                href={`/${lang}/practice/${project.slug}`}
                className="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#0f0f0f] p-3 transition-colors hover:border-white/20 md:flex-row md:items-center md:gap-8 md:p-4 lg:p-5"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-lobster/10 md:w-[400px] md:shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="t-kicker flex items-center gap-2">
                    <PracticeIcon name={project.icon} className="size-4 text-lobster" />
                    <span>{project.scenario || project.slug}</span>
                  </div>
                  <h3 className="t-item group-hover:text-lobster transition-colors">
                    {project.title}
                  </h3>
                  {(project.tags || []).filter((tag) => !SCENARIO_SET.has(tag)).length > 0 && (
                    <p className="t-meta">
                      {(project.tags || [])
                        .filter((tag) => !SCENARIO_SET.has(tag))
                        .map((tag) => getDisplayTag(tag, lang))
                        .join(' · ')}
                    </p>
                  )}
                  <div className="t-meta flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{t('blog.publishedAt')} {project.date}</span>
                    <span>{project.readTime || '—'}{project.readTime && (lang === 'en' ? ' ' + t('blog.readTime.suffix') : t('blog.readTime.suffix'))}</span>
                  </div>
                  <div className="t-action mt-2 flex items-center gap-2 text-lobster">
                    {t('blog.readMore')}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-slate-500">{t('list.empty')}</p>
          )}
        </motion.div>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
