
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
