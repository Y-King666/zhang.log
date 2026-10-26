'use client';

import { useState, useEffect, useRef } from 'react';
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // 点击菜单外部时收起
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // 路由切换时收起移动端菜单
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t('nav.home'), href: `/${lang}` },
    { name: t('nav.projects'), href: `/${lang}/practice` },
    { name: t('nav.blog'), href: `/${lang}/blogs` },
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
          lang === 'cn' ? "bg-lobster text-white" : "text-slate-500 hover:text-white"
        )}
      >
        中
      </Link>
      <Link
        href={switchPath('en')}
        className={cn(
          "w-7 py-0.5 text-center rounded-full text-[10px] font-bold cursor-pointer transition-all",
          lang === 'en' ? "bg-lobster text-white" : "text-slate-500 hover:text-white"
        )}
      >
        EN
      </Link>
    </div>
  );

  return (
    <nav
      className={cn(
        'fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] max-w-4xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
        navHidden && '-translate-y-[150%]'
      )}
    >
      <div className="glass-glow rounded-full px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between relative overflow-hidden">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0">
            <div className="relative flex items-center justify-center">
            <img
              src="/images/icons/site-logo.png"
              alt="ZHANG.LOG"
              className="relative size-8 sm:size-10 rounded-lg sm:rounded-xl object-cover border border-white/15"
            />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tighter text-white">ZHANG.LOG</span>
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
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-lobster rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                </>
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          <Link
            href={`/${lang}/agents`}
            className="bg-lobster hover:bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1"
          >
            {t('nav.agents')}
          </Link>
          {langSwitch}
        </div>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
          aria-expanded={menuOpen}
          className="lg:hidden relative z-10 size-8 sm:size-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-lobster/40 transition-colors"
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
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full mt-2 sm:mt-3 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-1.5">
              {/* 两列排列，4 个入口压缩到 2 行 */}
              <div className="grid grid-cols-2 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-lobster/10 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span className="truncate">{link.name}</span>
                    {isActive(link.href) && (
                      <span className="size-1.5 shrink-0 rounded-full bg-lobster" />
                    )}
                  </Link>
                ))}
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-white/5 px-1 pt-2">
                <Link
                  href={`/${lang}/agents`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                >
                  {t('nav.agents')}
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
