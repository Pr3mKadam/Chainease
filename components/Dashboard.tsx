
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { UserState } from '../types';

interface DashboardProps {
  user: UserState;
  onSend: () => void;
  onViewHistory: () => void;
}

const data = [
  { val: 4000 }, { val: 3000 }, { val: 5000 }, { val: 4500 }, { val: 6000 }, { val: 5500 }, { val: 7000 }
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onSend, onViewHistory }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-slate-900 font-bold text-xl tracking-tight">ChainEase</h1>
          <p className="text-slate-400 text-xs font-medium">Safe & Simplified Payments</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
      </header>

      <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Available Capital</p>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">${user.balance.toLocaleString()}</h2>
        
        <div className="h-16 w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={2} fill="#F0FDF4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onSend}
            className="flex-1 bg-slate-900 text-white font-semibold py-4 rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-slate-200"
          >
            Send
          </button>
          <button 
            onClick={onViewHistory}
            className="flex-1 bg-slate-50 text-slate-600 font-semibold py-4 rounded-2xl border border-slate-200 hover:bg-white transition-colors"
          >
            History
          </button>
        </div>
      </section>

      <section className="px-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-900 font-bold">Recent Activity</h3>
          <button onClick={onViewHistory} className="text-emerald-600 text-xs font-bold">See All</button>
        </div>
        <div className="space-y-3">
          {user.recentTransactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">{tx.recipient}</p>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{tx.date}</p>
                </div>
              </div>
              <p className="text-slate-900 font-bold text-sm">-${tx.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
