'use client';

import React from 'react';
import { Mail, Github, Globe } from 'lucide-react';
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
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 bg-lobster/40 blur-md rounded-xl animate-pulse"></div>
            <img
              src="/images/icons/site-logo.png"
              alt="ZHANG.LOG"
              className="relative size-12 rounded-xl object-cover border border-white/20 shadow-lg shadow-lobster/20"
            />
          </div>
          <span className="text-xl font-black tracking-tight uppercase">ZHANG.LOG</span>
        </div>

        {/* Social icons */}
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

        {/* Copyright */}
        <p className="text-slate-600 text-xs mt-4">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
