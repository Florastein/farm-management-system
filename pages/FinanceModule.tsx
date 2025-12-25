
import React from 'react';

const FinanceModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Financial Ledger</h1>
        <p className="text-slate-500 mt-1">Monitor expenses, sales, and profitability margins.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-600/20">
          <p className="text-emerald-100 text-sm font-medium">Total Revenue (Yearly)</p>
          <p className="text-3xl font-bold mt-1">$142,500.00</p>
          <div className="mt-4 flex items-center gap-1.5 text-emerald-100 text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>+12.4% from last year</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Operating Expenses</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">$84,320.00</p>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[65%]" />
          </div>
          <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase">65% of Budget Used</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Net Profit Margin</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">40.8%</p>
          <p className="mt-4 text-xs text-emerald-600 font-bold">Excellent Performance</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Export CSV</button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">+ New Entry</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2024-03-10', desc: 'Feed Purchase (Layer Mash)', cat: 'Inventory', amount: -4200, status: 'Completed' },
                { date: '2024-03-09', desc: 'Sale: 500 Broilers Batch #A2', cat: 'Sale', amount: 7500, status: 'Completed' },
                { date: '2024-03-08', desc: 'Medicine & Vaccines', cat: 'Health', amount: -850, status: 'Pending' },
                { date: '2024-03-08', desc: 'Sale: 400 Trays of Eggs', cat: 'Sale', amount: 1200, status: 'Completed' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{tx.desc}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold uppercase">{tx.cat}</span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase ${tx.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;
