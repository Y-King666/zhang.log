'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta, ProjectMeta } from '@/lib/content';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HomeClient({
  dict,
  lang,
  featured,
  projects,
  blogs,
}: {
  dict: Dictionary;
  lang: string;
  featured: ProjectMeta | undefined;
  projects: ProjectMeta[];
  blogs: BlogMeta[];
}) {
  const t = (key: keyof Dictionary) => dict[key];

  // 仪表板统计：全部来自站内真实内容数据
  const totalReadMin = projects.reduce((sum, p) => {
    const m = p.readTime.match(/\d+/);
    return sum + (m ? parseInt(m[0], 10) : 0);
  }, 0);
  const techStack = [...new Set(projects.flatMap((p) => p.tags))].slice(0, 4);
  const totalItems = projects.length + blogs.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32 pt-28 sm:pt-32 lg:pt-48 overflow-x-clip">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative isolate grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-40"
      >
        {/* 背景 Z 形轮廓：形似闪电，缓慢不规则闪耀 */}
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full lg:hidden -translate-y-[63px]"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          style={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.95, 0.15, 0.8, 0.15, 0.15, 0.55, 0.15, 0.15, 0.15, 0.7, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeOut', times: [0, 0.03, 0.05, 0.08, 0.1, 0.2, 0.24, 0.27, 0.45, 0.6, 0.66, 1] }}
        >
          <defs>
            <linearGradient id="hero-z-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="50%" stopColor="#ff9a4d" />
              <stop offset="100%" stopColor="#ff4500" />
            </linearGradient>
            <filter id="hero-z-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="b1" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 24 15 L 72 15 L 28 62 L 76 62"
            stroke="url(#hero-z-grad)"
            strokeWidth="0.3"
            strokeOpacity="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#hero-z-glow)"
          />
        </motion.svg>
        <div className="lg:col-span-7">
          <div className="space-y-10 pl-14 lg:pl-0">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lobster/10 border border-lobster/20 text-lobster text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="size-3 animate-pulse">✨</span>
              {t('hero.available')}
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white">
              {t('hero.title')}<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lobster via-orange-400 to-lobster">
                {t('hero.subtitle')}
              </span>
            </motion.h1>
          </div>

          <div className="mt-2 ml-auto mr-14 lg:mt-10 lg:mr-0 lg:ml-0 lg:w-auto w-fit space-y-8 lg:space-y-10">
            <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 sm:gap-6">
              <Link
                href={`/${lang}/projects`}
                className="group relative flex items-center gap-3 bg-lobster text-white px-8 sm:px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,69,0,0.45)] active:brightness-90 transition-all duration-300 shadow-xl shadow-lobster/20"
              >
                <span className="relative z-10">{t('hero.viewProjects')}</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${lang}/blog`}
                className="flex items-center gap-3 border-2 border-white/20 hover:border-lobster px-8 sm:px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 bg-white/5 text-white hover:bg-lobster/10 active:border-lobster active:bg-lobster/10"
              >
                {t('hero.readBlog')}
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="lg:col-span-5 relative">
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.15),transparent_70%)] blur-3xl pointer-events-none"></div>
          <div className="relative rounded-3xl lg:aspect-square border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-lobster uppercase tracking-widest">{t('hero.systemStatus')}</div>
                  <div className="text-2xl font-mono text-white flex items-center gap-2">
                    {t('hero.activeCore')}
                    <span className="size-1.5 rounded-full bg-lobster animate-pulse shadow-[0_0_8px_#ff4500]"></span>
                  </div>
                </div>
                <div className="size-10 lg:size-12 rounded-full border border-lobster/50 flex items-center justify-center animate-spin-slow">
                  <div className="size-2 rounded-full bg-lobster shadow-[0_0_10px_rgba(255,69,0,1)]"></div>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-5">
                <div className="grid grid-cols-3 gap-2 lg:gap-3">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-mono font-bold text-white [text-shadow:0_0_20px_rgba(255,69,0,0.5)]">{projects.length}</div>
                    <div className="text-[9px] lg:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{t('stats.projects')}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-mono font-bold text-white [text-shadow:0_0_20px_rgba(255,69,0,0.5)]">{blogs.length}</div>
                    <div className="text-[9px] lg:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{t('stats.articles')}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-mono font-bold text-white [text-shadow:0_0_20px_rgba(255,69,0,0.5)]">{totalReadMin}</div>
                    <div className="text-[9px] lg:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{t('stats.readMin')}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] lg:text-[10px] font-mono text-slate-500 uppercase tracking-widest">{totalItems} {t('stats.live')}</span>
                    <span className="text-[9px] lg:text-[10px] font-mono text-lobster">100%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-lobster"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {techStack.map((tech, i) => (
                    <div key={tech} className="h-9 lg:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className={`size-1.5 rounded-full ${i < 3 ? 'bg-lobster' : 'bg-white/20'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-end gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[9px] lg:text-[10px] font-mono text-slate-400">{tech}</span>
                  ))}
                </div>
                <span className="text-2xl shrink-0">🦞</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section className="mb-24 lg:mb-48" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-black text-lobster uppercase tracking-[0.3em] mb-4">{t('projects.selectedWorks')}</div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">{t('projects.title')}</h2>
          </div>
          <Link
            href={`/${lang}/projects`}
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-lobster transition-all duration-300"
          >
            <span className="relative">
              {t('projects.viewAll')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lobster transition-all duration-300 group-hover:w-full"></span>
            </span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featured && (
            <motion.div
              whileHover={{ y: -10 }}
              className="md:col-span-8 group relative aspect-[16/10] md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f0f]"
            >
              <Link href={`/${lang}/projects/${featured.slug}`} className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
              {featured.image && (
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-1000">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 z-20 w-full">
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-lobster text-white text-[10px] font-black uppercase tracking-widest">{t('projects.featured.tag')}</span>
                  {(featured.tags || []).slice(0, 1).map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-lobster transition-colors">
                  {featured.title}
                </h3>
                <p className="text-slate-400 max-w-xl text-lg leading-relaxed mb-8">
                  {(featured.tags || []).join(' · ')}
                </p>
                <Link
                  href={`/${lang}/projects/${featured.slug}`}
                  className="relative px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest overflow-hidden group transition-all duration-300 shadow-xl shadow-lobster/20 inline-flex items-center gap-3"
                >
                  <span className="absolute inset-0 bg-[#ff4500] transition-transform duration-500 ease-out group-hover:translate-y-full"></span>
                  <span className="absolute inset-0 bg-white translate-y-[-100%] transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                  <span className="relative z-10 text-white group-hover:text-[#ff4500] transition-colors duration-500 flex items-center gap-3">
                    {t('blog.readMore')} <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}

          <div className="md:col-span-4 flex flex-col gap-8">
            {projects.filter(p => !p.featured).slice(0, 2).map((project, idx) => (
              <motion.div
                key={project.slug}
                whileHover={{ x: 10 }}
                className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-lobster/30 transition-all relative"
              >
                <Link href={`/${lang}/projects/${project.slug}`} className="absolute inset-0 z-20" />
                <div className="size-14 rounded-2xl bg-lobster/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{idx === 0 ? '🦞' : '📊'}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-lobster transition-colors">{project.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">{(project.tags || []).join(' · ')}</p>
                  <div className="flex gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">
                    {(project.tags || []).slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:text-lobster group-hover:gap-4 transition-all">
                    {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mb-24 lg:mb-32" id="blog">
        <div className="flex items-center gap-4 sm:gap-6 mb-12 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter md:whitespace-nowrap">{t('blog.latestInsights')}</h2>
          <div className="h-px flex-1 bg-white/10"></div>
          <Link href={`/${lang}/blog`} className="group relative text-xs font-black text-lobster uppercase tracking-widest hover:text-white transition-colors">
            {t('blog.viewJournal')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lobster transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8 lg:gap-y-16">
          <div className="hidden lg:block absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" aria-hidden="true" />
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/${lang}/blog/${blog.slug}`} className="block space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-black text-lobster uppercase tracking-[0.2em]">
                  <span>{blog.date}</span>
                  <span className="size-1 rounded-full bg-white/20"></span>
                  <span className="text-slate-500">{blog.category}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] group-hover:text-lobster transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed line-clamp-2">
                  {(blog.tags || []).join(' · ')}
                </p>
                <div className="pt-4 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
                </div>
              </Link>
              {idx < blogs.length - 1 && (
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:hidden" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0f0f0f] border border-white/10 flex flex-col items-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.1),transparent_50%)]"></div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none whitespace-pre-line relative z-10">
          {t('cta.title')}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 font-medium relative z-10">
          {t('cta.subtitle')}
        </p>
        <Link
          href={`/${lang}/about`}
          className="relative px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden group transition-all duration-300 shadow-2xl shadow-lobster/20 relative z-10"
        >
          <span className="absolute inset-0 bg-[#ff4500] transition-transform duration-500 ease-out group-hover:translate-y-full"></span>
          <span className="absolute inset-0 bg-white translate-y-[-100%] transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
          <span className="relative z-10 text-white group-hover:text-[#ff4500] transition-colors duration-500">
            {t('cta.button')}
          </span>
        </Link>
      </section>
    </main>
  );
}
