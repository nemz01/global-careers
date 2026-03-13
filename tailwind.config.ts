import type { Config } from 'tailwindcss';

const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default ||
  require('tailwindcss/lib/util/flattenColorPalette');

function addVariablesForColors({ addBase, theme }: { addBase: any; theme: any }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ':root': newVars });
}

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-cyan': '#00A3E0',
        'primary-blue': '#00A3E0',
        'dark-navy': '#0A1628',
        'deep-blue': '#003D7A',
        'secondary-blue': '#0066CC',
        'brand-gold': '#D4A843',
        'brand-gold-light': '#E5BE6A',
        'brand-gold-dark': '#B8892E',
        'brand-silver': '#94A3B8',
        sky: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
        'gradient-start': '#003D7A',
        'gradient-end': '#00A3E0',
        'text-white': '#FFFFFF',
        'text-gray': '#B0B8C1',
        success: '#10B981',
        error: '#EF4444',
        'card-bg': 'rgba(10, 22, 40, 0.8)',
        'border-glow': 'rgba(0, 163, 224, 0.3)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow-pulse 2s ease-in-out infinite',
        gradient: 'gradient-shift 3s ease infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 163, 224, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(0, 163, 224, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 163, 224, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 163, 224, 0.8), 0 0 60px rgba(0, 163, 224, 0.4)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors],
};

export default config;
