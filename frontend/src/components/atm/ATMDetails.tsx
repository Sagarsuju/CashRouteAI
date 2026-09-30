import React from 'react';
import { ATM } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Zap,
  Wifi,
  Lock,
  Clock,
  ArrowRight,
} from 'lucide-react';

export interface ATMDetailsProps {
  atm: ATM | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleRefill?: (atm: ATM) => void;
}

export const ATMDetails: React.FC<ATMDetailsProps> = ({
  atm,
  isOpen,
  onClose,
  onScheduleRefill,
}) => {
  if (!atm) return null;

  const sampleHourlyData = [
    { hour: '00:00', demand: 4200 },
    { hour: '04:00', demand: 1800 },
    { hour: '08:00', demand: 12500 },
    { hour: '12:00', demand: 28400 },
    { hour: '16:00', demand: 34000 },
    { hour: '20:00', demand: 19800 },
    { hour: '23:59', demand: 8500 },
  ];

  const cashPct = Math.round((atm.current_cash / atm.cash_capacity) * 100);

  const getHardwareBadge = (status: string) => {
    if (status === 'healthy') return <Badge variant="safe" dot>Healthy</Badge>;
    if (status === 'warning') return <Badge variant="warning" dot>Warning</Badge>;
    return <Badge variant="critical" dot>Offline</Badge>;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${atm.atm_id} — Predictive Diagnostic`}
      description={`${atm.location}, ${atm.city}`}
      maxWidth="2xl"
    >
      <div className="space-y-5 text-xs">
        {/* Top Key Indicator Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Current Liquidity</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
              {formatINR(atm.current_cash)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{cashPct}% capacity</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Predicted 4h Demand</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
              {formatINR(atm.predicted_demand_next_4h)}
            </span>
            <span className="text-[10px] text-brand-600 font-medium">ML Model v3.2</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-rose-500 block text-[11px] font-semibold">Stockout Horizon</span>
            <span className="font-extrabold text-rose-700 text-sm mt-0.5 block font-mono">
              {atm.stockout_eta_hours} Hours
            </span>
            <span className="text-[10px] text-rose-600 font-bold">Action Required</span>
          </div>

          <div className="p-3 rounded-2xl bg-brand-50/70 border border-brand-100">
            <span className="text-brand-600 block text-[11px] font-semibold">Recommended Refill</span>
            <span className="font-extrabold text-brand-800 text-sm mt-0.5 block">
              {formatINR(atm.recommended_refill)}
            </span>
            <span className="text-[10px] text-brand-600">CVRPTW Optimal</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-600">Vault Capacity Utilization</span>
            <span className="font-bold text-slate-900">{formatINR(atm.current_cash)} / {formatINR(atm.cash_capacity)}</span>
          </div>
          <Progress value={cashPct} size="md" />
        </div>

        {/* 24-Hour Projected Demand Curve */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-bold text-slate-900 text-xs">24-Hour Intraday Demand Profile</h4>
              <p className="text-[11px] text-slate-400">Past withdrawal velocity vs predicted spike</p>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Time Step: 4h</span>
          </div>

          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleHourlyData}>
                <defs>
                  <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0C83EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0C83EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Demand']}
                  contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E2E8F0' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#0C83EB" strokeWidth={2.5} fillOpacity={1} fill="url(#detailGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hardware & Telemetry Diagnostics */}
        <div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Hardware Telemetry</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl border border-slate-100 bg-white flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Vault Sensor</span>
              </div>
              {getHardwareBadge(atm.hardware_status.vault_sensor)}
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-white flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span>Cassette</span>
              </div>
              {getHardwareBadge(atm.hardware_status.cassette)}
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-white flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-slate-400" />
                <span>Power System</span>
              </div>
              {getHardwareBadge(atm.hardware_status.power)}
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-white flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
                <span>Network</span>
              </div>
              {getHardwareBadge(atm.hardware_status.network)}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">Last serviced: {atm.last_serviced || 'Recently'}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>
              Dismiss
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                onClose();
                if (onScheduleRefill) onScheduleRefill(atm);
              }}
            >
              Add to CIT Route <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
