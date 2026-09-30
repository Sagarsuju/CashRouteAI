import React, { useState, useEffect } from 'react';
import { getVehicles } from '../lib/api';
import { Vehicle } from '../lib/types';
import { VehicleCard } from '../components/vehicle/VehicleCard';
import { VehicleTable } from '../components/vehicle/VehicleTable';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Truck, ShieldCheck, List, LayoutGrid, Radio, Plus } from 'lucide-react';
import { clsx } from 'clsx';

export const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    if (statusFilter === 'all') return true;
    return v.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">CIT Fleet Operations</h1>
            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-0.5 rounded-full">
              18 Vehicles Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time armored vehicle positioning, onboard cash custody, and insurance policy compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary">
            <Plus className="w-3.5 h-3.5" /> Dispatch New Vehicle
          </Button>
        </div>
      </div>

      {/* Fleet Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-3 p-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Available Standby</span>
            <p className="text-xl font-extrabold text-slate-900 font-mono">11 Vehicles</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3 p-4">
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">En Route / Replenishing</span>
            <p className="text-xl font-extrabold text-slate-900 font-mono">7 Vehicles</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3 p-4">
          <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Cash in Transit</span>
            <p className="text-xl font-extrabold text-brand-700 font-mono">₹2.61 Crore</p>
          </div>
        </Card>
      </div>

      {/* Filters and View Switcher */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'en_route', label: 'On Route' },
              { id: 'available', label: 'Available' },
              { id: 'replenishing', label: 'Replenishing' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={clsx(
                  'px-3 py-1 rounded-lg transition-colors capitalize text-xs',
                  statusFilter === f.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={clsx(
                'p-1.5 rounded-lg text-slate-600 transition-colors',
                viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-slate-900'
              )}
              title="Card Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={clsx(
                'p-1.5 rounded-lg text-slate-600 transition-colors',
                viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-slate-900'
              )}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Main Grid/Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <VehicleTable vehicles={filteredVehicles} onSelectVehicle={() => {}} />
      )}
    </div>
  );
};
