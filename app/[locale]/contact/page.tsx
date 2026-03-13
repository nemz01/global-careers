'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <GlassCard className="p-6">
              <div className="relative z-10 flex items-start gap-3">
                <Mail size={20} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-sm">Email</h3>
                  <p className="text-text-gray text-sm mt-1">hello@globalcareers.com</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="relative z-10 flex items-start gap-3">
                <Phone size={20} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-sm">Phone</h3>
                  <p className="text-text-gray text-sm mt-1">+1 (407) 555-0123</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="relative z-10 flex items-start gap-3">
                <MapPin size={20} className="text-primary-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-sm">Locations</h3>
                  <p className="text-text-gray text-sm mt-1">Orlando, FL (HQ)</p>
                  <p className="text-text-gray text-sm">Montr&eacute;al, QC (Ops)</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
