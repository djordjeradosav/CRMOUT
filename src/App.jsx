import React from 'react';

import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './pages/Dasboard';
import SettingsPage from './pages/Settings';
import DashboardLayout from './components/layout/DashboardLayout';
import Sidebar from './components/layout/Sidebar';
import Clients from './pages/Clients';
import InvoicePage from './pages/Invoices';
import ClientsPage from './pages/Clients';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage />} />

              <Route path="/clients" element={<ClientsPage />} />

              <Route path="/invoices" element={<InvoicePage />} />

              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
