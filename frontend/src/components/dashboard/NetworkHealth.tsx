import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export interface NetworkHealthProps {
  score?: number;
  healthyCount?: number;
  warningCount?: number;
  criticalCount?: number;
}

export const NetworkHealth: React.FC<NetworkHealthProps> = ({
  score = 98.4,
  healthyCount = 462,
  warningCount = 18,
  criticalCount = 6,
}) => {
  const data = [
    { name: 'Healthy', value: healthyCount, color: '#10B981' },
    { name: 'Warning', value: warningCount, color: '#F59E0B' },
    { name: 'Critical', value: criticalCount, color: '#EF4444' },
  ];

  return (
    <Card hoverEffect className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">ATM Network Health</h3>
            <p className="text-xs text-slate-500 mt-0.5">Fleet liquidity & hardware reliability</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
            Autonomous Guard
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative h-44 flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Score Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{score}%</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Health Index</span>
          </div>
        </div>
      </div>

      {/* Breakdown Legend Strip */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
        <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Healthy
          </div>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">{healthyCount}</p>
        </div>

        <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Warning
          </div>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">{warningCount}</p>
        </div>

        <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-100">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-800">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Critical
          </div>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">{criticalCount}</p>
        </div>
      </div>
    </Card>
  );
};
