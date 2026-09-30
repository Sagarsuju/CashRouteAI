import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { Vehicle } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { Truck, ShieldCheck, MapPin, BatteryCharging, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onDispatch?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDispatch }) => {
  const capacityPct = Math.round((vehicle.cash_onboard / vehicle.cash_capacity) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="safe" dot>Available</Badge>;
      case 'en_route':
        return <Badge variant="brand" dot>On Route</Badge>;
      case 'replenishing':
        return <Badge variant="warning" dot>Replenishing</Badge>;
      default:
        return <Badge variant="neutral" dot>{status}</Badge>;
    }
  };

  return (
    <Card hoverEffect className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-50 border border-brand-100 text-brand-700">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 font-mono">{vehicle.vehicle_id}</h4>
              {getStatusBadge(vehicle.status)}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Driver: {vehicle.driver_name}</p>
          </div>
        </div>

        {vehicle.battery_fuel_level && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
            <span>{vehicle.battery_fuel_level}%</span>
          </div>
        )}
      </div>

      {/* Location Strip */}
      <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="truncate">{vehicle.current_location_desc}</span>
      </div>

      {/* Capacity Utilization Progress */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">Cash Onboard</span>
          <span className="font-bold text-slate-900">
            {formatINR(vehicle.cash_onboard)} <span className="text-slate-400 font-normal">/ {formatINR(vehicle.cash_capacity)}</span>
          </span>
        </div>
        <Progress value={capacityPct} size="md" />
        <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
          <span>{capacityPct}% utilized</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Insurance: <strong className="text-slate-700">{formatINR(vehicle.insurance_limit)}</strong>
          </span>
        </div>
      </div>

      {/* Route & ETA Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Next ETA</span>
          <span className="font-bold text-brand-700 font-mono">{vehicle.eta_next_stop || 'Standby'}</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onDispatch && onDispatch(vehicle)}
          className="text-xs"
        >
          Manage <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};
