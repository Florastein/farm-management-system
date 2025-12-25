
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PoultryModule from './pages/PoultryModule';
import CatfishModule from './pages/CatfishModule';
import FinanceModule from './pages/FinanceModule';
import FarmConsultant from './components/FarmConsultant';

const App: React.FC = () => {
  // Mock farm data for AI consultant context
  const farmData = {
    name: "Green Valley Farm",
    stats: {
      poultryCount: 12450,
      pondCount: 18,
      avgMortality: "1.2%",
      feedStock: "4,500kg"
    }
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        
        <main className="flex-1 ml-64 p-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/poultry" element={<PoultryModule />} />
              <Route path="/catfish" element={<CatfishModule />} />
              <Route path="/finance" element={<FinanceModule />} />
              <Route path="/alerts" element={
                <div className="animate-fade-in p-20 text-center">
                  <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 inline-block">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">All Systems Normal</h2>
                    <p className="text-slate-500 mt-2">There are currently no active critical alerts for your farm.</p>
                  </div>
                </div>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>

        <FarmConsultant farmData={farmData} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </Router>
  );
};

export default App;
