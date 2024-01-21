export interface MogageDetail {
    id?: number;
    loanAmount?: number;
    interestRate?: number;
    startDate?: string;
    loanPeriod?: number; 
    loanType?: any;
    frequency?: any;
    periodicPayment?: number;
    totalInterestPaid?: number;
    clientId: number;

  }