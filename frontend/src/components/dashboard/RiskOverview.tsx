import React from 'react';
import { RiskChart } from '../charts/RiskChart';
import { ATMRiskCard } from '../atm/ATMRiskCard';
import { ATM } from '../../lib/types';

export interface RiskOverviewProps {
  criticalAtms: ATM[];
  onSelectATM?: (atm: ATM) => void;
}

export const RiskOverview: React.FC<RiskOverviewProps> = ({ criticalAtms, onSelectATM }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">ATM Risk Intelligence</h3>
        <p className="text-xs text-slate-500">Autonomous risk classification & urgent stockout mitigation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Donut Chart */}
        <div className="lg:col-span-4">
          <RiskChart />
        </div>

        {/* Right: Critical ATM Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {criticalAtms.slice(0, 2).map((atm) => (
            <ATMRiskCard key={atm.atm_id} atm={atm} onViewDetails={onSelectATM} />
          ))}
        </div>
      </div>
    </div>
  );
};
