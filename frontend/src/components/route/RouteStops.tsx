import React from 'react';
import { RouteStop } from '../../lib/types';
import { formatINR } from '../../lib/api';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

export interface RouteStopsProps {
  stops: RouteStop[];
}

export const RouteStops: React.FC<RouteStopsProps> = ({ stops }) => {
  return (
    <div className="space-y-3">
      {stops.map((stop, idx) => {
        const isDone = stop.status === 'completed';
        const isCurrent = stop.status === 'in_progress';

        return (
          <div
            key={stop.atm_id}
            className={clsx(
              'flex items-start gap-3 p-3 rounded-2xl border transition-all',
              isCurrent
                ? 'bg-brand-50/60 border-brand-200 ring-2 ring-brand-100 shadow-xs'
                : isDone
                ? 'bg-slate-50/60 border-slate-200/60 opacity-80'
                : 'bg-white border-slate-200 hover:border-slate-300'
            )}
          >
            <div
              className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5',
                isDone
                  ? 'bg-emerald-100 text-emerald-700'
                  : isCurrent
                  ? 'bg-brand-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600'
              )}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : stop.stop_number}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-slate-900 truncate">
                  {stop.atm_id}
                </span>
                <span className="font-semibold text-xs text-brand-700 font-mono">
                  {formatINR(stop.delivery_amount)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {stop.location}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block flex items-center justify-end gap-1">
                <Clock className="w-2.5 h-2.5" />
                {stop.estimated_arrival}
              </span>
              <span
                className={clsx(
                  'text-[9px] uppercase font-bold px-1.5 py-0.2 rounded font-mono',
                  isDone
                    ? 'text-emerald-700 bg-emerald-100'
                    : isCurrent
                    ? 'text-brand-700 bg-brand-100'
                    : 'text-slate-500 bg-slate-100'
                )}
              >
                {stop.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
