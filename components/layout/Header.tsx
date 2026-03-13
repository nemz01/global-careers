'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

type NavLink = {
  label: string;
  href: '/' | '/roles' | '/how-it-works' | '/pricing' | '/calculator' | '/about' | '/contact';
};

const Header: React.FC = () => {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: t('roles'), href: '/roles' },
    { label: t('howItWorks'), href: '/how-it-works' },
    { label: t('pricing'), href: '/pricing' },
    { label: t('calculator'), href: '/calculator' },
    { label: t('about'), href: '/about' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: isScrolled ? 0.6 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 left-1/4 w-[600px] h-[200px] bg-gradient-to-r from-primary-cyan/20 via-secondary-blue/10 to-primary-cyan/20 blur-[100px] rounded-full"
        />
      </div>

      <motion.div
        animate={{
          backgroundColor: isScrolled ? 'rgba(10, 22, 40, 0.85)' : 'rgba(10, 22, 40, 0.4)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
        }}
        transition={{ duration: 0.3 }}
        className={`relative border-b transition-all duration-300 ${
          isScrolled
            ? 'border-primary-cyan/20 shadow-[0_4px_30px_rgba(0,163,224,0.1)]'
            : 'border-white/5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 lg:px-6 py-3">
          <button
            className="md:hidden order-last p-3 text-white hover:text-primary-cyan transition-colors ml-auto min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logos/AROBAS-2026-GLOBAL-05.png"
                alt="Global Careers"
                width={180}
                height={48}
                className="relative h-10 sm:h-12 lg:h-14 w-auto"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 rounded-full transition-all duration-300 hover:text-white group"
              >
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 border border-transparent group-hover:border-primary-cyan/20 backdrop-blur-sm transition-all duration-300" />
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-secondary-blue opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <motion.span
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 163, 224, 0.3)',
                    '0 0 40px rgba(0, 102, 204, 0.4)',
                    '0 0 20px rgba(0, 163, 224, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <span className="relative z-10 text-sm font-bold text-white">
                {t('getStarted')}
              </span>
              <ChevronRight
                size={16}
                className="relative z-10 text-white group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="bg-dark-navy/95 backdrop-blur-2xl border-b border-primary-cyan/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <nav className="relative flex flex-col px-6 py-6 gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3 px-4 text-lg font-medium text-white rounded-xl bg-white/5 border border-white/5 hover:bg-primary-cyan/10 hover:border-primary-cyan/20 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronRight size={18} className="text-primary-cyan" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex justify-center py-2"
                >
                  <LanguageSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-cyan to-secondary-blue px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary-cyan/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('getStarted')}
                    <ChevronRight size={18} />
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
