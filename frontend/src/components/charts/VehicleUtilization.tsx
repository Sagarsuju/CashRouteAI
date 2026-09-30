import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const VehicleUtilization: React.FC = () => {
  const data = [
    { vehicle: 'CIT-01', efficiency: 88, activeHours: 7.2 },
    { vehicle: 'CIT-04', efficiency: 94, activeHours: 8.5 },
    { vehicle: 'CIT-07', efficiency: 96, activeHours: 9.1 },
    { vehicle: 'CIT-09', efficiency: 74, activeHours: 6.0 },
    { vehicle: 'CIT-11', efficiency: 82, activeHours: 6.8 },
  ];

  return (
    <Card hoverEffect className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">CIT Vehicle Route Efficiency</h3>
          <p className="text-xs text-slate-500">Routing efficiency score (%) vs shift operational hours</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          AVG 86.8%
        </span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="vehicle" stroke="#94A3B8" fontSize={10} tickLine={false} />
            <Tooltip
              formatter={(val: any) => [`${val}%`, 'Efficiency Score']}
              contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E2E8F0' }}
            />
            <Bar dataKey="efficiency" fill="#0C83EB" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
