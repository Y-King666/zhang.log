'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Dictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const Navbar = ({ lang, dict }: { lang: string; dict: Dictionary }) => {
  const t = (key: keyof Dictionary) => dict[key];
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 48) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

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
    const segments = pathname.split('/');
    if (segments[1] === 'cn' || segments[1] === 'en') {
      const rest = segments.slice(2).join('/');
      return `/${target}${rest ? `/${rest}` : ''}`;
    }
    return `/${target}${pathname === '/' ? '' : pathname}`;
  };

  const isActive = (href: string) =>
    pathname === href || (href !== `/${lang}` && pathname.startsWith(href));

  const navHidden = !isVisible && !menuOpen;

  const languageSwitch = (
    <div className="flex items-center gap-1 font-mono text-[10px] tracking-[0.12em]">
      <Link
        href={switchPath('cn')}
        aria-label={t('nav.switchToCn')}
        aria-current={lang === 'cn' ? 'page' : undefined}
        className={cn(
          'rounded-full px-2 py-1 transition-colors',
          lang === 'cn' ? 'bg-paper font-semibold text-ink' : 'text-fog hover:text-paper'
        )}
      >
        中
      </Link>
      <Link
        href={switchPath('en')}
        aria-label={t('nav.switchToEn')}
        aria-current={lang === 'en' ? 'page' : undefined}
        className={cn(
          'rounded-full px-2 py-1 transition-colors',
          lang === 'en' ? 'bg-paper font-semibold text-ink' : 'text-fog hover:text-paper'
        )}
      >
        EN
      </Link>
    </div>
  );

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-rule bg-ink/88 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
        navHidden && '-translate-y-full'
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:h-20 sm:px-6">
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-2.5" aria-label="ZHANG.LOG">
          <img
            src="/images/icons/site-logo.png"
            alt=""
            className="size-8 rounded-md object-cover sm:size-9"
          />
          <span className="text-[15px] font-semibold tracking-[-0.03em] text-paper sm:text-base">
            ZHANG.LOG
          </span>
        </Link>

        <nav aria-label={t('nav.primaryLabel')} className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative py-2 text-sm transition-colors',
                isActive(link.href) ? 'text-paper' : 'text-fog hover:text-paper'
              )}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute inset-x-0 -bottom-1 mx-auto size-1 rounded-full bg-signal" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          {languageSwitch}
          <Link
            href={`/${lang}/openclaw`}
            aria-current={pathname === `/${lang}/openclaw` ? 'page' : undefined}
            className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            {t('nav.myOpenClaw')}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex size-9 items-center justify-center text-paper lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-b border-rule bg-ink lg:hidden"
          >
            <nav aria-label={t('nav.mobileLabel')} className="mx-auto max-w-[1120px] px-5 py-4 sm:px-6">
              <div className="border-t border-rule">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between border-b border-rule py-4 text-base',
                      isActive(link.href) ? 'text-paper' : 'text-fog'
                    )}
                  >
                    <span>{link.name}</span>
                    {isActive(link.href) && <span className="size-1.5 rounded-full bg-signal" />}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between gap-5 pt-5">
                {languageSwitch}
                <Link
                  href={`/${lang}/openclaw`}
                  aria-current={pathname === `/${lang}/openclaw` ? 'page' : undefined}
                  className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink"
                >
                  {t('nav.myOpenClaw')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
