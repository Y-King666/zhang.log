'use client';

import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import { MapPin, Mail, Globe, Github, Share2, Sparkles, Users, Wrench, Code } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const t = (key: keyof Dictionary) => dict[key];

  const socialLinks = [
    { icon: Mail, href: 'mailto:aremeny888@163.com', label: t('footer.social.email') },
    { icon: Github, href: 'https://github.com/Y-King666?tab=repositories', label: t('footer.social.github') },
    { icon: Globe, href: 'https://juejin.cn/user/1171439011504971', label: t('footer.social.website') },
  ];

  return (
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
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <section className="flex flex-col gap-10 items-center md:items-start mb-20">
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
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXP2WgE-eBqiSDnE0pYx5tdhkwJJ5_NYvFynSNG66ERN5ivr547iFYga_Gr6xlNRNEUeTCxLGkzjVl-9Ir1VWlJBoI_Rh-Wu5jM4DWP6hbi0n9U27ZApt7o1Is9EONF9SuZRWrMMrpvMaNHUI0klc30Ua0N8shNn9mvYPklJrMbioWe2A4dMNskGBugREN3LmbjSoUMsOF6393BKYOwjVQ6m6Cy91MbgbaMuZ6NZVM0s9GvdfsYtLNZyGjxsQuOSoYT8i8k_nj82L7")',
                }}
              ></div>
            </motion.div>
            <div className="flex flex-col gap-4 flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none mb-2">
                  {t('about.name')}
                </h1>
                <p className="text-lobster text-2xl font-bold tracking-tight mb-4">{t('about.title')}</p>
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <MapPin className="size-5 text-lobster" />
                  <span>{t('about.location')}</span>
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
                  >
                    <social.icon className="size-6" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/10"></div>
            <h2 className="text-white text-3xl font-black tracking-tighter uppercase">{t('about.me.title')}</h2>
            <div className="h-px w-12 bg-lobster"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8 space-y-6">
              <p className="text-slate-300 text-xl leading-relaxed font-medium">
                {t('about.me.desc1')}
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('about.me.desc2')}
              </p>
              <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-wrap">
                {t('about.me.desc3')}
              </p>
            </div>
            <div className="md:col-span-4 bg-white/[0.02] border border-white/5 p-8 rounded-[32px] flex flex-col justify-center items-center text-center">
              <div className="text-lobster text-5xl font-black mb-2">3+</div>
              <div className="text-slate-500 text-xs font-black uppercase tracking-widest">{t('about.stats.years')}</div>
              <div className="h-px w-12 bg-white/10 my-6"></div>
              <div className="text-white text-5xl font-black mb-2">20+</div>
              <div className="text-slate-500 text-xs font-black uppercase tracking-widest">{t('about.stats.projects')}</div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-lobster"></div>
            <h2 className="text-white text-3xl font-black tracking-tighter uppercase">
              {t('about.skills.title')}
            </h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: t('about.skills.ui.title'), items: [t('about.skills.ui.item1'), t('about.skills.ui.item2'), t('about.skills.ui.item3')] },
              { icon: Users, title: t('about.skills.ai.title'), items: [t('about.skills.ai.item1'), t('about.skills.ai.item2'), t('about.skills.ai.item3')] },
              { icon: Wrench, title: t('about.skills.tech.title'), items: [t('about.skills.tech.item1'), t('about.skills.tech.item2'), t('about.skills.tech.item3')] }
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-lobster/30 transition-all group"
              >
                <div className="size-14 rounded-2xl bg-lobster/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <skill.icon className="size-7 text-lobster" />
                </div>
                <h3 className="text-white text-xl font-black mb-4">{skill.title}</h3>
                <ul className="space-y-3">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                      <span className="size-1.5 bg-lobster/40 rounded-full"></span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-white text-3xl font-black tracking-tighter uppercase">{t('about.exploration.title')}</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: t('about.exploration.item1.title'), desc: t('about.exploration.item1.desc'), icon: Sparkles, color: 'text-yellow-500' },
              { title: t('about.exploration.item2.title'), desc: t('about.exploration.item2.desc'), icon: Share2, color: 'text-blue-500' },
              { title: t('about.exploration.item3.title'), desc: t('about.exploration.item3.desc'), icon: Wrench, color: 'text-purple-500' },
              { title: t('about.exploration.item4.title'), desc: t('about.exploration.item4.desc'), icon: Code, color: 'text-emerald-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-lobster/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-lobster/10 text-lobster">
                    <item.icon className="size-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${item.color} animate-pulse`}></div>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Exploring</span>
                  </div>
                </div>
                <h3 className="text-white text-lg font-black mb-2 group-hover:text-lobster transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
