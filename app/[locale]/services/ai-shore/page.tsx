'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Bot, Sparkles, Clock, Zap, Shield, ArrowRight,
  MessageSquare, FileText, Calendar, Database,
  TrendingUp, RefreshCw,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight, scaleIn } from '@/lib/animations';

export default function AIShorePage() {
  const t = useTranslations('services.aiShore');

  const capabilities = [
    { icon: MessageSquare, title: t('cap1Title'), desc: t('cap1Desc') },
    { icon: FileText, title: t('cap2Title'), desc: t('cap2Desc') },
    { icon: Calendar, title: t('cap3Title'), desc: t('cap3Desc') },
    { icon: Database, title: t('cap4Title'), desc: t('cap4Desc') },
    { icon: TrendingUp, title: t('cap5Title'), desc: t('cap5Desc') },
    { icon: RefreshCw, title: t('cap6Title'), desc: t('cap6Desc') },
  ];

  const advantages = [
    { icon: Clock, value: '24/7', label: t('adv1Label') },
    { icon: Zap, value: '0', label: t('adv2Label') },
    { icon: TrendingUp, value: '10x', label: t('adv3Label') },
    { icon: Shield, value: '99.9%', label: t('adv4Label') },
  ];

  const steps = [
    { number: '01', title: t('step1Title'), desc: t('step1Desc') },
    { number: '02', title: t('step2Title'), desc: t('step2Desc') },
    { number: '03', title: t('step3Title'), desc: t('step3Desc') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/[0.08] via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern" />

        {/* Floating AI particles */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 right-[12%] w-20 h-20 rounded-full bg-primary-cyan/5 border border-primary-cyan/10 hidden lg:flex items-center justify-center"
        >
          <Bot size={24} className="text-primary-cyan/40" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[8%] w-16 h-16 rounded-xl bg-brand-gold/5 border border-brand-gold/10 hidden lg:flex items-center justify-center"
        >
          <Sparkles size={18} className="text-brand-gold/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ShinyButton href="/book">{t('ctaButton')}</ShinyButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Advantages stats */}
      <section className="py-12 px-4 bg-gradient-to-r from-dark-navy to-[#0d1f35] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {advantages.map((adv, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="text-center"
              >
                <adv.icon size={24} className="text-primary-cyan mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-cyan mb-2">
                  {adv.value}
                </div>
                <div className="text-sm text-text-gray">{adv.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
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
              {t('capTitle')}
            </h2>
            <p className="text-lg text-text-gray max-w-2xl mx-auto">
              {t('capSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {capabilities.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <GlassCard className="h-full p-6">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary-cyan/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary-cyan" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-text-gray text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-primary-cyan/[0.03] to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('stepsTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={idx % 2 === 0 ? fadeInLeft : fadeInRight}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary-cyan/30 to-brand-gold/10 border border-primary-cyan/40 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-text-gray text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('faqTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <GlassCard className="p-6">
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                      <Bot size={18} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                      {faq.q}
                    </h3>
                    <p className="text-text-gray text-sm leading-relaxed pl-7">{faq.a}</p>
                  </div>
                </GlassCard>
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
            variants={scaleIn}
            className="bg-gradient-to-br from-primary-cyan/10 to-brand-gold/5 border border-primary-cyan/30 rounded-3xl p-12 text-center"
          >
            <Bot size={40} className="text-primary-cyan mx-auto mb-4" />
            <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <ShinyButton href="/book">
              {t('ctaButton')} <ArrowRight className="w-5 h-5 inline ml-1" />
            </ShinyButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
