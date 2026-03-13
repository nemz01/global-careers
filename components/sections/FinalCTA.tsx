'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp } from '@/lib/animations';

export function FinalCTA() {
  const t = useTranslations('cta');
  const tf = useTranslations('finalCta');

  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="holographic-title text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            {tf('title')}
          </h2>
          <p className="text-text-gray text-lg mb-10 max-w-xl mx-auto">
            {tf('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShinyButton href="/book">{t('bookCall')}</ShinyButton>
            <ShinyButton href="/calculator" className="bg-transparent border border-primary-cyan/30">
              {t('calculateSavings')}
            </ShinyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
