'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { Link } from '@/i18n/routing';

export function HeroGlobal() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 hero-grid-pattern pointer-events-none" />
      {/* Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/[0.08] via-transparent to-transparent pointer-events-none" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[10%] w-32 h-32 rounded-full bg-primary-cyan/5 border border-primary-cyan/10 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-[8%] w-24 h-24 rounded-full bg-secondary-blue/5 border border-secondary-blue/10 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 right-[5%] w-16 h-16 rounded-xl bg-brand-gold/5 border border-brand-gold/10 hidden xl:block"
      />
      {/* Additional floating elements for more depth */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[15%] w-12 h-12 rounded-lg bg-primary-cyan/3 border border-primary-cyan/8 hidden xl:block"
      />
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[25%] right-[15%] w-20 h-20 rounded-full bg-deep-blue/5 border border-deep-blue/10 hidden lg:block"
      />

      {/* Abstract connection lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="200" cy="300" r="4" fill="#00A3E0" />
        <circle cx="400" cy="150" r="3" fill="#00A3E0" />
        <circle cx="600" cy="400" r="5" fill="#00A3E0" />
        <circle cx="800" cy="200" r="3" fill="#00A3E0" />
        <circle cx="1000" cy="350" r="4" fill="#00A3E0" />
        <circle cx="300" cy="550" r="3" fill="#0066CC" />
        <circle cx="700" cy="600" r="4" fill="#0066CC" />
        <circle cx="900" cy="500" r="3" fill="#0066CC" />
        <line x1="200" y1="300" x2="400" y2="150" stroke="#00A3E0" strokeWidth="1" />
        <line x1="400" y1="150" x2="600" y2="400" stroke="#00A3E0" strokeWidth="1" />
        <line x1="600" y1="400" x2="800" y2="200" stroke="#00A3E0" strokeWidth="1" />
        <line x1="800" y1="200" x2="1000" y2="350" stroke="#00A3E0" strokeWidth="1" />
        <line x1="200" y1="300" x2="300" y2="550" stroke="#0066CC" strokeWidth="1" />
        <line x1="600" y1="400" x2="700" y2="600" stroke="#0066CC" strokeWidth="1" />
        <line x1="800" y1="200" x2="900" y2="500" stroke="#0066CC" strokeWidth="1" />
      </svg>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Globe size={16} className="text-primary-cyan" />
            </motion.div>
            <span className="text-sm font-medium text-primary-cyan">
              {t('badge')}
            </span>
          </motion.div>

          {/* Title with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="holographic-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
          >
            {t('title')}{' '}
            <span className="gradient-text-gold animate-gradient-slow">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-text-gray max-w-2xl mx-auto mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <ShinyButton href="/calculator">{t('cta')}</ShinyButton>
            <Link
              href="/roles"
              className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            >
              {t('ctaSecondary')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: Zap, label: t('stats.placementsLabel'), value: t('stats.placements') },
              { icon: Globe, label: t('stats.countriesLabel'), value: t('stats.countries') },
              { icon: Shield, label: t('stats.savingsLabel'), value: t('stats.savings') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 cursor-default hover:border-primary-cyan/20 hover:bg-white/[0.08] transition-colors duration-300"
              >
                <stat.icon size={20} className="text-primary-cyan" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-text-gray">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
