'use client';

import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import type { PracticeMeta } from '@/lib/content';
import {
  MapPin,
  Mail,
  Globe,
  Github,
  Share2,
  Sparkles,
  Wrench,
  Code,
  ArrowRight,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import ParallaxSection from '@/components/ParallaxSection';

// 区块标题：龙虾色短线 + 标题 + 延伸细线；action 置于细线右端，用于「查看全部」类出口
function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-10">
      <div className="h-px w-12 bg-signal"></div>
      <h2 className="t-section">{children}</h2>
      <div className="h-px flex-1 bg-white/10"></div>
      {action}
    </div>
  );
}

export default function AboutClient({ dict, lang, projects }: { dict: Dictionary; lang: string; projects: PracticeMeta[] }) {
  const t = (key: keyof Dictionary) => dict[key];

  const socialLinks = [
    { icon: Mail, href: 'mailto:aremeny888@163.com', label: t('footer.social.email') },
    { icon: Github, href: 'https://github.com/Y-King666?tab=repositories', label: t('footer.social.github') },
    { icon: Globe, href: 'https://juejin.cn/user/1171439011504971', label: t('footer.social.website') },
  ];

  const workflow = [1, 2, 3, 4].map((n) => ({
    step: String(n).padStart(2, '0'),
    title: t(`about.workflow.step${n}.title` as keyof Dictionary),
    desc: t(`about.workflow.step${n}.desc` as keyof Dictionary),
  }));

  const capabilities = [
    {
      icon: Wrench,
      title: t('about.capabilities.deliver.title'),
      items: [
        t('about.capabilities.deliver.item1'),
        t('about.capabilities.deliver.item2'),
        t('about.capabilities.deliver.item3'),
      ],
    },
    {
      icon: Code,
      title: t('about.capabilities.management.title'),
      items: [
        t('about.capabilities.management.item1'),
        t('about.capabilities.management.item2'),
        t('about.capabilities.management.item3'),
      ],
    },
    {
      icon: Sparkles,
      title: t('about.capabilities.direction.title'),
      items: [
        t('about.capabilities.direction.item1'),
        t('about.capabilities.direction.item2'),
        t('about.capabilities.direction.item3'),
      ],
    },
  ];

  const timeline = [1, 2, 3, 4].map((n) => ({
    year: t(`about.timeline.e${n}.year` as keyof Dictionary),
    title: t(`about.timeline.e${n}.title` as keyof Dictionary),
    desc: t(`about.timeline.e${n}.desc` as keyof Dictionary),
    takeaway: t(`about.timeline.e${n}.takeaway` as keyof Dictionary),
  }));

  return (
    <MotionConfig reducedMotion="user">
      <main className="about-reskin cocoon-home max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-20 pt-20 sm:pt-28 lg:pt-40 flex flex-col items-center">
        <div className="w-full max-w-[960px]">
          <nav className="t-meta flex items-center gap-2 mb-6 sm:mb-8 lg:mb-12">
            <Link href={`/${lang}`} className="hover:text-signal transition-colors">
              {t('blog.detail.home')}
            </Link>
            <span className="size-1 rounded-full bg-signal"></span>
            <span className="text-slate-300">{t('nav.about')}</span>
          </nav>
        </div>
        <ParallaxSection className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <section className="flex flex-col gap-5 md:gap-10 items-center md:items-start mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center w-full">
              <motion.figure
                className="about-hero-figure w-full shrink-0 md:w-[20rem] lg:w-[28rem]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="about-orbit">
                  <svg className="about-orbit-lines" viewBox="0 0 520 400" fill="none" aria-hidden="true">
                    <path d="M0 57H222C246 57 260 80 260 110V156" />
                    <path d="M260 244V270C260 300 246 343 222 343H0" />
                    <path d="M308 200H440" />
                    <circle cx="260" cy="200" r="142" className="about-orbit-guide" />
                  </svg>
                  <div className="about-orbit-node about-orbit-node--brief">
                    <span className="about-orbit-node-dot" />
                    <span>{workflow[0].title}</span>
                  </div>
                  <div className="about-orbit-node about-orbit-node--execute">
                    <span className="about-orbit-node-dot" />
                    <span>{workflow[2].title}</span>
                  </div>
                  <div className="about-orbit-node about-orbit-node--verify">
                    <span className="about-orbit-node-dot" />
                    <span>{workflow[3].title}</span>
                  </div>
                  <div className="about-orbit-core">
                    <div className="about-orbit-core-ring">
                      <div
                        className="about-orbit-avatar"
                        style={{ backgroundImage: "url('/images/avatars/avatar.png?v=20261031')" }}
                        role="img"
                        aria-label={t('about.name')}
                      />
                    </div>
                  </div>
                </div>
              </motion.figure>
              <div className="flex flex-col gap-4 flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <h1 className="t-display mb-2">
                    {t('about.name')}
                  </h1>
                  <p className="t-item text-signal mb-3">{t('about.title')}</p>
                  <p className="t-prose max-w-xl mb-4">
                    {t('about.tagline')}
                  </p>
                  <div className="t-meta flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="size-5 text-signal" />
                      {t('about.location')}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-signal"></span>
                      {t('about.current')}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4 mt-6"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -3, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                      className="about-social-link group"
                      href={social.href}
                      aria-label={social.label}
                    >
                      <social.icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#0c0e0e] px-2.5 py-1 t-meta text-slate-200 opacity-0 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        {social.label}
                        <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-[#0c0e0e]"></span>
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-20">
            <SectionTitle>{t('about.me.title')}</SectionTitle>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="t-prose [text-indent:2em]"
            >
              {t('about.me.paragraph')}
            </motion.p>
          </section>

          <section className="mb-12 md:mb-20">
            <SectionTitle>{t('about.timeline.title')}</SectionTitle>
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-9 md:w-11 flex justify-center pointer-events-none">
                <div className="w-px bg-gradient-to-b from-signal via-white/15 to-transparent"></div>
              </div>
              <div className="space-y-4 md:space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-start gap-4 md:gap-6"
                  >
                    <div className="relative z-10 mt-1 size-9 md:size-11 shrink-0 rounded-full border border-signal/40 bg-[#0a0a0a] flex items-center justify-center">
                      <span className="size-2 rounded-full bg-signal"></span>
                    </div>
                    <div className="about-display-card about-display-card--timeline rounded-3xl p-4 md:p-6 flex-1">
                      <div className="t-meta mb-2">{item.year}</div>
                      <h3 className="t-item mb-2">{item.title}</h3>
                      <p className="t-card">{item.desc}</p>
                      <div className="mt-4 flex items-start gap-2 border-t border-white/5 pt-4">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal"></span>
                        <p className="t-card text-slate-300">{item.takeaway}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-20">
            <SectionTitle>{t('about.workflow.title')}</SectionTitle>
            <p className="t-prose text-slate-400 md:-mt-6 mb-8">{t('about.workflow.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {workflow.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="about-display-card about-display-card--process rounded-3xl p-4 md:p-6"
                >
                  <div className="about-display-index t-meta mb-2.5 md:mb-4">{item.step}</div>
                  <h3 className="t-item mb-2">{item.title}</h3>
                  <p className="t-card">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <Link href={`/${lang}/openclaw`} className="about-agent-entry">
              <span className="about-agent-entry-mark" aria-hidden="true">O/01</span>
              <span className="about-agent-entry-copy">
                <span className="about-agent-entry-title">{t('agents.page.openclaw.title')}</span>
                <span className="about-agent-entry-desc">{t('agents.page.openclaw.desc')}</span>
              </span>
              <span className="about-agent-entry-action">
                {t('agents.page.openclaw.cta')}
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </section>

          <section className="mb-12 md:mb-20">
            <SectionTitle>{t('about.capabilities.title')}</SectionTitle>
            <p className="t-prose text-slate-400 mb-8">
              {t('about.capabilities.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
              {capabilities.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="about-display-card about-display-card--capabilities p-4 md:p-8 rounded-[32px] flex items-start gap-4 md:block"
                >
                  {/* 小屏（<md）：图标在左、文字在右的横向卡片，比竖排省近一半高度；md 起恢复原来的竖排三列卡片 */}
                  <div className="about-capability-icon-shell size-12 md:size-14 shrink-0 rounded-2xl bg-signal/10 flex items-center justify-center md:mb-6">
                    <skill.icon className="size-6 md:size-7 text-signal" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="t-item mb-3 md:mb-4">{skill.title}</h3>
                    <ul className="space-y-2.5 md:space-y-3">
                      {skill.items.map((item, i) => (
                        <li key={i} className="t-card flex items-start md:items-center gap-3">
                          <span className="mt-1.5 md:mt-0 size-1.5 bg-signal/40 rounded-full shrink-0"></span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-12 md:mb-20">
            <SectionTitle>{t('about.exploration.title')}</SectionTitle>
            <div className="about-index-board">
              {[
                { num: '01', title: t('about.exploration.item1.title'), desc: t('about.exploration.item1.desc'), icon: Sparkles },
                { num: '02', title: t('about.exploration.item2.title'), desc: t('about.exploration.item2.desc'), icon: Share2 },
                { num: '03', title: t('about.exploration.item3.title'), desc: t('about.exploration.item3.desc'), icon: Wrench },
                { num: '04', title: t('about.exploration.item4.title'), desc: t('about.exploration.item4.desc'), icon: Code },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Number(item.num) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="about-index-entry"
                >
                  <div className="about-index-head">
                    <span className="about-index-number">{item.num}</span>
                    <item.icon className="about-index-icon size-6" />
                  </div>
                  <h3 className="t-item mb-2">{item.title}</h3>
                  <p className="t-card">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle
              action={
                <Link
                  href={`/${lang}/practice`}
                  className="t-action group flex shrink-0 items-center gap-2 transition-all duration-300 hover:text-signal"
                >
                  <span className="relative">
                    {t('about.practice.viewAll')}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-signal transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              }
            >
              {t('about.practice.title')}
            </SectionTitle>
            <div className="border-t border-white/5">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5"
                >
                  <Link
                    href={`/${lang}/practice/${project.slug}`}
                    prefetch={false}
                    className="about-practice-row group flex items-center gap-3 py-5 md:grid md:grid-cols-[6rem_1fr_auto_auto] md:items-center md:gap-6 md:py-6"
                    onPointerDown={(event) => {
                      event.currentTarget.dataset.pressed = 'true';
                    }}
                    onPointerUp={(event) => {
                      const row = event.currentTarget;
                      window.setTimeout(() => {
                        delete row.dataset.pressed;
                      }, 260);
                    }}
                    onPointerCancel={(event) => {
                      delete event.currentTarget.dataset.pressed;
                    }}
                    onPointerLeave={(event) => {
                      delete event.currentTarget.dataset.pressed;
                    }}
                  >
                    <span className="grid min-w-0 flex-1 grid-cols-1 gap-1 md:contents">
                      <span className="t-meta">
                        {project.date.slice(0, 7).replace('-', '.')}
                      </span>
                      <span className="t-item about-practice-title transition-colors group-hover:text-signal">
                        {project.title}
                      </span>
                      <span className="t-meta">
                        {project.scenario ?? project.tags.slice(0, 2).join(' · ')}
                      </span>
                    </span>
                    <ArrowRight className="about-practice-arrow size-4 shrink-0 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-signal" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </ParallaxSection>
      </main>
    </MotionConfig>
  );
}
