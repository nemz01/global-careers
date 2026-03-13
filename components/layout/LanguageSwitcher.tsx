'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    router.replace(
      // @ts-expect-error -- next-intl typing requires literal pathnames
      { pathname, params },
      { locale: newLocale }
    );
  };

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary-cyan/30 transition-all duration-300"
      aria-label={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
