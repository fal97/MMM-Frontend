import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  IncomeExpense,
  MmmIncomeExpenseService,
  TransactionType,
  income,
} from '@frontend/data-access-lib';
import { DeleteIncomeExpenseDialogComponent } from '../delete-income-expense-dialog/delete-income-expense-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  incomes: any = [];
  currentClientId: any;
  // clientId: any;
  addNewIncomeForm!: FormGroup;
  allIncomes!: IncomeExpense[];
  dataSource: MatTableDataSource<IncomeExpense> =
    new MatTableDataSource<IncomeExpense>();
  isAddMode = false;
  queryParams: any;
  incomeAmount: any;
  @Output() incomeDetailsChanged: EventEmitter<boolean> = new EventEmitter();

  displayedColumns: string[] = [
    'date',
    'income Category',
    'description',
    'amount',
    'action',
  ];

  @ViewChild('formDirective') private formDirective!: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
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
    this.incomes = income;
    this.addNewIncomeForm = this.fd.group({
      id: [0],
      selectDate: ['', Validators.required],
      incomeExpenseCatogory: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required]],
      clientId: Number(this.currentClientId),
      transactionType: TransactionType.INCOME,
    });

    this.queryParams = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      TransactionType: TransactionType.INCOME,
      ClientId: Number(this.currentClientId),
      isDescending:false,
      sortBy:''
    };

    //get all incomes acroding to page size
    this.getIncomes();
  }

  sortData(columnName: string) {
    if (this.queryParams.sortBy === columnName) {
      // If the same column is clicked again, reverse the sorting order
      this.queryParams.isDescending = !this.queryParams.isDescending;
    } else {
      this.queryParams.sortBy = columnName;
      this.queryParams.isDescending = false; // Default to ascending order
    }
  
    this.getIncomes(); // Trigger API call with sorting
  }

  editIncome(income: any) {
    this.addNewIncomeForm.patchValue(income);
    this.selectIncomeId = income.id;
    this.isAddMode = true;
  }

  onSubmit() {
    if (this.isAddMode) {
      this.updateIncome();
    } else {
      this.createIncome();
    }
  }

  createIncome() {
    this.incomeService
      .addInComeExpense(this.addNewIncomeForm.value)
      .subscribe((data) => {
        Swal.fire('Success', 'Income Added Successfully', 'success').then(
          () => {
            this.incomeDetailsChanged.emit(true);
            // form reset
            this.formDirective.resetForm();
            this.getIncomes();
            this.addNewIncomeForm.patchValue({
              clientId: Number(this.currentClientId),
              id: 0,
              transactionType: TransactionType.INCOME,
            });
          }
        );
      });
  }

  getIncomeCatogoryText(inviteStatus: number): string {
    switch (inviteStatus) {
      case 26:
        return 'Other Credit';
      case 27:
        return 'Wages';
      case 28:
        return 'Non SACC Loans';
      default:
        return '';
    }
  }

  updateIncome() {
    this.incomeService
      .updateInComeExpense(this.addNewIncomeForm.value)
      .subscribe((data) => {
        Swal.fire('Success', 'Income Update Successfully', 'success').then(
          () => {
            this.incomeDetailsChanged.emit(true);
            // form reset
            this.formDirective.resetForm();
            this.getIncomes();
            this.isAddMode = false;
            this.addNewIncomeForm.patchValue({
              clientId: Number(this.currentClientId),
              id: 0,
              transactionType: TransactionType.INCOME,
            });
          }
        );
      });
  }

  getIncomes() {
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
      this.incomeAmount = item.totalAmount;
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
    this.getIncomes();
  }

  deleteIncome(element: any) {
    const dialogRef = this.dialog.open(DeleteIncomeExpenseDialogComponent, {
      width: '350px',
      data: {
        item: element,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.incomeDetailsChanged.emit(true);
      this.getIncomes();
    });
  }
}
