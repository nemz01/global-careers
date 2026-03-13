'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        hover && 'hover:border-primary-cyan/20',
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
