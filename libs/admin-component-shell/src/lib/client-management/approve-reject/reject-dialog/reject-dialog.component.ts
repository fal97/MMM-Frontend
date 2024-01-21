import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApproveRejectComponent } from '../approve-reject.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'frontend-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css'],
})
export class RejectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApproveRejectComponent>,
    private formBuilder: FormBuilder
  ) {}

  rejectClientForm = this.formBuilder.group({
    RejectionReason: ['', Validators.required],
  });

  confirmReject() {
    const rejectionText = this.rejectClientForm
      .get('RejectionReason')
      ?.value?.trim();
    rejectionText && this.dialogRef.close(rejectionText);
  }
}
