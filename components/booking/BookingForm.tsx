'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
];

export function BookingForm() {
  const t = useTranslations('booking');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    company: '',
    phone: '',
    booking_type: 'intro_call',
    date: '',
    time_slot: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
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

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <GlassCard className="p-8">
      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-text-gray mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-text-gray mb-1.5">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-text-gray mb-1.5">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-text-gray mb-1.5">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors"
              />
            </div>
          </div>

          {/* Booking Type */}
          <div>
            <label className="block text-sm text-text-gray mb-1.5">{t('selectType')}</label>
            <div className="grid grid-cols-3 gap-3">
              {['intro_call', 'talent_review', 'follow_up'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, booking_type: type })}
                  className={`p-3 rounded-lg border text-sm text-center transition-all ${
                    formData.booking_type === type
                      ? 'bg-primary-cyan/10 border-primary-cyan/40 text-white'
                      : 'bg-white/5 border-white/10 text-text-gray hover:border-white/20'
                  }`}
                >
                  {type === 'intro_call' && t('introCall')}
                  {type === 'talent_review' && t('talentReview')}
                  {type === 'follow_up' && t('followUp')}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-text-gray mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} /> {t('selectDate')}
              </label>
              <input
                type="date"
                required
                min={minDate}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm text-text-gray mb-1.5 flex items-center gap-1.5">
                <Clock size={14} /> {t('selectTime')}
              </label>
              <select
                required
                value={formData.time_slot}
                onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors"
              >
                <option value="" className="bg-dark-navy">Select time...</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot} className="bg-dark-navy">{slot} EST</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-text-gray mb-1.5">{t('notes')}</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-cyan/50 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-error text-sm">
              <AlertCircle size={16} />
              Something went wrong. Please try again.
            </div>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-cyan to-secondary-blue text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
          >
            {status === 'loading' ? 'Booking...' : t('confirm')}
          </motion.button>
        </form>
      </div>
    </GlassCard>
  );
}
