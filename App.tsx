
import React, { useState, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { SmartReview } from './components/SmartReview';
import { StatusView } from './components/StatusView';
import { HistoryView } from './components/HistoryView';
import { analyzeTransaction } from './services/geminiService';
import { Step, UserState, SmartCheckResult, Transaction } from './types';

const INITIAL_USER_STATE: UserState = {
  balance: 24850.32,
  recentTransactions: [
    { id: 'tx_88291', amount: 45.00, recipient: 'Starlight Coffee', category: 'Food', date: 'Oct 24, 09:41', status: 'settled' },
    { id: 'tx_88292', amount: 1200.00, recipient: 'Cloud Hosting', category: 'Ops', date: 'Oct 23, 14:20', status: 'settled' },
    { id: 'tx_88293', amount: 89.90, recipient: 'Modern Gym', category: 'Health', date: 'Oct 22, 18:00', status: 'settled' },
  ]
};

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('dashboard');
  const [user, setUser] = useState<UserState>(INITIAL_USER_STATE);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [currentRecipient, setCurrentRecipient] = useState<string>('');
  const [smartCheck, setSmartCheck] = useState<SmartCheckResult | null>(null);

  const handleReview = async (amount: number, recipient: string) => {
    setCurrentAmount(amount);
    setCurrentRecipient(recipient);
    setStep('smart-check');
    const result = await analyzeTransaction(amount, recipient, user.balance);
    setSmartCheck(result);
  };

  const handleConfirm = () => {
    const newTx: Transaction = {
      id: `tx_${Math.random().toString(36).substr(2, 5)}`,
      amount: currentAmount,
      recipient: currentRecipient,
      category: smartCheck?.categorySuggestion || 'General',
      date: 'Just now',
      status: 'settled'
    };

    setUser(prev => ({
      balance: prev.balance - currentAmount,
      recentTransactions: [newTx, ...prev.recentTransactions]
    }));
    
    setStep('status');
  };

  const reset = useCallback(() => {
    setStep('dashboard');
    setSmartCheck(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Human-centered device frame */}
      <div className="w-full max-w-[400px] bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] h-[820px] border-[12px] border-slate-900 overflow-hidden relative flex flex-col">
        
        {/* Notch Area */}
        <div className="h-10 w-full flex justify-center items-end pb-1">
          <div className="w-32 h-6 bg-slate-900 rounded-b-2xl"></div>
        </div>

        <main className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          {step === 'dashboard' && (
            <Dashboard 
              user={user} 
              onSend={() => setStep('input')} 
              onViewHistory={() => setStep('history')} 
            />
          )}

          {step === 'input' && (
            <TransactionForm 
              currentBalance={user.balance} 
              onNext={handleReview} 
              onCancel={reset} 
            />
          )}

          {step === 'smart-check' && (
            <SmartReview 
              amount={currentAmount} 
              recipient={currentRecipient} 
              result={smartCheck} 
              onConfirm={handleConfirm}
              onBack={() => setStep('input')}
            />
          )}

          {step === 'status' && (
            <StatusView 
              amount={currentAmount} 
              recipient={currentRecipient} 
              onDone={reset} 
            />
          )}

          {step === 'history' && (
            <HistoryView 
              transactions={user.recentTransactions} 
              onBack={reset} 
            />
          )}
        </main>

        <div className="h-1.5 w-32 bg-slate-200 rounded-full self-center mb-4 mt-2"></div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          ChainEase Protocol v1.0.4
        </p>
      </div>
    </div>
  );
};

export default App;
