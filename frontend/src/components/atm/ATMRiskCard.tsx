import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ATM } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { AlertTriangle, Clock, ArrowUpRight, TrendingDown } from 'lucide-react';

export interface ATMRiskCardProps {
  atm: ATM;
  onViewDetails?: (atm: ATM) => void;
}

export const ATMRiskCard: React.FC<ATMRiskCardProps> = ({ atm, onViewDetails }) => {
  const isCritical = atm.status === 'critical' || atm.risk_level === 'critical';

  return (
    <Card hoverEffect className="relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900">{atm.atm_id}</span>
              <Badge variant={isCritical ? 'critical' : 'warning'} dot>
                {isCritical ? 'Critical' : 'High Risk'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">{atm.location}, {atm.city}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Risk Score</span>
            <p className="text-lg font-black text-rose-600 font-mono">{atm.risk_score}/100</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Current Cash</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{formatINR(atm.current_cash)}</span>
            <span className="text-[10px] text-rose-500 font-medium flex items-center gap-0.5 mt-0.5">
              <TrendingDown className="w-3 h-3" /> Depleting fast
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Predicted Demand (4h)</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{formatINR(atm.predicted_demand_next_4h)}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">AI Confidence 96%</span>
          </div>
        </div>

        {/* Stockout ETA Pill */}
        <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-xs">
          <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Stockout ETA:</span>
          </div>
          <span className="font-bold font-mono text-rose-800">{atm.stockout_eta_hours} Hours</span>
        </div>
      </div>

      {/* Footer Refill Recommendation & Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Refill</span>
          <span className="font-bold text-brand-700 text-sm">{formatINR(atm.recommended_refill)}</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onViewDetails && onViewDetails(atm)}
          className="text-xs"
        >
          View ATM <ArrowUpRight className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};
