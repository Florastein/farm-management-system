
import React, { useState } from 'react';
import { Pond } from '../types';

interface WaterLogEntry {
  id: string;
  pondId: string;
  date: string;
  technician: string;
  notes: string;
}

const INITIAL_PONDS: Pond[] = [
  { id: 'P01', name: 'Main Pond A', sizeM2: 50, stockingDate: '2023-11-20', lastWaterChangeDate: '2024-03-12', initialCount: 1000, currentCount: 985, status: 'ACTIVE' },
  { id: 'P02', name: 'Nursery 1', sizeM2: 20, stockingDate: '2024-01-05', lastWaterChangeDate: '2024-03-14', initialCount: 2000, currentCount: 1990, status: 'ACTIVE' },
  { id: 'P03', name: 'Main Pond B', sizeM2: 50, stockingDate: '2023-08-15', lastWaterChangeDate: '2023-12-01', initialCount: 1000, currentCount: 0, status: 'HARVESTED' },
];

const INITIAL_LOGS: WaterLogEntry[] = [
  { id: '1', pondId: 'P01', date: '2024-03-12', technician: 'James Wilson', notes: 'Standard cleaning, 50% water exchange.' },
  { id: '2', pondId: 'P01', date: '2024-03-08', technician: 'James Wilson', notes: 'Routine water change.' },
  { id: '3', pondId: 'P02', date: '2024-03-14', technician: 'Sarah Connor', notes: 'Full tank cleaning and water refresh.' },
];

const CatfishModule: React.FC = () => {
  const [ponds, setPonds] = useState<Pond[]>(INITIAL_PONDS);
  const [logs, setLogs] = useState<WaterLogEntry[]>(INITIAL_LOGS);
  const [selectedPond, setSelectedPond] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleUpdateWaterChange = (pondId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Update the pond's last check date
    setPonds(prev => prev.map(p => p.id === pondId ? { ...p, lastWaterChangeDate: today } : p));
    
    // Record a new log entry
    const newLog: WaterLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      pondId: pondId,
      date: today,
      technician: 'Current User', // In a real app, this would be the logged-in user
      notes: 'Water changed recorded via quick action.'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const getDaysSinceChange = (dateStr: string) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Aquaculture (Catfish)</h1>
          <p className="text-slate-500 mt-1">Monitor water quality parameters, maintenance schedules, and biomass growth.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
           Stock New Pond
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ponds.filter(p => p.status === 'ACTIVE').map((pond) => {
          const daysSince = getDaysSinceChange(pond.lastWaterChangeDate);
          const isOverdue = daysSince > 2;

          return (
            <div key={pond.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group flex flex-col hover:border-blue-200 transition-all">
              <div className={`h-2 w-full ${isOverdue ? 'bg-rose-500' : 'bg-blue-500'}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{pond.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{pond.id} • {pond.sizeM2} m²</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedPond(pond.id); setShowHistory(true); }}
                    className="bg-slate-50 text-slate-400 p-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"
                    title="View History"
                  >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-slate-500 font-medium">Current Stock</span>
                    <span className="text-lg font-bold text-slate-800">{pond.currentCount.toLocaleString()} fishes</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Temperature</p>
                      <p className="text-sm font-bold text-slate-700">28.4°C</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">pH Level</p>
                      <p className="text-sm font-bold text-emerald-600">7.2 (Ideal)</p>
                    </div>
                    <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Last Water Change</p>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-bold ${isOverdue ? 'text-rose-500' : 'text-emerald-600'}`}>
                          {pond.lastWaterChangeDate}
                        </p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {daysSince === 0 ? 'Today' : `${daysSince}d ago`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm">Log Feed</button>
                    <button className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors shadow-sm">Water Quality</button>
                  </div>
                  <button 
                    onClick={() => handleUpdateWaterChange(pond.id)}
                    className="w-full bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Record Water Change Today
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* History Modal */}
      {showHistory && selectedPond && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
              <div>
                <h3 className="font-bold text-lg">Maintenance History</h3>
                <p className="text-xs text-blue-100">Showing logs for {ponds.find(p => p.id === selectedPond)?.name}</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-blue-500 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {logs.filter(l => l.pondId === selectedPond).length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic">No maintenance logs found for this pond.</p>
                </div>
              ) : (
                logs.filter(l => l.pondId === selectedPond).map((log) => (
                  <div key={log.id} className="relative pl-6 border-l-2 border-slate-100 pb-4 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-slate-800">{log.date}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{log.technician}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{log.notes}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowHistory(false)}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatfishModule;
