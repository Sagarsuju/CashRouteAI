import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DEMO_ALERTS } from '../../lib/api';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AlertsPanel: React.FC = () => {
  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <Card hoverEffect className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Operational Alerts</h3>
          <p className="text-xs text-slate-500">Real-time risk warnings and hardware notices</p>
        </div>
        <Link to="/alerts">
          <Button size="sm" variant="ghost" className="text-xs text-brand-600 hover:text-brand-700">
            View All ({DEMO_ALERTS.length}) <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>

      <div className="space-y-2.5">
        {DEMO_ALERTS.slice(0, 3).map((alert) => (
          <div
            key={alert.id}
            className="p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors flex items-start gap-3 text-xs"
          >
            <div className="p-2 rounded-xl bg-slate-50 shrink-0 mt-0.5">
              {getSeverityIcon(alert.severity)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900 truncate">{alert.title}</span>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">{alert.created_at}</span>
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{alert.message}</p>
              {alert.atm_id && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100">
                    {alert.atm_id}
                  </span>
                  <Badge variant={alert.severity as any} className="text-[10px] py-0 px-2">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
