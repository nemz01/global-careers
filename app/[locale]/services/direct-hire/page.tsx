'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Shield, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function DirectHirePage() {
  const t = useTranslations('services.directHire');

  const features = [
    'Comprehensive candidate vetting (technical + cultural fit)',
    'Full background checks & reference verification',
    'Contract & compliance handled end-to-end',
    'Onboarding support & transition management',
    'Dedicated talent advisor throughout the process',
  ];

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.06] via-transparent to-transparent" />
        <div className="absolute inset-0 hero-grid-pattern" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-semibold mb-4">
            Permanent Placement
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
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8 sm:p-12">
              <div className="relative z-10">
                <p className="text-text-gray text-lg mb-8">{t('description')}</p>
                <div className="space-y-4 mb-8">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-brand-gold flex-shrink-0 mt-1" />
                      <span className="text-white">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Guarantee */}
          <motion.div variants={fadeInUp} className="mt-6">
            <GlassCard className="p-8 border-brand-gold/20">
              <div className="relative z-10 flex items-start gap-4">
                <Shield size={32} className="text-brand-gold flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">6-Month Guarantee</h3>
                  <p className="text-text-gray">{t('guarantee')}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
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
