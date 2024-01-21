import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntityType,
  MmFilehandleService,
  MmmClientService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  getworkshopbyid,
  getworkshopinfo,
  resetworkshop,
  updateworkshop,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-update-workshop',
  templateUrl: './update-workshop.component.html',
  styleUrls: ['./update-workshop.component.css'],
})
export class UpdateWorkshopComponent implements OnInit, OnDestroy {
  constructor(
    private fd: FormBuilder,
    private fileHandleService: MmFilehandleService,
    private route: ActivatedRoute,
    private store: Store<AppStateModel>
  ) {}

  workshopId: any;
  workshopFiles: any = [];
  workshopFilesToId: any = [];
  titleToPass: any = 'View/Edit Workshop Details';
  btnList = [
    { label: 'Back', routerLink: '/dashboard/workshopManagement' },
    { label: 'Deactivate', routerLink: '/route2' },
  ];

  ngOnInit(): void {
    // parameter value eka ganima
    this.route.paramMap.subscribe((param) => {
      this.workshopId = Number(param.get('id'));
      this.getById(this.workshopId);
    });
    this.getFileReferencesListForWorkshop(this.workshopId);
  }
  updateWorkshopForm = this.fd.group({
    id: [0],
    name: ['', Validators.required],
    offering: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  cancelChanges() {
    this.getById(this.workshopId);
  }
  getById(id: number) {
    this.store.select(getworkshopbyid(id)).subscribe((data) => {
      console.log('ws', data);
      this.updateWorkshopForm.patchValue(data);
    });
  }

  getFileReferencesListForWorkshop(workshopId: number) {
    this.fileHandleService
      .getFileReferencesList({
        Id: workshopId,
        EntityType: EntityType.WORKSHOP,
      })
      .subscribe((res) => {
        this.workshopFilesToId = res;
      });
  }

  csvInputChange(fileInputEvent: any) {
    // this.workshopFiles = [];
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      this.workshopFiles.push(fileInputEvent.target.files[i]);
    }

    const formData = new FormData();

    for (let i = 0; i < this.workshopFiles.length; i++) {
      formData.append('files', this.workshopFiles[i]);
    }

    if (this.workshopFiles.length > 0) {
      this.fileHandleService
        .addDocument({
          files: formData,
          entityType: EntityType.WORKSHOP,
          entityId: this.workshopId,
        })
        .subscribe((res: any) => {
          this.getFileReferencesListForWorkshop(this.workshopId);
          this.workshopFiles = [];
        });
    }
  }

  removeSelectedFile(index: any) {
    this.fileHandleService.deleteDocuments(index).subscribe((res: any) => {
      this.getFileReferencesListForWorkshop(this.workshopId);
    });
  }

  updateWorkshop() {
    //date validation
    const startDate = new Date(this.updateWorkshopForm.value.startDate || '');
    const endDate = new Date(this.updateWorkshopForm.value.endDate || '');

    if (endDate <= startDate) {
      Swal.fire('Error', 'End Date must be later than Start Date', 'error');
      return; // Prevent form submission
    }

    this.store.dispatch(
      updateworkshop({ workshopinput: this.updateWorkshopForm.value })
    );
    //this.router.navigate(['/']);
    this.store.select(getworkshopinfo).subscribe((data) => {
      if (data.successMessage === 'success') {
        Swal.fire('Success', 'Workshop Updated Successfully!', 'success');
      }

      if (data.errorMessage) {
        Swal.fire('Error', `${data.errorMessage}`, 'error');
        this.store.dispatch(resetworkshop());
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(resetworkshop());
  }
}
