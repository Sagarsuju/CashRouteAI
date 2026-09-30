import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface StatCardProps {
  title: string;
  value: string | number;
  comparisonText?: string;
  trendPercentage?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  accentColor?: 'brand' | 'rose' | 'amber' | 'emerald' | 'slate';
  sparklineData?: number[];
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  comparisonText = 'vs yesterday',
  trendPercentage,
  trendDirection = 'up',
  icon,
  accentColor = 'brand',
  sparklineData = [40, 55, 45, 60, 52, 75, 70],
}) => {
  const accentBgs = {
    brand: 'bg-brand-50 text-brand-600 border-brand-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sparklineColors = {
    brand: '#0C83EB',
    rose: '#EF4444',
    amber: '#F59E0B',
    emerald: '#10B981',
    slate: '#64748B',
  };

  // SVG sparkline points calculation
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 26;

  const points = sparklineData
    .map((d, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((d - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Card hoverEffect className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className={clsx('p-2.5 rounded-xl border shrink-0', accentBgs[accentColor])}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
        {trendPercentage !== undefined ? (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={clsx(
                'inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[11px]',
                trendDirection === 'up'
                  ? 'text-emerald-700 bg-emerald-50'
                  : trendDirection === 'down'
                  ? 'text-rose-700 bg-rose-50'
                  : 'text-slate-600 bg-slate-100'
              )}
            >
              {trendDirection === 'up' ? (
                <TrendingUp className="w-3 h-3 mr-0.5 inline" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5 inline" />
              )}
              {trendPercentage > 0 ? `+${trendPercentage}%` : `${trendPercentage}%`}
            </span>
            <span className="text-slate-400 text-[11px] font-normal">{comparisonText}</span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs">{comparisonText}</span>
        )}

        {/* Mini sparkline */}
        <div className="opacity-75 group-hover:opacity-100 transition-opacity">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={sparklineColors[accentColor]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};
