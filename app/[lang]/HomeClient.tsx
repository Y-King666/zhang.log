'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta, ProjectMeta } from '@/lib/content';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ProjectIcon from '@/components/ProjectIcon';
import { useEffect, useRef } from 'react';
import { getDisplayTag } from '@/lib/tag-display';

type Translate = (key: keyof Dictionary) => string;

function useScrollDir() {
  const dir = useRef<'down' | 'up'>('down');
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 2) dir.current = 'down';
      else if (y < lastY - 2) dir.current = 'up';
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return dir;
}

function ProjectsSideCard({ project, idx, lang, t }: { project: ProjectMeta; idx: number; lang: string; t: Translate }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const controls = useAnimation();
  const dir = useScrollDir();

  useEffect(() => {
    if (inView) {
      if (dir.current === 'down') {
        controls.start({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.9, delay: idx * 0.1 } });
      } else {
        controls.set({ y: 0, opacity: 0 });
        controls.start({ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } });
      }
    } else {
      controls.set({ opacity: 0, y: 20 });
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ x: 5, transition: { type: 'tween', duration: 0.18, ease: 'easeOut' } }}
      className={`edge-lit-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 group transition-colors relative md:p-4 md:flex-col md:items-stretch md:justify-between md:gap-0 md:basis-0 ${idx === 0 ? 'md:grow-[1.618]' : 'md:grow'}`}
    >
      <Link href={`/${lang}/projects/${project.slug}`} className="absolute inset-0 z-20" />
      <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-lobster/10 flex items-center justify-center group-hover:scale-110 transition-transform md:size-10 md:mb-2">
        <ProjectIcon name={project.icon} className="size-5 text-lobster" />
      </div>
      <div className="min-w-0 flex-1 md:flex-none md:w-full">
        <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2 group-hover:text-lobster transition-colors md:mb-2">{project.title}</h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1 line-clamp-1 md:mt-0 md:text-sm">{(project.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}</p>
      </div>
      <div className="shrink-0 inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:text-lobster group-hover:gap-3 transition-all md:mt-2">
        {t('blog.readMore')} <ArrowRight className="size-3.5 text-lobster md:size-4" />
      </div>
    </motion.div>
  );
}

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

  // 仪表板统计：阅读时长 = 全部文章 + 项目的 readTime 之和
  const totalReadMin = [...blogs, ...projects].reduce((sum, item) => {
    const m = item.readTime?.match(/\d+/);
    return sum + (m ? parseInt(m[0], 10) : 0);
  }, 0);
  const latestBlogs = blogs.slice(0, 2); // 首页博客区只展示最新两篇
  const techStack = [...new Set(projects.flatMap((p) => p.tags))].slice(0, 4);
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

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const projectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsScroll } = useScroll({ target: projectsRef, offset: ['start end', 'end start'] });
  const projectsY = useTransform(projectsScroll, [0, 1], [12, -12]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-32 pt-28 sm:pt-32 lg:pt-48 overflow-x-clip">
      {/* Hero Section */}
      <motion.div ref={heroRef} style={{ y: heroY }}>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative isolate grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 lg:mb-40"
      >
        <div className="lg:col-span-7 relative">
          {/* 背景 Z 形轮廓：形似闪电，缓慢不规则闪耀 */}
          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute w-full h-[200%] top-[-20%] -z-10 lg:hidden"
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

          <div className="space-y-10 pl-14 lg:pl-0">
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white">
              {t('hero.title')}<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lobster via-orange-400 to-lobster">
                {t('hero.subtitle')}
              </span>
            </motion.h1>
          </div>

          <div className="mt-2 ml-auto mr-14 lg:mt-10 lg:mr-0 lg:ml-0 lg:w-auto w-fit space-y-8 lg:space-y-10">

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 sm:gap-6">
              <Link
                href={`/${lang}/projects`}
                className="group relative flex items-center gap-3 bg-lobster text-white px-8 sm:px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,69,0,0.45)] active:brightness-90 transition-all duration-300 shadow-xl shadow-lobster/20"
              >
                <span className="relative z-10">{t('hero.viewProjects')}</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${lang}/blogs`}
                className="flex items-center gap-3 border-2 border-white/20 hover:border-lobster px-8 sm:px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 bg-white/5 text-white hover:bg-lobster/10 active:border-lobster active:bg-lobster/10"
              >
                {t('hero.readBlog')}
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-5 relative">
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.12),transparent_70%)] blur-3xl pointer-events-none"></div>
          <div className="relative h-full min-h-[380px] rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-500/70"></div>
                <div className="size-2.5 rounded-full bg-yellow-500/70"></div>
                <div className="size-2.5 rounded-full bg-green-500/70"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 ml-2 tracking-wide">zhang.log · agent status</span>
            </div>
            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">{projects.length}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase tracking-widest">{t('stats.projects')}</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">{blogs.length}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase tracking-widest">{t('stats.articles')}</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">{totalReadMin}<span className="text-sm text-slate-600 ml-0.5">min</span></div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase tracking-widest">{t('stats.readMin')}</div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
              <div className="space-y-2">
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-3">recent outputs</div>
                <div className="font-mono text-[11px] leading-relaxed"><span className="text-slate-600">$ </span><span className="text-slate-400">scan</span><span className="text-lobster"> project</span><span className="text-slate-600"> · </span><span className="text-slate-500">{projects.length} modules</span></div>
                <div className="font-mono text-[11px] leading-relaxed"><span className="text-slate-600">$ </span><span className="text-slate-400">build</span><span className="text-lobster"> blog</span><span className="text-slate-600"> · </span><span className="text-slate-500">{blogs.length} posts indexed</span></div>
                <div className="font-mono text-[11px] leading-relaxed"><span className="text-slate-600">$ </span><span className="text-slate-400">runtime</span><span className="text-lobster"> active</span><span className="text-slate-600"> · </span><span className="text-slate-500">{totalReadMin} min read</span><span className="inline-block w-1.5 h-3.5 bg-lobster/80 ml-0.5 align-middle animate-pulse"></span></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
              <div>
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-3">stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech, i) => (<span key={tech} className={`text-[9px] lg:text-[10px] font-mono px-2 py-0.5 rounded ${i < 3 ? 'text-lobster border border-lobster/30 bg-lobster/10' : 'text-slate-500 border border-white/8 bg-white/[0.02]'}`}>{getDisplayTag(tech, lang)}</span>))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/8 bg-white/[0.02]">
              <span className="text-[9px] font-mono text-slate-600">PID a7c3:AGENT</span>
              <div className="flex items-center gap-2"><div className="h-3 w-px bg-white/10"></div><span className="text-lg">🤖</span></div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      </motion.div>

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

        <motion.div ref={projectsRef} style={{ y: projectsY }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featured && (
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
              viewport={{ once: true, amount: 0.2 }}
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
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">{getDisplayTag(tag, lang)}</span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-lobster transition-colors">
                  {featured.title}
                </h3>
                <p className="text-slate-400 max-w-xl text-lg leading-relaxed mb-8">
                  {(featured.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}
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

          <div className="md:col-span-4 md:h-[600px] flex flex-col gap-8">
            {projects.filter(p => !p.featured).slice(0, 2).map((project, idx) => (
              <ProjectsSideCard key={project.slug} project={project} idx={idx} lang={lang} t={t} />
            ))}
          </div>
        </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="mb-16 lg:mb-32" id="blog">
        <div className="flex items-center gap-4 sm:gap-6 mb-12 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter md:whitespace-nowrap">{t('blog.latestInsights')}</h2>
          <div className="h-px flex-1 bg-white/10"></div>
          <Link href={`/${lang}/blogs`} className="group relative text-xs font-black text-lobster uppercase tracking-widest hover:text-white transition-colors">
            {t('blog.viewJournal')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lobster transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8 lg:gap-y-16">
          <div className="hidden lg:block absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" aria-hidden="true" />
          {latestBlogs.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/${lang}/blogs/${blog.slug}`} className="block space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-black text-lobster uppercase tracking-[0.2em]">
                  <span>{blog.date}</span>
                  <span className="size-1 rounded-full bg-white/20"></span>
                  <span className="text-slate-500">{blog.category}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] group-hover:text-lobster transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed line-clamp-2">
                  {(blog.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}
                </p>
                <div className="pt-4 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
                </div>
              </Link>
              {idx < latestBlogs.length - 1 && (
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:hidden" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-[24px] sm:py-[80px] md:py-[140px] lg:py-[200px] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0f0f0f] border border-white/10 flex flex-col items-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.1),transparent_50%)]"></div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-none whitespace-pre-line relative z-10">
          {t('cta.title')}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-6 sm:mb-8 font-medium relative z-10">
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
