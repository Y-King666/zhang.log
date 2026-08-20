'use client';

import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import type { ProjectMeta } from '@/lib/content';
import { Code, Eye, Cloud, BarChart3, Terminal, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectsClient({
  dict,
  lang,
  projects,
}: {
  dict: Dictionary;
  lang: string;
  projects: ProjectMeta[];
}) {
  const t = (key: keyof Dictionary) => dict[key];

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20 pt-40">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t('nav.projects')}</span>
      </nav>
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
          {t('projects.page.title')}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          {t('projects.page.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            whileHover={{ x: 10 }}
            className={`group bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-lobster/30 transition-all relative ${idx === 0 && project.featured ? 'md:col-span-2' : ''}`}
          >
            <Link href={`/${lang}/projects/${project.slug}`} className="absolute inset-0 z-20" />
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  {idx === 0
                    ? <Terminal className="size-7 text-lobster" />
                    : idx === 1
                    ? <Cloud className="size-7 text-secondary" />
                    : <BarChart3 className="size-7 text-lobster" />
                  }
                </div>
                <div className="flex gap-2">
                  {(project.tags || []).slice(0, 2).map((tag, i) => (
                    <span key={i} className="bg-white/5 text-slate-400 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity relative z-30">
                <Link href={`/${lang}/projects/${project.slug}`} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-lobster transition-colors">
                  <Eye className="size-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl font-black mb-3 text-white group-hover:text-lobster transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 max-w-2xl leading-relaxed mb-8">
                {(project.tags || []).join(", ") || project.slug}
              </p>

              <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:text-lobster group-hover:gap-4 transition-all">
                {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
              </div>
            </div>
          </motion.div>
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-slate-500">暂无项目。</p>
        )}
      </div>
    </main>
  );
}
