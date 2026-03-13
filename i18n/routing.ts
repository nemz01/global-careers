import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': { en: '/about', es: '/acerca' },
    '/how-it-works': { en: '/how-it-works', es: '/como-funciona' },
    '/pricing': { en: '/pricing', es: '/precios' },
    '/calculator': { en: '/calculator', es: '/calculadora' },
    '/roles': { en: '/roles', es: '/puestos' },
    '/roles/[slug]': { en: '/roles/[slug]', es: '/puestos/[slug]' },
    '/services/us-hiring': { en: '/services/us-hiring', es: '/servicios/contratacion-eeuu' },
    '/services/offshore-hiring': { en: '/services/offshore-hiring', es: '/servicios/contratacion-offshore' },
    '/services/ai-shore': { en: '/services/ai-shore', es: '/servicios/ai-shore' },
    '/candidates': { en: '/candidates', es: '/candidatos' },
    '/jobs': { en: '/jobs', es: '/empleos' },
    '/blog': { en: '/blog', es: '/blog' },
    '/blog/[slug]': { en: '/blog/[slug]', es: '/blog/[slug]' },
    '/contact': { en: '/contact', es: '/contacto' },
    '/book': { en: '/book', es: '/reservar' },
    '/privacy': { en: '/privacy', es: '/privacidad' },
    '/terms': { en: '/terms', es: '/terminos' },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
