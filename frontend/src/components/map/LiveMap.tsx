import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ATM, Vehicle } from '../../lib/types';
import { MapLegend } from './MapLegend';
import { formatINR } from '../../lib/api';
import { Radio, Truck, Layers, Crosshair, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export interface LiveMapProps {
  atms?: ATM[];
  vehicles?: Vehicle[];
  height?: string;
  showControls?: boolean;
  onSelectATM?: (atm: ATM) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  atms = [],
  vehicles = [],
  height = '480px',
  showControls = true,
  onSelectATM,
  onSelectVehicle,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'vehicles'>('all');
  const [showTraffic, setShowTraffic] = useState(false);

  // Center coordinate around Guntur/AP cluster
  const defaultCenter: [number, number] = [16.3100, 80.4350];

  // Helper to create custom HTML markers for ATMs
  const createATMIcon = (status: string, riskLevel: string) => {
    let bg = 'bg-emerald-500';
    let ring = 'ring-emerald-200';
    let pulse = '';

    if (status === 'critical' || riskLevel === 'critical') {
      bg = 'bg-rose-500';
      ring = 'ring-rose-200';
      pulse = 'animate-ping';
    } else if (status === 'low_cash' || riskLevel === 'high' || riskLevel === 'medium') {
      bg = 'bg-amber-500';
      ring = 'ring-amber-200';
    }

    return L.divIcon({
      className: 'custom-atm-marker',
      html: `
        <div class="relative flex items-center justify-center">
          ${pulse ? `<span class="${pulse} absolute inline-flex h-8 w-8 rounded-full ${bg} opacity-50"></span>` : ''}
          <div class="w-6 h-6 rounded-full ${bg} ring-4 ${ring} flex items-center justify-center text-white text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform">
            ₹
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  // Helper to create custom HTML markers for CIT Vehicles
  const createVehicleIcon = (status: string) => {
    return L.divIcon({
      className: 'custom-vehicle-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-pulse absolute inline-flex h-8 w-8 rounded-xl bg-brand-400 opacity-40"></span>
          <div class="w-7 h-7 rounded-xl bg-brand-700 ring-4 ring-brand-200 flex items-center justify-center text-white text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform">
            🚚
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  // Sample polyline coordinates connecting Vehicle CIT-07 to its next scheduled stops
  const activeRouteCoords: [number, number][] = [
    [16.3095, 80.4328], // CIT-07 position
    [16.3067, 80.4365], // ATM VGN-042 (Brodipet)
    [16.2995, 80.4412], // ATM VGN-003 (Arundelpet)
    [16.3142, 80.4289], // ATM VGN-018 (Lakshmipuram)
  ];

  const filteredATMs = atms.filter((a) => {
    if (filterMode === 'critical') return a.status === 'critical' || a.risk_level === 'critical';
    if (filterMode === 'vehicles') return false;
    return true;
  });

  const filteredVehicles = vehicles.filter(() => {
    if (filterMode === 'critical') return false;
    return true;
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-subtle bg-slate-100" style={{ height }}>
      {/* Top Floating Control Bar */}
      {showControls && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200 shadow-md text-xs pointer-events-auto">
          <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
            <button
              onClick={() => setFilterMode('all')}
              className={clsx(
                'px-2.5 py-1 rounded-xl font-medium transition-colors',
                filterMode === 'all' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              All Nodes
            </button>
            <button
              onClick={() => setFilterMode('critical')}
              className={clsx(
                'px-2.5 py-1 rounded-xl font-medium transition-colors',
                filterMode === 'critical' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Critical Risk
            </button>
            <button
              onClick={() => setFilterMode('vehicles')}
              className={clsx(
                'px-2.5 py-1 rounded-xl font-medium transition-colors',
                filterMode === 'vehicles' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Fleet Only
            </button>
          </div>

          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={clsx(
              'px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-colors',
              showTraffic ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            <Layers className="w-3.5 h-3.5" /> Traffic
          </button>
        </div>
      )}

      {/* Real-time Indicator Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200 shadow-md text-xs font-semibold text-slate-800 pointer-events-auto">
        <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>Live Cash Network Telemetry</span>
      </div>

      {/* Map Container */}
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* CIT Route Polyline */}
        <Polyline
          positions={activeRouteCoords}
          pathOptions={{
            color: '#0C83EB',
            weight: 3.5,
            dashArray: '6, 8',
            opacity: 0.85,
          }}
        />

        {/* ATM Markers */}
        {filteredATMs.map((atm) => (
          <Marker
            key={atm.atm_id}
            position={[atm.latitude, atm.longitude]}
            icon={createATMIcon(atm.status, atm.risk_level)}
            eventHandlers={{
              click: () => onSelectATM && onSelectATM(atm),
            }}
          >
            <Popup className="rounded-xl shadow-lg">
              <div className="p-1 space-y-1.5 text-xs min-w-[180px]">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-bold text-slate-900">{atm.atm_id}</span>
                  <span
                    className={clsx(
                      'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
                      atm.status === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    )}
                  >
                    {atm.status}
                  </span>
                </div>
                <p className="text-slate-500">{atm.location}</p>
                <div className="space-y-0.5 pt-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Cash:</span>
                    <strong className="text-slate-900">{formatINR(atm.current_cash)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stockout In:</span>
                    <strong className="text-rose-600 font-bold">{atm.stockout_eta_hours}h</strong>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Vehicle Markers */}
        {filteredVehicles.map((vehicle) => (
          <Marker
            key={vehicle.vehicle_id}
            position={[vehicle.latitude, vehicle.longitude]}
            icon={createVehicleIcon(vehicle.status)}
            eventHandlers={{
              click: () => onSelectVehicle && onSelectVehicle(vehicle),
            }}
          >
            <Popup className="rounded-xl shadow-lg">
              <div className="p-1 space-y-1.5 text-xs min-w-[180px]">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-bold text-brand-700">{vehicle.vehicle_id}</span>
                  <span className="bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-slate-600">{vehicle.driver_name} (Driver)</p>
                <div className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cash Onboard:</span>
                    <strong className="text-slate-900">{formatINR(vehicle.cash_onboard)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next ETA:</span>
                    <strong className="text-brand-600">{vehicle.eta_next_stop}</strong>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
};
