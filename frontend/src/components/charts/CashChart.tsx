import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const CashChart: React.FC = () => {
  const data = [
    { zone: 'Brodipet', allocated: 42.5, capacity: 120.0 },
    { zone: 'Lakshmipuram', allocated: 85.0, capacity: 150.0 },
    { zone: 'Arundelpet', allocated: 62.0, capacity: 110.0 },
    { zone: 'Nagarampalem', allocated: 94.0, capacity: 130.0 },
    { zone: 'Old Club Rd', allocated: 115.0, capacity: 160.0 },
    { zone: 'Collectorate', allocated: 78.0, capacity: 140.0 },
  ];

  return (
    <Card hoverEffect className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Regional Cash Distribution</h3>
          <p className="text-xs text-slate-500">Current cash vs total vault holding limit (₹ Lakhs)</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-400">6 SUB-ZONES</span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="zone" stroke="#94A3B8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip
              formatter={(val: any) => [`₹${val} Lakhs`, 'Amount']}
              contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E2E8F0' }}
            />
            <Bar dataKey="capacity" fill="#E2E8F0" radius={[6, 6, 0, 0]} name="Max Capacity" />
            <Bar dataKey="allocated" fill="#0C83EB" radius={[6, 6, 0, 0]} name="Current Holding" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
