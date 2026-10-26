'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { getOpenClawContent } from '@/lib/i18n';
import { getLenis } from '@/components/SmoothScroll';
import PracticeTableOfContents from '@/components/PracticeTableOfContents';
import ImageLightbox from '@/components/ImageLightbox';
import ParallaxSection from '@/components/ParallaxSection';
import ConfigSection from './sections/ConfigSection';
import ExperienceSection from './sections/ExperienceSection';
import MaintenanceSection from './sections/MaintenanceSection';
import OverviewSection from './sections/OverviewSection';
import StartSection from './sections/StartSection';
import StructureSection from './sections/StructureSection';

const SCROLL_OFFSET = 176;
const QUICK_OPEN_OFFSET = 120;

export default function OpenClawClient({ lang }: { lang: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 720], ['0%', '-115%']);
  const heroRotateX = useTransform(scrollY, [0, 720], [0, -12]);
  const heroScale = useTransform(scrollY, [0, 720], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300, 700], [1, 0.96, 0]);
  const contentY = useTransform(scrollY, [20, 460], [240, 0]);
  const contentRotateX = useTransform(scrollY, [20, 460], [15, 0]);
  const contentScaleY = useTransform(scrollY, [20, 460], [0.88, 1]);
  const foldLineOpacity = useTransform(scrollY, [20, 320], [1, 0]);
  const contentOpacity = useTransform(scrollY, [20, 420], [0, 1]);
  const content = getOpenClawContent(lang);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isMindmapOpen, setIsMindmapOpen] = useState(false);
  const lastScrollY = useRef(0);


  const navigationItems = content.sections.map((section) => ({
    id: section.id,
    label: section.label,
    level: 2 as const,
  }));

  const scrollToSection = (id: string, offset = SCROLL_OFFSET, quick = false) => {
    const target = document.getElementById(id);
    if (!target) return;

    let layoutTop = 0;
    let layoutNode: HTMLElement | null = target;
    while (layoutNode) {
      layoutTop += layoutNode.offsetTop;
      layoutNode = layoutNode.offsetParent as HTMLElement | null;
    }
    const targetTop = layoutTop - offset;
    const lenis = getLenis();
    if (quick && !reduceMotion) {
      setShowScrollHint(false);
      if (lenis) {
        lenis.scrollTo(Math.max(0, targetTop), {
          duration: 0.62,
          easing: (progress) => 1 - Math.pow(1 - progress, 3),
          force: true,
          programmatic: true,
          lock: true,
        });
      } else {
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(Math.max(0, targetTop), { immediate: true, force: true, programmatic: true, lock: true });
    } else {
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 8 || currentScrollY < lastScrollY.current) {
        setShowScrollHint(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowScrollHint(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-clip px-4 sm:px-6 pb-8 md:pb-12 pt-20 sm:pt-28 lg:pt-40">
      <ParallaxSection>
        <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-6 sm:mb-8 lg:mb-12">
          <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
            {content.home}
          </Link>
          <span className="size-1 rounded-full bg-lobster"></span>
          <span className="text-slate-300">OpenClaw</span>
        </nav>

        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.055] p-4 md:items-center">
          <span className="material-symbols-outlined shrink-0 text-amber-300">history</span>
          <div className="min-w-0">
            <p className="text-xs font-black tracking-[0.14em] text-amber-200">{content.notice.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/65">
              {content.notice.desc}{content.notice.linkPrefix}
              <a
                href="https://openclaw.ai/"
                target="_blank"
                rel="noreferrer"
                className="text-lobster underline decoration-lobster/40 underline-offset-2 transition-colors hover:text-orange-300"
              >
                {content.notice.linkLabel}
              </a>
              {content.notice.linkSuffix}
            </p>
          </div>
        </div>

        <motion.section
          className={`${reduceMotion ? 'relative' : 'sticky top-20 md:top-24'} z-30 mb-0 flex min-h-[520px] sm:min-h-[620px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0a] py-12 md:py-20 text-center md:min-h-[740px]`}
          style={{
            y: reduceMotion ? 0 : heroY,
            scale: reduceMotion ? 1 : heroScale,
            opacity: reduceMotion ? 1 : heroOpacity,
            rotateX: reduceMotion ? 0 : heroRotateX,
            transformPerspective: 1400,
            transformOrigin: 'center bottom',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-lobster/10 via-transparent to-orange-500/10 -z-10"></div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-lobster/55 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.15),transparent_70%)] -z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center -z-20 pointer-events-none overflow-hidden">
            <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter animate-breathe select-none">
              OpenClaw
            </span>
          </div>

          <div className="text-6xl sm:text-8xl mb-8 filter drop-shadow-[0_0_30px_rgba(255,69,0,0.6)] animate-bounce">🦞</div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lobster via-orange-400 to-lobster bg-[length:200%_auto] animate-shimmer">
              {content.hero.title}
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-medium mb-6 md:mb-10 leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('overview', QUICK_OPEN_OFFSET, true)}
              className="bg-lobster text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-lobster/20"
            >
              <span className="material-symbols-outlined">account_tree</span>{content.hero.explore}
            </button>
            <button
              onClick={() => scrollToSection('start')}
              className="glass px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center gap-2 border-2 border-white/20 bg-white/5 text-white transition-all duration-300 hover:!border-lobster hover:!bg-lobster/10 active:!border-lobster active:!bg-lobster/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <span className="material-symbols-outlined">terminal</span>{content.hero.docs}
            </button>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('overview', QUICK_OPEN_OFFSET, true)}
            className={`group mt-14 md:mt-28 flex flex-col items-center gap-2 text-sm font-medium text-slate-500 transition-[opacity,transform,color] duration-500 ease-out hover:text-slate-300 ${showScrollHint ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'}`}
            aria-label={content.hero.scroll}
          >
            <span>
              {content.hero.scroll.split(' ')[0]}{' '}
              <span className="text-lobster">OpenClaw</span>
            </span>
            <span className="material-symbols-outlined animate-bounce text-xl text-slate-500 transition-colors group-hover:text-lobster">
              keyboard_arrow_down
            </span>
          </button>
        </motion.section>


        <PracticeTableOfContents title={content.ui.guides} items={navigationItems} mobileOnly />

        <motion.div
          className={`relative flex min-w-0 flex-col items-stretch gap-6 md:gap-12 md:flex-row ${reduceMotion ? 'pt-10' : '-mt-24 pt-6 md:-mt-36 md:pt-8'}`}
          style={{
            y: reduceMotion ? 0 : contentY,
            opacity: reduceMotion ? 1 : contentOpacity,
            rotateX: reduceMotion ? 0 : contentRotateX,
            scaleY: reduceMotion ? 1 : contentScaleY,
            transformPerspective: 1600,
            transformOrigin: 'top center',
            willChange: 'transform, opacity',
          }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-lobster/60 to-transparent"
            style={{ opacity: reduceMotion ? 0 : foldLineOpacity }}
          />
          <div className="w-full min-w-0 flex-1 space-y-12 md:space-y-24">
            <OverviewSection lang={lang} onOpenMindmap={() => setIsMindmapOpen(true)} />
            <StructureSection lang={lang} />
            <StartSection lang={lang} />
            <ConfigSection lang={lang} />
            <ExperienceSection lang={lang} />
            <MaintenanceSection lang={lang} />
          </div>

          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-5 md:space-y-8">
              <PracticeTableOfContents title={content.ui.guides} items={navigationItems} desktopOnly />
            </div>
          </aside>
        </motion.div>

        <ImageLightbox
          open={isMindmapOpen}
          onClose={() => setIsMindmapOpen(false)}
          src="/images/openclaw_map.png"
          alt={content.overview.mapAlt}
        />
      </ParallaxSection>
    </main>
  );
}
