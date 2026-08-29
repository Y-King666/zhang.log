'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Braces, FileText, Search, Workflow } from 'lucide-react';
import type { BlogMeta } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n';

const SCENARIOS = [
  { key: 'coding', icon: Braces },
  { key: 'writing', icon: FileText },
  { key: 'organizing', icon: Search },
  { key: 'automation', icon: Workflow },
] as const;

export default function AgentsClient({ dict, lang, articles }: { dict: Dictionary; lang: string; articles: BlogMeta[] }) {
  const t = (key: keyof Dictionary) => dict[key];
  const latestArticles = articles.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-6 pb-24 pt-36 lg:pt-44">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-14">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">{t('blog.detail.home')}</Link>
        <span className="size-1 rounded-full bg-lobster" />
        <span className="text-slate-300">{t('nav.agents')}</span>
      </nav>

      <section className="max-w-4xl mb-20">
        <p className="text-xs font-black text-lobster uppercase tracking-[0.3em] mb-5">{t('agents.page.eyebrow')}</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">{t('agents.page.title')}</h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">{t('agents.page.subtitle')}</p>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-lobster/30 bg-[#110d0b] mb-24 group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,100,40,0.22),transparent_45%)]" />
        <div className="absolute right-8 top-8 text-[9rem] leading-none opacity-[0.06] select-none">🦞</div>
        <div className="relative grid lg:grid-cols-[1fr_0.85fr] gap-10 p-8 md:p-12 lg:p-16 items-end">
          <div>
            <div className="flex items-center gap-3 text-xs font-black text-orange-300 uppercase tracking-[0.25em] mb-7">
              <Bot className="size-4" /> {t('agents.page.openclaw.eyebrow')}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-5">{t('agents.page.openclaw.title')}</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-9">{t('agents.page.openclaw.desc')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${lang}/openclaw`} className="inline-flex items-center gap-2 bg-lobster text-white px-5 py-3 rounded-xl text-sm font-black hover:brightness-110 transition-all">
                {t('agents.page.openclaw.cta')} <ArrowRight className="size-4" />
              </Link>
              {latestArticles[0] && <Link href={`/${lang}/blogs/${latestArticles[0].slug}`} className="inline-flex items-center gap-2 border border-white/15 bg-white/5 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">{t('agents.page.openclaw.latest')}</Link>}
            </div>
          </div>
          <div className="border-l border-white/10 pl-6 lg:pl-10 space-y-5">
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">OpenClaw / practice map</div>
            {(['overview', 'start', 'experience', 'workflow', 'config'] as const).map((item, index) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300"><span className="font-mono text-lobster">0{index + 1}</span>{t(`agents.page.openclaw.map.${item}` as keyof Dictionary)}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="flex items-end justify-between mb-10"><div><p className="text-xs font-black text-lobster uppercase tracking-[0.3em] mb-3">{t('agents.page.scenarios.eyebrow')}</p><h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{t('agents.page.scenarios.title')}</h2></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIOS.map(({ key, icon: Icon }) => (
            <div key={key} className="edge-lit-card rounded-2xl p-6 min-h-44 group hover:-translate-y-1 transition-transform">
              <Icon className="size-6 text-lobster mb-8" />
              <h3 className="text-xl font-black text-white mb-2">{t(`agents.page.scenarios.${key}` as keyof Dictionary)}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t(`agents.page.scenarios.${key}.desc` as keyof Dictionary)}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-6 mb-10"><div><p className="text-xs font-black text-lobster uppercase tracking-[0.3em] mb-3">{t('agents.page.articles.eyebrow')}</p><h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{t('agents.page.articles.title')}</h2></div><Link href={`/${lang}/blogs`} className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-lobster transition-colors">{t('agents.page.articles.viewAll')} <ArrowRight className="size-4" /></Link></div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {latestArticles.map((article) => (
            <Link key={article.slug} href={`/${lang}/blogs/${article.slug}`} className="group py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div><div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-lobster mb-2"><span>{article.date}</span><span className="size-1 rounded-full bg-white/20" /><span className="text-slate-500">{article.category}</span></div><h3 className="text-xl md:text-2xl font-black text-white group-hover:text-lobster transition-colors">{article.title}</h3></div>
              <ArrowRight className="size-5 text-lobster shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
          {latestArticles.length === 0 && <p className="py-10 text-slate-500">{t('agents.page.articles.empty')}</p>}
        </div>
      </section>
    </main>
  );
}
