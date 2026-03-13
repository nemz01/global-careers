'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  MessageSquare, Users, Rocket, FileSearch, Brain, Video, Shield, CheckCircle,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';

export default function HowItWorksPage() {
  const t = useTranslations('howItWorks');

  const steps = [
    { icon: MessageSquare, step: 1 },
    { icon: Users, step: 2 },
    { icon: Rocket, step: 3 },
  ];

  const vettingSteps = [
    { icon: FileSearch, step: 1 },
    { icon: Brain, step: 2 },
    { icon: Video, step: 3 },
    { icon: Shield, step: 4 },
    { icon: CheckCircle, step: 5 },
  ];

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="space-y-8 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard className="p-8">
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-cyan/10 border-2 border-primary-cyan/30 flex items-center justify-center">
                    <span className="text-primary-cyan font-bold text-xl">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                      {t(`step${s.step}Title`)}
                    </h3>
                    <p className="text-text-gray">
                      {t(`step${s.step}Description`)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Vetting Process */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="holographic-subtitle text-2xl md:text-3xl font-heading font-bold mb-4">
              {t('vettingTitle')}
            </h2>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              {t('vettingSubtitle')}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {vettingSteps.map((vs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-cyan/10 border border-primary-cyan/30 flex items-center justify-center relative">
                  <vs.icon size={20} className="text-primary-cyan" />
                  {i < vettingSteps.length - 1 && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary-cyan/30 to-transparent" />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-lg">
                    {t(`vettingStep${vs.step}Title`)}
                  </h3>
                  <p className="text-text-gray text-sm mt-1">
                    {t(`vettingStep${vs.step}Description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <ShinyButton href="/book">
            Book a Free Consultation
          </ShinyButton>
        </div>
      </div>
    </main>
  );
}
