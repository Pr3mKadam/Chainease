
import React, { useState } from 'react';

interface TransactionFormProps {
  onNext: (amount: number, recipient: string) => void;
  onCancel: () => void;
  currentBalance: number;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onNext, onCancel, currentBalance }) => {
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!recipient) return setError('Recipient name required');
    if (isNaN(numAmount) || numAmount <= 0) return setError('Invalid amount');
    if (numAmount > currentBalance) return setError('Exceeds available balance');
    onNext(numAmount, recipient);
  };

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col">
      <header className="flex justify-between items-center">
        <button onClick={onCancel} className="p-2 -ml-2 text-slate-400 hover:text-slate-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <span className="text-slate-900 font-bold">Transfer</span>
        <div className="w-10" />
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="text-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-7xl font-bold text-slate-900 bg-transparent border-none outline-none w-full text-center placeholder-slate-100"
              placeholder="$0"
              autoFocus
            />
            <p className="text-slate-400 text-sm font-medium mt-4 tracking-tight">
              From <span className="text-slate-900">Personal Balance</span> (${currentBalance.toLocaleString()})
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 pl-14 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium"
                placeholder="Name, handle, or wallet"
              />
              <svg className="w-6 h-6 text-slate-300 absolute left-5 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Sarah Chen', 'Product Team', 'Rent'].map(tag => (
                <button key={tag} type="button" onClick={() => setRecipient(tag)} className="bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pb-8 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold text-center animate-bounce">
              {error}
            </div>
          )}
          <button 
            type="submit"
            disabled={!amount || !recipient}
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:scale-[1.01] transition-transform disabled:opacity-20 shadow-xl shadow-slate-200"
          >
            Review & Verify
          </button>
        </div>
      </form>
    </div>
  );
};
