
import React, { useEffect, useState } from 'react';

interface StatusViewProps {
  amount: number;
  recipient: string;
  onDone: () => void;
}

export const StatusView: React.FC<StatusViewProps> = ({ amount, recipient, onDone }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const steps = [
    { 
      label: 'Securing Connection', 
      sub: 'Establishing a private, encrypted tunnel to the network.',
      reassurance: 'End-to-end encryption active.' 
    },
    { 
      label: 'Integrity Audit', 
      sub: 'Verifying recipient details and matching against your safety profile.',
      reassurance: 'No anomalies detected.' 
    },
    { 
      label: 'Ledger Synchronization', 
      sub: 'Broadcasting the transaction to the high-speed settlement ledger.',
      reassurance: 'Record is now immutable.' 
    },
    { 
      label: 'Final Settlement', 
      sub: 'Funds have successfully arrived and are available for use.',
      reassurance: 'Transfer finalized.' 
    }
  ];

  useEffect(() => {
    const progress = [1200, 2000, 1800, 1000];
    let stepCount = 0;
    
    const next = () => {
      if (stepCount < steps.length - 1) {
        setTimeout(() => {
          stepCount++;
          setCurrentStep(stepCount);
          if (stepCount === steps.length - 1) {
            setShowConfetti(true);
          }
          next();
        }, progress[stepCount]);
      }
    };

    next();
  }, [steps.length]);

  return (
    <div className="h-full flex flex-col justify-between py-4 animate-in fade-in duration-700 relative overflow-hidden">
      {/* Confetti Generation for Demo Flair */}
      {showConfetti && Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="confetti" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            backgroundColor: ['#10b981', '#34d399', '#6ee7b7'][Math.floor(Math.random() * 3)],
            animationDelay: `${Math.random() * 2}s`
          }} 
        />
      ))}

      <div className="text-center py-8">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          {currentStep === steps.length - 1 ? (
            <div className="animate-in zoom-in-150 duration-700 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
              <svg className="w-12 h-12 text-emerald-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>
              <svg className="w-8 h-8 text-emerald-600/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </>
          )}
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter transition-all duration-500 transform ${currentStep === steps.length - 1 ? 'scale-110' : ''}">
          ${amount.toLocaleString()}
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-medium">To {recipient}</p>
      </div>

      <div className="space-y-6 px-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex gap-4 items-start transition-all duration-700 ${idx > currentStep ? 'opacity-20 translate-x-2' : 'opacity-100 translate-x-0'}`}>
            <div className="relative flex flex-col items-center">
              <div className={`z-10 w-3 h-3 rounded-full transition-all duration-500 ${
                idx < currentStep ? 'bg-emerald-500 scale-100' : 
                idx === currentStep ? 'bg-emerald-400 animate-pulse scale-125' : 'bg-slate-200 scale-75'
              }`}></div>
              {idx < steps.length - 1 && (
                <div className={`w-0.5 h-12 -mb-2 transition-colors duration-500 ${idx < currentStep ? 'bg-emerald-100' : 'bg-slate-100'}`}></div>
              )}
            </div>
            <div className="flex-1 -mt-1">
              <div className="flex justify-between items-center">
                <p className={`text-sm font-bold tracking-tight transition-colors ${idx === currentStep ? 'text-slate-900' : idx < currentStep ? 'text-slate-600' : 'text-slate-300'}`}>
                  {step.label}
                </p>
                {idx < currentStep && (
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-in fade-in zoom-in">Verified</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                {step.sub}
              </p>
              {idx === currentStep && (
                <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
                  {step.reassurance}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pb-8 px-4 z-20">
        {currentStep === steps.length - 1 ? (
          <button 
            onClick={onDone}
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-emerald-200"
          >
            Dashboard
          </button>
        ) : (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
            <p className="text-[11px] text-slate-500 font-semibold italic">
              "Encryption active. Ledger sync in progress."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
