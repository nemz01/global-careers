import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default:
        locale === 'en'
          ? 'Global Careers — Offshore Staffing Solutions | Save 60-80% on Talent'
          : 'Global Careers — Soluciones de Staffing Offshore | Ahorre 60-80% en Talento',
      template: '%s | Global Careers',
    },
    description:
      locale === 'en'
        ? 'Save up to 80% on talent costs. Pre-vetted offshore professionals across technology, finance, marketing & more from 12+ countries. 6-month guarantee. Orlando, FL.'
        : 'Ahorre hasta 80% en costos de talento. Profesionales offshore pre-evaluados en tecnología, finanzas, marketing y más de 12+ países. Garantía de 6 meses.',
    keywords:
      locale === 'en'
        ? [
            'offshore staffing',
            'offshore staffing USA',
            'hire offshore professionals',
            'remote talent',
            'nearshore staffing',
            'global recruitment',
            'AI recruitment',
          ]
        : [
            'staffing offshore',
            'staffing offshore USA',
            'contratar profesionales offshore',
            'talento remoto',
            'reclutamiento global',
            'reclutamiento con IA',
          ],
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_US',
      url: 'https://globalcareers.com',
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Global Careers',
    },
    twitter: {
      card: 'summary_large_image',
      title:
        locale === 'en'
          ? 'Global Careers — Save 60-80% on Talent'
          : 'Global Careers — Ahorre 60-80% en Talento',
    },
    alternates: {
      languages: {
        en: '/',
        es: '/es',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      {locale !== 'en' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang="${locale}"`,
          }}
        />
      )}
      <NextIntlClientProvider messages={messages}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </NextIntlClientProvider>
    </>
  );
}
