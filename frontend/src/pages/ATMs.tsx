import React, { useState, useEffect } from 'react';
import { getATMs } from '../lib/api';
import { ATM } from '../lib/types';
import { ATMTable } from '../components/atm/ATMTable';
import { ATMRiskCard } from '../components/atm/ATMRiskCard';
import { ATMDetails } from '../components/atm/ATMDetails';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Search, Filter, LayoutGrid, List, Plus, Sparkles, Download } from 'lucide-react';
import { clsx } from 'clsx';

export const ATMs: React.FC = () => {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedAtm, setSelectedAtm] = useState<ATM | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    getATMs().then(setAtms);
  }, []);

  const handleSelectATM = (atm: ATM) => {
    setSelectedAtm(atm);
    setIsDetailsOpen(true);
  };

  const filteredAtms = atms.filter((atm) => {
    const matchesSearch =
      atm.atm_id.toLowerCase().includes(search.toLowerCase()) ||
      atm.location.toLowerCase().includes(search.toLowerCase()) ||
      atm.city.toLowerCase().includes(search.toLowerCase());

    const matchesRisk =
      selectedRisk === 'all' ||
      (selectedRisk === 'critical' && (atm.status === 'critical' || atm.risk_level === 'critical')) ||
      (selectedRisk === 'high' && atm.risk_level === 'high') ||
      (selectedRisk === 'safe' && atm.risk_level === 'safe');

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">ATM Intelligence</h1>
            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-0.5 rounded-full">
              486 Monitored Nodes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive visibility, intraday cashout risk, and automated replenishment sizing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Download className="w-3.5 h-3.5" /> Export Data
          </Button>
          <Button size="sm" variant="primary">
            <Plus className="w-3.5 h-3.5" /> Register ATM
          </Button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ATM ID, locality, or landmark..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </div>

          {/* Risk Filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
              {[
                { id: 'all', label: 'All ATMs' },
                { id: 'critical', label: 'Critical' },
                { id: 'high', label: 'High Risk' },
                { id: 'safe', label: 'Safe' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedRisk(filter.id)}
                  className={clsx(
                    'px-3 py-1 rounded-lg transition-colors capitalize text-xs',
                    selectedRisk === filter.id
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('table')}
                className={clsx(
                  'p-1.5 rounded-lg text-slate-600 transition-colors',
                  viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-slate-900'
                )}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-1.5 rounded-lg text-slate-600 transition-colors',
                  viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-slate-900'
                )}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Area */}
      {viewMode === 'table' ? (
        <ATMTable atms={filteredAtms} onSelectATM={handleSelectATM} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAtms.map((atm) => (
            <ATMRiskCard key={atm.atm_id} atm={atm} onViewDetails={handleSelectATM} />
          ))}
        </div>
      )}

      {/* Details Modal */}
      <ATMDetails
        atm={selectedAtm}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};
