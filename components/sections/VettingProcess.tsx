'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileSearch, Brain, Video, Shield, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function VettingProcess() {
  const t = useTranslations('howItWorks');

  const icons = [FileSearch, Brain, Video, Shield, CheckCircle];

  const steps = Array.from({ length: 5 }, (_, i) => ({
    icon: icons[i],
    title: t(`vettingStep${i + 1}Title`),
    desc: t(`vettingStep${i + 1}Description`),
  }));

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
            {t('vettingTitle')}
          </h2>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('vettingSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-start gap-4 mb-8 last:mb-0"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-cyan/10 border border-primary-cyan/30 flex items-center justify-center relative">
                <step.icon size={20} className="text-primary-cyan" />
                {i < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary-cyan/30 to-transparent" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                <p className="text-text-gray text-sm mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
