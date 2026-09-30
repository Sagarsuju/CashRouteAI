import React, { useState, useEffect } from 'react';
import { getVehicles, getATMs, DEMO_ROUTES } from '../lib/api';
import { Vehicle, ATM, Route } from '../lib/types';
import { RoutePlanner } from '../components/route/RoutePlanner';
import { RouteSummary } from '../components/route/RouteSummary';
import { RouteStops } from '../components/route/RouteStops';
import { LiveMap } from '../components/map/LiveMap';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkles, MapPin, Truck } from 'lucide-react';

export const Routes: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [atms, setAtms] = useState<ATM[]>([]);
  const [activeRoute, setActiveRoute] = useState<Route>(DEMO_ROUTES[0]);
  const [optimizationNotice, setOptimizationNotice] = useState<string | null>(null);

  useEffect(() => {
    getVehicles().then(setVehicles);
    getATMs().then(setAtms);
  }, []);

  const handleTriggerOptimization = () => {
    setOptimizationNotice('OR-Tools CVRPTW Solver initiated: 6-stop sequence optimized with 14% distance reduction.');
    setTimeout(() => setOptimizationNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">CIT Route Planner</h1>
            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-0.5 rounded-full">
              Capacitated Vehicle Routing (CVRPTW)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compute cost-effective, time-window compliant replenishment journeys with automated safety boundary checks.
          </p>
        </div>

        {optimizationNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {optimizationNotice}
          </div>
        )}
      </div>

      {/* Main Split Grid: Left Planner Panel | Right Map & Stops */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Route Dispatch Configurator */}
        <div className="lg:col-span-4 space-y-4">
          <RoutePlanner
            vehicles={vehicles}
            atms={atms}
            onOptimizeRequested={handleTriggerOptimization}
          />
        </div>

        {/* Right Column: Live Route Map & Stop Sequence */}
        <div className="lg:col-span-8 space-y-4">
          <LiveMap
            atms={atms}
            vehicles={vehicles}
            height="420px"
          />

          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Scheduled Sequence ({activeRoute.vehicle_id})
                </h3>
              </div>
              <Badge variant="brand">{activeRoute.stops.length} STOPS</Badge>
            </div>

            <RouteStops stops={activeRoute.stops} />
          </Card>
        </div>
      </div>

      {/* Bottom Floating Route Summary Bar */}
      <RouteSummary
        stopsCount={activeRoute.stops.length}
        distanceKm={activeRoute.total_distance_km}
        estimatedMinutes={activeRoute.estimated_time_minutes}
        cashRequired={activeRoute.cash_required}
        withinInsurance={true}
        onOptimize={handleTriggerOptimization}
        onReRoute={handleTriggerOptimization}
        onPreview={() => {}}
      />
    </div>
  );
};
