import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  barColor?: 'brand' | 'emerald' | 'amber' | 'rose' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  barColor = 'auto',
  size = 'md',
  showLabel = false,
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const getAutoColor = (pct: number) => {
    if (pct < 15) return 'bg-rose-500';
    if (pct < 30) return 'bg-amber-500';
    return 'bg-brand-500';
  };

  const colorStyles = {
    brand: 'bg-brand-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    auto: getAutoColor(percentage),
  };

  const sizeStyles = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs text-slate-500 font-medium">
          <span>Utilization</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', colorStyles[barColor])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
