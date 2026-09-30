import React, { useState } from 'react';
import { Card } from '../ui/Card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { DEMO_DEMAND_DATA } from '../../lib/api';

export const DemandChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('today');

  return (
    <Card hoverEffect className="space-y-4">
      {/* Header with Title and Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Cash Demand Forecast</h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-brand-500" />
              scikit-learn Ensemble
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Actual withdrawal trends vs AI predictive demand curve
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(['today', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={clsx(
                'px-3 py-1 rounded-lg transition-all capitalize',
                timeRange === range
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DEMO_DEMAND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="predGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0C83EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0C83EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                `₹${Number(value).toLocaleString()}`,
                name === 'actual_demand' ? 'Historical Actual' : 'Predicted Demand',
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
                fontSize: '12px',
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
            />
            <Area
              type="monotone"
              dataKey="actual_demand"
              name="Historical Actual"
              stroke="#64748B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#actualGradient)"
            />
            <Area
              type="monotone"
              dataKey="predicted_demand"
              name="AI Predicted Demand"
              stroke="#0C83EB"
              strokeWidth={3}
              strokeDasharray={timeRange === 'today' ? undefined : '5 5'}
              fillOpacity={1}
              fill="url(#predGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
