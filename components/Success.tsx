
import React, { useEffect } from 'react';

interface SuccessProps {
  amount: number;
  recipient: string;
  onDone: () => void;
}

export const Success: React.FC<SuccessProps> = ({ amount, recipient, onDone }) => {
  useEffect(() => {
    // Basic interaction simulation
    const timer = setTimeout(onDone, 5000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Success!</h2>
        <p className="text-slate-500 mt-2">Transfer of <strong>${amount.toLocaleString()}</strong> to <strong>{recipient}</strong> has been initiated.</p>
      </div>

      <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400 font-medium uppercase tracking-wider">Transaction ID</span>
          <span className="text-slate-800 font-mono">TXN-492-AXL-882</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400 font-medium uppercase tracking-wider">Status</span>
          <span className="text-green-600 font-bold uppercase tracking-wider">Processing</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400 font-medium uppercase tracking-wider">Arrival Time</span>
          <span className="text-slate-800">Instantly</span>
        </div>
      </div>

      <p className="text-slate-400 text-xs italic">Safety Notice: This transaction can be recalled within the next 60 seconds if you made an error.</p>

      <button 
        onClick={onDone}
        className="w-full bg-slate-900 text-white font-semibold py-4 rounded-2xl hover:bg-slate-800 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};
