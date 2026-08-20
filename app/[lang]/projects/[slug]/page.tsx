import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectSlugs, getProjectMeta } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3 } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';

import { projectComponents } from '@/lib/mdx-registry';

const PROJECT_STATS: Record<string, Array<{ labelKey: string; value: string }>> = {
  'optimizing-llm': [
    { labelKey: 'project.stat.latency', value: '30%' },
    { labelKey: 'project.stat.agents', value: '5+' },
    { labelKey: 'project.stat.cost', value: '< $0.01' },
  ],
  'raft': [
    { labelKey: 'project.stat.uptime', value: '99.9%' },
    { labelKey: 'project.stat.consensus', value: '120ms' },
    { labelKey: 'project.stat.throughput', value: '500 TPS' },
  ],
  'viz': [
    { labelKey: 'project.stat.fps', value: '60 FPS' },
    { labelKey: 'project.stat.datapoints', value: '5k+' },
    { labelKey: 'project.stat.refresh', value: '16ms' },
  ],
};

export function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProjectMeta(slug);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getProjectMeta(slug);
  if (!meta) notFound();

  const MDXContent = projectComponents[slug];
  const stats = PROJECT_STATS[slug] || [];

  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 lg:pt-44 lg:pb-24">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          Home
        </Link>
        <span className="size-1 rounded-full bg-white/20"></span>
        <Link href={`/${lang}/projects`} className="hover:text-lobster transition-colors">
          Projects
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">Detail</span>
      </nav>
      <header className="max-w-4xl mb-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {meta.tags.map((tag: string, i: number) => (
            <span key={i} className={`px-3 py-1 rounded-full ${i === 0 ? 'bg-lobster/10 border border-lobster/20 text-lobster' : 'bg-white/5 border border-white/10 text-slate-400'} text-[10px] font-bold tracking-widest uppercase`}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
          {meta.title}
        </h1>
        <div className="flex flex-wrap items-center gap-8 py-8 border-y border-white/10">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{t('project.detail.published')}</span>
            <span className="text-slate-200 font-medium">{meta.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{t('project.detail.readTime')}</span>
            <span className="text-slate-200 font-medium">{meta.readTime}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{t('project.detail.role')}</span>
            <span className="text-slate-200 font-medium">{meta.role}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="rounded-3xl overflow-hidden mb-12 aspect-[16/9] border border-white/10 shadow-2xl relative group">
            <Image
              alt={meta.title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              src={meta.image}
            />
          </div>

          {MDXContent ? (
            <article className="prose prose-invert prose-lg max-w-none text-slate-400">
              <MDXContent />
            </article>
          ) : (
            <article className="prose prose-invert prose-lg max-w-none text-slate-400">
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">{meta.slug}</p>
            </article>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              {stats.map((stat, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                  <h4 className="text-lobster text-4xl font-black mb-2">{stat.value}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t(stat.labelKey as keyof Dictionary)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-3xl glass-panel sticky top-36 bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h3 className="text-white font-bold mb-8 flex items-center gap-2">
              <BarChart3 className="size-5 text-lobster" /> {t('project.detail.navigation')}
            </h3>
            <nav className="space-y-6">
              <a className="group block" href="#challenge">
                <p className="text-[10px] text-lobster font-black uppercase tracking-[0.2em] mb-1">{t('project.detail.problem')}</p>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-lobster transition-colors">
                  {t('project.detail.challengePhase')}
                </h4>
              </a>
              <a className="group block opacity-50 hover:opacity-100 transition-opacity" href="#code">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{t('project.detail.implementation')}</p>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-lobster transition-colors">
                  {t('project.detail.coreLogic')}
                </h4>
              </a>
              <a className="group block opacity-50 hover:opacity-100 transition-opacity" href="#arch">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{t('project.detail.structure')}</p>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-lobster transition-colors">
                  {t('project.detail.arch')}
                </h4>
              </a>
            </nav>
            <div className="mt-12 pt-10 border-t border-white/10">
              <h3 className="text-white font-bold mb-6">{t('project.detail.related')}</h3>
              <div className="space-y-4">
                {getProjectSlugs()
                  .filter(s => s !== slug)
                  .map((relatedSlug) => {
                    const relatedMeta = getProjectMeta(relatedSlug);
                    if (!relatedMeta) return null;
                    return (
                      <Link
                        key={relatedSlug}
                        href={`/${lang}/projects/${relatedSlug}`}
                        className="group block p-4 rounded-2xl hover:bg-white/5 border border-white/10 bg-white/[0.02] transition-all"
                      >
                        <p className="text-[9px] text-lobster font-black uppercase tracking-widest mb-1">
                          {relatedMeta.tags?.[0] || relatedSlug}
                        </p>
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-lobster transition-colors">
                          {relatedMeta.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 mt-2 block line-clamp-2">
                          {relatedMeta.slug}
                        </span>
                      </Link>
                    );
                  })}
                {getProjectSlugs().filter(s => s !== slug).length === 0 && (
                  <p className="text-xs text-slate-500 italic">{t('project.detail.noRelated')}</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
