'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Bot, Braces, CheckCircle2, ExternalLink, Globe2, ListTree, MessageSquare, Network, Search, Sparkles, Settings2, Workflow } from 'lucide-react';
import type { PracticeMeta } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n';
import type { FeaturedMcp, FeaturedSkill } from './page';
import { MotionConfig, motion } from 'motion/react';
import ParallaxSection from '@/components/ParallaxSection';
import CodeBlock from '@/components/CodeBlock';

const SCENARIOS = [
  { key: 'coding', icon: Braces },
  { key: 'creating', icon: Sparkles },
  { key: 'organizing', icon: Search },
  { key: 'automation', icon: Workflow },
] as const;

const PROMPT_PRINCIPLES = ['clarity', 'verification', 'scope'] as const;
const GITNEXUS_URL = 'https://github.com/abhigyanpatwari/GitNexus';
const KARPATHY_URL = 'https://github.com/multica-ai/andrej-karpathy-skills/tree/main';
const WORKING_STYLE = [
  { key: 'context', icon: MessageSquare },
  { key: 'decompose', icon: ListTree },
  { key: 'boundaries', icon: Settings2 },
  { key: 'verify', icon: CheckCircle2 },
] as const;

export default function AgentsClient({
  dict,
  lang,
  projects,
  globalPrompt,
  featuredSkills,
  featuredMcps,
}: {
  dict: Dictionary;
  lang: string;
  projects: PracticeMeta[];
  globalPrompt: string;
  featuredSkills: FeaturedSkill[];
  featuredMcps: FeaturedMcp[];
}) {
  const t = (key: keyof Dictionary) => dict[key];
  const latestProjects = projects.slice(0, 3);
  const skillCard = (skill: FeaturedSkill) => (
    <div key={skill.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="break-words text-base font-black leading-tight text-white">{skill.name}</h3>
        <BookOpen className="size-4 shrink-0 text-slate-500" />
      </div>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-400">{t(`agents.page.skills.featured.${skill.descriptionKey}.desc` as keyof Dictionary)}</p>
      <div className="border-t border-white/10 pt-3">
        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{t('agents.page.skills.structure')}</div>
        <p className="text-[11px] leading-5 text-slate-500">{t(`agents.page.skills.featured.${skill.structureKey}.structure` as keyof Dictionary)}</p>
      </div>
    </div>
  );
  const reveal = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const boot = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const cardReveal = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative max-w-7xl mx-auto px-6 pb-24 pt-36 lg:pt-44">
      <ParallaxSection>
      <motion.div
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={boot}
        className="pointer-events-none absolute left-6 right-6 top-28 h-px origin-left bg-gradient-to-r from-transparent via-lobster to-transparent shadow-[0_0_18px_rgba(255,69,0,0.9)] lg:top-36"
      />
      <motion.nav initial="hidden" animate="visible" variants={reveal} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-14">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">{t('blog.detail.home')}</Link>
        <span className="size-1 rounded-full bg-lobster" />
        <span className="text-slate-300">{t('nav.agents')}</span>
      </motion.nav>

      <motion.section initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="max-w-4xl mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          {t('agents.page.title').replace('Agents', '')}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-lobster via-orange-400 to-lobster">Agents</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">{t('agents.page.subtitle')}</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0 round 2rem)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0 round 2rem)' }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative overflow-hidden rounded-[2rem] border border-lobster/30 bg-[#110d0b] mb-24 group"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,100,40,0.22),transparent_45%)]" />
        <motion.div
          aria-hidden="true"
          initial={{ x: '-110%', opacity: 0 }}
          animate={{ x: '110%', opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.4, delay: 0.35, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-orange-300/20 to-transparent"
        />
        <div className="absolute right-8 top-8 text-[9rem] leading-none opacity-[0.06] select-none">🦞</div>
        <div className="relative grid lg:grid-cols-[1fr_0.85fr] gap-10 p-8 md:p-12 lg:p-16 items-end">
          <div>
            <div className="flex items-center gap-3 text-xs font-black text-orange-300 uppercase tracking-[0.25em] mb-7">
              <Bot className="size-4" /> {t('agents.page.openclaw.eyebrow')}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-5">{t('agents.page.openclaw.title')}</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-9">{t('agents.page.openclaw.desc')}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/openclaw`}
                className="group relative inline-flex items-center gap-3 bg-lobster text-white px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 shadow-xl shadow-lobster/20 hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,69,0,0.45)] active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110d0b]"
              >
                <span className="relative z-10">{t('agents.page.openclaw.cta')}</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="border-l border-white/10 pl-6 lg:pl-10 space-y-5">
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{t('agents.page.openclaw.mapLabel')}</div>
            {(['overview', 'start', 'experience', 'workflow', 'config'] as const).map((item, index) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300"><span className="font-mono text-lobster">0{index + 1}</span>{t(`agents.page.openclaw.map.${item}` as keyof Dictionary)}</div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="codex-setup" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.14 }} className="mb-24">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-black text-lobster tracking-[0.3em] mb-3">{t('agents.page.codex.eyebrow')}</p>
            <h2 className="max-w-3xl text-4xl md:text-5xl font-black tracking-tighter text-white">
              {t('agents.page.codex.title')}
              <span className="mt-1 block font-mono text-[0.62em] font-bold tracking-normal text-lobster/80">{t('agents.page.codex.files')}</span>
            </h2>
          </div>
          <div className="sm:text-right">
            <p className="text-base leading-relaxed text-slate-400">{t('agents.page.codex.desc')}</p>
            <a href={KARPATHY_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-lobster transition-colors hover:text-white">
              {t('agents.page.codex.reference')}
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROMPT_PRINCIPLES.map((key, index) => (
            <div key={key} className="display-panel rounded-2xl p-5">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-lobster">0{index + 1}</span>
                <CheckCircle2 className="size-4 text-slate-500" />
              </div>
              <h3 className="mb-2 text-lg font-black text-white">{t(`agents.page.codex.principle.${key}.title` as keyof Dictionary)}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{t(`agents.page.codex.principle.${key}.desc` as keyof Dictionary)}</p>
            </div>
          ))}
        </div>
        <CodeBlock>
          <code>{globalPrompt}</code>
        </CodeBlock>
      </motion.section>

      <motion.section id="working-style" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.2 }} className="mb-24">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black tracking-[0.3em] text-lobster">{t('agents.page.method.eyebrow')}</p>
            <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl">{t('agents.page.method.title')}</h2>
          </div>
          <p className="text-base leading-relaxed text-slate-400 sm:text-right">{t('agents.page.method.desc')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WORKING_STYLE.map(({ key, icon: Icon }, index) => (
            <div key={key} className="relative border-t border-white/15 pt-5">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-lobster">0{index + 1}</span>
                <Icon className="size-4 text-slate-500" />
              </div>
              <h3 className="mb-2 text-lg font-black text-white">{t(`agents.page.method.${key}.title` as keyof Dictionary)}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{t(`agents.page.method.${key}.desc` as keyof Dictionary)}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section id="gitnexus" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.22 }} className="mb-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-black tracking-[0.3em] text-lobster">{t('agents.page.gitnexus.eyebrow')}</p>
            <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl">{t('agents.page.gitnexus.title')}</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-slate-400 sm:text-right">{t('agents.page.gitnexus.desc')}</p>
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-2xl border border-lobster/30 bg-[#110d0b] p-6 sm:p-8">
            <div className="absolute right-5 top-4 font-mono text-7xl font-black leading-none text-lobster/10">GN</div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-orange-300">
                <Network className="size-4" /> {t('agents.page.gitnexus.badge')}
              </div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-lg border border-lobster/25 bg-lobster/10 px-2.5 py-1 font-mono text-[11px] tracking-wider text-lobster/90">
                {t('agents.page.gitnexus.cliMcp')}
              </span>
              <p className="max-w-xl text-lg leading-relaxed text-slate-200">{t('agents.page.gitnexus.about')}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={GITNEXUS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-lobster px-4 py-2.5 text-sm font-black text-white transition hover:brightness-110">
                  {t('agents.page.gitnexus.repository')} <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'CLI', label: t('agents.page.gitnexus.stat.cli') },
              { value: 'MCP', label: t('agents.page.gitnexus.stat.mcp') },
              { value: 'Graph', label: t('agents.page.gitnexus.stat.graph') },
              { value: 'Map', label: t('agents.page.gitnexus.stat.map') },
            ].map(({ value, label }) => (
              <div key={label} className="display-panel rounded-2xl p-5">
                <div className="mb-6 font-mono text-2xl font-black text-lobster">{value}</div>
                <p className="text-xs leading-relaxed text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="size-2 rounded-full bg-lobster shadow-[0_0_10px_#ff4500]" />
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white">{t('agents.page.gitnexus.workflow.title')}</h3>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-400">{t('agents.page.gitnexus.workflow.desc')}</p>
          <div className="grid gap-4 md:grid-cols-4">
            {(['index', 'understand', 'impact', 'verify'] as const).map((key, index) => (
              <div key={key} className="border-t border-lobster/30 pt-4">
                <div className="mb-6 font-mono text-xs text-lobster">0{index + 1}</div>
                <h3 className="mb-2 text-base font-black text-white">{t(`agents.page.gitnexus.workflow.${key}.title` as keyof Dictionary)}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{t(`agents.page.gitnexus.workflow.${key}.desc` as keyof Dictionary)}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="mcps" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.26 }} className="mb-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-black tracking-[0.3em] text-secondary">{t('agents.page.mcp.eyebrow')}</p>
            <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl">{t('agents.page.mcp.title')}</h2>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="max-w-lg text-sm leading-relaxed text-slate-400 sm:text-right">{t('agents.page.mcp.desc')}</p>
            <a href="https://github.com/punkpeye/awesome-mcp-servers" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-white">
              {t('agents.page.mcp.more')} <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredMcps.map((mcp) => {
            const Icon = mcp.name.startsWith('Playwright') ? Globe2 : Network;
            return (
              <article key={mcp.name} className="rounded-2xl border border-secondary/20 bg-secondary/[0.04] p-6 transition-colors hover:border-secondary/40 hover:bg-secondary/[0.07]">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary"><Icon className="size-4" /></div>
                    <div>
                      <h3 className="text-lg font-black text-white">{mcp.name}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">MCP / {t('agents.page.mcp.entry')}</span>
                    </div>
                  </div>
                  <a href={mcp.url} target="_blank" rel="noreferrer" aria-label={`${mcp.name} ${t('agents.page.mcp.official')}`} className="text-slate-500 transition-colors hover:text-secondary"><ExternalLink className="size-4" /></a>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">{t(`agents.page.mcp.item.${mcp.descriptionKey}.desc` as keyof Dictionary)}</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{t('agents.page.mcp.when')}</div>
                  <p className="text-xs leading-6 text-slate-500">{t(`agents.page.mcp.item.${mcp.useKey}.use` as keyof Dictionary)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section id="featured-skills" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.3 }} className="mb-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-black tracking-[0.3em] text-slate-400">{t('agents.page.skills.eyebrow')}</p>
            <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl">{t('agents.page.skills.title')}</h2>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="max-w-sm text-sm leading-relaxed text-slate-500 sm:text-right">{t('agents.page.skills.desc')}</p>
            <a href="https://skills.sh/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
              {t('agents.page.skills.market')} <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          <span className="size-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white">{t('agents.page.skills.category.featured')}</h3>
          <span className="h-px flex-1 bg-white/10" />
          <a href="https://github.com/ComposioHQ/awesome-claude-skills" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
            {t('agents.page.skills.community')} <ExternalLink className="size-3.5" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSkills.map(skillCard)}
        </div>
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="mb-24">
        <div className="flex items-end justify-between mb-10"><div><p className="text-xs font-black text-lobster tracking-[0.3em] mb-3">{t('agents.page.scenarios.eyebrow')}</p><h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{t('agents.page.scenarios.title')}</h2></div></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIOS.map(({ key, icon: Icon }) => (
            <motion.div key={key} variants={cardReveal} whileHover={{ y: -4 }} className="relative display-panel rounded-2xl p-6 min-h-44 group">
              <Link href={`/${lang}/practice?scenario=${key}`} className="absolute inset-0 z-20" aria-label={t(`agents.page.scenarios.${key}` as keyof Dictionary)} />
              <Icon className="size-6 text-lobster mb-8 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-black text-white mb-2 transition-colors group-hover:text-lobster">{t(`agents.page.scenarios.${key}` as keyof Dictionary)}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t(`agents.page.scenarios.${key}.desc` as keyof Dictionary)}</p>
              <ArrowRight className="absolute bottom-5 right-5 size-4 text-lobster transition-all duration-300 group-hover:translate-x-1" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.32 }}>
        <div className="flex items-end justify-between gap-6 mb-10"><h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{t('agents.page.articles.title')}</h2><Link href={`/${lang}/practice`} className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-lobster transition-colors">{t('agents.page.articles.viewAll')} <ArrowRight className="size-4" /></Link></div>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.38 } } }} className="divide-y divide-white/10 border-y border-white/10">
          {latestProjects.map((project) => (
            <motion.div key={project.slug} variants={reveal}>
              <Link href={`/${lang}/practice/${project.slug}`} className="group py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div><h3 className="text-xl md:text-2xl font-black text-white group-hover:text-lobster transition-colors">{project.title}</h3></div>
              <ArrowRight className="size-5 text-lobster shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
          {latestProjects.length === 0 && <p className="py-10 text-slate-500">{t('agents.page.articles.empty')}</p>}
        </motion.div>
      </motion.section>
      </ParallaxSection>
      </main>
    </MotionConfig>
  );
}
