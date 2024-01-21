import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  EntityType,
  InviteStatusType,
  MmFilehandleService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  approveclient,
  getallworkshops,
  getclientbyid,
  getclientinfo,
  getcountry,
  getworkshopinfo,
  loadcountries,
  resetclient,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';

@Component({
  selector: 'frontend-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.css'],
})
export class ApproveRejectComponent implements OnInit, OnDestroy {
  constructor(
    private fd: FormBuilder,
    private fileHandleService: MmFilehandleService,
    private route: ActivatedRoute,
    private store: Store<AppStateModel>,
    private dialog: MatDialog
  ) {}

  clientId: any;
  countries: any = [];
  clientFiles: any = [];
  clientFilesToId: any = [];
  workshops: any = [];

  ngOnInit(): void {
    // parameter value eka ganima
    this.route.paramMap.subscribe((param) => {
      this.clientId = Number(param.get('id'));
      this.getById(this.clientId);
    });
    this.getDocumentToClientId(this.clientId);
    this.getCountries();
    this.getAllWorkShops();
  }
  approveClientForm = this.fd.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', Validators.required],
    contactNumber: ['', Validators.required],
    occupations: [''],
    streetAddress: [''],
    town: [''],
    state: [''],
    postCode: [''],
    country: [''],
    workshop: ['',Validators.required],
    inviteStatus: InviteStatusType.CREATED,
    rejectionReason: [''],
  });

  getById(id: number) {
    this.store.select(getclientbyid(id)).subscribe((data) => {
      console.log('data', data);
      this.approveClientForm.patchValue(data);
    });
  }

  getDocumentToClientId(id: number) {
    this.fileHandleService
      .getFileReferencesList({ Id: id, EntityType: EntityType.CLIENT })
      .subscribe((res) => {
        this.clientFilesToId = res;
      });
  }

  csvInputChange(fileInputEvent: any) {
    // this.clientFiles = [];
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      this.clientFiles.push(fileInputEvent.target.files[i]);
    }

    const formData = new FormData();

    for (let i = 0; i < this.clientFiles.length; i++) {
      formData.append('files', this.clientFiles[i]);
    }

    if (this.clientFiles.length > 0) {
      this.fileHandleService
        .addDocument({
          files: formData,
          entityType: EntityType.CLIENT,
          entityId: this.clientId,
        })
        .subscribe((res: any) => {
          this.getDocumentToClientId(this.clientId);
          this.clientFiles = [];
        });
    }
  }

  removeSelectedFile(index: any) {
    this.fileHandleService.deleteDocuments(index).subscribe((res: any) => {
      this.getDocumentToClientId(this.clientId);
    });
  }

  approveClient(isApprove: boolean) {
    const controlsToClearValidators = [
      'occupations',
      'streetAddress',
      'town',
      'state',
      'postCode',
      'country',
      'workshop',
    ];

    if (isApprove) {
      this.approveClientForm.patchValue({
        inviteStatus: InviteStatusType.CREATED,
        rejectionReason: '',
      });
    } else {
      this.approveClientForm.patchValue({
        inviteStatus: InviteStatusType.REJECTED,
      });
      // removing validations for rejection
      controlsToClearValidators.forEach((controlName) => {
        this.approveClientForm.get(controlName)?.clearValidators();
      });
    }

    this.store.dispatch(
      approveclient({ clientinput: this.approveClientForm.value })
    );

    this.store.select(getclientinfo).subscribe((data) => {
      if (data.successMessage === 'success') {
        Swal.fire(
          'Success',
          isApprove
            ? `Client Approved And Invitation Email Sent Successfully!`
            : 'Client Rejected Successfully!',
          'success'
        );
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(resetclient());
  }

  getCountries() {
    this.store.dispatch(loadcountries());
    this.store.select(getcountry).subscribe((item) => {
      this.countries = item;
    });
  }

  rejectClient() {
    const dialogRef: MatDialogRef<RejectDialogComponent> = this.dialog.open(
      RejectDialogComponent,
      {
        width: '700px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.approveClientForm.patchValue({
          rejectionReason: result,
        });

        this.approveClient(false);
      }
    });
  }

  getAllWorkShops() {
    this.store.dispatch(getallworkshops());
    this.store.select(getworkshopinfo).subscribe((item) => {
      this.workshops = item.allWorkShop;
    });
  }

  cancelChanges() {
    Swal.fire({
      title: 'Do you want to cancel the changes?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.getById(this.clientId);
      }
    });
  }
}
