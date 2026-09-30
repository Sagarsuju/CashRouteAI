import React, { useState, useEffect } from 'react';
import { getAlerts } from '../lib/api';
import { Alert } from '../lib/types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Check,
  Filter,
  BellRing,
} from 'lucide-react';
import { clsx } from 'clsx';

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'resolved'>('all');

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  const handleResolveAlert = (id: number) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return a.resolved;
    return a.severity === filter && !a.resolved;
  });

  const getBorderAccent = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'border-l-4 border-l-rose-500';
      case 'warning':
        return 'border-l-4 border-l-amber-500';
      case 'success':
        return 'border-l-4 border-l-emerald-500';
      default:
        return 'border-l-4 border-l-sky-500';
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Alerts & Incidents</h1>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full">
              {alerts.filter((a) => !a.resolved).length} Actionable Items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time threshold violations, demand spike alarms, and logistics delay notifications.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={() => setAlerts(alerts.map((a) => ({ ...a, resolved: true })))}>
          <Check className="w-3.5 h-3.5" /> Mark All as Resolved
        </Button>
      </div>

      {/* Filter Tabs */}
      <Card className="p-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'critical', 'warning', 'info', 'resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={clsx(
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all',
                filter === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Alert Cards Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="p-12 text-center text-slate-400 space-y-2">
            <BellRing className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No alerts found</p>
            <p className="text-xs text-slate-400">All network conditions in this category are operating within nominal thresholds.</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              hoverEffect
              className={`p-4 ${getBorderAccent(alert.severity)} transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 shrink-0 mt-0.5">
                    {getSeverityIcon(alert.severity)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{alert.title}</h4>
                      <Badge variant={alert.severity as any} dot>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      {alert.resolved && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          RESOLVED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-medium">
                      <span>{alert.created_at}</span>
                      {alert.atm_id && (
                        <span className="font-mono text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                          {alert.atm_id}
                        </span>
                      )}
                      {alert.vehicle_id && (
                        <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                          {alert.vehicle_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!alert.resolved && (
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolveAlert(alert.id)}
                      className="text-xs"
                    >
                      <Check className="w-3.5 h-3.5" /> Acknowledge
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
