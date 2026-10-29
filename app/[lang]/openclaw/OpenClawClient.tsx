'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Network, Terminal } from 'lucide-react';
import { getOpenClawContent } from '@/lib/i18n';
import { getLenis } from '@/components/SmoothScroll';
import PracticeTableOfContents from '@/components/PracticeTableOfContents';
import ImageLightbox from '@/components/ImageLightbox';
import ConfigSection from './sections/ConfigSection';
import ExperienceSection from './sections/ExperienceSection';
import MaintenanceSection from './sections/MaintenanceSection';
import OverviewSection from './sections/OverviewSection';
import ScenarioSection from './sections/ScenarioSection';
import StartSection from './sections/StartSection';
import StructureSection from './sections/StructureSection';

const SCROLL_OFFSET = 120;

export default function OpenClawClient({
  lang,
  workspaceFileContents,
}: {
  lang: string;
  workspaceFileContents: Record<string, string>;
}) {
  const content = getOpenClawContent(lang);
  const [isMindmapOpen, setIsMindmapOpen] = useState(false);

  const navigationItems = content.sections.map((section) => ({
    id: section.id,
    label: section.label,
    level: 2 as const,
  }));

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    let layoutTop = 0;
    let layoutNode: HTMLElement | null = target;
    while (layoutNode) {
      layoutTop += layoutNode.offsetTop;
      layoutNode = layoutNode.offsetParent as HTMLElement | null;
    }

    const targetTop = Math.max(0, layoutTop - SCROLL_OFFSET);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetTop, {
        duration: 0.72,
        easing: (progress) => 1 - Math.pow(1 - progress, 3),
        force: true,
        programmatic: true,
        lock: true,
      });
    } else {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <main className="openclaw-editorial cocoon-home mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 sm:px-6 sm:pt-36 md:pb-24 lg:pt-40">
      <nav className="flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-fog">
        <Link href={`/${lang}`} className="transition-colors hover:text-paper">
          {content.home}
        </Link>
        <span className="text-rule">/</span>
        <span className="text-paper">OpenClaw</span>
      </nav>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="mb-10 max-w-4xl">
          <p className="text-xs text-paper">{content.notice.title}</p>
          <p className="mt-2 max-w-3xl text-xs leading-6 text-fog">
            {content.notice.desc}
            {content.notice.linkPrefix}
            <a
              href="https://openclaw.ai/"
              target="_blank"
              rel="noreferrer"
              className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:decoration-paper"
            >
              {content.notice.linkLabel}
            </a>
            {content.notice.linkSuffix}
          </p>
        </div>

        <p className="mb-6 font-mono text-[10px] tracking-[0.16em] text-fog">
          Agent field notes / 2026
        </p>
        <h1 className="text-[clamp(4.2rem,12vw,10rem)] font-medium leading-[0.8] tracking-[-0.085em] text-paper">
          {content.hero.title}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-2xl text-base leading-8 text-fog md:col-span-7 md:text-lg">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:col-start-9 md:justify-end">
            <button
              type="button"
              onClick={() => setIsMindmapOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isMindmapOpen}
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              <Network className="size-4" />
              {content.hero.explore}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('start')}
              className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-3 text-sm text-paper transition-colors hover:border-fog"
            >
              <Terminal className="size-4" />
              {content.hero.docs}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <PracticeTableOfContents title={content.ui.guides} items={navigationItems} mobileOnly />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-stretch">
        <div className="min-w-0 space-y-20 md:space-y-28">
          <OverviewSection lang={lang} onOpenMindmap={() => setIsMindmapOpen(true)} />
          <StructureSection lang={lang} />
          <StartSection lang={lang} />
          <ConfigSection lang={lang} workspaceFileContents={workspaceFileContents} />
          <ExperienceSection lang={lang} />
          <ScenarioSection lang={lang} />
          <MaintenanceSection lang={lang} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <PracticeTableOfContents
              title={content.ui.guides}
              items={navigationItems}
              desktopOnly
            />
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <a
          href="https://openclaw.ai/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-fog transition-colors hover:text-paper"
        >
          openclaw.ai
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <ImageLightbox
        open={isMindmapOpen}
        onClose={() => setIsMindmapOpen(false)}
        src="/images/openclaw_map.png"
        alt={content.overview.mapAlt}
        closeLabel={content.ui.close}
      />
    </main>
  );
}
