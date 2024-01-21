import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalDeailsComponent } from '../personal-deails/personal-deails.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MorgateDetailsComponent } from '../morgate-details/morgate-details.component';
import { MyprofileSummaryComponent } from '../myprofile-summary/myprofile-summary.component';

@Component({
  selector: 'frontend-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.css'],
})
export class ClientOnboardingComponent implements AfterViewInit {
  form1!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  form4!: FormGroup;

  personaleProfileValue: any;

  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  // child component in onboard wizard
  @ViewChild('PersonalDetailsComponent')
  personalDetailsComponent!: PersonalDeailsComponent;
  @ViewChild('IncomeExpenseDetailsComponent') incomeExpenseDetailsComponent:
    | IncomeExpenseComponent
    | undefined;
  @ViewChild('MorgateDetailsComponent') morgateDetailsComponent:
    | MorgateDetailsComponent
    | undefined;
  @ViewChild('SummaryDetailsComponent') summaryDetailsComponent:
    | MyprofileSummaryComponent
    | undefined;

  selectionChange(event: StepperSelectionEvent) {
    event.previouslySelectedStep.interacted =
      event.previouslySelectedIndex < event.selectedIndex;
    event.selectedStep.interacted = false;
  }

  ngAfterViewInit() {
    this.form1 = this.personalDetailsComponent?.frmStepOne;
    this.form2 = this.incomeExpenseDetailsComponent?.frmStepTwo as FormGroup;
    this.form3 = this.morgateDetailsComponent?.mortgageDetailForm as FormGroup;
    this.form4 = this.summaryDetailsComponent?.profileSummary as FormGroup;
    this.cdr.detectChanges();
  }

  //acording to the personl details change trigger personel summery details component
  subscribeToFormChanges(item: any) {
    this.personaleProfileValue = item;
    const clientId =
      this.summaryDetailsComponent?.personalSummaryDetailsComponent?.clientId;
    if (item === true) {
      setTimeout(() => {
        this.summaryDetailsComponent?.personalSummaryDetailsComponent?.getClientById(
          clientId
        );
      }, 1000);
    }
  }

  //according to the income component change trigger income summary details component
  subscribeToIncomeFormChanges(item: any) {
    if (item == true) {
      setTimeout(() => {
        this.summaryDetailsComponent?.incomeSummaryDetailsComponent?.getIncomes();
      }, 1000);
    }
  }

  //according to the expense component change trigger expense summary details component
  subscribeToExpenseFormChanges(item: any) {
    if (item == true) {
      setTimeout(() => {
        this.summaryDetailsComponent?.expenseSummaryDetailsComponent?.getExpenses();
      }, 1000);
    }
  }

  //according to the morgage detail component change trigger morgage summary details component
  subscribeToMorgageFormChanges(item: any) {
    const clientId =
      this.summaryDetailsComponent?.morgageSummaryDetailsComponent?.clientId;
    if (item === true) {
      setTimeout(() => {
        this.summaryDetailsComponent?.morgageSummaryDetailsComponent?.getMorgageDetailsByClientId(
          clientId
        );
      }, 1000);
    }
  }

  subscribeToCSVIncomeExpesneFormChanges(item: any) {
    console.log('=====item check up csv', item);
    if (item == true) {
      setTimeout(() => {
        this.summaryDetailsComponent?.expenseSummaryDetailsComponent?.getExpenses();
      }, 1000);

      setTimeout(() => {
        this.summaryDetailsComponent?.incomeSummaryDetailsComponent?.getIncomes();
      }, 1000);
    }
  }
}
