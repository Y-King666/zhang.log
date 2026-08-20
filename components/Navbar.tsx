'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = ({ lang, dict }: { lang: string; dict: Dictionary }) => {
  const t = (key: keyof Dictionary) => dict[key];
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 路由切换时收起移动端菜单
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t('nav.home'), href: `/${lang}` },
    { name: t('nav.projects'), href: `/${lang}/projects` },
    { name: t('nav.blog'), href: `/${lang}/blog` },
    { name: t('nav.about'), href: `/${lang}/about` },
  ];

  const switchPath = (target: string) => {
    const seg = pathname.split('/');
    if (seg[1] === 'cn' || seg[1] === 'en') {
      const rest = seg.slice(2).join('/');
      return `/${target}${rest ? `/${rest}` : ''}`;
    }
    return `/${target}${pathname === '/' ? '' : pathname}`;
  };

  const isActive = (href: string) =>
    pathname === href || (href !== `/${lang}` && pathname.startsWith(href));

  // 菜单打开时保持导航可见，不被滚动隐藏
  const navHidden = !isVisible && !menuOpen;

  const langSwitch = (
    <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
      <Link
        href={switchPath('cn')}
        className={cn(
          "w-7 py-0.5 text-center rounded-full text-[10px] font-bold cursor-pointer transition-all",
          lang === 'cn' ? "bg-lobster text-white shadow-[0_0_10px_rgba(255,69,0,0.4)]" : "text-slate-500 hover:text-white"
        )}
      >
        中
      </Link>
      <Link
        href={switchPath('en')}
        className={cn(
          "w-7 py-0.5 text-center rounded-full text-[10px] font-bold cursor-pointer transition-all",
          lang === 'en' ? "bg-lobster text-white shadow-[0_0_10px_rgba(255,69,0,0.4)]" : "text-slate-500 hover:text-white"
        )}
      >
        EN
      </Link>
    </div>
  );

  return (
    <nav
      className={cn(
        'fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] max-w-4xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
        navHidden && '-translate-y-[150%]'
      )}
    >
      {/* 3D Glowing Edge Effect (Rim Light & Bottom Glow) */}
      <div className="absolute -inset-[1px] bg-gradient-to-t from-white/30 via-transparent to-transparent rounded-full blur-[0.5px] -z-10"></div>
      <div className="absolute -bottom-3 -inset-x-8 h-16 bg-lobster/20 blur-3xl rounded-full -z-20 opacity-0 dark:opacity-70 animate-pulse" style={{ animationDuration: '3s' }}></div>

      <div className="glass-glow rounded-full px-4 sm:px-6 py-3 flex items-center justify-between relative overflow-hidden group">
        {/* Top Edge Reflection Sheen */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[98%] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-20"></div>
        {/* Bottom Rim Light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

        <Link href="/" className="flex items-center gap-2 relative z-10 shrink-0">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-lobster/30 blur-xl rounded-full scale-150 animate-pulse"></div>
            <div className="relative size-10 bg-gradient-to-br from-lobster to-orange-400 rounded-xl flex items-center justify-center border border-white/20 shadow-lg shadow-lobster/20">
              <svg
                className="size-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
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
          <span className="font-black tracking-tighter hidden sm:block text-white drop-shadow-sm">ZHANG.LOG</span>
        </Link>

        {/* 桌面导航（lg 及以上保持完整横排） */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'transition-all duration-300 px-4 py-2 rounded-full relative group/link',
                isActive(link.href) ? 'text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              {isActive(link.href) && (
                <>
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white/10 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-lobster rounded-full shadow-[0_0_10px_#ff4500]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                </>
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <Link
            href={`/${lang}/openclaw`}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
          >
            {t('nav.openclaw')}
          </Link>
          {langSwitch}
        </div>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
          aria-expanded={menuOpen}
          className="lg:hidden relative z-10 size-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-lobster/40 transition-colors"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* 移动端下拉菜单（放在玻璃容器外，避免被 overflow-hidden 裁剪） */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden absolute top-full mt-3 left-0 right-0 glass-glow rounded-2xl overflow-hidden"
          >
            <div className="p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-lobster/10 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="size-1.5 rounded-full bg-lobster shadow-[0_0_10px_#ff4500]" />
                  )}
                </Link>
              ))}
              <div className="flex items-center justify-between gap-3 px-3 pt-3 mt-2 border-t border-white/5">
                <Link
                  href={`/${lang}/openclaw`}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                >
                  {t('nav.openclaw')}
                </Link>
                {langSwitch}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
