'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Link } from '@/i18n/routing';
import type { Role } from '@/types/roles';
import { getCategories } from '@/lib/salary-data';

interface RoleDirectoryProps {
  roles: Omit<Role, 'id' | 'created_at' | 'updated_at' | 'vetting_criteria'>[];
}

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

export function RoleDirectory({ roles }: RoleDirectoryProps) {
  const t = useTranslations('roles');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const categories = getCategories();

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesSearch =
        !search ||
        role.title_en.toLowerCase().includes(search.toLowerCase()) ||
        role.skills_required.some((s) =>
          s.toLowerCase().includes(search.toLowerCase())
        );
      const matchesCategory = !categoryFilter || role.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [roles, search, categoryFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <Search size={18} className="text-text-gray" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder') || 'Search roles or skills...'}
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-text-gray/50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary-cyan/50 focus:outline-none"
        >
          <option value="" className="bg-dark-navy">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-dark-navy">
              {categoryLabels[cat] || cat}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role, i) => {
          const savingsPct = Math.round(
            (1 - role.offshore_salary_avg / role.us_salary_avg) * 100
          );
          const savingsAmt = role.us_salary_avg - role.offshore_salary_avg;

          return (
            <motion.div
              key={role.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={`/roles/${role.slug}` as any}>
                <GlassCard className="p-6 h-full cursor-pointer hover:border-primary-cyan/30 transition-all">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {role.title_en}
                        </h3>
                        <span className="text-xs text-primary-cyan">
                          {categoryLabels[role.category] || role.category}
                        </span>
                      </div>
                      {role.is_featured && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-medium">
                          {t('featured')}
                        </span>
                      )}
                    </div>

                    {/* Salary comparison */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-gray">US</span>
                        <span className="text-white">
                          ${role.us_salary_avg.toLocaleString()}/yr
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-gray">Offshore</span>
                        <span className="text-primary-cyan">
                          ${role.offshore_salary_avg.toLocaleString()}/yr
                        </span>
                      </div>
                    </div>

                    {/* Savings badge */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1 text-success text-sm">
                        <TrendingDown size={14} />
                        <span className="font-semibold">Save {savingsPct}%</span>
                      </div>
                      <span className="text-brand-gold font-bold">
                        ${savingsAmt.toLocaleString()}/yr
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {role.skills_required.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-text-gray"
                        >
                          {skill}
                        </span>
                      ))}
                      {role.skills_required.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-text-gray">
                          +{role.skills_required.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-12 text-text-gray">
          No roles match your search. Try different keywords.
        </div>
      )}
    </div>
  );
}
