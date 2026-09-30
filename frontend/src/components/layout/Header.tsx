import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Shield, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full glass-nav flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile trigger & Subtitle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 text-sm">CashRouteAI Command</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-brand-500" />
              AI-powered cash logistics
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Global Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ATM node, vehicle, or route code (e.g. ATM-042, CIT-07)..."
            className="w-full pl-10 pr-4 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-xs">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Operational Status, Live Clock & Notification Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* System Operational Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          All systems operational
        </div>

        {/* Live Date/Time */}
        <div className="hidden sm:flex flex-col text-right text-xs">
          <span className="font-mono font-medium text-slate-800">{currentTime}</span>
          <span className="text-[10px] text-slate-600 flex items-center justify-end gap-1">
            <Calendar className="w-2.5 h-2.5" />
            {currentDate}
          </span>
        </div>

        {/* Notifications Button */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="3 unread alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shadow-xs ring-2 ring-white">
            SD
          </div>
        </div>
      </div>
    </header>
  );
};
