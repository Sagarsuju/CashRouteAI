import React from 'react';
import { Vehicle } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowUpRight } from 'lucide-react';

export interface VehicleTableProps {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, onSelectVehicle }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-subtle">
      <table className="w-full text-left text-xs text-slate-600 border-collapse">
        <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
          <tr>
            <th className="py-3.5 px-4">Vehicle ID</th>
            <th className="py-3.5 px-4">Driver</th>
            <th className="py-3.5 px-4">Current Location</th>
            <th className="py-3.5 px-4">Cash Onboard</th>
            <th className="py-3.5 px-4">Capacity</th>
            <th className="py-3.5 px-4">Insurance Limit</th>
            <th className="py-3.5 px-4">Next ETA</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {vehicles.map((v) => (
            <tr key={v.vehicle_id} className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3 px-4 font-mono font-bold text-slate-900">{v.vehicle_id}</td>
              <td className="py-3 px-4 font-medium text-slate-800">{v.driver_name}</td>
              <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{v.current_location_desc}</td>
              <td className="py-3 px-4 font-semibold text-brand-700">{formatINR(v.cash_onboard)}</td>
              <td className="py-3 px-4 text-slate-700">{formatINR(v.cash_capacity)}</td>
              <td className="py-3 px-4 text-slate-500">{formatINR(v.insurance_limit)}</td>
              <td className="py-3 px-4 font-mono font-semibold text-slate-800">{v.eta_next_stop || 'Standby'}</td>
              <td className="py-3 px-4">
                <Badge
                  variant={v.status === 'en_route' ? 'brand' : v.status === 'available' ? 'safe' : 'warning'}
                  dot
                >
                  {v.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onSelectVehicle(v)}
                  className="text-xs text-brand-600 hover:text-brand-700 hover:bg-brand-50"
                >
                  Select <ArrowUpRight className="w-3 h-3" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
