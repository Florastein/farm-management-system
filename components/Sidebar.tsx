
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons, COLORS } from '../constants';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Icons.Dashboard },
  { name: 'Poultry', path: '/poultry', icon: Icons.Poultry },
  { name: 'Catfish', path: '/catfish', icon: Icons.Catfish },
  { name: 'Finance', path: '/finance', icon: Icons.Finance },
  { name: 'Alerts', path: '/alerts', icon: Icons.Alert },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl">F</div>
        <span className="text-xl font-bold tracking-tight">FMS Pro</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
          <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border-2 border-emerald-500" alt="Admin" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Dr. Ahmed</p>
            <p className="text-xs text-slate-500">Farm Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
