
export interface Transaction {
  id: string;
  amount: number;
  recipient: string;
  category: string;
  date: string;
  status: 'pending' | 'settled' | 'flagged';
  hash?: string;
}

export interface SmartAutomation {
  ruleName: string;
  status: 'active' | 'warning' | 'info';
  message: string;
}

export interface SmartCheckResult {
  safetyScore: number;
  advice: string;
  reasoning: string[]; // Structured bullet points for explainable AI
  categorySuggestion: string;
  isNewRecipient: boolean;
  budgetImpact: string;
  transparencyNote: string;
  appliedAutomations: SmartAutomation[];
}

export type Step = 'dashboard' | 'input' | 'smart-check' | 'status' | 'history';

export interface UserState {
  balance: number;
  recentTransactions: Transaction[];
}
