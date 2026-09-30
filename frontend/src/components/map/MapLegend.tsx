import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-md text-xs space-y-2 pointer-events-auto">
      <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">Map Legend</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
          <span className="text-slate-600">Healthy ATM (&gt;35%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200" />
          <span className="text-slate-600">Warning (15-35%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-200 animate-pulse" />
          <span className="text-slate-600">Critical (&lt;15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-brand-600 ring-2 ring-brand-200" />
          <span className="text-slate-600">CIT Vehicle</span>
        </div>
      </div>
    </div>
  );
};
