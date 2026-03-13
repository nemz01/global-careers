'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Building2, Globe, Bot, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Link } from '@/i18n/routing';
import { fadeInUp, staggerContainer, springHover } from '@/lib/animations';

export function ServicesOverview() {
  const t = useTranslations('services');
  const to = useTranslations('servicesOverview');

  const services = [
    {
      icon: Building2,
      iconColor: 'text-secondary-blue',
      iconBg: 'bg-secondary-blue/10',
      title: t('usHiring.title'),
      description: t('usHiring.description'),
      price: 'US',
      priceLabel: 'based talent',
      href: '/services/us-hiring' as const,
      features: [to('usHiringFeature1'), to('usHiringFeature2'), to('usHiringFeature3')],
    },
    {
      icon: Globe,
      iconColor: 'text-primary-cyan',
      iconBg: 'bg-primary-cyan/10',
      title: t('offshoreHiring.title'),
      description: t('offshoreHiring.description'),
      price: '60-80%',
      priceLabel: 'savings',
      href: '/services/offshore-hiring' as const,
      features: [to('offshoreFeature1'), to('offshoreFeature2'), to('offshoreFeature3')],
    },
    {
      icon: Bot,
      iconColor: 'text-brand-gold',
      iconBg: 'bg-brand-gold/10',
      title: t('aiShore.title'),
      description: t('aiShore.description'),
      price: 'AI',
      priceLabel: 'employees',
      href: '/services/ai-shore' as const,
      features: [to('aiShoreFeature1'), to('aiShoreFeature2'), to('aiShoreFeature3')],
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
            {to('title')}
          </h2>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {to('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={springHover}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4`}>
                    <service.icon size={24} className={service.iconColor} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-gray text-sm mb-4">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold gradient-text-gold">
                      {service.price}
                    </span>
                    <span className="text-text-gray text-sm ml-2">
                      {service.priceLabel}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-primary-cyan font-semibold hover:gap-3 transition-all text-sm"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
