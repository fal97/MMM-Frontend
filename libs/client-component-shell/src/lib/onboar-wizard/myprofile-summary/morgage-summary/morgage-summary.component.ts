import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MmmMorgageDetailService, loanPeriod, morgagrFrequency } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-morgage-summary',
  templateUrl: './morgage-summary.component.html',
  styleUrls: ['./morgage-summary.component.css'],
})
export class MorgageSummaryComponent implements OnInit {

  mortgageDetailSummayForm!: FormGroup;
  clientId: any;
  loanPeriodTypes:any;
  frequencyType: any

  constructor(
    private formBuilder: FormBuilder,
    private mmmMorgageService: MmmMorgageDetailService

  ) {}

  ngOnInit() {
    this.loanPeriodTypes = loanPeriod;
    this.frequencyType = morgagrFrequency;
    this.clientId = localStorage.getItem('clientId');
    this.mortgageDetailSummayForm = this.formBuilder.group({
      // Define your form controls here
      loanAmount: [''],
      interestRate: [''],
      startDate: [''],
      loanPeriod: [''],
      loanType: [''],
      frequency: [''],
      periodicPayment: [''],
      totalInterestPaid: [''],
    });
    this.getMorgageDetailsByClientId(Number(this.clientId));
  }


  getMorgageDetailsByClientId(id: number) {
    this.mmmMorgageService.getMorgageById(id).subscribe((data: any) => {
      this.mortgageDetailSummayForm.patchValue(data);
    });
  }
}
