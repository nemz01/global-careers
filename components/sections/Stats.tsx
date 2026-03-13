'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Users, Globe, TrendingUp, Building } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Stats() {
  const t = useTranslations('stats');

  const stats = [
    {
      icon: Users,
      end: 500,
      suffix: '+',
      label: t('placementsLabel'),
    },
    {
      icon: Globe,
      end: 12,
      suffix: '+',
      label: t('countriesLabel'),
    },
    {
      icon: TrendingUp,
      end: 80,
      suffix: '%',
      label: t('savingsLabel'),
    },
    {
      icon: Building,
      end: 200,
      suffix: '+',
      label: t('clientsLabel'),
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -4, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
              className="flex flex-col items-center text-center gap-3 cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center mb-2">
                <stat.icon size={22} className="text-primary-cyan" />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-heading text-white">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-text-gray">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
