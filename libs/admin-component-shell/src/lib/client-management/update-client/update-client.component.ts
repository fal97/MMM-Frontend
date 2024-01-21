import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntityType,
  InviteStatusType,
  MmFilehandleService,
  MmmClientService,
  MmmWorkshopService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  getallworkshops,
  getclientbyid,
  getclientinfo,
  getcountry,
  getworkshopinfo,
  loadcountries,
  resetclient,
  updateclient,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
})
export class UpdateClientComponent implements OnInit, OnDestroy {
  constructor(
    private fd: FormBuilder,
    private fileHandleService: MmFilehandleService,
    private workshopService: MmmWorkshopService,
    private route: ActivatedRoute,
    private store: Store<AppStateModel>
  ) {}
  titleToPass: any = 'View/Edit Client Details';
  btnList = [
    { label: 'Back', routerLink: '/dashboard/clientManagement' },
    { label: 'View Workbook', routerLink: '/route2' },
    //{ label: 'Reset Password', routerLink: '/route3' },
    { label: 'Deactivate', routerLink: '/route3' },
  ];
  btnBack = [{ label: 'Back', routerLink: '/dashboard/clientManagement' }];
  clientId: any;
  countries: any = [];
  workshops: any = [];
  clientFiles: any = [];
  clientFilesToId: any = [];
  isClientRejected = true;
  rejectionReason: any = '';
  ngOnInit(): void {
    // parameter value eka ganima
    this.route.paramMap.subscribe((param) => {
      this.clientId = Number(param.get('id'));
      this.getById(this.clientId);
    });
    this.getFileReferencesListForCLient(this.clientId);
    this.getCountries();
    this.getAllWorkShops();
  }
  updateClientForm = this.fd.group({
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
    workshop: [''],
    inviteStatus: [-1],
    rejectionReason: '',
  });

  getById(id: number) {
    this.store.select(getclientbyid(id)).subscribe((data) => {
      this.updateClientForm.patchValue(data);
        if(data.inviteStatus == InviteStatusType.REJECTED){
          this.isClientRejected = false;
          if(data.rejectionReason){
            this.rejectionReason = data.rejectionReason
          } 
      }
    });
  }

  getFileReferencesListForCLient(clientId: number) {
    this.fileHandleService
      .getFileReferencesList({ Id: clientId, EntityType: EntityType.CLIENT })
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
          this.getFileReferencesListForCLient(this.clientId);
          this.clientFiles = [];
        });
    }
  }

  cancelChanges() {
    this.getById(this.clientId);
  }

  removeSelectedFile(index: any) {
    this.fileHandleService.deleteDocuments(index).subscribe((res: any) => {
      this.getFileReferencesListForCLient(this.clientId);
    });
  }

  updateClient() {
    this.store.dispatch(
      updateclient({ clientinput: this.updateClientForm.value })
    );
    //this.router.navigate(['/']);
    this.store.select(getclientinfo).subscribe((data) => {
      if (data.successMessage === 'success') {
        Swal.fire('Success', 'Client Updated Succfully!', 'success');
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

  getAllWorkShops() {
    this.store.dispatch(getallworkshops());
    this.store.select(getworkshopinfo).subscribe((item) => {
      this.workshops = item.allWorkShop;
    });
  }
}
