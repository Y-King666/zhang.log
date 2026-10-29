'use client';

import { Github, Globe, Mail } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

const Footer = ({ dict }: { dict: Dictionary }) => {
  const t = (key: keyof Dictionary) => dict[key];

  const socialLinks = [
    { icon: Mail, href: 'mailto:aremeny888@163.com', label: t('footer.social.email') },
    { icon: Github, href: 'https://github.com/Y-King666?tab=repositories', label: t('footer.social.github') },
    { icon: Globe, href: 'https://juejin.cn/user/1171439011504971', label: t('footer.social.website') },
  ];

  return (
    <footer className="border-t border-rule bg-ink">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-5 pt-16 pb-10 sm:px-6 md:pt-20">
        <div className="flex items-center gap-3">
          <img
            src="/images/icons/site-logo.png"
            alt=""
            className="size-11 rounded-xl object-cover"
          />
          <span className="text-xl font-semibold tracking-[-0.03em] text-paper">ZHANG.LOG</span>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-fog transition-colors hover:text-paper"
            >
              <social.icon className="size-5" strokeWidth={1.6} />
            </a>
          ))}
        </div>

        <p className="text-xs leading-5 text-fog">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
