'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { Link } from '@/i18n/routing';
import type { SalaryRole } from '@/lib/salary-data';

interface RoleDetailProps {
  role: SalaryRole;
  relatedRoles: SalaryRole[];
  locale: string;
}

export function RoleDetail({ role, relatedRoles, locale }: RoleDetailProps) {
  const t = useTranslations('roles');
  const title = locale === 'en' ? role.title_en : role.title_es;
  const description = locale === 'en' ? role.description_en : role.description_es;
  const savings = role.us_salary_avg - role.offshore_salary_avg;
  const savingsPct = Math.round(
    (1 - role.offshore_salary_avg / role.us_salary_avg) * 100
  );

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
          <Link href="/roles" className="hover:text-primary-cyan transition-colors">
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-white">{title}</span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-8 sm:p-12 mb-8">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan text-sm font-medium mb-4">
                {role.category}
              </span>
              {role.demand_level === 'critical' && (
                <span className="inline-block px-3 py-1 rounded-full bg-error/10 text-error text-sm font-medium mb-4 ml-2">
                  High Demand
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-text-gray text-lg mb-8">{description}</p>
              )}

              {/* Salary comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <DollarSign size={20} className="text-text-gray mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    ${role.us_salary_avg.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-gray">US Average /yr</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary-cyan/5 border border-primary-cyan/20">
                  <DollarSign size={20} className="text-primary-cyan mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary-cyan">
                    ${role.offshore_salary_avg.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-gray">Offshore Average /yr</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
                  <TrendingDown size={20} className="text-brand-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brand-gold">
                    ${savings.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-gray">You Save /yr ({savingsPct}%)</p>
                </div>
              </div>

              {/* Visual bar */}
              <div className="space-y-3 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-gray">US: ${role.us_salary_min.toLocaleString()} - ${role.us_salary_max.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-cyan">Offshore: ${role.offshore_salary_min.toLocaleString()} - ${role.offshore_salary_max.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(role.offshore_salary_avg / role.us_salary_avg) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary-cyan to-brand-gold rounded-full"
                    />
                  </div>
                </div>
              </div>

              <ShinyButton href="/book">
                Hire a {title}
              </ShinyButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Skills */}
        <GlassCard className="p-8 mb-8">
          <div className="relative z-10">
            <h2 className="text-xl font-heading font-bold text-white mb-4">
              {t('skillsRequired')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {role.skills_required.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 text-sm text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Countries */}
        <GlassCard className="p-8 mb-8">
          <div className="relative z-10">
            <h2 className="text-xl font-heading font-bold text-white mb-4">
              {t('countriesAvailable')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {role.countries_available.map((code) => (
                <div
                  key={code}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-text-gray"
                >
                  <MapPin size={14} className="text-primary-cyan" />
                  {code}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Related Roles */}
        {relatedRoles.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-6">
              Related Roles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedRoles.map((r) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <Link key={r.slug} href={`/roles/${r.slug}` as any}>
                  <GlassCard className="p-4 cursor-pointer hover:border-primary-cyan/30">
                    <div className="relative z-10">
                      <h3 className="text-white font-semibold mb-1">
                        {locale === 'en' ? r.title_en : r.title_es}
                      </h3>
                      <p className="text-sm text-brand-gold">
                        Save {Math.round((1 - r.offshore_salary_avg / r.us_salary_avg) * 100)}%
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
