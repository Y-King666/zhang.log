'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta, PracticeMeta } from '@/lib/content';
import type { FeaturedMcp, FeaturedSkill } from '@/lib/agent-content';
import AgentExperience from '@/components/AgentExperience';
import ProgressiveImage from '@/components/ProgressiveImage';
import { SCENARIO_KEYS, SCENARIO_SET } from '@/lib/scenarios';
import { getDisplayTag } from '@/lib/tag-display';

type Translate = (key: keyof Dictionary) => string;

function useGradientPanelMotion(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  const maxWidth = useMotionValue(1120);
  const radius = useMotionValue(16);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element) return;

      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const top = element.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, top - viewportHeight * 0.82);
      const end = Math.max(start + 160, top - 112);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const initialWidth = Math.min(1120, viewportWidth);

      progress.set(next);
      maxWidth.set(initialWidth + (viewportWidth - initialWidth) * next);
      radius.set(16 * (1 - next));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [maxWidth, progress, radius, ref]);

  return { progress, maxWidth, radius };
}

function HeroOrbit({
  labels,
  reducedMotion,
  progress,
  radius,
}: {
  labels: { idea: string; agent: string; reality: string };
  reducedMotion: boolean;
  progress: MotionValue<number>;
  radius: MotionValue<number>;
}) {
  const pointOnPath = (value: number, yOffset = 0) => {
    const clamped = Math.min(1, Math.max(0, value));
    const segment = clamped <= 0.5 ? 0 : 1;
    const t = segment === 0 ? clamped * 2 : (clamped - 0.5) * 2;
    const start = segment === 0 ? [62, 296] : [292, 210];
    const controlA = segment === 0 ? [122, 138] : [350, 316];
    const controlB = segment === 0 ? [227, 92] : [422, 314];
    const end = segment === 0 ? [292, 210] : [466, 154];
    const inverse = 1 - t;

    return {
      x:
        inverse ** 3 * start[0] +
        3 * inverse ** 2 * t * controlA[0] +
        3 * inverse * t ** 2 * controlB[0] +
        t ** 3 * end[0],
      y:
        inverse ** 3 * start[1] +
        3 * inverse ** 2 * t * controlA[1] +
        3 * inverse * t ** 2 * controlB[1] +
        t ** 3 * end[1] +
        yOffset,
    };
  };

  const smoothProgress = useSpring(progress, { stiffness: 150, damping: 28, mass: 0.35 });
  const dotProgress = reducedMotion ? progress : smoothProgress;
  const trailProgress = useTransform(dotProgress, (value) => Math.max(0, value - 0.09));
  const leadX = useTransform(dotProgress, (value) => pointOnPath(value).x);
  const leadY = useTransform(dotProgress, (value) => pointOnPath(value).y);
  const trailX = useTransform(trailProgress, (value) => pointOnPath(value, 14).x + 1);
  const trailY = useTransform(trailProgress, (value) => pointOnPath(value, 14).y);
  const focusOpacity = useTransform(dotProgress, [0, 0.5, 1], [0.35, 1, 0.55]);
  const washOpacity = useTransform(dotProgress, [0, 0.55, 1], [0.48, 0.76, 1]);

  return (
    <motion.div
      data-gradient-panel
      className="relative h-[clamp(360px,52vw,600px)] w-full overflow-hidden"
      style={{ borderRadius: radius }}
    >
      <motion.div
        aria-hidden="true"
        data-gradient-wash
        className="absolute inset-0"
        style={{
          opacity: washOpacity,
          background:
            'linear-gradient(to top, rgba(128,134,145,0.32), rgba(128,134,145,0.09) 58%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.055),transparent_52%)]"
        style={{ opacity: focusOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(241,241,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(241,241,238,0.06) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage: 'radial-gradient(circle at center, black 10%, transparent 72%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-[520/420] w-full max-w-[720px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 520 420"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
        <path
          d="M62 296 C122 138 227 92 292 210 C350 316 422 314 466 154"
          stroke="rgba(241,241,238,0.06)"
          strokeWidth="22"
        />
        <motion.path
          d="M62 296 C122 138 227 92 292 210 C350 316 422 314 466 154"
          stroke="rgba(241,241,238,0.58)"
          strokeWidth="1.15"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] as const }}
        />
        <motion.path
          d="M62 296 C122 138 227 92 292 210 C350 316 422 314 466 154"
          stroke="rgba(241,241,238,0.22)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 10"
          transform="translate(1 14)"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.7, delay: reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
        />
        <circle cx="62" cy="296" r="5" fill="#f1f1ee" />
        <circle cx="466" cy="154" r="5" fill="#f1f1ee" />
        <motion.circle data-travel-dot="trail" cx={trailX} cy={trailY} r="4" fill="#ff5a24" />
        <motion.circle data-travel-dot="lead" cx={leadX} cy={leadY} r="7" fill="#ff5a24" />
        <motion.circle
          cx={leadX}
          cy={leadY}
          r="16"
          fill="none"
          stroke="rgba(255,90,36,0.38)"
          strokeWidth="1"
        />
          </svg>

          <div className="absolute bottom-[22%] left-[7%]">
            <span className="mb-1 block font-mono text-[9px] tracking-[0.16em] text-fog">01</span>
            <span className="text-sm text-paper">{labels.idea}</span>
          </div>
          <div className="absolute left-1/2 top-[49%] -translate-x-1/2 translate-y-5 text-center">
            <span className="mb-1 block font-mono text-[9px] tracking-[0.16em] text-signal">02</span>
            <span className="text-sm font-medium text-paper">{labels.agent}</span>
          </div>
          <div className="absolute right-[7%] top-[27%] text-right">
            <span className="mb-1 block font-mono text-[9px] tracking-[0.16em] text-fog">03</span>
            <span className="text-sm text-paper">{labels.reality}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProject({
  project,
  lang,
  t,
}: {
  project: PracticeMeta;
  lang: string;
  t: Translate;
}) {
  return (
    <Link
      href={`/${lang}/practice/${project.slug}`}
      prefetch={false}
      className="group grid overflow-hidden rounded-xl border border-rule transition-colors hover:border-fog/30 md:grid-cols-12"
    >
      <div className="flex flex-col justify-between gap-6 px-6 py-9 sm:px-8 md:col-span-5 md:py-10 md:pr-10">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.filter((tag) => !SCENARIO_SET.has(tag)).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-rule px-2.5 py-1 text-[10px] text-fog"
              >
                {getDisplayTag(tag, lang)}
              </span>
            ))}
          </div>
          <h3 className="max-w-md text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.055em] text-paper">
            {project.title}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-7 text-fog">{project.scenario}</p>
        </div>
        <div className="mt-7 flex items-center justify-between gap-5 pt-5 text-sm">
          <span className="text-fog">
            {project.date} / {project.readTime}
          </span>
          <span className="flex items-center gap-2 text-paper">
            {t('blog.readMore')}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {project.image && (
        <div className="p-4 sm:p-5 md:col-span-7 md:self-center">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-surface">
            <ProgressiveImage
              src={project.image}
              alt={project.title}
              fill
              priority
              blurDataURL={project.imageBlur}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.012]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          </div>
        </div>
      )}
    </Link>
  );
}

export default function HomeClient({
  dict,
  lang,
  featured,
  projects,
  blogs,
  globalPrompt,
  featuredSkills,
  featuredMcps,
}: {
  dict: Dictionary;
  lang: string;
  featured: PracticeMeta | undefined;
  projects: PracticeMeta[];
  blogs: BlogMeta[];
  globalPrompt: string;
  featuredSkills: FeaturedSkill[];
  featuredMcps: FeaturedMcp[];
}) {
  const t = (key: keyof Dictionary) => dict[key];
  const reducedMotion = useReducedMotion() ?? false;
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitMotion = useGradientPanelMotion(orbitRef);
  const [ctaRevealed, setCtaRevealed] = useState(false);
  const ctaStageRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  // 指针进入按钮时，把按钮中心换算成舞台内的坐标，写进 --cta-x / --cta-y，
  // 让 --cta-x / --cta-y 决定的那圈展开动画从按钮身上长出来。
  const revealCta = (fromFocus = false) => {
    if (!fromFocus && !window.matchMedia('(hover: hover)').matches) return;
    const stage = ctaStageRef.current;
    const button = ctaButtonRef.current;
    if (!stage || !button) return;
    const stageRect = stage.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    stage.style.setProperty('--cta-x', buttonRect.left + buttonRect.width / 2 - stageRect.left + 'px');
    stage.style.setProperty('--cta-y', buttonRect.top + buttonRect.height / 2 - stageRect.top + 'px');
    setCtaRevealed(true);
  };

  const hideCta = () => setCtaRevealed(false);

  const ctaRevealCopy =
    lang === 'cn'
      ? {
          line1: '构建',
          line2: '大胆作品',
          caption: '用 Agent 打造应用 / 从想法到上线',
          scope: '01 / 需求',
          ship: '02 / 交付',
          status: '准备上线',
        }
      : {
          line1: 'BUILD',
          line2: 'BOLD',
          caption: 'WITH AGENTS / FROM IDEA TO SHIP',
          scope: '01 / SCOPE',
          ship: '02 / SHIP',
          status: 'READY TO SHIP',
        };

  const latestBlogs = blogs.slice(0, 3);
  const projectIndex = projects.filter((project) => project.slug !== featured?.slug).slice(0, 3);
  const availableScenarioKeys = SCENARIO_KEYS.filter((key) =>
    projects.some((project) => project.tags.includes(key))
  );
  const heroIntro =
    lang === 'cn'
      ? '记录我用 Agent 将问题推进到可用产品的过程。这里呈现项目、方法与验证记录，而不只是最后的结果。'
      : 'A working record of how I use agents to move from an open question to a tested, usable product.';
  const heroSignals =
    lang === 'cn'
      ? ['Agent 工作流', '快速原型', '过程记录']
      : ['Agent workflows', 'Rapid prototypes', 'Working notes'];

  return (
    <main className="cocoon-home overflow-x-clip bg-ink text-paper">
      <section className="pb-10 pt-28 sm:pt-36 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
          <div className="max-w-[900px]">
            <p className="mb-8 font-mono text-[10px] tracking-[0.16em] text-fog">
              {lang === 'cn' ? '个人实践记录 / 2026' : 'Personal field log / 2026'}
            </p>
            <h1 className="text-[clamp(3.2rem,7.2vw,6.35rem)] font-medium leading-[0.94] tracking-[-0.07em] text-paper">
              <span className="block">{t('hero.line1')}</span>
              <span className="block">{t('hero.line2')}</span>
              <span className="block">{t('hero.line3')}</span>
            </h1>
          </div>

          <div className="mt-8 grid gap-7 md:grid-cols-12 md:items-end md:gap-8">
            <p className="max-w-[600px] text-base leading-8 text-fog sm:text-lg md:col-span-7">
              {heroIntro}
            </p>
            <div className="md:col-span-4 md:col-start-9">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/${lang}/practice`}
                  className="group inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
                >
                  {t('hero.viewProjects')}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`/${lang}/blogs`}
                  className="inline-flex items-center rounded-full border border-rule px-5 py-3 text-sm text-paper transition-colors hover:border-fog"
                >
                  {t('hero.readBlog')}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-fog">
                {heroSignals.map((signal) => (
                  <span key={signal} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-rule" />
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          data-gradient-panel-wrap
          ref={orbitRef}
          className="mx-auto mt-12 px-5 sm:mt-16 sm:px-6"
          style={{ maxWidth: orbitMotion.maxWidth }}
        >
          <HeroOrbit
            reducedMotion={reducedMotion}
            progress={orbitMotion.progress}
            radius={orbitMotion.radius}
            labels={{
              idea: t('hero.word.idea'),
              agent: t('hero.word.agent'),
              reality: t('hero.word.reality'),
            }}
          />
        </motion.div>
      </section>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <section className="grid gap-8 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-medium leading-tight tracking-[-0.04em] text-paper">
              {t('home.method.title')}
            </h2>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <p className="text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.48] tracking-[-0.025em] text-paper">
              {t('about.workflow.subtitle')}
            </p>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="mb-3 text-xs text-fog">{t('projects.selectedWorks')}</p>
              <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-paper">
                {t('projects.title')}
              </h2>
            </div>
            <Link
              href={`/${lang}/practice`}
              className="group hidden items-center gap-2 pb-1 text-sm text-fog transition-colors hover:text-paper sm:flex"
            >
              {t('projects.viewAll')}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {featured && <FeaturedProject project={featured} lang={lang} t={t} />}

          {projectIndex.length > 0 && (
            <div>
              {projectIndex.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/${lang}/practice/${project.slug}`}
                  prefetch={false}
                  className="home-project-row group -ml-3 grid gap-3 py-6 pl-3 md:grid-cols-12 md:items-center md:gap-6 md:py-7"
                >
                  <span className="home-project-index font-mono text-[10px] text-fog md:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="home-project-title text-xl font-medium tracking-[-0.03em] text-paper md:col-span-6">
                    {project.title}
                  </h3>
                  <p className="text-xs text-fog md:col-span-3">
                    {project.tags.filter((tag) => !SCENARIO_SET.has(tag)).map((tag) => getDisplayTag(tag, lang)).join(' / ')}
                  </p>
                  <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                    <span className="font-mono text-[10px] text-fog">{project.date}</span>
                    <ArrowUpRight className="home-project-arrow size-4 text-paper" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="cocoon-agent-shell">
          <AgentExperience
            dict={dict}
            lang={lang}
            globalPrompt={globalPrompt}
            featuredSkills={featuredSkills}
            featuredMcps={featuredMcps}
            scenarioKeys={availableScenarioKeys}
          />
        </div>

        <section id="blog" className="scroll-mt-24 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-paper">
              {t('blog.latestInsights')}
            </h2>
            <Link
              href={`/${lang}/blogs`}
              className="group flex shrink-0 items-center gap-2 pb-1 text-sm text-fog transition-colors hover:text-paper"
            >
              {t('blog.viewJournal')}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div>
            {latestBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/${lang}/blogs/${blog.slug}`}
                prefetch={false}
                className="group grid gap-4 py-7 md:grid-cols-12 md:items-start md:gap-6"
              >
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-fog md:col-span-2 md:block">
                  <time dateTime={blog.date}>{blog.date}</time>
                  <span className="md:mt-2 md:block">
                    {t(`blog.category.${blog.category}` as keyof Dictionary)}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-xl font-medium leading-snug tracking-[-0.025em] text-paper transition-colors group-hover:text-signal md:text-2xl">
                    {blog.title}
                  </h3>
                  {blog.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-fog">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>#{getDisplayTag(tag, lang)}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-fog md:col-span-2 md:pt-1">
                  {t('blog.readTime.format').replace('{n}', blog.readTime || '—')}
                </p>
                <div className="flex justify-end md:col-span-1">
                  <ArrowUpRight className="size-4 text-fog transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          ref={ctaStageRef}
          className={`home-cta-stage py-20 text-center md:py-32${ctaRevealed ? ' is-revealed' : ''}`}
          onMouseLeave={hideCta}
        >
          <div className="home-cta-stage-content">
            <span className="mx-auto mb-7 block size-2 rounded-full bg-signal" aria-hidden="true" />
            <h2 className="mx-auto max-w-4xl whitespace-pre-line text-[clamp(2.7rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.065em] text-paper">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-fog">{t('cta.subtitle')}</p>
          </div>

          <div className="home-cta-reveal" aria-hidden="true">
            <div className="home-cta-reveal-grid" />
            <div className="home-cta-reveal-glow" />
            <div className="home-cta-reveal-word">
              <span>{ctaRevealCopy.line1}</span>
              <span className="home-cta-reveal-word-accent">{ctaRevealCopy.line2}</span>
            </div>
            <p className="home-cta-reveal-caption">{ctaRevealCopy.caption}</p>
            <div className="home-cta-card home-cta-card--scope">
              <div className="home-cta-card-head">
                <span>{ctaRevealCopy.scope}</span>
                <i className="home-cta-led" />
              </div>
              <div className="home-cta-card-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="home-cta-card home-cta-card--ship">
              <div className="home-cta-card-head">
                <span>{ctaRevealCopy.ship}</span>
                <i className="home-cta-led home-cta-led--muted" />
              </div>
              <div className="home-cta-card-progress">
                <i />
              </div>
              <span className="home-cta-card-status">{ctaRevealCopy.status}</span>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <Link
              ref={ctaButtonRef}
              href={`/${lang}/about`}
              onMouseEnter={() => revealCta()}
              onFocus={() => revealCta(true)}
              onBlur={hideCta}
              className="home-cta-button group relative z-30 inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink"
            >
              {t('cta.button')}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
