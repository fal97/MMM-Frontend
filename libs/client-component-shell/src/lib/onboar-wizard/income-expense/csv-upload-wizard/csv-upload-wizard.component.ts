import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MmmIncomeExpenseService } from '@frontend/data-access-lib';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'frontend-csv-upload-wizard',
  templateUrl: './csv-upload-wizard.component.html',
  styleUrls: ['./csv-upload-wizard.component.css'],
})
export class CsvUploadWizardComponent {

  isPartiallySuccessful : boolean = false; 
  message:any;
  dataSource: MatTableDataSource<any>;
  dataSourceForAllRecords:MatTableDataSource<any>;
  displayedColumns: string[] = ['incomeExpenseCategory', 'description', 'amount', 'selectDate'];

  constructor(public dialogRef: MatDialogRef<CsvUploadWizardComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private incomeExpenseService: MmmIncomeExpenseService) {

    this.dataSource = new MatTableDataSource(data.item.records);
    this.dataSourceForAllRecords = new MatTableDataSource(data.item.allRecords)
    this.message = data.item.message;
    this.isPartiallySuccessful = data.item.isPartiallySuccessful;
   

  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  selectionChange(event: StepperSelectionEvent) {
    event.previouslySelectedStep.interacted =
      event.previouslySelectedIndex < event.selectedIndex;
    event.selectedStep.interacted = false;
  }
  

  
}
