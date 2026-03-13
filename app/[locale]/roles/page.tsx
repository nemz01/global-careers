import { useTranslations } from 'next-intl';
import { SALARY_DATA } from '@/lib/salary-data';
import { RoleDirectory } from '@/components/roles/RoleGrid';
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
        ? 'Offshore Roles — Browse 20+ Positions with Salary Data'
        : 'Roles Offshore — Explore 20+ Posiciones con Datos Salariales',
    description:
      locale === 'en'
        ? 'Browse our directory of offshore roles. Compare US vs offshore salaries, see savings percentages, and find the talent you need.'
        : 'Explore nuestro directorio de roles offshore. Compare salarios US vs offshore y encuentre el talento que necesita.',
  };
}

export default function RolesPage() {
  const t = useTranslations('roles');

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
        <RoleDirectory roles={SALARY_DATA} />
      </div>
    </main>
  );
}
