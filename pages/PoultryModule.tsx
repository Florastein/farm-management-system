
import React, { useState } from 'react';
import { Flock, PoultryActivity, ActivityType, EggProductionLog } from '../types';

const INITIAL_FLOCKS: Flock[] = [
  { id: 'F001', breed: 'Isa Brown', startDate: '2024-01-15', initialCount: 5000, currentCount: 4920, purpose: 'LAYER', status: 'ACTIVE' },
  { id: 'F002', breed: 'Cobb 500', startDate: '2024-02-10', initialCount: 2000, currentCount: 1980, purpose: 'BROILER', status: 'ACTIVE' },
];

const INITIAL_ACTIVITIES: PoultryActivity[] = [
  { id: 'act-1', flockId: 'F001', type: 'VACCINATION', date: '2024-01-20', product: 'Newcastle Disease Vaccine', technician: 'Dr. Sarah', status: 'COMPLETED', notes: 'First dose administered' },
  { id: 'act-2', flockId: 'F001', type: 'DEBEAKING', date: '2024-02-05', technician: 'James Wilson', status: 'COMPLETED', notes: 'Precision debeaking performed on all layers' },
  { id: 'act-3', flockId: 'F001', type: 'VACCINATION', date: '2024-03-25', product: 'Gumboro Vaccine', technician: 'Dr. Sarah', status: 'SCHEDULED', notes: 'Mandatory booster' },
  { id: 'act-4', flockId: 'F002', type: 'CLEANING', date: '2024-03-15', technician: 'Mike Ross', status: 'COMPLETED', notes: 'Coop sanitation and litter replacement' },
];

const INITIAL_EGG_LOGS: EggProductionLog[] = [
  { id: 'egg-1', flockId: 'F001', date: '2024-03-20', quantity: 4200, collectedBy: 'Mike Ross', notes: 'Good yield today' },
  { id: 'egg-2', flockId: 'F001', date: '2024-03-19', quantity: 4150, collectedBy: 'Dr. Sarah', notes: 'Slightly lower due to heat' },
];

const PoultryModule: React.FC = () => {
  const [flocks] = useState<Flock[]>(INITIAL_FLOCKS);
  const [activities, setActivities] = useState<PoultryActivity[]>(INITIAL_ACTIVITIES);
  const [eggLogs, setEggLogs] = useState<EggProductionLog[]>(INITIAL_EGG_LOGS);
  const [selectedFlockId, setSelectedFlockId] = useState<string | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showEggModal, setShowEggModal] = useState(false);
  const [viewMode, setViewMode] = useState<'activities' | 'eggs'>('activities');

  // Activity Form State
  const [activityFormData, setActivityFormData] = useState({
    type: 'VACCINATION' as ActivityType,
    date: new Date().toISOString().split('T')[0],
    product: '',
    technician: '',
    notes: ''
  });

  // Egg Form State
  const [eggFormData, setEggFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    quantity: 0,
    collectedBy: '',
    notes: ''
  });

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlockId) return;

    const newActivity: PoultryActivity = {
      id: `act-${Date.now()}`,
      flockId: selectedFlockId,
      ...activityFormData,
      status: 'COMPLETED'
    };

    setActivities([newActivity, ...activities]);
    setShowLogModal(false);
    setActivityFormData({ type: 'VACCINATION', date: new Date().toISOString().split('T')[0], product: '', technician: '', notes: '' });
  };

  const handleLogEggs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlockId) return;

    const newLog: EggProductionLog = {
      id: `egg-${Date.now()}`,
      flockId: selectedFlockId,
      ...eggFormData
    };

    setEggLogs([newLog, ...eggLogs]);
    setShowEggModal(false);
    setEggFormData({ date: new Date().toISOString().split('T')[0], quantity: 0, collectedBy: '', notes: '' });
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'VACCINATION': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.282a2 2 0 01-1.806 0l-.628-.282a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.34.34a2 2 0 000 2.829l1.245 1.244A8 8 0 0011.603 21h.794a8 8 0 003.946-1.027l1.245-1.244a2 2 0 000-2.829l-.34-.34z" /></svg>;
      case 'DEBEAKING': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" /></svg>;
      case 'MEDICATION': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
      default: return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const selectedFlock = flocks.find(f => f.id === selectedFlockId);

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Poultry Management</h1>
          <p className="text-slate-500 mt-1">Track flock health, maintenance, and daily egg production.</p>
        </div>
        <div className="flex gap-3">
          {selectedFlock?.purpose === 'LAYER' && (
            <button 
              onClick={() => setShowEggModal(true)}
              className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Log Daily Eggs
            </button>
          )}
          <button 
            onClick={() => { setShowLogModal(true); if(!selectedFlockId) setSelectedFlockId(flocks[0]?.id); }}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Log New Activity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-700">Active Flocks</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {flocks.map(flock => (
                <div 
                  key={flock.id} 
                  className={`p-6 cursor-pointer transition-all ${selectedFlockId === flock.id ? 'bg-emerald-50/50 border-l-4 border-emerald-500' : 'hover:bg-slate-50'}`}
                  onClick={() => setSelectedFlockId(flock.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800">{flock.breed}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${flock.purpose === 'LAYER' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {flock.purpose}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">ID: {flock.id} • {flock.currentCount} birds</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Health Score</p>
                      <p className="text-sm font-bold text-emerald-600">98%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!selectedFlockId ? (
            <div className="bg-white p-20 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <h3 className="font-bold text-slate-800">Select a flock</h3>
              <p className="text-sm">Select a flock from the left to view metrics and history.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setViewMode('activities')}
                  className={`flex-1 py-4 text-sm font-bold transition-all ${viewMode === 'activities' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/10' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Activity History
                </button>
                {selectedFlock?.purpose === 'LAYER' && (
                  <button 
                    onClick={() => setViewMode('eggs')}
                    className={`flex-1 py-4 text-sm font-bold transition-all ${viewMode === 'eggs' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/10' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Egg Production
                  </button>
                )}
              </div>

              <div className="p-6">
                {viewMode === 'activities' ? (
                  <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {activities
                      .filter(a => a.flockId === selectedFlockId)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((activity) => (
                        <div key={activity.id} className="relative pl-12">
                          <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm z-10 ${
                            activity.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">{activity.type.replace('_', ' ')}</span>
                                <h4 className="font-bold text-slate-800">{activity.product || 'General Maintenance'}</h4>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400">{activity.date}</span>
                            </div>
                            <p className="text-sm text-slate-600">{activity.notes}</p>
                            <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase">Technician: {activity.technician}</p>
                          </div>
                        </div>
                      ))}
                    {activities.filter(a => a.flockId === selectedFlockId).length === 0 && (
                      <p className="text-center text-slate-400 py-10 italic">No activity logs yet.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <p className="text-xs text-amber-600 font-bold uppercase mb-1">Weekly Average</p>
                        <p className="text-2xl font-black text-amber-700">4,120</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Yield Rate</p>
                        <p className="text-2xl font-black text-emerald-700">84%</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-600 font-bold uppercase mb-1">Last Logged</p>
                        <p className="text-lg font-black text-blue-700">{eggLogs.find(e => e.flockId === selectedFlockId)?.date || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {eggLogs
                        .filter(e => e.flockId === selectedFlockId)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((log) => (
                          <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" /></svg>
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{log.quantity.toLocaleString()} Eggs</p>
                                <p className="text-xs text-slate-500">Collected by {log.collectedBy} on {log.date}</p>
                              </div>
                            </div>
                            <span className="text-[10px] bg-white px-2 py-1 rounded border border-slate-200 font-bold text-slate-400 uppercase">
                              {(log.quantity / 30).toFixed(1)} Crates
                            </span>
                          </div>
                        ))}
                      {eggLogs.filter(e => e.flockId === selectedFlockId).length === 0 && (
                        <p className="text-center text-slate-400 py-10 italic">No production logs recorded yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-600 text-white">
              <div>
                <h3 className="font-bold text-lg">Log Poultry Activity</h3>
                <p className="text-xs text-emerald-100">Flock: {selectedFlock?.breed || 'N/A'}</p>
              </div>
              <button onClick={() => setShowLogModal(false)} className="p-2 hover:bg-emerald-500 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleLogActivity} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Activity Type</label>
                  <select 
                    value={activityFormData.type}
                    onChange={e => setActivityFormData({...activityFormData, type: e.target.value as ActivityType})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="VACCINATION">Vaccination</option>
                    <option value="DEBEAKING">Debeaking</option>
                    <option value="MEDICATION">Medication</option>
                    <option value="CLEANING">Cleaning</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Date</label>
                  <input 
                    type="date"
                    value={activityFormData.date}
                    onChange={e => setActivityFormData({...activityFormData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Product Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Newcastle Vaccine"
                  value={activityFormData.product}
                  onChange={e => setActivityFormData({...activityFormData, product: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Technician</label>
                <input 
                  type="text"
                  placeholder="Staff member name"
                  value={activityFormData.technician}
                  onChange={e => setActivityFormData({...activityFormData, technician: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Notes</label>
                <textarea 
                  rows={2}
                  value={activityFormData.notes}
                  onChange={e => setActivityFormData({...activityFormData, notes: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg">Save Log</button>
            </form>
          </div>
        </div>
      )}

      {/* Egg Log Modal */}
      {showEggModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-amber-500 text-white">
              <div>
                <h3 className="font-bold text-lg">Daily Egg Collection</h3>
                <p className="text-xs text-amber-100">Flock: {selectedFlock?.breed || 'N/A'}</p>
              </div>
              <button onClick={() => setShowEggModal(false)} className="p-2 hover:bg-amber-400 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleLogEggs} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Collection Date</label>
                  <input 
                    type="date"
                    required
                    value={eggFormData.date}
                    onChange={e => setEggFormData({...eggFormData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Number of Eggs</label>
                  <input 
                    type="number"
                    required
                    min="0"
                    placeholder="Total count"
                    value={eggFormData.quantity || ''}
                    onChange={e => setEggFormData({...eggFormData, quantity: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Collected By</label>
                <input 
                  type="text"
                  required
                  placeholder="Staff name"
                  value={eggFormData.collectedBy}
                  onChange={e => setEggFormData({...eggFormData, collectedBy: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Observational notes (egg quality, etc.)"
                  value={eggFormData.notes}
                  onChange={e => setEggFormData({...eggFormData, notes: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white py-3 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg">Save Production Log</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoultryModule;
