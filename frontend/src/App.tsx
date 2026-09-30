import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ATMs } from './pages/ATMs';
import { Vehicles } from './pages/Vehicles';
import { Routes } from './pages/Routes';
import { Operations } from './pages/Operations';
import { Alerts } from './pages/Alerts';
import { Analytics } from './pages/Analytics';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="atms" element={<ATMs />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="routes" element={<Routes />} />
          <Route path="operations" element={<Operations />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default App;
