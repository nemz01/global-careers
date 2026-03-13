'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      icon: Search,
      number: '02',
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      icon: CheckCircle,
      number: '03',
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="holographic-subtitle text-3xl md:text-4xl font-heading font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <GlassCard className="text-center h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="step-circle text-primary-cyan">
                    {step.number}
                  </div>
                  <step.icon size={32} className="text-primary-cyan" />
                  <h3 className="text-xl font-heading font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
