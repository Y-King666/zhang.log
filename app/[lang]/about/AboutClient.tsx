'use client';

import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
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
  ArrowUp,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import ParallaxSection from '@/components/ParallaxSection';

// 区块标题：龙虾色短线 + 大写标题 + 延伸细线，关于页各区块统一使用
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="h-px w-12 bg-lobster"></div>
      <h2 className="text-white text-3xl font-black tracking-tighter uppercase">{children}</h2>
      <div className="h-px flex-1 bg-white/10"></div>
    </div>
  );
}

export default function AboutClient({ dict, lang }: { dict: Dictionary; lang: string }) {
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
      icon: Sparkles,
      title: t('about.capabilities.direction.title'),
      items: [
        t('about.capabilities.direction.item1'),
        t('about.capabilities.direction.item2'),
        t('about.capabilities.direction.item3'),
      ],
    },
    {
      icon: Wrench,
      title: t('about.capabilities.deliver.title'),
      items: [
        t('about.capabilities.deliver.item1'),
        t('about.capabilities.deliver.item2'),
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
  ];

  const timeline = [1, 2, 3, 4].map((n) => ({
    year: t(`about.timeline.e${n}.year` as keyof Dictionary),
    title: t(`about.timeline.e${n}.title` as keyof Dictionary),
    desc: t(`about.timeline.e${n}.desc` as keyof Dictionary),
    takeaway: t(`about.timeline.e${n}.takeaway` as keyof Dictionary),
  }));

  return (
    <MotionConfig reducedMotion="user">
      <main className="max-w-6xl mx-auto px-6 pb-20 pt-40 flex flex-col items-center">
        <div className="w-full max-w-[960px]">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
            <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
              {t('blog.detail.home')}
            </Link>
            <span className="size-1 rounded-full bg-lobster"></span>
            <span className="text-slate-300">{t('nav.about')}</span>
          </nav>
        </div>
        <ParallaxSection className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <section className="flex flex-col gap-10 items-center md:items-start mb-20">
            <span id="about-hero" className="block scroll-mt-32"></span>
            <div className="flex flex-col md:flex-row gap-12 items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-lobster to-orange-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div
                  className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-48 md:size-56 ring-4 ring-white/10 shadow-2xl z-10"
                  style={{
                    backgroundImage:
                      'url("/images/avatars/avatar.png")',
                  }}
                ></div>
              </motion.div>
              <div className="flex flex-col gap-4 flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none mb-2">
                    {t('about.name')}
                  </h1>
                  <p className="text-lobster text-xl md:text-2xl font-bold tracking-tight mb-3">{t('about.title')}</p>
                  <p className="text-slate-200 text-lg font-medium leading-relaxed max-w-xl mb-4">
                    {t('about.tagline')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-slate-400 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="size-5 text-lobster" />
                      {t('about.location')}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-lobster"></span>
                      {t('about.current')}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 mt-4"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 69, 0, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-lobster transition-colors"
                      href={social.href}
                      aria-label={social.label}
                    >
                      <social.icon className="size-6" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <SectionTitle>{t('about.me.title')}</SectionTitle>
            <p className="text-slate-300 text-lg leading-loose font-medium [text-indent:2em] mb-8">
              {t('about.me.paragraph')}
            </p>
            <div className="mb-5">
              <h3 className="text-white text-lg font-black">{t('about.workflow.title')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-1">{t('about.workflow.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {workflow.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="edge-lit-card rounded-3xl p-6 group"
                >
                  <div className="font-mono text-xs text-lobster mb-5">{item.step}</div>
                  <h3 className="text-white text-base font-black mb-2 group-hover:text-lobster transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <SectionTitle>{t('about.capabilities.title')}</SectionTitle>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              {t('about.capabilities.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {capabilities.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="edge-lit-card p-8 rounded-[32px] transition-all group"
                >
                  <div className="size-14 rounded-2xl bg-lobster/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <skill.icon className="size-7 text-lobster" />
                  </div>
                  <h3 className="text-white text-xl font-black mb-4">{skill.title}</h3>
                  <ul className="space-y-3">
                    {skill.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                        <span className="size-1.5 bg-lobster/40 rounded-full shrink-0"></span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <SectionTitle>{t('about.timeline.title')}</SectionTitle>
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-9 md:w-11 flex justify-center pointer-events-none">
                <div className="w-px bg-gradient-to-b from-lobster via-white/15 to-transparent"></div>
              </div>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-start gap-4 md:gap-6"
                  >
                    <div className="relative z-10 mt-1 size-9 md:size-11 shrink-0 rounded-full border border-lobster/40 bg-[#0a0a0a] flex items-center justify-center">
                      <span className="size-2 rounded-full bg-lobster"></span>
                    </div>
                    <div className="edge-lit-card rounded-3xl p-6 flex-1 group">
                      <div className="text-lobster text-xs font-black tracking-[0.2em] mb-2">{item.year}</div>
                      <h3 className="text-white text-lg font-black mb-2 group-hover:text-lobster transition-colors">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      <div className="mt-4 flex items-start gap-2 border-t border-white/5 pt-4">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lobster"></span>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed">{item.takeaway}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-20">
            <SectionTitle>{t('about.exploration.title')}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { num: '01', title: t('about.exploration.item1.title'), desc: t('about.exploration.item1.desc'), icon: Sparkles },
                { num: '02', title: t('about.exploration.item2.title'), desc: t('about.exploration.item2.desc'), icon: Share2 },
                { num: '03', title: t('about.exploration.item3.title'), desc: t('about.exploration.item3.desc'), icon: Wrench },
                { num: '04', title: t('about.exploration.item4.title'), desc: t('about.exploration.item4.desc'), icon: Code },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  whileHover={{ y: -5 }}
                  className="edge-lit-card p-6 rounded-3xl transition-all group relative overflow-hidden"
                >
                  <span className="absolute -top-3 right-3 text-7xl font-black text-white/5 select-none pointer-events-none">{item.num}</span>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-lobster/10 text-lobster group-hover:scale-110 transition-transform">
                      <item.icon className="size-6" />
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="size-2 rounded-full bg-lobster animate-pulse"></div>
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('about.exploration.badge')}</span>
                    </div>
                  </div>
                  <h3 className="text-white text-lg font-black mb-2 group-hover:text-lobster transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0f0f0f] border border-white/10 py-16 sm:py-20 flex flex-col items-center text-center px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.12),transparent_50%)]"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-none whitespace-pre-line relative z-10">
              {t('about.cta.title')}
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mb-8 font-medium relative z-10">
              {t('about.cta.subtitle')}
            </p>
            <div className="grid gap-2 text-sm text-slate-300 max-w-2xl mb-8 relative z-10">
              <p>{t('about.cta.fit')}</p>
              <p className="text-slate-500">{t('about.cta.work')}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
              <a
                href="#about-hero"
                className="relative px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden group shadow-2xl shadow-lobster/20"
              >
                <span className="absolute inset-0 bg-[#ff4500] transition-transform duration-500 ease-out group-hover:translate-y-full"></span>
                <span className="absolute inset-0 bg-white translate-y-[-100%] transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                <span className="relative z-10 text-white group-hover:text-[#ff4500] transition-colors duration-500 inline-flex items-center gap-2">
                  <ArrowUp className="size-4" /> {t('about.cta.button')}
                </span>
              </a>
              <Link
                href={`/${lang}/practice`}
                className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl border border-white/10 text-slate-300 font-black text-sm uppercase tracking-[0.2em] hover:border-lobster/50 hover:text-lobster transition-colors"
              >
                {t('about.cta.secondary')} <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </ParallaxSection>
      </main>
    </MotionConfig>
  );
}
