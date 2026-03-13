import { notFound } from 'next/navigation';
import { SALARY_DATA, getRoleBySlug } from '@/lib/salary-data';
import { RoleDetail } from '@/components/roles/RoleDetail';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return SALARY_DATA.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: 'Role Not Found' };

  const title = locale === 'en' ? role.title_en : role.title_es;
  const savings = Math.round(
    (1 - role.offshore_salary_avg / role.us_salary_avg) * 100
  );

  return {
    title: `Hire a ${title} — Save ${savings}%`,
    description: `Hire a pre-vetted offshore ${title} and save up to ${savings}% compared to US salaries. From $${role.offshore_salary_avg.toLocaleString()}/yr vs $${role.us_salary_avg.toLocaleString()}/yr in the US.`,
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) notFound();

  const relatedRoles = SALARY_DATA.filter(
    (r) => r.category === role.category && r.slug !== role.slug
  ).slice(0, 3);

  return <RoleDetail role={role} relatedRoles={relatedRoles} locale={locale} />;
}
