'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Code, Database, Settings, DollarSign, Megaphone,
  Phone, Palette, Briefcase, Users, HeadphonesIcon,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Link } from '@/i18n/routing';
import { SALARY_DATA, getCategories } from '@/lib/salary-data';
import { staggerContainerFast, scaleIn } from '@/lib/animations';

import type { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  technology: Code,
  data: Database,
  operations: Settings,
  finance: DollarSign,
  marketing: Megaphone,
  sales: Phone,
  creative: Palette,
  executive: Briefcase,
  customer_service: HeadphonesIcon,
  hr: Users,
};

export function RolesGrid() {
  const t = useTranslations('roles');
  const categories = getCategories();

  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          variants={staggerContainerFast}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
        >
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Code;
            const rolesInCat = SALARY_DATA.filter((r) => r.category === cat);
            const minSavings = Math.min(
              ...rolesInCat.map((r) => r.savings_percentage)
            );
            const maxSavings = Math.max(
              ...rolesInCat.map((r) => r.savings_percentage)
            );

            return (
              <motion.div
                key={cat}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              >
                <Link href="/roles">
                  <GlassCard className="text-center p-4 cursor-pointer hover:border-primary-cyan/30">
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-primary-cyan/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-cyan/20 transition-colors">
                        <Icon size={22} className="text-primary-cyan" />
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {t(`categories.${cat}`)}
                      </h3>
                      <p className="text-xs text-text-gray mb-2">
                        {rolesInCat.length} {t('rolesCount', { count: rolesInCat.length })}
                      </p>
                      <span className="text-xs font-medium text-brand-gold">
                        {t('savingsRange', { min: minSavings, max: maxSavings })}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
