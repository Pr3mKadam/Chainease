
import React from 'react';
import { Transaction } from '../types';

interface HistoryViewProps {
  transactions: Transaction[];
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ transactions, onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <header className="flex justify-between items-center px-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-slate-900 font-bold">Ledger History</span>
        <div className="w-6" />
      </header>

      <div className="px-2 space-y-8">
        <div>
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Latest Operations</h3>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">
                      {tx.recipient[0]}
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-sm">{tx.recipient}</p>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{tx.date}</p>
                    </div>
                  </div>
                  <p className="text-slate-900 font-black text-sm">-${tx.amount.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                   <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Settled</span>
                   <span className="text-[10px] text-slate-300 font-mono">#{tx.id.slice(0, 8)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
