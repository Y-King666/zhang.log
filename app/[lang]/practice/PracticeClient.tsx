'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { Dictionary } from '@/lib/i18n';
import type { PracticeMeta } from '@/lib/content';
import { ArrowRight } from 'lucide-react';
import PracticeIcon from '@/components/PracticeIcon';
import { motion } from 'motion/react';
import ListFilters from '@/components/ListFilters';
import Pagination from '@/components/Pagination';
import ParallaxSection from '@/components/ParallaxSection';
import { getDisplayTag } from '@/lib/tag-display';

const SCENARIO_KEYS = ['coding', 'creating', 'organizing', 'automation'] as const;

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
    return initialScenario && (SCENARIO_KEYS as readonly string[]).includes(initialScenario) ? initialScenario : 'all';
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
        return [project.title, project.slug, ...project.tags]
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
    <main className="max-w-6xl mx-auto px-6 pb-20 pt-40">
      <motion.nav initial="hidden" animate="visible" variants={reveal} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t('nav.projects')}</span>
      </motion.nav>
      <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
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
        <div className="flex flex-wrap items-center gap-3">
          {(['all', ...SCENARIO_KEYS] as const).map((key) => {
            const active = activeScenario === key;
            return (
              <button
                key={key}
                onClick={() => applyScenario(key as string)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${active ? 'bg-lobster text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
              >
                {key === 'all' ? t('list.filter.all') : t(`agents.page.scenarios.${key}` as keyof Dictionary)}
              </button>
            );
          })}
        </div>
      </ListFilters>
      </motion.div>

      <ParallaxSection>
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paged.map((project) => (
          <motion.div
            key={project.slug}
            variants={reveal}
            whileHover={{ x: 10 }}
            className={`edge-lit-card group rounded-3xl p-5 md:p-6 flex flex-col justify-between transition-all relative`}
          >
            <Link href={`/${lang}/practice/${project.slug}`} className="absolute inset-0 z-20" />
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  <PracticeIcon name={project.icon} className="size-6 text-lobster" />
                </div>
                <div className="flex gap-2">
                  {(project.tags || []).filter((tag) => !(SCENARIO_KEYS as readonly string[]).includes(tag)).slice(0, 2).map((tag, i) => (
                    <span key={i} className="bg-white/5 text-slate-400 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                      {getDisplayTag(tag, lang)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black mb-2 text-white group-hover:text-lobster transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 max-w-2xl leading-relaxed mb-4">
                {(project.tags || []).filter((tag) => !(SCENARIO_KEYS as readonly string[]).includes(tag)).map((tag) => getDisplayTag(tag, lang)).join(", ") || project.slug}
              </p>
              <div className="grid grid-cols-1 gap-y-2 border-t border-white/10 pt-4 mb-5 text-[11px]">
                <div className="min-w-0"><span className="text-slate-600">{t('practice.meta.scenario')} </span><span className="text-slate-300 truncate">{project.scenario || '-'}</span></div>
              </div>

              <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:text-lobster group-hover:gap-4 transition-all">
                {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
              </div>
            </div>
          </motion.div>
        ))}
        {filteredProjects.length === 0 && (
          <p className="col-span-full text-slate-500">暂无项目。</p>
        )}
      </motion.div>
      </ParallaxSection>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
