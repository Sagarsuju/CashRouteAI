import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { DEMO_RISK_DISTRIBUTION } from '../../lib/api';

export const RiskChart: React.FC = () => {
  return (
    <Card hoverEffect className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Risk Segmentation</h3>
          <p className="text-xs text-slate-500">Node distribution across stockout vulnerabilities</p>
        </div>
        <span className="text-[10px] font-bold text-slate-400 font-mono">486 TOTAL</span>
      </div>

      <div className="h-52 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DEMO_RISK_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="count"
            >
              {DEMO_RISK_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any, item: any) => [
                `${value} ATMs (${((Number(value) / 486) * 100).toFixed(1)}%)`,
                item.payload.risk_category,
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                fontSize: '11px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        {DEMO_RISK_DISTRIBUTION.map((item) => (
          <div key={item.risk_category} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 font-medium">{item.risk_category}</span>
            </div>
            <span className="font-bold text-slate-900 font-mono">{item.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
