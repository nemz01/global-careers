'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Clock,
  Target,
  BarChart3,
  Bot,
  HeadphonesIcon,
  Globe,
  Database,
  MessageSquare,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function AIRecruitmentPage() {
  const t = useTranslations('services.aiRecruitment');

  const advantages = [
    { icon: Brain, title: t('adv1Title'), description: t('adv1Desc') },
    { icon: Target, title: t('adv2Title'), description: t('adv2Desc') },
    { icon: Clock, title: t('adv3Title'), description: t('adv3Desc') },
    { icon: Bot, title: t('adv4Title'), description: t('adv4Desc') },
    { icon: BarChart3, title: t('adv5Title'), description: t('adv5Desc') },
    { icon: Database, title: t('adv6Title'), description: t('adv6Desc') },
  ];

  const useCases = [
    { icon: HeadphonesIcon, title: t('useCase1Title'), description: t('useCase1Desc'), stat: t('useCase1Stat') },
    { icon: Globe, title: t('useCase2Title'), description: t('useCase2Desc'), stat: t('useCase2Stat') },
    { icon: Database, title: t('useCase3Title'), description: t('useCase3Desc'), stat: t('useCase3Stat') },
    { icon: MessageSquare, title: t('useCase4Title'), description: t('useCase4Desc'), stat: t('useCase4Stat') },
  ];

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/[0.08] via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary-cyan/10 border border-primary-cyan/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary-cyan" />
            <span className="text-primary-cyan font-semibold text-sm">{t('badge')}</span>
          </div>

          <h1 className="holographic-title text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-text-gray max-w-3xl mx-auto mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShinyButton href="/book">
              {t('ctaButton')}
            </ShinyButton>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full border-2 border-primary-cyan/30 text-primary-cyan hover:bg-primary-cyan/10 transition-colors font-semibold inline-flex items-center gap-2"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="py-12 px-4 bg-gradient-to-r from-dark-navy to-[#0d1f35] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-cyan mb-2">{stat.value}</div>
                <div className="text-sm text-text-gray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('advantagesTitle')}
            </h2>
            <p className="text-xl text-text-gray max-w-2xl mx-auto">
              {t('advantagesSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {advantages.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card p-6 hover:bg-white/[0.08] transition-colors"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary-cyan/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-text-gray text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use cases */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-primary-cyan/[0.03] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">{t('useCasesTitle')}</h2>
            <p className="text-xl text-text-gray">{t('useCasesSubtitle')}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {useCases.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card p-8 hover:bg-white/[0.08] transition-colors"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-cyan/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-primary-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-text-gray text-sm leading-relaxed mb-3">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary-cyan/10 border border-primary-cyan/30 rounded-full text-primary-cyan text-xs font-semibold">
                      {item.stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-primary-cyan/10 to-secondary-blue/10 border border-primary-cyan/30 rounded-3xl p-12 text-center"
          >
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ShinyButton href="/book">
                {t('ctaMainButton')}
                <ArrowRight className="w-5 h-5" />
              </ShinyButton>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-full border-2 border-primary-cyan/30 text-primary-cyan hover:bg-primary-cyan/10 transition-colors font-semibold inline-flex items-center gap-2"
              >
                {t('ctaViewServices')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
