import { useTranslations } from 'next-intl';
import { SavingsCalculator } from '@/components/calculator/SavingsCalculator';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'en'
        ? 'Savings Calculator — See How Much You Can Save'
        : 'Calculadora de Ahorros — Vea Cuánto Puede Ahorrar',
    description:
      locale === 'en'
        ? 'Calculate your potential savings by hiring offshore talent. Compare US vs offshore salaries for 20+ roles.'
        : 'Calcule sus ahorros potenciales al contratar talento offshore. Compare salarios US vs offshore para 20+ roles.',
  };
}

export default function CalculatorPage() {
  const t = useTranslations('calculator');

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="holographic-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <SavingsCalculator />
      </div>
    </main>
  );
}
