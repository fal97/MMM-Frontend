import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AppStateModel,
  getcountry,
  loadcountries,
} from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MmmClientService, MmmCountryService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-personal-deails',
  templateUrl: './personal-deails.component.html',
  styleUrls: ['./personal-deails.component.css'],
})
export class PersonalDeailsComponent implements OnInit {
  frmStepOne!: FormGroup;
  countries: any = [];
  clientId:any;
  @Output() personalDetailsChanged:EventEmitter<boolean> = new EventEmitter();

  constructor(
    private jwtHelper: JwtHelperService,
    private formBuilder: FormBuilder,
    private store: Store<AppStateModel>,
    private mmmClientService: MmmClientService,
    private mmmCountryService: MmmCountryService
  ) {
    const token = localStorage.getItem("token"); // Replace with where you store your JWT token
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      this.clientId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]; // Use the correct claim name\
      console.log("client id",this.clientId);
      localStorage.setItem('clientId',this.clientId);
    }
  }

  ngOnInit() {
    this.frmStepOne = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      occupations: ['', Validators.required],
      streetAddress: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });


    this.frmStepOne.valueChanges.pipe(
      debounceTime(1000), // Adjust the debounce time according to your needs
      distinctUntilChanged()
    ).subscribe(value => {
      this.saveForm(value); // Call your save function here
      this.personalDetailsChanged.emit(true);
    });

    this.getCountries();
    this.getClientById(Number(this.clientId))
  }


  getClientById(clientId: number ){
   this.mmmClientService.getClientById(clientId).subscribe((data) => {
    this.frmStepOne.patchValue(data)
   })
   
  }


  private saveForm(value: any) {
    value.id = Number(this.clientId)
    this.mmmClientService.update(value).subscribe((data) => {
      console.log("=====data",data);
    })
  }

  getCountries() {
    this.store.dispatch(loadcountries());
    this.store.select(getcountry).subscribe((item) => {
      console.log("=====item country",item);
      this.countries = item;
    });
  }

  // getCountries() {
  //   this.mmmCountryService.getCountryList().subscribe((item) => {
  //     console.log("=====item country",item);
  //     this.countries = item;
  //   })
  // }
}
