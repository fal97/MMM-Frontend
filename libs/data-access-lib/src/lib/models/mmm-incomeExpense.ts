import { TransactionType } from '../enum/transaction-type.enum';

export interface IncomeExpense {
  id: number;
  selectDate: Date;
  incomeExpenseCatogory: any;
  description: string;
  amount: number;
  clientId: number;
  transactionType: any;
}

export interface IncomeExpenseGetInterface{
    incomeExpenseId:number;
    items: IncomeExpense[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    totalAmount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    errorMessage:string,
    successMessage: string,
}
