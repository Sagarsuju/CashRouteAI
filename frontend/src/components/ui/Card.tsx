import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border border-slate-200/80 bg-white p-5 shadow-subtle transition-all duration-200',
          hoverEffect && 'hover:-translate-y-1 hover:shadow-premium',
          glass && 'glass-panel',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
