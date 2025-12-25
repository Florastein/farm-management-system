
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import StatCard from '../components/StatCard';
import { Icons } from '../constants';

const performanceData = [
  { name: 'Week 1', feed: 400, weight: 240, mortality: 2 },
  { name: 'Week 2', feed: 300, weight: 139, mortality: 5 },
  { name: 'Week 3', feed: 200, weight: 980, mortality: 1 },
  { name: 'Week 4', feed: 278, weight: 390, mortality: 8 },
  { name: 'Week 5', feed: 189, weight: 480, mortality: 3 },
  { name: 'Week 6', feed: 239, weight: 380, mortality: 4 },
  { name: 'Week 7', feed: 349, weight: 430, mortality: 2 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Farm Overview</h1>
        <p className="text-slate-500 mt-1">Real-time performance metrics for your poultry and catfish operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Poultry" value="12,450" trend={12} icon={<Icons.Poultry />} color="bg-emerald-500" />
        <StatCard title="Total Ponds" value="18" trend={0} icon={<Icons.Catfish />} color="bg-blue-500" />
        <StatCard title="Revenue (MTD)" value="$42,390" trend={8.5} icon={<Icons.Finance />} color="bg-amber-500" />
        <StatCard title="Active Alerts" value="3" icon={<Icons.Alert />} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Growth Analysis (Average Weight)</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Feed Utilization vs Mortality</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="feed" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="mortality" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Recent Activities</h3>
          <button className="text-emerald-600 font-semibold text-sm hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { action: 'Feed Logged', target: 'Pond #4', user: 'James Wilson', time: '10 mins ago', type: 'Blue' },
            { action: 'Water Quality Alert', target: 'Pond #12', user: 'System', time: '1 hour ago', type: 'Red' },
            { action: 'Vaccination Completed', target: 'Flock #B2', user: 'Dr. Sarah', time: '3 hours ago', type: 'Green' },
            { action: 'Batch Harvested', target: 'Pond #8', user: 'Mike Ross', time: 'Yesterday', type: 'Amber' },
          ].map((act, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 rounded-full ${
                  act.type === 'Blue' ? 'bg-blue-500' : 
                  act.type === 'Red' ? 'bg-rose-500' : 
                  act.type === 'Green' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                <div>
                  <p className="font-semibold text-slate-800">{act.action}</p>
                  <p className="text-xs text-slate-500">Target: {act.target} • By {act.user}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
