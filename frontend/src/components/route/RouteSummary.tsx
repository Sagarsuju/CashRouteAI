import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatINR } from '../../lib/api';
import { ShieldCheck, Sparkles, RefreshCw, Eye, CheckCircle2 } from 'lucide-react';

export interface RouteSummaryProps {
  stopsCount: number;
  distanceKm: number;
  estimatedMinutes: number;
  cashRequired: number;
  withinInsurance: boolean;
  onOptimize?: () => void;
  onReRoute?: () => void;
  onPreview?: () => void;
}

export const RouteSummary: React.FC<RouteSummaryProps> = ({
  stopsCount = 6,
  distanceKm = 28.4,
  estimatedMinutes = 46,
  cashRequired = 840000,
  withinInsurance = true,
  onOptimize,
  onReRoute,
  onPreview,
}) => {
  return (
    <Card className="bg-gradient-to-r from-white via-brand-50/20 to-white border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Key Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-medium">Stops Scheduled</span>
            <p className="text-lg font-bold text-slate-900 font-mono">{stopsCount} Nodes</p>
          </div>

          <div className="sm:pl-4 space-y-0.5 pt-2 sm:pt-0">
            <span className="text-slate-400 font-medium">Total Distance</span>
            <p className="text-lg font-bold text-slate-900 font-mono">{distanceKm} km</p>
          </div>

          <div className="sm:pl-4 space-y-0.5 pt-2 sm:pt-0">
            <span className="text-slate-400 font-medium">Estimated Duration</span>
            <p className="text-lg font-bold text-slate-900 font-mono">{estimatedMinutes} min</p>
          </div>

          <div className="sm:pl-4 space-y-0.5 pt-2 sm:pt-0">
            <span className="text-slate-400 font-medium">Total Cash Required</span>
            <p className="text-lg font-bold text-brand-700 font-mono">{formatINR(cashRequired)}</p>
          </div>

          <div className="sm:pl-4 space-y-0.5 pt-2 sm:pt-0">
            <span className="text-slate-400 font-medium">Safety Verification</span>
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{withinInsurance ? 'Within Insurance Limit' : 'Insurance Warning'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <Button size="sm" variant="outline" onClick={onPreview}>
            <Eye className="w-3.5 h-3.5" /> Preview Route
          </Button>

          <Button size="sm" variant="secondary" onClick={onReRoute}>
            <RefreshCw className="w-3.5 h-3.5" /> Re-route
          </Button>

          <Button size="sm" variant="primary" onClick={onOptimize} className="shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" /> Optimize Route
          </Button>
        </div>
      </div>
    </Card>
  );
};
