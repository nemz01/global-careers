'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { scaleIn } from '@/lib/animations';

export function Guarantee() {
  const t = useTranslations('guarantee');

  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="max-w-3xl mx-auto glass-card p-8 sm:p-12 text-center border-brand-gold/20"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
              <Shield size={36} className="text-brand-gold" />
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-semibold mb-4">
              {t('badge')}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-text-gray text-lg max-w-xl mx-auto">
              {t('description')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
