'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Bot, Braces, CheckCircle2, ExternalLink, Globe2, Network, Search, Sparkles, Workflow } from 'lucide-react';
import { getOpenClawContent, type Dictionary } from '@/lib/i18n';
import type { FeaturedMcp, FeaturedSkill } from '@/lib/agent-content';
import { MotionConfig, motion, useInView } from 'motion/react';
import CodeBlock from '@/components/CodeBlock';
import ProgressiveImage from '@/components/ProgressiveImage';
import { SCENARIO_KEYS } from '@/lib/scenarios';

const SCENARIO_ICONS = { coding: Braces, creating: Sparkles, organizing: Search, automation: Workflow } as const;
const SCENARIOS = SCENARIO_KEYS.map((key) => ({ key, icon: SCENARIO_ICONS[key] }));

const PROMPT_PRINCIPLES = ['clarity', 'verification', 'scope'] as const;
const GITNEXUS_URL = 'https://github.com/abhigyanpatwari/GitNexus';
const KARPATHY_URL = 'https://github.com/multica-ai/andrej-karpathy-skills/tree/main';
const SUPERPOWERS_URL = 'https://github.com/obra/superpowers';
const SUPERPOWERS_PRINCIPLES = ['tdd', 'systematic', 'process', 'complexity', 'evidence'] as const;
const SUPERPOWERS_STEPS = ['brainstorming', 'worktrees', 'plans', 'execution', 'tdd', 'review', 'finish'] as const;
const SUPERPOWERS_MECHANISMS = ['automatic', 'disciplined', 'delegated', 'reviewed'] as const;
const SUPERPOWERS_OUTCOMES = ['design', 'plan', 'delivery'] as const;
// 首页「使用方式」直接采用「关于我」页的同一套流程说明（about.workflow.*）。
const WORKFLOW_STEPS = [1, 2, 3, 4] as const;

export default function AgentExperience({
  dict,
  lang,
  globalPrompt,
  featuredSkills,
  featuredMcps,
  scenarioKeys,
}: {
  dict: Dictionary;
  lang: string;
  globalPrompt: string;
  featuredSkills: FeaturedSkill[];
  featuredMcps: FeaturedMcp[];
  scenarioKeys: Array<(typeof SCENARIO_KEYS)[number]>;
}) {
  const localizedDict = dict;
  const t = (key: keyof Dictionary) => localizedDict[key];
  const openclaw = getOpenClawContent(lang);
  const openclawRef = useRef<HTMLDivElement>(null);
  const openclawInView = useInView(openclawRef, { once: true, amount: 0.01 });
  const skillCard = (skill: FeaturedSkill) => (
    <div key={skill.name} className="grid gap-4 border-t border-rule py-5 md:grid-cols-12 md:gap-6 md:py-6">
      <div className="flex items-start justify-between gap-4 md:col-span-3">
        <h3 className="break-words text-base font-medium leading-tight text-paper">{skill.name}</h3>
        <BookOpen className="mt-0.5 size-4 shrink-0 text-fog md:hidden" />
      </div>
      <p className="text-xs leading-6 text-fog md:col-span-5">{t(`agents.page.skills.featured.${skill.descriptionKey}.desc` as keyof Dictionary)}</p>
      <div className="md:col-span-4">
        <div className="mb-2 text-[10px] text-fog">{t('agents.page.skills.structure')}</div>
        <p className="text-[11px] leading-5 text-fog">{t(`agents.page.skills.featured.${skill.structureKey}.structure` as keyof Dictionary)}</p>
      </div>
    </div>
  );
  const reveal = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const cardReveal = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="agent-experience" aria-labelledby="agent-experience-title" className="relative mb-0 scroll-mt-24 pt-16 md:pt-24">
      <motion.section initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="mb-12 md:mb-20">
        <p className="mb-3 text-xs text-fog">{t('home.method.eyebrow')}</p>
        <h2 id="agent-experience-title" className="mb-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-paper md:mb-8">
          {t('agents.page.title')}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-fog md:text-xl">{t('agents.page.subtitle')}</p>
      </motion.section>

      <div ref={openclawRef}>
        <motion.section
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0 round 0.75rem)' }}
          animate={openclawInView ? { opacity: 1, clipPath: 'inset(0 0% 0 0 round 0.75rem)' } : { opacity: 0, clipPath: 'inset(0 100% 0 0 round 0.75rem)' }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
          className="group relative mb-14 overflow-hidden rounded-xl border border-rule bg-surface md:mb-24"
        >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(241,241,238,0.06),transparent_45%)]" />
        <motion.div
          aria-hidden="true"
          initial={{ x: '-110%', opacity: 0 }}
          animate={openclawInView ? { x: '110%', opacity: [0, 0.8, 0] } : { x: '-110%', opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.35, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
        <Bot aria-hidden="true" className="absolute right-8 top-8 size-24 text-paper/[0.035]" strokeWidth={1} />
        <div className="relative grid lg:grid-cols-[1fr_0.85fr] gap-5 md:gap-10 p-4 sm:p-5 md:p-12 lg:p-16 items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs text-fog md:mb-6">
              <Bot className="size-4" /> {t('agents.page.openclaw.eyebrow')}
            </div>
            <h2 className="mb-3 text-2xl font-medium tracking-[-0.04em] text-paper sm:text-3xl md:mb-4 md:text-4xl">{t('agents.page.openclaw.title')}</h2>
            <p className="mb-5 max-w-xl text-base leading-relaxed text-fog md:mb-8 md:text-lg">{t('agents.page.openclaw.desc')}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/openclaw`}
                className="group relative inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="relative z-10">{t('agents.page.openclaw.cta')}</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="space-y-5 border-l border-rule pl-6 lg:pl-10">
            <div className="text-[10px] text-fog">{t('agents.page.openclaw.mapLabel')}</div>
            {openclaw.sections.map((section, index) => (
              <div key={section.id} className="flex items-center gap-3 text-sm text-paper"><span className="font-mono text-fog">0{index + 1}</span>{section.label}</div>
            ))}
          </div>
        </div>
        </motion.section>
      </div>

      <motion.section id="codex-setup" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.14 }} className="mb-12 md:mb-24">
        <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs text-fog">{t('agents.page.codex.eyebrow')}</p>
            <h2 className="t-section home-section-title max-w-3xl">
              {t('agents.page.codex.title')}
              <span className="mt-1 block font-mono text-[0.62em] font-medium tracking-normal text-fog">{t('agents.page.codex.files')}</span>
            </h2>
          </div>
          <div className="text-right">
            <a href={KARPATHY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors hover:text-fog">
              {t('agents.page.codex.reference')}
              <ExternalLink className="size-3.5" />
            </a>
            <p className="mt-3 text-left text-base leading-relaxed text-fog sm:text-right">{t('agents.page.codex.desc')}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
          {PROMPT_PRINCIPLES.map((key, index) => (
            <div key={key} className="pt-4 md:pt-5">
              <div className="mb-3 flex items-center justify-between md:mb-5">
                <span className="font-mono text-xs text-fog">0{index + 1}</span>
                <CheckCircle2 className="size-3.5 text-fog" />
              </div>
              <h3 className="mb-1.5 text-lg font-medium text-paper md:mb-2">{t(`agents.page.codex.principle.${key}.title` as keyof Dictionary)}</h3>
              <p className="text-sm leading-relaxed text-fog">{t(`agents.page.codex.principle.${key}.desc` as keyof Dictionary)}</p>
            </div>
          ))}
        </div>
        <CodeBlock label="Global Prompt">
          <code>{globalPrompt}</code>
        </CodeBlock>
      </motion.section>

      <motion.section id="working-style" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.2 }} className="mb-12 md:mb-24">
        <div className="mb-6 md:mb-10">
          <p className="mb-3 text-xs text-fog">{t('about.workflow.title')}</p>
          <h2 className="t-section home-section-title">{t('agents.page.method.title')}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step} className="relative pt-4 md:pt-5">
              <div className="mb-3 md:mb-6">
                <span className="font-mono text-xs text-fog">0{step}</span>
              </div>
              <h3 className="mb-1.5 text-lg font-medium text-paper md:mb-2">{t(`about.workflow.step${step}.title` as keyof Dictionary)}</h3>
              <p className="text-sm leading-relaxed text-fog">{t(`about.workflow.step${step}.desc` as keyof Dictionary)}</p>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.03]">
                <ProgressiveImage
                  src={`/images/method/method-${String(index + 1).padStart(2, '0')}.png?v=20261031`}
                  alt={t(`about.workflow.step${step}.title` as keyof Dictionary)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 md:mt-8 md:pt-5">
          <p className="border-l border-rule pl-4 text-sm leading-relaxed text-fog md:pl-5 md:text-base">
            {t('about.workflow.subtitle')}
          </p>
        </div>
      </motion.section>

      <motion.section id="gitnexus" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.22 }} className="mb-12 md:mb-24">
        <div className="mb-6 md:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs text-fog">{t('agents.page.gitnexus.eyebrow')}</p>
            <h2 className="t-section home-section-title">{t('agents.page.gitnexus.title')}</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-fog sm:text-right">{t('agents.page.gitnexus.desc')}</p>
        </div>

        <div className="mb-6 md:mb-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-4 sm:p-8">
            <div className="absolute right-5 top-4 font-mono text-7xl font-medium leading-none text-paper/[0.04]">GN</div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-3 text-xs text-fog">
                <Network className="size-4" /> {t('agents.page.gitnexus.badge')}
              </div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-md border border-rule bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-fog md:mb-5">
                {t('agents.page.gitnexus.cliMcp')}
              </span>
              <p className="max-w-xl text-lg leading-relaxed text-paper">{t('agents.page.gitnexus.about')}</p>
              <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
                <a href={GITNEXUS_URL} target="_blank" rel="noreferrer" className="paper-pill inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white">
                  {t('agents.page.gitnexus.repository')} <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-y border-rule">
            {[
              { value: 'CLI', label: t('agents.page.gitnexus.stat.cli') },
              { value: 'MCP', label: t('agents.page.gitnexus.stat.mcp') },
              { value: 'Graph', label: t('agents.page.gitnexus.stat.graph') },
              { value: 'Map', label: t('agents.page.gitnexus.stat.map') },
            ].map(({ value, label }, index) => (
              <div key={label} className={`p-4 sm:p-5 ${index % 2 === 0 ? 'border-r border-rule' : ''} ${index < 2 ? 'border-b border-rule' : ''}`}>
                <div className="mb-2.5 font-mono text-2xl font-medium text-paper md:mb-4">{value}</div>
                <p className="text-xs leading-relaxed text-fog">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3 md:mb-4">
            <span className="size-1.5 rounded-full bg-signal" />
            <h3 className="text-sm text-paper">{t('agents.page.gitnexus.workflow.title')}</h3>
          </div>
          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-fog md:mb-5">{t('agents.page.gitnexus.workflow.desc')}</p>
          <div className="grid gap-4 md:grid-cols-4">
            {(['index', 'understand', 'impact', 'verify'] as const).map((key, index) => (
              <div key={key} className="pt-4">
                <div className="mb-2.5 font-mono text-xs text-fog md:mb-4">0{index + 1}</div>
                <h3 className="mb-2 text-base font-medium text-paper">{t(`agents.page.gitnexus.workflow.${key}.title` as keyof Dictionary)}</h3>
                <p className="text-xs leading-relaxed text-fog">{t(`agents.page.gitnexus.workflow.${key}.desc` as keyof Dictionary)}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="superpowers" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="mb-12 md:mb-24">
        <div>
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="relative overflow-hidden py-8 sm:py-10 lg:pr-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-8 font-mono text-[9rem] font-medium leading-none text-paper/[0.035]">SP</div>
              <div className="relative">
                <div className="mb-3 flex items-center gap-3 text-xs text-fog md:mb-4">
                  <Sparkles className="size-4" /> {t('agents.page.superpowers.eyebrow')}
                </div>
                <h2 className="t-section home-section-title">Superpowers</h2>
                <p className="mt-3 text-base leading-relaxed text-paper md:mt-5">{t('agents.page.superpowers.desc')}</p>
                <p className="mt-4 text-sm leading-relaxed text-fog">{t('agents.page.superpowers.how')}</p>
                <a href={SUPERPOWERS_URL} target="_blank" rel="noreferrer" className="paper-pill mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white md:mt-7">
                  {t('agents.page.superpowers.repository')} <ExternalLink className="size-4" />
                </a>
                <div className="mt-5 pt-4 md:mt-9 md:pt-5">
                  <div className="mb-4 text-[10px] text-fog">{t('agents.page.superpowers.principles')}</div>
                  <div className="flex flex-wrap gap-2">
                    {SUPERPOWERS_PRINCIPLES.map((key) => (
                      <span key={key} className="rounded-full border border-rule bg-white/[0.03] px-3 py-1.5 text-xs text-fog">
                        {t(`agents.page.superpowers.principle.${key}` as keyof Dictionary)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-4 md:mt-8 md:pt-5">
                  <div className="mb-4 text-[10px] text-fog">{t('agents.page.superpowers.mechanisms')}</div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {SUPERPOWERS_MECHANISMS.map((key, index) => (
                      <div key={key} className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-rule pt-3">
                        <span className="font-mono text-[10px] text-fog">0{index + 1}</span>
                        <div>
                          <h3 className="text-xs font-medium text-paper">{t(`agents.page.superpowers.mechanism.${key}.title` as keyof Dictionary)}</h3>
                          <p className="mt-1 text-[11px] leading-5 text-fog">{t(`agents.page.superpowers.mechanism.${key}.desc` as keyof Dictionary)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-8 sm:py-10 lg:py-10 lg:pl-12">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-medium text-paper">{t('agents.page.superpowers.workflow.title')}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">{t('agents.page.superpowers.workflow.desc')}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-fog">{String(SUPERPOWERS_STEPS.length).padStart(2, '0')} {t('agents.page.superpowers.workflow.count')}</span>
              </div>

              <div className="relative mt-5 md:mt-8">
                <div aria-hidden="true" className="absolute bottom-5 left-[1.1rem] top-5 w-px bg-gradient-to-b from-paper/40 via-paper/10 to-transparent" />
                {SUPERPOWERS_STEPS.map((key, index) => (
                  <div key={key} className="relative grid grid-cols-[2.25rem_1fr] gap-4 pb-7 last:pb-0">
                    <div className="relative z-10 flex size-9 items-center justify-center rounded-full border border-rule bg-surface font-mono text-[10px] text-fog">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-sm font-medium text-paper">{t(`agents.page.superpowers.workflow.${key}.title` as keyof Dictionary)}</h3>
                      <p className="mt-1.5 text-xs leading-6 text-fog">{t(`agents.page.superpowers.workflow.${key}.desc` as keyof Dictionary)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 md:mt-8 md:pt-5">
                <div className="mb-4 text-[10px] text-fog">{t('agents.page.superpowers.outcomes')}</div>
                <div className="grid gap-3">
                  {SUPERPOWERS_OUTCOMES.map((key, index) => (
                    <div key={key} className="grid grid-cols-[1.75rem_1fr] gap-3 border-t border-rule pt-3">
                      <span className="font-mono text-[10px] text-fog">0{index + 1}</span>
                      <div>
                        <h3 className="text-xs font-medium text-paper">{t(`agents.page.superpowers.outcome.${key}.title` as keyof Dictionary)}</h3>
                        <p className="mt-1 text-[11px] leading-5 text-fog">{t(`agents.page.superpowers.outcome.${key}.desc` as keyof Dictionary)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="mcps" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.26 }} className="mb-12 md:mb-24">
        <div className="mb-6 md:mb-10 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 sm:flex-none">
            <p className="mb-3 text-xs text-fog">{t('agents.page.mcp.eyebrow')}</p>
            <h2 className="t-section home-section-title">{t('agents.page.mcp.title')}</h2>
          </div>
          <div className="contents sm:flex sm:flex-col sm:items-end sm:gap-3">
            <a href="https://github.com/punkpeye/awesome-mcp-servers" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 self-end text-sm text-paper transition-colors hover:text-fog sm:ml-0">
              {t('agents.page.mcp.more')} <ExternalLink className="size-3.5" />
            </a>
            <p className="w-full max-w-lg text-sm leading-relaxed text-fog sm:w-auto sm:text-right">{t('agents.page.mcp.desc')}</p>
          </div>
        </div>
        <div className="grid border-y border-rule lg:grid-cols-2">
          {featuredMcps.map((mcp, index) => {
            const Icon = mcp.name.startsWith('Playwright') ? Globe2 : Network;
            return (
              <article
                key={mcp.name}
                className={`py-6 lg:min-h-72 ${
                  index > 0
                    ? 'border-t border-rule lg:border-l lg:border-t-0 lg:pl-10'
                    : 'lg:pr-10'
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-4 md:mb-6">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-paper" />
                    <div>
                      <h3 className="text-lg font-medium text-paper">{mcp.name}</h3>
                      <span className="font-mono text-[10px] text-fog">MCP / {t('agents.page.mcp.entry')}</span>
                    </div>
                  </div>
                  <a href={mcp.url} target="_blank" rel="noreferrer" aria-label={`${mcp.name} ${t('agents.page.mcp.official')}`} className="text-fog transition-colors hover:text-paper"><ExternalLink className="size-4" /></a>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-paper md:mb-5">{t(`agents.page.mcp.item.${mcp.descriptionKey}.desc` as keyof Dictionary)}</p>
                <div className="pt-4">
                  <div className="mb-2 text-[10px] text-fog">{t('agents.page.mcp.when')}</div>
                  <p className="text-xs leading-6 text-fog">{t(`agents.page.mcp.item.${mcp.useKey}.use` as keyof Dictionary)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section id="featured-skills" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.3 }} className="mb-12 md:mb-24">
        <div className="mb-6 md:mb-10 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 sm:flex-none">
            <p className="mb-3 text-xs text-fog">{t('agents.page.skills.eyebrow')}</p>
            <h2 className="t-section home-section-title">{t('agents.page.skills.title')}</h2>
          </div>
          <div className="contents sm:flex sm:flex-col sm:items-end sm:gap-3">
            <a href="https://skills.sh/" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 self-end text-sm text-paper transition-colors hover:text-fog sm:ml-0">
              {t('agents.page.skills.market')} <ExternalLink className="size-3.5" />
            </a>
            <p className="w-full max-w-sm text-sm leading-relaxed text-fog sm:w-auto sm:text-right">{t('agents.page.skills.desc')}</p>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-paper" />
          <h3 className="text-sm font-medium text-paper">{t('agents.page.skills.category.featured')}</h3>
          <a href="https://github.com/ComposioHQ/awesome-claude-skills" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors hover:text-fog">
            {t('agents.page.skills.community')} <ExternalLink className="size-3.5" />
          </a>
        </div>
        <div className="border-b border-rule">
          {featuredSkills.map(skillCard)}
        </div>
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="mb-12 md:mb-24">
        <div className="mb-6 flex items-end justify-between md:mb-10"><div><p className="mb-3 text-xs text-fog">{t('agents.page.scenarios.eyebrow')}</p><h2 className="t-section home-section-title">{t('agents.page.scenarios.title')}</h2></div></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIOS.map(({ key, icon: Icon }) => {
            const hasProjects = scenarioKeys.includes(key);
            return (
              <motion.div
                key={key}
                variants={cardReveal}
                className={`scenario-glass-card relative min-h-[190px] p-5 md:min-h-[220px] md:p-6 ${hasProjects ? 'group' : ''}`}
              >
                {hasProjects && (
                  <Link href={`/${lang}/practice?scenario=${key}`} prefetch={false} className="absolute inset-0 z-20" aria-label={t(`agents.page.scenarios.${key}` as keyof Dictionary)} />
                )}
                <div className="relative z-10 flex h-full flex-col">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-paper backdrop-blur-md">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <div className="mt-auto pt-10">
                    <h3 className={`text-xl font-medium text-paper transition-colors ${hasProjects ? 'group-hover:text-signal' : ''}`}>
                      {t(`agents.page.scenarios.${key}` as keyof Dictionary)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-fog">
                      {t(`agents.page.scenarios.${key}.desc` as keyof Dictionary)}
                    </p>
                    {!hasProjects && (
                      <span className="mt-3 inline-block font-mono text-[9px] tracking-[0.12em] text-fog">
                        {t('agents.page.scenarios.empty')}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      </section>
    </MotionConfig>
  );
}
