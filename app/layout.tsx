import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://globalcareers.com'
  ),
  title: {
    default: 'Global Careers — Offshore Staffing Solutions for US Companies',
    template: '%s | Global Careers',
  },
  description:
    'Save up to 80% on talent costs. Global Careers connects US companies with pre-vetted offshore professionals across technology, finance, marketing & more. 6-month guarantee.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-transparent min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
