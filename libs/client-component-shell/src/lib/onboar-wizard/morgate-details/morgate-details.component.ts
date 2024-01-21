import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  LoanType,
  MmmMorgageDetailService,
  FrequencyType,
  loanPeriod,
  morgagrFrequency,
} from '@frontend/data-access-lib';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'frontend-morgate-details',
  templateUrl: './morgate-details.component.html',
  styleUrls: ['./morgate-details.component.css'],
})
export class MorgateDetailsComponent implements OnInit, OnDestroy {
  mortgageDetailForm!: FormGroup;
  loanPeriodTypes: any = [];
  frequencyType: any = [];
  clientId: any;
  morgageId: any;
  private formValueChangesSubscription!: Subscription;
  @Output() morgageDetailsChanged:EventEmitter<boolean> = new EventEmitter();


  constructor(
    private fd: FormBuilder,
    private jwtHelper: JwtHelperService,
    private mmmMorgageService: MmmMorgageDetailService
  ) {}

  ngOnInit() {
    this.loanPeriodTypes = loanPeriod;
    this.frequencyType = morgagrFrequency;
    this.clientId = localStorage.getItem('clientId');

    this.mortgageDetailForm = this.fd.group({
      id: [0],
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      startDate: [0, Validators.required],
      loanPeriod: ['', Validators.required],
      loanType: [0, Validators.required],
      frequency: [0, Validators.required],
      periodicPayment: ['', Validators.required],
      totalInterestPaid: ['', [Validators.required]],
      clientId: Number(this.clientId),
    });

    this.getMorgageDetailsByClientId(Number(this.clientId));

    this.formValueChangesSubscription = this.mortgageDetailForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.saveForm(value);
      this.morgageDetailsChanged.emit(true);
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the form value changes when the component is destroyed
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  private saveForm(value: any) {
    // Unsubscribe before making changes to the form
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
    const formattedStartDate = moment(value.startDate).format('YYYY-MM-DD');
    console.log("value date",value.startDate);
    console.log("format date",formattedStartDate);
    value.startDate = formattedStartDate;

    this.mmmMorgageService.addMorgageDetail(value).subscribe((data) => {
      this.morgageId = data;
      this.mortgageDetailForm.patchValue({ id: this.morgageId });

      // Re-subscribe after making changes
      this.formValueChangesSubscription = this.mortgageDetailForm.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((newValue) => {
          this.saveForm(newValue);
      this.morgageDetailsChanged.emit(true);
        });
    });
  }

  getMorgageDetailsByClientId(id: number) {
    this.mmmMorgageService.getMorgageById(id).subscribe((data: any) => {
      this.mortgageDetailForm.patchValue(data);
    });
  }
}
