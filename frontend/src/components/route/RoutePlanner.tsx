import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Vehicle, ATM } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { Truck, Landmark, ShieldCheck, Sliders, CheckSquare, Square } from 'lucide-react';

export interface RoutePlannerProps {
  vehicles: Vehicle[];
  atms: ATM[];
  onOptimizeRequested?: () => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  vehicles,
  atms,
  onOptimizeRequested,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.vehicle_id || 'CIT-07');
  const [selectedAtmIds, setSelectedAtmIds] = useState<string[]>([
    'ATM VGN-042',
    'ATM VGN-018',
    'ATM VGN-003',
  ]);
  const [prioritizeCritical, setPrioritizeCritical] = useState<boolean>(true);
  const [avoidTollHighways, setAvoidTollHighways] = useState<boolean>(false);

  const selectedVehicle = vehicles.find((v) => v.vehicle_id === selectedVehicleId) || vehicles[0];

  const toggleAtm = (atmId: string) => {
    if (selectedAtmIds.includes(atmId)) {
      setSelectedAtmIds(selectedAtmIds.filter((id) => id !== atmId));
    } else {
      setSelectedAtmIds([...selectedAtmIds, atmId]);
    }
  };

  const totalCashNeeded = atms
    .filter((a) => selectedAtmIds.includes(a.atm_id))
    .reduce((acc, curr) => acc + (curr.recommended_refill || 400000), 0);

  const exceedsInsurance = selectedVehicle && totalCashNeeded > selectedVehicle.insurance_limit;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Route Dispatch Parameters</h3>
          <p className="text-xs text-slate-500">Configure vehicle fleet & node allocation</p>
        </div>
        <Badge variant="brand">OR-Tools CVRPTW</Badge>
      </div>

      {/* Vehicle Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-slate-400" />
          Assigned CIT Vehicle
        </label>
        <select
          value={selectedVehicleId}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
          className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {vehicles.map((v) => (
            <option key={v.vehicle_id} value={v.vehicle_id}>
              {v.vehicle_id} — {v.driver_name} (Cap: {formatINR(v.cash_capacity)}) [{v.status}]
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Constraints Overview */}
      {selectedVehicle && (
        <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 block">Vehicle Capacity</span>
            <strong className="text-slate-800">{formatINR(selectedVehicle.cash_capacity)}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Insurance Ceiling</span>
            <strong className="text-slate-800">{formatINR(selectedVehicle.insurance_limit)}</strong>
          </div>
        </div>
      )}

      {/* ATM Node Selection List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-slate-400" />
            Candidate ATM Targets ({selectedAtmIds.length})
          </span>
          <span className="font-mono font-bold text-brand-700">
            Req: {formatINR(totalCashNeeded)}
          </span>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {atms.map((atm) => {
            const isChecked = selectedAtmIds.includes(atm.atm_id);
            const isCrit = atm.status === 'critical';

            return (
              <div
                key={atm.atm_id}
                onClick={() => toggleAtm(atm.atm_id)}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-brand-50/50 border-brand-200'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-brand-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="font-mono font-bold text-slate-800">{atm.atm_id}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5 truncate">
                      {atm.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-semibold text-slate-700">
                    {formatINR(atm.recommended_refill || 400000)}
                  </span>
                  {isCrit && <Badge variant="critical">CRIT</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Constraints Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-slate-600 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            Prioritize stockout risk over route distance
          </span>
          <input
            type="checkbox"
            checked={prioritizeCritical}
            onChange={(e) => setPrioritizeCritical(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-slate-600 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Strict Cash-In-Transit safety window limit
          </span>
          <input
            type="checkbox"
            checked={avoidTollHighways}
            onChange={(e) => setAvoidTollHighways(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded"
          />
        </label>
      </div>

      {exceedsInsurance && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          Warning: Total cash needed ({formatINR(totalCashNeeded)}) exceeds vehicle insurance limit ({formatINR(selectedVehicle.insurance_limit)}).
        </div>
      )}

      <Button
        className="w-full text-xs shadow-xs"
        variant="primary"
        onClick={onOptimizeRequested}
        disabled={selectedAtmIds.length === 0 || exceedsInsurance}
      >
        Calculate Optimal Sequence
      </Button>
    </Card>
  );
};
