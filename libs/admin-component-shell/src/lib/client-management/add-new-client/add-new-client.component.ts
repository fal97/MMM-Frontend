import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  EntityType,
  InviteStatusType,
  MmFilehandleService,
  MmmWorkshopService,
} from '@frontend/data-access-lib';
import {
  AppStateModel,
  addclient,
  getallworkshops,
  getclientinfo,
  getcountry,
  getworkshop,
  getworkshopinfo,
  loadclients,
  loadcountries,
  resetclient,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css'],
})
export class AddNewClientComponent implements OnInit, OnDestroy {
  titleToPass: any = 'Create New Client';
  btnList = [{ label: 'Back', routerLink: '/dashboard/clientManagement' }];
  constructor(
    private fd: FormBuilder,
    private fileHandleService: MmFilehandleService,
    private workshopService: MmmWorkshopService,
    // private router: Router,
    private store: Store<AppStateModel> // private toastr: ToastrService
  ) {}

  countries: any = [];
  workshops: any = [];
  clientFiles: any[] = [];

  addNewClientForm = this.fd.group({
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    contactNumber: [
      '',
      [Validators.required, Validators.pattern('[0-9 ]{10}')],
    ],
    occupations: [''],
    streetAddress: [''],
    town: [''],
    state: [''],
    postCode: [''],
    country: [''],
    workshop: ['', Validators.required],
    inviteStatus: InviteStatusType.CREATED,
  });

  cancelChanges() {
    this.addNewClientForm.reset();
  }
  ngOnInit(): void {
    this.getCountries();
    this.getAllWorkShops();
  }

  // file list iteration
  csvInputChange(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      this.clientFiles.push(fileInputEvent.target.files[i]);
    }
  }

  removeSelectedFile(index: any) {
    // delete file from FileList
    this.clientFiles.splice(index, 1);
  }

  createClient() {
    this.store.dispatch(
      addclient({ clientinput: this.addNewClientForm.value })
    );
    this.store.select(getclientinfo).subscribe((data) => {
      console.log('====data', data.errorMessage);

      if (data.successMessage === 'success') {
        Swal.fire(
          'Success',
          'Client created successfully & Client has been invited',
          'success'
        );

        //add file references
        const formData = new FormData();

        for (let i = 0; i < this.clientFiles.length; i++) {
          formData.append('files', this.clientFiles[i]);
        }

        if (this.clientFiles.length > 0) {
          this.fileHandleService
            .addDocument({
              files: formData,
              entityType: EntityType.CLIENT,
              entityId: data.clientId,
            })
            .subscribe((res: any) => {
              this.clientFiles = [];
            });
        }
      }

      if (data.errorMessage) {
        Swal.fire('Error', `${data.errorMessage}`, 'error');

        this.store.dispatch(resetclient());
      }
    });
  }

  // reset state in client
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
    // this.workshopService.getAllWorkshop().subscribe((res) => {
    //   this.workshops = res;
    // })
  }
}
