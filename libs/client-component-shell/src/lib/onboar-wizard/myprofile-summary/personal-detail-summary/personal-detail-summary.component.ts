import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MmmClientService } from '@frontend/data-access-lib';
import { AppStateModel, getcountry, loadcountries } from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'frontend-personal-detail-summary',
  templateUrl: './personal-detail-summary.component.html',
  styleUrls: ['./personal-detail-summary.component.css'],
})
export class PersonalDetailSummaryComponent implements OnInit {
  // countries: any = [];
  personalDetailsSummary!: FormGroup;
  clientId: any;

  constructor(
    private store: Store<AppStateModel>,
    private formBuilder: FormBuilder,
    private mmmClientService: MmmClientService
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');
    this.personalDetailsSummary = this.formBuilder.group({
      // Define your form controls here
      name: [''],
      email: [''],
      contactNumber: [''],
      occupations: [''],
      streetAddress: [''],
      town: [''],
      state: [''],
      postCode: [''],
      country: ['']
    });
    this.getClientById(Number(this.clientId));
  }

  getClientById(clientId: number) {
    this.mmmClientService.getClientById(clientId).subscribe((data) => {
      console.log("======== personal data summry",data);
      
      this.personalDetailsSummary.patchValue(data);
    });
  }

  // getCountries() {
  //   this.store.dispatch(loadcountries());
  //   this.store.select(getcountry).subscribe((item) => {
  //     this.countries = item;
  //   });
  // }
}
