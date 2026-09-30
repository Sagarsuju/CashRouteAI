import React from 'react';
import { Sparkles, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CashNetwork3D } from '../3d/CashNetwork3D';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-brand-50/40 to-slate-50 border border-slate-200/80 p-6 lg:p-8 shadow-sm">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Greeting, AI Monitor Status, Next Critical Event */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/60 border border-brand-200/60 text-brand-800 text-xs font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Intraday Dynamic CIT Rebalancer Active
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good afternoon, <span className="text-brand-600 font-semibold">Dispatcher</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
              CashRouteAI is proactively forecasting demand, computing stockout probabilities, and optimizing cash-in-transit routes across your 486-node network.
            </p>
          </div>

          {/* Critical Event Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-rose-100 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0 mt-0.5 sm:mt-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Next Critical Event</span>
                  <span className="text-[10px] font-medium bg-rose-100/80 text-rose-800 px-2 py-0.5 rounded-full">High Probability</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  <span className="font-mono text-brand-600">ATM VGN-042</span> (Brodipet) requires replenishment in <span className="text-rose-600 font-bold">1h 42m</span>
                </p>
              </div>
            </div>

            <Link to="/routes">
              <Button size="sm" variant="primary" className="whitespace-nowrap shadow-xs">
                Dispatch CIT <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-6 pt-1 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Network Health: <strong className="text-slate-900">98.4%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              <span>Active CIT Fleet: <strong className="text-slate-900">18 Vehicles</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Spatial Interactive Canvas */}
        <div className="lg:col-span-5 flex justify-center">
          <CashNetwork3D />
        </div>
      </div>
    </div>
  );
};
