import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeExpense, MmmIncomeExpenseService, TransactionType } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-expesnse-summary',
  templateUrl: './expesnse-summary.component.html',
  styleUrls: ['./expesnse-summary.component.css'],
})
export class ExpesnseSummaryComponent implements OnInit{

  incomes: any = [];
  clientId: any;
  // clientId: any;
  // addNewIncomeForm!: FormGroup;
  allIncomes!: IncomeExpense[];
  dataSource: MatTableDataSource<IncomeExpense> =
    new MatTableDataSource<IncomeExpense>();
  isAddMode = false;
  queryParams: any;
  expenseAmount: any;

  displayedColumns: string[] = [
    'date',
    'expesnse Category',
    'description',
    'amount',
  ];

  @ViewChild('formDirective') private formDirective!: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private incomeService: MmmIncomeExpenseService) {}


  totalItems = 0;
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  showClearButton = false;
  showClearButtonDate = false;
  isTableEmpty = false;
  selectIncomeId!: number;

  ngOnInit() {
    // this.incomes = income;
    this.clientId = localStorage.getItem('clientId');

    this.queryParams = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      TransactionType: TransactionType.EXPENSE,
      ClientId: Number(this.clientId)
    };
    this.getExpenses();
  }

  getExpenses() {
    this.incomeService.getIncomeExpense(this.queryParams).subscribe((item) => {
      this.allIncomes = item.items;
      this.totalItems = item.totalCount;
      if (item.totalCount > 0) {
        this.isTableEmpty = true;
      } else {
        this.isTableEmpty = false;
      }
      this.dataSource = new MatTableDataSource<IncomeExpense>(this.allIncomes);
      this.currentPage = item.pageNumber;
      this.dataSource.paginator = this.paginator;
      this.expenseAmount = item.totalAmount;
    });
  }

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.queryParams = {
      ...this.queryParams,
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    };
    this.getExpenses();
  }

  getExpenseCatogoryText(inviteStatus: number): string {
    switch (inviteStatus) {
      case 0:
        return 'Buy Now, Pay Later';
      case 1:
        return 'Council';
      case 2:
        return 'Debit';
      case 3:
        return 'Drinking Place';
      case 4:
        return 'Eating Place';
      case 5:
        return 'External Transfers';
      case 6:
        return 'Fees';
      case 7:
        return 'Fuel';
      case 8:
        return 'Gambling';
      case 9:
        return 'Groceries';
      case 10:
        return 'Insurance';
      case 11:
        return 'Internal Transfer';
      case 12:
        return 'Leisure';
      case 13:
        return 'Medical';
      case 14:
        return 'Memberships';
      case 15:
        return 'Other Purchase';
      case 16:
        return 'Personal Care';
      case 17:
        return 'Pet Care';
      case 18:
        return 'Pharmacy';
      case 19:
        return 'Retail';
      case 20:
        return 'Road Tolls';
      case 21:
        return 'Subscription Services';
      case 22:
        return 'Taxi';
      case 23:
        return 'Telecommunications';
      case 24:
        return 'Transport';
      case 25:
        return 'Withdrawal';
      default:
        return '';
    }
  }
}
