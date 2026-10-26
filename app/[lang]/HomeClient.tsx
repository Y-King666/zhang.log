'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta, PracticeMeta } from '@/lib/content';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'motion/react';
import { useParallax } from '@/lib/use-parallax';
import { ArrowRight } from 'lucide-react';
import PracticeIcon from '@/components/PracticeIcon';
import { useEffect, useRef, useState } from 'react';
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

function PracticeSideCard({ project, idx, lang, t }: { project: PracticeMeta; idx: number; lang: string; t: Translate }) {
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
      <Link href={`/${lang}/practice/${project.slug}`} className="absolute inset-0 z-20" />
      <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-lobster/10 flex items-center justify-center group-hover:scale-110 transition-transform md:size-10 md:mb-2">
        <PracticeIcon name={project.icon} className="size-5 text-lobster" />
      </div>
      <div className="min-w-0 flex-1 md:flex-none md:w-full">
        <h3 className="t-item line-clamp-2 group-hover:text-lobster transition-colors md:mb-2">{project.title}</h3>
        <p className="t-meta mt-1 line-clamp-1 md:mt-0">{(project.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}</p>
      </div>
      <div className="t-action shrink-0 inline-flex items-center gap-2 text-white group-hover:text-lobster group-hover:gap-3 transition-all md:mt-2">
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
  featured: PracticeMeta | undefined;
  projects: PracticeMeta[];
  blogs: BlogMeta[];
}) {
  const t = (key: keyof Dictionary) => dict[key];
  // 标题按自身列宽等比取字号：中英各自最长的一行都刚好排满，三行断点因此始终成立
  // 上限是为了单列布局（<lg）时，标题不至于在宽屏窗口里长到喧宾夺主
  const heroTitleSize = lang === 'cn' ? 'text-[min(15cqw,7.5rem)]' : 'text-[min(11cqw,5.5rem)]';
  // 三行标题各带一个状态词：Agent 彩虹金属 / 想法 空心 / 现实 凝实
  const [line1Before, line1After] = t('hero.line1').split(t('hero.word.agent'));
  const [line2Before, line2After] = t('hero.line2').split(t('hero.word.idea'));
  const [line3Before, line3After] = t('hero.line3').split(t('hero.word.reality'));

  const latestBlogs = blogs.slice(0, 2); // 首页博客区只展示最新两篇
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
  const projectsY = useTransform(projectsScroll, [0, 1], [48, -48]);

  const blogPar = useParallax(48);
  const methodPar = useParallax(48);
  const ctaPar = useParallax(48);

  const [ctaRevealed, setCtaRevealed] = useState(false);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  const revealCta = (fromFocus = false) => {
    if (!fromFocus && !window.matchMedia('(hover: hover)').matches) return;
    const button = ctaButtonRef.current;
    const board = button?.closest('section') as HTMLElement | null;
    if (!button || !board) return;
    const boardRect = board.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    board.style.setProperty('--cta-x', (buttonRect.left + buttonRect.width / 2 - boardRect.left) + 'px');
    board.style.setProperty('--cta-y', (buttonRect.top + buttonRect.height / 2 - boardRect.top) + 'px');
    setCtaRevealed(true);
  };

  const hideCta = () => setCtaRevealed(false);

  const ctaRevealCopy = lang === 'en'
    ? {
        line1: 'BUILD',
        line2: 'BOLD',
        caption: 'WITH AGENTS / FROM IDEA TO SHIP',
        scope: '01 / SCOPE',
        ship: '02 / SHIP',
        status: 'READY TO SHIP',
      }
    : {
        line1: '构建',
        line2: '大胆作品',
        caption: '用 Agent 打造应用 / 从想法到上线',
        scope: '01 / 需求',
        ship: '02 / 交付',
        status: '准备上线',
      };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-24 pt-20 sm:pt-28 lg:pt-40 overflow-x-clip">
      {/* Hero Section */}
      <motion.div ref={heroRef} style={{ y: heroY }}>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative isolate grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-center mb-8 md:mb-12 lg:mb-28"
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
              d="M 13 15 L 87 15 L 13 62 L 87 62"
              stroke="url(#hero-z-grad)"
              strokeWidth="0.3"
              strokeOpacity="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#hero-z-glow)"
            />
          </motion.svg>

          <div className="[container-type:inline-size] space-y-6 md:space-y-10 text-center lg:text-left">
            <motion.h1 variants={itemVariants} className={`${heroTitleSize} font-black leading-[0.9] tracking-tighter text-white`}>
              {line1Before}
              <span className="agent-rainbow">{t('hero.word.agent')}</span>
              {line1After}
              <br />
              {line2Before}
              <span className="idea-outline">{t('hero.word.idea')}</span>
              {line2After}
              <br />
              {line3Before}
              <span className="reality-solid">{t('hero.word.reality')}</span>
              {line3After}
            </motion.h1>
          </div>

          <div className="mt-2 w-fit mx-auto lg:mt-10 lg:mx-0 lg:w-auto space-y-5 md:space-y-8 lg:space-y-10">

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 sm:gap-6">
              <Link
                href={`/${lang}/agents`}
                className="group relative flex items-center gap-3 bg-lobster text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm tracking-wider hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,69,0,0.45)] active:brightness-90 transition-all duration-300 shadow-lg shadow-lobster/10"
              >
                <span className="relative z-10">{t('nav.agents')}</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${lang}/practice`}
                className="flex items-center gap-3 border-2 border-white/20 hover:border-lobster px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm tracking-wider transition-all duration-300 bg-white/5 text-white hover:bg-lobster/10 active:border-lobster active:bg-lobster/10"
              >
                {t('hero.viewProjects')}
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-5 relative">
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.12),transparent_70%)] blur-3xl pointer-events-none"></div>
          {/* 虚线框是蓝图，视频卡自上而下扫过去盖住它，就是显影成实体 */}
          <div className="relative h-full min-h-[380px] rounded-3xl border border-dashed border-white/10">
            <div className="hero-develop absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
              <video className="absolute inset-0 h-full w-full object-cover" src="/videos/home_video.mp4" autoPlay muted loop playsInline />
            </div>
          </div>
        </motion.div>
      </motion.section>
      </motion.div>

      {/* Practice Section */}
      <section className="mb-10 md:mb-16 lg:mb-24" id="projects">
        <div className="mb-8 md:mb-12">
          <div className="t-meta mb-4">{t('projects.selectedWorks')}</div>
          <div className="flex items-center gap-4 sm:gap-6">
            <h2 className="t-section home-section-title shrink-0">{t('projects.title')}</h2>
            <div className="h-px flex-1 bg-white/[0.18]"></div>
            <Link
              href={`/${lang}/practice`}
              className="t-action group flex shrink-0 items-center gap-2 text-lobster hover:text-white transition-colors"
            >
              <span className="relative">
                {t('projects.viewAll')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lobster transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <motion.div ref={projectsRef} style={{ y: projectsY }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">
          {featured && (
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
              viewport={{ once: true, amount: 0.2 }}
              className="md:col-span-8 group relative aspect-[16/10] md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f0f] [container-type:inline-size]"
            >
              <Link href={`/${lang}/practice/${featured.slug}`} className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
              {featured.image && (
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-1000">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    priority
                    className="object-cover"
                  />
                </div>
              )}
              {/* 卡片保持 16/10 原比例；叠加正文整体按卡片宽度等比缩放（容器查询单位 cqw，
                  基准 4.6cqw ≈ 390px 屏下的原字号，1.75rem 封顶避免 640-767px 字过大），
                  纵向间距用 em，使「正文高度 / 卡片高度」在任何宽度下恒定（约 0.88），
                  因此缩窗口或浏览器放大时「精选 / 标签」不会被 overflow-hidden 裁掉。
                  md 起用 md: 前缀恢复原来的绝对尺寸，桌面端像素不变。 */}
              <div className="absolute bottom-0 left-0 z-20 w-full text-[min(4.6cqw,1.75rem)] md:text-base p-[0.85em] md:p-10">
                <div className="flex flex-wrap gap-[0.5em] mb-[1em] md:gap-3 md:mb-6">
                  <span className="px-3 py-1 rounded-full bg-lobster text-white text-[10px] font-bold tracking-widest">{t('projects.featured.tag')}</span>
                  {(featured.tags || []).slice(0, 1).map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-widest">{getDisplayTag(tag, lang)}</span>
                  ))}
                </div>
                <h3 className="text-[1.45em] leading-[1.35] md:text-3xl md:leading-[1.2] font-bold text-white mb-[0.6em] md:mb-4 group-hover:text-lobster transition-colors">
                  {featured.title}
                </h3>
                <p className="text-slate-400 max-w-xl text-[0.97em] leading-relaxed mb-[1.2em] md:text-base md:mb-8">
                  {(featured.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}
                </p>
                <Link
                  href={`/${lang}/practice/${featured.slug}`}
                  className="relative px-[2em] py-[1em] md:px-8 md:py-4 rounded-xl font-bold text-[0.73em] tracking-widest overflow-hidden group transition-all duration-300 shadow-xl shadow-lobster/20 inline-flex items-center gap-[1em] md:text-xs md:gap-3"
                >
                  <span className="absolute inset-0 bg-[#ff4500] transition-transform duration-500 ease-out group-hover:translate-y-full"></span>
                  <span className="absolute inset-0 bg-white translate-y-[-100%] transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                  <span className="relative z-10 text-white group-hover:text-[#ff4500] transition-colors duration-500 flex items-center gap-[1em] md:gap-3">
                    {t('blog.readMore')} <ArrowRight className="size-[1.33em] md:size-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}

          <div className="md:col-span-4 md:h-[500px] flex flex-col gap-4 md:gap-6">
            {projects.filter(p => !p.featured).slice(0, 2).map((project, idx) => (
              <PracticeSideCard key={project.slug} project={project} idx={idx} lang={lang} t={t} />
            ))}
          </div>
        </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <motion.section ref={blogPar.ref} style={{ y: blogPar.y }} className="mb-8 md:mb-12 lg:mb-20" id="blog">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 md:mb-12 lg:mb-20">
          <h2 className="t-section home-section-title">{t('blog.latestInsights')}</h2>
          <div className="h-px flex-1 bg-white/10"></div>
          <Link href={`/${lang}/blogs`} className="t-action group relative text-lobster hover:text-white transition-colors">
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
              <Link href={`/${lang}/blogs/${blog.slug}`} className="block space-y-4 md:space-y-6">
                <div className="t-meta flex items-center gap-4">
                  <span>{blog.date}</span>
                  <span className="size-1 rounded-full bg-white/20"></span>
                  <span className="text-slate-500">{blog.category}</span>
                </div>
                <h3 className="t-item group-hover:text-lobster transition-colors">
                  {blog.title}
                </h3>
                <p className="t-card line-clamp-2">
                  {(blog.tags || []).map((tag) => getDisplayTag(tag, lang)).join(' · ')}
                </p>
                <div className="t-action pt-4 flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                  {t('blog.readMore')} <ArrowRight className="size-4 text-lobster" />
                </div>
              </Link>
              {idx < latestBlogs.length - 1 && (
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:hidden" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section ref={methodPar.ref} style={{ y: methodPar.y }} className="mb-10 md:mb-16 lg:mb-24 border-b border-white/10 py-8 md:py-10 lg:py-10" aria-labelledby="method-title">
        {/* 头部与「最新博客」区块同构：标题 ——— 查看详情，右上角 01-04 为步骤范围。
            区块标题用 h2（aria-labelledby 指向它），灰色说明文字居中放在四张卡片下方。 */}
        <div className="flex items-center gap-4 sm:gap-6 mb-5 md:mb-6">
          <h2 id="method-title" className="t-section home-section-title shrink-0 whitespace-nowrap">{t('home.method.eyebrow')}</h2>
          <div className="h-px flex-1 bg-white/10"></div>
          <Link href={`/${lang}/agents`} className="t-action group relative shrink-0 text-lobster hover:text-white transition-colors">
            {t('blog.viewJournal')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lobster transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <div className="flex justify-end mb-8 md:mb-12 lg:mb-10">
          <span className="t-meta">01 — 04</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-6">
          {([
            ['home.method.context', 'home.method.context.desc'],
            ['home.method.decompose', 'home.method.decompose.desc'],
            ['home.method.boundaries', 'home.method.boundaries.desc'],
            ['home.method.verify', 'home.method.verify.desc'],
          ] as const).map(([title, desc], index) => (
            <div key={title} className="flex flex-col">
              <span className="t-meta"># {String(index + 1).padStart(2, '0')}</span>
              <h3 className="t-item mt-4 mb-3">
                {t(title)}
              </h3>
              <p className="t-card mb-6">{t(desc)}</p>
              <div className="relative flex-1 min-h-[220px] rounded-xl overflow-hidden">
                <Image
                  src={`/images/method/method-${String(index + 1).padStart(2, '0')}.png`}
                  alt={t(title)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="t-prose mt-8 md:mt-12 lg:mt-10 text-center">
          {t('home.method.title')}
        </p>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaPar.ref}
        style={{ y: ctaPar.y }}
        onMouseLeave={hideCta}
        className={'cta-board relative md:aspect-[16/9] py-8 sm:py-10 md:py-12 rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0f0f0f] border border-white/10 flex flex-col items-center justify-center text-center px-6' + (ctaRevealed ? ' is-revealed' : '')}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.1),transparent_50%)]"></div>

        <div className="cta-reveal" aria-hidden="true">
          <div className="cta-reveal-grid"></div>
          <div className="cta-reveal-glow"></div>
          <div className="cta-reveal-core"></div>
          <div className={'cta-reveal-word' + (lang === 'en' ? '' : ' cta-reveal-word--cn')}>
            <span>{ctaRevealCopy.line1}</span>
            <span className="cta-reveal-word-accent">{ctaRevealCopy.line2}</span>
          </div>
          <p className="cta-reveal-caption">{ctaRevealCopy.caption}</p>
          <div className="cta-reveal-card cta-reveal-card--scope">
            <div className="cta-reveal-card-head"><span>{ctaRevealCopy.scope}</span><span className="cta-reveal-led"></span></div>
            <div className="cta-reveal-lines"><i></i><i></i><i></i></div>
          </div>
          <div className="cta-reveal-card cta-reveal-card--ship">
            <div className="cta-reveal-card-head"><span>{ctaRevealCopy.ship}</span><span className="cta-reveal-led cta-reveal-led--teal"></span></div>
            <div className="cta-reveal-progress"><i></i></div>
            <span className="cta-reveal-status">{ctaRevealCopy.status}</span>
          </div>
        </div>

        <div className="cta-board-content relative z-20 flex flex-col items-center">
          <h2 className="t-section home-cta-title mb-4 sm:mb-6 whitespace-pre-line relative z-10">
            {t('cta.title')}
          </h2>
          <p className="t-prose max-w-xl mb-4 sm:mb-8 relative z-10">
            {t('cta.subtitle')}
          </p>
        </div>

        <Link
          ref={ctaButtonRef}
          href={'/' + lang + '/about'}
          onMouseEnter={() => revealCta()}
          onFocus={() => revealCta(true)}
          onBlur={hideCta}
          className="cta-board-button relative z-30 px-7 py-3 sm:px-9 sm:py-4 rounded-2xl font-bold text-sm tracking-[0.2em] overflow-hidden group transition-all duration-300 shadow-lg shadow-lobster/10"
        >
          <span className="absolute inset-0 bg-[#ff4500] transition-transform duration-500 ease-out group-hover:translate-y-full"></span>
          <span className="absolute inset-0 bg-white translate-y-[-100%] transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
          <span className="relative z-10 text-white group-hover:text-[#ff4500] transition-colors duration-500">
            {t('cta.button')}
          </span>
        </Link>
      </motion.section>
    </main>
  );
}
