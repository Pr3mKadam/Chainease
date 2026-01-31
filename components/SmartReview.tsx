
import React from 'react';
import { SmartCheckResult } from '../types';

interface SmartReviewProps {
  amount: number;
  recipient: string;
  result: SmartCheckResult | null;
  onConfirm: () => void;
  onBack: () => void;
}

export const SmartReview: React.FC<SmartReviewProps> = ({ amount, recipient, result, onConfirm, onBack }) => {
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8 animate-pulse px-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Audit</h2>
          <p className="text-slate-400 text-sm mt-1">Applying automation protocols...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-8">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-slate-900 font-bold">Verification</span>
        <div className="w-6" />
      </header>

      <div className="bg-slate-50 rounded-[2.5rem] p-8 text-center border border-slate-100">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Authorization Amount</p>
        <h2 className="text-5xl font-bold text-slate-900 tracking-tighter">${amount.toLocaleString()}</h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <p className="text-slate-600 font-medium">to {recipient}</p>
          {!result.isNewRecipient && (
            <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest">Verified Contact</span>
          )}
        </div>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-[2rem] space-y-6 shadow-xl relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Reasoning</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
               <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Safe Passage</span>
            </div>
          </div>
          
          <p className="text-sm font-semibold text-slate-100 leading-snug">
            {result.advice}
          </p>

          <ul className="space-y-3">
            {result.reasoning.map((point, idx) => (
              <li key={idx} className="flex gap-3 items-start group">
                <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Smart Automations</h4>
        <div className="grid grid-cols-1 gap-2">
          {result.appliedAutomations.map((auto, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-3 p-4 rounded-2xl border ${
                auto.status === 'warning' ? 'bg-red-50 border-red-100' : 
                auto.status === 'active' ? 'bg-emerald-50 border-emerald-100' : 
                'bg-white border-slate-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                auto.status === 'warning' ? 'bg-red-100 text-red-600' : 
                auto.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 
                'bg-slate-100 text-slate-400'
              }`}>
                {auto.status === 'warning' ? '⚠️' : auto.status === 'active' ? '⚡' : '⚙️'}
              </div>
              <div>
                <p className={`text-xs font-bold ${
                  auto.status === 'warning' ? 'text-red-900' : 
                  auto.status === 'active' ? 'text-emerald-900' : 
                  'text-slate-900'
                }`}>
                  {auto.ruleName}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">{auto.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button 
          onClick={onConfirm}
          className="group w-full bg-emerald-500 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95"
        >
          <span>Authorize Release</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-medium italic">
          Ref: {result.transparencyNote}
        </p>
      </div>
    </div>
  );
};
