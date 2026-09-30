import React, { useState, useEffect } from 'react';
import { Hero } from '../components/dashboard/Hero';
import { StatCard } from '../components/dashboard/StatCard';
import { NetworkHealth } from '../components/dashboard/NetworkHealth';
import { DemandChart } from '../components/charts/DemandChart';
import { RiskOverview } from '../components/dashboard/RiskOverview';
import { ActiveRoutes } from '../components/dashboard/ActiveRoutes';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { LiveMap } from '../components/map/LiveMap';
import { ATMDetails } from '../components/atm/ATMDetails';
import {
  getDashboard,
  getATMs,
  getVehicles,
  formatINR,
} from '../lib/api';
import { DashboardStats, ATM, Vehicle } from '../lib/types';
import {
  Landmark,
  AlertTriangle,
  Flame,
  Truck,
  IndianRupee,
  Route as RouteIcon,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [atms, setAtms] = useState<ATM[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedAtm, setSelectedAtm] = useState<ATM | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    getDashboard().then(setStats);
    getATMs().then(setAtms);
    getVehicles().then(setVehicles);
  }, []);

  const handleOpenAtmDetails = (atm: ATM) => {
    setSelectedAtm(atm);
    setIsDetailsOpen(true);
  };

  const criticalAtms = atms.filter((a) => a.status === 'critical' || a.risk_level === 'critical');

  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. KPI Cards Grid (6 Premium Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total ATMs"
          value={stats?.total_atms || 486}
          trendPercentage={4.2}
          trendDirection="up"
          comparisonText="vs yesterday"
          accentColor="brand"
          icon={<Landmark className="w-5 h-5" />}
          sparklineData={[420, 430, 450, 460, 475, 482, 486]}
        />

        <StatCard
          title="Critical ATMs"
          value={stats?.critical_atms || 12}
          trendPercentage={-14.3}
          trendDirection="down"
          comparisonText="vs 6h ago"
          accentColor="rose"
          icon={<AlertTriangle className="w-5 h-5" />}
          sparklineData={[18, 16, 17, 15, 14, 13, 12]}
        />

        <StatCard
          title="High Risk"
          value={stats?.high_risk_atms || 37}
          trendPercentage={2.7}
          trendDirection="up"
          comparisonText="monitored"
          accentColor="amber"
          icon={<Flame className="w-5 h-5" />}
          sparklineData={[30, 32, 35, 34, 38, 36, 37]}
        />

        <StatCard
          title="Active Vehicles"
          value={stats?.active_vehicles || 18}
          trendPercentage={12.5}
          trendDirection="up"
          comparisonText="in field"
          accentColor="brand"
          icon={<Truck className="w-5 h-5" />}
          sparklineData={[14, 15, 16, 15, 17, 18, 18]}
        />

        <StatCard
          title="Cash Required"
          value={stats ? formatINR(stats.total_cash_required) : '₹42.8L'}
          trendPercentage={-5.8}
          trendDirection="down"
          comparisonText="optimized"
          accentColor="emerald"
          icon={<IndianRupee className="w-5 h-5" />}
          sparklineData={[52, 48, 49, 45, 46, 43, 42.8]}
        />

        <StatCard
          title="Active Routes"
          value={stats?.active_routes || 14}
          trendPercentage={7.1}
          trendDirection="up"
          comparisonText="dispatched"
          accentColor="slate"
          icon={<RouteIcon className="w-5 h-5" />}
          sparklineData={[10, 11, 12, 13, 13, 14, 14]}
        />
      </div>

      {/* 3. Live Cash Operations Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Live Cash Network</h2>
            <p className="text-xs text-slate-500">Autonomous GIS telemetry, ATM inventory levels, and CIT routes</p>
          </div>
          <span className="text-xs text-brand-700 bg-brand-50 border border-brand-200/60 px-3 py-1 rounded-full font-semibold">
            6 Active Guntur Nodes
          </span>
        </div>

        <LiveMap
          atms={atms}
          vehicles={vehicles}
          height="440px"
          onSelectATM={handleOpenAtmDetails}
        />
      </div>

      {/* 4. Network Health & Demand Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <NetworkHealth
            score={stats?.network_health_score || 98.4}
            healthyCount={stats?.healthy_count || 462}
            warningCount={stats?.warning_count || 18}
            criticalCount={stats?.critical_count || 6}
          />
        </div>

        <div className="lg:col-span-8">
          <DemandChart />
        </div>
      </div>

      {/* 5. ATM Risk Intelligence */}
      <RiskOverview criticalAtms={criticalAtms} onSelectATM={handleOpenAtmDetails} />

      {/* 6. Active Routes & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ActiveRoutes />
        </div>
        <div className="lg:col-span-6">
          <AlertsPanel />
        </div>
      </div>

      {/* ATM Details Modal */}
      <ATMDetails
        atm={selectedAtm}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};
