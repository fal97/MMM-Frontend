import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  EntityType,
  InviteStatusType,
  MmFilehandleService,
  MmmWorkshopService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  addworkshop,
  getworkshopinfo,
  resetworkshop,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-add-new-workshop',
  templateUrl: './add-new-workshop.component.html',
  styleUrls: ['./add-new-workshop.component.css'],
})
export class AddNewWorkshopComponent implements OnDestroy {
  constructor(
    private fd: FormBuilder,
    private fileHandleService: MmFilehandleService,
    private workshopService: MmmWorkshopService,
    private store: Store<AppStateModel>
  ) {}
  workshopFiles: any[] = [];

  titleToPass: any = 'Create New Workshop';
  btnList = [{ label: 'Back', routerLink: '/dashboard/workshopManagement' }];
  addNewWorkshopForm = this.fd.group({
    name: ['', Validators.required],
    offering: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', [Validators.required]],
  });

  cancelChanges() {
    this.addNewWorkshopForm.reset();
  }

  csvInputChange(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      this.workshopFiles.push(fileInputEvent.target.files[i]);
    }
  }

  removeSelectedFile(index: any) {
    // delete file from FileList
    this.workshopFiles.splice(index, 1);
  }

  ngOnDestroy() {
    this.store.dispatch(resetworkshop());
  }

  createWorkshop() {
    //date validation
    const startDate = new Date(this.addNewWorkshopForm.value.startDate || '');
    const endDate = new Date(this.addNewWorkshopForm.value.endDate || '');

    if (endDate <= startDate) {
      Swal.fire('Error', 'End Date must be later than Start Date', 'error');
      return; // Prevent form submission
    }

    this.store.dispatch(
      addworkshop({ workshopinput: this.addNewWorkshopForm.value })
    );

    this.store.select(getworkshopinfo).subscribe((data) => {
      if (data.successMessage === 'success') {
        Swal.fire('Success', 'Workshop created successfully', 'success');

        //add file references
        const formData = new FormData();

        for (let i = 0; i < this.workshopFiles.length; i++) {
          formData.append('files', this.workshopFiles[i]);
        }

        if (this.workshopFiles.length > 0) {
          this.fileHandleService
            .addDocument({
              files: formData,
              entityType: EntityType.WORKSHOP,
              entityId: data.workshopId,
            })
            .subscribe((res: any) => {
              this.workshopFiles = [];
            });
        }
      }

      if (data.errorMessage) {
        Swal.fire('Error', `${data.errorMessage}`, 'error');

        this.store.dispatch(resetworkshop());
      }
    });
  }
}
