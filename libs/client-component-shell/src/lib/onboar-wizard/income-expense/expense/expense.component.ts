import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  IncomeExpense,
  MmmIncomeExpenseService,
  TransactionType,
  expense,
} from '@frontend/data-access-lib';
import { DeleteIncomeExpenseDialogComponent } from '../delete-income-expense-dialog/delete-income-expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expenses: any = [];
  addNewExpenseForm!: FormGroup;
  currentClientId: any;
  allIncomes!: IncomeExpense[];
  dataSource: MatTableDataSource<IncomeExpense> =
    new MatTableDataSource<IncomeExpense>();
  isAddMode = false;
  queryParams:any
  expenseAmount:any
  @Output() expenseDetailsChanged: EventEmitter<boolean> = new EventEmitter();


  displayedColumns: string[] = [
    'date',
    'expesnse Category',
    'description',
    'amount',
    'action',
  ];

  @ViewChild('formDirective') private formDirective!: NgForm;

  //Material pagination
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Material sorting
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  totalItems = 0;
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  showClearButton = false;
  showClearButtonDate = false;
  isTableEmpty = false;
  selectIncomeId!: number;

  

  constructor(
    private fd: FormBuilder,
    private jwtHelper: JwtHelperService,
    private incomeService: MmmIncomeExpenseService,
    public dialog: MatDialog

  ) {
    const token = localStorage.getItem('token'); // Replace with where you store your JWT token
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      this.currentClientId =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ]; // Use the correct claim name\
      console.log('client id', this.currentClientId);
    }
  }

  ngOnInit() {
    this.expenses = expense;
    

    this.addNewExpenseForm = this.fd.group({
      id: [0],
      selectDate: ['', Validators.required],
      incomeExpenseCatogory: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required]],
      clientId: Number(this.currentClientId),
      transactionType: TransactionType.EXPENSE,
    });

    this.queryParams = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      TransactionType: TransactionType.EXPENSE,
      ClientId: Number(this.currentClientId),
      isDescending:false,
      sortBy:''
    };

    //call get all expenses according to the pagination
    this.getExpenses();
  }

  // map data to input fields according to the select ID
  editExpense(income: any) {
    this.addNewExpenseForm.patchValue(income);
    this.selectIncomeId = income.id;
    this.isAddMode = true;
  }
 
  sortData(columnName: string) {
    if (this.queryParams.sortBy === columnName) {
      // If the same column is clicked again, reverse the sorting order
      this.queryParams.isDescending = !this.queryParams.isDescending;
    } else {
      this.queryParams.sortBy = columnName;
      this.queryParams.isDescending = false; // Default to ascending order
    }
  
    this.getExpenses(); // Trigger API call with sorting
  }
  onSubmit() {
    if (this.isAddMode) {
      this.updateExpense();
    } else {
      this.createExpense();
    }
  }

  // create new expense
  createExpense() {
    this.incomeService
      .addInComeExpense(this.addNewExpenseForm.value)
      .subscribe((data) => {
        Swal.fire(
          'Success',
          'Expense Added Successfully',
          'success'
        ).then(() => {
          this.expenseDetailsChanged.emit(true);
          this.formDirective.resetForm();
          this.getExpenses();
          this.addNewExpenseForm.patchValue({clientId: Number(this.currentClientId), id: 0, transactionType: TransactionType.EXPENSE})
        })
        
      });
  }

  // update expense
  updateExpense() {
    this.incomeService
      .updateInComeExpense(this.addNewExpenseForm.value)
      .subscribe((data) => {
        Swal.fire(
          'Success',
          'Expense Updated Successfully',
          'success'
        ).then(() => {
          this.expenseDetailsChanged.emit(true);
          this.formDirective.resetForm();
          this.getExpenses();
          this.isAddMode = false
          this.addNewExpenseForm.patchValue({clientId: Number(this.currentClientId), id: 0, transactionType: TransactionType.EXPENSE})

        })
        
      });
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
      this.dataSource.sort = this.sort;
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

  deleteIncome(element: any) {
    const dialogRef = this.dialog.open(DeleteIncomeExpenseDialogComponent, {
      width: '350px',
      data: {
        item: element,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.expenseDetailsChanged.emit(true);
      this.getExpenses();
    });

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
