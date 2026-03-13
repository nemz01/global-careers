'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Link } from '@/i18n/routing';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function AIShowcase() {
  const t = useTranslations('aiShowcase');

  const features = [
    { icon: Brain, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: Target, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Calendar, title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: BarChart3, title: t('feature4Title'), desc: t('feature4Desc') },
  ];

  return (
    <section className="py-24 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-cyan/[0.03] to-transparent pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={16} className="text-primary-cyan" />
            </motion.div>
            <span className="text-sm font-medium text-primary-cyan">
              {t('badge')}
            </span>
          </motion.div>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <GlassCard className="h-full text-center p-6">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary-cyan/20 flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={24} className="text-primary-cyan" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <Link
            href="/services/ai-shore"
            className="inline-flex items-center gap-2 text-primary-cyan font-semibold hover:gap-3 transition-all"
          >
            {t('cta')} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
