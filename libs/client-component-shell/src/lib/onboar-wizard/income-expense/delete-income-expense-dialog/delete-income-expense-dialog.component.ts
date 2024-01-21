import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MmmIncomeExpenseService } from '@frontend/data-access-lib';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-delete-income-expense-dialog',
  templateUrl: './delete-income-expense-dialog.component.html',
  styleUrls: ['./delete-income-expense-dialog.component.css'],
})
export class DeleteIncomeExpenseDialogComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public itemData: any, private incomeExpenseService: MmmIncomeExpenseService) {}


  getDeleteItemData = this.itemData;

  getTransactionText(inviteStatus: number): string {
    switch (inviteStatus) {
      case 1:
        return 'Income';
      case 2:
        return 'Expense';
      default:
        return '';
    }
  }

  confirmDelete()
  {
    this.incomeExpenseService.deleteIncomeExpense(this.itemData.item.id).subscribe((data) => {
      Swal.fire(
        'Deleted',
        `Your Record was Successfully Deleted `,
        'success'
      );
    });
  }

  
}
