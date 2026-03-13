'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Award, Eye, Zap, Shield, MapPin, Building2,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    { key: 'quality', icon: Award, color: 'primary-cyan' },
    { key: 'transparency', icon: Eye, color: 'brand-gold' },
    { key: 'speed', icon: Zap, color: 'primary-cyan' },
    { key: 'guarantee', icon: Shield, color: 'brand-gold' },
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

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="relative z-10">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Our Story</h2>
              <p className="text-text-gray text-lg leading-relaxed mb-6">{t('story')}</p>
              <p className="text-text-gray text-lg leading-relaxed">{t('mission')}</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="relative z-10">
                    <v.icon size={28} className={`text-${v.color} mb-4`} />
                    <h3 className="text-lg font-heading font-bold text-white mb-2">
                      {t(`values.${v.key}.title`)}
                    </h3>
                    <p className="text-text-gray text-sm">
                      {t(`values.${v.key}.description`)}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8">
            <div className="relative z-10">
              <h2 className="text-2xl font-heading font-bold text-white mb-6">
                {t('locations.title')}
              </h2>
              <p className="text-text-gray mb-8">{t('teamDescription')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <MapPin size={20} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">{t('locations.orlando')}</h3>
                    <p className="text-text-gray text-sm mt-1">US Headquarters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Building2 size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">{t('locations.montreal')}</h3>
                    <p className="text-text-gray text-sm mt-1">Operations Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
