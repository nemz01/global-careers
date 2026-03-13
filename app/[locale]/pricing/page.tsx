'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Check, Zap, Users, Building2, ArrowRight, HelpCircle,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';

export default function PricingPage() {
  const t = useTranslations('pricing');

  const directHireFeatures = [
    'One-time placement fee',
    '6-month replacement guarantee',
    'Full candidate vetting & assessment',
    'Contract & compliance handled',
    'Onboarding support included',
  ];

  const tiers = [
    { key: 'junior', icon: Zap, price: '$1,400', color: 'primary-cyan' },
    { key: 'mid', icon: Users, price: '$2,200', color: 'brand-gold' },
    { key: 'senior', icon: Building2, price: '$3,500', color: 'secondary-blue' },
  ];

  const enterpriseFeatures = [
    'Dedicated account manager',
    'Volume discounts',
    'Priority sourcing pipeline',
    'Custom SLA & reporting',
    'On-site visits available',
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Direct Hire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard className="p-8 sm:p-12 border-brand-gold/20">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4">
                  Permanent Placement
                </span>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">
                  {t('directHire.title')}
                </h2>
                <p className="text-text-gray mb-6">{t('directHire.description')}</p>
                <div className="text-3xl font-bold text-brand-gold mb-6">
                  {t('directHire.price')}
                </div>
                <ShinyButton href="/book">
                  {t('cta')} <ArrowRight size={16} className="inline ml-1" />
                </ShinyButton>
              </div>
              <div className="space-y-3">
                {directHireFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-brand-gold flex-shrink-0" />
                    <span className="text-white text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Talent on Demand */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-2 text-center">
            {t('talentOnDemand.title')}
          </h2>
          <p className="text-text-gray text-center mb-8 max-w-2xl mx-auto">
            {t('talentOnDemand.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className={`p-6 text-center h-full ${i === 1 ? 'border-brand-gold/30 scale-105' : ''}`}>
                  <div className="relative z-10">
                    <tier.icon size={28} className={`text-${tier.color} mx-auto mb-4`} />
                    <h3 className="text-lg font-heading font-bold text-white mb-1">
                      {t(`talentOnDemand.tiers.${tier.key}.title`)}
                    </h3>
                    <div className={`text-3xl font-bold text-${tier.color} my-4`}>
                      {t(`talentOnDemand.tiers.${tier.key}.price`)}
                      <span className="text-sm text-text-gray font-normal">
                        {t(`talentOnDemand.tiers.${tier.key}.period`)}
                      </span>
                    </div>
                    <p className="text-text-gray text-sm">
                      {t(`talentOnDemand.tiers.${tier.key}.description`)}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard className="p-8 sm:p-12 border-primary-cyan/20">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">
                  {t('enterprise.title')}
                </h2>
                <p className="text-text-gray mb-6">{t('enterprise.description')}</p>
                <ShinyButton href="/contact">
                  {t('enterprise.cta')} <ArrowRight size={16} className="inline ml-1" />
                </ShinyButton>
              </div>
              <div className="space-y-3">
                {enterpriseFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-primary-cyan flex-shrink-0" />
                    <span className="text-white text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-6">
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                        <p className="text-text-gray text-sm">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
