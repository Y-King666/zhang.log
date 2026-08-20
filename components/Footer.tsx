'use client';

import React from 'react';
import { Mail, Github, Globe, Terminal, Activity } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { motion } from 'motion/react';

const Footer = ({ dict }: { dict: Dictionary }) => {
  const t = (key: keyof Dictionary) => dict[key];
  
  const socialLinks = [
    { icon: Mail, href: 'mailto:aremeny888@163.com', label: t('footer.social.email') },
    { icon: Github, href: 'https://github.com/Y-King666?tab=repositories', label: t('footer.social.github') },
    { icon: Globe, href: 'https://juejin.cn/user/1171439011504971', label: t('footer.social.website') },
  ];

  return (
    <footer className="border-t border-white/5 bg-background-dark/50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-lobster/40 blur-xl rounded-full scale-150 animate-pulse"></div>
                <div className="relative size-12 bg-gradient-to-br from-lobster to-orange-400 rounded-xl flex items-center justify-center border border-white/20 shadow-lg shadow-lobster/20">
                  <svg
                    className="size-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5 6L5.5 6L16.5 18L5.5 18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-black tracking-tight uppercase">ZHANG.LOG</span>
            </div>
            <p className="text-slate-500 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    color: '#ff4500',
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'tween', duration: 0.2 }}
                  className="text-slate-400 relative group"
                >
                  <social.icon className="size-5" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-lobster text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex md:justify-end items-end">
            <div className="glass px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Terminal className="size-5 text-secondary" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{t('footer.system')}</p>
                  <p className="font-mono text-secondary text-lg leading-none">007</p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex items-center gap-3">
                <Activity className="size-5 text-lobster" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{t('footer.status')}</p>
                  <p className="font-mono text-lobster text-lg leading-none">{t('footer.status.new')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-600 text-xs gap-4">
          <p>{t('footer.copyright')}</p>
          <p className="md:absolute md:left-1/2 md:-translate-x-1/2 font-medium text-slate-500 italic">
            {t('footer.aiNotice')}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t('footer.link1')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.link2')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
