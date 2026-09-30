import React, { useState, useEffect } from 'react';
import { LiveMap } from '../components/map/LiveMap';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getATMs, getVehicles } from '../lib/api';
import { ATM, Vehicle } from '../lib/types';
import {
  Radio,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Compass,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export const Operations: React.FC = () => {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getATMs().then(setAtms);
    getVehicles().then(setVehicles);
  }, []);

  const timelineEvents = [
    { time: '14:41', title: 'Route Recalculation Triggered', desc: 'Autonomous re-route for CIT-07 to bypass Brodipet congestion.', type: 'action', icon: RefreshCw, color: 'text-brand-600 bg-brand-50' },
    { time: '14:38', title: 'Traffic Delay Detected', desc: '+15m delay flagged on Arundelpet approach road.', type: 'warning', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { time: '14:35', title: 'ATM VGN-042 Risk Escalation', desc: 'Withdrawal rate jumped to ₹48,000/hr. Stockout window narrowed to 1.7h.', type: 'critical', icon: ShieldAlert, color: 'text-rose-600 bg-rose-50' },
    { time: '14:32', title: 'CIT-07 Arrived at Target Node', desc: 'Arrived at ATM VGN-012. Vault transfer initialized under geo-fencing lock.', type: 'success', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { time: '14:15', title: 'Depot Fleet Pre-Check Completed', desc: 'CIT-04 biometric custody handoff verified.', type: 'info', icon: Compass, color: 'text-slate-600 bg-slate-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live Operations Command Center</h1>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full">
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Live Telemetry Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-agent spatial coordination between ATM endpoints and armored CIT fleets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Layers className="w-3.5 h-3.5" /> Toggle Overlay Layers
          </Button>
          <Button size="sm" variant="secondary">
            <RefreshCw className="w-3.5 h-3.5" /> Sync GIS Telemetry
          </Button>
        </div>
      </div>

      {/* Main Command Split: Map + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Central Map */}
        <div className="lg:col-span-8 space-y-4">
          <LiveMap
            atms={atms}
            vehicles={vehicles}
            height="560px"
          />
        </div>

        {/* Right Event Timeline */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-sm text-slate-900">Real-Time Event Stream</h3>
              </div>
              <Badge variant="brand">LIVE</Badge>
            </div>

            <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timelineEvents.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <div key={idx} className="relative flex items-start gap-3 text-xs">
                    {/* Timeline Dot */}
                    <div className={`p-1.5 rounded-full shrink-0 -ml-5.5 ${evt.color} shadow-xs ring-4 ring-white`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0 bg-slate-50/70 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">{evt.title}</span>
                        <span className="font-mono text-[10px] text-slate-400 font-semibold">{evt.time}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">{evt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
