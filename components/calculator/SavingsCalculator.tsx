'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingDown, ArrowRight, Mail, Building } from 'lucide-react';
import { SALARY_DATA, getCategories } from '@/lib/salary-data';
import { GlassCard } from '@/components/ui/GlassCard';

export function SavingsCalculator() {
  const t = useTranslations('calculator');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = getCategories();
  const rolesInCategory = useMemo(
    () =>
      selectedCategory
        ? SALARY_DATA.filter((r) => r.category === selectedCategory)
        : [],
    [selectedCategory]
  );

  const selectedRoleData = useMemo(
    () => SALARY_DATA.find((r) => r.slug === selectedRole),
    [selectedRole]
  );

  const savings = useMemo(() => {
    if (!selectedRoleData) return null;
    const annual = selectedRoleData.us_salary_avg - selectedRoleData.offshore_salary_avg;
    const pct = Math.round(
      (1 - selectedRoleData.offshore_salary_avg / selectedRoleData.us_salary_avg) * 100
    );
    return { annual, percentage: pct };
  }, [selectedRoleData]);

  const handleSubmit = async () => {
    if (!selectedRoleData || !savings) return;

    try {
      await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || undefined,
          company_name: company || undefined,
          role_title: selectedRoleData.title_en,
          us_salary: selectedRoleData.us_salary_avg,
          offshore_salary: selectedRoleData.offshore_salary_avg,
          annual_savings: savings.annual,
        }),
      });
      setSubmitted(true);
    } catch {
      // Silently fail
    }
  };

  const categoryLabels: Record<string, string> = {
    technology: 'Technology',
    data: 'Data & AI',
    operations: 'Operations',
    finance: 'Finance',
    marketing: 'Marketing',
    sales: 'Sales',
    creative: 'Creative',
    executive: 'Executive',
    customer_service: 'Support',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Selectors */}
        <GlassCard className="p-6 sm:p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">
                {t('selectCategory')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedRole('');
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-cyan/50 focus:outline-none transition-colors"
              >
                <option value="" className="bg-dark-navy">
                  -- Select category --
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-dark-navy">
                    {categoryLabels[cat] || cat}
                  </option>
                ))}
              </select>
            </div>

            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-text-gray mb-2">
                    {t('selectRole')}
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary-cyan/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-dark-navy">
                      -- Select role --
                    </option>
                    {rolesInCategory.map((role) => (
                      <option key={role.slug} value={role.slug} className="bg-dark-navy">
                        {role.title_en}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {selectedRoleData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                <div className="flex justify-between items-center">
                  <span className="text-text-gray text-sm">{t('usSalary')}</span>
                  <span className="text-white font-semibold text-lg">
                    ${selectedRoleData.us_salary_avg.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-gray text-sm">{t('offshoreSalary')}</span>
                  <span className="text-primary-cyan font-semibold text-lg">
                    ${selectedRoleData.offshore_salary_avg.toLocaleString()}
                  </span>
                </div>

                {/* Salary bars */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-text-gray mb-1">
                      <span>US</span>
                      <span>${selectedRoleData.us_salary_avg.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-text-gray mb-1">
                      <span>Offshore</span>
                      <span>${selectedRoleData.offshore_salary_avg.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(selectedRoleData.offshore_salary_avg / selectedRoleData.us_salary_avg) * 100}%`,
                        }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary-cyan to-brand-gold rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>

        {/* Right: Results */}
        <GlassCard className="p-6 sm:p-8">
          <div className="relative z-10 flex flex-col h-full">
            {savings ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <p className="text-text-gray text-sm mb-2">{t('annualSavings')}</p>
                  <div className="text-5xl font-bold gradient-text-gold font-heading">
                    ${savings.annual.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <TrendingDown size={16} className="text-success" />
                    <span className="text-success font-semibold">
                      {savings.percentage}% {t('savingsPercentage')}
                    </span>
                  </div>
                </div>

                {/* Email capture */}
                {!submitted ? (
                  <div className="space-y-3 mt-auto">
                    <p className="text-sm text-text-gray text-center">
                      {t('getReport')}
                    </p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                      <Mail size={16} className="text-text-gray" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('emailPlaceholder')}
                        className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-text-gray/50"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                      <Building size={16} className="text-text-gray" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t('companyPlaceholder')}
                        className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-text-gray/50"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full btn-primary-cta rounded-xl text-center text-sm py-3"
                    >
                      {t('ctaHire')} <ArrowRight size={16} className="inline ml-1" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center mt-auto p-4 rounded-xl bg-success/10 border border-success/20">
                    <p className="text-success font-semibold">
                      Thanks! We&apos;ll send your detailed savings report shortly.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <DollarSign size={48} className="text-primary-cyan/30 mb-4" />
                <p className="text-text-gray">
                  Select a role category and role to see your potential savings
                </p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
