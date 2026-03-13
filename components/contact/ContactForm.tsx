'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <GlassCard className="p-8 text-center">
        <div className="relative z-10">
          <CheckCircle size={48} className="text-primary-cyan mx-auto mb-4" />
          <p className="text-white text-lg">{t('success')}</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8">
      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot */}
          <input
            type="text"
            name="company_url"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-text-gray mb-1.5">{t('name')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-text-gray mb-1.5">{t('email')}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-text-gray mb-1.5">{t('company')}</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-text-gray mb-1.5">{t('phone')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-gray mb-1.5">{t('message')}</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-cyan/50 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-error text-sm">
              <AlertCircle size={16} />
              {t('error')}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-cyan to-secondary-blue text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
          >
            <Send size={18} />
            {status === 'loading' ? 'Sending...' : t('submit')}
          </motion.button>
        </form>
      </div>
    </GlassCard>
  );
}
