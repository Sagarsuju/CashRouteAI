import React from 'react';
import { ATM } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowUpRight, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export interface ATMTableProps {
  atms: ATM[];
  onSelectATM: (atm: ATM) => void;
}

export const ATMTable: React.FC<ATMTableProps> = ({ atms, onSelectATM }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-subtle">
      <table className="w-full text-left text-xs text-slate-600 border-collapse">
        <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
          <tr>
            <th className="py-3.5 px-4">ATM ID</th>
            <th className="py-3.5 px-4">Location</th>
            <th className="py-3.5 px-4">Current Cash</th>
            <th className="py-3.5 px-4">Predicted (4h)</th>
            <th className="py-3.5 px-4">Stockout ETA</th>
            <th className="py-3.5 px-4">Risk Level</th>
            <th className="py-3.5 px-4">Rec. Refill</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {atms.map((atm) => {
            const isCritical = atm.status === 'critical' || atm.risk_level === 'critical';
            const isLow = atm.status === 'low_cash' || atm.risk_level === 'high';

            return (
              <tr key={atm.atm_id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  {atm.atm_id}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-800">{atm.location}</div>
                  <div className="text-[11px] text-slate-400">{atm.city}</div>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900">
                  {formatINR(atm.current_cash)}
                  <span className="block text-[10px] text-slate-400 font-normal">
                    of {formatINR(atm.cash_capacity)}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-slate-700">
                  {formatINR(atm.predicted_demand_next_4h)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={clsx(
                      'font-mono font-bold',
                      isCritical ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-600'
                    )}
                  >
                    {atm.stockout_eta_hours}h
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={isCritical ? 'critical' : isLow ? 'warning' : 'safe'}
                    dot
                  >
                    {atm.risk_level.toUpperCase()}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-semibold text-brand-700">
                  {atm.recommended_refill > 0 ? formatINR(atm.recommended_refill) : '—'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={clsx(
                      'px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase',
                      atm.status === 'active' && 'bg-emerald-50 text-emerald-700',
                      atm.status === 'low_cash' && 'bg-amber-50 text-amber-700',
                      atm.status === 'critical' && 'bg-rose-50 text-rose-700'
                    )}
                  >
                    {atm.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSelectATM(atm)}
                    className="text-xs text-brand-600 hover:text-brand-700 hover:bg-brand-50"
                  >
                    View <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
