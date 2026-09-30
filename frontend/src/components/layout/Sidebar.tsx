import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Landmark,
  Truck,
  Route as RouteIcon,
  Radio,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}) => {
  const navItems = [
    { name: 'Overview', to: '/', icon: LayoutDashboard },
    { name: 'ATM Intelligence', to: '/atms', icon: Landmark, badge: '12 Crit' },
    { name: 'Vehicles', to: '/vehicles', icon: Truck },
    { name: 'Route Planner', to: '/routes', icon: RouteIcon },
    { name: 'Live Operations', to: '/operations', icon: Radio, pulse: true },
    { name: 'Alerts', to: '/alerts', icon: Bell, badge: '3' },
    { name: 'Analytics', to: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-slate-200/80 transition-all duration-300 ease-in-out flex flex-col justify-between select-none shadow-sm',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-brand-500/20 shrink-0">
                CR
              </div>
              {!collapsed && (
                <div className="truncate">
                  <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                    CashRoute<span className="text-brand-600">AI</span>
                  </span>
                  <span className="block text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                    Logistics Control
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggle}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative',
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    )
                  }
                  title={collapsed ? item.name : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={clsx(
                          'w-5 h-5 shrink-0 transition-colors',
                          isActive ? 'text-brand-600' : 'text-slate-600 group-hover:text-slate-700'
                        )}
                      />

                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span
                              className={clsx(
                                'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                                item.badge.includes('Crit')
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-brand-100 text-brand-700'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.pulse && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-600 rounded-r-md" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* System status pill */}
          {!collapsed ? (
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> System Online
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">99.9%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1">
                <div className="bg-emerald-500 h-1 rounded-full w-[99.9%]" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="System Status: 99.9% Online">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            </div>
          )}

          {/* User Profile item */}
          <div
            className={clsx(
              'flex items-center gap-3 p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer',
              collapsed && 'justify-center'
            )}
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs shrink-0">
              <UserCheck className="w-4 h-4 text-brand-700" />
            </div>
            {!collapsed && (
              <div className="truncate flex-1">
                <p className="text-xs font-semibold text-slate-900 leading-tight">Chief Dispatcher</p>
                <p className="text-[11px] text-slate-600 leading-tight">Guntur Central Grid</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
