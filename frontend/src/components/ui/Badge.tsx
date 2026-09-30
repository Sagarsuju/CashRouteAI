import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'safe' | 'warning' | 'critical' | 'info' | 'neutral' | 'brand';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  dot = false,
  ...props
}) => {
  const variants = {
    safe: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    critical: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200/80',
    brand: 'bg-brand-50 text-brand-700 border-brand-200/80',
  };

  const dotColors = {
    safe: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500 animate-pulse',
    info: 'bg-sky-500',
    neutral: 'bg-slate-400',
    brand: 'bg-brand-500',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
