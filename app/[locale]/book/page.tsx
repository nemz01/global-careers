'use client';

import { useTranslations } from 'next-intl';
import { BookingForm } from '@/components/booking/BookingForm';

export default function BookPage() {
  const t = useTranslations('booking');

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
}
