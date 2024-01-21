import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { MatDialog } from '@angular/material/dialog';
import { CsvUploadWizardComponent } from './csv-upload-wizard/csv-upload-wizard.component';
import {
  IncomeExpense,
  MmmIncomeExpenseService,
  TransactionType,
  income,
} from '@frontend/data-access-lib';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css'],
})
export class IncomeExpenseComponent {
  @Output() incomeDetailscheck: EventEmitter<boolean> = new EventEmitter();
  @Output() expenseDetailscheck: EventEmitter<boolean> = new EventEmitter();
  @Output() csvInputExpenseDetailscheck: EventEmitter<boolean> = new EventEmitter();


  @ViewChild('IncomeDetailsComponent') incomeDetailsComponent:
    | IncomeComponent
    | undefined;
  @ViewChild('ExpenseDetailsComponent') expenseDetailsComponent:
    | ExpenseComponent
    | undefined;

  clientId: any;
  clientFile: any;
  frmStepTwo!: FormGroup;
  isIncomeValueChange: any;
  isExpenseValueChange: any;
  constructor(
    private formBuilder: FormBuilder,
    private incomeExpenseService: MmmIncomeExpenseService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');
    this.subscribeToIncomeFormChanges(this.isIncomeValueChange);
    this.getIncomes();
  }

  csvInputChange(fileInputEvent: any) {
    const formData = new FormData();
    formData.append('file', fileInputEvent.target.files[0]);
    formData.append('clientId', this.clientId); // Convert clientId to a string if necessary

    this.incomeExpenseService
      .uploadIncomeExpenseCsvFile(formData)
      .subscribe(
        (res: any) => {
          this.clientFile = null;
          this.previewData(res);
        },
        (error) => {
          console.error('Error:', error);
          // Show a SweetAlert error message
          Swal.fire({icon:'error',title:'Upload Error',text:'The uploaded CSV file does not match the required format. Please review and ensure your CSV file follows the specified structure.'})
        }
      );
  }

  previewData(data: any) {
    const dialogRef = this.dialog.open(CsvUploadWizardComponent, {
      width: '700px',
      data: {
        item: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.csvInputExpenseDetailscheck.emit(true);
      this.incomeDetailsComponent?.getIncomes();
      this.expenseDetailsComponent?.getExpenses();
    });
  }

  getIncomes() {
    this.incomeDetailsComponent?.getIncomes();
  }

  getExpesne() {
    this.expenseDetailsComponent?.getExpenses();
  }

  // when change(add or update) income trigger this function value
  subscribeToIncomeFormChanges(item: any) {
    if (item === true) {
      this.incomeDetailscheck.emit(true);
    }
  }

  // when change(add or update) expense trigger this function value
  subscribeToExpenseFormChanges(item: any) {
    if (item === true) {
      this.expenseDetailscheck.emit(true);
    }
  }
}
