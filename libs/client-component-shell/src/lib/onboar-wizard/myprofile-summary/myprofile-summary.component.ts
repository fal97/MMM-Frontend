import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpesnseSummaryComponent } from './expesnse-summary/expesnse-summary.component';
import { IncomeSummaryComponent } from './income-summary/income-summary.component';
import { MorgageSummaryComponent } from './morgage-summary/morgage-summary.component';
import { PersonalDetailSummaryComponent } from './personal-detail-summary/personal-detail-summary.component';
import { MmmClientService } from '@frontend/data-access-lib';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-myprofile-summary',
  templateUrl: './myprofile-summary.component.html',
  styleUrls: ['./myprofile-summary.component.css'],
})
export class MyprofileSummaryComponent implements OnInit {


  constructor(
    private mmmClientService: MmmClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');
  }

  profileSummary!: FormGroup;
  clientId: any;

  @ViewChild('PersonalSummaryDetailsComponent')
  personalSummaryDetailsComponent: PersonalDetailSummaryComponent | undefined;
  @ViewChild('IncomeSummaryDetailsComponent') incomeSummaryDetailsComponent:
    | IncomeSummaryComponent
    | undefined;
  @ViewChild('ExpenseSummaryDetailsComponent') expenseSummaryDetailsComponent:
    | ExpesnseSummaryComponent
    | undefined;
  @ViewChild('MorgageSummaryDetailsComponent') morgageSummaryDetailsComponent:
    | MorgageSummaryComponent
    | undefined;

  // updateSummary(personalDetails: any) {
  //   // Update the summary based on the received form values
  //   this.clientId = this.personalSummaryDetailsComponent?.clientId;

  //   if(personalDetails)
  //   {
  //     this.personalSummaryDetailsComponent?.getClientById(this.clientId);
  //   }
  // }

  updateOnBoardingStatus() {
    const payload = {
      id: Number(this.clientId),
      isOnBordingCompleted: true,
    };

    this.mmmClientService.updateOnBoardStatus(payload).subscribe((data) => {
      console.log('data', data);
      Swal.fire(
        'Success',
        'Profile Details Added Successfully!',
        'success'
      ).then(() => {
        this.router.navigate(['/clientdashboard']);
      })
    });
  }
}
