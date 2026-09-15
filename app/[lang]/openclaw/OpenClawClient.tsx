'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import { getLenis } from '@/components/SmoothScroll';
import PracticeTableOfContents from '@/components/PracticeTableOfContents';
import ParallaxSection from '@/components/ParallaxSection';

// 章节顺序即页面纵向顺序，侧栏导航与滚动高亮都由此派生。
const SECTIONS: { id: string; icon: string; labelKey: keyof Dictionary }[] = [
  { id: 'mindmap', icon: 'hub', labelKey: 'openclaw.sidebar.mindmap' },
  { id: 'getting-started', icon: 'rocket_launch', labelKey: 'openclaw.sidebar.start' },
  { id: 'architecture', icon: 'account_tree', labelKey: 'openclaw.sidebar.arch' },
  { id: 'config', icon: 'code_blocks', labelKey: 'openclaw.sidebar.config' },
];

const SCROLL_OFFSET = 176;

const CopyButton = ({ text, label, className, iconClassName }: { text: string; label?: string; className?: string; iconClassName?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className={className}>
      <span className={`material-symbols-outlined ${iconClassName} ${copied ? 'text-green-500' : ''}`}>
        {copied ? 'check' : 'content_copy'}
      </span>
      {label && <span>{label}</span>}
    </button>
  );
};

export default function OpenClawClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const t = (key: keyof Dictionary) => dict[key];
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isMindmapOpen, setIsMindmapOpen] = useState(false);
  const [mindmapScale, setMindmapScale] = useState(1);
  const [mindmapOffset, setMindmapOffset] = useState({ x: 0, y: 0 });
  const mindmapDrag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const closeMindmap = () => {
    setMindmapScale(1);
    setMindmapOffset({ x: 0, y: 0 });
    setIsMindmapOpen(false);
  };

  const handleMindmapPointerDown = (event: React.PointerEvent) => {
    if (mindmapScale <= 1) return;
    mindmapDrag.current = { sx: event.clientX, sy: event.clientY, ox: mindmapOffset.x, oy: mindmapOffset.y };
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  };
  const handleMindmapPointerMove = (event: React.PointerEvent) => {
    if (!mindmapDrag.current) return;
    const dx = event.clientX - mindmapDrag.current.sx;
    const dy = event.clientY - mindmapDrag.current.sy;
    setMindmapOffset({ x: mindmapDrag.current.ox + dx, y: mindmapDrag.current.oy + dy });
  };
  const handleMindmapPointerUp = () => {
    mindmapDrag.current = null;
  };

  // dialog 交互：ESC 关闭 + 锁定背景滚动 + 非被动 wheel 缩放（同时拦住滚动与 ctrl+滚轮页面缩放）
  useEffect(() => {
    if (!isMindmapOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMindmap();
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
      setMindmapScale((s) => Math.min(5, Math.max(1, +(s * factor).toFixed(3))));
    };
    const el = lightboxRef.current;
    el?.addEventListener('wheel', onWheel, { passive: false });
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      el?.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMindmapOpen]);

  // 缩回 1 倍时清除平移，避免图停留在偏移位置
  useEffect(() => {
    if (mindmapScale <= 1 && (mindmapOffset.x !== 0 || mindmapOffset.y !== 0)) {
      setMindmapOffset({ x: 0, y: 0 });
    }
  }, [mindmapScale, mindmapOffset]);
  const navigationItems = SECTIONS.map((section) => ({
    id: section.id,
    label: t(section.labelKey),
    level: 2 as const,
  }));

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop = window.scrollY + target.getBoundingClientRect().top - SCROLL_OFFSET;
    const lenis = getLenis();
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

  useEffect(() => {
    if (!isMindmapOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMindmapOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMindmapOpen]);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-12 lg:pt-40">
    <ParallaxSection>
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">OpenClaw</span>
      </nav>
      <section className="relative mb-24 flex flex-col items-center justify-center text-center py-20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-lobster/10 via-transparent to-orange-500/10 -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.15),transparent_70%)] -z-10"></div>
        
        {/* Background Ghost Text */}
        <div className="absolute inset-0 flex items-center justify-center -z-20 pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter animate-breathe select-none">
            OpenClaw
          </span>
        </div>

        <div className="text-8xl mb-8 filter drop-shadow-[0_0_30px_rgba(255,69,0,0.6)] animate-bounce">🦞</div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-lobster via-orange-400 to-lobster bg-[length:200%_auto] animate-shimmer">
            {t('openclaw.hero.title')}
          </span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-medium mb-10 leading-relaxed">
          {t('openclaw.hero.subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('mindmap')}
            className="bg-lobster text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-lobster/20"
          >
            <span className="material-symbols-outlined">account_tree</span>{t('openclaw.hero.explore')}
          </button>
          <button
            onClick={() => scrollToSection('getting-started')}
            className="glass px-8 py-4 rounded-xl font-bold flex items-center gap-2 border-2 border-white/20 bg-white/5 text-white transition-all duration-300 hover:!border-lobster hover:!bg-lobster/10 active:!border-lobster active:!bg-lobster/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <span className="material-symbols-outlined">terminal</span>{t('openclaw.hero.docs')}
          </button>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection('mindmap')}
          className={`group mt-28 flex flex-col items-center gap-2 text-sm font-medium text-slate-500 transition-[opacity,transform,color] duration-500 ease-out hover:text-slate-300 ${showScrollHint ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'}`}
          aria-label={t('openclaw.hero.scroll')}
        >
          <span>
            {t('openclaw.hero.scroll').split(' ')[0]}{' '}
            <span className="text-lobster">OpenClaw</span>
          </span>
          <span className="material-symbols-outlined animate-bounce text-xl text-slate-500 transition-colors group-hover:text-lobster">
            keyboard_arrow_down
          </span>
        </button>
      </section>

      <PracticeTableOfContents title={t('openclaw.sidebar.guides')} items={navigationItems} mobileOnly />

      <div className="flex flex-col md:flex-row gap-12 pt-40">
        <div className="flex-1 min-w-0">
          <section id="mindmap" className="mb-20 scroll-mt-36">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-lobster">{t('openclaw.sidebar.mindmap')}</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsMindmapOpen(true)}
              className="glass-glow group relative block w-full rounded-3xl p-2 md:p-4 text-left overflow-hidden bg-white/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]"
              aria-label={t('openclaw.mindmap.zoom')}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
                <img
                  src="/images/openclaw_map.png"
                  alt="OpenClaw 全景架构图"
                  className="block w-full h-auto rounded-2xl shadow-2xl transition duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-90"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <span className="translate-y-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {t('openclaw.mindmap.zoom')}
                  </span>
                </span>
              </div>
            </button>
      </section>

          <section id="getting-started" className="mb-20 scroll-mt-36">
            <h2 className="text-4xl font-black mb-8 text-lobster">{t('openclaw.section.start.title')}</h2>
            
            {/* System Requirements */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-lobster"></span>
                {t('openclaw.section.start.requirements.title')}
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-3 rounded-xl glass border-white/5 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lobster">terminal</span>
                  <span className="text-sm font-medium text-slate-300">{t('openclaw.section.start.requirements.node')}</span>
                </div>
                <div className="px-4 py-3 rounded-xl glass border-white/5 flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-400">laptop_mac</span>
                  <span className="text-sm font-medium text-slate-300">{t('openclaw.section.start.requirements.os')}</span>
                </div>
              </div>
            </div>

            {/* Installation Methods */}
            <div className="space-y-8 mb-12">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-lobster"></span>
                {t('openclaw.section.start.methods.title')}
              </h3>

              {/* Script Method */}
              <div className="p-6 rounded-2xl glass border-lobster/10 hover:border-lobster/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('openclaw.section.start.methods.script.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('openclaw.section.start.methods.script.desc')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-lobster/10 text-lobster flex items-center justify-center">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="group">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">{t('openclaw.os.unix')}</p>
                    <div className="bg-[#121212] border border-white/5 p-4 rounded-xl font-mono text-xs text-lobster/90 relative group">
                      <code>curl -fsSL https://openclaw.ai/install.sh | bash</code>
                      <CopyButton 
                        text="curl -fsSL https://openclaw.ai/install.sh | bash"
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
                        iconClassName="!text-sm"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">{t('openclaw.os.windows')}</p>
                    <div className="bg-[#121212] border border-white/5 p-4 rounded-xl font-mono text-xs text-orange-400/90 relative group">
                      <code>iwr -useb https://openclaw.ai/install.ps1 | iex</code>
                      <CopyButton 
                        text="iwr -useb https://openclaw.ai/install.ps1 | iex"
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
                        iconClassName="!text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* NPM Method */}
              <div className="p-6 rounded-2xl glass border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('openclaw.section.start.methods.npm.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('openclaw.section.start.methods.npm.desc')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">package</span>
                  </div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-4 rounded-xl font-mono text-xs text-slate-300 relative group">
                  <code>npm install -g openclaw@latest</code>
                  <CopyButton 
                    text="npm install -g openclaw@latest"
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
                    iconClassName="!text-sm"
                  />
                </div>
              </div>

              {/* Source Method */}
              <div className="p-6 rounded-2xl glass border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t('openclaw.section.start.methods.source.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('openclaw.section.start.methods.source.desc')}</p>
                  </div>
                  <div className="size-10 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">source</span>
                  </div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-4 rounded-xl font-mono text-xs text-slate-300 relative group">
                  <code>git clone https://github.com/openclaw/openclaw.git</code>
                  <CopyButton 
                    text="git clone https://github.com/openclaw/openclaw.git"
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
                    iconClassName="!text-sm"
                  />
                </div>
              </div>
            </div>

            {/* After Install */}
            <div className="p-8 rounded-3xl bg-lobster/5 border border-lobster/10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lobster">verified</span>
                  {t('openclaw.section.start.after.title')}
                </h3>
                <p className="text-slate-400 text-sm mb-6">{t('openclaw.section.start.after.desc')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#121212] border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">{t('openclaw.checkConfig')}</p>
                    <code className="text-xs text-lobster">openclaw doctor</code>
                  </div>
                  <div className="p-4 rounded-xl bg-[#121212] border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">{t('openclaw.status')}</p>
                    <code className="text-xs text-lobster">openclaw status</code>
                  </div>
                  <div className="p-4 rounded-xl bg-[#121212] border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">{t('openclaw.dashboard')}</p>
                    <code className="text-xs text-lobster">openclaw dashboard</code>
                  </div>
                </div>
              </div>
            </div>
      </section>

          <section id="architecture" className="mb-20 scroll-mt-36">
            <h2 className="text-4xl font-black mb-8 text-lobster">{t('openclaw.sidebar.arch')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gateway */}
              <div className="edge-lit-card p-8 rounded-3xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined !text-7xl">router</span>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="size-12 rounded-2xl bg-lobster/10 flex items-center justify-center text-lobster">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{t('openclaw.section.arch.gateway.title')}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{t('openclaw.section.arch.gateway.desc')}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">WhatsApp</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Telegram</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Discord</span>
                  </div>
                </div>
              </div>

              {/* Nodes */}
              <div className="edge-lit-card p-8 rounded-3xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined !text-7xl">devices</span>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">memory</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{t('openclaw.section.arch.nodes.title')}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{t('openclaw.section.arch.nodes.desc')}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">iOS</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Android</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('openclaw.camera')}</span>
                  </div>
                </div>
              </div>

              {/* Routing */}
              <div className="edge-lit-card p-8 rounded-3xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined !text-7xl">alt_route</span>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="size-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined">sync_alt</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{t('openclaw.section.arch.routing.title')}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{t('openclaw.section.arch.routing.desc')}</p>
                </div>
              </div>

              {/* Security */}
              <div className="edge-lit-card p-8 rounded-3xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined !text-7xl">security</span>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{t('openclaw.section.arch.security.title')}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{t('openclaw.section.arch.security.desc')}</p>
                </div>
              </div>
            </div>

            {/* Legacy / Additional Info */}
            <div className="mt-8 p-8 rounded-3xl bg-lobster/5 border border-lobster/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lobster">info</span>
                {t('openclaw.section.arch.sync.title')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                {t('openclaw.section.arch.sync.desc')}
              </p>
            </div>
      </section>

          <section id="config" className="mb-20 scroll-mt-36">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black text-lobster">{t('openclaw.section.config.title')}</h2>
              <span className="text-xs text-slate-500">{t('openclaw.section.config.subtitle')}</span>
            </div>
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-x border-t border-white/10 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-sm text-slate-500">terminal</span>
                    <span className="text-xs font-bold text-slate-300">Multi-Agent Routing</span>
                  </div>
                  <CopyButton 
                    text={`{
  agents: {
    list: [
      { id: "alex", workspace: "~/.openclaw/workspace-alex" },
      { id: "mia", workspace: "~/.openclaw/workspace-mia" },
    ],
  },
  bindings: [
    {
      agentId: "alex",
      match: { channel: "whatsapp", peer: { kind: "direct", id: "+15551230001" } },
    },
    {
      agentId: "mia",
      match: { channel: "whatsapp", peer: { kind: "direct", id: "+15551230002" } },
    },
  ],
  channels: {
    whatsapp: {
      dmPolicy: "allowlist",
      allowFrom: ["+15551230001", "+15551230002"],
    },
  },
}`}
                    label={t('openclaw.section.config.copy')}
                    className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors active:scale-95"
                    iconClassName="!text-xs"
                  />
                </div>
                <pre
                  className="bg-[#121212] border border-lobster/20 p-6 rounded-b-xl max-h-[32rem] overflow-x-auto overflow-y-auto font-mono text-sm leading-relaxed"
                >
                  <span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;<span className="text-lobster">agents</span>: <span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">list</span>: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`{`}</span> <span className="text-lobster">id</span>: <span className="text-yellow-500">"alex"</span>, <span className="text-lobster">workspace</span>: <span className="text-yellow-500">"~/.openclaw/workspace-alex"</span> <span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`{`}</span> <span className="text-lobster">id</span>: <span className="text-yellow-500">"mia"</span>, <span className="text-lobster">workspace</span>: <span className="text-yellow-500">"~/.openclaw/workspace-mia"</span> <span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;],<br />
                  &nbsp;&nbsp;<span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;<span className="text-lobster">bindings</span>: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">agentId</span>: <span className="text-yellow-500">"alex"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">match</span>: <span className="text-lobster">{`{`}</span> <span className="text-lobster">channel</span>: <span className="text-yellow-500">"whatsapp"</span>, <span className="text-lobster">peer</span>: <span className="text-lobster">{`{`}</span> <span className="text-lobster">kind</span>: <span className="text-yellow-500">"direct"</span>, <span className="text-lobster">id</span>: <span className="text-yellow-500">"+15551230001"</span> <span className="text-lobster">{`}`}</span> <span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">agentId</span>: <span className="text-yellow-500">"mia"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">match</span>: <span className="text-lobster">{`{`}</span> <span className="text-lobster">channel</span>: <span className="text-yellow-500">"whatsapp"</span>, <span className="text-lobster">peer</span>: <span className="text-lobster">{`{`}</span> <span className="text-lobster">kind</span>: <span className="text-yellow-500">"direct"</span>, <span className="text-lobster">id</span>: <span className="text-yellow-500">"+15551230002"</span> <span className="text-lobster">{`}`}</span> <span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;],<br />
                  &nbsp;&nbsp;<span className="text-lobster">channels</span>: <span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">whatsapp</span>: <span className="text-lobster">{`{`}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">dmPolicy</span>: <span className="text-yellow-500">"allowlist"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">allowFrom</span>: [<span className="text-yellow-500">"+15551230001"</span>, <span className="text-yellow-500">"+15551230002"</span>],<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lobster">{`}`}</span>,<br />
                  &nbsp;&nbsp;<span className="text-lobster">{`}`}</span>,<br />
                  <span className="text-lobster">{`}`}</span>
                </pre>
              </div>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <PracticeTableOfContents title={t('openclaw.sidebar.guides')} items={navigationItems} />
          </div>
        </aside>
      </div>

      {/* 用 portal 抛到 body：脱离 ParallaxSection 的 transform，避免 fixed 定位失效导致大图只占小程序区（内容糊） */}
      {isMindmapOpen && createPortal(
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('openclaw.mindmap.zoom')}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-md md:p-8"
          onClick={closeMindmap}
        >
          <button
            type="button"
            onClick={closeMindmap}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster md:right-8 md:top-8"
            aria-label={t('nav.menu.close')}
          >
            <span aria-hidden="true">×</span>
          </button>
          <img
            src="/images/openclaw_map.png"
            alt="OpenClaw 全景架构图"
            onPointerDown={handleMindmapPointerDown}
            onPointerMove={handleMindmapPointerMove}
            onPointerUp={handleMindmapPointerUp}
            onPointerCancel={handleMindmapPointerUp}
            className="max-h-full max-w-full cursor-grab select-none touch-none rounded-xl object-contain shadow-[0_24px_100px_rgba(0,0,0,0.7)] active:cursor-grabbing"
            style={{ transform: `translate(${mindmapOffset.x}px, ${mindmapOffset.y}px) scale(${mindmapScale})` }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </ParallaxSection>
    </main>
  );
}
