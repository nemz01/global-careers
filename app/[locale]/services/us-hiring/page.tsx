'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Shield, Users, CheckCircle, Building2,
  ArrowRight, FileCheck, Scale, Briefcase,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight, scaleIn } from '@/lib/animations';

export default function USHiringPage() {
  const t = useTranslations('services.usHiring');

  const benefits = [
    { icon: Clock, title: t('benefit1Title'), desc: t('benefit1Desc') },
    { icon: MapPin, title: t('benefit2Title'), desc: t('benefit2Desc') },
    { icon: Users, title: t('benefit3Title'), desc: t('benefit3Desc') },
    { icon: Scale, title: t('benefit4Title'), desc: t('benefit4Desc') },
    { icon: FileCheck, title: t('benefit5Title'), desc: t('benefit5Desc') },
    { icon: Briefcase, title: t('benefit6Title'), desc: t('benefit6Desc') },
  ];

  const steps = [
    { number: '01', title: t('step1Title'), desc: t('step1Desc') },
    { number: '02', title: t('step2Title'), desc: t('step2Desc') },
    { number: '03', title: t('step3Title'), desc: t('step3Desc') },
    { number: '04', title: t('step4Title'), desc: t('step4Desc') },
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
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-blue/[0.08] via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-blue/10 border border-secondary-blue/20 rounded-full px-6 py-2 mb-8">
            <Building2 className="w-4 h-4 text-secondary-blue" />
            <span className="text-secondary-blue font-semibold text-sm">{t('badge')}</span>
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

      {/* Key Benefits */}
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
              {t('benefitsTitle')}
            </h2>
            <p className="text-lg text-text-gray max-w-2xl mx-auto">
              {t('benefitsSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <GlassCard className="h-full p-6">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-secondary-blue/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-secondary-blue" />
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
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-secondary-blue/[0.03] to-transparent">
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
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-secondary-blue/30 to-primary-cyan/20 border border-secondary-blue/40 flex items-center justify-center">
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
                      <CheckCircle size={18} className="text-secondary-blue flex-shrink-0 mt-0.5" />
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
            className="bg-gradient-to-br from-secondary-blue/10 to-primary-cyan/10 border border-secondary-blue/30 rounded-3xl p-12 text-center"
          >
            <Shield size={40} className="text-brand-gold mx-auto mb-4" />
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
