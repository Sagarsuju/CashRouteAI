import React from 'react';
import { DemandChart } from '../components/charts/DemandChart';
import { RiskChart } from '../components/charts/RiskChart';
import { CashChart } from '../components/charts/CashChart';
import { VehicleUtilization } from '../components/charts/VehicleUtilization';
import { Card } from '../components/ui/Card';
import { BarChart3, TrendingUp, IndianRupee, ShieldCheck, Zap } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Executive Logistics Analytics</h1>
            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-0.5 rounded-full">
              Intraday Intelligence Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historical withdrawal patterns, idle cash holding costs, routing efficiency, and inventory turnover.
          </p>
        </div>
      </div>

      {/* Top Analytics KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Idle Cash Holding Reduction</span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-emerald-600 font-mono">-18.4%</p>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-slate-400">₹8.6L saved monthly</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Mean Forecast Accuracy</span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-brand-700 font-mono">96.2%</p>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Gradient boosted trees</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Average Route Travel Time</span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-slate-900 font-mono">38 min</p>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">14% faster than static routes</span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-slate-500 font-medium">Stockout Prevention Rate</span>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-emerald-700 font-mono">99.8%</p>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Zero critical outages today</span>
        </Card>
      </div>

      {/* Primary Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DemandChart />
        </div>
        <div className="lg:col-span-4">
          <RiskChart />
        </div>
      </div>

      {/* Secondary Regional & Fleet Utilization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CashChart />
        </div>
        <div className="lg:col-span-6">
          <VehicleUtilization />
        </div>
      </div>
    </div>
  );
};
