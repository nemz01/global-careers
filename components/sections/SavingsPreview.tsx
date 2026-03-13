'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown } from 'lucide-react';
import { getFeaturedRoles } from '@/lib/salary-data';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function SavingsPreview() {
  const t = useTranslations('calculator');
  const roles = getFeaturedRoles().slice(0, 5);

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
          className="max-w-4xl mx-auto space-y-4 mb-12"
        >
          {roles.map((role) => {
            const savingsAmount = role.us_salary_avg - role.offshore_salary_avg;
            const savingsPct = Math.round(
              (1 - role.offshore_salary_avg / role.us_salary_avg) * 100
            );

            return (
              <motion.div
                key={role.slug}
                variants={fadeInUp}
                whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="glass-card p-4 sm:p-6"
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      {role.title_en}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-text-gray text-sm">
                        <DollarSign size={14} />
                        <span>US: ${role.us_salary_avg.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-cyan text-sm">
                        <TrendingDown size={14} />
                        <span>
                          Offshore: ${role.offshore_salary_avg.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Savings bar */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:w-40">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${savingsPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary-cyan to-brand-gold rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <span className="text-brand-gold font-bold text-lg">
                        {savingsPct}% saved
                      </span>
                      <p className="text-xs text-text-gray">
                        ${savingsAmount.toLocaleString()}/yr
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center">
          <ShinyButton href="/calculator">{t('ctaHire')}</ShinyButton>
        </div>
      </div>
    </section>
  );
}
