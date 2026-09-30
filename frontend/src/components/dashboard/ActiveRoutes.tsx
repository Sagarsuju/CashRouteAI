import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { DEMO_ROUTES, formatINR } from '../../lib/api';
import { Truck, Clock, ArrowRight, Route as RouteIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActiveRoutes: React.FC = () => {
  return (
    <Card hoverEffect className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Active CIT Routes</h3>
          <p className="text-xs text-slate-500">Live vehicle rebalancing & delivery schedules</p>
        </div>
        <Link to="/routes">
          <Button size="sm" variant="ghost" className="text-xs text-brand-600 hover:text-brand-700">
            View All <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {DEMO_ROUTES.map((route) => {
          const progressPct = Math.round((route.completed_stops / route.total_stops) * 100);

          return (
            <div
              key={route.id}
              className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-100 text-brand-700">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-slate-900">{route.vehicle_id}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5 font-medium">
                      ({route.driver_name})
                    </span>
                  </div>
                </div>

                <Badge variant={route.status === 'in_progress' ? 'brand' : 'neutral'} dot>
                  {route.status === 'in_progress' ? 'On Route' : 'Planned'}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>
                    Stops: {route.completed_stops} of {route.total_stops} completed
                  </span>
                  <span className="font-mono">{progressPct}%</span>
                </div>
                <Progress value={progressPct} size="sm" barColor="brand" />
              </div>

              {/* Metrics Strip */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span>
                  Load: <strong className="text-slate-800 font-mono">{formatINR(route.cash_required)}</strong>
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  ETA: <strong className="text-brand-700">{route.estimated_time_minutes} min</strong>
                </span>
                <span>
                  Dist: <strong className="text-slate-800">{route.total_distance_km} km</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
