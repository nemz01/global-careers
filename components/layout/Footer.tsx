'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('footer');

  const companyLinks = [
    { label: t('links.about'), href: '/about' as const },
    { label: t('links.howItWorks'), href: '/how-it-works' as const },
    { label: t('links.pricing'), href: '/pricing' as const },
    { label: t('links.contact'), href: '/contact' as const },
  ];

  const servicesLinks = [
    { label: t('links.directHire'), href: '/services/direct-hire' as const },
    { label: t('links.talentOnDemand'), href: '/services/talent-on-demand' as const },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { label: t('links.aiRecruitment'), href: '/services/ai-recruitment' as any },
    { label: t('links.calculator'), href: '/calculator' as const },
    { label: t('links.roles'), href: '/roles' as const },
  ];

  const resourcesLinks = [
    { label: t('links.blog'), href: '/blog' as const },
    { label: t('links.candidates'), href: '/candidates' as const },
    { label: t('links.jobs'), href: '/jobs' as const },
    { label: t('links.bookACall'), href: '/book' as const },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/global-careers',
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: 'https://x.com/globalcareers',
      label: 'X (Twitter)',
    },
    {
      icon: Github,
      href: 'https://github.com/globalcareers',
      label: 'GitHub',
    },
  ];

  return (
    <footer className="relative bg-[#060E1A] border-t border-white/5">
      {/* Top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/AROBAS-2026-GLOBAL-05.png"
                alt="Global Careers"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              {t('tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 hover:bg-primary-cyan/10 hover:border-primary-cyan/30 hover:text-primary-cyan"
                >
                  <social.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              {t('company')}
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              {t('services')}
            </h3>
            <ul className="mt-4 space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              {t('resources')}
            </h3>
            <ul className="mt-4 space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            {t('copyright', { year: new Date().getFullYear() })} &middot; Orlando, FL
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-primary-cyan"
            >
              {t('privacy')}
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-primary-cyan"
            >
              {t('terms')}
            </Link>
          </div>
          <p className="text-xs text-gray-600">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
