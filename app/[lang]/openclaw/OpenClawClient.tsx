'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n';
import { motion, AnimatePresence } from 'motion/react';

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
  const [activeSection, setActiveSection] = useState('mindmap');
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = (section: string) => {
    setActiveSection(section);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-12 lg:pt-40">
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
            onClick={() => scrollToContent('mindmap')}
            className="bg-lobster text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-lobster/20"
          >
            <span className="material-symbols-outlined">account_tree</span>{t('openclaw.hero.explore')}
          </button>
          <button 
            onClick={() => scrollToContent('getting-started')}
            className="glass px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">terminal</span>{t('openclaw.hero.docs')}
          </button>
        </div>
      </section>

      <div ref={contentRef} className="flex flex-col md:flex-row gap-12 min-h-[500px] scroll-mt-24">
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <nav className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">{t('openclaw.sidebar.guides')}</p>
                <button
                  onClick={() => setActiveSection('mindmap')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${activeSection === 'mindmap' ? 'bg-lobster/10 text-lobster font-medium' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined !text-xl">hub</span>
                  <span>{t('openclaw.sidebar.mindmap')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('getting-started')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${activeSection === 'getting-started' ? 'bg-lobster/10 text-lobster font-medium' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined !text-xl">rocket_launch</span>
                  <span>{t('openclaw.sidebar.start')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('architecture')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${activeSection === 'architecture' ? 'bg-lobster/10 text-lobster font-medium' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined !text-xl">account_tree</span>
                  <span>{t('openclaw.sidebar.arch')}</span>
                </button>
                <button
                  onClick={() => setActiveSection('config')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${activeSection === 'config' ? 'bg-lobster/10 text-lobster font-medium' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  <span className="material-symbols-outlined !text-xl">code_blocks</span>
                  <span>{t('openclaw.sidebar.config')}</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 min-h-[800px]">
          <AnimatePresence mode="wait">
            {activeSection === 'mindmap' && (
              <motion.section 
                key="mindmap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-20"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black text-lobster">{t('openclaw.sidebar.mindmap')}</h2>
                  <div className="flex items-center gap-2 px-3 py-1 bg-lobster/10 text-lobster text-[10px] font-bold rounded-full uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lobster opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-lobster"></span>
                    </span>
                    {t('openclaw.livePreview')}
                  </div>
                </div>
                <div className="glass-glow rounded-3xl p-2 md:p-4 w-full overflow-hidden bg-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
                    alt="OpenClaw Architecture Placeholder" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.section>
            )}

            {activeSection === 'getting-started' && (
              <motion.section 
                key="getting-started"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-20"
              >
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
              </motion.section>
            )}

            {activeSection === 'architecture' && (
              <motion.section 
                key="architecture"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-20"
              >
                <h2 className="text-4xl font-black mb-8 text-lobster">{t('openclaw.sidebar.arch')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gateway */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
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
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
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
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
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
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
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
              </motion.section>
            )}

            {activeSection === 'config' && (
              <motion.section 
                key="config"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-20"
              >
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
                    <pre className="bg-[#121212] border border-lobster/20 p-6 rounded-b-xl overflow-x-auto font-mono text-sm leading-relaxed">
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
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
