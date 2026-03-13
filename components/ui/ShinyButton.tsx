'use client';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

export function ShinyButton({
  children,
  href,
  onClick,
  className,
  showArrow = true,
}: ShinyButtonProps) {
  const inner = (
    <span
      className={cn(
        'relative z-10 flex items-center gap-2 rounded-full bg-dark-navy px-6 py-3 font-bold text-white transition-all',
        className
      )}
    >
      {children}
      {showArrow && (
        <ChevronRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </span>
  );

  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link href={href as any} className="shiny-button-wrapper group">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="shiny-button-wrapper group">
      {inner}
    </button>
  );
}
