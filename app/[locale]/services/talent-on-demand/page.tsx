'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Users, Building2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function TalentOnDemandPage() {
  const t = useTranslations('services.talentOnDemand');

  const features = [
    'Month-to-month flexibility — scale up or down anytime',
    'Managed payroll, benefits & local compliance',
    'IT equipment & secure infrastructure provided',
    'Weekly performance reports & KPI tracking',
    'Dedicated account manager for your team',
  ];

  const tiers = [
    { key: 'starter', icon: Zap, label: '1-3 hires' },
    { key: 'growth', icon: Users, label: '4-9 hires' },
    { key: 'scale', icon: Building2, label: '10+ hires' },
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/[0.06] via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan text-sm font-semibold mb-4">
            Flexible Staffing
          </span>
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      <div className="container max-w-4xl pb-16">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-12"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="relative z-10">
              <p className="text-text-gray text-lg mb-8">{t('description')}</p>
              <div className="space-y-4 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-primary-cyan flex-shrink-0 mt-1" />
                    <span className="text-white">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tiers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.key}
              variants={fadeInUp}
            >
              <GlassCard className="p-6 text-center h-full">
                <div className="relative z-10">
                  <tier.icon size={28} className="text-primary-cyan mx-auto mb-3" />
                  <h3 className="text-white font-heading font-bold mb-1">
                    {t(`tiers.${tier.key}`)}
                  </h3>
                  <p className="text-text-gray text-sm">{tier.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <ShinyButton href="/book">
            {t('cta')} <ArrowRight size={16} className="inline ml-1" />
          </ShinyButton>
        </div>
      </div>
    </main>
  );
}
